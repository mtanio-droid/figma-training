import { useState, useEffect, useCallback } from "react";
import { slides, sectionList } from "./components/slide-data";
import { ThemeContext, type Theme } from "./components/theme-context";
import { Star, ChevronLeft, ChevronRight, Menu, X, Layers, Component, Variable, Library, Paintbrush, LayoutGrid, Sun, Moon, Bookmark, BookmarkCheck, StickyNote, Trash2, Edit3, Plus, Eye, EyeOff, Target } from "lucide-react";

interface Memo {
  id: string;
  slideIndex: number;
  text: string;
  selectedText?: string;
  createdAt: number;
}

const sectionIcons: Record<string, React.ReactNode> = {
  intro: <LayoutGrid className="w-3.5 h-3.5" />,
  "auto-layout": <Layers className="w-3.5 h-3.5" />,
  components: <Component className="w-3.5 h-3.5" />,
  variables: <Variable className="w-3.5 h-3.5" />,
  library: <Library className="w-3.5 h-3.5" />,
  tokens: <Paintbrush className="w-3.5 h-3.5" />,
  others: <LayoutGrid className="w-3.5 h-3.5" />,
  practice: <Target className="w-3.5 h-3.5" />,
};

/* ── Theme tokens ── */
const t = {
  dark: {
    bg: "linear-gradient(135deg, #0c0c18 0%, #12101f 30%, #16132a 60%, #0e0c1a 100%)",
    sidebar: "rgba(18,16,30,0.8)",
    sidebarBorder: "1px solid rgba(255,255,255,0.06)",
    header: "rgba(12,12,24,0.6)",
    headerBorder: "1px solid rgba(255,255,255,0.06)",
    progressTrack: "rgba(255,255,255,0.04)",
    dotInactive: "rgba(255,255,255,0.12)",
    dotHover: "rgba(255,255,255,0.25)",
    activeItemBg: "rgba(168,85,247,0.12)",
    title: "text-white",
    titleSub: "text-gray-400",
    sectionLabel: "text-gray-400",
    navActive: "text-purple-300",
    navInactive: "text-gray-300 hover:text-gray-100",
    breadcrumbSec: "text-gray-400",
    breadcrumbSlash: "text-gray-500",
    breadcrumbTitle: "text-gray-100",
    counter: "text-gray-400",
    slideNum: "text-gray-400",
    slideTitle: "text-white",
    footerBtn: "text-gray-300 hover:text-white disabled:text-gray-600",
    toggleBtn: "text-gray-400 hover:text-gray-200",
    menuBtn: "text-gray-400 hover:text-gray-200",
  },
  light: {
    bg: "linear-gradient(135deg, #fdfcff 0%, #faf7fd 25%, #f9f5fc 50%, #fdf5fa 75%, #fefcff 100%)",
    sidebar: "rgba(255,255,255,0.55)",
    sidebarBorder: "1px solid rgba(200,170,230,0.12)",
    header: "rgba(255,255,255,0.5)",
    headerBorder: "1px solid rgba(200,170,230,0.1)",
    progressTrack: "rgba(168,85,247,0.06)",
    dotInactive: "rgba(168,85,247,0.15)",
    dotHover: "rgba(168,85,247,0.3)",
    activeItemBg: "rgba(168,85,247,0.1)",
    title: "text-gray-800",
    titleSub: "text-gray-400",
    sectionLabel: "text-gray-400",
    navActive: "text-purple-600",
    navInactive: "text-gray-500 hover:text-gray-700",
    breadcrumbSec: "text-gray-400",
    breadcrumbSlash: "text-gray-300",
    breadcrumbTitle: "text-gray-700",
    counter: "text-gray-400",
    slideNum: "text-gray-400",
    slideTitle: "text-gray-800",
    footerBtn: "text-gray-500 hover:text-gray-800 disabled:text-gray-300",
    toggleBtn: "text-gray-400 hover:text-gray-600",
    menuBtn: "text-gray-400 hover:text-gray-600",
  },
};

// パスワードをここで設定（本番運用では環境変数を推奨）
const PASSWORD = "Figma2026!Design";

function App() {
  const [idx, setIdx] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [bookmarkSidebarOpen, setBookmarkSidebarOpen] = useState(true);
  const [theme, setTheme] = useState<Theme>("dark");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [memos, setMemos] = useState<Memo[]>([]);
  const [leftWidth, setLeftWidth] = useState(256); // 16rem = 256px
  const [rightWidth, setRightWidth] = useState(256);
  const [isResizingLeft, setIsResizingLeft] = useState(false);
  const [isResizingRight, setIsResizingRight] = useState(false);
  const [memoSidebarOpen, setMemoSidebarOpen] = useState(true);
  const [newMemoText, setNewMemoText] = useState("");
  const [editingMemoId, setEditingMemoId] = useState<string | null>(null);
  const [selectionPopup, setSelectionPopup] = useState<{ x: number; y: number; text: string } | null>(null);
  const [memoInputExpanded, setMemoInputExpanded] = useState(false);

  const total = slides.length;
  const slide = slides[idx];
  const section = sectionList.find((s) => s.id === slide.section);
  const c = t[theme];

  const go = useCallback((i: number) => setIdx(Math.max(0, Math.min(total - 1, i))), [total]);

  // 認証状態をlocalStorageから復元
  useEffect(() => {
    const auth = localStorage.getItem("figma-auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // ブックマークをlocalStorageから復元
  useEffect(() => {
    const saved = localStorage.getItem("figma-bookmarks");
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
  }, []);

  // メモをlocalStorageから復元
  useEffect(() => {
    const saved = localStorage.getItem("figma-memos");
    if (saved) {
      setMemos(JSON.parse(saved));
    }
  }, []);

  // ブックマークを追加・削除
  const toggleBookmark = (index: number) => {
    const newBookmarks = bookmarks.includes(index)
      ? bookmarks.filter((i) => i !== index)
      : [...bookmarks, index].sort((a, b) => a - b);
    setBookmarks(newBookmarks);
    localStorage.setItem("figma-bookmarks", JSON.stringify(newBookmarks));
  };

  // メモを追加
  const addMemo = (selectedText?: string) => {
    if (newMemoText.trim() === "") return;
    const memo: Memo = {
      id: Date.now().toString(),
      slideIndex: idx,
      text: newMemoText,
      selectedText,
      createdAt: Date.now(),
    };
    const newMemos = [...memos, memo];
    setMemos(newMemos);
    localStorage.setItem("figma-memos", JSON.stringify(newMemos));
    setNewMemoText("");
    setSelectionPopup(null);
    setMemoInputExpanded(false);
  };

  // テキスト選択からメモを追加
  const addMemoFromSelection = () => {
    if (!selectionPopup) return;
    const memo: Memo = {
      id: Date.now().toString(),
      slideIndex: idx,
      text: "",
      selectedText: selectionPopup.text,
      createdAt: Date.now(),
    };
    const newMemos = [...memos, memo];
    setMemos(newMemos);
    localStorage.setItem("figma-memos", JSON.stringify(newMemos));
    setSelectionPopup(null);
    setMemoSidebarOpen(true);
  };

  // メモを更新
  const updateMemo = (id: string, newText: string) => {
    const newMemos = memos.map((m) => (m.id === id ? { ...m, text: newText } : m));
    setMemos(newMemos);
    localStorage.setItem("figma-memos", JSON.stringify(newMemos));
    setEditingMemoId(null);
  };

  // メモを削除
  const deleteMemo = (id: string) => {
    const newMemos = memos.filter((m) => m.id !== id);
    setMemos(newMemos);
    localStorage.setItem("figma-memos", JSON.stringify(newMemos));
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(idx - 1);
      if (e.key === "ArrowRight") go(idx + 1);
      if (e.key === "Escape") setSelectionPopup(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [idx, go]);

  // Click outside to close selection popup
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (selectionPopup && !target.closest('[data-selection-popup]')) {
        setSelectionPopup(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectionPopup]);

  // 左サイドバーのリサイズ
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizingLeft) {
        const newWidth = Math.max(200, Math.min(500, e.clientX));
        setLeftWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizingLeft(false);
    };

    if (isResizingLeft) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizingLeft]);

  // 右サイドバーのリサイズ
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizingRight) {
        const newWidth = Math.max(200, Math.min(500, window.innerWidth - e.clientX));
        setRightWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizingRight(false);
    };

    if (isResizingRight) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizingRight]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === PASSWORD) {
      localStorage.setItem("figma-auth", "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("パスワードが間違っています");
      setPasswordInput("");
    }
  };

  // 未認証の場合、ログイン画面を表示
  if (!isAuthenticated) {
    return (
      <ThemeContext.Provider value={theme}>
        <div
          className="flex items-center justify-center h-screen"
          style={{
            fontFamily: "'Noto Sans JP', 'Inter', system-ui, sans-serif",
            background: t.dark.bg,
          }}
        >
          <div
            className="w-full max-w-md p-8 rounded-2xl"
            style={{
              background: "rgba(18,16,30,0.8)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <h1 className="text-[24px] text-white font-bold mb-2">🎨 Figma基礎講座</h1>
            <p className="text-[14px] text-gray-400 mb-6">新卒デザイナー向けコンテンツ</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-[13px] text-gray-300 mb-2">
                  パスワード
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full px-4 py-3 pr-12 rounded-lg text-white bg-white/5 border border-white/10 focus:border-purple-400 focus:outline-none transition"
                    placeholder="パスワードを入力"
                    autoFocus
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition"
                    tabIndex={-1}
                  >
                    {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-[13px] text-rose-400">{error}</p>
              )}

              <button
                type="submit"
                className="w-full px-4 py-3 rounded-lg text-white font-medium transition"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                }}
              >
                Let's GO !
              </button>
            </form>
          </div>
        </div>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div
        className="flex h-screen"
        style={{
          fontFamily: "'Noto Sans JP', 'Inter', system-ui, sans-serif",
          background: c.bg,
        }}
      >
        {/* ── Sidebar ── */}
        <aside
          className={`${sidebarOpen ? "" : "w-0"} ${!isResizingLeft && "transition-all duration-300"} overflow-hidden shrink-0 flex flex-col relative`}
          style={{
            width: sidebarOpen ? leftWidth : 0,
            background: c.sidebar,
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRight: c.sidebarBorder,
          }}
        >
          {/* Resize handle */}
          {sidebarOpen && (
            <div
              className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-purple-400/50 transition-colors z-10"
              onMouseDown={() => setIsResizingLeft(true)}
            />
          )}
          <div className="px-5 pt-6 pb-4">
            <div className={`text-[14px] ${c.title}`} style={{ fontWeight: 700 }}>Figma 研修資料</div>
            <div className={`text-[11px] ${c.titleSub} mt-0.5`}>{total} slides / 新卒デザイナー向け</div>
          </div>

          <nav className="flex-1 overflow-y-auto pb-4">
            {sectionList.map((sec) => {
              const secSlides = slides.filter((s) => s.section === sec.id);
              if (secSlides.length === 0) return null;
              return (
                <div key={sec.id} className="mb-1">
                  <div className={`px-5 pt-3 pb-1 text-[11px] ${c.sectionLabel} flex items-center gap-1.5 tracking-wide font-medium`}>
                    {sectionIcons[sec.id]}
                    {sec.title}
                  </div>
                  {secSlides.map((sl) => {
                    const slideIdx = slides.indexOf(sl);
                    const isActive = slideIdx === idx;
                    const isBookmarked = bookmarks.includes(slideIdx);
                    return (
                      <div key={sl.id} className="relative group">
                        <button
                          onClick={() => go(slideIdx)}
                          className={`w-full text-left pl-9 pr-10 py-1.5 text-[13px] flex items-center gap-1.5 transition-all ${
                            isActive
                              ? `${c.navActive} font-medium`
                              : c.navInactive
                          }`}
                          style={isActive ? { background: c.activeItemBg } : {}}
                        >
                          {sl.starred && <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />}
                          <span className="truncate">{sl.title}</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(slideIdx);
                          }}
                          className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded transition-colors ${
                            isBookmarked ? 'text-amber-400 opacity-100' : 'opacity-0 group-hover:opacity-100'
                          } ${c.toggleBtn}`}
                          title={isBookmarked ? "ブックマーク解除" : "ブックマーク追加"}
                        >
                          {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </nav>
        </aside>

        {/* ── Main ── */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header
            className="flex items-center gap-3 px-5 py-3 shrink-0"
            style={{
              background: c.header,
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: c.headerBorder,
            }}
          >
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`${c.menuBtn} transition`}
            >
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

            <div className="flex items-center gap-2 min-w-0 text-[13px]">
              <span className={`${c.breadcrumbSec} shrink-0 flex items-center gap-1`}>
                {sectionIcons[slide.section]}
                {section?.title}
              </span>
              <span className={c.breadcrumbSlash}>/</span>
              <span className={`${c.breadcrumbTitle} truncate flex items-center gap-1.5 font-medium`}>
                {slide.starred && <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />}
                {slide.title}
              </span>
            </div>

            {/* Bookmark current slide */}
            <button
              onClick={() => toggleBookmark(idx)}
              className={`${bookmarks.includes(idx) ? 'text-amber-400' : c.toggleBtn} transition`}
              title={bookmarks.includes(idx) ? "ブックマーク解除" : "ブックマーク追加"}
            >
              {bookmarks.includes(idx) ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>

            {/* Theme toggle switch */}
            <div className="ml-auto flex items-center gap-3">
              <Sun className={`w-4 h-4 transition-colors ${theme === "light" ? "text-amber-500" : c.toggleBtn}`} />
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-200"
                style={{
                  background: theme === "dark" ? "rgba(168,85,247,0.3)" : "rgba(168,85,247,0.2)"
                }}
                title={theme === "dark" ? "ライトモードに切替" : "ダークモードに切替"}
              >
                <span
                  className="inline-block h-5 w-5 transform rounded-full transition-all duration-200"
                  style={{
                    transform: theme === "dark" ? "translateX(22px)" : "translateX(1.5px)",
                    background: theme === "dark"
                      ? "#c4b5fd"
                      : "#fff",
                    boxShadow: theme === "dark"
                      ? "0 2px 6px rgba(168,85,247,0.3)"
                      : "0 2px 4px rgba(0,0,0,0.2)"
                  }}
                />
              </button>
              <Moon className={`w-4 h-4 transition-colors ${theme === "dark" ? "text-purple-300" : c.toggleBtn}`} />
            </div>
          </header>

          {/* Progress */}
          <div className="h-[3px] shrink-0" style={{ background: c.progressTrack }}>
            <div
              className="h-full transition-all duration-500 ease-out rounded-r-full"
              style={{
                width: `${((idx + 1) / total) * 100}%`,
                background: "linear-gradient(90deg, #7c3aed, #a855f7, #c084fc)",
              }}
            />
          </div>

          {/* Content */}
          <div
            className="flex-1 overflow-y-auto relative"
            key={`${idx}-${theme}`}
            onMouseUp={(e) => {
              const selection = window.getSelection();
              const text = selection?.toString().trim();
              if (text && text.length > 0) {
                const range = selection?.getRangeAt(0);
                const rect = range?.getBoundingClientRect();
                if (rect) {
                  setSelectionPopup({
                    x: rect.left + rect.width / 2,
                    y: rect.top - 10,
                    text: text,
                  });
                }
              } else {
                setSelectionPopup(null);
              }
            }}
          >
            {/* Selection Popup */}
            {selectionPopup && (
              <div
                data-selection-popup
                className="fixed z-50 flex items-center gap-2 px-3 py-2 rounded-lg shadow-lg"
                style={{
                  left: `${selectionPopup.x}px`,
                  top: `${selectionPopup.y}px`,
                  transform: 'translate(-50%, -100%)',
                  background: theme === "dark" ? "rgba(18,16,30,0.95)" : "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(12px)",
                  border: `1px solid ${theme === "dark" ? "rgba(168,85,247,0.3)" : "rgba(168,85,247,0.2)"}`,
                  boxShadow: "0 4px 20px rgba(168,85,247,0.3)",
                }}
              >
                <button
                  onClick={addMemoFromSelection}
                  className="flex items-center gap-1.5 px-2 py-1 rounded text-[12px] font-medium transition"
                  style={{
                    background: theme === "dark" ? "rgba(168,85,247,0.2)" : "rgba(168,85,247,0.15)",
                    color: theme === "dark" ? "#c4b5fd" : "#7c3aed"
                  }}
                >
                  <StickyNote className="w-3.5 h-3.5" />
                  メモを追加
                </button>
                <button
                  onClick={() => setSelectionPopup(null)}
                  className={`p-1 rounded transition ${c.toggleBtn}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            <div className="max-w-6xl mx-auto px-16 py-10">
              {slide.id !== "title" && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[12px] ${c.slideNum}`}>{String(idx + 1).padStart(2, "0")}</span>
                    {slide.starred && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                  </div>
                  <h2 className={`text-[24px] ${c.slideTitle} leading-snug`} style={{ fontWeight: 700 }}>
                    {slide.title}
                  </h2>
                </div>
              )}
              {slide.content}
            </div>
          </div>

          {/* Footer nav */}
          <footer
            className="flex items-center justify-between px-6 py-3 shrink-0"
            style={{
              background: c.header,
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderTop: c.headerBorder,
            }}
          >
            <button
              onClick={() => go(idx - 1)}
              disabled={idx === 0}
              className={`flex items-center gap-1 text-[13px] ${c.footerBtn} disabled:cursor-not-allowed transition font-medium`}
            >
              <ChevronLeft className="w-4 h-4" /> 前へ
            </button>

            <div className={`text-[13px] ${c.counter} font-medium tabular-nums`}>
              {idx + 1} / {total}
            </div>

            <button
              onClick={() => go(idx + 1)}
              disabled={idx === total - 1}
              className={`flex items-center gap-1 text-[13px] ${c.footerBtn} disabled:cursor-not-allowed transition font-medium`}
            >
              次へ <ChevronRight className="w-4 h-4" />
            </button>
          </footer>
        </main>

        {/* ── Memo Sidebar ── */}
        <aside
          className={`${memoSidebarOpen ? "" : "w-0"} ${!isResizingRight && "transition-all duration-300"} overflow-hidden shrink-0 flex flex-col relative`}
          style={{
            width: memoSidebarOpen ? rightWidth : 0,
            background: c.sidebar,
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderLeft: c.sidebarBorder,
          }}
        >
          {/* Resize handle */}
          {memoSidebarOpen && (
            <div
              className="absolute top-0 left-0 w-1 h-full cursor-col-resize hover:bg-purple-400/50 transition-colors z-10"
              onMouseDown={() => setIsResizingRight(true)}
            />
          )}
          <div className="px-5 pt-6 pb-4">
            <div className={`text-[14px] ${c.title}`} style={{ fontWeight: 700 }}>メモ</div>
            <div className={`text-[11px] ${c.titleSub} mt-0.5`}>{memos.filter(m => m.slideIndex === idx).length}件（このページ）</div>
          </div>

          {/* Add memo form */}
          <div className="px-5 pb-4">
            {!memoInputExpanded ? (
              <button
                onClick={() => setMemoInputExpanded(true)}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-[13px] font-medium transition-colors ${
                  theme === "dark"
                    ? "text-purple-300 hover:text-purple-200 bg-white/5 hover:bg-white/10"
                    : "text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100"
                }`}
                style={{
                  border: theme === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(168,85,247,0.15)"
                }}
              >
                <Plus className="w-4 h-4" />
                <span>新しいメモ</span>
              </button>
            ) : (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <textarea
                  value={newMemoText}
                  onChange={(e) => setNewMemoText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      addMemo();
                    }
                    if (e.key === "Escape") {
                      setMemoInputExpanded(false);
                      setNewMemoText("");
                    }
                  }}
                  placeholder="メモを入力... (Shift+Enter で改行)"
                  autoFocus
                  className={`w-full px-3 py-2 rounded-lg text-[13px] bg-white/5 border transition focus:outline-none focus:border-purple-400 resize-none`}
                  style={{
                    borderColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                    color: theme === "dark" ? "#fff" : "#000",
                    minHeight: "80px"
                  }}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => addMemo()}
                    disabled={newMemoText.trim() === ""}
                    className="flex-1 py-2 rounded-lg text-[13px] font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: newMemoText.trim()
                        ? (theme === "dark"
                          ? "linear-gradient(135deg, #7c3aed, #a855f7)"
                          : "linear-gradient(135deg, #7c3aed, #9333ea)")
                        : (theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"),
                      color: newMemoText.trim() ? "#fff" : (theme === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"),
                      boxShadow: newMemoText.trim() ? "0 2px 8px rgba(168,85,247,0.3)" : "none"
                    }}
                  >
                    追加
                  </button>
                  <button
                    onClick={() => {
                      setMemoInputExpanded(false);
                      setNewMemoText("");
                    }}
                    className={`px-4 py-2 rounded-lg text-[13px] transition-all hover:scale-[1.02] active:scale-[0.98]`}
                    style={{
                      background: theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                      color: theme === "dark" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)"
                    }}
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            )}
          </div>

          <nav className="flex-1 overflow-y-auto pb-4 px-5">
            {memos.filter(m => m.slideIndex === idx).length === 0 ? (
              <div className={`py-8 text-[13px] ${c.titleSub} text-center`}>
                このページにメモがありません
              </div>
            ) : (
              <div className="space-y-3">
                {memos
                  .filter((m) => m.slideIndex === idx)
                  .sort((a, b) => b.createdAt - a.createdAt)
                  .map((memo) => (
                    <div
                      key={memo.id}
                      className="rounded-lg p-3 transition-all"
                      style={{
                        background: theme === "dark" ? "rgba(168,85,247,0.08)" : "rgba(168,85,247,0.06)",
                        border: `1px solid ${theme === "dark" ? "rgba(168,85,247,0.2)" : "rgba(168,85,247,0.15)"}`
                      }}
                    >
                      {editingMemoId === memo.id ? (
                        <div className="space-y-2">
                          {memo.selectedText && (
                            <div
                              className="px-2 py-1.5 rounded text-[12px] italic border-l-2"
                              style={{
                                background: theme === "dark" ? "rgba(168,85,247,0.05)" : "rgba(168,85,247,0.03)",
                                borderLeftColor: theme === "dark" ? "rgba(168,85,247,0.4)" : "rgba(168,85,247,0.3)",
                                color: theme === "dark" ? "rgba(196,181,253,0.8)" : "rgba(124,58,237,0.8)"
                              }}
                            >
                              "{memo.selectedText}"
                            </div>
                          )}
                          <textarea
                            defaultValue={memo.text}
                            onBlur={(e) => {
                              updateMemo(memo.id, e.target.value);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                updateMemo(memo.id, e.currentTarget.value);
                              }
                              if (e.key === "Escape") {
                                setEditingMemoId(null);
                              }
                            }}
                            autoFocus
                            placeholder="メモを入力..."
                            className={`w-full px-2 py-1 rounded text-[13px] bg-white/5 border resize-none`}
                            style={{
                              borderColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                              color: theme === "dark" ? "#fff" : "#000",
                              minHeight: "60px"
                            }}
                          />
                        </div>
                      ) : (
                        <>
                          {memo.selectedText && (
                            <div
                              className="mb-2 px-2 py-1.5 rounded text-[12px] italic border-l-2"
                              style={{
                                background: theme === "dark" ? "rgba(168,85,247,0.05)" : "rgba(168,85,247,0.03)",
                                borderLeftColor: theme === "dark" ? "rgba(168,85,247,0.4)" : "rgba(168,85,247,0.3)",
                                color: theme === "dark" ? "rgba(196,181,253,0.8)" : "rgba(124,58,237,0.8)"
                              }}
                            >
                              "{memo.selectedText}"
                            </div>
                          )}
                          {memo.text && (
                            <div className={`text-[13px] ${c.title} leading-relaxed mb-2 whitespace-pre-wrap`}>
                              {memo.text}
                            </div>
                          )}
                          {!memo.text && memo.selectedText && (
                            <div
                              className={`text-[12px] ${c.titleSub} italic mb-2 cursor-pointer hover:opacity-70`}
                              onClick={() => setEditingMemoId(memo.id)}
                            >
                              クリックしてメモを追加...
                            </div>
                          )}
                          <div className="flex items-center justify-between">
                            <div className={`text-[10px] ${c.titleSub}`}>
                              {new Date(memo.createdAt).toLocaleString('ja-JP', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <div className="flex gap-1">
                              <button
                                onClick={() => setEditingMemoId(memo.id)}
                                className={`p-1 rounded transition ${c.toggleBtn}`}
                                title="編集"
                              >
                                <Edit3 className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => deleteMemo(memo.id)}
                                className="p-1 rounded transition text-rose-400 hover:text-rose-300"
                                title="削除"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </nav>
        </aside>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;