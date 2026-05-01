import React, { useState, useEffect } from "react";
import {
  Layers,
  Component,
  Variable,
  Library,
  Paintbrush,
  LayoutGrid,
  ArrowRight,
  ArrowDown,
  Type,
  ToggleLeft,
  RefreshCw,
  Columns3,
  Star,
  Search,
  Palette,
  ChevronRight,
  Box,
  Sparkles,
  Target,
  Link2,
  Users,
  Tag,
  CircleDot,
  Repeat,
  GitBranch,
  BookOpen,
  Upload,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Smartphone,
  Minus,
  X,
  MapPin,
  Check,
  Clock,
  Plus,
  Package,
  Maximize,
  Monitor,
  Coffee,
  Play,
  Pause,
} from "lucide-react";
import { useTheme, type Theme } from "./theme-context";

/* ═══ Types ═══ */
export interface SlideSection { id: string; title: string; }
export interface Slide { id: string; section: string; title: string; starred?: boolean; message: string; content: React.ReactNode; speakerNotes?: string; }

/* ═══ Theme color helper ═══ */
function tc(theme: Theme) {
  const d = theme === "dark";
  return {
    t1: d ? "text-white" : "text-gray-800",
    t2: d ? "text-gray-200" : "text-gray-700",
    t3: d ? "text-gray-300" : "text-gray-600",
    t4: d ? "text-gray-400" : "text-gray-500",
    t5: d ? "text-gray-500" : "text-gray-400",
    t6: d ? "text-gray-600" : "text-gray-300",
    b1: d ? "bg-gray-600" : "bg-gray-200",
    b2: d ? "bg-gray-700" : "bg-gray-100",
    b3: d ? "bg-gray-800" : "bg-gray-50",
    bd1: d ? "border-gray-600" : "border-gray-200",
    bd2: d ? "border-gray-700" : "border-gray-200",
    rn: d ? "ring-gray-900" : "ring-white",
    glass: d ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.5)",
    glass2: d ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.55)",
    glass3: d ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.6)",
    glassBd: d ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(200,170,230,0.15)",
    glassBd2: d ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(200,170,230,0.2)",
    sub: d ? "rgba(255,255,255,0.02)" : "rgba(200,170,230,0.04)",
    div: d ? "rgba(255,255,255,0.06)" : "rgba(200,170,230,0.12)",
    div2: d ? "rgba(255,255,255,0.1)" : "rgba(200,170,230,0.15)",
    secBtnBg: d ? "rgba(255,255,255,0.06)" : "rgba(200,170,230,0.06)",
    secBtnBd: d ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(200,170,230,0.15)",
    bd2c: d ? "border-gray-800" : "border-white",
    shadow: d ? "0 4px 24px rgba(0,0,0,0.2)" : "0 4px 24px rgba(200,170,230,0.1)",
    shadow2: d ? "0 2px 12px rgba(0,0,0,0.15)" : "0 2px 12px rgba(200,170,230,0.06)",
  };
}

/* ═══ Shared Components ═══ */

function ExpandableImage({ src, alt }: { src: string; alt: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const d = theme === "dark";

  useEffect(() => {
    if (isOpen) {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsOpen(false);
      };
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }
  }, [isOpen]);

  return (
    <>
      <img
        src={src}
        alt={alt}
        onClick={() => setIsOpen(true)}
        className="cursor-pointer transition-transform hover:scale-[1.02]"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block'
        }}
      />
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-8 animate-in fade-in duration-200"
          style={{
            background: d ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(8px)',
          }}
          onClick={() => setIsOpen(false)}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full transition-colors hover:bg-white/20"
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
            }}
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain animate-in zoom-in-95 duration-300 rounded-2xl"
            style={{
              boxShadow: d ? '0 25px 50px -12px rgba(0,0,0,0.5)' : '0 25px 50px -12px rgba(0,0,0,0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

function ExpandableVideo({ src }: { src: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const d = theme === "dark";

  useEffect(() => {
    if (isOpen) {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsOpen(false);
      };
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }
  }, [isOpen]);

  return (
    <>
      <video
        src={src}
        controls
        onClick={() => setIsOpen(true)}
        className="cursor-pointer transition-transform hover:scale-[1.02]"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block'
        }}
      />
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-8 animate-in fade-in duration-200"
          style={{
            background: d ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(8px)',
          }}
          onClick={() => setIsOpen(false)}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full transition-colors hover:bg-white/20"
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
            }}
          >
            <X className="w-6 h-6" />
          </button>
          <video
            src={src}
            controls
            autoPlay
            className="max-w-full max-h-full object-contain animate-in zoom-in-95 duration-300 rounded-2xl"
            style={{
              boxShadow: d ? '0 25px 50px -12px rgba(0,0,0,0.5)' : '0 25px 50px -12px rgba(0,0,0,0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

function Msg({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="py-2 text-[15px] leading-relaxed font-semibold"
      style={{
        background: "linear-gradient(135deg, #f472b6 0%, #ec4899 25%, #d946ef 50%, #a855f7 75%, #c084fc 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </div>
  );
}

function Point({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const c = tc(theme);
  return (
    <li className={`flex gap-3 items-start text-[14px] leading-relaxed ${c.t3}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-[0.45rem]" />
      <span>{children}</span>
    </li>
  );
}

function Points({ items }: { items: React.ReactNode[] }) {
  return <ul className="space-y-2.5">{items.map((item, i) => <Point key={i}>{item}</Point>)}</ul>;
}

function Tip({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const d = theme === "dark";
  return (
    <div className={`mt-auto pt-4 text-[12px] ${d ? "text-purple-300" : "text-purple-600"} flex gap-2 items-start`} style={{ borderTop: `1px solid ${d ? "rgba(168,85,247,0.15)" : "rgba(168,85,247,0.12)"}` }}>
      <span className="shrink-0">💡</span>
      <span>{children}</span>
    </div>
  );
}

function Ng({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const d = theme === "dark";
  return (
    <div className={`mt-auto pt-4 text-[12px] ${d ? "text-rose-300" : "text-rose-600"} flex gap-2 items-start`} style={{ borderTop: `1px solid ${d ? "rgba(244,63,94,0.15)" : "rgba(244,63,94,0.12)"}` }}>
      <span className="shrink-0">⚠️</span>
      <span>{children}</span>
    </div>
  );
}

function Vis({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const theme = useTheme();
  const c = tc(theme);
  return (
    <div className={`rounded-2xl p-6 ${className}`} style={{ background: c.glass, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: c.glassBd, boxShadow: c.shadow }}>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-[12px] tracking-wide text-purple-400 uppercase mb-3 font-medium">{children}</div>;
}

function Pill({ children, color = "bg-purple-500/20 text-purple-300" }: { children: React.ReactNode; color?: string }) {
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-medium ${color}`}>{children}</span>;
}

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const theme = useTheme();
  const c = tc(theme);
  return (
    <div className={`rounded-xl p-4 ${className}`} style={{ background: c.glass2, border: c.glassBd, boxShadow: c.shadow2 }}>
      {children}
    </div>
  );
}

function Comp({ label, children }: { label?: string; children: React.ReactNode; border?: string }) {
  const theme = useTheme();
  const c = tc(theme);
  return (
    <GlassCard>
      {label && <div className={`text-[12px] ${c.t5} mb-2`}>{label}</div>}
      {children}
    </GlassCard>
  );
}

/* ═══ Sections ═══ */
export const sectionList: SlideSection[] = [
  { id: "intro", title: "イントロ" },
  { id: "auto-layout", title: "Auto Layout" },
  { id: "responsive", title: "レスポンシブ対応" },
  { id: "components", title: "コンポーネント" },
  { id: "variables", title: "Variables" },
  { id: "library", title: "ライブラリ" },
  { id: "tokens", title: "デザイントークン" },
  { id: "others", title: "その他 & まとめ" },
  { id: "practice", title: "実践課題" },
];

/* ═══ Slide Content Components ═══ */

function TitleSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="flex flex-col items-center text-center gap-8 py-4">
      <div className="text-[13px] text-purple-400 tracking-widest uppercase">新卒デザイナー向け研修</div>
      <h1 className={`text-[32px] ${c.t1} leading-tight max-w-lg`} style={{ fontWeight: 800 }}>
        Figmaを「描く道具」から<br />「設計の道具」へ
      </h1>
      <p className={`text-[15px] ${c.t4} max-w-md leading-relaxed`}>実務で効く Figma の考え方</p>

      {/* Hero comparison visual */}
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-2 gap-8 items-start">
          {/* Before - Unstructured */}
          <div className="space-y-3">
            <Label>Before</Label>
            <div
              className={`relative h-[340px] border border-dashed ${c.bd1} rounded-2xl overflow-hidden`}
              style={{
                background: c.sub,
                boxShadow: d ? '0 4px 24px rgba(0,0,0,0.2)' : '0 4px 24px rgba(0,0,0,0.06)'
              }}
            >
              {/* Chaotic, misaligned elements */}
              <div className={`absolute top-4 left-5 w-28 h-6 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded`} style={{ transform: 'rotate(-1deg)' }} />
              <div className={`absolute top-[52px] left-8 w-32 h-4 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded opacity-70`} style={{ transform: 'rotate(0.5deg)' }} />
              <div className={`absolute top-[76px] left-7 w-36 h-3 ${d ? "bg-gray-800/60" : "bg-gray-100"} rounded opacity-60`} />
              <div className={`absolute top-[95px] left-11 w-28 h-3 ${d ? "bg-gray-800/60" : "bg-gray-100"} rounded opacity-50`} style={{ transform: 'rotate(-0.3deg)' }} />

              <div className={`absolute top-[130px] left-6 w-20 h-8 ${d ? "bg-gray-700" : "bg-gray-300"} rounded`} style={{ transform: 'rotate(-0.8deg)' }} />
              <div className={`absolute top-[132px] right-8 w-24 h-8 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded`} style={{ transform: 'rotate(1deg)' }} />

              <div className={`absolute bottom-[60px] left-9 w-2 h-2 rounded-full ${d ? "bg-gray-700" : "bg-gray-300"}`} />
              <div className={`absolute bottom-[58px] left-14 w-16 h-3 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded opacity-70`} />

              <div className={`absolute bottom-[32px] left-9 w-2 h-2 rounded-full ${d ? "bg-gray-700" : "bg-gray-300"}`} />
              <div className={`absolute bottom-[30px] left-14 w-20 h-3 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded opacity-70`} />

              <div className={`absolute bottom-3 right-5 w-14 h-6 ${d ? "bg-gray-700" : "bg-gray-300"} rounded`} style={{ transform: 'rotate(-1.5deg)' }} />
            </div>
            <div className={`text-[12px] ${c.t5} text-center`}>余白・配置が不揃い</div>
          </div>

          {/* After - Structured with Auto Layout hints */}
          <div className="space-y-3">
            <Label>After</Label>
            <div
              className="relative h-[340px] rounded-2xl overflow-hidden"
              style={{
                background: d ? 'rgba(168,85,247,0.03)' : 'rgba(168,85,247,0.02)',
                border: `2px solid ${d ? 'rgba(168,85,247,0.25)' : 'rgba(168,85,247,0.2)'}`,
                boxShadow: d
                  ? '0 8px 32px rgba(168,85,247,0.15), 0 0 0 1px rgba(168,85,247,0.1) inset, 0 0 64px rgba(168,85,247,0.08)'
                  : '0 8px 32px rgba(168,85,247,0.12), 0 0 0 1px rgba(255,255,255,0.6) inset, 0 0 48px rgba(168,85,247,0.06)'
              }}
            >
              {/* Auto Layout container */}
              <div className="h-full p-5 flex flex-col gap-4 relative">
                {/* Header section with card look */}
                <div
                  className="rounded-lg p-3"
                  style={{
                    background: d ? 'rgba(168,85,247,0.08)' : 'rgba(168,85,247,0.06)',
                    boxShadow: d ? '0 2px 8px rgba(0,0,0,0.15)' : '0 2px 8px rgba(168,85,247,0.08)'
                  }}
                >
                  <div className={`w-3/4 h-5 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded mb-2`} />
                  <div className={`w-1/2 h-3 ${d ? "bg-gray-800/60" : "bg-gray-100"} rounded`} />
                </div>

                {/* Content section */}
                <div
                  className="flex-1 rounded-lg p-4 flex flex-col gap-2.5"
                  style={{
                    background: d ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.5)',
                    border: `1px solid ${d ? 'rgba(255,255,255,0.06)' : 'rgba(168,85,247,0.08)'}`,
                    boxShadow: d ? '0 2px 8px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.03)'
                  }}
                >
                  <div className={`w-full h-3 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded`} />
                  <div className={`w-5/6 h-3 ${d ? "bg-gray-800/60" : "bg-gray-100"} rounded`} />

                  {/* List items */}
                  <div className="flex flex-col gap-2 mt-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${d ? "bg-gray-700" : "bg-gray-300"}`} />
                      <div className={`w-4/5 h-2.5 ${d ? "bg-gray-800/60" : "bg-gray-100"} rounded`} />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${d ? "bg-gray-700" : "bg-gray-300"}`} />
                      <div className={`w-3/4 h-2.5 ${d ? "bg-gray-800/60" : "bg-gray-100"} rounded`} />
                    </div>
                  </div>
                </div>

                {/* Button group */}
                <div className="flex gap-2">
                  <div
                    className="h-9 rounded-lg flex-1"
                    style={{
                      background: 'linear-gradient(135deg, rgba(168,85,247,0.5), rgba(168,85,247,0.4))',
                      boxShadow: d ? '0 4px 12px rgba(168,85,247,0.3)' : '0 4px 12px rgba(168,85,247,0.2)'
                    }}
                  />
                  <div
                    className="h-9 rounded-lg flex-1"
                    style={{
                      background: d ? 'rgba(168,85,247,0.12)' : 'rgba(168,85,247,0.08)',
                      border: `1px solid ${d ? 'rgba(168,85,247,0.3)' : 'rgba(168,85,247,0.2)'}`
                    }}
                  />
                </div>

                {/* Auto Layout guides overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Vertical spacing indicators */}
                  <div className="absolute left-1 top-5 bottom-5 flex flex-col justify-between items-start">
                    <div className="text-[9px] text-purple-400/60 font-mono">16</div>
                    <div className="text-[9px] text-purple-400/60 font-mono">16</div>
                    <div className="text-[9px] text-purple-400/60 font-mono">16</div>
                  </div>

                  {/* Padding guides */}
                  <div
                    className="absolute top-0 left-0 right-0 h-5 border-b border-dashed border-purple-400/20"
                    style={{ background: 'linear-gradient(to bottom, rgba(168,85,247,0.06), transparent)' }}
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 h-5 border-t border-dashed border-purple-400/20"
                    style={{ background: 'linear-gradient(to top, rgba(168,85,247,0.06), transparent)' }}
                  />
                </div>
              </div>
            </div>
            <div className="text-[12px] text-purple-400 text-center font-medium">階層・余白が設計されている</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GoalSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg><strong>デザインシステムの実践的な使い方</strong>をイメージできる・実践できる状態になる</Msg>
      <Points items={["コンポーネント、トークン、レイアウトシステムを理解する","実務で変更に強く、チームで共有しやすい設計を作れる"]} />

      <div className="w-full">
        <div className="grid grid-cols-2 gap-8 items-start">
          {/* Before - Ad-hoc Design */}
          <div className="space-y-3">
            <div className="text-[13px] text-rose-400 mb-2 font-medium flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              <span>個別のデザイン</span>
            </div>
            <div
              className="h-[320px] rounded-2xl p-4 space-y-3"
              style={{
                background: c.sub,
                border: `1px solid ${c.bd1}`,
                boxShadow: d ? '0 4px 20px rgba(0,0,0,0.2)' : '0 4px 20px rgba(0,0,0,0.06)'
              }}
            >
              {/* Scattered individual designs */}
              <div
                className="rounded-lg p-2.5"
                style={{
                  background: d ? 'rgba(244,63,94,0.08)' : 'rgba(244,63,94,0.05)',
                  border: `1px dashed ${d ? 'rgba(244,63,94,0.3)' : 'rgba(244,63,94,0.2)'}`,
                  transform: 'rotate(-0.5deg)'
                }}
              >
                <div className={`w-3/4 h-3 ${c.b2} rounded mb-1.5`} />
                <div className={`w-16 h-6 ${c.b1} rounded`} style={{ transform: 'rotate(0.8deg)' }} />
              </div>

              <div
                className="rounded-lg p-2.5"
                style={{
                  background: d ? 'rgba(244,63,94,0.08)' : 'rgba(244,63,94,0.05)',
                  border: `1px dashed ${d ? 'rgba(244,63,94,0.3)' : 'rgba(244,63,94,0.2)'}`,
                  transform: 'rotate(0.8deg)'
                }}
              >
                <div className={`w-4/5 h-3 ${c.b2} rounded mb-1.5`} />
                <div className={`w-20 h-6 ${c.b1} rounded`} style={{ transform: 'rotate(-0.5deg)' }} />
              </div>

              <div
                className="rounded-lg p-2.5"
                style={{
                  background: d ? 'rgba(244,63,94,0.08)' : 'rgba(244,63,94,0.05)',
                  border: `1px dashed ${d ? 'rgba(244,63,94,0.3)' : 'rgba(244,63,94,0.2)'}`,
                  transform: 'rotate(-1deg)'
                }}
              >
                <div className={`w-2/3 h-3 ${c.b2} rounded mb-1.5`} />
                <div className={`w-14 h-6 ${c.b1} rounded`} style={{ transform: 'rotate(1.2deg)' }} />
              </div>

              <div className={`text-[12px] ${c.t5} text-center italic mt-3`}>
                都度作成、統一性なし
              </div>
            </div>
          </div>

          {/* After - Design System */}
          <div className="space-y-3">
            <div className="text-[13px] text-emerald-400 mb-2 font-medium flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>デザインシステム</span>
            </div>
            <div
              className="h-[320px] rounded-2xl p-4 relative overflow-hidden"
              style={{
                background: d ? 'rgba(16,185,129,0.04)' : 'rgba(16,185,129,0.02)',
                border: `2px solid ${d ? 'rgba(16,185,129,0.25)' : 'rgba(16,185,129,0.2)'}`,
                boxShadow: d
                  ? '0 8px 32px rgba(16,185,129,0.2), 0 0 0 1px rgba(16,185,129,0.1) inset'
                  : '0 8px 32px rgba(16,185,129,0.15), 0 0 0 1px rgba(255,255,255,0.6) inset'
              }}
            >
              <div className="space-y-3 relative z-10">
                {/* Tokens section */}
                <div
                  className="rounded-lg p-2 border"
                  style={{
                    background: d ? 'rgba(16,185,129,0.08)' : 'rgba(16,185,129,0.06)',
                    borderColor: d ? 'rgba(16,185,129,0.3)' : 'rgba(16,185,129,0.2)',
                    boxShadow: '0 2px 8px rgba(16,185,129,0.1)'
                  }}
                >
                  <div className="text-[9px] text-emerald-400 mb-1.5 font-medium">Tokens</div>
                  <div className="flex gap-1.5">
                    <div className="w-4 h-4 rounded bg-purple-500/40" />
                    <div className="w-4 h-4 rounded bg-purple-500/30" />
                    <div className="w-4 h-4 rounded bg-purple-500/20" />
                  </div>
                </div>

                {/* Components section */}
                <div
                  className="rounded-lg p-2 border"
                  style={{
                    background: d ? 'rgba(168,85,247,0.08)' : 'rgba(168,85,247,0.06)',
                    borderColor: d ? 'rgba(168,85,247,0.3)' : 'rgba(168,85,247,0.2)',
                    boxShadow: '0 2px 8px rgba(168,85,247,0.1)'
                  }}
                >
                  <div className="text-[9px] text-purple-400 mb-2 font-medium">Components</div>
                  <div className="space-y-1.5">
                    <div className="rounded p-1.5 flex items-center gap-1.5" style={{ background: d ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.6)' }}>
                      <div className="w-2/3 h-2 bg-purple-500/25 rounded" />
                      <div className="w-10 h-4 bg-purple-500/40 rounded" />
                    </div>
                    <div className="rounded p-1.5 flex items-center gap-1.5" style={{ background: d ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.6)' }}>
                      <div className="w-3/5 h-2 bg-purple-500/25 rounded" />
                      <div className="w-10 h-4 bg-purple-500/40 rounded" />
                    </div>
                  </div>
                </div>

                {/* Layout system section */}
                <div
                  className="rounded-lg p-2 border"
                  style={{
                    background: d ? 'rgba(16,185,129,0.08)' : 'rgba(16,185,129,0.06)',
                    borderColor: d ? 'rgba(16,185,129,0.3)' : 'rgba(16,185,129,0.2)',
                    boxShadow: '0 2px 8px rgba(16,185,129,0.1)'
                  }}
                >
                  <div className="text-[9px] text-emerald-400 mb-1.5 font-medium">Auto Layout</div>
                  <div className="flex gap-1">
                    <div className="text-[8px] text-emerald-400/70 font-mono">8</div>
                    <div className="text-[8px] text-emerald-400/70 font-mono">16</div>
                    <div className="text-[8px] text-emerald-400/70 font-mono">24</div>
                  </div>
                </div>
              </div>

              {/* Connection lines indicating system */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <svg className="w-full h-full" style={{ opacity: 0.15 }}>
                  <line x1="50%" y1="30%" x2="50%" y2="50%" stroke={d ? "#10b981" : "#059669"} strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="50%" y1="50%" x2="50%" y2="70%" stroke={d ? "#10b981" : "#059669"} strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="50%" cy="30%" r="3" fill={d ? "#10b981" : "#059669"} />
                  <circle cx="50%" cy="50%" r="3" fill={d ? "#10b981" : "#059669"} />
                  <circle cx="50%" cy="70%" r="3" fill={d ? "#10b981" : "#059669"} />
                </svg>
              </div>

              <div className={`absolute bottom-4 left-0 right-0 text-[12px] ${c.t3} text-center italic`}>
                一度作れば再利用、統一性あり
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tip>デザインシステムは制約ではなく、チームの共通言語であり、変更を味方につける仕組み</Tip>
    </div>
  );
}

function OverviewSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg>5つのテーマを組み合わせて、<strong>壊れにくいデザイン</strong>を作る</Msg>

      <div className="flex flex-col items-center gap-4 max-w-2xl mx-auto">
        {/* Step 1: 基礎を作る */}
        <div className={`w-full text-center text-[13px] font-semibold ${c.t3}`}>
          ① 基礎を作る
        </div>

        <div className="grid grid-cols-3 gap-4 w-full">
          {/* Auto Layout */}
          <div
            className="rounded-xl px-4 py-3"
            style={{
              background: d ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.06)',
              border: `2px solid ${d ? 'rgba(59,130,246,0.25)' : 'rgba(59,130,246,0.2)'}`,
              boxShadow: d ? '0 4px 12px rgba(59,130,246,0.15)' : '0 4px 12px rgba(59,130,246,0.1)'
            }}
          >
            <div className="flex justify-center mb-2">
              <Layers className="w-5 h-5 text-blue-400" />
            </div>
            <div className={`text-[13px] font-semibold mb-1 text-center ${d ? 'text-blue-200' : 'text-blue-700'}`}>
              並び方を決める
            </div>
            <div className={`text-[11px] text-center ${c.t5}`}>Auto Layout</div>
          </div>

          {/* Component */}
          <div
            className="rounded-xl px-4 py-3"
            style={{
              background: d ? 'rgba(168,85,247,0.08)' : 'rgba(168,85,247,0.06)',
              border: `2px solid ${d ? 'rgba(168,85,247,0.25)' : 'rgba(168,85,247,0.2)'}`,
              boxShadow: d ? '0 4px 12px rgba(168,85,247,0.15)' : '0 4px 12px rgba(168,85,247,0.1)'
            }}
          >
            <div className="flex justify-center mb-2">
              <Component className="w-5 h-5 text-purple-400" />
            </div>
            <div className={`text-[13px] font-semibold mb-1 text-center ${d ? 'text-purple-200' : 'text-purple-700'}`}>
              同じ部品をまとめる
            </div>
            <div className={`text-[11px] text-center ${c.t5}`}>Component</div>
          </div>

          {/* Variable */}
          <div
            className="rounded-xl px-4 py-3"
            style={{
              background: d ? 'rgba(16,185,129,0.08)' : 'rgba(16,185,129,0.06)',
              border: `2px solid ${d ? 'rgba(16,185,129,0.25)' : 'rgba(16,185,129,0.2)'}`,
              boxShadow: d ? '0 4px 12px rgba(16,185,129,0.15)' : '0 4px 12px rgba(16,185,129,0.1)'
            }}
          >
            <div className="flex justify-center mb-2">
              <Variable className="w-5 h-5 text-emerald-400" />
            </div>
            <div className={`text-[13px] font-semibold mb-1 text-center ${d ? 'text-emerald-200' : 'text-emerald-700'}`}>
              色や余白をまとめる
            </div>
            <div className={`text-[11px] text-center ${c.t5}`}>Variable</div>
          </div>
        </div>

        {/* Arrow down */}
        <div className="flex justify-center">
          <ChevronRight className={`w-6 h-6 ${c.t4} transform rotate-90`} />
        </div>

        {/* Step 2: ルールに名前をつける */}
        <div className={`w-full text-center text-[13px] font-semibold ${c.t3}`}>
          ② ルールに名前をつける
        </div>

        <div className="w-full">
          <div
            className="rounded-xl px-4 py-3"
            style={{
              background: d ? 'rgba(236,72,153,0.08)' : 'rgba(236,72,153,0.06)',
              border: `2px solid ${d ? 'rgba(236,72,153,0.25)' : 'rgba(236,72,153,0.2)'}`,
              boxShadow: d ? '0 4px 12px rgba(236,72,153,0.15)' : '0 4px 12px rgba(236,72,153,0.1)'
            }}
          >
            <div className="flex justify-center mb-2">
              <Paintbrush className="w-5 h-5 text-pink-400" />
            </div>
            <div className={`text-[13px] font-semibold mb-1 text-center ${d ? 'text-pink-200' : 'text-pink-700'}`}>
              意味のある名前で管理
            </div>
            <div className={`text-[11px] text-center ${c.t5}`}>Token</div>
          </div>
        </div>

        {/* Arrow down */}
        <div className="flex justify-center">
          <ChevronRight className={`w-6 h-6 ${c.t4} transform rotate-90`} />
        </div>

        {/* Step 3: チームで共有 */}
        <div className={`w-full text-center text-[13px] font-semibold ${c.t3}`}>
          ③ チームで共有する
        </div>

        <div className="w-full">
          <div
            className="rounded-xl px-4 py-3"
            style={{
              background: d ? 'rgba(249,115,22,0.08)' : 'rgba(249,115,22,0.06)',
              border: `2px solid ${d ? 'rgba(249,115,22,0.25)' : 'rgba(249,115,22,0.2)'}`,
              boxShadow: d ? '0 4px 12px rgba(249,115,22,0.15)' : '0 4px 12px rgba(249,115,22,0.1)'
            }}
          >
            <div className="flex justify-center mb-2">
              <Library className="w-5 h-5 text-orange-400" />
            </div>
            <div className={`text-[13px] font-semibold mb-1 text-center ${d ? 'text-orange-200' : 'text-orange-700'}`}>
              みんなで使えるようにする
            </div>
            <div className={`text-[11px] text-center ${c.t5}`}>Library</div>
          </div>
        </div>

        {/* Arrow down */}
        <div className="flex justify-center">
          <ChevronRight className={`w-6 h-6 ${c.t4} transform rotate-90`} />
        </div>

        {/* Result */}
        <div
          className="w-full rounded-2xl px-10 py-6 relative"
          style={{
            background: d
              ? 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(139,92,246,0.1))'
              : 'linear-gradient(135deg, rgba(168,85,247,0.08), rgba(139,92,246,0.05))',
            border: `3px solid ${d ? 'rgba(168,85,247,0.4)' : 'rgba(168,85,247,0.3)'}`,
            boxShadow: d
              ? '0 0 40px rgba(168,85,247,0.2), inset 0 0 20px rgba(168,85,247,0.05)'
              : '0 0 40px rgba(168,85,247,0.15), inset 0 0 20px rgba(255,255,255,0.5)'
          }}
        >
          <div className={`text-[18px] font-bold text-center ${d ? 'text-purple-200' : 'text-purple-700'}`}>
            ✨ 壊れにくいUI構造
          </div>
          <div className={`text-[12px] text-center mt-1 ${d ? 'text-purple-300' : 'text-purple-600'}`}>
            変更に強く、チームで使いやすい
          </div>
        </div>
      </div>

      <Tip>一つずつ積み重ねることで、変更に強いデザインが完成する</Tip>
    </div>
  );
}

function InstructorSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";

  return (
    <div className="space-y-10">
      <Msg>本日の<strong>講師紹介</strong></Msg>

      <div className="relative max-w-4xl mx-auto">
        {/* 背景グロー効果 */}
        <div
          className="absolute inset-0 blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle at 30% 50%, rgba(168,85,247,0.4), transparent 70%)'
          }}
        />

        {/* メインコンテンツ */}
        <div className="relative flex items-start gap-10">
          {/* 左側：アイコン */}
          <div className="shrink-0 relative">
            <div
              className="absolute inset-0 blur-xl opacity-40"
              style={{
                background: d
                  ? 'linear-gradient(135deg, rgba(168,85,247,0.6), rgba(236,72,153,0.4))'
                  : 'linear-gradient(135deg, rgba(168,85,247,0.4), rgba(236,72,153,0.3))'
              }}
            />
            <img
              src={`${import.meta.env.BASE_URL}instructor-icon.png`}
              alt="Instructor"
              className="relative w-40 h-40 rounded-2xl"
              style={{
                border: `2px solid ${d ? 'rgba(168,85,247,0.3)' : 'rgba(168,85,247,0.2)'}`,
                boxShadow: d
                  ? '0 20px 40px rgba(0,0,0,0.3)'
                  : '0 20px 40px rgba(168,85,247,0.2)'
              }}
            />
          </div>

          {/* 右側：プロフィール */}
          <div className="flex-1 space-y-5">
            {/* 名前 */}
            <div className="space-y-1">
              <h3
                className="text-[32px] font-bold tracking-tight"
                style={{
                  background: d
                    ? 'linear-gradient(135deg, #ffffff, #c4b5fd)'
                    : 'linear-gradient(135deg, #1f2937, #7c3aed)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                谷尾美亜
              </h3>
              <p className={`text-[14px] font-medium tracking-wide ${c.t4}`}>Tanio Mia</p>
            </div>

            {/* 経歴 */}
            <div className="space-y-3">
              <div
                className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide"
                style={{
                  background: d ? 'rgba(168,85,247,0.15)' : 'rgba(168,85,247,0.1)',
                  color: d ? '#c4b5fd' : '#7c3aed'
                }}
              >
                2023年入社（現在4年目）
              </div>

              <div className={`text-[12px] ${c.t3} leading-relaxed`}>
                メディア・検索ドメインLY Agent・検索SBU<br />
                デザインユニットUID2ディビジョン
              </div>

              <div className={`flex items-center gap-2 text-[13px] ${c.t3}`}>
                <img src={`${import.meta.env.BASE_URL}slack-icon.png`} className="w-4 h-4" alt="Slack" />
                <span className="font-mono font-medium">#times-mtanio</span>
              </div>

              <div className="space-y-2 mt-4">
                <div className={`flex items-center gap-2 text-[12px] font-semibold ${c.t2}`}>
                  <span className="text-[16px]">💼</span>
                  <span>仕事内容</span>
                </div>
                <div className={`text-[13px] ${c.t2} leading-relaxed`}>
                  最近はAgent i お買い物領域のUI/UXデザインがメイン<br />
                  時々リサーチやったりバナー作ったり
                </div>

                {/* 仕事内容の画像 */}
                <div className="relative mt-3 rounded-lg overflow-hidden max-w-xs" style={{ height: '280px' }}>
                  <img
                    src={`${import.meta.env.BASE_URL}images/work-example.svg`}
                    alt="仕事内容の例"
                    className="w-full"
                  />
                  {/* グラデーションオーバーレイ */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-16"
                    style={{
                      background: d
                        ? 'linear-gradient(to bottom, transparent, rgba(38,35,53,0.95))'
                        : 'linear-gradient(to bottom, transparent, rgba(253,253,253,0.95))'
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <div className={`flex items-center gap-2 text-[12px] font-semibold ${c.t2}`}>
                  <span className="text-[16px]">🍁</span>
                  <span>出身地</span>
                </div>
                <div className={`text-[13px] ${c.t2} leading-relaxed`}>
                  広島県広島市（現在は東京在住）
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <div className={`flex items-center gap-2 text-[12px] font-semibold ${c.t2}`}>
                  <span className="text-[16px]">🐶</span>
                  <span>趣味</span>
                </div>
                <div className={`text-[13px] ${c.t2} leading-relaxed`}>
                  ペット・お出かけ・かわいい全般
                </div>
              </div>
            </div>

            {/* メッセージ */}
            <div className="space-y-2">
              <div className={`flex items-center gap-2 text-[12px] font-semibold ${c.t2}`}>
                <span className="text-[16px]">💬</span>
                <span>メッセージ</span>
              </div>
            <div
              className="relative p-5 rounded-xl overflow-hidden"
              style={{
                background: d
                  ? 'linear-gradient(135deg, rgba(168,85,247,0.08), rgba(139,92,246,0.05))'
                  : 'linear-gradient(135deg, rgba(168,85,247,0.06), rgba(139,92,246,0.03))',
                border: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`
              }}
            >
              <div
                className="absolute top-0 left-0 w-1 h-full"
                style={{
                  background: 'linear-gradient(to bottom, rgba(168,85,247,0.8), rgba(236,72,153,0.8))'
                }}
              />
              <p className={`text-[13px] ${c.t2} leading-relaxed pl-3`}>
                最初は少し難しく感じるかもしれませんが、最初から全部できなくても大丈夫です！今日は一緒に少しずつ整理しながら見ていければと思います🙆‍♀️
              </p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScheduleSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";

  const scheduleData = [
    { time: "11:00～12:00", activity: "📚 Figma講習", tag: "LECTURE", color: "purple" },
    { time: "12:00～13:00", activity: "🍔 昼休憩", tag: "BREAK", color: "lightgray" },
    { time: "13:00～13:10", activity: "📋 課題説明", tag: "GUIDE", color: "pink" },
    { time: "13:10～16:45", activity: "🎨 課題制作", tag: "WORK", color: "purple" },
    { time: "16:45～17:00", activity: "💡 講評", tag: "OUTRO", color: "pink" },
  ];

  const getTagColor = (color: string) => {
    const colors = {
      purple: { bg: d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)', text: d ? '#c4b5fd' : '#7c3aed' },
      pink: { bg: d ? 'rgba(236,72,153,0.2)' : 'rgba(236,72,153,0.15)', text: d ? '#f9a8d4' : '#db2777' },
      lightgray: { bg: '', text: d ? '#6b7280' : '#9ca3af' },
    };
    return colors[color as keyof typeof colors] || colors.purple;
  };

  return (
    <div className="space-y-8">
      <div className="max-w-4xl mx-auto space-y-3">
        {scheduleData.map((item, index) => {
          const tagColor = getTagColor(item.color);
          return (
            <div
              key={index}
              className="flex items-center gap-6 px-8 py-5 rounded-xl"
              style={{
                background: d ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                border: `1px solid ${d ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
              }}
            >
              {/* Tag */}
              {item.tag ? (
                <div
                  className={`text-[10px] font-bold tracking-wider ${item.color !== 'lightgray' ? 'px-3 py-1.5 rounded-lg' : ''}`}
                  style={{
                    ...(item.color !== 'lightgray' && { background: tagColor.bg }),
                    color: tagColor.text,
                    width: '80px',
                    textAlign: 'center'
                  }}
                >
                  {item.tag}
                </div>
              ) : (
                <div style={{ width: '80px' }} />
              )}

              {/* Time */}
              <div
                className={`font-montserrat font-semibold text-[15px] ${item.color !== 'lightgray' ? c.t2 : ''}`}
                style={{
                  width: '140px',
                  ...(item.color === 'lightgray' && {
                    color: d ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'
                  })
                }}
              >
                {item.time}
              </div>

              {/* Activity */}
              <div
                className={`text-[16px] font-semibold ${item.color !== 'lightgray' ? c.t1 : ''}`}
                style={{
                  ...(item.color === 'lightgray' && {
                    color: d ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'
                  })
                }}
              >
                {item.activity}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AlBasicsSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg>Auto Layoutは整列機能ではなく、要素同士の<strong>関係をルール</strong>にする機能</Msg>
      <Points items={["並び順、余白、配置、サイズの振る舞いを持たせる","変更が起きた時の再調整コストを減らす","「見た目」ではなく「構造」を作る"]} />

      <div className="w-full">
        <div className="grid grid-cols-2 gap-8 items-start">
          {/* Manual alignment */}
          <div className="space-y-3">
            <div className={`text-[13px] ${c.t5} mb-2 font-medium flex items-center gap-2`}>
              <XCircle className="w-4 h-4" />
              <span>手動整列</span>
            </div>
            <div
              className="h-[320px] rounded-2xl p-5 relative"
              style={{
                background: c.sub,
                border: `1px solid ${c.bd1}`,
                boxShadow: d ? '0 4px 24px rgba(0,0,0,0.2)' : '0 4px 24px rgba(0,0,0,0.06)'
              }}
            >
              {/* Absolutely positioned elements */}
              <div className={`absolute top-5 left-5 text-[13px] ${c.t3} font-medium`}>カードタイトル</div>
              <div className={`absolute top-12 left-5 right-5 h-4 ${c.b2} rounded`} />
              <div className={`absolute top-[72px] left-5 w-3/4 h-4 ${c.b2} rounded`} />
              <div className={`absolute bottom-5 left-5 w-20 h-8 ${c.b1} rounded text-[12px] flex items-center justify-center ${c.t4} font-medium`}>
                ボタン
              </div>

              {/* Warning indicators */}
              <div className="absolute top-[70px] right-5">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
              </div>
              <div className="absolute bottom-4 right-5">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
              </div>
            </div>
            <div className={`text-[12px] ${c.t5} text-center`}>要素の間に「関係」がない</div>
            <div className={`text-[12px] text-rose-400 text-center`}>文言変更時に手動で再調整が必要</div>
          </div>

          {/* Auto Layout */}
          <div className="space-y-3">
            <div className="text-[13px] text-purple-400 mb-2 font-medium flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Auto Layout</span>
            </div>
            <div
              className="h-[320px] rounded-2xl p-5 flex flex-col gap-3 relative"
              style={{
                background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
                border: `2px solid ${d ? 'rgba(168,85,247,0.25)' : 'rgba(168,85,247,0.2)'}`,
                boxShadow: d
                  ? '0 8px 32px rgba(168,85,247,0.2), 0 0 0 1px rgba(168,85,247,0.1) inset'
                  : '0 8px 32px rgba(168,85,247,0.15), 0 0 0 1px rgba(255,255,255,0.6) inset'
              }}
            >
              {/* Title */}
              <div className={`text-[13px] ${d ? 'text-purple-200' : 'text-purple-700'} font-medium`}>カードタイトル</div>

              {/* Content */}
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-purple-500/20 rounded w-full" />
                <div className="h-4 bg-purple-500/15 rounded w-4/5" />
              </div>

              {/* Button */}
              <div
                className="w-20 h-8 rounded text-[12px] flex items-center justify-center text-white font-medium"
                style={{
                  background: 'linear-gradient(135deg, rgba(168,85,247,0.6), rgba(168,85,247,0.5))',
                  boxShadow: '0 4px 12px rgba(168,85,247,0.3)'
                }}
              >
                ボタン
              </div>

              {/* Spacing indicators */}
              <div className="absolute left-1 top-5 bottom-5 flex flex-col justify-around items-start">
                <div className="text-[9px] text-purple-400/60 font-mono">12</div>
                <div className="text-[9px] text-purple-400/60 font-mono">12</div>
              </div>

              {/* Padding guides */}
              <div
                className="absolute top-0 left-0 right-0 h-5 border-b border-dashed border-purple-400/20"
                style={{ background: 'linear-gradient(to bottom, rgba(168,85,247,0.06), transparent)' }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-5 border-t border-dashed border-purple-400/20"
                style={{ background: 'linear-gradient(to top, rgba(168,85,247,0.06), transparent)' }}
              />
            </div>
            <div className="text-[12px] text-purple-400 text-center font-medium">余白と順序がルールになっている</div>
            <div className={`text-[12px] text-purple-400 text-center`}>文言が変わっても自動で調整される</div>
          </div>
        </div>
      </div>

      <div className="space-y-4 max-w-3xl">
        <div className={`text-[14px] ${c.t3} font-medium`}>
          具体例：ボタンのテキストが変わったとき
        </div>
        <div className="flex items-center gap-8">
          <div className="space-y-2">
            <img
              src={`${import.meta.env.BASE_URL}images/Button_保存.svg`}
              alt="保存ボタン"
              className="h-12"
            />
            <div className={`text-[12px] ${c.t4}`}>短いテキスト</div>
          </div>
          <div className="text-purple-400 text-2xl">→</div>
          <div className="space-y-2">
            <img
              src={`${import.meta.env.BASE_URL}images/Button_下書きを保存.svg`}
              alt="下書きを保存ボタン"
              className="h-12"
            />
            <div className={`text-[12px] ${c.t4}`}>長いテキストに変更</div>
          </div>
        </div>
        <div className={`text-[13px] text-purple-400 font-medium`}>
          Auto Layoutなら、ボタンの幅が自動で広がる
        </div>
      </div>

      <Tip>「ピクセルが揃っている」と「構造が設計されている」はまったく別のこと</Tip>
    </div>
  );
}

function AlApplySlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg>Auto Layoutは<strong>構造を持った配置ルール</strong>で柔軟なデザインを実現</Msg>
      <Points items={["ボタン、リスト1行、カード、モーダルなどは適用しやすい","装飾的な自由配置やビジュアル演出には無理に使わない",<>Group / Frame / Auto Layout の<strong>役割の違い</strong>を理解する</>,"意味のある単位で適用する"]} />

      {/* 手動整列 vs Auto Layout の比較 */}
      <div className="w-full">
        <div className="grid grid-cols-2 gap-8">
          {/* NG例 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[13px] text-rose-400 font-medium">
              <XCircle className="w-4 h-4" />
              <span>NG例：固定幅で崩れる</span>
            </div>
            <div
              className="rounded-xl overflow-hidden"
              style={{
                background: '#FFFFFF',
                border: `2px solid ${d ? 'rgba(244,63,94,0.2)' : 'rgba(244,63,94,0.15)'}`,
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}images/responsive-ng.svg`}
                alt="レスポンシブNG例"
                className="w-full"
              />
            </div>
          </div>

          {/* OK例 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[13px] text-emerald-400 font-medium">
              <CheckCircle className="w-4 h-4" />
              <span>OK例：柔軟に対応</span>
            </div>
            <div
              className="rounded-xl overflow-hidden"
              style={{
                background: '#FFFFFF',
                border: `2px solid ${d ? 'rgba(16,185,129,0.2)' : 'rgba(16,185,129,0.15)'}`,
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}images/responsive-ok.svg`}
                alt="レスポンシブOK例"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Figmaリンク */}
        <div className="mt-8">
          <a
            href="https://www.figma.com/design/Lzxkw6F9BxPWo8DoTEU5Ul/%E6%96%B0%E5%8D%92%E3%83%87%E3%82%B6%E3%82%A4%E3%83%8A%E3%83%BC%E7%A0%94%E4%BF%AE_Day1-5-1-?node-id=4040-896&t=anEt3oDM4VKXbPJh-4"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all"
            style={{
              background: d ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.06)',
              border: `1px solid ${d ? 'rgba(59,130,246,0.25)' : 'rgba(59,130,246,0.15)'}`,
              color: d ? '#93c5fd' : '#2563eb',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = d ? 'rgba(59,130,246,0.15)' : 'rgba(59,130,246,0.1)';
              e.currentTarget.style.borderColor = d ? 'rgba(59,130,246,0.35)' : 'rgba(59,130,246,0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = d ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.06)';
              e.currentTarget.style.borderColor = d ? 'rgba(59,130,246,0.25)' : 'rgba(59,130,246,0.15)';
            }}
          >
            <Link2 className="w-3.5 h-3.5" />
            実際のFigmaコンポーネント
          </a>
        </div>
      </div>

      {/* ボタンの具体例 */}
      <div className="space-y-4 max-w-3xl">
        <div className={`text-[14px] ${c.t3} font-medium`}>
          具体例：ボタンのテキストが変わったとき
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-8">
            <img
              src={`${import.meta.env.BASE_URL}images/Button_保存.svg`}
              alt="保存ボタン"
              className="h-12"
            />
            <div className="text-purple-400 text-2xl">→</div>
            <img
              src={`${import.meta.env.BASE_URL}images/Button_下書きを保存.svg`}
              alt="下書きを保存ボタン"
              className="h-12"
            />
          </div>
          <div className="flex items-center gap-8">
            <div className={`text-[12px] ${c.t4} text-center`} style={{width: '100px'}}>短いテキスト</div>
            <div style={{width: '32px'}}></div>
            <div className={`text-[12px] ${c.t4} text-center`} style={{width: '150px'}}>長いテキストに変更</div>
          </div>
        </div>
        <div className={`text-[13px] text-purple-400 font-medium`}>
          Auto Layoutなら、ボタンの幅が自動で広がる
        </div>
      </div>

      {/* Auto Layoutのルール */}
      <div className="space-y-4">
        <div className={`text-[14px] ${c.t3} leading-relaxed`}>
          横に並べるのか、縦に並べるのか。間隔はどれくらいか。親要素に対してどう広がるのか。こういったルールを決めることで、内容が変わっても壊れないデザインが作れます。
        </div>
        <div className="grid grid-cols-3 gap-4">
          {/* 方向 */}
          <div
            className="rounded-xl p-4 space-y-3"
            style={{
              background: d ? 'rgba(168,85,247,0.06)' : 'rgba(168,85,247,0.04)',
              border: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
            }}
          >
            <div className="text-[13px] text-purple-400 font-semibold">方向</div>
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                {[1,2,3].map(i => (
                  <div key={i} className="w-5 h-5 rounded bg-purple-500/30" />
                ))}
              </div>
              <div className={`text-[11px] ${c.t5}`}>横並び →</div>
            </div>
            <div className="space-y-2">
              <div className="flex flex-col gap-1.5">
                {[1,2,3].map(i => (
                  <div key={i} className="w-5 h-5 rounded bg-purple-500/30" />
                ))}
              </div>
              <div className={`text-[11px] ${c.t5}`}>縦並び ↓</div>
            </div>
          </div>

          {/* 間隔 */}
          <div
            className="rounded-xl p-4 space-y-3"
            style={{
              background: d ? 'rgba(168,85,247,0.06)' : 'rgba(168,85,247,0.04)',
              border: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
            }}
          >
            <div className="text-[13px] text-purple-400 font-semibold">間隔</div>
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 rounded bg-purple-500/30" />
                <div className="w-6 h-6 rounded bg-purple-500/30" />
              </div>
              <div className={`text-[11px] ${c.t5}`}>狭い (8px)</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded bg-purple-500/30" />
                <div className="w-6 h-6 rounded bg-purple-500/30" />
              </div>
              <div className={`text-[11px] ${c.t5}`}>広い (16px)</div>
            </div>
          </div>

          {/* 伸縮 */}
          <div
            className="rounded-xl p-4 space-y-3"
            style={{
              background: d ? 'rgba(168,85,247,0.06)' : 'rgba(168,85,247,0.04)',
              border: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
            }}
          >
            <div className="text-[13px] text-purple-400 font-semibold">伸縮</div>
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <div className="w-8 h-5 rounded bg-purple-500/30 flex items-center justify-center">
                  <div className="w-4 h-2 bg-purple-500/60 rounded-sm" />
                </div>
              </div>
              <div className={`text-[11px] ${c.t5}`}>Hug (内容に合わせる)</div>
            </div>
            <div className="space-y-2">
              <div className="w-full h-5 rounded bg-purple-500/30 flex items-center justify-center">
                <div className="w-12 h-2 bg-purple-500/60 rounded-sm" />
              </div>
              <div className={`text-[11px] ${c.t5}`}>Fill (親に合わせる)</div>
            </div>
          </div>
        </div>
      </div>

      {/* 適用場面 */}
      <div className="w-full">
        <div className="grid grid-cols-2 gap-8">
          {/* Should apply */}
          <div
            className="rounded-2xl p-6 space-y-4"
            style={{
              background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
              border: `2px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
              boxShadow: d
                ? '0 8px 32px rgba(168,85,247,0.15), 0 0 0 1px rgba(168,85,247,0.1) inset'
                : '0 8px 32px rgba(168,85,247,0.12), 0 0 0 1px rgba(255,255,255,0.6) inset'
            }}
          >
            <div className="text-[13px] text-purple-400 font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>適用すべき</span>
            </div>
            <div className="space-y-4">
              {[
                { name: "ボタン", el: (
                  <div
                    className="rounded-lg px-5 py-2.5 flex items-center gap-2 w-fit"
                    style={{
                      background: d ? 'rgba(168,85,247,0.12)' : 'rgba(168,85,247,0.08)',
                      border: `1px solid ${d ? 'rgba(168,85,247,0.3)' : 'rgba(168,85,247,0.2)'}`,
                      boxShadow: '0 2px 8px rgba(168,85,247,0.15)'
                    }}
                  >
                    <div className="w-4 h-4 rounded bg-purple-500/50" />
                    <span className={`text-[13px] ${d ? "text-purple-200" : "text-purple-700"} font-medium`}>送信する</span>
                  </div>
                )},
                { name: "リスト1行", el: (
                  <div
                    className="rounded-lg px-5 py-3 flex items-center gap-3 justify-between"
                    style={{
                      background: d ? 'rgba(168,85,247,0.12)' : 'rgba(168,85,247,0.08)',
                      border: `1px solid ${d ? 'rgba(168,85,247,0.3)' : 'rgba(168,85,247,0.2)'}`,
                      boxShadow: '0 2px 8px rgba(168,85,247,0.15)'
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-purple-500/40" />
                      <span className={`text-[13px] ${d ? "text-purple-200" : "text-purple-700"}`}>ユーザー名</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-purple-400" />
                  </div>
                )},
                { name: "カード全体", el: (
                  <div
                    className="rounded-lg p-4 flex flex-col gap-2.5"
                    style={{
                      background: d ? 'rgba(168,85,247,0.12)' : 'rgba(168,85,247,0.08)',
                      border: `1px solid ${d ? 'rgba(168,85,247,0.3)' : 'rgba(168,85,247,0.2)'}`,
                      boxShadow: '0 2px 8px rgba(168,85,247,0.15)'
                    }}
                  >
                    <div className="h-4 bg-purple-500/25 rounded w-3/4" />
                    <div className="h-4 bg-purple-500/20 rounded w-full" />
                    <div className="h-7 bg-purple-500/40 rounded w-20 mt-1" />
                  </div>
                )},
              ].map((ex) => (
                <div key={ex.name}>
                  <div className={`text-[12px] ${d ? 'text-purple-300' : 'text-purple-600'} mb-2 font-medium`}>{ex.name}</div>
                  {ex.el}
                </div>
              ))}
            </div>
          </div>

          {/* Optional */}
          <div
            className="rounded-2xl p-6 space-y-4"
            style={{
              background: c.sub,
              border: `1px solid ${c.bd1}`,
              boxShadow: d ? '0 4px 24px rgba(0,0,0,0.2)' : '0 4px 24px rgba(0,0,0,0.06)'
            }}
          >
            <div className={`text-[13px] ${c.t4} font-semibold flex items-center gap-2`}>
              <Minus className="w-4 h-4" />
              <span>無理に使わなくてよい</span>
            </div>
            <div className="space-y-4">
              {[
                { name: "装飾的なビジュアル", el: (
                  <div className={`border border-dashed ${c.bd1} rounded-lg p-4 relative h-24`} style={{ background: d ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)' }}>
                    <div className="absolute top-2 left-2 w-10 h-10 rounded-full bg-pink-500/20" style={{ boxShadow: '0 2px 8px rgba(236,72,153,0.2)' }} />
                    <div className="absolute bottom-2 right-3 w-14 h-7 bg-purple-500/20 rounded-full rotate-12" style={{ boxShadow: '0 2px 8px rgba(168,85,247,0.2)' }} />
                    <div className="absolute top-5 right-7 w-7 h-7 bg-amber-500/20 rounded rotate-45" style={{ boxShadow: '0 2px 8px rgba(245,158,11,0.2)' }} />
                  </div>
                )},
                { name: "重なり合う要素", el: (
                  <div className={`border border-dashed ${c.bd1} rounded-lg p-4 relative h-16`} style={{ background: d ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)' }}>
                    <div className={`absolute left-4 top-4 w-9 h-9 rounded-full bg-blue-500/30 border-2`} style={{ borderColor: d ? 'rgba(59,130,246,0.5)' : 'rgba(59,130,246,0.4)', boxShadow: '0 2px 8px rgba(59,130,246,0.2)' }} />
                    <div className={`absolute left-8 top-4 w-9 h-9 rounded-full bg-green-500/30 border-2`} style={{ borderColor: d ? 'rgba(16,185,129,0.5)' : 'rgba(16,185,129,0.4)', boxShadow: '0 2px 8px rgba(16,185,129,0.2)' }} />
                    <div className={`absolute left-12 top-4 w-9 h-9 rounded-full bg-amber-500/30 border-2`} style={{ borderColor: d ? 'rgba(245,158,11,0.5)' : 'rgba(245,158,11,0.4)', boxShadow: '0 2px 8px rgba(245,158,11,0.2)' }} />
                  </div>
                )},
              ].map((ex) => (
                <div key={ex.name}>
                  <div className={`text-[12px] ${c.t5} mb-2`}>{ex.name}</div>
                  {ex.el}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Group / Frame / Auto Layoutの使い分け */}
      <div className="rounded-xl p-4" style={{ background: c.glass, border: c.glassBd }}>
        <Label>Group / Frame / Auto Layout の使い分け</Label>
        <div className={`grid grid-cols-3 gap-3 text-[12px] ${c.t3}`}>
          <div className="rounded-lg p-3 text-center" style={{ background: c.glass, border: c.glassBd }}>
            <div className={`font-medium ${c.t2} mb-1`}>Group</div>
            <div>まとめて移動するだけ</div>
            <div className={`text-[12px] ${c.t5} mt-1`}>構造なし</div>
          </div>
          <div className="rounded-lg p-3 text-center" style={{ background: c.glass, border: c.glassBd }}>
            <div className={`font-medium ${c.t2} mb-1`}>Frame</div>
            <div>領域とクリッピング</div>
            <div className={`text-[12px] ${c.t5} mt-1`}>箱だけ</div>
          </div>
          <div className="rounded-lg p-3 text-center" style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)" }}>
            <div className={`font-medium ${d ? "text-purple-300" : "text-purple-600"} mb-1`}>Auto Layout</div>
            <div>並び・余白・伸縮ルール</div>
            <div className="text-[12px] text-purple-400 mt-1">構造あり</div>
          </div>
        </div>
      </div>

      <Tip>「全部にAuto Layoutをかける」より、意味のある単位で判断することが大切</Tip>
    </div>
  );
}

function AlDirectionSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg>Auto Layoutフレームの要素は、方向、間隔、パディング、整列、その他のAuto Layoutプロパティに基づいて<strong>自動的に配置</strong>されます</Msg>

      <div className={`text-[14px] ${c.t3} leading-relaxed space-y-4`}>
        <p>
          コンテンツが変更されたり、要素が追加、削除、サイズ変更された場合でも、レイアウトは手動で再配置する必要なく調整されます。Auto Layoutを使用すると、以下のような応答性のあるデザインを作成できます。
        </p>
        <ul className="list-disc ml-6 space-y-1">
          <li>テキストラベルの編集に合わせて拡大/縮小するボタン</li>
          <li>アイテムの追加、削除、または非表示に合わせて調整されるリスト</li>
          <li>Bentoボックスとダッシュボード</li>
          <li>さまざまな画面サイズに適応するウェブページ</li>
        </ul>
      </div>

      <div
        className="w-full rounded-2xl overflow-hidden relative"
        style={{
          background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
          border: `2px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
          boxShadow: d
            ? '0 8px 32px rgba(168,85,247,0.15), 0 0 0 1px rgba(168,85,247,0.1) inset'
            : '0 8px 32px rgba(168,85,247,0.12), 0 0 0 1px rgba(255,255,255,0.6) inset'
        }}
      >
        <ExpandableImage
          src={`${import.meta.env.BASE_URL}images/al-direction-ui3.png`}
          alt="縦横のレイアウトの例"
        />
        <div
          className="absolute bottom-2 right-2 px-2 py-1 rounded text-[12px]"
          style={{
            background: 'rgba(0,0,0,0.6)',
            color: 'rgba(255,255,255,0.8)'
          }}
        >
          出典：Figma公式
        </div>
      </div>

      <div className="space-y-4">
        <div className={`text-[15px] ${c.t2} font-semibold`}>アライメントについて</div>
        <div className={`text-[14px] ${c.t3} leading-relaxed space-y-3`}>
          <p>
            Auto Layoutフレーム内で子オブジェクトの配置方法を選択します。使用可能な配置オプションは、Auto Layoutフレームの流れと、アイテム間の間隔（配置間隔）によって決まります。
          </p>
          <p>
            通常のフレーム内のオブジェクトとは異なり、個々のオブジェクトの配置を制御することはできません。そのため、子オブジェクトの配置は親のAuto Layoutフレーム上で設定します。
          </p>
        </div>
        <div
          className="w-full rounded-2xl overflow-hidden relative"
          style={{
            background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
            border: `2px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
            boxShadow: d
              ? '0 8px 32px rgba(168,85,247,0.15), 0 0 0 1px rgba(168,85,247,0.1) inset'
              : '0 8px 32px rgba(168,85,247,0.12), 0 0 0 1px rgba(255,255,255,0.6) inset'
          }}
        >
          <ExpandableImage
            src={`${import.meta.env.BASE_URL}images/al-alignment.gif`}
            alt="アライメントの設定例"
          />
          <div
            className="absolute bottom-2 right-2 px-2 py-1 rounded text-[12px]"
            style={{
              background: 'rgba(0,0,0,0.6)',
              color: 'rgba(255,255,255,0.8)'
            }}
          >
            出典：Figma公式
          </div>
        </div>
        <div className={`text-[14px] ${c.t3} leading-relaxed space-y-2`}>
          <p>
            アイテム間の間隔が「自動」に設定されている場合、各フローに対して次の3つのオプションがあります。
          </p>
          <ul className="list-disc ml-6 space-y-1">
            <li>垂直方向の自動レイアウトの流れ: 左、中央、右</li>
            <li>水平方向の自動レイアウトの流れ：上、中央、下</li>
          </ul>
        </div>
        <div
          className="w-full rounded-2xl overflow-hidden relative"
          style={{
            background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
            border: `2px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
            boxShadow: d
              ? '0 8px 32px rgba(168,85,247,0.15), 0 0 0 1px rgba(168,85,247,0.1) inset'
              : '0 8px 32px rgba(168,85,247,0.12), 0 0 0 1px rgba(255,255,255,0.6) inset'
          }}
        >
          <ExpandableImage
            src={`${import.meta.env.BASE_URL}images/al-alighment-auto.gif`}
            alt="アライメントの自動設定"
          />
          <div
            className="absolute bottom-2 right-2 px-2 py-1 rounded text-[12px]"
            style={{
              background: 'rgba(0,0,0,0.6)',
              color: 'rgba(255,255,255,0.8)'
            }}
          >
            出典：Figma公式
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className={`text-[15px] ${c.t2} font-semibold`}>アイテム間の間隔について</div>
        <div className={`text-[14px] ${c.t3} leading-relaxed`}>
          <p className="mb-3">アイテム間の間隔には2つの異なる設定があります。</p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>自動：</strong>オブジェクト間の間隔を可能な限り最大に設定します。Autoフィールドに直接入力するか、ドロップダウンメニューから選択してください。</li>
            <li><strong>間隔の指定：</strong>オブジェクト間の距離を指定します。フィールドに値を入力するか、矢印キーで値を微調整するか、カーソルでフィールドをスクラブしてください。</li>
          </ul>
        </div>
        <div
          className="w-full rounded-2xl overflow-hidden relative"
          style={{
            background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
            border: `2px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
            boxShadow: d
              ? '0 8px 32px rgba(168,85,247,0.15), 0 0 0 1px rgba(168,85,247,0.1) inset'
              : '0 8px 32px rgba(168,85,247,0.12), 0 0 0 1px rgba(255,255,255,0.6) inset'
          }}
        >
          <ExpandableImage
            src={`${import.meta.env.BASE_URL}images/al-gap-between-toggle.gif`}
            alt="アイテム間の間隔の設定"
          />
          <div
            className="absolute bottom-2 right-2 px-2 py-1 rounded text-[12px]"
            style={{
              background: 'rgba(0,0,0,0.6)',
              color: 'rgba(255,255,255,0.8)'
            }}
          >
            出典：Figma公式
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className={`text-[15px] ${c.t2} font-semibold`}>Paddingについて</div>
        <div className={`text-[14px] ${c.t3} leading-relaxed`}>
          <p>
            パディングは、Auto Layoutフレームの境界とフレームの子オブジェクトとの間の空白（余白）を制御します。パディングは、均一に、垂直方向と水平方向に設定することも、上、右、下、左にそれぞれ異なる値を設定することもできます。
          </p>
        </div>
        <div
          className="w-full rounded-2xl overflow-hidden relative"
          style={{
            background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
            border: `2px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
            boxShadow: d
              ? '0 8px 32px rgba(168,85,247,0.15), 0 0 0 1px rgba(168,85,247,0.1) inset'
              : '0 8px 32px rgba(168,85,247,0.12), 0 0 0 1px rgba(255,255,255,0.6) inset'
          }}
        >
          <ExpandableImage
            src={`${import.meta.env.BASE_URL}images/al-padding-resize-all-sides.gif`}
            alt="パディングの設定"
          />
          <div
            className="absolute bottom-2 right-2 px-2 py-1 rounded text-[12px]"
            style={{
              background: 'rgba(0,0,0,0.6)',
              color: 'rgba(255,255,255,0.8)'
            }}
          >
            出典：Figma公式
          </div>
        </div>
        <div className={`text-[14px] ${c.t3} leading-relaxed`}>
          <p>
            右側のパネルにあるパディング設定は、デフォルトでは垂直方向（上下）と水平方向（左右）のパディングに分かれています。
          </p>
        </div>
        <div
          className="w-full rounded-2xl overflow-hidden relative"
          style={{
            background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
            border: `2px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
            boxShadow: d
              ? '0 8px 32px rgba(168,85,247,0.15), 0 0 0 1px rgba(168,85,247,0.1) inset'
              : '0 8px 32px rgba(168,85,247,0.12), 0 0 0 1px rgba(255,255,255,0.6) inset'
          }}
        >
          <ExpandableImage
            src={`${import.meta.env.BASE_URL}images/individual-padding.mov.gif`}
            alt="個別のパディング設定"
          />
          <div
            className="absolute bottom-2 right-2 px-2 py-1 rounded text-[12px]"
            style={{
              background: 'rgba(0,0,0,0.6)',
              color: 'rgba(255,255,255,0.8)'
            }}
          >
            出典：Figma公式
          </div>
        </div>
        <div className={`text-[15px] ${c.t2} font-semibold mt-6`}>オブジェクト操作のイメージ</div>
        <div
          className="w-full rounded-2xl overflow-hidden relative"
          style={{
            background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
            border: `2px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
            boxShadow: d
              ? '0 8px 32px rgba(168,85,247,0.15), 0 0 0 1px rgba(168,85,247,0.1) inset'
              : '0 8px 32px rgba(168,85,247,0.12), 0 0 0 1px rgba(255,255,255,0.6) inset'
          }}
        >
          <ExpandableImage
            src={`${import.meta.env.BASE_URL}images/al-move-child-objects.gif`}
            alt="オブジェクト操作のイメージ"
          />
          <div
            className="absolute bottom-2 right-2 px-2 py-1 rounded text-[12px]"
            style={{
              background: 'rgba(0,0,0,0.6)',
              color: 'rgba(255,255,255,0.8)'
            }}
          >
            出典：Figma公式
          </div>
        </div>
        <div className={`text-[14px] ${c.t3} leading-relaxed`}>
          <p>
            一部オブジェクトに絶対位置を追加することも可能
          </p>
        </div>
        <div
          className="w-full rounded-2xl overflow-hidden relative"
          style={{
            background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
            border: `2px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
            boxShadow: d
              ? '0 8px 32px rgba(168,85,247,0.15), 0 0 0 1px rgba(168,85,247,0.1) inset'
              : '0 8px 32px rgba(168,85,247,0.12), 0 0 0 1px rgba(255,255,255,0.6) inset'
          }}
        >
          <ExpandableImage
            src={`${import.meta.env.BASE_URL}images/hold-ctrl-to-ignore-auto-layout.gif`}
            alt="絶対位置の設定"
          />
          <div
            className="absolute bottom-2 right-2 px-2 py-1 rounded text-[12px]"
            style={{
              background: 'rgba(0,0,0,0.6)',
              color: 'rgba(255,255,255,0.8)'
            }}
          >
            出典：Figma公式
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className={`text-[15px] ${c.t2} font-semibold`}>サイズ変更プロパティについて</div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead>
              <tr>
                <th
                  className={`p-3 text-left font-semibold ${c.t2}`}
                  style={{
                    background: d ? 'rgba(168,85,247,0.08)' : 'rgba(168,85,247,0.06)',
                    borderTop: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                    borderLeft: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                    borderBottom: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                    borderTopLeftRadius: '8px',
                  }}
                >
                  サイズ変更プロパティ
                </th>
                <th
                  className={`p-3 text-left font-semibold ${c.t2}`}
                  style={{
                    background: d ? 'rgba(168,85,247,0.08)' : 'rgba(168,85,247,0.06)',
                    borderTop: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                    borderBottom: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                  }}
                >
                  以下に適用可能
                </th>
                <th
                  className={`p-3 text-left font-semibold ${c.t2}`}
                  style={{
                    background: d ? 'rgba(168,85,247,0.08)' : 'rgba(168,85,247,0.06)',
                    borderTop: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                    borderRight: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                    borderBottom: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                    borderTopRightRadius: '8px',
                  }}
                >
                  サイズの動作
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  className={`p-3 font-semibold ${c.t3}`}
                  style={{
                    background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
                    borderLeft: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                    borderBottom: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                  }}
                >
                  コンテンツを内包
                </td>
                <td
                  className={`p-3 ${c.t4}`}
                  style={{
                    background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
                    borderBottom: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                  }}
                >
                  Auto Layoutフレーム
                </td>
                <td
                  className={`p-3 ${c.t4}`}
                  style={{
                    background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
                    borderRight: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                    borderBottom: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                  }}
                >
                  オブジェクトはその子オブジェクトに基づいてサイズを変更
                </td>
              </tr>
              <tr>
                <td
                  className={`p-3 font-semibold ${c.t3}`}
                  style={{
                    background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
                    borderLeft: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                    borderBottom: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                  }}
                >
                  コンテナに合わせて拡大
                </td>
                <td
                  className={`p-3 ${c.t4}`}
                  style={{
                    background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
                    borderBottom: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                  }}
                >
                  Auto Layoutのフレームの子オブジェクト
                </td>
                <td
                  className={`p-3 ${c.t4}`}
                  style={{
                    background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
                    borderRight: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                    borderBottom: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                  }}
                >
                  オブジェクトが利用可能なすべてのスペースを埋める
                </td>
              </tr>
              <tr>
                <td
                  className={`p-3 font-semibold ${c.t3}`}
                  style={{
                    background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
                    borderLeft: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                    borderBottom: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                  }}
                >
                  固定幅 / 高さ
                </td>
                <td
                  className={`p-3 ${c.t4}`}
                  style={{
                    background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
                    borderBottom: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                  }}
                >
                  両方
                </td>
                <td
                  className={`p-3 ${c.t4}`}
                  style={{
                    background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
                    borderRight: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                    borderBottom: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                  }}
                >
                  オブジェクトは固定されたまま
                </td>
              </tr>
              <tr>
                <td
                  className={`p-3 font-semibold ${c.t3}`}
                  style={{
                    background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
                    borderLeft: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                    borderBottom: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                  }}
                >
                  最小幅 / 高さ
                </td>
                <td
                  className={`p-3 ${c.t4}`}
                  style={{
                    background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
                    borderBottom: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                  }}
                >
                  両方
                </td>
                <td
                  className={`p-3 ${c.t4}`}
                  style={{
                    background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
                    borderRight: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                    borderBottom: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                  }}
                >
                  オブジェクトは最小値以上
                </td>
              </tr>
              <tr>
                <td
                  className={`p-3 font-semibold ${c.t3}`}
                  style={{
                    background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
                    borderLeft: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                    borderBottom: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                    borderBottomLeftRadius: '8px',
                  }}
                >
                  最大幅 / 高さ
                </td>
                <td
                  className={`p-3 ${c.t4}`}
                  style={{
                    background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
                    borderBottom: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                  }}
                >
                  両方
                </td>
                <td
                  className={`p-3 ${c.t4}`}
                  style={{
                    background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
                    borderRight: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                    borderBottom: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                    borderBottomRightRadius: '8px',
                  }}
                >
                  オブジェクトは最大値以下
                </td>
              </tr>
            </tbody>
          </table>
          <div className={`text-right text-[12px] ${c.t4} mt-2`}>
            出典：Figma公式
          </div>
        </div>
      </div>

      <Tip>Auto Layoutの方向・間隔・パディングを適切に設定することで、コンテンツの変更に自動で対応する柔軟なレイアウトを実現できる</Tip>
    </div>
  );
}

function AlFigmaUISlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg>方向・間隔・パディングの<strong>適切な設定</strong>で柔軟なレイアウトを実現</Msg>

      <div className={`text-[14px] ${c.t3} leading-relaxed`}>
        <p>
          Auto Layoutを適切に設定することで、横幅を変えてもレイアウトが崩れない、カードなどのパーツを作ったり、と柔軟なデザイン・レイアウトを作ることが出来ます。
        </p>
      </div>

      <div
        className="w-full rounded-2xl overflow-hidden relative"
        style={{
          background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
          border: `2px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
          boxShadow: d
            ? '0 8px 32px rgba(168,85,247,0.15), 0 0 0 1px rgba(168,85,247,0.1) inset'
            : '0 8px 32px rgba(168,85,247,0.12), 0 0 0 1px rgba(255,255,255,0.6) inset'
        }}
      >
        <ExpandableImage
          src={`${import.meta.env.BASE_URL}images/content_image-1711415488661.gif`}
          alt="Auto Layoutによる柔軟なレイアウトの例"
        />
        <div
          className="absolute bottom-2 right-2 px-2 py-1 rounded text-[12px]"
          style={{
            background: 'rgba(0,0,0,0.6)',
            color: 'rgba(255,255,255,0.8)'
          }}
        >
          出典：SKILLHUB
        </div>
      </div>

      <div className={`text-[15px] ${c.t2} font-semibold`}>Figmaの設定パネル</div>
      <Points items={["Direction（縦/横の向き）","Gap（要素間の余白）","Padding（外枠との余白）","Alignment（配置）とResizing（伸縮）"]} />

      <div className="w-full">
        <div className="grid grid-cols-2 gap-8">
          {/* Card Preview */}
          <div className="flex items-center justify-start">
            <div
              className="rounded-2xl p-8"
              style={{
                background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
                border: `2px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                boxShadow: d
                  ? '0 8px 32px rgba(168,85,247,0.15), 0 0 0 1px rgba(168,85,247,0.1) inset'
                  : '0 8px 32px rgba(168,85,247,0.12), 0 0 0 1px rgba(255,255,255,0.6) inset'
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}images/Choice Result Card.svg`}
                alt="Choice Result Card"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  display: 'block'
                }}
              />
            </div>
          </div>

          {/* Figma Auto Layout Panel Screenshot */}
          <div className="flex items-center justify-start">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                boxShadow: d ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.1)'
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}images/al-figma-ui-panel.png`}
                alt="Figma Auto Layout設定パネル"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  display: 'block'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <a
          href="https://www.figma.com/design/Lzxkw6F9BxPWo8DoTEU5Ul/%E6%96%B0%E5%8D%92%E3%83%87%E3%82%B6%E3%82%A4%E3%83%8A%E3%83%BC%E7%A0%94%E4%BF%AE_Day1-5-1-?node-id=4001-4915&t=8vYdwEp1iO1LK4Su-4"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all"
          style={{
            background: d ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.06)',
            border: `1px solid ${d ? 'rgba(59,130,246,0.25)' : 'rgba(59,130,246,0.15)'}`,
            color: d ? '#93c5fd' : '#2563eb',
            textDecoration: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = d ? 'rgba(59,130,246,0.15)' : 'rgba(59,130,246,0.1)';
            e.currentTarget.style.borderColor = d ? 'rgba(59,130,246,0.35)' : 'rgba(59,130,246,0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = d ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.06)';
            e.currentTarget.style.borderColor = d ? 'rgba(59,130,246,0.25)' : 'rgba(59,130,246,0.15)';
          }}
        >
          <Link2 className="w-3.5 h-3.5" />
          実際のFigmaコンポーネント
        </a>
      </div>

      <Tip>Figmaの設定パネルは、Auto Layoutの「何を」「どう」設定するかを視覚的に表現している</Tip>
    </div>
  );
}

function AlTextSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg>テキストはもっとも変化しやすい要素なので、<strong>見た目より先に振る舞い</strong>を決める</Msg>
      <Points items={["伸びてよいか、折り返してよいか、省略してよいか、他要素を押し広げてよいかを先に決める","意味が違うテキストは分ける","省略は見た目合わせではなく、優先順位の設計","「今の文言で収まっている」は設計ではない"]} />

      {/* コンポーネント作成時と実際の使用例 */}
      <div className="space-y-4">
        <div className={`text-[14px] ${c.t3} leading-relaxed`}>
          コンポーネントを作る時に短い仮テキストを入れることがよくあります。しかし、その場合も実際の使用パターンを考慮しながら作る必要があります。
        </div>
        <div className="grid grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* コンポーネント作成時 */}
          <div className="space-y-3">
            <div className={`text-[13px] ${c.t2} font-semibold`}>コンポーネント作成時</div>
            <div className="rounded-xl overflow-hidden">
              <img
                src={`${import.meta.env.BASE_URL}images/text-component-creation.svg`}
                alt="コンポーネント作成時"
                className="w-full"
              />
            </div>
            <div className={`text-[12px] ${c.t5} text-center`}>短い仮テキストで作成</div>
          </div>

          {/* 実際の使用例 */}
          <div className="space-y-3">
            <div className={`text-[13px] ${c.t2} font-semibold`}>実際の使用例</div>
            <div className="rounded-xl overflow-hidden">
              <img
                src={`${import.meta.env.BASE_URL}images/text-actual-usage.svg`}
                alt="実際の使用例"
                className="w-full"
              />
            </div>
            <div className={`text-[12px] ${c.t5} text-center`}>長いテキストで崩れる可能性</div>
          </div>
        </div>
      </div>

      <Vis>
        <Label>同じカードで、短文・長文・省略の3パターン</Label>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "短文", title: "お知らせ", body: "新機能リリース", truncate: false },
            { label: "長文", title: "メンテナンスのお知らせ", body: "2026年4月15日 午前2時から午前6時まで、サーバーメンテナンスを実施します。", truncate: false },
            { label: "省略あり", title: "メンテナンスのお知らせ", body: "2026年4月15日 午前2時から午前6時まで、サーバーメンテナンスを実施します。ご不便をおかけしますがご了承ください。", truncate: true },
          ].map((ex) => (
            <div key={ex.label} className="rounded-xl p-3 flex flex-col gap-2" style={{ background: c.glass2, border: c.glassBd }}>
              <Pill color={ex.truncate ? `bg-amber-500/20 ${d ? "text-amber-300" : "text-amber-600"}` : `bg-purple-500/20 ${d ? "text-purple-300" : "text-purple-600"}`}>{ex.label}</Pill>
              <div className={`text-[13px] font-medium ${c.t2}`}>{ex.title}</div>
              <div className={`text-[14px] ${c.t4} leading-relaxed ${ex.truncate ? "line-clamp-2" : ""}`}>{ex.body}</div>
              <div className="mt-auto">
                <div className="text-[12px] text-purple-400 font-medium">詳しく見る →</div>
              </div>
            </div>
          ))}
        </div>
      </Vis>
      <div className="grid grid-cols-2 gap-4">
        <Comp label="❌ 1レイヤーに詰め込む">
          <div className={`rounded-lg p-3 text-[12px] ${c.t3} leading-relaxed`} style={{ background: "rgba(244,63,94,0.06)" }}>
            <span className="font-medium">カードタイトル</span><br />説明文がここに入ります。1つのテキストレイヤー。
          </div>
        </Comp>
        <Comp label="✅ 意味ごとに分割">
          <div className="flex flex-col gap-1.5">
            <div className={`rounded-lg px-3 py-1.5 text-[12px] font-medium ${c.t2}`} style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)" }}>カードタイトル</div>
            <div className={`rounded-lg px-3 py-1.5 text-[12px] ${c.t4}`} style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)" }}>説明文がここに入ります。</div>
          </div>
        </Comp>
      </div>
      <Tip>「今のテキストで揃って見える」だけでなく、文言が変わることを想定して設計しよう</Tip>
    </div>
  );
}

function AlAdvancedSlide() {
  const theme = useTheme();
  const c = tc(theme);
  return (
    <div className="space-y-10">
      <Msg>可変レイアウトの中で、<strong>どこまで許容し、何を例外にするか</strong>を決める</Msg>
      <Points items={["最小幅 / 最大幅は使いやすさの下限と上限を決める","画像やサムネイルは比率維持が重要","絶対位置はレイアウトの例外処理として使う","バッジや閉じるボタンには向くが、本文や主ボタンには多用しない"]} />
      <Vis>
        <div className="grid grid-cols-3 gap-5">
          <div>
            <Label>最小・最大幅</Label>
            <div className="space-y-3">
              <div className="rounded-xl p-3" style={{ background: c.glass, border: c.glassBd }}>
                <div className="bg-purple-500/40 text-white text-[12px] rounded-lg px-3 py-1.5 text-center" style={{ minWidth: 100 }}>短い</div>
                <div className={`text-[12px] ${c.t5} mt-1.5 text-center`}>min-width で潰れない</div>
              </div>
              <div className="rounded-xl p-3" style={{ background: c.glass, border: c.glassBd }}>
                <div className="bg-purple-500/40 text-white text-[12px] rounded-lg px-3 py-1.5 text-center truncate" style={{ maxWidth: 120 }}>とても長いボタンラベル</div>
                <div className={`text-[12px] ${c.t5} mt-1.5 text-center`}>max-width で広がりすぎない</div>
              </div>
            </div>
          </div>
          <div>
            <Label>比率維持</Label>
            <div className="rounded-xl p-3" style={{ background: c.glass, border: c.glassBd }}>
              <div className="flex gap-2 items-end justify-center">
                {[40, 56, 72].map((s) => (
                  <div key={s} className="bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-lg flex items-center justify-center text-[12px] text-purple-400" style={{ width: s, height: s * 0.75 }}>4:3</div>
                ))}
              </div>
              <div className={`text-[12px] ${c.t5} mt-2 text-center`}>サイズが変わっても比率は維持</div>
            </div>
          </div>
          <div>
            <Label>絶対位置</Label>
            <div className="rounded-xl p-3" style={{ background: c.glass, border: c.glassBd }}>
              <div className="relative inline-block">
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-[16px]">🔔</div>
                <div className={`absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-[12px] flex items-center justify-center font-medium ring-2 ${c.rn}`}>3</div>
              </div>
              <div className={`text-[12px] ${c.t5} mt-2`}>フローの例外として使う</div>
            </div>
          </div>
        </div>
      </Vis>
      <Tip>絶対位置を使いすぎると、構造的な柔軟性が失われやすい</Tip>
    </div>
  );
}

function CompBasicsSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg>コンポーネント = 同じ部品を何度も作らないための<strong>仕組み</strong></Msg>

      <div className={`text-[14px] ${c.t3} leading-relaxed space-y-4`}>
        <p>
          ボタンやカードなど、繰り返し使う部品を1つのコンポーネントにまとめておけば、デザイン変更も一箇所で済みます。
        </p>
        <p>
          例えば「送信ボタン」「キャンセルボタン」「削除ボタン」を毎回手作りするのではなく、1つのボタンコンポーネントから作れば、後から色や角丸を変えたいときも一気に反映できます。
        </p>
      </div>

      <Points items={["メインコンポーネント = 基準となる1つの部品","インスタンス = メインから作ったコピー（文言や色を部分的に変更できる）","変更した部分は元に戻したり、完全に切り離すこともできる"]} />

      <div
        className="rounded-2xl p-8 relative overflow-hidden"
        style={{
          background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
          border: `2px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
          boxShadow: d
            ? '0 8px 32px rgba(168,85,247,0.15), 0 0 0 1px rgba(168,85,247,0.1) inset'
            : '0 8px 32px rgba(168,85,247,0.12), 0 0 0 1px rgba(255,255,255,0.6) inset'
        }}
      >
        <div className="flex flex-col items-center gap-6 relative z-10">
          {/* Main Component */}
          <div className="flex flex-col items-center gap-3">
            <div className="text-[12px] text-purple-400 uppercase tracking-wider font-medium">Main Component</div>
            <div
              className="rounded-xl p-5 flex items-center gap-3 w-64 relative"
              style={{
                background: d ? 'rgba(168,85,247,0.15)' : 'rgba(168,85,247,0.12)',
                border: `2px solid ${d ? 'rgba(168,85,247,0.4)' : 'rgba(168,85,247,0.3)'}`,
                boxShadow: '0 8px 24px rgba(168,85,247,0.25)'
              }}
            >
              <div className="w-4 h-4 bg-purple-500 rotate-45 shrink-0" style={{ boxShadow: '0 2px 8px rgba(168,85,247,0.4)' }} />
              <div className="flex items-center gap-2.5 flex-1">
                <div className="w-6 h-6 rounded bg-purple-500/50" />
                <span className={`text-[14px] font-semibold ${d ? "text-purple-100" : "text-purple-800"}`}>Button</span>
              </div>
              {/* Glow effect */}
              <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(168,85,247,0.1), transparent 70%)'
                }}
              />
            </div>
            <div className={`text-[12px] ${c.t5}`}>設計の基準</div>
          </div>

          {/* Connection lines */}
          <div className="flex gap-12 items-center">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className={`w-0.5 h-8`} style={{ background: `linear-gradient(to bottom, ${d ? 'rgba(168,85,247,0.4)' : 'rgba(168,85,247,0.3)'}, transparent)` }} />
                <div className="w-2 h-2 rounded-full" style={{ background: d ? 'rgba(168,85,247,0.6)' : 'rgba(168,85,247,0.5)' }} />
                <div className={`w-0.5 h-8`} style={{ background: `linear-gradient(to top, ${d ? 'rgba(168,85,247,0.4)' : 'rgba(168,85,247,0.3)'}, transparent)` }} />
              </div>
            ))}
          </div>

          {/* Instances */}
          <div className="flex gap-6">
            {[
              { label: "送信する", override: "文言変更", color: 'rgba(168,85,247,0.08)' },
              { label: "キャンセル", override: "文言変更", color: 'rgba(168,85,247,0.08)' },
              { label: "削除", override: "文言+色変更", color: 'rgba(244,63,94,0.08)' },
            ].map((inst) => (
              <div key={inst.label} className="flex flex-col items-center gap-2">
                <div
                  className="rounded-xl p-4 flex items-center gap-2.5 w-40"
                  style={{
                    background: inst.color,
                    border: `1px dashed ${d ? 'rgba(168,85,247,0.3)' : 'rgba(168,85,247,0.25)'}`,
                    boxShadow: d ? '0 4px 16px rgba(0,0,0,0.15)' : '0 4px 16px rgba(0,0,0,0.06)'
                  }}
                >
                  <div className="w-3 h-3 border-2 border-purple-400/70 rotate-45 shrink-0" />
                  <span className={`text-[13px] ${d ? c.t2 : c.t3} font-medium`}>{inst.label}</span>
                </div>
                {inst.override && (
                  <div className="text-[12px] text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                    {inst.override}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className={`text-[12px] ${c.t5}`}>文脈に応じた利用</div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(168,85,247,0.08), transparent 70%)',
              filter: 'blur(40px)'
            }}
          />
        </div>
      </div>

      <Tip>Detach したくなったら「本当にコンポーネントの責務外か？」を一度考える</Tip>
    </div>
  );
}

function CompPropsSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg>プロパティを使えば、<strong>コンポーネントを壊さずに安全にカスタマイズ</strong>できる</Msg>
      <Points items={[<><strong>Priority / Size / State</strong> = ボタンの種類や状態を切り替える</>,<><strong>Show left icon / Show right icon</strong> = アイコンの表示/非表示</>,<><strong>Button label</strong> = ラベルテキスト「追加する」を変更</>,<><strong>Swap icon</strong> = アイコンの種類を差し替える</>,"名前は見た目ではなく意味で付ける（例：「左アイコン」→「Show left icon」）"]} />

      <div className="w-full">
        <div className="grid grid-cols-2 gap-8">
          {/* Button Preview - CSS Implementation */}
          <div className="flex items-center justify-start">
            <div
              className="rounded-2xl p-16"
              style={{
                background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
                border: `2px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                boxShadow: d
                  ? '0 8px 32px rgba(168,85,247,0.15), 0 0 0 1px rgba(168,85,247,0.1) inset'
                  : '0 8px 32px rgba(168,85,247,0.12), 0 0 0 1px rgba(255,255,255,0.6) inset'
              }}
            >
              {/* Actual Button Component */}
              <button
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '0px 40px',
                  position: 'relative',
                  width: '300px',
                  height: '64px',
                  background: 'linear-gradient(46.94deg, #A83DEB 5.1%, #3083FD 92.36%)',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 6px 24px rgba(168, 85, 247, 0.4)'
                }}
              >
                {/* Label and Icon Container */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '0px',
                    gap: '8px',
                    flex: 'none',
                    order: 0,
                    flexGrow: 0
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      flex: 'none',
                      order: 0,
                      flexGrow: 0,
                      position: 'relative'
                    }}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 4V20M4 12H20"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  {/* Label */}
                  <span
                    style={{
                      fontFamily: "'Noto Sans JP', sans-serif",
                      fontStyle: 'normal',
                      fontWeight: 700,
                      fontSize: '20px',
                      lineHeight: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      textAlign: 'center',
                      color: '#FFFFFF',
                      flex: 'none',
                      order: 1,
                      flexGrow: 0
                    }}
                  >
                    追加する
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Figma Properties Panel - Real Screenshot */}
          <div className="flex items-center justify-start">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                boxShadow: d ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.1)'
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}images/Figma1.png`}
                alt="Figmaプロパティパネル"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: '16px'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <a
          href="https://www.figma.com/design/Lzxkw6F9BxPWo8DoTEU5Ul/%E6%96%B0%E5%8D%92%E3%83%87%E3%82%B6%E3%82%A4%E3%83%8A%E3%83%BC%E7%A0%94%E4%BF%AE_Day1-5-1-?node-id=4001-5149&t=8vYdwEp1iO1LK4Su-4"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all"
          style={{
            background: d ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.06)',
            border: `1px solid ${d ? 'rgba(59,130,246,0.25)' : 'rgba(59,130,246,0.15)'}`,
            color: d ? '#93c5fd' : '#2563eb',
            textDecoration: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = d ? 'rgba(59,130,246,0.15)' : 'rgba(59,130,246,0.1)';
            e.currentTarget.style.borderColor = d ? 'rgba(59,130,246,0.35)' : 'rgba(59,130,246,0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = d ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.06)';
            e.currentTarget.style.borderColor = d ? 'rgba(59,130,246,0.25)' : 'rgba(59,130,246,0.15)';
          }}
        >
          <Link2 className="w-3.5 h-3.5" />
          実際のFigmaコンポーネント
        </a>
      </div>

      <div className="space-y-4 mt-8">
        <div className="rounded-xl p-6" style={{ background: d ? 'rgba(239,67,68,0.08)' : 'rgba(239,67,68,0.04)', border: `1px solid ${d ? 'rgba(239,67,68,0.25)' : 'rgba(239,67,68,0.18)'}` }}>
          <div className="text-[13px] text-red-500 font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            やりがちな失敗
          </div>
          <div className={`text-[13px] ${c.t4} space-y-2`}>
            <div>• プロパティ名を「左アイコン」など見た目の表現で付けてしまう問題</div>
            <div>• Label変更もVariant化してすべてをVariantで作ってしまう問題</div>
            <div>• プロパティが多すぎて使いにくく複雑なコンポーネントになる問題</div>
          </div>
        </div>

        <div className="rounded-xl p-6" style={{ background: d ? 'rgba(16,185,129,0.12)' : 'rgba(16,185,129,0.06)', border: `2px solid ${d ? 'rgba(16,185,129,0.3)' : 'rgba(16,185,129,0.2)'}` }}>
          <div className="text-[13px] text-emerald-400 font-semibold mb-3 flex items-center gap-2">
            <span>✓</span>
            おすすめのやり方
          </div>
          <div className={`text-[13px] ${c.t4} space-y-2`}>
            <div>• プロパティ名は「Show left icon」のように役割で付けること</div>
            <div>• テキスト変更はプロパティで、見た目の切り替えはVariantで行うこと</div>
            <div>• 本当に必要なプロパティだけに絞ってシンプルで使いやすく保つこと</div>
          </div>
        </div>
      </div>

      <Tip>プロパティで変更可能な部分を決めることで、デザインの一貫性を保ちながら柔軟に使える</Tip>
    </div>
  );
}

function CompVariantsPropertiesSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg>プロパティ = 何を切り替えるか、値 = どういう<strong>状態があるか</strong></Msg>

      <div className={`text-[14px] ${c.t3} leading-relaxed space-y-4`}>
        <p>
          Variantsを作るときは、まず「何が変わるのか」を整理します。
        </p>
        <p>
          例えばタブなら「選択されているか・いないか」が変わります。これが<strong>プロパティ（切り替える軸）</strong>です。
        </p>
        <p>
          そして、その軸の中身が<strong>値</strong>です。state というプロパティなら、default / selected という値を持ちます。
        </p>
      </div>

      {/* 小さい例 */}
      <div
        className="rounded-xl p-6"
        style={{
          background: d ? 'rgba(168,85,247,0.06)' : 'rgba(168,85,247,0.04)',
          border: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
        }}
      >
        <div className={`text-[15px] ${c.t2} font-semibold mb-4`}>例：Category Tab</div>
        <div className={`text-[14px] ${c.t3} space-y-3`}>
          <div className="flex items-center gap-3">
            <div className={`text-[13px] ${c.t4} font-medium w-24`}>Property:</div>
            <div className="px-3 py-1.5 rounded-lg text-[13px] font-semibold" style={{ background: d ? 'rgba(168,85,247,0.15)' : 'rgba(168,85,247,0.12)', color: d ? '#c4b5fd' : '#7c3aed' }}>
              state
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className={`text-[13px] ${c.t4} font-medium w-24`}>Values:</div>
            <div className="flex gap-2">
              <div className="px-3 py-1.5 rounded-lg text-[13px]" style={{ background: d ? 'rgba(168,85,247,0.08)' : 'rgba(168,85,247,0.06)', border: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`, color: c.t2 }}>
                default
              </div>
              <div className="px-3 py-1.5 rounded-lg text-[13px]" style={{ background: d ? 'rgba(168,85,247,0.08)' : 'rgba(168,85,247,0.06)', border: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`, color: c.t2 }}>
                selected
              </div>
            </div>
          </div>
        </div>
        <div className={`text-[13px] ${c.t4} mt-4 italic`}>
          最初は1つのプロパティから考えればOK
        </div>

        {/* カテゴリータブの実例 */}
        <div className="mt-6">
          <div className={`text-[14px] ${c.t3} mb-3`}>実際の例：</div>
          <div className="grid grid-cols-2 gap-4">
            <div
              className="rounded-xl overflow-hidden"
              style={{
                border: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}images/category-tabs-example.png`}
                alt="カテゴリータブの例1"
                className="w-full"
              />
            </div>
            <div
              className="rounded-xl overflow-hidden"
              style={{
                border: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}images/category-tabs-variants.png`}
                alt="カテゴリータブの例2"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Figmaリンク */}
        <div className="mt-4">
          <a
            href="https://www.figma.com/design/Lzxkw6F9BxPWo8DoTEU5Ul/%E6%96%B0%E5%8D%92%E3%83%87%E3%82%B6%E3%82%A4%E3%83%8A%E3%83%BC%E7%A0%94%E4%BF%AE_Day1-5-1-?node-id=4052-930&t=anEt3oDM4VKXbPJh-4"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all"
            style={{
              background: d ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.06)',
              border: `1px solid ${d ? 'rgba(59,130,246,0.25)' : 'rgba(59,130,246,0.15)'}`,
              color: d ? '#93c5fd' : '#2563eb',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = d ? 'rgba(59,130,246,0.15)' : 'rgba(59,130,246,0.1)';
              e.currentTarget.style.borderColor = d ? 'rgba(59,130,246,0.35)' : 'rgba(59,130,246,0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = d ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.06)';
              e.currentTarget.style.borderColor = d ? 'rgba(59,130,246,0.25)' : 'rgba(59,130,246,0.15)';
            }}
          >
            <Link2 className="w-3.5 h-3.5" />
            実際のFigmaコンポーネント
          </a>
        </div>
      </div>

      {/* 実例：ボタンVariants */}
      <div>
        <div className={`text-[16px] ${c.t2} font-semibold mb-4`}>
          実例：ボタンVariants
        </div>

        {/* 命名規則 */}
        <div className="mb-6">
          <div className={`text-[14px] ${c.t3} mb-3 leading-relaxed`}>
            複数のプロパティを持つ場合、Variants名は <strong>Button/Primary/Large/Default/False</strong> のように表現されます。
          </div>
          <div
            className="w-full rounded-2xl overflow-hidden relative"
            style={{
              background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
              border: `2px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
              boxShadow: d
                ? '0 8px 32px rgba(168,85,247,0.15), 0 0 0 1px rgba(168,85,247,0.1) inset'
                : '0 8px 32px rgba(168,85,247,0.12), 0 0 0 1px rgba(255,255,255,0.6) inset'
            }}
          >
            <ExpandableImage
              src={`${import.meta.env.BASE_URL}images/variant-naming.png`}
              alt="Variants命名規則"
            />
            <div
              className="absolute bottom-2 right-2 px-2 py-1 rounded text-[12px]"
              style={{
                background: 'rgba(0,0,0,0.6)',
                color: 'rgba(255,255,255,0.8)'
              }}
            >
              出典：Figma公式
            </div>
          </div>
        </div>

        {/* グリッド配置 */}
        <div>
          <div className={`text-[14px] ${c.t3} mb-3 leading-relaxed`}>
            Variantsが多い場合は、<strong>グリッドで整理</strong>すると使いやすくなります。
          </div>
          <div
            className="w-full rounded-2xl overflow-hidden relative"
            style={{
              background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
              border: `2px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
              boxShadow: d
                ? '0 8px 32px rgba(168,85,247,0.15), 0 0 0 1px rgba(168,85,247,0.1) inset'
                : '0 8px 32px rgba(168,85,247,0.12), 0 0 0 1px rgba(255,255,255,0.6) inset'
            }}
          >
            <ExpandableImage
              src={`${import.meta.env.BASE_URL}images/variant-grid.png`}
              alt="Variantsのグリッド配置"
            />
            <div
              className="absolute bottom-2 right-2 px-2 py-1 rounded text-[12px]"
              style={{
                background: 'rgba(0,0,0,0.6)',
                color: 'rgba(255,255,255,0.8)'
              }}
            >
              出典：Figma公式
            </div>
          </div>
        </div>
      </div>

      <Points items={["最初は state のような1つの軸から考えればよい","プロパティ名は見た目ではなく意味でつける（「青いボタン」ではなく「primary」）","Variantsが多い場合はグリッドで整理する"]} />
    </div>
  );
}

function CompVariantsCreateSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg>FigmaでVariantsを作成する<strong>実際の手順</strong></Msg>

      {/* GIF Container */}
      <div
        className="rounded-2xl overflow-hidden relative"
        style={{
          background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
          border: `2px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
          boxShadow: d
            ? '0 8px 32px rgba(168,85,247,0.15), 0 0 0 1px rgba(168,85,247,0.1) inset'
            : '0 8px 32px rgba(168,85,247,0.12), 0 0 0 1px rgba(255,255,255,0.6) inset'
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/variant-creation.gif`}
          alt="Variantsの作成手順"
          style={{
            maxWidth: '100%',
            height: 'auto',
            display: 'block'
          }}
        />
        <div
          className="absolute bottom-2 right-2 px-2 py-1 rounded text-[12px]"
          style={{
            background: 'rgba(0,0,0,0.6)',
            color: 'rgba(255,255,255,0.8)'
          }}
        >
          出典：Figma公式
        </div>
      </div>

      <div
        className="rounded-xl p-5"
        style={{
          background: c.sub,
          border: `1px solid ${c.bd1}`,
          boxShadow: d ? '0 4px 24px rgba(0,0,0,0.15)' : '0 4px 24px rgba(0,0,0,0.06)'
        }}
      >
        <div className={`text-[14px] ${c.t2} font-semibold mb-3`}>
          新しいVariantsの作成方法
        </div>
        <div className={`text-[14px] ${c.t4} space-y-2.5`}>
          <div>メインコンポーネントを選択し、次のいずれかを実行：</div>
          <div className="pl-4 space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-purple-400">•</span>
              <span>ツールバーで<span className="font-mono bg-purple-500/10 px-1.5 py-0.5 rounded text-purple-400">+</span>をクリック</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-400">•</span>
              <span>右クリック → [メインコンポーネント] → [Variantsを追加]</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-400">•</span>
              <span>右サイドバーの[プロパティ]セクションで<span className="font-mono bg-purple-500/10 px-1.5 py-0.5 rounded text-purple-400">+</span> → [Variants]</span>
            </div>
          </div>
        </div>
      </div>

      <Tip>コンポーネントセットの下の<span className="font-mono bg-purple-500/10 px-1.5 py-0.5 rounded text-purple-400">+</span>をクリックして、さらにVariantsを追加できる</Tip>
    </div>
  );
}

function CompSlotSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg><strong>Slot（スロット）</strong>でコンポーネント内に他の要素を差し込める</Msg>
      <Points items={["コンポーネント内に「穴」を作って、インスタンス側で自由に内容を入れられる","アイコンやロゴなど、コンポーネントごとに変えたい要素に最適","プロパティと組み合わせることで、より柔軟な設計が可能に"]} />

      <div className="space-y-6">
        <div className={`text-[16px] ${c.t2} font-semibold`}>
          Slotの基本概念
        </div>
        <div className={`text-[14px] ${c.t3} leading-relaxed space-y-4`}>
          <p>
            Slotは、コンポーネント内に「他の要素を差し込めるエリア」を定義する機能です。テキストプロパティでは文字列のみ、Swap propertyではアイコンの差し替えのみですが、Slotを使えばどんな要素でも配置できます。
          </p>
          <p>
            例えば、カードコンポーネントに「画像エリア」「コンテンツエリア」としてSlotを設定すると、インスタンスごとに異なる画像やコンテンツを自由に配置できます。
          </p>
        </div>

        <div
          className="rounded-xl p-6"
          style={{
            background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
            border: `1px solid ${d ? 'rgba(168,85,247,0.15)' : 'rgba(168,85,247,0.1)'}`
          }}
        >
          <div className={`text-[15px] ${c.t2} font-semibold mb-4`}>Slotの使い方</div>
          <div className={`text-[14px] ${c.t3} leading-relaxed mb-4`}>
            メインコンポーネントにスロットが設定されると、そのインスタンスを取得して、スロットにコンテンツを追加できるようになります。最上位コンポーネントを選択またはマウスオーバーすると、スロットの周囲にピンク色の枠が表示されます。
          </div>
          <div className={`text-[14px] ${c.t3} leading-relaxed mb-4`}>
            スロットにはあらゆる種類のレイヤーを追加できます。
          </div>
          <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}` }}>
            <img
              src={`${import.meta.env.BASE_URL}images/slots-add-content.gif`}
              alt="Slotにコンテンツを追加する方法"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div
            className="rounded-xl p-5"
            style={{
              background: d ? 'rgba(16,185,129,0.08)' : 'rgba(16,185,129,0.04)',
              border: `1px solid ${d ? 'rgba(16,185,129,0.25)' : 'rgba(16,185,129,0.2)'}`
            }}
          >
            <div className="text-[13px] text-emerald-400 font-semibold mb-3 flex items-center gap-2">
              <span>✓</span>
              Slotが向いている場面
            </div>
            <div className={`text-[13px] ${c.t4} space-y-2`}>
              <div>• アイコンやロゴを自由に入れたい</div>
              <div>• 画像やイラストを差し込みたい</div>
              <div>• 複雑なコンテンツを配置したい</div>
              <div>• インスタンスごとに構造が変わる</div>
            </div>
          </div>

          <div
            className="rounded-xl p-5"
            style={{
              background: d ? 'rgba(16,185,129,0.08)' : 'rgba(16,185,129,0.04)',
              border: `1px solid ${d ? 'rgba(16,185,129,0.25)' : 'rgba(16,185,129,0.2)'}`
            }}
          >
            <div className={`text-[13px] text-emerald-400 font-semibold mb-3 flex items-center gap-2`}>
              <span>✓</span>
              Slotの利点
            </div>
            <div className={`text-[13px] ${c.t4} space-y-2`}>
              <div>• どんな要素でも差し込める柔軟性</div>
              <div>• プロパティよりも自由度が高い</div>
              <div>• ネストしたコンポーネントも配置可</div>
              <div>• Auto Layoutと組み合わせ可</div>
            </div>
          </div>
        </div>
      </div>

      <Tip>Slotは「コンテンツを入れる箱」、プロパティは「設定を切り替えるスイッチ」という役割の違いを理解する</Tip>
    </div>
  );
}

function CompVariantsBestPracticesSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg>Variantsを効果的に使う<strong>ベストプラクティス</strong></Msg>

      <div className="grid grid-cols-2 gap-6">
        {/* Practice 1: Property Naming */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: c.sub,
            border: `1px solid ${c.bd1}`,
            boxShadow: d ? '0 4px 24px rgba(0,0,0,0.15)' : '0 4px 24px rgba(0,0,0,0.06)'
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <div className={`text-[13px] font-semibold ${c.t2}`}>
              プロパティ名は意味のある名前にする
            </div>
          </div>

          {/* Bad Example */}
          <div className="mb-3">
            <div className="flex items-center gap-1.5 mb-2">
              <XCircle className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-[12px] text-rose-400 font-medium">悪い例</span>
            </div>
            <div className="flex gap-2">
              {['Variant1', 'Variant2', 'Variant3'].map(name => (
                <div
                  key={name}
                  className="px-2.5 py-1.5 rounded text-[12px] flex-1 text-center"
                  style={{
                    background: d ? 'rgba(244,63,94,0.08)' : 'rgba(244,63,94,0.06)',
                    border: `1px solid ${d ? 'rgba(244,63,94,0.2)' : 'rgba(244,63,94,0.15)'}`,
                    color: d ? '#fca5a5' : '#dc2626'
                  }}
                >
                  {name}
                </div>
              ))}
            </div>
          </div>

          {/* Good Example */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[12px] text-emerald-400 font-medium">良い例</span>
            </div>
            <div className="flex gap-2">
              {['Hierarchy', 'Size', 'State'].map(name => (
                <div
                  key={name}
                  className="px-2.5 py-1.5 rounded text-[12px] flex-1 text-center"
                  style={{
                    background: d ? 'rgba(16,185,129,0.08)' : 'rgba(16,185,129,0.06)',
                    border: `1px solid ${d ? 'rgba(16,185,129,0.25)' : 'rgba(16,185,129,0.2)'}`,
                    color: d ? '#6ee7b7' : '#059669'
                  }}
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Practice 2: Variant vs Property */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: c.sub,
            border: `1px solid ${c.bd1}`,
            boxShadow: d ? '0 4px 24px rgba(0,0,0,0.15)' : '0 4px 24px rgba(0,0,0,0.06)'
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <div className={`text-[13px] font-semibold ${c.t2}`}>
              Variants vs プロパティ
            </div>
          </div>

          {/* Variant Example */}
          <div className="mb-3">
            <div className="text-[12px] text-purple-400 font-medium mb-2">Variants：見た目が変わる</div>
            <div className="flex gap-2">
              <div
                className="flex-1 rounded-lg px-3 py-2 text-[12px] text-center text-white"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
              >
                Default
              </div>
              <div
                className="flex-1 rounded-lg px-3 py-2 text-[12px] text-center text-white"
                style={{ background: 'linear-gradient(135deg, #6d28d9, #7c3aed)' }}
              >
                Hover
              </div>
              <div
                className="flex-1 rounded-lg px-3 py-2 text-[12px] text-center"
                style={{
                  background: d ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                  color: d ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'
                }}
              >
                Disabled
              </div>
            </div>
          </div>

          {/* Property Example */}
          <div>
            <div className="text-[12px] text-blue-400 font-medium mb-2">プロパティ：値が変わる</div>
            <div className="space-y-1.5">
              <div
                className="rounded-lg px-3 py-2 text-[12px] text-center"
                style={{
                  background: d ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.06)',
                  border: `1px solid ${d ? 'rgba(59,130,246,0.2)' : 'rgba(59,130,246,0.15)'}`,
                  color: d ? '#60a5fa' : '#2563eb'
                }}
              >
                Label = "送信"
              </div>
              <div
                className="rounded-lg px-3 py-2 text-[12px] text-center"
                style={{
                  background: d ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.06)',
                  border: `1px solid ${d ? 'rgba(59,130,246,0.2)' : 'rgba(59,130,246,0.15)'}`,
                  color: d ? '#60a5fa' : '#2563eb'
                }}
              >
                Label = "キャンセル"
              </div>
            </div>
          </div>
        </div>

        {/* Practice 3: Keep Variants Count Reasonable */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: c.sub,
            border: `1px solid ${c.bd1}`,
            boxShadow: d ? '0 4px 24px rgba(0,0,0,0.15)' : '0 4px 24px rgba(0,0,0,0.06)'
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <div className={`text-[13px] font-semibold ${c.t2}`}>
              Variants数を適切に保つ
            </div>
          </div>

          <div className="space-y-3">
            {/* Too Many Variants */}
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <XCircle className="w-3.5 h-3.5 text-rose-400" />
                <span className="text-[12px] text-rose-400 font-medium">3軸 × 3値 × アイコン有無 = 54Variants 😱</span>
              </div>
              <div className="grid grid-cols-6 gap-1">
                {Array.from({ length: 18 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded"
                    style={{
                      background: d ? 'rgba(244,63,94,0.15)' : 'rgba(244,63,94,0.1)',
                      border: `1px solid ${d ? 'rgba(244,63,94,0.3)' : 'rgba(244,63,94,0.2)'}`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Optimized */}
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[12px] text-emerald-400 font-medium">3軸 × 3値 + Boolean = 27Variants ✨</span>
              </div>
              <div className="grid grid-cols-6 gap-1">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded"
                    style={{
                      background: d ? 'rgba(16,185,129,0.15)' : 'rgba(16,185,129,0.1)',
                      border: `1px solid ${d ? 'rgba(16,185,129,0.3)' : 'rgba(16,185,129,0.2)'}`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Practice 4: Set Default Variant */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: c.sub,
            border: `1px solid ${c.bd1}`,
            boxShadow: d ? '0 4px 24px rgba(0,0,0,0.15)' : '0 4px 24px rgba(0,0,0,0.06)'
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <div className={`text-[13px] font-semibold ${c.t2}`}>
              デフォルトVariantsを設定
            </div>
          </div>

          <div className="space-y-3">
            <div className={`text-[12px] ${c.t4}`}>
              最もよく使うVariantsをデフォルトに設定
            </div>

            <div
              className="rounded-xl p-4"
              style={{
                background: d ? 'rgba(168,85,247,0.06)' : 'rgba(168,85,247,0.04)',
                border: `2px solid ${d ? 'rgba(168,85,247,0.25)' : 'rgba(168,85,247,0.2)'}`,
                boxShadow: d
                  ? '0 4px 16px rgba(168,85,247,0.15)'
                  : '0 4px 16px rgba(168,85,247,0.1)'
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-purple-400 fill-purple-400" />
                <span className={`text-[12px] font-semibold ${d ? 'text-purple-200' : 'text-purple-700'}`}>
                  Default Variant
                </span>
              </div>
              <div className="space-y-1.5">
                <div className={`text-[12px] ${d ? 'text-purple-100' : 'text-purple-900'}`}>
                  <span className="font-mono bg-purple-500/10 px-1.5 py-0.5 rounded">Priority</span> = Primary
                </div>
                <div className={`text-[12px] ${d ? 'text-purple-100' : 'text-purple-900'}`}>
                  <span className="font-mono bg-purple-500/10 px-1.5 py-0.5 rounded">Size</span> = Medium
                </div>
                <div className={`text-[12px] ${d ? 'text-purple-100' : 'text-purple-900'}`}>
                  <span className="font-mono bg-purple-500/10 px-1.5 py-0.5 rounded">State</span> = Default
                </div>
              </div>
            </div>

            <div className={`text-[12px] ${c.t5} text-center`}>
              インスタンス挿入時の手間が減る
            </div>
          </div>
        </div>
      </div>

      <Tip>Variantsは「状態モデルの可視化」— 実装と1対1対応するように設計すると、開発者とのコミュニケーションが円滑になる</Tip>
    </div>
  );
}

function CompVariantsSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg>Variantsは、同じコンポーネントの<strong>状態や種類を管理する</strong>仕組み</Msg>
      <Points items={["state、size、hierarchy などを軸として持たせる","アイコンの有無や文言差し替えはプロパティで持つ","すべてをVariants化しない","VariantsはUIの状態モデルを表す"]} />
      <Vis>
        <Label>state × hierarchy × size のマトリクス</Label>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr><th className="p-2" /><th className={`p-2 ${c.t5} font-medium`} colSpan={3}>hierarchy</th></tr>
              <tr><th className={`p-2 ${c.t5} font-medium text-left`}>state</th><th className={`p-2 ${c.t5} font-normal`}>Primary</th><th className={`p-2 ${c.t5} font-normal`}>Secondary</th><th className={`p-2 ${c.t5} font-normal`}>Tertiary</th></tr>
            </thead>
            <tbody>
              {[
                { state: "Default", cells: [
                  <div className="text-white rounded-lg px-3 py-1.5 text-center" style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7, #c084fc)" }}>Label</div>,
                  <div className={`${c.t2} border border-purple-500/20 rounded-lg px-3 py-1.5 text-center`} style={{ background: c.glass2 }}>Label</div>,
                  <div className="text-purple-400 underline underline-offset-2 text-center py-1.5">Label</div>,
                ]},
                { state: "Hover", cells: [
                  <div className="text-white rounded-lg px-3 py-1.5 text-center" style={{ background: "linear-gradient(135deg, #6d28d9, #7c3aed)" }}>Label</div>,
                  <div className={`${c.t2} border border-purple-500/30 rounded-lg px-3 py-1.5 text-center`} style={{ background: "rgba(168,85,247,0.08)" }}>Label</div>,
                  <div className={`${d ? "text-purple-300" : "text-purple-500"} underline underline-offset-2 text-center py-1.5`}>Label</div>,
                ]},
                { state: "Disabled", cells: [
                  <div className={`${c.b2} ${c.t5} rounded-lg px-3 py-1.5 text-center`}>Label</div>,
                  <div className={`${c.t6} border ${c.bd2} rounded-lg px-3 py-1.5 text-center`} style={{ background: c.sub }}>Label</div>,
                  <div className={`${c.t6} underline underline-offset-2 text-center py-1.5`}>Label</div>,
                ]},
              ].map((row) => (
                <tr key={row.state}>
                  <td className={`p-2 ${c.t4} font-medium`}>{row.state}</td>
                  {row.cells.map((cell, i) => <td key={i} className="p-2">{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={`text-[12px] ${c.t5} mt-3 text-center`}>+ size (Small / Medium / Large) で3次元のマトリクスになる</div>
      </Vis>
      <Tip>「見た目が変わるならVariants、値が変わるならプロパティ」が基本の判断軸</Tip>
    </div>
  );
}

function VarBasicsSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg>Variablesを使えば、<strong>値を1箇所変えるだけで複数の場所に一括反映</strong>できる</Msg>
      <Points items={["色（ブランドカラー）の一元管理","余白（8px, 16px, 24px）の統一","サイズ（ボタンの高さなど）の管理"]} />

      <div className="space-y-6">
        {/* Before */}
        <div
          className="rounded-2xl p-6"
          style={{
            background: d ? 'rgba(244,63,94,0.04)' : 'rgba(244,63,94,0.02)',
            border: `1px solid ${d ? 'rgba(244,63,94,0.15)' : 'rgba(244,63,94,0.1)'}`,
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <div className={`text-[14px] font-semibold ${c.t2}`}>Before: 値を直接指定</div>
          </div>

          <div className="flex items-center justify-center gap-8 mb-4">
            <div className="text-center">
              <div className="mb-2 px-3 py-1.5 rounded-lg text-white text-[12px] font-medium" style={{ background: '#7c3aed' }}>
                ボタン
              </div>
              <div className={`text-[12px] ${c.t5} font-mono`}>#7c3aed</div>
            </div>

            <div className="text-center">
              <div className={`mb-2 text-[16px] font-bold`} style={{ color: '#7c3aed' }}>
                見出し
              </div>
              <div className={`text-[12px] ${c.t5} font-mono`}>#7c3aed</div>
            </div>

            <div className="text-center">
              <div className="mb-2 w-10 h-10 rounded-lg flex items-center justify-center mx-auto" style={{ background: '#7c3aed' }}>
                <Star className="w-5 h-5 text-white" />
              </div>
              <div className={`text-[12px] ${c.t5} font-mono`}>#7c3aed</div>
            </div>
          </div>

          <div className={`text-[13px] ${c.t4} text-center`}>
            😰 色を変えたい → 全部探して1つずつ修正...
          </div>
        </div>

        {/* Arrow */}
        <div className="flex flex-col items-center justify-center">
          <div className={`text-[14px] ${c.t4} font-semibold`}>Variables化</div>
          <ArrowDown className={`w-5 h-5 ${c.t4} mt-2`} />
        </div>

        {/* After */}
        <div
          className="rounded-2xl p-6"
          style={{
            background: d ? 'rgba(34,197,94,0.04)' : 'rgba(34,197,94,0.02)',
            border: `1px solid ${d ? 'rgba(34,197,94,0.15)' : 'rgba(34,197,94,0.1)'}`,
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-emerald-400 text-[14px]">✓</span>
            <div className={`text-[14px] font-semibold ${c.t2}`}>After: Variablesで管理</div>
          </div>

          <div className="flex flex-col items-center mb-4">
            <div
              className="rounded-lg px-4 py-2 mb-4"
              style={{
                background: d ? 'rgba(168,85,247,0.1)' : 'rgba(168,85,247,0.08)',
                border: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
              }}
            >
              <div className={`text-[13px] font-mono font-semibold ${d ? 'text-purple-300' : 'text-purple-600'}`}>
                color/primary = #7c3aed
              </div>
            </div>

            <div className="flex gap-1 mb-3">
              <div className={`w-[2px] h-8 ${d ? 'bg-purple-400/30' : 'bg-purple-400/20'}`} />
              <div className={`w-[2px] h-8 ${d ? 'bg-purple-400/30' : 'bg-purple-400/20'}`} />
              <div className={`w-[2px] h-8 ${d ? 'bg-purple-400/30' : 'bg-purple-400/20'}`} />
            </div>

            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="mb-2 px-3 py-1.5 rounded-lg text-white text-[12px] font-medium" style={{ background: '#7c3aed' }}>
                  ボタン
                </div>
              </div>

              <div className="text-center">
                <div className={`mb-2 text-[16px] font-bold`} style={{ color: '#7c3aed' }}>
                  見出し
                </div>
              </div>

              <div className="text-center">
                <div className="mb-2 w-10 h-10 rounded-lg flex items-center justify-center mx-auto" style={{ background: '#7c3aed' }}>
                  <Star className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="text-[13px] text-emerald-400 text-center font-medium">
            ✨ color/primaryを変えるだけで一括変更！
          </div>
        </div>
      </div>

      <div className="rounded-xl p-4" style={{ background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)', border: `1px solid ${d ? 'rgba(168,85,247,0.1)' : 'rgba(168,85,247,0.08)'}` }}>
        <div className={`text-[13px] ${c.t2} font-semibold mb-2`}>スタイルとVariablesの違い</div>
        <div className={`text-[13px] ${c.t4} space-y-1`}>
          <div>• <strong>スタイル</strong> = 見た目のセット（複数の設定をまとめる）</div>
          <div>• <strong>Variables</strong> = 1つの値（色だけ、サイズだけ）</div>
          <div className={`text-[12px] ${c.t5} mt-2 pl-4`}>例: 料理の「レシピ」 vs 「食材」</div>
        </div>
      </div>

      <Tip>Variablesは「値の一元管理」— 変更に強いデザインの基礎</Tip>
    </div>
  );
}

function VarApplySlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg>Primitive → Semantic の<strong>2層構造</strong>で管理すると、変更に強くなる</Msg>
      <Points items={["Primitive（生の値）を土台にする","Semantic（意味のある名前）で役割を明確にする","ブランドカラー変更やダークモード対応が簡単になる"]} />

      <Vis>
        <Label>2層構造の仕組み</Label>
        <div className="space-y-6">
          {/* Layer 1: Primitive */}
          <div
            className="rounded-2xl p-5"
            style={{
              background: c.glass2,
              border: c.glassBd,
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className={`text-[13px] font-semibold ${c.t2}`}>1層目: Primitive（生の値）</div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded" style={{ background: '#7c3aed' }} />
                <div className={`text-[12px] ${c.t3} font-mono`}>purple-500</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded" style={{ background: '#10b981' }} />
                <div className={`text-[12px] ${c.t3} font-mono`}>green-500</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded" style={{ background: '#f3f4f6' }} />
                <div className={`text-[12px] ${c.t3} font-mono`}>gray-100</div>
              </div>
            </div>
            <div className={`text-[12px] ${c.t5} mt-3`}>※ 実際の色コードを定義</div>
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center justify-center gap-2">
            <div className={`text-[12px] ${c.t5}`}>エイリアス（次ページ参照）</div>
            <ArrowDown className={`w-4 h-4 ${c.t5}`} />
          </div>

          {/* Layer 2: Semantic */}
          <div
            className="rounded-2xl p-5"
            style={{
              background: d ? 'rgba(168,85,247,0.06)' : 'rgba(168,85,247,0.04)',
              border: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className={`text-[13px] font-semibold ${d ? 'text-purple-300' : 'text-purple-700'}`}>2層目: Semantic（意味のある名前）</div>
            </div>
            <div className="space-y-2">
              <div className={`text-[12px] ${d ? 'text-purple-300' : 'text-purple-700'} font-mono flex items-center gap-2`}>
                <div className="w-8 h-8 rounded" style={{ background: '#7c3aed' }} />
                color/primary = purple-500
              </div>
              <div className={`text-[12px] ${d ? 'text-purple-300' : 'text-purple-700'} font-mono flex items-center gap-2`}>
                <div className="w-8 h-8 rounded" style={{ background: '#10b981' }} />
                color/success = green-500
              </div>
              <div className={`text-[12px] ${d ? 'text-purple-300' : 'text-purple-700'} font-mono flex items-center gap-2`}>
                <div className="w-8 h-8 rounded" style={{ background: '#f3f4f6' }} />
                color/background = gray-100
              </div>
            </div>
            <div className={`text-[12px] ${c.t5} mt-3`}>※ 役割で名前をつける</div>
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center justify-center gap-2">
            <div className={`text-[12px] ${c.t5}`}>適用</div>
            <ArrowDown className={`w-4 h-4 ${c.t5}`} />
          </div>

          {/* UI Application */}
          <div
            className="rounded-2xl p-5"
            style={{
              background: d ? 'rgba(168,85,247,0.06)' : 'rgba(168,85,247,0.04)',
              border: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className={`text-[13px] font-semibold ${d ? 'text-purple-300' : 'text-purple-700'}`}>UI適用</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 rounded-lg text-white text-[13px] font-medium" style={{ background: '#7c3aed' }}>
                ボタン
              </div>
              <div className={`text-[12px] ${c.t5}`}>背景 = color/primary</div>
            </div>
          </div>
        </div>
      </Vis>

      <div className="rounded-xl p-5" style={{ background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)', border: `1px solid ${d ? 'rgba(168,85,247,0.1)' : 'rgba(168,85,247,0.08)'}` }}>
        <div className={`text-[13px] ${c.t2} font-semibold mb-3`}>なぜ2層にするの？</div>
        <div className={`text-[13px] ${c.t4} space-y-2`}>
          <div>• <strong>ブランドカラー変更が簡単:</strong> primary を purple → blue に変更しても、UIコードは変えなくていい</div>
          <div>• <strong>ダークモード対応:</strong> mode切り替えで一括変更できる</div>
          <div>• <strong>意味が明確:</strong> 「purple」より「primary」の方が役割が伝わる</div>
        </div>
      </div>

      <div className="space-y-4">
        <div className={`text-[14px] ${c.t2} font-semibold`}>例：モード切り替え</div>

        <div className={`text-[13px] ${c.t4} leading-relaxed space-y-3`}>
          <div>
            Variablesは、<strong>1つの名前に複数の値を持てる仕組み</strong>です。
            ただし、その場で使われる値は1つだけで、
            どの値を使うかはモードやコンテキストによって切り替わります。
          </div>

          <div className="pl-4 space-y-2">
            <div className={`text-[12px] ${c.t5}`}>例：</div>
            <div className={`text-[13px] ${c.t3} font-mono`}>color/bg</div>
            <div className={`text-[12px] ${c.t4} pl-4 space-y-1`}>
              <div>Light → #FFFFFF</div>
              <div>Dark → #111111</div>
            </div>
          </div>

          <div className={`text-[12px] ${c.t4} pt-2`}>
            FrameをDarkにすると、その中のレイヤーは自動でDarkの値を使います。
          </div>
        </div>

        <div className="w-full rounded-2xl overflow-hidden relative">
          <ExpandableImage
            src={`${import.meta.env.BASE_URL}images/variable-mode.gif`}
            alt="Variablesのモード切り替え"
          />
          <div
            className="absolute bottom-2 right-2 px-2 py-1 rounded text-[12px]"
            style={{
              background: 'rgba(0,0,0,0.6)',
              color: 'rgba(255,255,255,0.8)'
            }}
          >
            出典：Figma公式
          </div>
        </div>
      </div>

      <div
        className="rounded-xl p-5"
        style={{
          background: d ? 'rgba(168,85,247,0.08)' : 'rgba(168,85,247,0.06)',
          border: `2px solid ${d ? 'rgba(168,85,247,0.3)' : 'rgba(168,85,247,0.2)'}`,
        }}
      >
        <div className={`text-[14px] ${c.t2} font-bold mb-3`}>
          重要ポイント
        </div>
        <div className={`text-[14px] ${c.t3} leading-relaxed`}>
          Variablesを使うときは、<strong className="text-purple-400">色そのものの名前で管理するのではなく、役割の名前で管理する</strong>
        </div>
        <div className={`text-[13px] ${c.t4} mt-2`}>
          例：「purple」「blue」ではなく → 「primary」「success」で管理
        </div>
      </div>

      <Tip>色は「purple」「blue」ではなく「primary」「success」で管理する</Tip>
    </div>
  );
}

function VarAliasSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg>トークンの<strong>エイリアス</strong>を使うと、デザインシステムを効率よく育てられる</Msg>
      <Points items={["エイリアス = あるトークンが別のトークンの値を引き継ぐこと","元の値を変えると、参照している全てのトークンも自動更新される","スタイルと違い、Variablesは他のVariablesを参照できる"]} />

      <div className={`text-[14px] ${c.t4} leading-relaxed`}>
        Figmaの記事では、デザイントークンを<strong>「再利用できる値」</strong>、エイリアシングを<strong>「あるトークンが、別のトークンの値を引き継ぐこと」</strong>と説明しています。
      </div>

      <div className="space-y-4">
        <div className={`text-[14px] ${c.t2} font-semibold`}>1. エイリアスの基本</div>
        <div className={`text-[13px] ${c.t4} leading-relaxed`}>
          たとえば、<span className="font-mono font-semibold">brand-400</span> という色のトークンがあって、その値が <span className="font-mono">#EAEA00</span> だったとします。
        </div>
        <div className="w-full rounded-2xl overflow-hidden relative">
          <ExpandableImage
            src={`${import.meta.env.BASE_URL}images/alias-part2.png`}
            alt="トークンの定義"
          />
          <div
            className="absolute bottom-2 right-2 px-2 py-1 rounded text-[12px]"
            style={{
              background: 'rgba(0,0,0,0.6)',
              color: 'rgba(255,255,255,0.8)'
            }}
          >
            出典：Figma公式
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className={`text-[13px] ${c.t4} leading-relaxed space-y-3`}>
          <div>
            ここで <span className="font-mono font-semibold">icon-default</span> という別のトークンを、<span className="font-mono">brand-400</span> のエイリアスにすると、<span className="font-mono">icon-default</span> は自分で色を持たず、<span className="font-mono">brand-400</span> の色をそのまま使います。
          </div>
          <div>
            だから、あとで <span className="font-mono font-semibold">brand-400</span> の色を変えると、<span className="font-mono">icon-default</span> も自動で同じ色に変わります。
          </div>
        </div>
        <div className="w-full rounded-2xl overflow-hidden relative">
          <ExpandableImage
            src={`${import.meta.env.BASE_URL}images/alias-part1.png`}
            alt="エイリアスの動作"
          />
          <div
            className="absolute bottom-2 right-2 px-2 py-1 rounded text-[12px]"
            style={{
              background: 'rgba(0,0,0,0.6)',
              color: 'rgba(255,255,255,0.8)'
            }}
          >
            出典：Figma公式
          </div>
        </div>
        <div className={`text-[13px] ${c.t4} leading-relaxed font-semibold`}>
          つまり、元の値を1か所直すだけで、つながっているところもまとめて更新できるということです。
        </div>
      </div>

      <div className="space-y-4">
        <div className={`text-[14px] ${c.t2} font-semibold`}>2. スタイルとVariablesの違い</div>
        <div className={`text-[13px] ${c.t4} leading-relaxed space-y-3`}>
          <div>
            <strong>スタイルはこのエイリアスに対応していません</strong>。スタイルは、他のスタイルやVariablesを"参照してつながる"しくみが弱いです。
          </div>
          <div>
            一方で<strong>Variablesは、他のVariablesを参照できる</strong>ので、もっと大きくて整理された仕組みを作れます。
          </div>
        </div>

        {/* 比較表 */}
        <div className="overflow-x-auto mt-6">
          <table className="w-full text-[13px]" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead>
              <tr>
                <th
                  className={`p-3 text-left font-semibold ${c.t2}`}
                  style={{
                    background: d ? 'rgba(168,85,247,0.08)' : 'rgba(168,85,247,0.06)',
                    borderTop: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                    borderLeft: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                    borderBottom: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                    borderTopLeftRadius: '8px',
                  }}
                ></th>
                <th
                  className={`p-3 text-left font-semibold ${c.t2}`}
                  style={{
                    background: d ? 'rgba(168,85,247,0.08)' : 'rgba(168,85,247,0.06)',
                    borderTop: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                    borderBottom: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                  }}
                >
                  スタイル
                </th>
                <th
                  className={`p-3 text-left font-semibold`}
                  style={{
                    background: d ? 'rgba(168,85,247,0.08)' : 'rgba(168,85,247,0.06)',
                    color: d ? '#c4b5fd' : '#7c3aed',
                    borderTop: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                    borderRight: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                    borderBottom: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                    borderTopRightRadius: '8px',
                  }}
                >
                  Variables
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  className={`p-3 font-semibold ${c.t3}`}
                  style={{
                    background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
                    borderLeft: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                    borderBottom: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                  }}
                >
                  適用範囲
                </td>
                <td
                  className={`p-3 ${c.t4}`}
                  style={{
                    background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
                    borderBottom: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                  }}
                >
                  特定のデザイン属性（例：テキストスタイル、塗り、線など）に適用
                </td>
                <td
                  className={`p-3 ${c.t4}`}
                  style={{
                    background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
                    borderRight: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                    borderBottom: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                  }}
                >
                  デザイン内の任意のプロパティに適用可能（例：幅、高さ、色、テキスト内容など）
                </td>
              </tr>
              <tr>
                <td
                  className={`p-3 font-semibold ${c.t3}`}
                  style={{
                    background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
                    borderLeft: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                    borderBottom: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                  }}
                >
                  データタイプ
                </td>
                <td
                  className={`p-3 ${c.t4}`}
                  style={{
                    background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
                    borderBottom: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                  }}
                >
                  主に視覚的な属性（例：色やフォント）
                </td>
                <td
                  className={`p-3 ${c.t4}`}
                  style={{
                    background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
                    borderRight: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                    borderBottom: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                  }}
                >
                  色、数値、文字列、ブール値など多様なデータタイプを扱う
                </td>
              </tr>
              <tr>
                <td
                  className={`p-3 font-semibold ${c.t3}`}
                  style={{
                    background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
                    borderLeft: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                    borderBottom: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                    borderBottomLeftRadius: '8px',
                  }}
                >
                  動的な変更
                </td>
                <td
                  className={`p-3 ${c.t4}`}
                  style={{
                    background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
                    borderBottom: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                  }}
                >
                  不可（静的なデザイン属性の適用と管理が主）
                </td>
                <td
                  className={`p-3 ${c.t4}`}
                  style={{
                    background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
                    borderRight: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                    borderBottom: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                    borderBottomRightRadius: '8px',
                  }}
                >
                  可能（プロトタイプでユーザーの操作に応じた変更が可能）
                </td>
              </tr>
            </tbody>
          </table>
          <div className={`text-right text-[12px] ${c.t4} mt-2`}>
            出典：fumufumuUI
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className={`text-[14px] ${c.t2} font-semibold`}>3. トークンの階層構造</div>
        <div className={`text-[13px] ${c.t4} leading-relaxed`}>
          たとえば、まず基本の色みたいな<strong>「元になるトークン」</strong>を作って、その上に<strong>「アイコン用の色」「ボタン用の色」</strong>みたいなトークンを重ねていくイメージです。このとき、いちばん上流の元の色を変えると、その下につながっているトークンもまとめて変わります。
        </div>
        <div className="w-full rounded-2xl overflow-hidden relative">
          <ExpandableImage
            src={`${import.meta.env.BASE_URL}images/variables-explain-1.gif`}
            alt="トークンの階層構造"
          />
          <div
            className="absolute bottom-2 right-2 px-2 py-1 rounded text-[12px]"
            style={{
              background: 'rgba(0,0,0,0.6)',
              color: 'rgba(255,255,255,0.8)'
            }}
          >
            出典：Figma公式
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className={`text-[14px] ${c.t2} font-semibold`}>4. 部分的な変更も簡単</div>
        <div className={`text-[13px] ${c.t4} leading-relaxed space-y-3`}>
          <div>
            一部だけ変えたいときも便利です。全部を手で作り直さなくても、途中の適切なトークンを差し替えるだけで、その下にある部分をまとめて変更できます。
          </div>
          <div>
            トークンを階層でつないでおくと、変更したい範囲に応じて差し替える場所を選べます。<span className="font-mono font-semibold">pink-600</span> のような上位のトークンを変えると、関連する複数のUIに広く影響します。一方で、<span className="font-mono font-semibold">surface-highlight</span> や <span className="font-mono font-semibold">button-primary</span> のような途中のトークンを変えれば、影響範囲をその役割やコンポーネントだけに絞れます。
          </div>
          <div>
            この例では、<span className="font-mono font-semibold">accent-hover</span> が参照する Global token を <span className="font-mono font-semibold">pink-600</span> から <span className="font-mono font-semibold">purple-600</span> に切り替えています。その結果、<span className="font-mono">accent-hover</span> につながる検索枠や進捗リングだけが更新され、ボタンやアイコンには影響しません。
          </div>
        </div>
        <div className="w-full rounded-2xl overflow-hidden relative">
          <ExpandableImage
            src={`${import.meta.env.BASE_URL}images/variables-explain-2.gif`}
            alt="部分的な変更"
          />
          <div
            className="absolute bottom-2 right-2 px-2 py-1 rounded text-[12px]"
            style={{
              background: 'rgba(0,0,0,0.6)',
              color: 'rgba(255,255,255,0.8)'
            }}
          >
            出典：Figma公式
          </div>
        </div>
      </div>

      <div
        className="rounded-xl p-5"
        style={{
          background: d ? 'rgba(168,85,247,0.06)' : 'rgba(168,85,247,0.04)',
          border: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
        }}
      >
        <div className={`text-[13px] ${c.t4} leading-relaxed space-y-3`}>
          <div>
            つまりVariablesは、<strong>「まず共通のルールを作って、必要なところへつなげる」</strong>のが得意です。
          </div>
          <div>
            そのおかげで、デザインが大きくなっても、変更しやすく、壊れにくく、管理もしやすい仕組みを作れます。
          </div>
          <div className={`text-[12px] ${c.t5}`}>
            Figmaの記事でも、Variablesはエイリアシングによって複雑で拡張可能なトークン構造を支え、更新や管理を効率的にできると説明されています。
          </div>
        </div>
      </div>

      <Tip>エイリアスを使うと、変更に強く、拡張しやすいデザインシステムが作れる</Tip>
    </div>
  );
}

function LibBasicsSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg>ライブラリはアセット置き場ではなく、<strong>チームの共通言語</strong></Msg>
      <Points items={["コンポーネント、スタイル、Variablesを共有する","一貫性を保ちやすくする","新しく入った人が判断基準を理解しやすくなる"]} />
      <Vis>
        <Label>1つのライブラリから複数ファイルへ</Label>
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-xl px-6 py-4 flex items-center gap-3 shadow-sm" style={{ background: "rgba(168,85,247,0.1)", border: "2px solid rgba(168,85,247,0.2)" }}>
            <BookOpen className="w-5 h-5 text-purple-400" />
            <div>
              <div className={`text-[14px] font-medium ${d ? "text-purple-200" : "text-purple-700"}`}>Design System Library</div>
              <div className="text-[12px] text-purple-400">Components + Styles + Variables</div>
            </div>
          </div>
          <div className="flex gap-2">{[0,1,2].map((i) => <div key={i} className="w-px h-6 bg-purple-500/20" />)}</div>
          <div className="flex gap-4">
            {["プロダクトA","プロダクトB","LP・マーケ"].map((name) => (
              <div key={name} className="rounded-xl px-4 py-3 text-center shadow-sm" style={{ background: c.glass2, border: c.glassBd }}>
                <div className={`text-[12px] ${c.t3}`}>{name}</div>
                <div className={`text-[12px] ${c.t5} mt-0.5`}>Figma file</div>
              </div>
            ))}
          </div>
        </div>
      </Vis>
      <Tip>ライブラリを整備すると「この色どれ使えばいい？」という質問がなくなる</Tip>
    </div>
  );
}

function LibPublishSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg>ライブラリ更新は、単なる修正ではなく<strong>チームへのリリース</strong></Msg>
      <Points items={["作っただけでは共有されない。公開して初めてチームの基準になる","更新時は何を、なぜ、どこまで変えたかを説明する","Breaking change を避ける意識を持つ"]} />

      <div className="w-full">
        <div className="grid grid-cols-2 gap-8">
          {/* Publish Library */}
          <div className="space-y-3">
            <div className="text-[13px] text-purple-400 mb-2 font-medium">1. Publish Library（公開）</div>
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                border: `2px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                boxShadow: d
                  ? '0 8px 32px rgba(168,85,247,0.15)'
                  : '0 8px 32px rgba(168,85,247,0.12)'
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}images/publish-library.png`}
                alt="Publish Library"
                className="w-full"
              />
            </div>
          </div>

          {/* Update Library */}
          <div className="space-y-3">
            <div className={`text-[13px] ${d ? 'text-blue-400' : 'text-blue-600'} mb-2 font-medium`}>2. Update Library（取り込み）</div>
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                border: `2px solid ${d ? 'rgba(59,130,246,0.2)' : 'rgba(59,130,246,0.15)'}`,
                boxShadow: d
                  ? '0 8px 32px rgba(59,130,246,0.15)'
                  : '0 8px 32px rgba(59,130,246,0.12)'
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}images/update-library.png`}
                alt="Update Library"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 mt-8">
        <div className="rounded-xl p-6" style={{ background: d ? 'rgba(239,67,68,0.08)' : 'rgba(239,67,68,0.04)', border: `1px solid ${d ? 'rgba(239,67,68,0.25)' : 'rgba(239,67,68,0.18)'}` }}>
          <div className="text-[13px] text-red-500 font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            やりがちな失敗
          </div>
          <div className={`text-[14px] ${c.t4} space-y-2`}>
            <div>• 変更内容を説明せずにPublishしてしまう</div>
            <div>• Breaking changeを告知せずにリリースしてしまう</div>
            <div>• 全ての更新を無条件にUpdateしてしまう（レビュー不足）</div>
          </div>
        </div>

        <div className="rounded-xl p-6" style={{ background: d ? 'rgba(16,185,129,0.12)' : 'rgba(16,185,129,0.06)', border: `2px solid ${d ? 'rgba(16,185,129,0.3)' : 'rgba(16,185,129,0.2)'}` }}>
          <div className="text-[13px] text-emerald-400 font-semibold mb-3 flex items-center gap-2">
            <span>✓</span>
            おすすめのやり方
          </div>
          <div className={`text-[14px] ${c.t4} space-y-2`}>
            <div>• Publish時に変更内容を詳しく説明する</div>
            <div>• Breaking changeは事前に告知してバージョン管理</div>
            <div>• 更新前に必ずレビューして影響範囲を確認する</div>
          </div>
        </div>
      </div>

      <Vis>
        <Label>公開・更新のフロー</Label>
        <div className="flex items-center justify-between gap-2">
          {[
            { icon: "✏️", label: "編集", sub: "ライブラリで変更" },
            { icon: "📤", label: "Publish", sub: "説明を添えて公開" },
            { icon: "👀", label: "レビュー", sub: "利用側で確認" },
            { icon: "📥", label: "Update", sub: "取り込み判断" },
          ].map((step, i) => (
            <React.Fragment key={step.label}>
              {i > 0 && <ChevronRight className={`w-4 h-4 ${c.t6} shrink-0`} />}
              <div className="rounded-xl p-3 text-center flex-1" style={{ background: c.glass2, border: c.glassBd }}>
                <div className="text-[20px] mb-1">{step.icon}</div>
                <div className={`text-[12px] font-medium ${c.t2}`}>{step.label}</div>
                <div className={`text-[12px] ${c.t5} mt-0.5`}>{step.sub}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </Vis>
      <Tip>Publish時には変更内容を説明することで、チームでの共有がスムーズになる</Tip>
    </div>
  );
}

function TokenBasicsSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg>トークンは、値に名前をつけることではなく、<strong>判断を再利用できる形にする</strong>こと</Msg>
      <Points items={["Primitive / Semantic / Component の3階層で設計する","トークン = 概念。Variables = Figma上での実装手段"]} />
      <Vis>
        <Label>トークン階層のツリー</Label>
        <div className="space-y-3">
          {[
            { level: "Primitive", desc: "色パレットそのもの", examples: ["purple/500 = #7C3AED","gray/900 = #111827","space/4 = 16px"], color: d ? "bg-gray-800/50 border-gray-600 text-gray-200" : "bg-gray-100 border-gray-300 text-gray-700" },
            { level: "Semantic", desc: "用途に応じた意味", examples: ["color/primary → purple/500","text/default → gray/900","space/component → space/4"], color: d ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300" : "bg-emerald-50 border-emerald-200 text-emerald-700" },
            { level: "Component", desc: "特定部品向け", examples: ["button/bg → color/primary","button/padding → space/component"], color: d ? "bg-purple-500/10 border-purple-500/20 text-purple-300" : "bg-purple-50 border-purple-200 text-purple-700" },
          ].map((tier, i) => (
            <div key={tier.level}>
              {i > 0 && <div className="flex justify-center py-1"><div className={`w-px h-4 ${c.b2}`} /></div>}
              <div className={`rounded-xl border px-5 py-3 ${tier.color}`}>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-[14px] font-medium">{tier.level}</span>
                  <span className="text-[12px] opacity-60">{tier.desc}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tier.examples.map((ex) => (
                    <span key={ex} className={`text-[12px] ${d ? "bg-white/5" : "bg-black/5"} rounded-lg px-2 py-0.5`}>{ex}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Vis>
      <Tip>FigmaのVariablesは、トークンの「実装手段」。概念を先に整理してからFigmaに落とす</Tip>
    </div>
  );
}

function TokenSemanticSlide() {
  const theme = useTheme();
  const c = tc(theme);
  return (
    <div className="space-y-10">
      <Msg>色は<strong>「何色か」ではなく「何のための色か」</strong>で扱う</Msg>
      <Points items={["よく使われるのは text / bg / border の3分類","デザイナーは色番号ではなく役割を選ぶ"]} />
      <Vis>
        <Label>テキスト / 背景 / ボーダーの3分類</Label>
        <div className="space-y-5">
          {[
            { title: "✍️ Text", items: [
              { name: "default", hex: "#F9FAFB" },{ name: "secondary", hex: "#9CA3AF" },{ name: "disabled", hex: "#4B5563" },{ name: "inverse", hex: "#111827" },{ name: "link", hex: "#3B82F6" },{ name: "error", hex: "#EF4444" },
            ]},
            { title: "🖼 Background", items: [
              { name: "primary", hex: "#0C0C18" },{ name: "surface", hex: "#16132A" },{ name: "elevated", hex: "#1E1B2E" },{ name: "accent", hex: "#7C3AED" },{ name: "error", hex: "#450A0A" },{ name: "success", hex: "#052E16" },
            ]},
            { title: "🔲 Border", items: [
              { name: "default", hex: "#374151" },{ name: "strong", hex: "#6B7280" },{ name: "focus", hex: "#A855F7" },{ name: "error", hex: "#EF4444" },
            ]},
          ].map((group) => (
            <div key={group.title}>
              <div className={`text-[12px] font-medium ${c.t3} mb-2`}>{group.title}</div>
              <div className="flex gap-3 flex-wrap">
                {group.items.map((ci) => (
                  <div key={ci.name} className={`flex items-center gap-2 rounded-lg border ${c.bd2} px-3 py-1.5`} style={{ background: c.glass }}>
                    <div className={`w-4 h-4 rounded-full border ${c.bd1}`} style={{ backgroundColor: ci.hex }} />
                    <span className={`text-[12px] ${c.t4}`}>{group.title.includes("Text") ? "text" : group.title.includes("Background") ? "bg" : "border"}/{ci.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Vis>
      <div className="rounded-xl p-5" style={{ background: c.glass, border: c.glassBd }}>
        <Label>UIへの適用例（フォーム入力）</Label>
        <div className="max-w-xs mx-auto space-y-1">
          <div className={`text-[12px] ${c.t2} font-medium`}>
            <span className="text-[12px] text-emerald-400 bg-emerald-500/10 px-1 rounded">text/default</span> メールアドレス
          </div>
          <div className="border-2 rounded-lg px-3 py-2 flex items-center gap-2 border-purple-400" style={{ background: c.glass }}>
            <span className={`text-[12px] ${c.t2}`}>user@example.com</span>
            <span className="text-[12px] text-purple-400 bg-purple-500/10 px-1 rounded ml-auto">border/focus</span>
          </div>
          <div className="text-[12px] text-red-400 flex items-center gap-1">
            <span className="text-[12px] text-red-400 bg-red-500/10 px-1 rounded">text/error</span> 有効なメールアドレスを入力してください
          </div>
        </div>
      </div>
      <Tip>「この色は何色？」ではなく「この色は何のため？」と聞く習慣をつける</Tip>
    </div>
  );
}

function TokenHexSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg>HEXをトークン化する時は、値を置き換えるのではなく、<strong>意味を読み替える</strong></Msg>
      <Points items={["既存HEXを棚卸しする","同じHEXでも用途ごとに分けて見る","Primitive → Semantic の順でトークンを作る","使用頻度の高いコンポーネントから置き換える","検索置換ではなく、文脈で移行する"]} />
      <Vis>
        <Label>同じ #7C3AED でも、意味が違えばトークンが違う</Label>
        <div className="space-y-3">
          {[
            { use: "ボタンの背景に使用", token: "bg/primary" },
            { use: "リンクテキストに使用", token: "text/link" },
            { use: "フォーカス枠に使用", token: "border/focus" },
          ].map((item) => (
            <div key={item.token} className="flex items-center gap-3 rounded-xl p-3" style={{ background: c.glass2, border: c.glassBd }}>
              <div className="w-6 h-6 rounded bg-purple-500 shrink-0" />
              <div className={`text-[12px] ${c.t5} w-20 shrink-0 font-mono`}>#7C3AED</div>
              <div className={`text-[12px] ${c.t3}`}>{item.use}</div>
              <ChevronRight className="w-3 h-3 text-purple-500/50 shrink-0" />
              <Pill color={`bg-purple-500/15 ${d ? "text-purple-300" : "text-purple-600"}`}>{item.token}</Pill>
            </div>
          ))}
        </div>
      </Vis>
      <Tip>色が同じでも、意味が違えば別のトークンにすることで、管理しやすくなる</Tip>
    </div>
  );
}

function TokenAppearanceSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg><strong>Appearance</strong>パネルからLight/Dark modeを切り替えられる</Msg>
      <Points items={["FigmaのVariablesを使ってLight/Dark modeに対応","Semantic Colorを活用することで、テーマ切り替えが簡単に","デザイン時にLight/Darkの両方を確認できる"]} />
      <img
        src={`${import.meta.env.BASE_URL}images/figma-appearance.png`}
        alt="Figma Appearance設定"
        className="rounded-xl"
        style={{
          width: '100%',
          height: 'auto',
          border: `1px solid ${d ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
        }}
      />
      <Tip>Light/Dark両方で見た目を確認しながらデザインすることで、どちらのモードでも快適なUIを作れる</Tip>
    </div>
  );
}

function TokenTypoSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg>タイポグラフィは文字サイズ表ではなく、<strong>情報の優先順位と読みやすさの設計</strong></Msg>
      <Points items={["Display / Heading / Body / Label / Caption の役割で整理する","Body は読ませる文字、Label は操作させる文字","命名は役割ベースで考える","タイポ設計は省略、レイアウト、可読性ともつながる"]} />
      <Vis>
        <Label>タイポグラフィ階層</Label>
        <div className="space-y-4">
          {[
            { role: "Display", desc: "ページの主題", size: "32px", weight: 700, lh: "40px", sample: "見出し大テキスト", color: "border-l-rose-400" },
            { role: "Heading", desc: "セクション区切り", size: "22px", weight: 600, lh: "30px", sample: "セクション見出し", color: "border-l-orange-400" },
            { role: "Body", desc: "読ませる本文", size: "15px", weight: 400, lh: "24px", sample: "本文テキスト。ユーザーが内容を読む部分に使います。", color: "border-l-purple-400" },
            { role: "Label", desc: "操作させるUI文字", size: "14px", weight: 500, lh: "20px", sample: "ボタンラベル・フォームラベル", color: "border-l-violet-400" },
            { role: "Caption", desc: "補足・注釈", size: "12px", weight: 400, lh: "16px", sample: "補足テキスト・タイムスタンプ・ヘルパーテキスト", color: d ? "border-l-gray-600" : "border-l-gray-300" },
          ].map((t) => (
            <div key={t.role} className={`flex items-baseline gap-4 border-l-3 ${t.color} pl-4 py-1`}>
              <div className="w-20 shrink-0">
                <div className={`text-[13px] font-medium ${c.t2}`}>{t.role}</div>
                <div className={`text-[12px] ${c.t5}`}>{t.desc}</div>
              </div>
              <div className="flex-1 min-w-0">
                <span style={{ fontSize: t.size, fontWeight: t.weight, lineHeight: t.lh }} className={d ? "text-gray-100" : "text-gray-800"}>{t.sample}</span>
              </div>
              <div className={`text-[12px] ${c.t5} shrink-0 text-right`}>{t.size} / {t.lh}</div>
            </div>
          ))}
        </div>
      </Vis>
      <div className="grid grid-cols-2 gap-4">
        <Comp label="Body = 読ませる">
          <div className={`text-[14px] ${c.t3} leading-relaxed`}>この機能を使うと、過去の注文履歴から再注文ができます。配送先の変更も可能です。</div>
        </Comp>
        <Comp label="Label = 操作させる">
          <div className="space-y-2">
            <div className="text-white rounded-lg px-4 py-2 text-[14px] text-center font-medium" style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7, #c084fc)" }}>送信する</div>
            <div className={`text-[12px] ${c.t4} font-medium`}>メールアドレス</div>
          </div>
        </Comp>
      </div>
      <Tip>Body と Label の区別がつかないデザインは、ユーザーが「読むべき」か「押すべき」か迷う原因になる</Tip>
    </div>
  );
}

function ResponsiveBasicsSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg>画面サイズが変わっても<strong>意図した見た目を保つ</strong>仕組みを理解する</Msg>
      <Points items={["Auto Layoutは要素同士の関係、Constraintsは親に対する配置","画面サイズに応じてレイアウトを調整する考え方を持つ","PC/Tablet/SPで何を変えて、何を保つかを設計する"]} />

      {/* Constraintsの基本 */}
      <div className="space-y-4">
        <div className={`text-[14px] ${c.t2} font-semibold`}>Constraints（制約）の基本</div>
        <div className={`text-[13px] ${c.t4} leading-relaxed`}>
          Auto Layoutではない通常のFrameでは、子要素の配置を親フレームに対してどう固定するかを設定できます。
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Left & Top */}
          <div
            className="rounded-xl p-4 space-y-3"
            style={{
              background: d ? 'rgba(168,85,247,0.06)' : 'rgba(168,85,247,0.04)',
              border: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
            }}
          >
            <div className="text-[13px] text-purple-400 font-semibold">Left & Top</div>
            <div
              className="w-full h-24 rounded relative"
              style={{
                background: d ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                border: `1px dashed ${c.bd1}`
              }}
            >
              <div className="absolute top-2 left-2 w-8 h-8 rounded bg-purple-500/40" />
            </div>
            <div className={`text-[11px] ${c.t5}`}>左上に固定</div>
          </div>

          {/* Center */}
          <div
            className="rounded-xl p-4 space-y-3"
            style={{
              background: d ? 'rgba(168,85,247,0.06)' : 'rgba(168,85,247,0.04)',
              border: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
            }}
          >
            <div className="text-[13px] text-purple-400 font-semibold">Center</div>
            <div
              className="w-full h-24 rounded relative"
              style={{
                background: d ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                border: `1px dashed ${c.bd1}`
              }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded bg-purple-500/40" />
            </div>
            <div className={`text-[11px] ${c.t5}`}>中央に固定</div>
          </div>

          {/* Scale */}
          <div
            className="rounded-xl p-4 space-y-3"
            style={{
              background: d ? 'rgba(168,85,247,0.06)' : 'rgba(168,85,247,0.04)',
              border: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
            }}
          >
            <div className="text-[13px] text-purple-400 font-semibold">Scale</div>
            <div
              className="w-full h-24 rounded relative"
              style={{
                background: d ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                border: `1px dashed ${c.bd1}`
              }}
            >
              <div className="absolute inset-2 rounded bg-purple-500/40" />
            </div>
            <div className={`text-[11px] ${c.t5}`}>親に合わせて伸縮</div>
          </div>
        </div>

        {/* Constraints実例 */}
        <div className="flex gap-6 mt-6 items-start">
          {/* 元のコンポーネント */}
          <div className="space-y-3 flex-shrink-0">
            <div className={`text-[13px] ${c.t2} font-semibold`}>元のコンポーネント</div>
            <div className="rounded-xl overflow-hidden">
              <img
                src={`${import.meta.env.BASE_URL}images/constraints-component.svg`}
                alt="Constraints元のコンポーネント"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          </div>

          {/* NG例 */}
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2 text-[13px] text-rose-400 font-medium">
              <XCircle className="w-4 h-4" />
              <span>NG例：Constraintsなし</span>
            </div>
            <div
              className="rounded-xl overflow-hidden"
              style={{
                border: `2px solid ${d ? 'rgba(244,63,94,0.2)' : 'rgba(244,63,94,0.15)'}`,
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}images/constraints-ng.svg`}
                alt="ConstraintsNG例"
                className="w-full"
              />
            </div>
          </div>

          {/* OK例 */}
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2 text-[13px] text-emerald-400 font-medium">
              <CheckCircle className="w-4 h-4" />
              <span>OK例：Constraintsあり</span>
            </div>
            <div
              className="rounded-xl overflow-hidden"
              style={{
                border: `2px solid ${d ? 'rgba(16,185,129,0.2)' : 'rgba(16,185,129,0.15)'}`,
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}images/constraints-ok.svg`}
                alt="ConstraintsOK例"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Auto Layout × Constraints */}
      <div className="rounded-xl p-5" style={{ background: c.glass, border: c.glassBd }}>
        <div className={`text-[13px] ${c.t2} font-semibold mb-3`}>使い分けのポイント</div>
        <div className={`text-[13px] ${c.t4} space-y-2`}>
          <div>• <strong>Auto Layout:</strong> リスト・ボタン・カードなど、要素同士の関係を管理</div>
          <div>• <strong>Constraints:</strong> ヘッダー・背景・装飾など、親フレームに対する配置を管理</div>
          <div>• <strong>組み合わせ:</strong> 両方を適切に使うことで、柔軟で壊れにくいデザインになる</div>
        </div>
      </div>

      <Tip>画面サイズが変わったとき、何が伸びて、何が固定されるべきかを考える</Tip>
    </div>
  );
}

function CompRealExampleSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg>実際のボタンシステムで<strong>コンポーネント設計</strong>を理解する</Msg>
      <Points items={["Primary / Secondary / Danger の3つの階層","Default / Hover / Disabled の3つの状態","size（Small / Medium / Large）をVariantsで管理"]} />

      <div
        className="w-full rounded-2xl p-8"
        style={{
          background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
          border: `2px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
          boxShadow: d
            ? '0 8px 32px rgba(168,85,247,0.15), 0 0 0 1px rgba(168,85,247,0.1) inset'
            : '0 8px 32px rgba(168,85,247,0.12), 0 0 0 1px rgba(255,255,255,0.6) inset'
        }}
      >
        <div className="space-y-8">
          {/* Primary Buttons */}
          <div>
            <div className="text-[13px] text-purple-400 mb-4 font-semibold">Primary（主要アクション）</div>
            <div className="flex items-center gap-4">
              <div
                className="px-6 py-2.5 rounded-lg text-white text-[14px] font-medium cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                  boxShadow: '0 4px 12px rgba(168,85,247,0.4)'
                }}
              >
                保存する
              </div>
              <div
                className="px-6 py-2.5 rounded-lg text-white text-[14px] font-medium cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #6d28d9, #7c3aed)',
                  boxShadow: '0 4px 12px rgba(168,85,247,0.5)'
                }}
              >
                保存する（Hover）
              </div>
              <div
                className={`px-6 py-2.5 rounded-lg text-[14px] font-medium ${c.b2} ${c.t5}`}
              >
                保存する（Disabled）
              </div>
            </div>
          </div>

          {/* Secondary Buttons */}
          <div>
            <div className={`text-[13px] ${d ? 'text-blue-400' : 'text-blue-600'} mb-4 font-semibold`}>Secondary（補助アクション）</div>
            <div className="flex items-center gap-4">
              <div
                className={`px-6 py-2.5 rounded-lg text-[14px] font-medium cursor-pointer`}
                style={{
                  background: d ? 'rgba(168,85,247,0.12)' : 'rgba(168,85,247,0.08)',
                  border: `1px solid ${d ? 'rgba(168,85,247,0.3)' : 'rgba(168,85,247,0.2)'}`,
                  color: d ? '#c4b5fd' : '#7c3aed'
                }}
              >
                キャンセル
              </div>
              <div
                className={`px-6 py-2.5 rounded-lg text-[14px] font-medium cursor-pointer`}
                style={{
                  background: d ? 'rgba(168,85,247,0.18)' : 'rgba(168,85,247,0.12)',
                  border: `1px solid ${d ? 'rgba(168,85,247,0.4)' : 'rgba(168,85,247,0.3)'}`,
                  color: d ? '#c4b5fd' : '#7c3aed'
                }}
              >
                キャンセル（Hover）
              </div>
              <div
                className={`px-6 py-2.5 rounded-lg text-[14px] font-medium ${c.b2} ${c.t5} border ${c.bd2}`}
              >
                キャンセル（Disabled）
              </div>
            </div>
          </div>

          {/* Danger Buttons */}
          <div>
            <div className="text-[13px] text-rose-400 mb-4 font-semibold">Danger（破壊的アクション）</div>
            <div className="flex items-center gap-4">
              <div
                className="px-6 py-2.5 rounded-lg text-white text-[14px] font-medium cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #dc2626, #ef4444)',
                  boxShadow: '0 4px 12px rgba(220,38,38,0.4)'
                }}
              >
                削除する
              </div>
              <div
                className="px-6 py-2.5 rounded-lg text-white text-[14px] font-medium cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #b91c1c, #dc2626)',
                  boxShadow: '0 4px 12px rgba(220,38,38,0.5)'
                }}
              >
                削除する（Hover）
              </div>
              <div
                className={`px-6 py-2.5 rounded-lg text-[14px] font-medium ${c.b2} ${c.t5}`}
              >
                削除する（Disabled）
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 mt-8">
        <div className="rounded-xl p-6" style={{ background: d ? 'rgba(239,67,68,0.08)' : 'rgba(239,67,68,0.04)', border: `1px solid ${d ? 'rgba(239,67,68,0.25)' : 'rgba(239,67,68,0.18)'}` }}>
          <div className="text-[13px] text-red-500 font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            やりがちな失敗
          </div>
          <div className={`text-[14px] ${c.t4} space-y-2`}>
            <div>• Primary と Secondary の使い分けがない（全部同じ見た目）</div>
            <div>• Hover や Disabled 状態を設計していない</div>
            <div>• サイズバリエーションを個別コンポーネントで作ってしまう</div>
          </div>
        </div>

        <div className="rounded-xl p-6" style={{ background: d ? 'rgba(16,185,129,0.12)' : 'rgba(16,185,129,0.06)', border: `2px solid ${d ? 'rgba(16,185,129,0.3)' : 'rgba(16,185,129,0.2)'}` }}>
          <div className="text-[13px] text-emerald-400 font-semibold mb-3 flex items-center gap-2">
            <span>✓</span>
            おすすめのやり方
          </div>
          <div className={`text-[14px] ${c.t4} space-y-2`}>
            <div>• 階層（Primary/Secondary/Tertiary）で役割を明確に</div>
            <div>• 全ての状態（Hover/Active/Disabled）を設計する</div>
            <div>• Variantsで統一的にサイズ管理する</div>
          </div>
        </div>
      </div>

      {/* LY Design System Example */}
      <div>
        <div className={`text-[16px] ${c.t2} font-semibold mb-3 mt-10`}>
          LYでのDesign Systemの一例
        </div>
        <div className={`text-[14px] ${c.t4} mb-3 leading-relaxed`}>
          実際のプロジェクトでは、Priority（優先度）、Size（サイズ）、State（状態）、Icon only（アイコンのみ）といった複数のプロパティを組み合わせてボタンシステムを構築しています。各状態に対して一貫したビジュアルフィードバックを提供することで、ユーザー体験の質を向上させています。
        </div>
        <div className="w-full rounded-2xl overflow-hidden relative">
          <ExpandableImage
            src={`${import.meta.env.BASE_URL}images/button実例.svg`}
            alt="LYでのDesign Systemの一例"
          />
        </div>

        {/* Figmaリンク */}
        <div className="mt-4">
          <a
            href="https://www.figma.com/design/bNkniCx4HN8WFfBudDeMcf/Agent-i-Design-System?node-id=22454-41805&t=vPv4Y7woITFJhde9-4"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all"
            style={{
              background: d ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.06)',
              border: `1px solid ${d ? 'rgba(59,130,246,0.25)' : 'rgba(59,130,246,0.15)'}`,
              color: d ? '#93c5fd' : '#2563eb',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = d ? 'rgba(59,130,246,0.15)' : 'rgba(59,130,246,0.1)';
              e.currentTarget.style.borderColor = d ? 'rgba(59,130,246,0.35)' : 'rgba(59,130,246,0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = d ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.06)';
              e.currentTarget.style.borderColor = d ? 'rgba(59,130,246,0.25)' : 'rgba(59,130,246,0.15)';
            }}
          >
            <Link2 className="w-3.5 h-3.5" />
            実際のFigmaコンポーネント
          </a>
        </div>
      </div>

      <Tip>ボタンは「色」ではなく「階層」と「状態」で設計する</Tip>
    </div>
  );
}

function VarRealExampleSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg>実際のカラーシステムで<strong>Variablesの価値</strong>を体感する</Msg>
      <Points items={["Primitive（生の値）→ Semantic（意味のある名前）の2層構造","Primary / Success / Warning / Error の4つのセマンティックカラー","Light / Dark モードに対応"]} />

      <div className="space-y-4">
        <div className="w-full rounded-2xl overflow-hidden relative">
          <div className="relative" style={{ height: '550px', overflow: 'hidden' }}>
            <img
              src={`${import.meta.env.BASE_URL}images/color-system-example.png`}
              alt="カラーシステムの例"
              className="w-full"
            />
            {/* グラデーションオーバーレイ */}
            <div
              className="absolute bottom-0 left-0 right-0 h-32"
              style={{
                background: d
                  ? 'linear-gradient(to bottom, transparent, #262335 90%)'
                  : 'linear-gradient(to bottom, transparent, #FDFDFD 90%)'
              }}
            />
          </div>
          {/* 省略表現 */}
          <div className="text-center py-2">
            <div className={`text-[14px] ${c.t4} font-medium`}>...</div>
            <div className={`text-[12px] ${c.t5} mt-1`}>続きはFigmaで確認できます</div>
          </div>
        </div>

        {/* Figmaリンク */}
        <div className="flex justify-center">
          <a
            href="https://www.figma.com/design/bNkniCx4HN8WFfBudDeMcf/Agent-i-Design-System?node-id=20604-11435&t=vPv4Y7woITFJhde9-4"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all"
            style={{
              background: d ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.06)',
              border: `1px solid ${d ? 'rgba(59,130,246,0.25)' : 'rgba(59,130,246,0.15)'}`,
              color: d ? '#93c5fd' : '#2563eb',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = d ? 'rgba(59,130,246,0.15)' : 'rgba(59,130,246,0.1)';
              e.currentTarget.style.borderColor = d ? 'rgba(59,130,246,0.35)' : 'rgba(59,130,246,0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = d ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.06)';
              e.currentTarget.style.borderColor = d ? 'rgba(59,130,246,0.25)' : 'rgba(59,130,246,0.15)';
            }}
          >
            <Link2 className="w-3.5 h-3.5" />
            実際のFigmaコンポーネント
          </a>
        </div>
      </div>

      <div className="space-y-4 mt-8">
        <div className="rounded-xl p-6" style={{ background: d ? 'rgba(239,67,68,0.08)' : 'rgba(239,67,68,0.04)', border: `1px solid ${d ? 'rgba(239,67,68,0.25)' : 'rgba(239,67,68,0.18)'}` }}>
          <div className="text-[13px] text-red-500 font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            やりがちな失敗
          </div>
          <div className={`text-[14px] ${c.t4} space-y-2`}>
            <div>• HEXコードを直接使ってしまう（#7c3aed をベタ書き）</div>
            <div>• 色名でトークン化してしまう（button-purple, text-blue など）</div>
            <div>• 全ての色にトークンを作ってしまう（管理コストが増大）</div>
          </div>
        </div>

        <div className="rounded-xl p-6" style={{ background: d ? 'rgba(16,185,129,0.12)' : 'rgba(16,185,129,0.06)', border: `2px solid ${d ? 'rgba(16,185,129,0.3)' : 'rgba(16,185,129,0.2)'}` }}>
          <div className="text-[13px] text-emerald-400 font-semibold mb-3 flex items-center gap-2">
            <span>✓</span>
            おすすめのやり方
          </div>
          <div className={`text-[14px] ${c.t4} space-y-2`}>
            <div>• トークンを使って一元管理する</div>
            <div>• 役割ベースの名前をつける（primary/success/warning など）</div>
            <div>• 本当に必要なトークンだけに絞る</div>
          </div>
        </div>
      </div>

      <Tip>色は「purple」「blue」ではなく、「primary」「success」で管理する</Tip>
    </div>
  );
}

function OthersDsSlide() {
  const theme = useTheme();
  const c = tc(theme);
  return (
    <div className="space-y-10">
      <Msg>デザインシステムは色とコンポーネントだけではない</Msg>
      <Vis>
        <div className="grid grid-cols-2 gap-5">
          <div className="rounded-xl p-4" style={{ background: c.glass2, border: c.glassBd }}>
            <div className={`text-[14px] font-medium ${c.t2} mb-1`}>アイコン</div>
            <div className={`text-[14px] ${c.t4} mb-3`}>= 意味の辞書</div>
            <div className="flex gap-2.5">
              {[Search,Star,Users,Target,Component,Palette].map((Icon, i) => (
                <div key={i} className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(168,85,247,0.08)" }}>
                  <Icon className="w-4 h-4 text-purple-400" />
                </div>
              ))}
            </div>
            <div className={`text-[12px] ${c.t5} mt-2`}>サイズ・線幅・メタファーを統一</div>
          </div>
          <div className="rounded-xl p-4" style={{ background: c.glass2, border: c.glassBd }}>
            <div className={`text-[14px] font-medium ${c.t2} mb-1`}>エレベーション</div>
            <div className={`text-[14px] ${c.t4} mb-3`}>= レイヤーの優先順位</div>
            <div className="flex gap-3">
              {[
                { l: "0", s: "none" },
                { l: "1", s: "0 1px 3px rgba(0,0,0,0.3)" },
                { l: "2", s: "0 4px 8px rgba(0,0,0,0.4)" },
                { l: "3", s: "0 12px 24px rgba(0,0,0,0.5)" },
              ].map((e) => (
                <div key={e.l} className={`w-14 h-14 rounded-xl flex items-center justify-center text-[12px] ${c.t4}`} style={{ boxShadow: e.s, background: c.glass3 }}>Lv.{e.l}</div>
              ))}
            </div>
          </div>
          <div className="rounded-xl p-4" style={{ background: c.glass2, border: c.glassBd }}>
            <div className={`text-[14px] font-medium ${c.t2} mb-1`}>角の半径</div>
            <div className={`text-[14px] ${c.t4} mb-3`}>= ブランドらしさと一貫性</div>
            <div className="flex gap-3 items-end">
              {[{r:"0",label:"none"},{r:"4px",label:"sm"},{r:"8px",label:"md"},{r:"16px",label:"lg"},{r:"999px",label:"full"}].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="w-11 h-11 bg-purple-500/20 mx-auto" style={{ borderRadius: item.r }} />
                  <div className={`text-[12px] ${c.t5} mt-1`}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl p-4" style={{ background: c.glass2, border: c.glassBd }}>
            <div className={`text-[14px] font-medium ${c.t2} mb-1`}>スペーシング</div>
            <div className={`text-[14px] ${c.t4} mb-3`}>= レイアウトのリズム</div>
            <div className="space-y-2">
              {[{label:"4",w:16},{label:"8",w:32},{label:"16",w:64},{label:"24",w:96},{label:"32",w:128}].map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <div className={`w-6 text-[12px] ${c.t5} text-right`}>{s.label}</div>
                  <div className="bg-purple-500/25 h-3 rounded-full" style={{ width: s.w }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Vis>
      <Points items={["アイコン = 意味の辞書。使う場所のルールも一緒に決める","エレベーション = 重なりの優先度。モーダル > カード > ベース","角の半径 = ブランドのトーン。丸い = 柔らかい、角ばった = シャープ","スペーシング = 4の倍数で統一し、リズムを作る"]} />
    </div>
  );
}

function SummarySlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-8">
      <Msg>Figmaの機能は、見た目を作るためではなく、<strong>運用できる構造を作る</strong>ために使う</Msg>
      <Vis className="py-6">
        <div className="space-y-3 max-w-md mx-auto">
          {[
            { icon: <Layers className="w-4 h-4" />, label: "Auto Layout", sub: "関係性を設計する" },
            { icon: <Component className="w-4 h-4" />, label: "Component", sub: "判断を再利用する" },
            { icon: <Variable className="w-4 h-4" />, label: "Variable", sub: "値を再利用する" },
            { icon: <Library className="w-4 h-4" />, label: "Library", sub: "チームで共有する" },
            { icon: <Paintbrush className="w-4 h-4" />, label: "Design Token", sub: "意味で名前をつける" },
          ].map((item) => (
            <div key={item.label} className={`rounded-xl px-5 py-3 flex items-center gap-4 ${d ? "text-purple-200" : "text-purple-700"}`} style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.15)" }}>
              <div className="shrink-0">{item.icon}</div>
              <div>
                <div className="text-[14px] font-medium">{item.label}</div>
                <div className="text-[12px] opacity-60">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </Vis>
      {/* カード風 + グラデーション背景 */}
      <div className="relative rounded-3xl p-1" style={{ background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)" }}>
        {/* 外側のグロー */}
        <div className="absolute inset-0 rounded-3xl blur-xl opacity-20" style={{ background: "linear-gradient(135deg, #7c3aed, #c084fc)" }} />

        {/* 内側のカード */}
        <div
          className="relative rounded-3xl px-8 py-8 text-center"
          style={{
            background: d
              ? "linear-gradient(135deg, rgba(17,24,39,0.95) 0%, rgba(31,41,55,0.95) 100%)"
              : "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(249,250,251,0.98) 100%)",
            boxShadow: d
              ? "0 20px 60px rgba(124,58,237,0.3), inset 0 1px 0 rgba(255,255,255,0.05)"
              : "0 20px 60px rgba(124,58,237,0.15), inset 0 1px 0 rgba(255,255,255,0.8)"
          }}
        >
          <div className={`text-[17px] leading-relaxed max-w-lg mx-auto ${d ? 'text-gray-100' : 'text-gray-900'}`}>
            「きれいに作れること」より<br />
            <strong className={`text-[19px] ${d ? 'text-purple-300' : 'text-purple-700'}`}>
              「変更・共有・運用に耐えられること」
            </strong><br />
            が、実務では強いデザイン
          </div>
        </div>
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════
   Practice Slides - Figma研修 基本課題
══════════════════════════════════════════════════════════ */

// 1. タイトル・目的・身につけたいこと
function PracticeIntroSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <Smartphone className="w-10 h-10 text-purple-400" />
          </div>
          <h2 className={`text-[28px] ${c.t1} leading-tight`} style={{ fontWeight: 800 }}>
            モバイルオーダーUI<br />コンポーネント作成
          </h2>
        </div>
        <p className={`text-[13px] ${c.t4}`}>Auto Layout / Component / Instance / State を手を動かして理解する</p>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-10">
        <Vis className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-purple-400" />
            <div className={`text-[16px] ${c.t1} font-bold`}>この課題の目的</div>
          </div>
          <div className={`text-[14px] ${c.t2} leading-relaxed mb-4`}>
            この課題は、<strong>完成度の高いUIを作ることが目的ではなく</strong>、手を動かしながら Figma の構造的な考え方に触れることが目的です
          </div>
          <ul className="space-y-2">
            <Point>Auto Layout に触れる</Point>
            <Point>コンポーネントとインスタンスを使う</Point>
            <Point>状態差分を整理する</Point>
            <Point>今後の業務につなげる</Point>
          </ul>
        </Vis>

        <Vis className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <div className={`text-[16px] ${c.t1} font-bold`}>身につけたいこと</div>
          </div>
          <ul className="space-y-2.5">
            <Point>繰り返し要素を整理する</Point>
            <Point>状態違いを別物として増やしすぎない</Point>
            <Point>テキスト量が変わっても崩れない構造を作る</Point>
            <Point>一覧と詳細で情報の優先順位を意識する</Point>
          </ul>
        </Vis>
      </div>
    </div>
  );
}

// 2. 課題テーマ・進め方・画面構成
function PracticeOverviewSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";

  return (
    <div className="space-y-8">
      <Vis className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Box className="w-5 h-5 text-purple-400" />
          <div className={`text-[16px] ${c.t1} font-bold`}>課題テーマ</div>
        </div>
        <div className={`text-[15px] ${c.t1} font-bold mb-2`}>モバイルオーダーUIのコンポーネント作成</div>
        <div className={`text-[14px] ${c.t3} leading-relaxed mb-3`}>
          実在サービスの完全再現ではなく、モバイルオーダーにありがちな画面や状態を題材に、UIコンポーネントを整理しながら作る
        </div>
        {/* Agent i Design System Semantic Color: Background/Notice-Info */}
        <div
          className="rounded-xl p-3"
          style={{
            background: d ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.06)',
            border: `1px solid ${d ? 'rgba(59,130,246,0.2)' : 'rgba(59,130,246,0.15)'}`
          }}
        >
          <div className={`text-[13px] ${c.t2} leading-relaxed space-y-1.5`}>
            <div><strong>テーマは自由</strong>（ハンバーガーショップ、カフェ、ベーカリー）</div>
            <div>商品名や価格のダミーデータは<strong>AIを活用</strong>して用意してみましょう！</div>
          </div>
        </div>
      </Vis>

      <div className="grid grid-cols-2 gap-8">
        <Vis className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-purple-400" />
            <div className={`text-[16px] ${c.t1} font-bold`}>進め方</div>
          </div>
          <ul className="space-y-2.5">
            <Point>質問があれば、<strong>Slack</strong>で気軽に声をかけてください🙌</Point>
            <Point><strong>Figmaコメント</strong>での質問や相談も大歓迎です✨</Point>
            <Point>Figmaを巡回しながらフィードバックしていきます👀💬</Point>
            <Point>構造を見るためにレイヤーを直接触ったりもするので触ってもOKなページ、まだ編集中のページが分かるように<strong>ステータスを使ってもらえると助かります</strong>！</Point>
          </ul>
          <div className="mt-4 space-y-3">
            <img
              src={`${import.meta.env.BASE_URL}images/figma-status.png`}
              alt="Figmaステータスの使い方"
              className="rounded-xl"
              style={{
                width: '100%',
                maxWidth: '500px',
                height: 'auto',
                border: `1px solid ${d ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              }}
            />
            <div className={`text-[13px] ${c.t3}`}>
              Figmaにステータスコンポーネントを用意したのでよければ使ってください！使わなくてもステータス分かればなんでもOKです◎
            </div>
            <a
              href="https://www.figma.com/design/Lzxkw6F9BxPWo8DoTEU5Ul/%E6%96%B0%E5%8D%92%E3%83%87%E3%82%B6%E3%82%A4%E3%83%8A%E3%83%BC%E7%A0%94%E4%BF%AE_Day1-5-1-?node-id=4025-113&t=5wwuypRuuweHMgLO-4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all"
              style={{
                background: d ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.06)',
                border: `1px solid ${d ? 'rgba(59,130,246,0.25)' : 'rgba(59,130,246,0.15)'}`,
                color: d ? '#93c5fd' : '#2563eb',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = d ? 'rgba(59,130,246,0.15)' : 'rgba(59,130,246,0.1)';
                e.currentTarget.style.borderColor = d ? 'rgba(59,130,246,0.35)' : 'rgba(59,130,246,0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = d ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.06)';
                e.currentTarget.style.borderColor = d ? 'rgba(59,130,246,0.25)' : 'rgba(59,130,246,0.15)';
              }}
            >
              🔗ステータスコンポーネント
            </a>
          </div>
        </Vis>

        <Vis className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <LayoutGrid className="w-5 h-5 text-purple-400" />
            <div className={`text-[16px] ${c.t1} font-bold`}>画面構成</div>
          </div>
          <div className="space-y-4">
            <div
              className="rounded-xl p-4"
              style={{
                background: d ? 'rgba(168,85,247,0.08)' : 'rgba(168,85,247,0.06)',
                border: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <div className={`text-[13px] ${c.t1} font-bold`}>必須画面</div>
              </div>
              <ul className="space-y-1.5">
                <Point>商品一覧</Point>
                <Point>商品詳細</Point>
              </ul>
            </div>
            <div
              className="rounded-xl p-4"
              style={{
                background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.03)',
                border: `1px solid ${d ? 'rgba(168,85,247,0.15)' : 'rgba(168,85,247,0.1)'}`
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Plus className="w-4 h-4 text-purple-400" />
                <div className={`text-[13px] ${c.t1} font-bold`}>余力があれば</div>
              </div>
              <ul className="space-y-1.5">
                <Point>店舗選択</Point>
                <Point>カート</Point>
                <Point>受け取り</Point>
              </ul>
            </div>
          </div>
        </Vis>
      </div>

      {/* Agent i Design System section */}
      <Vis className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Palette className="w-5 h-5 text-purple-400" />
          <div className={`text-[16px] ${c.t1} font-bold`}>Agent i Design System</div>
        </div>
        <div className={`text-[14px] ${c.t3} leading-relaxed mb-4`}>
          以下のAssetを追加して、Semanticカラーを使ってデザインしてみましょう！
        </div>
        <div className="space-y-6">
          <div>
            <div className={`text-[13px] ${c.t2} font-semibold mb-3`}>① Assetを追加</div>
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
                border: `2px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                boxShadow: d
                  ? '0 8px 32px rgba(168,85,247,0.15), 0 0 0 1px rgba(168,85,247,0.1) inset'
                  : '0 8px 32px rgba(168,85,247,0.12), 0 0 0 1px rgba(255,255,255,0.6) inset'
              }}
            >
              <ExpandableVideo src={`${import.meta.env.BASE_URL}images/agent-i-add-asset.mov`} />
            </div>
          </div>
          <div>
            <div className={`text-[13px] ${c.t2} font-semibold mb-3`}>② カラーの使い方</div>
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
                border: `2px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                boxShadow: d
                  ? '0 8px 32px rgba(168,85,247,0.15), 0 0 0 1px rgba(168,85,247,0.1) inset'
                  : '0 8px 32px rgba(168,85,247,0.12), 0 0 0 1px rgba(255,255,255,0.6) inset'
              }}
            >
              <ExpandableVideo src={`${import.meta.env.BASE_URL}images/agent-i-color-usage.mov`} />
            </div>
          </div>
        </div>
        <div className={`text-[14px] ${c.t3} leading-relaxed mt-6 mb-4`}>
          コンテンツ間のマージンや角丸もVariablesを使ってみましょう！
        </div>
        <div className="space-y-6">
          <div>
            <div className={`text-[13px] ${c.t2} font-semibold mb-3`}>③ スペーシング</div>
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
                border: `2px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                boxShadow: d
                  ? '0 8px 32px rgba(168,85,247,0.15), 0 0 0 1px rgba(168,85,247,0.1) inset'
                  : '0 8px 32px rgba(168,85,247,0.12), 0 0 0 1px rgba(255,255,255,0.6) inset'
              }}
            >
              <ExpandableVideo src={`${import.meta.env.BASE_URL}images/agent-i-spacing.mov`} />
            </div>
          </div>
          <div>
            <div className={`text-[13px] ${c.t2} font-semibold mb-3`}>④ 角丸（Border Radius）</div>
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
                border: `2px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                boxShadow: d
                  ? '0 8px 32px rgba(168,85,247,0.15), 0 0 0 1px rgba(168,85,247,0.1) inset'
                  : '0 8px 32px rgba(168,85,247,0.12), 0 0 0 1px rgba(255,255,255,0.6) inset'
              }}
            >
              <ExpandableVideo src={`${import.meta.env.BASE_URL}images/agent-i-radius.mov`} />
            </div>
          </div>
        </div>
      </Vis>
    </div>
  );
}

// 3. 商品一覧 & 商品詳細（統合）
function PracticeRequiredScreensSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";

  return (
    <div className="space-y-14">
      {/* 商品一覧 */}
      <div className="space-y-4">
        <div className={`text-[16px] ${c.t1} font-bold`}>① 商品一覧</div>
        <div className="flex gap-12 items-start">
          <div className="shrink-0">
            <div className={`w-[260px] h-[520px] ${d ? "bg-gray-900/60" : "bg-white"} rounded-3xl overflow-hidden p-7`} style={{ border: `2px solid ${d ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`, boxShadow: d ? "0 8px 24px rgba(0,0,0,0.5)" : "0 8px 24px rgba(0,0,0,0.08)" }}>
              <div className={`h-5 w-28 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded mb-4`}></div>
              <div className={`h-10 ${d ? "bg-gray-800/60" : "bg-gray-100"} rounded-xl mb-5`}></div>
              <div className="flex gap-2 mb-5">
                <div className={`h-8 w-18 ${d ? "bg-gray-700" : "bg-gray-300"} rounded-full`}></div>
                <div className={`h-8 w-18 ${d ? "bg-gray-800/40" : "bg-gray-100"} rounded-full`}></div>
                <div className={`h-8 w-14 ${d ? "bg-gray-800/40" : "bg-gray-100"} rounded-full`}></div>
              </div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`${d ? "bg-gray-800/40" : "bg-gray-50"} rounded-2xl p-3`}>
                    <div className="flex gap-2.5">
                      <div className={`w-14 h-14 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded-xl shrink-0`}></div>
                      <div className="flex-1 space-y-1.5">
                        <div className={`h-3.5 w-20 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded`}></div>
                        <div className={`h-2.5 w-16 ${d ? "bg-gray-800/40" : "bg-gray-100"} rounded`}></div>
                        <div className="flex items-center justify-between">
                          <div className={`h-2.5 w-12 ${d ? "bg-gray-800/40" : "bg-gray-100"} rounded`}></div>
                          <div className={`h-3.5 w-14 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded`}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
          <Vis className="space-y-3">
            <div className="flex items-center gap-2">
              <Box className="w-4 h-4 text-purple-400" />
              <div className={`text-[14px] ${c.t1} font-semibold`}>作る想定のUIエレメント</div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              <Point>商品カテゴリの切り替えタブ</Point>
              <Point>商品カード</Point>
              <Point>価格表示</Point>
              <Point>状態ラベル / バッジ</Point>
            </div>
          </Vis>
          <Vis className="space-y-3">
            <div className="flex items-center gap-2">
              <ToggleLeft className="w-4 h-4 text-purple-400" />
              <div className={`text-[14px] ${c.t1} font-semibold`}>やってほしいこと</div>
            </div>
            <ul className="space-y-1.5">
              <Point>商品カード：未選択 / 選択中 の2つのパターンを作る</Point>
              <Point>商品ラベル：通常 / おすすめ / 売り切れ の3つのパターンを作る</Point>
              <Point>商品が増えても減っても崩れないカードとリストを作る</Point>
            </ul>
          </Vis>
          <Vis className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <div className={`text-[14px] ${c.t1} font-semibold`}>意識してほしいこと</div>
            </div>
            <ul className="space-y-1.5">
              <Point><strong>できるだけ少ないコンポーネント</strong>で状態違いを整理</Point>
              <Point>商品カードを<strong>インスタンス化</strong>して使う</Point>
              <Point><strong>Auto Layout</strong> で崩れないレイアウト設計</Point>
            </ul>
          </Vis>
        </div>
      </div>
      </div>

      {/* 商品詳細 */}
      <div className="space-y-4">
        <div className={`text-[16px] ${c.t1} font-bold`}>② 商品詳細</div>
        <div className="flex gap-12 items-start">
          <div className="shrink-0">
            <div className={`w-[260px] h-[520px] ${d ? "bg-gray-900/60" : "bg-white"} rounded-3xl overflow-hidden p-7`} style={{ border: `2px solid ${d ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`, boxShadow: d ? "0 8px 24px rgba(0,0,0,0.5)" : "0 8px 24px rgba(0,0,0,0.08)" }}>
              <div className={`w-full h-32 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded-2xl mb-5`}></div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className={`h-4 w-28 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded mb-2`}></div>
                  <div className={`h-2.5 w-20 ${d ? "bg-gray-800/60" : "bg-gray-100"} rounded`}></div>
                </div>
                <div className={`h-4 w-12 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded-full`}></div>
              </div>
              <div className={`h-2.5 w-full ${d ? "bg-gray-800/60" : "bg-gray-100"} rounded mb-1`}></div>
              <div className={`h-2.5 w-4/5 ${d ? "bg-gray-800/60" : "bg-gray-100"} rounded mb-4`}></div>
              <div className={`${d ? "bg-gray-800/40" : "bg-gray-50"} rounded-2xl p-3 mb-4`}>
                <div className="flex items-center justify-between">
                  <div className={`h-2.5 w-14 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded`}></div>
                  <div className={`h-5 w-16 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded`}></div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className={`h-8 ${d ? "bg-gray-700" : "bg-gray-300"} rounded-xl`}></div>
                <div className={`h-8 ${d ? "bg-gray-800/40" : "bg-gray-100"} rounded-xl`}></div>
                <div className={`h-8 ${d ? "bg-gray-800/40" : "bg-gray-100"} rounded-xl`}></div>
              </div>
              <div className={`h-10 ${d ? "bg-gray-700" : "bg-gray-300"} rounded-2xl`}></div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
          <Vis className="space-y-3">
            <div className="flex items-center gap-2">
              <Box className="w-4 h-4 text-purple-400" />
              <div className={`text-[14px] ${c.t1} font-semibold`}>作る想定のUIエレメント</div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              <Point>商品画像</Point>
              <Point>商品名・説明</Point>
              <Point>価格表示</Point>
              <Point>オプション選択</Point>
              <Point>追加ボタン</Point>
              <Point>期間限定ラベル</Point>
            </div>
          </Vis>
          <Vis className="space-y-3">
            <div className="flex items-center gap-2">
              <ToggleLeft className="w-4 h-4 text-purple-400" />
              <div className={`text-[14px] ${c.t1} font-semibold`}>やってほしいこと</div>
            </div>
            <ul className="space-y-1.5">
              <Point>追加ボタン：押せる状態 / 押せない状態 の2つのパターンを作る</Point>
              <Point>オプション選択：未選択 / 選択中 の2つのパターンを作る</Point>
              <Point>期間限定ラベル：表示 / 非表示 を切り替えられるようにする</Point>
              <Point>長い説明文は2行で切って「...」で省略表示する</Point>
            </ul>
          </Vis>
          <Vis className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <div className={`text-[14px] ${c.t1} font-semibold`}>意識してほしいこと</div>
            </div>
            <ul className="space-y-1.5">
              <Point>商品情報の量が変わっても<strong>崩れない Auto Layout</strong></Point>
              <Point>状態に応じた<strong>CTA の見せ分け</strong></Point>
              <Point>補足情報を含めた<strong>情報の優先順位整理</strong></Point>
            </ul>
          </Vis>
        </div>
      </div>
      </div>
    </div>
  );
}

// 4. 追加課題の見どころ
function PracticeAdditionalSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";

  return (
    <div className="space-y-6">
      {/* Info banner */}
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl`} style={{
        background: d ? "rgba(168,85,247,0.08)" : "rgba(168,85,247,0.06)",
        border: `1px solid ${d ? "rgba(168,85,247,0.2)" : "rgba(168,85,247,0.15)"}`
      }}>
        <AlertTriangle className={`w-5 h-5 shrink-0 ${d ? "text-purple-300" : "text-purple-600"}`} />
        <div className={`text-[13px] ${d ? "text-purple-200" : "text-purple-700"} leading-relaxed`}>
          これらは必須ではありません。手が空いた人用の追加課題です！
        </div>
      </div>

      <div className="flex gap-12 items-start">
        {/* Mobile mockup illustration */}
        <div className="shrink-0">
          <div className={`w-[260px] h-[520px] ${d ? "bg-gray-900/60" : "bg-white"} rounded-3xl overflow-hidden p-7`} style={{ border: `2px solid ${d ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`, boxShadow: d ? "0 8px 24px rgba(0,0,0,0.5)" : "0 8px 24px rgba(0,0,0,0.08)" }}>
            <div className={`h-6 w-20 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded mb-6`}></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`${d ? "bg-gray-800/40" : "bg-gray-50"} rounded-2xl p-4`}>
                  <div className="flex gap-3 mb-3">
                    <div className={`w-12 h-12 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded-xl shrink-0`}></div>
                    <div className="flex-1 space-y-2">
                      <div className={`h-4 w-24 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded`}></div>
                      <div className={`h-3 w-16 ${d ? "bg-gray-800/40" : "bg-gray-100"} rounded`}></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 ${d ? "bg-gray-800/60" : "bg-gray-100"} rounded`}></div>
                      <div className={`h-3 w-4 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded`}></div>
                      <div className={`w-6 h-6 ${d ? "bg-gray-800/60" : "bg-gray-100"} rounded`}></div>
                    </div>
                    <div className={`h-4 w-12 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded`}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className={`h-12 ${d ? "bg-gray-700" : "bg-gray-300"} rounded-2xl mt-5`}></div>
          </div>
        </div>

      {/* Content */}
      <div className="flex-1 space-y-5">
        <Vis className="space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-purple-400" />
            <div className={`text-[15px] ${c.t1} font-bold`}>店舗選択</div>
          </div>
          <div className={`text-[13px] ${c.t3} leading-relaxed mb-2`}>
            店舗カードの通常 / 選択中 / 無効状態
          </div>
          <div className="pl-3 border-l-2" style={{ borderColor: d ? "rgba(168,85,247,0.2)" : "rgba(168,85,247,0.15)" }}>
            <div className={`text-[12px] ${c.t1} font-semibold mb-1.5`}>やってほしいこと</div>
            <ul className="space-y-1">
              <li className={`text-[12px] ${c.t3}`}>• 店舗カード：通常 / 選択中 / 無効 の3つのパターンを作る</li>
              <li className={`text-[12px] ${c.t3}`}>• 距離や営業時間のテキストが変わっても崩れないレイアウト</li>
              <li className={`text-[12px] ${c.t3}`}>• 使えない店舗は色を薄くして押せないことが見た目でわかるように</li>
            </ul>
          </div>
        </Vis>

        <Vis className="space-y-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-400" />
            <div className={`text-[15px] ${c.t1} font-bold`}>カート</div>
          </div>
          <div className={`text-[13px] ${c.t3} leading-relaxed mb-2`}>
            商品行の繰り返し、数量違い、オプション付き商品の表示
          </div>
          <div className="pl-3 border-l-2" style={{ borderColor: d ? "rgba(168,85,247,0.2)" : "rgba(168,85,247,0.15)" }}>
            <div className={`text-[12px] ${c.t1} font-semibold mb-1.5`}>やってほしいこと</div>
            <ul className="space-y-1">
              <li className={`text-[12px] ${c.t3}`}>• 商品行：オプション情報の表示 / 非表示</li>
              <li className={`text-[12px] ${c.t3}`}>• 商品を何個でも追加できる繰り返しの構造</li>
              <li className={`text-[12px] ${c.t3}`}>• 商品が増えても減っても崩れないリストの作り方</li>
            </ul>
          </div>
        </Vis>

        <Vis className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-purple-400" />
            <div className={`text-[15px] ${c.t1} font-bold`}>受け取り</div>
          </div>
          <div className={`text-[13px] ${c.t3} leading-relaxed mb-2`}>
            注文ステータスの見せ分け、重要情報の優先順位、状態差分の整理
          </div>
          <div className="pl-3 border-l-2" style={{ borderColor: d ? "rgba(168,85,247,0.2)" : "rgba(168,85,247,0.15)" }}>
            <div className={`text-[12px] ${c.t1} font-semibold mb-1.5`}>やってほしいこと</div>
            <ul className="space-y-1">
              <li className={`text-[12px] ${c.t3}`}>• 注文カード：準備中 / 受取可能 / 完了 の3つのパターンを作る</li>
              <li className={`text-[12px] ${c.t3}`}>• 状態によってボタンを表示 / 非表示にする</li>
              <li className={`text-[12px] ${c.t3}`}>• 注文番号とステータスをどう目立たせるか考える</li>
            </ul>
          </div>
        </Vis>
      </div>
      </div>
    </div>
  );
}

// 6. 完成イメージ・最後に
function PracticeSummarySlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";

  return (
    <div className="space-y-8">
      <Vis className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="w-5 h-5 text-purple-400" />
          <div className={`text-[16px] ${c.t1} font-bold`}>この課題で目指す状態</div>
        </div>
        <ul className="space-y-2.5">
          <Point>必須画面のコンポーネントが整理されている</Point>
          <Point>繰り返し要素をコンポーネント / インスタンスで扱えている</Point>
          <Point>状態違いを整理して持てている</Point>
          <Point>テキスト量や表示差分に耐えられる Auto Layout になっている</Point>
        </ul>
      </Vis>

      <div
        className="rounded-xl p-6"
        style={{
          background: d ? 'rgba(168,85,247,0.05)' : 'rgba(168,85,247,0.04)',
          border: `1px solid ${d ? 'rgba(168,85,247,0.15)' : 'rgba(168,85,247,0.12)'}`,
        }}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Target className="w-5 h-5 text-purple-400 shrink-0" />
            <div className={`text-[18px] ${c.t1} font-bold`}>今日大事なのは「完成度」より「構造」</div>
          </div>
          <div className={`text-[14px] ${c.t2} leading-relaxed pl-8`}>
            見た目を作り切ることより、<br />
            <strong className="text-purple-400">どう整理するか・どう繰り返すか・どう崩れにくく作るか</strong>を意識して取り組んでください💡<br />
            今日の感覚を今後の業務につなげていきましょう！
          </div>
        </div>
      </div>
    </div>
  );
}

// 7. 休憩タイマー
function BreakTimerSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";

  const [timeLeft, setTimeLeft] = useState(600); // 10分 = 600秒
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTimeLeft(600);
    setIsRunning(false);
  };

  const progress = ((600 - timeLeft) / 600) * 100;

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-12">
      {/* タイトル */}
      <div className="text-center space-y-3">
        <Coffee className={`w-16 h-16 mx-auto ${d ? 'text-purple-400' : 'text-purple-600'}`} />
        <h2 className={`text-[32px] ${c.t1} font-bold`}>休憩時間</h2>
        <p className={`text-[16px] ${c.t3}`}>10分間の休憩です。リフレッシュしましょう☕</p>
      </div>

      {/* タイマー表示 */}
      <div className="relative">
        {/* 円形プログレスバー */}
        <svg width="280" height="280" className="transform -rotate-90">
          <circle
            cx="140"
            cy="140"
            r="120"
            stroke={d ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
            strokeWidth="12"
            fill="none"
          />
          <circle
            cx="140"
            cy="140"
            r="120"
            stroke={d ? '#a855f7' : '#7c3aed'}
            strokeWidth="12"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 120}`}
            strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>

        {/* 時間表示 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`text-[52px] font-mono font-bold ${timeLeft === 0 ? 'text-red-400' : c.t1}`}>
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* コントロールボタン */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTimer}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[15px] font-semibold transition-all ${
            d
              ? 'bg-purple-600 hover:bg-purple-500 text-white'
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-5 h-5" />
              一時停止
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              スタート
            </>
          )}
        </button>

        <button
          onClick={resetTimer}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[15px] font-semibold transition-all ${
            d
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
        >
          <RefreshCw className="w-5 h-5" />
          リセット
        </button>
      </div>
    </div>
  );
}

// 8. 実践課題：既存UIを新デザインシステムへ移行
function PracticeMigrationSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";

  return (
    <div className="space-y-8">
      {/* タイトル */}
      <div className="space-y-2">
        <h2 className={`text-[24px] ${c.t1} font-bold`}>実践課題：既存UIを新デザインシステムへ移行する</h2>
        <p className={`text-[15px] text-purple-400 font-medium`}>見た目を似せるのではなく、ルールに基づいて再設計する</p>
      </div>

      {/* 課題説明 */}
      <div className={`text-[14px] ${c.t2} leading-relaxed`}>
        実務では、既存の画面を新しいデザインシステムに載せ替える場面がよくあります。<br />
        この課題では、旧デザインの画面を、コンポーネント・セマンティックカラー・タイポグラフィ・余白ルールなど、新デザインシステムを活用して再設計します。<br />
        単なる見た目の模倣ではなく、「どこをどう整理すべきか」を考えながら取り組んでください。
      </div>

      {/* Figmaリンク */}
      <a
        href="https://www.figma.com/design/Lzxkw6F9BxPWo8DoTEU5Ul/%E6%96%B0%E5%8D%92%E3%83%87%E3%82%B6%E3%82%A4%E3%83%8A%E3%83%BC%E7%A0%94%E4%BF%AE_Day1-5-1-?node-id=4057-13206&t=anEt3oDM4VKXbPJh-4"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all"
        style={{
          background: d ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.06)',
          border: `1px solid ${d ? 'rgba(59,130,246,0.25)' : 'rgba(59,130,246,0.15)'}`,
          color: d ? '#93c5fd' : '#2563eb',
          textDecoration: 'none'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = d ? 'rgba(59,130,246,0.15)' : 'rgba(59,130,246,0.1)';
          e.currentTarget.style.borderColor = d ? 'rgba(59,130,246,0.35)' : 'rgba(59,130,246,0.25)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = d ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.06)';
          e.currentTarget.style.borderColor = d ? 'rgba(59,130,246,0.25)' : 'rgba(59,130,246,0.15)';
        }}
      >
        <Link2 className="w-4 h-4" />
        Figmaで課題を開く
      </a>

      {/* Agent i Design System 追加の案内 */}
      <div
        className="rounded-xl p-4"
        style={{
          background: d ? 'rgba(168,85,247,0.08)' : 'rgba(168,85,247,0.06)',
          border: `1px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Palette className="w-4 h-4 text-purple-400" />
          <div className={`text-[13px] ${c.t1} font-semibold`}>Agent i Design Systemを使用します</div>
        </div>
        <div className={`text-[13px] ${c.t3} leading-relaxed`}>
          この課題では、Agent i Design SystemのAssetを使用します。<br />
          追加方法は <strong className="text-purple-400">P32（課題概要）</strong> を参照してください。
        </div>
      </div>

      {/* Before / After */}
      <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto">
        <div className="space-y-3">
          <div className={`text-[13px] ${c.t3} font-semibold`}>移行前（既存デザイン）</div>
          <div
            className="rounded-xl overflow-hidden relative"
            style={{
              height: '700px'
            }}
          >
            <img
              src={`${import.meta.env.BASE_URL}images/migration-before.png`}
              alt="移行前のUI"
              className="w-full"
            />
            {/* グラデーションオーバーレイ */}
            <div
              className="absolute bottom-0 left-0 right-0 h-20"
              style={{
                background: d
                  ? 'linear-gradient(to bottom, transparent, #262335 90%)'
                  : 'linear-gradient(to bottom, transparent, #FDFDFD 90%)'
              }}
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className={`text-[13px] text-purple-400 font-semibold`}>移行後（新デザインシステム適用）</div>
          <div
            className="rounded-xl overflow-hidden relative"
            style={{
              height: '700px'
            }}
          >
            <img
              src={`${import.meta.env.BASE_URL}images/migration-after.svg`}
              alt="移行後のUI"
              className="w-full"
            />
            {/* グラデーションオーバーレイ */}
            <div
              className="absolute bottom-0 left-0 right-0 h-20"
              style={{
                background: d
                  ? 'linear-gradient(to bottom, transparent, #262335 90%)'
                  : 'linear-gradient(to bottom, transparent, #FDFDFD 90%)'
              }}
            />
          </div>
        </div>
      </div>

      {/* 意識してほしいこと & チェックポイント */}
      <div className="grid grid-cols-2 gap-6">
        <Vis className="space-y-3">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-purple-400" />
            <div className={`text-[14px] ${c.t1} font-semibold`}>この課題で意識してほしいこと</div>
          </div>
          <ul className="space-y-1.5">
            <Point>既存コンポーネントを活用し、新規作成は最小限に</Point>
            <Point>セマンティックカラーを使って色の意味を整理</Point>
            <Point>タイポグラフィで情報の優先順位を表現</Point>
            <Point>余白ルールを守り、視覚的なリズムを作る</Point>
          </ul>
        </Vis>

        <Vis className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-purple-400" />
            <div className={`text-[14px] ${c.t1} font-semibold`}>チェックポイント</div>
          </div>
          <ul className="space-y-1.5">
            <Point>既存コンポーネントを適切に選択・活用できているか</Point>
            <Point>セマンティックカラーで色の意味を整理できているか</Point>
            <Point>タイポグラフィで情報の優先順位を表現できているか</Point>
          </ul>
        </Vis>
      </div>

      {/* 補足 */}
      <div
        className="rounded-xl p-4"
        style={{
          background: d ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.06)',
          border: `1px solid ${d ? 'rgba(59,130,246,0.2)' : 'rgba(59,130,246,0.15)'}`
        }}
      >
        <div className={`text-[13px] ${c.t2} leading-relaxed`}>
          📌 この課題では、見た目の完全再現ではなく、<strong>実務的な判断を学ぶこと</strong>が目的です。<br />
          既存コンポーネントを活用できる部分は使い、不足している部分は移行前の意図を汲み取りながら、新デザインシステムのルールに沿って再設計してください🏃🏻‍♀️
        </div>
      </div>
    </div>
  );
}

// 9. 送り出しスライド
function ClosingSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8">
      {/* メインメッセージ */}
      <div className="text-center space-y-6">
        <h1 className={`text-[48px] ${c.t1} font-bold leading-tight`}>
          それでは、<br />
          行ってらっしゃい！
        </h1>
        <p className={`text-[28px] font-bold`} style={{
          background: d
            ? 'linear-gradient(135deg, #a855f7, #ec4899)'
            : 'linear-gradient(135deg, #7c3aed, #db2777)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Bon Voyage!
        </p>
      </div>

      {/* 装飾 */}
      <div className="flex items-center gap-6">
        <Sparkles className={`w-12 h-12 ${d ? 'text-purple-400' : 'text-purple-600'} animate-pulse`} />
        <div className={`text-[72px]`}>🚀</div>
        <Sparkles className={`w-12 h-12 ${d ? 'text-pink-400' : 'text-pink-600'} animate-pulse`} style={{ animationDelay: '0.5s' }} />
      </div>

      {/* サブメッセージ */}
      <div className={`text-[16px] ${c.t3} text-center max-w-md leading-relaxed`}>
        今日学んだことを活かして、<br />
        素敵なデザインを作ってください✨
      </div>
    </div>
  );
}

/* ═══ Slides ═══ */
export const slides: Slide[] = [
  {
    id: "title",
    section: "intro",
    title: "Figmaを「描く道具」から「設計の道具」へ",
    message: "",
    content: <TitleSlide />,
    speakerNotes: `今日は、Figmaの機能をたくさん覚える時間というより、実務で困らない設計の考え方を身につける時間です。
新卒のうちは、どうしても"きれいに作ること"とか、"指示通りに作ること"に意識が向きやすいと思います。もちろんそれも大事です。
でも実務では、それだけだと足りません。なぜかというと、デザインは作って終わりではなくて、あとから必ず変更が入るからです。文言が変わったり、要素が増えたり、状態が追加されたり、別画面にも展開されたりします。
そのときに必要なのが、壊れにくい設計です。
今日はそのために、レイアウトシステム、コンポーネント、トークンやVariablesという3つの観点から、Figmaをどう使うと実務に強い設計になるのかを見ていきます。`
  },
  {
    id: "goal",
    section: "intro",
    title: "今日のゴール",
    message: "デザインシステムの実践的な使い方をイメージできる・実践できる状態になる",
    content: <GoalSlide />,
    speakerNotes: `今日のゴールは、デザインシステムを実践的に使えるようになることです。

新卒のうちは、デザインって「きれいな画面を作ること」だと思いがちなんですけど、実務ではそれだけじゃ足りません。

なぜかというと、デザインは作って終わりじゃないからです。文言が変わったり、機能が追加されたり、別の画面にも展開されたり。こういう変更が日常的に起こります。

そのときに、毎回ゼロから作り直してたら時間がかかりすぎるし、画面ごとにバラバラなデザインになってしまいます。

なので今日は、コンポーネント、トークン、レイアウトシステムという3つの仕組みを学びます。

左の図を見てください。これが「個別のデザイン」です。都度作成で、統一性がありません。カードがバラバラな方向を向いていて、ルールがない状態ですね。

一方、右側が「デザインシステム」です。トークン、コンポーネント、レイアウトがしっかり定義されていて、どの画面でも同じルールで作れるようになっています。

今日のゴールは、このデザインシステムの考え方を理解して、実務で使えるようになることです。`
  },
  {
    id: "overview",
    section: "intro",
    title: "全体像",
    message: "5つのテーマを組み合わせて、壊れにくいデザインを作る",
    content: <OverviewSlide />,
    speakerNotes: `では、今日学ぶ内容の全体像を見ていきましょう。

スライドを見てください。今日は5つのテーマを扱います。

まず①基礎を作る段階として、3つの機能を学びます。

1つ目が「Auto Layout」。これは要素の並び方を決める機能です。横並びか縦並びか、間隔はどうするか、といったレイアウトのルールを設定します。

2つ目が「Component」。繰り返し使うボタンやカードを部品としてまとめる機能です。1つ直せば全部に反映されるようになります。

3つ目が「Variable」。色や余白などの値をまとめて管理する機能です。「プライマリーカラーはこの色」みたいな定義ができます。

次に②ルールに名前をつける段階として、「Token」を学びます。これは色や余白に意味のある名前をつけて管理する考え方です。たとえば「青」じゃなくて「Primary」、「16px」じゃなくて「spacing-md」みたいな名前をつけます。

最後に③チームで共有する段階として、「Library」を学びます。作ったコンポーネントやトークンをチーム全体で使えるように公開する機能です。

この5つを組み合わせることで、壊れにくいデザインが作れるようになります。順番に見ていきましょう。`
  },
  {
    id: "instructor",
    section: "intro",
    title: "講師紹介",
    message: "本日の講師",
    content: <InstructorSlide />,
    speakerNotes: `谷尾美亜です。2023年入社で、現在4年目になります。

メディア・検索ドメイン、LY Agent・検索SBU、デザインユニットUID2ディビジョンに所属しています。

出身は広島で、現在は東京に住んでいます。

最近はAgent iのお買い物領域でUI/UXデザインをメインでやっていて、時々リサーチやったりバナー作ったりもしています。

趣味はペットとお出かけと、かわいい全般です。

何かあればSlackの #times-mtanio で気軽に声かけてください。よろしくお願いします！`
  },
  {
    id: "schedule",
    section: "intro",
    title: "タイムスケジュール",
    message: "Day1 - 5/1のスケジュール",
    content: <ScheduleSlide />,
    speakerNotes: `今日のスケジュールを確認しましょう。

まず11時から12時までがFigma講習です。今から1時間、基本的な機能と考え方を学んでいきます。

12時から13時は昼休憩です。

13時から13時15分まで、課題の説明をします。

そして13時15分から16時45分まで、約3時間半かけて課題制作に取り組んでもらいます。この時間が今日のメインです。

最後に16時45分から17時まで、みんなの成果物を見ながら講評を行います。

では早速、Figmaの話に入っていきましょう。`
  },
  {
    id: "al-apply",
    section: "auto-layout",
    title: "Auto Layoutとは",
    starred: true,
    message: "Auto Layoutは構造を持った配置ルールで柔軟なデザインを実現",
    content: <AlApplySlide />,
    speakerNotes: `最初のテーマは、Auto Layoutです。

Auto Layoutは、Figmaの中でも特に重要な機能なんですが、よく誤解されやすい機能でもあります。

多くの人は、Auto Layoutを「要素をきれいに整列させる機能」だと思っています。確かにそういう側面もあるんですが、実はそれだけじゃありません。

Auto Layoutの本質は、要素同士の関係をルールとして定義する機能です。横に並べるのか、縦に並べるのか。間隔はどれくらいか。親要素に対してどう広がるのか。こういったルールを決めることで、内容が変わっても壊れないデザインが作れます。

つまり、Auto Layoutは整列ツールではなく、変化に強いレイアウトを作るための設計ツールなんです。

では、スライドを見ていきましょう。

まず、どこに適用すべきかです。左側に「適用すべき」場面を示しています。ボタン、リスト1行、カード全体など、構造的な単位には積極的に使いましょう。

一方で右側、「無理に使わなくてよい」場面もあります。装飾的なビジュアルや重なり合う要素には、無理に使う必要はありません。

そして重要なのが、Group、Frame、Auto Layoutの使い分けです。Groupはまとめて移動するだけで構造はありません。Frameは領域とクリッピングのための箱です。Auto Layoutは並び・余白・伸縮ルールを持った構造があります。

次に、手動整列とAuto Layoutの違いを見てみましょう。

左側は手動整列です。要素の間に「関係」がありません。文言が変わると、手動で再調整が必要になります。

右側はAuto Layoutです。余白と順序がルールになっているので、文言が変わっても自動で調整されます。

そして最後に、具体例としてボタンを見てください。「保存」から「下書きを保存」にテキストが変わったとき、Auto Layoutを使っていればボタンの幅が自動で広がります。

このように、Auto Layoutは今きれいに見えることだけでなく、変更に強い構造を作るための機能なんです。全部にかけるのではなく、意味のある単位で判断することが大切です。`
  },
  {
    id: "al-figma-ui",
    section: "auto-layout",
    title: "Auto Layout設定",
    starred: true,
    message: "方向・間隔・パディングの適切な設定で柔軟なレイアウトを実現",
    content: <AlFigmaUISlide />,
    speakerNotes: `次に、Auto Layoutの設定について具体的に見ていきます。

Auto Layoutを適切に設定することで、横幅を変えてもレイアウトが崩れないカードや、コンテンツが増減しても壊れないリストなど、柔軟なデザインを作ることができます。

まず画面を見てください。これは実際にAuto Layoutを使ったカードの例です。横幅を変えても、要素が適切に配置され続けているのがわかります。

では、Figmaでどう設定するのか。右側に設定パネルを表示しています。

主な設定項目は4つです。

1つ目が「Direction」、縦向きか横向きかの設定です。要素を縦に並べるか、横に並べるかを決めます。

2つ目が「Gap」、要素間の余白です。ボタンとボタンの間、カードとカードの間、こういった要素同士の間隔をここで統一します。

3つ目が「Padding」、外枠との余白です。カードの中身が端にくっついているのか、少し離れているのか、この内側の余白を設定します。

4つ目が「Alignment」と「Resizing」です。Alignmentは配置、左寄せ・中央・右寄せなど。Resizingは伸縮、内容に合わせて縮むのか、親要素に合わせて広がるのかを決めます。

新卒のうちは、余白を"なんとなくいい感じ"で置いてしまうことが多いです。もちろん最初はそれでも作れます。

でも実務で困るのは、画面ごとに余白の判断がズレていくことです。ある画面では16、別の画面では20、そのまた別では24、みたいなことが起こります。

余白は、見た目の印象に関わるだけでなく、情報のまとまりや優先度にも関わります。

なので、余白は感覚ではなくルールで持つことが大事です。内側の余白なのか、要素同士の間隔なのか、セクション間の余白なのか。この役割を分けて考えられるようになると、画面の設計がかなり安定します。

Figmaの設定パネルは、まさにこの「何を」「どう」設定するかを視覚的に表現しています。操作に慣れることも大事ですが、それ以上に、この設定が何を意味しているのかを理解することが重要です。`
  },
  {
    id: "al-direction",
    section: "auto-layout",
    title: "Auto Layoutの適用",
    message: "コンテンツの変更や追加に応じて、レイアウトが自動で調整される",
    content: <AlDirectionSlide />,
    speakerNotes: `ここでは、Auto Layoutの細かい設定について触れておきます。ただ、これは実際に触りながら覚えていく部分なので、今日は「こういう設定があるんだな」くらいで大丈夫です。

Auto Layoutには、方向の設定だけでなく、アライメント、つまり配置の設定もあります。

たとえば、縦並びのレイアウトなら左寄せ・中央・右寄せ、横並びなら上・中央・下といった配置ができます。

画面にFigma公式の画像を載せているので、気になる人は後で見ておいてください。

重要なのは、Auto Layoutを使えば、要素が増えても減っても、設定した配置ルールが保たれるということです。

細かい使い方は実際に手を動かしながら覚えていけばいいので、今は「配置の設定もできるんだな」という理解で十分です。`
  },
  {
    id: "al-text",
    section: "auto-layout",
    title: "テキストの取り扱い",
    message: "テキストはもっとも変化しやすい要素なので、見た目より先に振る舞いを決める",
    content: <AlTextSlide />,
    speakerNotes: `次に、テキストの取り扱いについて話します。実務で本当に壊れやすいのが、テキストまわりです。

デザイン中は短い仮文が入っていることが多いので、その状態ではきれいに見えます。

でも実際には、文言が長くなったり、補足が入ったり、エラーが表示されたり、翻訳で文字量が増えたりします。そのときに壊れるUIは、短い文言でしか成立しないUIです。

スライドを見てください。同じカードで短文・長文・省略ありの3パターンを並べています。

短文の場合は問題なく見えます。でも長文になると、カードの高さが伸びたり、レイアウトが崩れたりします。

ここで重要なのが、テキストをどう扱うかを最初に決めておくことです。

伸びてもよいのか、折り返してよいのか、省略してよいのか、他の要素を押し広げてよいのか。こういった振る舞いを先に決めます。

そして、意味が違うテキストは分けることも大切です。

下の例を見てください。左側はタイトルと説明文を1つのテキストレイヤーに詰め込んでいます。これだと個別に制御できません。

右側は意味ごとに分割しています。タイトルと説明文を別のレイヤーにすることで、それぞれの振る舞いを個別に設定できます。

省略も重要な設計です。省略は、見た目を合わせるためではなく、優先順位の設計です。「このテキストは全部見せなくても意味が伝わるか」「省略しても問題ないか」という判断が必要です。

「今の文言で収まっている」だけでは設計ではありません。文言が変わることを想定して、テキストの振る舞いを設計しましょう。

テキストは固定のものとして扱うのではなく、変化するものとして扱う。"この文章が2倍になっても大丈夫かな""1行じゃなくて2行になっても崩れないかな"という視点を持てると、かなり実務向きの設計になります。`
  },
  {
    id: "al-advanced",
    section: "auto-layout",
    title: "最小最大幅 / 比率維持 / 絶対位置",
    message: "可変レイアウトの中で、どこまで許容し、何を例外にするかを決める",
    content: <AlAdvancedSlide />,
    speakerNotes: `次に、可変レイアウトの応用的な話をします。

Auto Layoutで可変にした後、「どこまで許容するか」「何を例外にするか」を決める必要があります。

スライドを見てください。3つのパターンを示しています。

まず1つ目が、最小幅と最大幅です。

最小幅は、要素が小さくなりすぎて使えなくならないようにする下限です。たとえば、ボタンのテキストが短くても、タップしやすい最小幅を保つために使います。

最大幅は、要素が広がりすぎて読みにくくならないようにする上限です。たとえば、テキストが横幅いっぱいに広がると読みづらいので、最大幅で制限します。

2つ目が、比率維持です。

画像やサムネイルは、縦横比を保つことが重要です。Figmaでは、画像に対してアスペクト比を設定することで、サイズが変わっても比率を維持できます。

正方形の画像、16:9の動画サムネイル、4:3の商品画像など、用途に応じて比率を設定します。

3つ目が、絶対位置です。

Auto Layoutは基本的に順番に並べる機能ですが、絶対位置を使うとその流れから外れて自由に配置できます。

これはレイアウトの例外処理として使います。たとえば、カードの右上にバッジを配置したり、モーダルの右上に閉じるボタンを配置したりする場合に有効です。

ただし、多用すると逆に壊れやすくなります。本文や主要なボタンには使わず、あくまで補助的な要素に限定して使うべきです。

Figmaでは Hug、Fill、Fixed という振る舞いがあります。大事なのは、どれが正解かではなくて、その要素にどう振る舞ってほしいかです。

中身に合わせて伸びてほしいなら Hug。親の幅に合わせて広がってほしいなら Fill。サイズを固定して保ちたいなら Fixed。

この"機能名"ではなく、"どんな振る舞いを期待するか"で考える癖がつくと、レイアウト設計がかなり強くなります。`
  },
  {
    id: "responsive-basics",
    section: "responsive",
    title: "レスポンシブ対応の基本",
    starred: true,
    message: "画面サイズが変わっても意図した見た目を保つ",
    content: <ResponsiveBasicsSlide />,
    speakerNotes: `Auto Layoutで要素同士の関係を作れるようになったら、次は画面サイズへの対応を考えます。

実務では、PCで作ったデザインがタブレットやスマホでどう見えるかを考える必要があります。

ここで重要なのが、Constraints（制約）という考え方です。Auto Layoutが「要素同士の関係」を決めるのに対して、Constraintsは「親フレームに対する配置」を決めます。

たとえば、ヘッダーのロゴは左上に固定したい、背景画像は画面全体に広げたい、モーダルは画面中央に配置したい、といった制御ができます。

そして、画面幅が変わった時に、何を変えて何を保つかを設計します。

スライドの図を見てください。左側がNG例、右側がOK例です。

NG例では、PC用に固定幅で作ったデザインをそのままSPに持ち込んでいます。画面からはみ出したり、横スクロールが発生したり、要素が小さすぎて見づらくなったりしています。これは「PCで作ったものをそのまま縮小しただけ」の状態です。

一方、OK例では、画面サイズに応じてレイアウトが適切に変化しています。横並びだった要素が縦並びになり、余白が調整され、タップしやすいサイズが保たれています。

PCでは横並びのカードが、SPでは縦並びになる。メニューが横一列からハンバーガーメニューになる。こういった変化を、Auto LayoutとConstraintsを組み合わせて実現します。

大事なのは、画面サイズが変わったとき、何が伸びて、何が固定されるべきかを考える視点です。これができると、様々なデバイスで壊れないデザインが作れるようになります。`
  },
  {
    id: "comp-basics",
    section: "components",
    title: "コンポーネントの基本",
    message: "コンポーネントは、見た目の再利用ではなく、判断の再利用",
    content: <CompBasicsSlide />,
    speakerNotes: `次に、コンポーネントの話に入ります。
コンポーネントは、よく"使い回しのため"と説明されます。もちろんそれも正しいです。
でも実務での本質は、UIの正解を一か所に集めることです。
同じ見た目のボタンを画面ごとに別々に作っていたら、修正のたびに全部直す必要が出ますし、微妙なズレも起きます。
でもコンポーネントにしておけば、共通部分を守りながら運用できます。
なのでコンポーネントは、単なる時短テクニックではなくて、一貫性を保つための仕組みです。
"似てるから一緒にする"というより、"同じ役割だから共通化する"という意識が大事です。`
  },
  {
    id: "comp-props",
    section: "components",
    title: "プロパティについて",
    starred: true,
    message: "プロパティは「何を変えてよいか」を明示する、安全な自由度の設計",
    content: <CompPropsSlide />,
    speakerNotes: `コンポーネントを実務で使いやすくするのが、プロパティです。
実務では、ラベルだけ変えたい、アイコンだけ切り替えたい、一部だけ表示を変えたい、ということがすごく多いです。
そのたびにコンポーネントを複製したり、インスタンスを壊して編集したりしていると、管理が一気に難しくなります。
そこで、変えていい部分をあらかじめ定義しておくのがプロパティです。
コンポーネントが土台で、プロパティは調整できる範囲です。
これによって、守るべき共通部分は守ったまま、使う側が必要な差分だけ安全に変えられるようになります。
プロパティは、自由度を増やすためというより、安全に編集できるようにするための仕組みだと考えるとわかりやすいです。`
  },
  {
    id: "comp-variants-properties",
    section: "components",
    title: "Variantsのプロパティと値",
    starred: true,
    message: "プロパティ = 何を切り替えるか、値 = どういう状態があるか",
    content: <CompVariantsPropertiesSlide />,
    speakerNotes: `次にVariantsです。
Variantsは、似た部品を整理するための仕組みです。
たとえばボタンには、通常状態、ホバー状態、無効状態、ローディング状態みたいな違いがありますよね。
これを全部バラバラのコンポーネントとして持っていると、探しづらいし、増えたときに整理しにくいです。
なので、"同じ部品の状態違い"としてまとめて管理します。これがVariantsです。
大事なのは、Variantsを見た目違いの収納箱だと思わないことです。
本当は、"この部品にはこういう状態がある"という設計を整理するためのものです。
状態を設計するという視点で使えるようになると、かなり実務っぽい使い方になります。`
  },
  { id: "comp-variants-create", section: "components", title: "Variantsの作成手順", message: "FigmaでVariantsを作成する実際の手順を理解する", content: <CompVariantsCreateSlide /> },
  { id: "comp-slot", section: "components", title: "Slot（新機能）について", message: "Slotでコンポーネント内に他の要素を自由に差し込める", content: <CompSlotSlide /> },
  {
    id: "comp-real-example",
    section: "components",
    title: "実例：ボタンシステム",
    message: "実際のボタンシステムでコンポーネント設計を理解する",
    content: <CompRealExampleSlide />,
    speakerNotes: `コンポーネントって、自分のためだけのものだと思うと、価値を半分しか見れていません。
もちろん、自分の作業は楽になります。
でも本当は、他のデザイナーが使うため、エンジニアと認識を合わせるため、数か月後の自分が迷わないため、という意味でもすごく大事です。
つまり、コンポーネントはチームの品質を揃えるための仕組みです。
誰が触っても同じ品質で組める、という状態を作るのが役割です。
ここまで来ると、コンポーネントは便利機能ではなくて、チーム開発のインフラみたいなものだとわかってくると思います。`
  },
  {
    id: "var-basics",
    section: "variables",
    title: "Variablesの基本",
    starred: true,
    message: "スタイルは見た目のまとまり、Variablesは再利用する値の源泉",
    content: <VarBasicsSlide />,
    speakerNotes: `Figmaでは、こうしたトークン的な考え方を運用しやすくするために、Variablesがあります。
Variablesを使うと、色や数値を固定値ではなく、切り替え可能なルールとして持つことができます。
たとえば、ライトモードとダークモードで値を切り替えるとか、ブランドごとの差分を管理するとか、余白やサイズのルールをまとめて持つとか、そういうことがしやすくなります。
つまり、Variablesは"あとで変わるかもしれない値"を管理しやすくする仕組みです。
実務では、色や値って思った以上に変わります。
だからこそ、最初から変化に強い持ち方をしておくことが大事です。`
  },
  { id: "var-apply", section: "variables", title: "Variablesの適用", starred: true, message: "Variablesの価値は、値を持つことではなく、変更の経路を設計すること", content: <VarApplySlide /> },
  { id: "var-alias", section: "variables", title: "トークンのエイリアス", message: "トークンのエイリアスを使うと、デザインシステムを効率よく育てられる", content: <VarAliasSlide /> },
  { id: "var-real-example", section: "variables", title: "実例：カラーシステム", message: "実際のカラーシステムでVariablesの価値を体感する", content: <VarRealExampleSlide /> },
  {
    id: "lib-basics",
    section: "library",
    title: "ライブラリの基本",
    message: "ライブラリはアセット置き場ではなく、チームの共通言語",
    content: <LibBasicsSlide />,
    speakerNotes: `ここで、デザインシステムという言葉も整理します。
デザインシステムは、コンポーネント集ではありません。
本当は、どんな構造で作るか、どんな部品をどう使うか、値をどう管理するか、誰が見ても同じ判断ができるか、まで含めた仕組みです。
コンポーネントだけある状態だと、部品棚はあるけど使い方がそろっていない状態になりやすいです。
そこにトークンやVariables、命名ルールや使い方のルールが加わって、初めてシステムになります。
なので、デザインシステムは"何が置いてあるか"だけでなく、"どう運用するか"まで含めて考える必要があります。`
  },
  { id: "lib-publish", section: "library", title: "ライブラリの公開・更新", message: "ライブラリ更新は、単なる修正ではなくチームへのリリース", content: <LibPublishSlide /> },
  {
    id: "token-basics",
    section: "tokens",
    title: "デザイントークンの整理",
    message: "トークンは、値に名前をつけることではなく、判断を再利用できる形にすること",
    content: <TokenBasicsSlide />,
    speakerNotes: `ここから、値の管理の話に入ります。
トークンは、色や余白や角丸などの値を、直接数字やカラーコードで管理するのではなく、意味のある名前で管理する考え方です。
たとえば、毎回 #0057FF を直接入れるのではなく、color.primary みたいに意味を持たせる。
余白も、16を直接打つのではなく、spacing.md のように扱う。
こうすると、見た目が揃うだけでなく、"これは主役の色なんだな""これは中くらいの余白なんだな"という意図が共有できます。
つまり、トークンは値を共通化するだけではなく、判断を共通化するためのものです。`
  },
  {
    id: "token-semantic",
    section: "tokens",
    title: "セマンティックカラー",
    starred: true,
    message: "色は「何色か」ではなく「何のための色か」で扱う",
    content: <TokenSemanticSlide />,
    speakerNotes: `では、なぜ直入力がつらいのか。
一見すると、手で値を入れたほうが早く見えます。
でも運用が始まると、微妙に違う値が増えていきます。16と18と20が混ざったり、似た青が何種類もできたりします。
そうなると、見た目の統一もしにくいし、あとから一括変更もしづらいです。
さらに、"なぜこの値なのか"が残りません。
トークンを使うと、見た目を揃えるだけじゃなくて、判断基準をチームで共有できます。
なので、トークンは装飾ルールではなく、設計ルールです。
ここを理解すると、デザインシステムが単なる部品集ではないことが見えてきます。`
  },
  { id: "token-hex", section: "tokens", title: "HEXカラーにトークンを適用する", message: "HEXをトークン化する時は、値を置き換えるのではなく、意味を読み替える", content: <TokenHexSlide /> },
  { id: "token-appearance", section: "tokens", title: "Light/Dark mode の切り替え", message: "AppearanceパネルからLight/Dark modeを切り替えられる", content: <TokenAppearanceSlide /> },
  { id: "token-typo", section: "tokens", title: "タイポグラフィについて", message: "タイポグラフィは文字サイズ表ではなく、情報の優先順位と読みやすさの設計", content: <TokenTypoSlide /> },
  { id: "others-ds", section: "others", title: "その他のデザインシステム要素", message: "色とタイポグラフィだけじゃない。余白・アイコン・角丸も設計対象", content: <OthersDsSlide /> },
  { id: "summary", section: "others", title: "まとめ", message: "Figmaの機能は、見た目を作るためではなく、運用できる構造を作るために使う", content: <SummarySlide /> },
  {
    id: "break-timer",
    section: "others",
    title: "休憩時間",
    message: "10分間の休憩です。リフレッシュしましょう",
    content: <BreakTimerSlide />,
    speakerNotes: `ここで10分間の休憩を取ります。手を動かす前に少しリフレッシュしましょう。
トイレに行ったり、飲み物を取りに行ったり、軽くストレッチをしたり、自由に過ごしてください。
10分後に再開して、実践課題に取り組んでいきます。`
  },
  {
    id: "practice-intro",
    section: "practice",
    title: "Figma研修 基本課題",
    starred: true,
    message: "完成度より構造を意識して、手を動かしながら学ぶ",
    content: <PracticeIntroSlide />,
    speakerNotes: `最後に、明日からすぐ意識できることを5つだけ置いておきます。
1つ目、このUIは文言が変わっても崩れないか。
2つ目、同じものを3画面に増やしても管理できるか。
3つ目、他の人が見て構造が理解できるか。
4つ目、値を直接打ちすぎていないか。
5つ目、その場しのぎの上書きをしていないか。
この5つを考えるだけでも、設計の質はかなり変わります。
機能を全部覚えていなくても、この視点があれば、Figmaの使い方がかなり実務寄りになります。`
  },
  { id: "practice-overview", section: "practice", title: "課題概要", starred: true, message: "モバイルオーダーUIコンポーネントを題材に、実践的な設計を学ぶ", content: <PracticeOverviewSlide /> },
  { id: "practice-required-screens", section: "practice", title: "必須画面", message: "商品一覧と商品詳細の作成ポイント", content: <PracticeRequiredScreensSlide /> },
  { id: "practice-additional", section: "practice", title: "追加課題", message: "余力があれば店舗選択・カート・受け取り画面に挑戦", content: <PracticeAdditionalSlide /> },
  {
    id: "practice-summary",
    section: "practice",
    title: "完成イメージ",
    message: "今日大事なのは「完成度」より「構造」",
    content: <PracticeSummarySlide />,
    speakerNotes: `今日の内容を通して、一番持って帰ってほしいのは、上手いデザイナーほど"今の見た目"だけではなく、"変更されたあと"を見越して作っている、ということです。
きれいに作れることはもちろん大事です。
でも実務では、それに加えて、直しやすい、展開しやすい、共有しやすい、壊れにくい、という価値がすごく大きいです。
ぜひこれからFigmaを使うときは、"うまく描くためのツール"としてだけではなく、"壊れにくく設計するためのツール"として見てみてください。
今日の講義が、その最初の視点を持つきっかけになったらうれしいです。ありがとうございました。`
  },
  {
    id: "practice-migration",
    section: "practice",
    title: "実践課題：デザインシステム移行",
    message: "見た目を似せるのではなく、ルールに基づいて再設計する",
    content: <PracticeMigrationSlide />,
    speakerNotes: `最後に、実務でよくある「既存UIを新デザインシステムに移行する」という課題を用意しました。
これは単なる見た目の模倣ではなく、デザインシステムのルールを理解して、既存の画面を再設計する練習です。
実務では、こういった移行作業は頻繁に発生します。その際に大事なのは、ただ似せることではなく、コンポーネント・カラー・タイポグラフィ・余白といったルールを使って、情報を整理し直すことです。
Before / Afterを比較しながら、「どこをどう整理したか」「なぜそうしたか」を考えながら取り組んでみてください。
この課題を通して、デザインシステムを実際に使う感覚を掴んでもらえたらと思います。`
  },
  {
    id: "closing",
    section: "practice",
    title: "Bon Voyage!",
    message: "それでは、行ってらっしゃい！",
    content: <ClosingSlide />,
    speakerNotes: `それでは、今日学んだことを活かして、課題に取り組んでください。
完璧を目指すのではなく、構造を意識しながら、手を動かして学んでいきましょう。
何かあればいつでも声をかけてください。それでは、行ってらっしゃい！`
  },
];
