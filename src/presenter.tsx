import { useState, useEffect } from "react";
import { slides, sectionList } from "./app/components/slide-data";
import { ChevronLeft, ChevronRight, Clock, Monitor, MousePointer2 } from "lucide-react";

export default function PresenterView() {
  const [idx, setIdx] = useState(0);
  const [startTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [channel] = useState(() => new BroadcastChannel('figma-presenter'));
  const [laserMode, setLaserMode] = useState(false);

  // レーザーポインターの座標送信
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!laserMode) return;

    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;

    channel.postMessage({ type: 'laser', x, y, active: true });
  };

  const toggleLaser = () => {
    const newMode = !laserMode;
    setLaserMode(newMode);

    if (!newMode) {
      // OFFにしたらレーザーを消す
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
    <div className="h-screen bg-gray-900 text-white flex flex-col" onMouseMove={handleMouseMove}>
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
        <div className="grid grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* 現在のスライド */}
          <div className="col-span-2 space-y-4">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <div className="flex items-center gap-2 text-sm text-purple-400 mb-3">
                <span className="font-semibold">現在のスライド</span>
                {currentSlide.starred && <span className="text-yellow-400">★</span>}
              </div>

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
                  <div className="text-sm leading-relaxed text-gray-300 whitespace-pre-line p-4 bg-gray-900/70 rounded-lg border border-gray-700 max-h-96 overflow-y-auto">
                    {currentSlide.speakerNotes}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 次のスライド */}
          <div className="space-y-4">
            {nextSlide ? (
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 opacity-70">
                <div className="text-sm text-blue-400 font-semibold mb-3">次のスライド →</div>

                <div className="text-xs text-gray-500 mb-1">{nextSection?.title}</div>
                <h3 className="text-xl font-bold mb-2">{nextSlide.title}</h3>

                {nextSlide.message && (
                  <div className="text-xs text-gray-400 p-2 bg-gray-900/50 rounded border border-gray-700">
                    {nextSlide.message}
                  </div>
                )}

                {nextSlide.speakerNotes && (
                  <div className="mt-4">
                    <div className="text-xs text-gray-500 mb-2">読み上げ原稿</div>
                    <div className="text-xs leading-relaxed text-gray-400 whitespace-pre-line p-3 bg-gray-900/70 rounded border border-gray-700 max-h-32 overflow-y-auto line-clamp-6">
                      {nextSlide.speakerNotes.slice(0, 200)}...
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 opacity-50 text-center">
                <div className="text-gray-500">これが最後のスライドです</div>
              </div>
            )}
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
