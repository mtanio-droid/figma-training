import { useState, useEffect, useRef } from "react";
import { slides, sectionList } from "./app/components/slide-data";
import { ChevronLeft, ChevronRight, Clock, Monitor, MousePointer2 } from "lucide-react";
import { ThemeContext } from "./app/components/theme-context";

export default function PresenterView() {
  const [idx, setIdx] = useState(0);
  const [startTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [channel] = useState(() => new BroadcastChannel('figma-presenter'));
  const [laserMode, setLaserMode] = useState(false);
  const [localLaser, setLocalLaser] = useState<{ x: number; y: number } | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // プレビューエリアでのレーザーポインター操作
  const handlePreviewMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!laserMode || !previewRef.current) return;

    const rect = previewRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // ローカルプレビューに表示
    setLocalLaser({ x, y });

    // メインappに送信
    channel.postMessage({ type: 'laser', x, y, active: true });
  };

  const handlePreviewMouseLeave = () => {
    setLocalLaser(null);
  };

  const toggleLaser = () => {
    const newMode = !laserMode;
    setLaserMode(newMode);

    if (!newMode) {
      // OFFにしたらレーザーを消す
      setLocalLaser(null);
      channel.postMessage({ type: 'laser', active: false });
    }
  };

  const total = slides.length;
  const currentSlide = slides[idx];
  const nextSlide = idx < total - 1 ? slides[idx + 1] : null;
  const currentSection = sectionList.find((s) => s.id === currentSlide.section);
  const nextSection = nextSlide ? sectionList.find((s) => s.id === nextSlide.section) : null;

  // タイマー
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed(Date.now() - startTime);
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  // ページ移動
  const navigate = (newIdx: number) => {
    const targetIdx = Math.max(0, Math.min(total - 1, newIdx));
    setIdx(targetIdx);
    channel.postMessage({ type: 'navigate', index: targetIdx });
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return `${hours.toString().padStart(2, '0')}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
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

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      {/* ヘッダー */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Monitor className="w-5 h-5 text-purple-400" />
            <h1 className="text-lg font-semibold">発表者ビュー</h1>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={toggleLaser}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                laserMode
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <MousePointer2 className="w-4 h-4" />
              <span className="text-sm font-semibold">レーザー</span>
            </button>
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
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-2 gap-6 max-w-7xl mx-auto">
          {/* 左：スライドプレビュー */}
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <div className="flex items-center gap-2 text-sm text-purple-400 mb-3">
                <span className="font-semibold">スライドプレビュー</span>
                {currentSlide.starred && <span className="text-yellow-400">★</span>}
              </div>

              {/* スライドプレビュー */}
              <div
                ref={previewRef}
                className={`relative bg-gray-900 rounded-lg border-2 overflow-hidden ${
                  laserMode ? 'border-pink-500 cursor-crosshair' : 'border-gray-700'
                }`}
                style={{ aspectRatio: '16/9' }}
                onMouseMove={handlePreviewMouseMove}
                onMouseLeave={handlePreviewMouseLeave}
              >
                <div className="absolute inset-0 flex items-center justify-center scale-[0.45] origin-center">
                  <ThemeContext.Provider value="dark">
                    <div className="w-[1920px] h-[1080px] bg-[#262335]">
                      {currentSlide.content}
                    </div>
                  </ThemeContext.Provider>
                </div>

                {/* ローカルレーザーポインター */}
                {laserMode && localLaser && (
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

                {laserMode && (
                  <div className="absolute top-2 left-2 bg-pink-600 text-white text-xs px-2 py-1 rounded">
                    レーザーモード ON
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 右：原稿 */}
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <div className="text-xs text-gray-500 mb-1">{currentSection?.title}</div>
              <h2 className="text-2xl font-bold mb-2">{currentSlide.title}</h2>

              {currentSlide.message && (
                <div className="text-sm text-gray-400 mb-4 p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                  {currentSlide.message}
                </div>
              )}

              {currentSlide.speakerNotes && (
                <div className="mt-6">
                  <div className="text-sm font-semibold text-emerald-400 mb-3">📝 読み上げ原稿</div>
                  <div className="text-sm leading-relaxed text-gray-300 whitespace-pre-line p-4 bg-gray-900/70 rounded-lg border border-gray-700 max-h-[600px] overflow-y-auto">
                    {currentSlide.speakerNotes}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* フッター（ナビゲーション） */}
      <div className="bg-gray-800 border-t border-gray-700 px-6 py-4">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => navigate(idx - 1)}
            disabled={idx === 0}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600 rounded-lg flex items-center gap-2 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="font-semibold">前へ</span>
          </button>

          <div className="px-6 py-3 bg-purple-900/30 border border-purple-700/50 rounded-lg">
            <span className="text-purple-300 font-mono font-semibold">
              {idx + 1} / {total}
            </span>
          </div>

          <button
            onClick={() => navigate(idx + 1)}
            disabled={idx === total - 1}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-800 disabled:text-gray-600 rounded-lg flex items-center gap-2 transition-colors"
          >
            <span className="font-semibold">次へ</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
