import { useState, useEffect, useRef } from "react";
import { slides, sectionList } from "./app/components/slide-data";
import { ChevronLeft, ChevronRight, Clock, Monitor, Edit3, Star } from "lucide-react";
import { ThemeContext } from "./app/components/theme-context";

export default function PresenterView() {
  const [idx, setIdx] = useState(0);
  const [startTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [channel] = useState(() => new BroadcastChannel('figma-presenter'));
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [localLaser, setLocalLaser] = useState<{ x: number; y: number } | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [editedNotes, setEditedNotes] = useState<Record<string, string>>({});
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  // プレビューエリアでのレーザーポインター操作
  const handlePreviewMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseDown(true);
    handlePreviewMouseMove(e);
  };

  const handlePreviewMouseUp = () => {
    setIsMouseDown(false);
    setLocalLaser(null);
    channel.postMessage({ type: 'laser', active: false });
  };

  const handlePreviewMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown || !previewRef.current) return;

    const rect = previewRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setLocalLaser({ x, y });
    channel.postMessage({ type: 'laser', x, y, active: true });
  };

  const handlePreviewMouseLeave = () => {
    if (isMouseDown) {
      setIsMouseDown(false);
      setLocalLaser(null);
      channel.postMessage({ type: 'laser', active: false });
    }
  };

  const total = slides.length;
  const currentSlide = slides[idx];
  const currentSection = sectionList.find((s) => s.id === currentSlide.section);

  // ページ移動
  const navigate = (newIdx: number) => {
    const targetIdx = Math.max(0, Math.min(total - 1, newIdx));
    setIdx(targetIdx);
    channel.postMessage({ type: 'navigate', index: targetIdx });
  };

  // キーボードショートカット
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigate(idx - 1);
      if (e.key === 'ArrowRight') navigate(idx + 1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [idx]);

  // タイマー
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed(Date.now() - startTime);
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  // 編集した原稿をlocalStorageから復元
  useEffect(() => {
    const saved = localStorage.getItem('presenter-notes');
    if (saved) {
      setEditedNotes(JSON.parse(saved));
    }
  }, []);

  // 原稿の編集を保存
  const saveNotes = (slideId: string, notes: string) => {
    const updated = { ...editedNotes, [slideId]: notes };
    setEditedNotes(updated);
    localStorage.setItem('presenter-notes', JSON.stringify(updated));
  };

  // 現在のスライドの原稿を取得（編集版 or オリジナル）
  const getCurrentNotes = () => {
    return editedNotes[currentSlide.id] || currentSlide.speakerNotes || '';
  };


  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return `${hours.toString().padStart(2, '0')}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
  };


  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col overflow-hidden">
      {/* ヘッダー */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Monitor className="w-5 h-5 text-purple-400" />
            <h1 className="text-lg font-semibold">発表者ビュー</h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock className="w-4 h-4" />
              <span className="font-mono">{formatTime(elapsed)}</span>
            </div>
            <div className="text-sm text-gray-400">
              {idx + 1} / {total}
            </div>
          </div>
        </div>

        {/* 進捗バー */}
        <div className="mt-3 h-1 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-500 transition-all duration-300"
            style={{ width: `${((idx + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 overflow-hidden flex p-6 gap-6">
          {/* スライドプレビュー */}
          <div className="w-[600px] shrink-0 flex flex-col gap-4">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
              <div className="flex items-center gap-2 text-sm text-purple-400 mb-3">
                <span className="font-semibold">スライドプレビュー</span>
                {currentSlide.starred && <span className="text-yellow-400">★</span>}
              </div>

              {/* スライドプレビュー */}
              <div
                ref={previewRef}
                className={`relative bg-gray-900 rounded-lg border-2 overflow-hidden cursor-crosshair select-none ${
                  isMouseDown ? 'border-pink-500' : 'border-gray-700'
                }`}
                style={{ width: '100%', aspectRatio: '16/9' }}
                onMouseDown={handlePreviewMouseDown}
                onMouseUp={handlePreviewMouseUp}
                onMouseMove={handlePreviewMouseMove}
                onMouseLeave={handlePreviewMouseLeave}
              >
                <div className="w-full h-full">
                  <ThemeContext.Provider value="dark">
                    <div className="w-full h-full bg-[#262335] p-12 overflow-auto">
                      {currentSlide.content}
                    </div>
                  </ThemeContext.Provider>
                </div>

                {/* ローカルレーザーポインター */}
                {isMouseDown && localLaser && (
                  <div
                    className="absolute pointer-events-none animate-pulse"
                    style={{
                      left: `${localLaser.x}%`,
                      top: `${localLaser.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div className="w-2 h-2 bg-pink-500 rounded-full opacity-90 shadow-lg shadow-pink-500/50" />
                    <div className="absolute inset-0 w-2 h-2 bg-pink-400 rounded-full opacity-40 animate-ping" />
                  </div>
                )}

                {/* 使い方の説明 */}
                {!isMouseDown && (
                  <div className="absolute top-2 left-2 bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                    クリック押しながらでレーザーポインター
                  </div>
                )}
              </div>
            </div>

            {/* ページ送りボタン */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => navigate(idx - 1)}
                disabled={idx === 0}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600 rounded-lg flex items-center gap-2 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="text-sm font-semibold">前へ</span>
              </button>

              <div className="px-4 py-2 bg-purple-900/30 border border-purple-700/50 rounded-lg">
                <span className="text-purple-300 font-mono text-sm font-semibold">
                  {idx + 1} / {total}
                </span>
              </div>

              <button
                onClick={() => navigate(idx + 1)}
                disabled={idx === total - 1}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-800 disabled:text-gray-600 rounded-lg flex items-center gap-2 transition-colors"
              >
                <span className="text-sm font-semibold">次へ</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 原稿エリア */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 flex-1 flex flex-col min-h-0">
              <div className="text-xs text-gray-500 mb-1">{currentSection?.title}</div>
              <h2 className="text-xl font-bold mb-2">{currentSlide.title}</h2>

              {currentSlide.message && (
                <div className="text-sm text-gray-400 mb-4 p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                  {currentSlide.message}
                </div>
              )}

              <div className="mt-4 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-semibold text-emerald-400">📝 読み上げ原稿</div>
                  <button
                    onClick={() => setIsEditingNotes(!isEditingNotes)}
                    className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition ${
                      isEditingNotes
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <Edit3 className="w-3 h-3" />
                    {isEditingNotes ? '保存' : '編集'}
                  </button>
                </div>

                {isEditingNotes ? (
                  <textarea
                    value={getCurrentNotes()}
                    onChange={(e) => saveNotes(currentSlide.id, e.target.value)}
                    className="flex-1 text-sm leading-relaxed text-gray-300 whitespace-pre-line p-4 bg-gray-900/70 rounded-lg border border-gray-700 resize-none focus:outline-none focus:border-emerald-500"
                    placeholder="読み上げ原稿を入力..."
                  />
                ) : (
                  <div className="flex-1 text-sm leading-relaxed text-gray-300 whitespace-pre-line p-4 bg-gray-900/70 rounded-lg border border-gray-700 overflow-y-auto">
                    {getCurrentNotes() || '原稿がありません'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
