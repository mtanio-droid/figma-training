import { useState, useEffect, useCallback } from "react";
import { slides, sectionList } from "./components/slide-data";
import { ThemeContext, type Theme } from "./components/theme-context";
import { Star, ChevronLeft, ChevronRight, Menu, X, Layers, Component, Variable, Library, Paintbrush, LayoutGrid, Sun, Moon } from "lucide-react";

const sectionIcons: Record<string, React.ReactNode> = {
  intro: <LayoutGrid className="w-3.5 h-3.5" />,
  "auto-layout": <Layers className="w-3.5 h-3.5" />,
  components: <Component className="w-3.5 h-3.5" />,
  variables: <Variable className="w-3.5 h-3.5" />,
  library: <Library className="w-3.5 h-3.5" />,
  tokens: <Paintbrush className="w-3.5 h-3.5" />,
  others: <LayoutGrid className="w-3.5 h-3.5" />,
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
    titleSub: "text-gray-500",
    sectionLabel: "text-gray-500",
    navActive: "text-purple-300",
    navInactive: "text-gray-400 hover:text-gray-200",
    breadcrumbSec: "text-gray-500",
    breadcrumbSlash: "text-gray-600",
    breadcrumbTitle: "text-gray-200",
    counter: "text-gray-500",
    slideNum: "text-gray-500",
    slideTitle: "text-white",
    footerBtn: "text-gray-400 hover:text-white disabled:text-gray-600",
    toggleBtn: "text-gray-500 hover:text-gray-300",
    menuBtn: "text-gray-500 hover:text-gray-300",
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

function App() {
  const [idx, setIdx] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState<Theme>("dark");

  const total = slides.length;
  const slide = slides[idx];
  const section = sectionList.find((s) => s.id === slide.section);
  const c = t[theme];

  const go = useCallback((i: number) => setIdx(Math.max(0, Math.min(total - 1, i))), [total]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(idx - 1);
      if (e.key === "ArrowRight") go(idx + 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [idx, go]);

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
          className={`${sidebarOpen ? "w-64" : "w-0"} transition-all duration-300 overflow-hidden shrink-0 flex flex-col`}
          style={{
            background: c.sidebar,
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRight: c.sidebarBorder,
          }}
        >
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
                    return (
                      <button
                        key={sl.id}
                        onClick={() => go(slideIdx)}
                        className={`w-full text-left pl-9 pr-4 py-1.5 text-[13px] flex items-center gap-1.5 transition-all rounded-r-xl ${
                          isActive
                            ? `${c.navActive} font-medium`
                            : c.navInactive
                        }`}
                        style={isActive ? { background: c.activeItemBg } : {}}
                      >
                        {sl.starred && <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />}
                        <span className="truncate">{sl.title}</span>
                      </button>
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

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`ml-auto ${c.toggleBtn} transition p-1.5 rounded-lg`}
              style={{ background: theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)" }}
              title={theme === "dark" ? "ライトモードに切替" : "ダークモードに切替"}
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <div className={`text-[12px] ${c.counter} shrink-0 tabular-nums`}>
              {idx + 1} / {total}
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
          <div className="flex-1 overflow-y-auto" key={`${idx}-${theme}`}>
            <div className="max-w-6xl mx-auto px-8 py-10">
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

            <div></div>

            <button
              onClick={() => go(idx + 1)}
              disabled={idx === total - 1}
              className={`flex items-center gap-1 text-[13px] ${c.footerBtn} disabled:cursor-not-allowed transition font-medium`}
            >
              次へ <ChevronRight className="w-4 h-4" />
            </button>
          </footer>
        </main>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;