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
  Minus,
  X,
  MapPin,
  Check,
  Clock,
  Plus,
} from "lucide-react";
import { useTheme, type Theme } from "./theme-context";

/* ═══ Types ═══ */
export interface SlideSection { id: string; title: string; }
export interface Slide { id: string; section: string; title: string; starred?: boolean; message: string; content: React.ReactNode; }

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
      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
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
  return <div className="text-[11px] tracking-wide text-purple-400 uppercase mb-3 font-medium">{children}</div>;
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
      {label && <div className={`text-[11px] ${c.t5} mb-2`}>{label}</div>}
      {children}
    </GlassCard>
  );
}

/* ═══ Sections ═══ */
export const sectionList: SlideSection[] = [
  { id: "intro", title: "イントロ" },
  { id: "auto-layout", title: "オートレイアウト" },
  { id: "components", title: "コンポーネント" },
  { id: "variables", title: "バリアブル" },
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
              <div className={`absolute top-4 left-5 w-28 h-6 ${c.b2} rounded shadow-sm`} style={{ transform: 'rotate(-1deg)' }} />
              <div className={`absolute top-[52px] left-8 w-32 h-4 ${c.b2} rounded opacity-70`} style={{ transform: 'rotate(0.5deg)' }} />
              <div className={`absolute top-[76px] left-7 w-36 h-3 ${c.b2} rounded opacity-60`} />
              <div className={`absolute top-[95px] left-11 w-28 h-3 ${c.b2} rounded opacity-50`} style={{ transform: 'rotate(-0.3deg)' }} />

              <div className={`absolute top-[130px] left-6 w-20 h-8 ${c.b1} rounded shadow-sm`} style={{ transform: 'rotate(-0.8deg)' }} />
              <div className={`absolute top-[132px] right-8 w-24 h-8 ${c.b2} rounded`} style={{ transform: 'rotate(1deg)' }} />

              <div className={`absolute bottom-[60px] left-9 w-2 h-2 rounded-full ${c.b1}`} />
              <div className={`absolute bottom-[58px] left-14 w-16 h-3 ${c.b2} rounded opacity-70`} />

              <div className={`absolute bottom-[32px] left-9 w-2 h-2 rounded-full ${c.b1}`} />
              <div className={`absolute bottom-[30px] left-14 w-20 h-3 ${c.b2} rounded opacity-70`} />

              <div className={`absolute bottom-3 right-5 w-14 h-6 ${c.b1} rounded`} style={{ transform: 'rotate(-1.5deg)' }} />
            </div>
            <div className={`text-[12px] ${c.t5} text-center`}>余白・配置が不揃い</div>
          </div>

          {/* After - Structured with オートレイアウト hints */}
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
              {/* オートレイアウト container */}
              <div className="h-full p-5 flex flex-col gap-4 relative">
                {/* Header section with card look */}
                <div
                  className="rounded-lg p-3"
                  style={{
                    background: d ? 'rgba(168,85,247,0.08)' : 'rgba(168,85,247,0.06)',
                    boxShadow: d ? '0 2px 8px rgba(0,0,0,0.15)' : '0 2px 8px rgba(168,85,247,0.08)'
                  }}
                >
                  <div className="w-3/4 h-5 bg-purple-500/30 rounded mb-2" />
                  <div className="w-1/2 h-3 bg-purple-500/15 rounded" />
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
                  <div className="w-full h-3 bg-purple-500/20 rounded" />
                  <div className="w-5/6 h-3 bg-purple-500/15 rounded" />

                  {/* List items */}
                  <div className="flex flex-col gap-2 mt-1">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500/40" />
                      <div className="w-4/5 h-2.5 bg-purple-500/15 rounded" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500/40" />
                      <div className="w-3/4 h-2.5 bg-purple-500/15 rounded" />
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

                {/* オートレイアウト guides overlay */}
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
      <Points items={["コンポーネント、トークン、レイアウトシステムを理解する","実務で変更に強く、チームで共有しやすい設計を作れる","デザイナーとエンジニアの協業をスムーズにする基盤を作る"]} />

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

              <div className={`text-[10px] ${c.t5} text-center italic mt-3`}>
                都度作成、統一性なし
              </div>
            </div>
          </div>

          {/* After - Design System */}
          <div className="space-y-3">
            <div className="text-[13px] text-purple-400 mb-2 font-medium flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>デザインシステム</span>
            </div>
            <div
              className="h-[320px] rounded-2xl p-4 relative overflow-hidden"
              style={{
                background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
                border: `2px solid ${d ? 'rgba(168,85,247,0.25)' : 'rgba(168,85,247,0.2)'}`,
                boxShadow: d
                  ? '0 8px 32px rgba(168,85,247,0.2), 0 0 0 1px rgba(168,85,247,0.1) inset'
                  : '0 8px 32px rgba(168,85,247,0.15), 0 0 0 1px rgba(255,255,255,0.6) inset'
              }}
            >
              <div className="space-y-3 relative z-10">
                {/* Tokens section */}
                <div
                  className="rounded-lg p-2 border"
                  style={{
                    background: d ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.06)',
                    borderColor: d ? 'rgba(59,130,246,0.3)' : 'rgba(59,130,246,0.2)',
                    boxShadow: '0 2px 8px rgba(59,130,246,0.1)'
                  }}
                >
                  <div className="text-[9px] text-blue-400 mb-1.5 font-medium">Tokens</div>
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
                  <div className="text-[9px] text-emerald-400 mb-1.5 font-medium">オートレイアウト</div>
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
                  <line x1="50%" y1="30%" x2="50%" y2="50%" stroke={d ? "#a855f7" : "#7c3aed"} strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="50%" y1="50%" x2="50%" y2="70%" stroke={d ? "#a855f7" : "#7c3aed"} strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="50%" cy="30%" r="3" fill={d ? "#a855f7" : "#7c3aed"} />
                  <circle cx="50%" cy="50%" r="3" fill={d ? "#a855f7" : "#7c3aed"} />
                  <circle cx="50%" cy="70%" r="3" fill={d ? "#a855f7" : "#7c3aed"} />
                </svg>
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
      <Msg>5つのテーマは別々の機能ではなく、実務では<strong>つながっている</strong></Msg>
      <div
        className="relative rounded-2xl p-10 overflow-hidden"
        style={{
          background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
          border: `2px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
          boxShadow: d
            ? '0 8px 32px rgba(168,85,247,0.15), 0 0 0 1px rgba(168,85,247,0.1) inset'
            : '0 8px 32px rgba(168,85,247,0.12), 0 0 0 1px rgba(255,255,255,0.6) inset'
        }}
      >
        <div className="flex flex-col items-center gap-8 relative z-10">
          {/* Core concept */}
          <div
            className="text-white rounded-2xl px-8 py-4 text-[16px] font-bold shadow-xl"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #a855f7, #c084fc)",
              boxShadow: '0 8px 24px rgba(168,85,247,0.4), 0 0 48px rgba(168,85,247,0.2)'
            }}
          >
            壊れにくいUI構造
          </div>

          {/* Five pillars */}
          <div className="grid grid-cols-3 gap-6 max-w-3xl w-full">
            {[
              { icon: <Layers className="w-5 h-5" />, label: "オートレイアウト", sub: "関係を設計する", color: d ? 'rgba(59,130,246,0.12)' : 'rgba(59,130,246,0.08)', border: d ? 'rgba(59,130,246,0.3)' : 'rgba(59,130,246,0.2)', iconColor: 'text-blue-400' },
              { icon: <Component className="w-5 h-5" />, label: "Component", sub: "判断を再利用する", color: d ? 'rgba(168,85,247,0.12)' : 'rgba(168,85,247,0.08)', border: d ? 'rgba(168,85,247,0.3)' : 'rgba(168,85,247,0.2)', iconColor: 'text-purple-400' },
              { icon: <Variable className="w-5 h-5" />, label: "Variable", sub: "値を再利用する", color: d ? 'rgba(16,185,129,0.12)' : 'rgba(16,185,129,0.08)', border: d ? 'rgba(16,185,129,0.3)' : 'rgba(16,185,129,0.2)', iconColor: 'text-emerald-400' },
              { icon: <Library className="w-5 h-5" />, label: "Library", sub: "チームで共有する", color: d ? 'rgba(249,115,22,0.12)' : 'rgba(249,115,22,0.08)', border: d ? 'rgba(249,115,22,0.3)' : 'rgba(249,115,22,0.2)', iconColor: 'text-orange-400' },
              { icon: <Paintbrush className="w-5 h-5" />, label: "Token", sub: "意味で名前をつける", color: d ? 'rgba(236,72,153,0.12)' : 'rgba(236,72,153,0.08)', border: d ? 'rgba(236,72,153,0.3)' : 'rgba(236,72,153,0.2)', iconColor: 'text-pink-400' },
            ].map((item, idx) => (
              <div
                key={item.label}
                className={`rounded-xl px-5 py-4 text-center ${idx === 4 ? 'col-span-3 max-w-[240px] mx-auto' : ''}`}
                style={{
                  background: item.color,
                  border: `1px solid ${item.border}`,
                  boxShadow: d ? '0 4px 16px rgba(0,0,0,0.2)' : '0 4px 16px rgba(0,0,0,0.06)'
                }}
              >
                <div className={`flex justify-center mb-2 ${item.iconColor}`}>{item.icon}</div>
                <div className={`text-[14px] font-semibold mb-1 ${d ? 'text-white' : 'text-gray-800'}`}>{item.label}</div>
                <div className={`text-[12px] ${d ? 'text-gray-400' : 'text-gray-600'}`}>{item.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Connection lines background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="w-full h-full" style={{ opacity: 0.1 }}>
            <line x1="50%" y1="25%" x2="25%" y2="50%" stroke={d ? "#a855f7" : "#7c3aed"} strokeWidth="2" strokeDasharray="4 4" />
            <line x1="50%" y1="25%" x2="50%" y2="50%" stroke={d ? "#a855f7" : "#7c3aed"} strokeWidth="2" strokeDasharray="4 4" />
            <line x1="50%" y1="25%" x2="75%" y2="50%" stroke={d ? "#a855f7" : "#7c3aed"} strokeWidth="2" strokeDasharray="4 4" />
            <line x1="33%" y1="60%" x2="50%" y2="75%" stroke={d ? "#a855f7" : "#7c3aed"} strokeWidth="2" strokeDasharray="4 4" />
            <line x1="67%" y1="60%" x2="50%" y2="75%" stroke={d ? "#a855f7" : "#7c3aed"} strokeWidth="2" strokeDasharray="4 4" />
          </svg>
        </div>
      </div>
      <Tip>それぞれの機能を点ではなく線でつなげて考えると、設計判断がブレにくくなる</Tip>
    </div>
  );
}

function AlBasicsSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg>オートレイアウトは整列機能ではなく、要素同士の<strong>関係をルール</strong>にする機能</Msg>
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
              <div className={`absolute bottom-5 left-5 w-20 h-8 ${c.b1} rounded text-[11px] flex items-center justify-center ${c.t4} font-medium`}>
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
            <div className={`text-[11px] text-rose-400 text-center`}>文言変更時に手動で再調整が必要</div>
          </div>

          {/* オートレイアウト */}
          <div className="space-y-3">
            <div className="text-[13px] text-purple-400 mb-2 font-medium flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>オートレイアウト</span>
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
                className="w-20 h-8 rounded text-[11px] flex items-center justify-center text-white font-medium"
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
            <div className={`text-[11px] text-purple-400 text-center`}>文言が変わっても自動で調整される</div>
          </div>
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
      <Msg>オートレイアウトは<strong>構造を持った配置ルール</strong>で柔軟なデザインを実現</Msg>
      <Points items={["ボタン、リスト1行、カード、モーダルなどは適用しやすい","装飾的な自由配置やビジュアル演出には無理に使わない",<>Group / Frame / オートレイアウト の<strong>役割の違い</strong>を理解する</>,"意味のある単位で適用する"]} />
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
                  <div className={`text-[11px] ${d ? 'text-purple-300' : 'text-purple-600'} mb-2 font-medium`}>{ex.name}</div>
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
                  <div className={`text-[11px] ${c.t5} mb-2`}>{ex.name}</div>
                  {ex.el}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl p-4" style={{ background: c.glass, border: c.glassBd }}>
        <Label>Group / Frame / オートレイアウト の使い分け</Label>
        <div className={`grid grid-cols-3 gap-3 text-[12px] ${c.t3}`}>
          <div className="rounded-lg p-3 text-center" style={{ background: c.glass, border: c.glassBd }}>
            <div className={`font-medium ${c.t2} mb-1`}>Group</div>
            <div>まとめて移動するだけ</div>
            <div className={`text-[11px] ${c.t5} mt-1`}>構造なし</div>
          </div>
          <div className="rounded-lg p-3 text-center" style={{ background: c.glass, border: c.glassBd }}>
            <div className={`font-medium ${c.t2} mb-1`}>Frame</div>
            <div>領域とクリッピング</div>
            <div className={`text-[11px] ${c.t5} mt-1`}>箱だけ</div>
          </div>
          <div className="rounded-lg p-3 text-center" style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)" }}>
            <div className={`font-medium ${d ? "text-purple-300" : "text-purple-600"} mb-1`}>オートレイアウト</div>
            <div>並び・余白・伸縮ルール</div>
            <div className="text-[11px] text-purple-400 mt-1">構造あり</div>
          </div>
        </div>
      </div>
      <Ng>「全部にオートレイアウトをかければ良い」は思考停止。意味の単位で判断する</Ng>
    </div>
  );
}

function AlDirectionSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg>方向・間隔・パディングの<strong>適切な設定</strong>で柔軟なレイアウトを実現</Msg>

      <div className={`text-[14px] ${c.t3} leading-relaxed`}>
        <p>
          オートレイアウトを適切に設定することで、横幅を変えてもレイアウトが崩れない、カードなどのパーツを作ったり、と柔軟なデザイン・レイアウトを作ることが出来ます。
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
          src="/images/content_image-1711415488661.gif"
          alt="オートレイアウトによる柔軟なレイアウトの例"
        />
        <div
          className="absolute bottom-2 right-2 px-2 py-1 rounded text-[10px]"
          style={{
            background: 'rgba(0,0,0,0.6)',
            color: 'rgba(255,255,255,0.8)'
          }}
        >
          出典：SKILLHUB
        </div>
      </div>

      <div className={`text-[14px] ${c.t3} leading-relaxed space-y-4`}>
        <p>
          オートレイアウトフレームの要素は、方向、間隔、パディング、整列、その他のオートレイアウトプロパティに基づいて自動的に配置されます。コンテンツが変更されたり、要素が追加、削除、サイズ変更された場合でも、レイアウトは手動で再配置する必要なく調整されます。
        </p>
        <p>
          オートレイアウトを使用すると、以下のような応答性のあるデザインを作成できます。
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
          src="/images/al-direction-ui3.png"
          alt="縦横のレイアウトの例"
        />
        <div
          className="absolute bottom-2 right-2 px-2 py-1 rounded text-[10px]"
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
            オートレイアウトフレーム内で子オブジェクトの配置方法を選択します。使用可能な配置オプションは、オートレイアウトフレームの流れと、アイテム間の間隔（配置間隔）によって決まります。
          </p>
          <p>
            通常のフレーム内のオブジェクトとは異なり、個々のオブジェクトの配置を制御することはできません。そのため、子オブジェクトの配置は親のオートレイアウトフレーム上で設定します。
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
            src="/images/al-alignment.gif"
            alt="アライメントの設定例"
          />
          <div
            className="absolute bottom-2 right-2 px-2 py-1 rounded text-[10px]"
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
            src="/images/al-alighment-auto.gif"
            alt="アライメントの自動設定"
          />
          <div
            className="absolute bottom-2 right-2 px-2 py-1 rounded text-[10px]"
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
            src="/images/al-gap-between-toggle.gif"
            alt="アイテム間の間隔の設定"
          />
          <div
            className="absolute bottom-2 right-2 px-2 py-1 rounded text-[10px]"
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
            パディングは、オートレイアウトフレームの境界とフレームの子オブジェクトとの間の空白（余白）を制御します。パディングは、均一に、垂直方向と水平方向に設定することも、上、右、下、左にそれぞれ異なる値を設定することもできます。
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
            src="/images/al-padding-resize-all-sides.gif"
            alt="パディングの設定"
          />
          <div
            className="absolute bottom-2 right-2 px-2 py-1 rounded text-[10px]"
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
            src="/images/individual-padding.mov.gif"
            alt="個別のパディング設定"
          />
          <div
            className="absolute bottom-2 right-2 px-2 py-1 rounded text-[10px]"
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
            src="/images/al-move-child-objects.gif"
            alt="オブジェクト操作のイメージ"
          />
          <div
            className="absolute bottom-2 right-2 px-2 py-1 rounded text-[10px]"
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
            src="/images/hold-ctrl-to-ignore-auto-layout.gif"
            alt="絶対位置の設定"
          />
          <div
            className="absolute bottom-2 right-2 px-2 py-1 rounded text-[10px]"
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
                  オートレイアウトフレーム
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
                  オートレイアウトのフレームの子オブジェクト
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
          <div className={`text-right text-[11px] ${c.t4} mt-2`}>
            出典：Figma公式
          </div>
        </div>
      </div>

      <Tip>オートレイアウトの方向・間隔・パディングを適切に設定することで、コンテンツの変更に自動で対応する柔軟なレイアウトを実現できる</Tip>
    </div>
  );
}

function AlFigmaUISlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg>Figmaの<strong>オートレイアウト設定パネル</strong>を理解する</Msg>
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
                src="/images/Choice Result Card.svg"
                alt="Choice Result Card"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  display: 'block'
                }}
              />
            </div>
          </div>

          {/* Figma オートレイアウト Panel Screenshot */}
          <div className="flex items-center justify-start">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                boxShadow: d ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.1)'
              }}
            >
              <img
                src="/images/al-figma-ui-panel.png"
                alt="Figma オートレイアウト設定パネル"
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

      <Tip>Figmaの設定パネルは、オートレイアウトの「何を」「どう」設定するかを視覚的に表現している</Tip>
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
                <div className="text-[11px] text-purple-400 font-medium">詳しく見る →</div>
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
            <div className={`rounded-lg px-3 py-1.5 text-[12px] font-medium ${c.t2}`} style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.15)" }}>カードタイトル</div>
            <div className={`rounded-lg px-3 py-1.5 text-[12px] ${c.t4}`} style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.15)" }}>説明文がここに入ります。</div>
          </div>
        </Comp>
      </div>
      <Ng>「今のテキストで揃って見える」だけで完成とするのは危険。文言は必ず変わる</Ng>
    </div>
  );
}

function AlAdvancedSlide() {
  const theme = useTheme();
  const c = tc(theme);
  return (
    <div className="space-y-10">
      <Msg>可変レイアウトの中で、<strong>どこまで許容し、何を例外にするか</strong>を決める</Msg>
      <Points items={["最小幅 / 最大幅は使いやすさの下限と上限を��める","画像やサムネイルは比率維持が重要","絶対位置はレイアウトの例外処理として使う","バッジや閉じるボタンには向くが、本文や主ボタンには多用しない"]} />
      <Vis>
        <div className="grid grid-cols-3 gap-5">
          <div>
            <Label>最小・最大幅</Label>
            <div className="space-y-3">
              <div className="rounded-xl p-3" style={{ background: c.glass, border: c.glassBd }}>
                <div className="bg-purple-500/40 text-white text-[11px] rounded-lg px-3 py-1.5 text-center" style={{ minWidth: 100 }}>短い</div>
                <div className={`text-[10px] ${c.t5} mt-1.5 text-center`}>min-width で潰れない</div>
              </div>
              <div className="rounded-xl p-3" style={{ background: c.glass, border: c.glassBd }}>
                <div className="bg-purple-500/40 text-white text-[11px] rounded-lg px-3 py-1.5 text-center truncate" style={{ maxWidth: 120 }}>とても長いボタンラベル</div>
                <div className={`text-[10px] ${c.t5} mt-1.5 text-center`}>max-width で広がりすぎない</div>
              </div>
            </div>
          </div>
          <div>
            <Label>比率維持</Label>
            <div className="rounded-xl p-3" style={{ background: c.glass, border: c.glassBd }}>
              <div className="flex gap-2 items-end justify-center">
                {[40, 56, 72].map((s) => (
                  <div key={s} className="bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-lg flex items-center justify-center text-[10px] text-purple-400" style={{ width: s, height: s * 0.75 }}>4:3</div>
                ))}
              </div>
              <div className={`text-[10px] ${c.t5} mt-2 text-center`}>サイズが変わっても比率は維持</div>
            </div>
          </div>
          <div>
            <Label>絶対位置</Label>
            <div className="rounded-xl p-3" style={{ background: c.glass, border: c.glassBd }}>
              <div className="relative inline-block">
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-[16px]">🔔</div>
                <div className={`absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-medium ring-2 ${c.rn}`}>3</div>
              </div>
              <div className={`text-[10px] ${c.t5} mt-2`}>フローの例外として使う</div>
            </div>
          </div>
        </div>
      </Vis>
      <Ng>絶対位置の多用は「見た目は合ってるが構造が壊れている」状態になりやすい</Ng>
    </div>
  );
}

function CompBasicsSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg>コンポーネントは、見た目の再利用ではなく、<strong>判断の再利用</strong></Msg>
      <Points items={["メインコンポーネントは基準、インスタンスは文脈に応じた利用","オーバーライドは文脈への適応","Reset は基準に戻す、Detach は基準とのつながりを切る"]} />

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
            <div className="text-[11px] text-purple-400 uppercase tracking-wider font-medium">Main Component</div>
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
              { label: "送信する", override: "", color: 'rgba(168,85,247,0.08)' },
              { label: "キャンセル", override: "文言変更", color: 'rgba(59,130,246,0.08)' },
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
                  <div className="text-[10px] text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
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
                src="/images/Figma1.png"
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

      <div className="rounded-xl p-6 mt-8" style={{ background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)', border: `1px solid ${d ? 'rgba(168,85,247,0.1)' : 'rgba(168,85,247,0.08)'}` }}>
        <div className="grid grid-cols-[440px_auto_1fr]">
          <div className="self-start">
            <div className="text-[13px] text-rose-400 font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              やりがちな失敗
            </div>
            <div className={`text-[13px] ${c.t4} space-y-2`}>
              <div>• プロパティ名を「左アイコン」など見た目の表現で付けてしまう問題</div>
              <div>• Label変更もVariant化してすべてをVariantで作ってしまう問題</div>
              <div>• プロパティが多すぎて使いにくく複雑なコンポーネントになる問題</div>
            </div>
          </div>

          <div className="text-[24px] text-purple-400 mr-10 self-center">→</div>

          <div className="self-start">
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
      </div>

      <Tip>プロパティで変更可能な部分を決めることで、デザインの一貫性を保ちながら柔軟に使える</Tip>
    </div>
  );
}

function CompVariantsButtonExampleSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg>ボタンコンポーネントを例に<strong>バリアントの実践的な使い方</strong>を理解する</Msg>

      {/* Naming Convention */}
      <div>
        <div className={`text-[16px] ${c.t2} font-semibold mb-3`}>
          1. バリアント命名規則
        </div>
        <div className={`text-[14px] ${c.t4} mb-3 leading-relaxed`}>
          <strong>Button/Primary/Large/Default/False</strong> という名前のコンポーネントは、次のようなプロパティと値を持つことになります：
          <div className="mt-2 pl-4 space-y-1">
            <div>• <strong>コンポーネントセット名:</strong> Button</div>
            <div>• <strong>Variant:</strong> Primary</div>
            <div>• <strong>Size:</strong> Large</div>
            <div>• <strong>State:</strong> Default</div>
            <div>• <strong>Icon:</strong> False</div>
          </div>
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
            src="/images/variant-naming.png"
            alt="バリアント命名規則"
          />
          <div
            className="absolute bottom-2 right-2 px-2 py-1 rounded text-[10px]"
            style={{
              background: 'rgba(0,0,0,0.6)',
              color: 'rgba(255,255,255,0.8)'
            }}
          >
            出典：Figma公式
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div>
        <div className={`text-[16px] ${c.t2} font-semibold mb-3 mt-10`}>
          2. グリッドで整理する
        </div>
        <div className={`text-[14px] ${c.t4} mb-3 leading-relaxed`}>
          特定のコンポーネント用のバリアントが多数ある場合は、コンポーネントを<strong>行、列、またはグリッドで整理</strong>すると良いでしょう。これにより、コンポーネントの多元的な性質をデザインシステムの使用者全員に伝えやすくなります。また、コンポーネントセットにテキストレイヤーを付加することで、関連するプロパティと値でアノテーションを行うことができます。
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
            src="/images/variant-grid.png"
            alt="バリアントのグリッド配置"
          />
          <div
            className="absolute bottom-2 right-2 px-2 py-1 rounded text-[10px]"
            style={{
              background: 'rgba(0,0,0,0.6)',
              color: 'rgba(255,255,255,0.8)'
            }}
          >
            出典：Figma公式
          </div>
        </div>
      </div>

      <Tip>スラッシュ区切りの命名規則を使用すると、Figmaが自動的にバリアントプロパティと値を認識して設定してくれる</Tip>
    </div>
  );
}

function CompVariantsPropertiesSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg>バリアントは<strong>プロパティと値の組み合わせ</strong>で構成される</Msg>
      <Points items={["プロパティ = コンポーネントの変数（例：サイズ、状態、色）","値 = 各プロパティの選択肢（例：Small, Medium, Large）","各バリアントの「プロパティと値の組み合わせ」は一意でなくてはならない"]} />

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
          {/* Property 1 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="px-3 py-1.5 rounded-lg text-[12px] font-semibold"
                style={{
                  background: d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)',
                  color: d ? '#c4b5fd' : '#7c3aed'
                }}
              >
                プロパティ 1
              </div>
              <ArrowRight className="w-5 h-5 text-purple-400" />
              <div className={`text-[13px] ${d ? 'text-purple-200' : 'text-purple-700'} font-semibold`}>
                Hierarchy（階層）
              </div>
            </div>
            <div className="flex gap-3">
              {['Primary', 'Secondary', 'Tertiary'].map((val, i) => (
                <div
                  key={val}
                  className="flex-1 rounded-xl p-4 text-center"
                  style={{
                    background: d ? 'rgba(168,85,247,0.08)' : 'rgba(168,85,247,0.06)',
                    border: `1px solid ${d ? 'rgba(168,85,247,0.25)' : 'rgba(168,85,247,0.2)'}`,
                    boxShadow: '0 2px 8px rgba(168,85,247,0.1)'
                  }}
                >
                  <div className={`text-[11px] ${c.t5} mb-2`}>値 {i + 1}</div>
                  <div className={`text-[13px] font-semibold ${d ? 'text-purple-200' : 'text-purple-700'}`}>
                    {val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Property 2 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="px-3 py-1.5 rounded-lg text-[12px] font-semibold"
                style={{
                  background: d ? 'rgba(59,130,246,0.2)' : 'rgba(59,130,246,0.15)',
                  color: d ? '#60a5fa' : '#3b82f6'
                }}
              >
                プロパティ 2
              </div>
              <ArrowRight className="w-5 h-5 text-blue-400" />
              <div className={`text-[13px] ${d ? 'text-blue-200' : 'text-blue-700'} font-semibold`}>
                Size（サイズ）
              </div>
            </div>
            <div className="flex gap-3">
              {['Small', 'Medium', 'Large'].map((val, i) => (
                <div
                  key={val}
                  className="flex-1 rounded-xl p-4 text-center"
                  style={{
                    background: d ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.06)',
                    border: `1px solid ${d ? 'rgba(59,130,246,0.25)' : 'rgba(59,130,246,0.2)'}`,
                    boxShadow: '0 2px 8px rgba(59,130,246,0.1)'
                  }}
                >
                  <div className={`text-[11px] ${c.t5} mb-2`}>値 {i + 1}</div>
                  <div className={`text-[13px] font-semibold ${d ? 'text-blue-200' : 'text-blue-700'}`}>
                    {val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Combination */}
          <div className="pt-4 border-t" style={{ borderColor: d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)' }}>
            <div className={`text-[13px] ${c.t3} mb-4 text-center`}>
              プロパティの組み合わせ = バリアント
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                ['Primary', 'Small'],
                ['Primary', 'Medium'],
                ['Secondary', 'Large']
              ].map((combo, i) => (
                <div
                  key={i}
                  className="rounded-lg p-3 text-center"
                  style={{
                    background: d ? 'rgba(16,185,129,0.08)' : 'rgba(16,185,129,0.06)',
                    border: `1px solid ${d ? 'rgba(16,185,129,0.25)' : 'rgba(16,185,129,0.2)'}`
                  }}
                >
                  <div className={`text-[11px] ${d ? 'text-emerald-300' : 'text-emerald-700'}`}>
                    {combo[0]} / {combo[1]}
                  </div>
                </div>
              ))}
              <div className={`text-[11px] ${c.t5} flex items-center justify-center`}>
                ...etc
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tip>プロパティ名は「内容を分かりやすく表した名前」を付ける（見た目ではなく意味）</Tip>
    </div>
  );
}

function CompVariantsCreateSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg>Figmaでバリアントを作成する<strong>実際の手順</strong></Msg>

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
          src="/images/variant-creation.gif"
          alt="バリアントの作成手順"
          style={{
            maxWidth: '100%',
            height: 'auto',
            display: 'block'
          }}
        />
        <div
          className="absolute bottom-2 right-2 px-2 py-1 rounded text-[10px]"
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
          新しいバリアントの作成方法
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
              <span>右クリック → [メインコンポーネント] → [バリアントを追加]</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-400">•</span>
              <span>右サイドバーの[プロパティ]セクションで<span className="font-mono bg-purple-500/10 px-1.5 py-0.5 rounded text-purple-400">+</span> → [バリアント]</span>
            </div>
          </div>
        </div>
      </div>

      <Tip>コンポーネントセットの下の<span className="font-mono bg-purple-500/10 px-1.5 py-0.5 rounded text-purple-400">+</span>をクリックして、さらにバリアントを追加できる</Tip>
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
          <div className={`text-[15px] ${c.t2} font-semibold mb-4`}>Slotの作り方</div>
          <div className={`text-[14px] ${c.t3} space-y-3`}>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0 text-[13px] text-purple-400 font-semibold mt-0.5">1</div>
              <div>
                <div className="font-medium mb-1">コンポーネント内にフレームを作成</div>
                <div className={`text-[13px] ${c.t4}`}>Slotとして使いたいエリアをフレームで作成します</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0 text-[13px] text-purple-400 font-semibold mt-0.5">2</div>
              <div>
                <div className="font-medium mb-1">右パネルで「Add slot」を選択</div>
                <div className={`text-[13px] ${c.t4}`}>レイヤーを選択した状態で、右パネルのContent欄から「Add slot」をクリック</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0 text-[13px] text-purple-400 font-semibold mt-0.5">3</div>
              <div>
                <div className="font-medium mb-1">インスタンス側で要素を配置</div>
                <div className={`text-[13px] ${c.t4}`}>Slotエリアにドラッグ&ドロップで任意の要素を配置できます</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div
            className="rounded-xl p-5"
            style={{
              background: d ? 'rgba(59,130,246,0.04)' : 'rgba(59,130,246,0.02)',
              border: `1px solid ${d ? 'rgba(59,130,246,0.2)' : 'rgba(59,130,246,0.15)'}`
            }}
          >
            <div className="text-[13px] text-blue-400 font-semibold mb-3 flex items-center gap-2">
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
              background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
              border: `1px solid ${d ? 'rgba(168,85,247,0.15)' : 'rgba(168,85,247,0.1)'}`
            }}
          >
            <div className={`text-[13px] text-purple-400 font-semibold mb-3`}>Slotの利点</div>
            <div className={`text-[13px] ${c.t4} space-y-2`}>
              <div>• どんな要素でも差し込める柔軟性</div>
              <div>• プロパティよりも自由度が高い</div>
              <div>• ネストしたコンポーネントも配置可</div>
              <div>• オートレイアウトと組み合わせ可</div>
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
      <Msg>バリアントを効果的に使う<strong>ベストプラクティス</strong></Msg>

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
              <span className="text-[11px] text-rose-400 font-medium">悪い例</span>
            </div>
            <div className="flex gap-2">
              {['Variant1', 'Variant2', 'Variant3'].map(name => (
                <div
                  key={name}
                  className="px-2.5 py-1.5 rounded text-[10px] flex-1 text-center"
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
              <span className="text-[11px] text-emerald-400 font-medium">良い例</span>
            </div>
            <div className="flex gap-2">
              {['Hierarchy', 'Size', 'State'].map(name => (
                <div
                  key={name}
                  className="px-2.5 py-1.5 rounded text-[10px] flex-1 text-center"
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
              バリアント vs プロパティ
            </div>
          </div>

          {/* Variant Example */}
          <div className="mb-3">
            <div className="text-[11px] text-purple-400 font-medium mb-2">バリアント：見た目が変わる</div>
            <div className="flex gap-2">
              <div
                className="flex-1 rounded-lg px-3 py-2 text-[10px] text-center text-white"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
              >
                Default
              </div>
              <div
                className="flex-1 rounded-lg px-3 py-2 text-[10px] text-center text-white"
                style={{ background: 'linear-gradient(135deg, #6d28d9, #7c3aed)' }}
              >
                Hover
              </div>
              <div
                className="flex-1 rounded-lg px-3 py-2 text-[10px] text-center"
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
            <div className="text-[11px] text-blue-400 font-medium mb-2">プロパティ：値が変わる</div>
            <div className="space-y-1.5">
              <div
                className="rounded-lg px-3 py-2 text-[10px] text-center"
                style={{
                  background: d ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.06)',
                  border: `1px solid ${d ? 'rgba(59,130,246,0.2)' : 'rgba(59,130,246,0.15)'}`,
                  color: d ? '#60a5fa' : '#2563eb'
                }}
              >
                Label = "送信"
              </div>
              <div
                className="rounded-lg px-3 py-2 text-[10px] text-center"
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
              バリアント数を適切に保つ
            </div>
          </div>

          <div className="space-y-3">
            {/* Too Many Variants */}
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <XCircle className="w-3.5 h-3.5 text-rose-400" />
                <span className="text-[10px] text-rose-400 font-medium">3軸 × 3値 × アイコン有無 = 54バリアント 😱</span>
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
                <span className="text-[10px] text-emerald-400 font-medium">3軸 × 3値 + Boolean = 27バリアント ✨</span>
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
              デフォルトバリアントを設定
            </div>
          </div>

          <div className="space-y-3">
            <div className={`text-[11px] ${c.t4}`}>
              最もよく使うバリアントをデフォルトに設定
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
                <span className={`text-[11px] font-semibold ${d ? 'text-purple-200' : 'text-purple-700'}`}>
                  Default Variant
                </span>
              </div>
              <div className="space-y-1.5">
                <div className={`text-[10px] ${d ? 'text-purple-100' : 'text-purple-900'}`}>
                  <span className="font-mono bg-purple-500/10 px-1.5 py-0.5 rounded">Priority</span> = Primary
                </div>
                <div className={`text-[10px] ${d ? 'text-purple-100' : 'text-purple-900'}`}>
                  <span className="font-mono bg-purple-500/10 px-1.5 py-0.5 rounded">Size</span> = Medium
                </div>
                <div className={`text-[10px] ${d ? 'text-purple-100' : 'text-purple-900'}`}>
                  <span className="font-mono bg-purple-500/10 px-1.5 py-0.5 rounded">State</span> = Default
                </div>
              </div>
            </div>

            <div className={`text-[10px] ${c.t5} text-center`}>
              インスタンス挿入時の手間が減る
            </div>
          </div>
        </div>
      </div>

      <Tip>バリアントは「状態モデルの可視化」— 実装と1対1対応するように設計すると、開発者とのコミュニケーションが円滑になる</Tip>
    </div>
  );
}

function CompVariantsSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg>バリアントは、同じコンポーネントの<strong>状態や種類を管理する</strong>仕組み</Msg>
      <Points items={["state、size、hierarchy などを軸として持たせる","アイコンの有無や文言差し替えはプロパティで持つ","すべてをバリアント化しない","バリアントはUIの状態モデルを表す"]} />
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
        <div className={`text-[11px] ${c.t5} mt-3 text-center`}>+ size (Small / Medium / Large) で3次元のマトリクスになる</div>
      </Vis>
      <Tip>「見た目が変わるならバリアント、値が変わるならプロパティ」が基本の判断軸</Tip>
    </div>
  );
}

function VarBasicsSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg>バリアブルを使えば、<strong>値を1箇所変えるだけで複数の場所に一括反映</strong>できる</Msg>
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
              <div className={`text-[10px] ${c.t5} font-mono`}>#7c3aed</div>
            </div>

            <div className="text-center">
              <div className={`mb-2 text-[16px] font-bold`} style={{ color: '#7c3aed' }}>
                見出し
              </div>
              <div className={`text-[10px] ${c.t5} font-mono`}>#7c3aed</div>
            </div>

            <div className="text-center">
              <div className="mb-2 w-10 h-10 rounded-lg flex items-center justify-center mx-auto" style={{ background: '#7c3aed' }}>
                <Star className="w-5 h-5 text-white" />
              </div>
              <div className={`text-[10px] ${c.t5} font-mono`}>#7c3aed</div>
            </div>
          </div>

          <div className={`text-[13px] ${c.t4} text-center`}>
            😰 色を変えたい → 全部探して1つずつ修正...
          </div>
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-center">
          <div className={`text-[14px] ${c.t4} font-semibold`}>バリアブル化</div>
          <ChevronRight className={`w-5 h-5 ${c.t4} mx-2`} />
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
            <div className={`text-[14px] font-semibold ${c.t2}`}>After: バリアブルで管理</div>
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
        <div className={`text-[13px] ${c.t2} font-semibold mb-2`}>スタイルとバリアブルの違い</div>
        <div className={`text-[13px] ${c.t4} space-y-1`}>
          <div>• <strong>スタイル</strong> = 見た目のセット（複数の設定をまとめる）</div>
          <div>• <strong>バリアブル</strong> = 1つの値（色だけ、サイズだけ）</div>
          <div className={`text-[12px] ${c.t5} mt-2 pl-4`}>例: 料理の「レシピ」 vs 「食材」</div>
        </div>
      </div>

      <Tip>バリアブルは「値の一元管理」— 変更に強いデザインの基礎</Tip>
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
            <div className={`text-[11px] ${c.t5} mt-3`}>※ 実際の色コードを定義</div>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center gap-2">
            <div className={`text-[12px] ${c.t5}`}>alias（参照）</div>
            <ChevronRight className={`w-4 h-4 ${c.t5}`} />
          </div>

          {/* Layer 2: Semantic */}
          <div
            className="rounded-2xl p-5"
            style={{
              background: d ? 'rgba(16,185,129,0.06)' : 'rgba(16,185,129,0.04)',
              border: `1px solid ${d ? 'rgba(16,185,129,0.2)' : 'rgba(16,185,129,0.15)'}`,
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className={`text-[13px] font-semibold ${d ? 'text-emerald-300' : 'text-emerald-600'}`}>2層目: Semantic（意味のある名前）</div>
            </div>
            <div className="space-y-2">
              <div className={`text-[12px] ${d ? 'text-emerald-300' : 'text-emerald-700'} font-mono flex items-center gap-2`}>
                <div className="w-8 h-8 rounded" style={{ background: '#7c3aed' }} />
                color/primary = purple-500
              </div>
              <div className={`text-[12px] ${d ? 'text-emerald-300' : 'text-emerald-700'} font-mono flex items-center gap-2`}>
                <div className="w-8 h-8 rounded" style={{ background: '#10b981' }} />
                color/success = green-500
              </div>
              <div className={`text-[12px] ${d ? 'text-emerald-300' : 'text-emerald-700'} font-mono flex items-center gap-2`}>
                <div className="w-8 h-8 rounded" style={{ background: '#f3f4f6' }} />
                color/background = gray-100
              </div>
            </div>
            <div className={`text-[11px] ${c.t5} mt-3`}>※ 役割で名前をつける</div>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center gap-2">
            <div className={`text-[12px] ${c.t5}`}>適用</div>
            <ChevronRight className={`w-4 h-4 ${c.t5}`} />
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
              <div className={`text-[11px] ${c.t5}`}>背景 = color/primary</div>
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
            バリアブルは、<strong>1つの名前に複数の値を持てる仕組み</strong>です。
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
            フレームをDarkにすると、その中のレイヤーは自動でDarkの値を使います。
          </div>
        </div>

        <div className="w-full rounded-2xl overflow-hidden relative">
          <ExpandableImage
            src="/images/variable-mode.gif"
            alt="バリアブルのモード切り替え"
          />
          <div
            className="absolute bottom-2 right-2 px-2 py-1 rounded text-[10px]"
            style={{
              background: 'rgba(0,0,0,0.6)',
              color: 'rgba(255,255,255,0.8)'
            }}
          >
            出典：Figma公式
          </div>
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
      <Points items={["エイリアス = あるトークンが別のトークンの値を引き継ぐこと","元の値を変えると、参照している全てのトークンも自動更新される","スタイルと違い、バリアブルは他のバリアブルを参照できる"]} />

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
            src="/images/alias-part2.png"
            alt="トークンの定義"
          />
          <div
            className="absolute bottom-2 right-2 px-2 py-1 rounded text-[10px]"
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
            src="/images/alias-part1.png"
            alt="エイリアスの動作"
          />
          <div
            className="absolute bottom-2 right-2 px-2 py-1 rounded text-[10px]"
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
        <div className={`text-[14px] ${c.t2} font-semibold`}>2. スタイルとバリアブルの違い</div>
        <div className={`text-[13px] ${c.t4} leading-relaxed space-y-3`}>
          <div>
            <strong>スタイルはこのエイリアスに対応していません</strong>。スタイルは、他のスタイルやバリアブルを"参照してつながる"しくみが弱いです。
          </div>
          <div>
            一方で<strong>バリアブルは、他のバリアブルを参照できる</strong>ので、もっと大きくて整理された仕組みを作れます。
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
                  バリアブル
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
          <div className={`text-right text-[11px] ${c.t4} mt-2`}>
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
            src="/images/variables-explain-1.gif"
            alt="トークンの階層構造"
          />
          <div
            className="absolute bottom-2 right-2 px-2 py-1 rounded text-[10px]"
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
            src="/images/variables-explain-2.gif"
            alt="部分的な変更"
          />
          <div
            className="absolute bottom-2 right-2 px-2 py-1 rounded text-[10px]"
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
            つまりバリアブルは、<strong>「まず共通のルールを作って、必要なところへつなげる」</strong>のが得意です。
          </div>
          <div>
            そのおかげで、デザインが大きくなっても、変更しやすく、壊れにくく、管理もしやすい仕組みを作れます。
          </div>
          <div className={`text-[12px] ${c.t5}`}>
            Figmaの記事でも、バリアブルはエイリアシングによって複雑で拡張可能なトークン構造を支え、更新や管理を効率的にできると説明されています。
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
      <Points items={["コンポーネント、スタイル、バリアブルを共有する","一貫性を保ちやすくする","新しく入った人が判断基準を理解しやすくなる"]} />
      <Vis>
        <Label>1つのライブラリから複数ファイルへ</Label>
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-xl px-6 py-4 flex items-center gap-3 shadow-sm" style={{ background: "rgba(168,85,247,0.1)", border: "2px solid rgba(168,85,247,0.2)" }}>
            <BookOpen className="w-5 h-5 text-purple-400" />
            <div>
              <div className={`text-[14px] font-medium ${d ? "text-purple-200" : "text-purple-700"}`}>Design System Library</div>
              <div className="text-[11px] text-purple-400">Components + Styles + Variables</div>
            </div>
          </div>
          <div className="flex gap-2">{[0,1,2].map((i) => <div key={i} className="w-px h-6 bg-purple-500/20" />)}</div>
          <div className="flex gap-4">
            {["プロダクトA","プロダクトB","LP・マーケ"].map((name) => (
              <div key={name} className="rounded-xl px-4 py-3 text-center shadow-sm" style={{ background: c.glass2, border: c.glassBd }}>
                <div className={`text-[12px] ${c.t3}`}>{name}</div>
                <div className={`text-[10px] ${c.t5} mt-0.5`}>Figma file</div>
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
          {/* Publish Library Modal (Figma UI Mock) */}
          <div className="space-y-3">
            <div className="text-[13px] text-purple-400 mb-2 font-medium">1. Publish Library（公開）</div>
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: d ? '#2c2c2c' : '#f5f5f5',
                border: `1px solid ${d ? '#3c3c3c' : '#e0e0e0'}`,
                boxShadow: d ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.1)'
              }}
            >
              {/* Modal Header */}
              <div
                className="px-4 py-3 flex items-center justify-between"
                style={{
                  background: d ? '#1e1e1e' : '#ffffff',
                  borderBottom: `1px solid ${d ? '#3c3c3c' : '#e0e0e0'}`
                }}
              >
                <div className={`text-[13px] font-semibold ${d ? 'text-white' : 'text-gray-900'}`}>
                  Publish library
                </div>
                <div className="w-3 h-3 rounded-full bg-gray-500" />
              </div>

              {/* Changes List */}
              <div className="p-4 space-y-2">
                <div className={`text-[11px] ${d ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
                  3 changes will be published
                </div>

                {[
                  { type: 'Modified', icon: '🔄', name: 'Button', color: d ? '#60a5fa' : '#3b82f6' },
                  { type: 'Added', icon: '✨', name: 'Alert', color: d ? '#34d399' : '#10b981' },
                  { type: 'Modified', icon: '🔄', name: 'color/primary', color: d ? '#60a5fa' : '#3b82f6' },
                ].map((change, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-2 py-1.5 rounded"
                    style={{ background: d ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }}
                  >
                    <span className="text-[14px]">{change.icon}</span>
                    <span className={`text-[12px] ${d ? 'text-gray-300' : 'text-gray-700'}`}>
                      {change.name}
                    </span>
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded ml-auto"
                      style={{
                        background: change.color + '20',
                        color: change.color
                      }}
                    >
                      {change.type}
                    </span>
                  </div>
                ))}
              </div>

              {/* Description Field */}
              <div className="px-4 pb-4">
                <div className={`text-[11px] ${d ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                  Describe your changes
                </div>
                <div
                  className="rounded px-3 py-2 text-[12px]"
                  style={{
                    background: d ? '#1e1e1e' : '#ffffff',
                    border: `1px solid ${d ? '#3c3c3c' : '#d0d0d0'}`,
                    color: d ? '#a0a0a0' : '#666666'
                  }}
                >
                  Buttonのpaddingを調整<br />
                  Alertコンポーネントを追加
                </div>
              </div>

              {/* Publish Button */}
              <div className="px-4 pb-4">
                <div
                  className="w-full py-2 rounded-lg text-[13px] font-medium text-white text-center cursor-pointer"
                  style={{
                    background: '#7c3aed',
                    boxShadow: '0 2px 8px rgba(124,58,237,0.3)'
                  }}
                >
                  Publish library
                </div>
              </div>
            </div>
          </div>

          {/* Update Library Panel (Figma UI Mock) */}
          <div className="space-y-3">
            <div className={`text-[13px] ${d ? 'text-blue-400' : 'text-blue-600'} mb-2 font-medium`}>2. Update Library（取り込み）</div>
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: d ? '#2c2c2c' : '#f5f5f5',
                border: `1px solid ${d ? '#3c3c3c' : '#e0e0e0'}`,
                boxShadow: d ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.1)'
              }}
            >
              {/* Panel Header */}
              <div
                className="px-4 py-3"
                style={{
                  background: d ? '#1e1e1e' : '#ffffff',
                  borderBottom: `1px solid ${d ? '#3c3c3c' : '#e0e0e0'}`
                }}
              >
                <div className={`text-[13px] font-semibold ${d ? 'text-white' : 'text-gray-900'}`}>
                  Library updates available
                </div>
                <div className={`text-[11px] ${d ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                  Design System Library
                </div>
              </div>

              {/* Update List */}
              <div className="p-4 space-y-2">
                {[
                  { checked: true, type: 'Button', desc: 'Buttonのpaddingを調整', instances: 12 },
                  { checked: true, type: 'Alert', desc: 'Alertコンポーネントを追加', instances: 0 },
                  { checked: false, type: 'color/primary', desc: '色を変更', instances: 48 },
                ].map((update, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 px-2 py-2 rounded"
                    style={{ background: d ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }}
                  >
                    <div
                      className="w-4 h-4 rounded flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        background: update.checked ? '#7c3aed' : (d ? '#3c3c3c' : '#d0d0d0'),
                        border: `1px solid ${update.checked ? '#7c3aed' : (d ? '#4c4c4c' : '#b0b0b0')}`
                      }}
                    >
                      {update.checked && <CheckCircle className="w-3 h-3 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-[12px] font-medium ${d ? 'text-gray-300' : 'text-gray-700'}`}>
                        {update.type}
                      </div>
                      <div className={`text-[11px] ${d ? 'text-gray-500' : 'text-gray-500'} mt-0.5`}>
                        {update.desc}
                      </div>
                      <div className={`text-[10px] ${d ? 'text-gray-600' : 'text-gray-400'} mt-1`}>
                        {update.instances} instances
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Update Button */}
              <div className="px-4 pb-4 flex gap-2">
                <div
                  className="flex-1 py-2 rounded-lg text-[12px] font-medium text-center cursor-pointer"
                  style={{
                    background: d ? '#3c3c3c' : '#e0e0e0',
                    color: d ? '#a0a0a0' : '#666666'
                  }}
                >
                  Review
                </div>
                <div
                  className="flex-1 py-2 rounded-lg text-[12px] font-medium text-white text-center cursor-pointer"
                  style={{
                    background: '#7c3aed',
                    boxShadow: '0 2px 8px rgba(124,58,237,0.3)'
                  }}
                >
                  Update
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl p-6 mt-8" style={{ background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)', border: `1px solid ${d ? 'rgba(168,85,247,0.1)' : 'rgba(168,85,247,0.08)'}` }}>
        <div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-center">
          <div>
            <div className="text-[13px] text-rose-400 font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              やりがちな失敗
            </div>
            <div className={`text-[14px] ${c.t4} space-y-2`}>
              <div>• 変更内容を説明せずにPublishしてしまう</div>
              <div>• Breaking changeを告知せずにリリースしてしまう</div>
              <div>• 全ての更新を無条件にUpdateしてしまう（レビュー不足）</div>
            </div>
          </div>

          <div className="text-[24px] text-purple-400 mr-4">→</div>

          <div>
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
                <div className={`text-[10px] ${c.t5} mt-0.5`}>{step.sub}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </Vis>
      <Ng>更新説明なしの Publish は、コミットメッセージなしの push と同じ</Ng>
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
      <Points items={["Primitive / Semantic / Component の3階層で設計する","トークン = 概念。バリアブル = Figma上での実装手段"]} />
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
                  <span className="text-[11px] opacity-60">{tier.desc}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tier.examples.map((ex) => (
                    <span key={ex} className={`text-[11px] ${d ? "bg-white/5" : "bg-black/5"} rounded-lg px-2 py-0.5`}>{ex}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Vis>
      <Tip>Figmaのバリアブルは、トークンの「実装手段」。概念を先に整理してからFigmaに落とす</Tip>
    </div>
  );
}

function TokenSemanticSlide() {
  const theme = useTheme();
  const c = tc(theme);
  return (
    <div className="space-y-10">
      <Msg>色は<strong>「何色か」ではなく「何のための色か」</strong>で扱う</Msg>
      <Points items={["text / bg / border の3分類がベース","デザイナーは色番号ではなく役割を選ぶ"]} />
      <Vis>
        <Label>テキスト / 背景 / ボーダーの3分類</Label>
        <div className="space-y-5">
          {[
            { title: "✍️ Text", items: [
              { name: "default", hex: "#F9FAFB" },{ name: "subtle", hex: "#9CA3AF" },{ name: "disabled", hex: "#4B5563" },{ name: "inverse", hex: "#111827" },{ name: "link", hex: "#A855F7" },{ name: "error", hex: "#EF4444" },
            ]},
            { title: "🖼 Background", items: [
              { name: "canvas", hex: "#0C0C18" },{ name: "surface", hex: "#16132A" },{ name: "elevated", hex: "#1E1B2E" },{ name: "primary", hex: "#7C3AED" },{ name: "error", hex: "#450A0A" },{ name: "success", hex: "#052E16" },
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
                    <span className={`text-[11px] ${c.t4}`}>{group.title.includes("Text") ? "text" : group.title.includes("Background") ? "bg" : "border"}/{ci.name}</span>
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
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1 rounded">text/default</span> メールアドレス
          </div>
          <div className="border-2 rounded-lg px-3 py-2 flex items-center gap-2 border-purple-400" style={{ background: c.glass }}>
            <span className={`text-[12px] ${c.t2}`}>user@example.com</span>
            <span className="text-[10px] text-purple-400 bg-purple-500/10 px-1 rounded ml-auto">border/focus</span>
          </div>
          <div className="text-[11px] text-red-400 flex items-center gap-1">
            <span className="text-[10px] text-red-400 bg-red-500/10 px-1 rounded">text/error</span> 有効なメールアドレスを入力してください
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
      <Ng>「同じ色だから同じトークン」はNG。色が同じでも意味が違えば別トークンにする</Ng>
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
                <div className={`text-[10px] ${c.t5}`}>{t.desc}</div>
              </div>
              <div className="flex-1 min-w-0">
                <span style={{ fontSize: t.size, fontWeight: t.weight, lineHeight: t.lh }} className={d ? "text-gray-100" : "text-gray-800"}>{t.sample}</span>
              </div>
              <div className={`text-[10px] ${c.t5} shrink-0 text-right`}>{t.size} / {t.lh}</div>
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

function AlRealExampleSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg>実際のカードコンポーネントで<strong>オートレイアウトの威力</strong>を確認する</Msg>
      <Points items={["画像・タイトル・説明文・ボタンを持つカード","文言変更や画像サイズ変更に自動対応","一度構造を作れば、あとは中身を変えるだけ"]} />

      <div className="w-full">
        <div className="grid grid-cols-2 gap-8">
          {/* 失敗例 */}
          <div className="space-y-3">
            <div className={`text-[13px] text-rose-400 mb-2 font-medium flex items-center gap-2`}>
              <XCircle className="w-4 h-4" />
              <span>失敗例：手動配置</span>
            </div>
            <div
              className="h-[380px] rounded-2xl p-5 relative"
              style={{
                background: c.sub,
                border: `1px solid ${c.bd1}`,
                boxShadow: d ? '0 4px 24px rgba(0,0,0,0.2)' : '0 4px 24px rgba(0,0,0,0.06)'
              }}
            >
              {/* 画像部分 */}
              <div className={`absolute top-5 left-5 right-5 h-32 rounded-lg ${c.b2}`} />

              {/* タイトル */}
              <div className={`absolute top-[156px] left-5 text-[15px] ${c.t2} font-semibold`}>
                商品名がここに入る
              </div>

              {/* 説明文 */}
              <div className={`absolute top-[184px] left-5 right-5 text-[14px] ${c.t4} leading-relaxed`}>
                この商品の説明文がここに表示されます。
              </div>

              {/* 価格 */}
              <div className={`absolute top-[232px] left-5 text-[18px] ${c.t2} font-bold`}>
                ¥2,980
              </div>

              {/* ボタン */}
              <div className={`absolute bottom-5 left-5 right-5 h-10 ${c.b1} rounded-lg flex items-center justify-center text-[13px] ${c.t3} font-medium`}>
                カートに追加
              </div>

              {/* 警告マーク */}
              <div className="absolute top-[210px] right-5">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
              </div>
            </div>
            <div className={`text-[11px] text-rose-400 text-center`}>
              文言が増えると重なって崩壊 💥
            </div>
          </div>

          {/* 成功例 */}
          <div className="space-y-3">
            <div className="text-[13px] text-purple-400 mb-2 font-medium flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>成功例：オートレイアウト</span>
            </div>
            <div
              className="h-[380px] rounded-2xl p-5 flex flex-col gap-3"
              style={{
                background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
                border: `2px solid ${d ? 'rgba(168,85,247,0.25)' : 'rgba(168,85,247,0.2)'}`,
                boxShadow: d
                  ? '0 8px 32px rgba(168,85,247,0.2), 0 0 0 1px rgba(168,85,247,0.1) inset'
                  : '0 8px 32px rgba(168,85,247,0.15), 0 0 0 1px rgba(255,255,255,0.6) inset'
              }}
            >
              {/* 画像部分 */}
              <div
                className="w-full h-32 rounded-lg shrink-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(168,85,247,0.1))',
                  border: `1px solid ${d ? 'rgba(168,85,247,0.3)' : 'rgba(168,85,247,0.2)'}`
                }}
              />

              {/* コンテンツ */}
              <div className="flex-1 flex flex-col gap-2">
                <div className={`text-[15px] ${d ? 'text-purple-200' : 'text-purple-700'} font-semibold`}>
                  商品名がここに入る
                </div>
                <div className={`text-[12px] ${d ? c.t4 : 'text-purple-600'} leading-relaxed flex-1`}>
                  この商品の説明文がここに表示されます。文量が増えても自動的にレイアウトが調整されます。
                </div>
                <div className={`text-[18px] ${d ? 'text-purple-200' : 'text-purple-700'} font-bold`}>
                  ¥2,980
                </div>
              </div>

              {/* ボタン */}
              <div
                className="w-full h-10 rounded-lg flex items-center justify-center text-[13px] text-white font-medium shrink-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(168,85,247,0.6), rgba(168,85,247,0.5))',
                  boxShadow: '0 4px 12px rgba(168,85,247,0.3)'
                }}
              >
                カートに追加
              </div>

              {/* スペーシング表示 */}
              <div className="absolute left-1 top-5 bottom-5 flex flex-col justify-around items-start">
                <div className="text-[8px] text-purple-400/50 font-mono">12</div>
                <div className="text-[8px] text-purple-400/50 font-mono">8</div>
                <div className="text-[8px] text-purple-400/50 font-mono">12</div>
              </div>
            </div>
            <div className="text-[11px] text-purple-400 text-center font-medium">
              文言が変わっても構造を維持 ✨
            </div>
          </div>
        </div>
      </div>

      <Tip>カードのような複合コンポーネントこそ、オートレイアウトの真価が発揮される</Tip>
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
      <Points items={["Primary / Secondary / Danger の3つの階層","Default / Hover / Disabled の3つの状態","size（Small / Medium / Large）をバリアントで管理"]} />

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

      <div className="rounded-xl p-6 mt-8" style={{ background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)', border: `1px solid ${d ? 'rgba(168,85,247,0.1)' : 'rgba(168,85,247,0.08)'}` }}>
        <div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-center">
          <div>
            <div className="text-[13px] text-rose-400 font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              やりがちな失敗
            </div>
            <div className={`text-[14px] ${c.t4} space-y-2`}>
              <div>• Primary と Secondary の使い分けがない（全部同じ見た目）</div>
              <div>• Hover や Disabled 状態を設計していない</div>
              <div>• サイズバリエーションを個別コンポーネントで作ってしまう</div>
            </div>
          </div>

          <div className="text-[24px] text-purple-400 mr-4">→</div>

          <div>
            <div className="text-[13px] text-emerald-400 font-semibold mb-3 flex items-center gap-2">
              <span>✓</span>
              おすすめのやり方
            </div>
            <div className={`text-[14px] ${c.t4} space-y-2`}>
              <div>• 階層（Primary/Secondary/Tertiary）で役割を明確に</div>
              <div>• 全ての状態（Hover/Active/Disabled）を設計する</div>
              <div>• バリアントで統一的にサイズ管理する</div>
            </div>
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
            src="/images/button実例.svg"
            alt="LYでのDesign Systemの一例"
          />
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
      <Msg>実際のカラーシステムで<strong>バリアブルの価値</strong>を体感する</Msg>
      <Points items={["Primitive（生の値）→ Semantic（意味のある名前）の2層構造","Primary / Success / Warning / Error の4つのセマンティックカラー","Light / Dark モードに対応"]} />

      <div
        className="w-full rounded-2xl p-8 space-y-6"
        style={{
          background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)',
          border: `2px solid ${d ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
          boxShadow: d
            ? '0 8px 32px rgba(168,85,247,0.15), 0 0 0 1px rgba(168,85,247,0.1) inset'
            : '0 8px 32px rgba(168,85,247,0.12), 0 0 0 1px rgba(255,255,255,0.6) inset'
        }}
      >
        {/* Primitive tokens */}
        <div>
          <div className="text-[11px] text-purple-400 uppercase tracking-wider font-medium mb-3">Primitive Tokens（基礎値）</div>
          <div className="grid grid-cols-5 gap-3">
            {[
              { name: 'purple-500', hex: '#a855f7', bg: '#a855f7' },
              { name: 'green-500', hex: '#22c55e', bg: '#22c55e' },
              { name: 'amber-500', hex: '#f59e0b', bg: '#f59e0b' },
              { name: 'red-500', hex: '#ef4444', bg: '#ef4444' },
              { name: 'gray-500', hex: '#6b7280', bg: '#6b7280' },
            ].map((token) => (
              <div key={token.name} className="space-y-2">
                <div
                  className="w-full h-16 rounded-lg"
                  style={{
                    background: token.bg,
                    boxShadow: `0 4px 12px ${token.bg}40`
                  }}
                />
                <div className={`text-[10px] ${c.t5} font-mono text-center`}>{token.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <ArrowDown className="w-6 h-6 text-purple-400" />
        </div>

        {/* Semantic tokens */}
        <div>
          <div className="text-[11px] text-purple-400 uppercase tracking-wider font-medium mb-3">Semantic Tokens（意味のある名前）</div>
          <div className="grid grid-cols-4 gap-4">
            {[
              { name: 'Primary', desc: 'ブランドカラー', primitive: 'purple-500', bg: '#a855f7', text: 'white' },
              { name: 'Success', desc: '成功・完了', primitive: 'green-500', bg: '#22c55e', text: 'white' },
              { name: 'Warning', desc: '注意・警告', primitive: 'amber-500', bg: '#f59e0b', text: 'white' },
              { name: 'Error', desc: 'エラー・危険', primitive: 'red-500', bg: '#ef4444', text: 'white' },
            ].map((token) => (
              <div
                key={token.name}
                className="rounded-xl p-4"
                style={{
                  background: d ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.5)',
                  border: `1px solid ${d ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`
                }}
              >
                <div
                  className="w-full h-20 rounded-lg flex items-center justify-center text-[14px] font-semibold mb-3"
                  style={{
                    background: token.bg,
                    color: token.text,
                    boxShadow: `0 4px 12px ${token.bg}40`
                  }}
                >
                  {token.name}
                </div>
                <div className={`text-[11px] ${c.t4} text-center mb-1`}>{token.desc}</div>
                <div className={`text-[9px] ${c.t5} text-center font-mono`}>= {token.primitive}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl p-6 mt-8" style={{ background: d ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.02)', border: `1px solid ${d ? 'rgba(168,85,247,0.1)' : 'rgba(168,85,247,0.08)'}` }}>
        <div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-center">
          <div>
            <div className="text-[13px] text-rose-400 font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              やりがちな失敗
            </div>
            <div className={`text-[14px] ${c.t4} space-y-2`}>
              <div>• HEXコードを直接使ってしまう（#7c3aed をベタ書き）</div>
              <div>• 色名でトークン化してしまう（button-purple, text-blue など）</div>
              <div>• 全ての色にトークンを作ってしまう（管理コストが増大）</div>
            </div>
          </div>

          <div className="text-[24px] text-purple-400 mr-4">→</div>

          <div>
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
      </div>

      <Tip>色は「purple」「blue」ではなく、「primary」「success」で管理する</Tip>
    </div>
  );
}

function WorkflowExampleSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";
  return (
    <div className="space-y-10">
      <Msg>デザインシステムが<strong>実務でどう機能するか</strong>を理解する</Msg>
      <Points items={["デザイナーはコンポーネントとトークンで設計","エンジニアは同じトークン名でコードを実装","変更時は一箇所の修正で全体に反映"]} />

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
          {/* Designer */}
          <div className="flex items-start gap-6">
            <div className="w-32 shrink-0">
              <div className="text-[13px] text-purple-400 font-semibold mb-1">1. デザイナー</div>
              <div className={`text-[11px] ${c.t5}`}>Figmaで設計</div>
            </div>
            <div
              className="flex-1 rounded-xl p-5"
              style={{
                background: d ? 'rgba(168,85,247,0.08)' : 'rgba(168,85,247,0.06)',
                border: `1px solid ${d ? 'rgba(168,85,247,0.25)' : 'rgba(168,85,247,0.2)'}`,
                boxShadow: '0 4px 16px rgba(168,85,247,0.1)'
              }}
            >
              <div className={`text-[12px] ${d ? 'text-purple-300' : 'text-purple-700'} font-mono space-y-2`}>
                <div>• Button コンポーネント使用</div>
                <div>• color/primary トークン適用</div>
                <div>• space/4（16px）で余白設定</div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <ArrowDown className="w-6 h-6 text-purple-400" />
          </div>

          {/* Engineer */}
          <div className="flex items-start gap-6">
            <div className="w-32 shrink-0">
              <div className={`text-[13px] ${d ? 'text-blue-400' : 'text-blue-600'} font-semibold mb-1`}>2. エンジニア</div>
              <div className={`text-[11px] ${c.t5}`}>コードで実装</div>
            </div>
            <div
              className="flex-1 rounded-xl p-5"
              style={{
                background: d ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.06)',
                border: `1px solid ${d ? 'rgba(59,130,246,0.25)' : 'rgba(59,130,246,0.2)'}`,
                boxShadow: '0 4px 16px rgba(59,130,246,0.1)'
              }}
            >
              <div className={`text-[12px] ${d ? 'text-blue-300' : 'text-blue-700'} font-mono space-y-2`}>
                <div>{'<Button variant="primary">'}</div>
                <div className="pl-4">送信する</div>
                <div>{'</Button>'}</div>
                <div className="text-[10px] opacity-70 mt-2">※ 同じトークン名を使用</div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <ArrowDown className="w-6 h-6 text-purple-400" />
          </div>

          {/* Update */}
          <div className="flex items-start gap-6">
            <div className="w-32 shrink-0">
              <div className={`text-[13px] ${d ? 'text-emerald-400' : 'text-emerald-600'} font-semibold mb-1`}>3. 変更時</div>
              <div className={`text-[11px] ${c.t5}`}>一箇所の修正</div>
            </div>
            <div
              className="flex-1 rounded-xl p-5"
              style={{
                background: d ? 'rgba(16,185,129,0.08)' : 'rgba(16,185,129,0.06)',
                border: `1px solid ${d ? 'rgba(16,185,129,0.25)' : 'rgba(16,185,129,0.2)'}`,
                boxShadow: '0 4px 16px rgba(16,185,129,0.1)'
              }}
            >
              <div className={`text-[12px] ${d ? 'text-emerald-300' : 'text-emerald-700'} space-y-2`}>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-mono">color/primary の値を変更</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  <span>Figmaとコード両方に自動反映</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>全てのボタンが一括で更新される</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl p-5 text-center" style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7, #c084fc)' }}>
        <div className="text-white text-[15px] leading-relaxed">
          デザインシステムは「作業を楽にする」ためではなく<br />
          <strong className="text-[17px]">「チームの共通言語を作る」</strong>ため
        </div>
      </div>
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
            <div className={`text-[11px] ${c.t5} mt-2`}>サイズ・線幅・メタファーを統一</div>
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
                <div key={e.l} className={`w-14 h-14 rounded-xl flex items-center justify-center text-[11px] ${c.t4}`} style={{ boxShadow: e.s, background: c.glass3 }}>Lv.{e.l}</div>
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
                  <div className={`text-[10px] ${c.t5} mt-1`}>{item.label}</div>
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
                  <div className={`w-6 text-[10px] ${c.t5} text-right`}>{s.label}</div>
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
            { icon: <Layers className="w-4 h-4" />, label: "オートレイアウト", sub: "関係性を設計する" },
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
      <div className="text-white rounded-2xl px-8 py-6 text-center" style={{ background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)" }}>
        <div className="text-[17px] leading-relaxed max-w-lg mx-auto">
          「きれいに作れること」より<br />
          <strong className="text-[19px]">「変更・共有・運用に耐えられること」</strong><br />
          が、実務では強いデザイン
        </div>
      </div>
    </div>
  );
}


function ProductListPracticeSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";

  return (
    <div className="flex gap-16 items-center justify-center">
      <div>
        <div className={`text-[17px] ${c.t1} font-bold mb-6 text-center`}>① 商品一覧画面</div>
        <div className={`w-[300px] h-[640px] ${d ? "bg-gray-900/60" : "bg-white"} rounded-3xl overflow-hidden p-8`} style={{ border: `2px solid ${d ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`, boxShadow: d ? "0 8px 24px rgba(0,0,0,0.5)" : "0 8px 24px rgba(0,0,0,0.08)" }}>
          {/* Header */}
          <div className="mb-6">
            <div className={`h-6 w-32 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded mb-2`}></div>
            <div className={`h-3 w-48 ${d ? "bg-gray-800/60" : "bg-gray-100"} rounded`}></div>
          </div>

          {/* Search */}
          <div className={`h-12 ${d ? "bg-gray-800/60" : "bg-gray-100"} rounded-xl mb-6`}></div>

          {/* Category Tabs */}
          <div className="flex gap-2 mb-6">
            <div className={`h-9 w-20 ${d ? "bg-gray-700" : "bg-gray-300"} rounded-full`}></div>
            <div className={`h-9 w-20 ${d ? "bg-gray-800/40" : "bg-gray-100"} rounded-full`}></div>
            <div className={`h-9 w-16 ${d ? "bg-gray-800/40" : "bg-gray-100"} rounded-full`}></div>
          </div>

          {/* Product Cards */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`${d ? "bg-gray-800/40" : "bg-gray-50"} rounded-2xl p-4`} style={{ border: `1px solid ${d ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}` }}>
                <div className="flex gap-3">
                  <div className={`w-16 h-16 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded-xl shrink-0`}></div>
                  <div className="flex-1">
                    <div className={`h-4 w-28 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded mb-2`}></div>
                    <div className={`h-3 w-20 ${d ? "bg-gray-800/40" : "bg-gray-100"} rounded mb-3`}></div>
                    <div className="flex items-center justify-between">
                      <div className={`h-3 w-12 ${d ? "bg-gray-800/40" : "bg-gray-100"} rounded`}></div>
                      <div className={`h-4 w-14 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded`}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-[420px]">
        <div className={`text-[17px] ${c.t1} font-bold mb-6`}>作るべきエレメント</div>
        <div className="space-y-5">
          {[
            { name: "検索バー", desc: "アイコン + プレースホルダーテキスト、オートレイアウトで横配置" },
            { name: "カテゴリタブ", desc: "横スクロール可能なボタングループ、ボタンのバリアント作成" },
            { name: "商品カード", desc: "画像・タイトル・価格・評価・バッジを含む、柔軟なレイアウト" },
            { name: "リスト構造", desc: "カードの繰り返し配置、オートレイアウトで縦配置" },
            { name: "バッジ", desc: "「人気」「NEW」などのラベル、テキストのバリアント" },
          ].map((el, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className={`w-6 h-6 rounded-lg ${d ? "bg-purple-500/20" : "bg-purple-100"} flex items-center justify-center shrink-0 mt-0.5`}>
                <div className={`text-[12px] font-bold ${d ? "text-purple-300" : "text-purple-600"}`}>{idx + 1}</div>
              </div>
              <div className="flex-1">
                <div className={`text-[15px] font-bold ${c.t1} mb-1`}>{el.name}</div>
                <div className={`text-[13px] ${c.t3} leading-relaxed`}>{el.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductDetailPracticeSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";

  return (
    <div className="flex gap-16 items-center justify-center">
      <div>
        <div className={`text-[17px] ${c.t1} font-bold mb-6 text-center`}>② 商品詳細画面</div>
        <div className={`w-[300px] h-[640px] ${d ? "bg-gray-900/60" : "bg-white"} rounded-3xl overflow-hidden p-8`} style={{ border: `2px solid ${d ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`, boxShadow: d ? "0 8px 24px rgba(0,0,0,0.5)" : "0 8px 24px rgba(0,0,0,0.08)" }}>
          {/* Product Image */}
          <div className={`w-full h-40 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded-2xl mb-6`}></div>

          {/* Title & Badge */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className={`h-5 w-32 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded mb-2`}></div>
              <div className={`h-3 w-24 ${d ? "bg-gray-800/60" : "bg-gray-100"} rounded`}></div>
            </div>
            <div className={`h-5 w-12 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded-full`}></div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className={`h-3 w-3 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded`}></div>
            <div className={`h-3 w-8 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded`}></div>
            <div className={`h-3 w-12 ${d ? "bg-gray-800/60" : "bg-gray-100"} rounded`}></div>
          </div>

          {/* Description */}
          <div className={`h-3 w-full ${d ? "bg-gray-800/60" : "bg-gray-100"} rounded mb-1`}></div>
          <div className={`h-3 w-4/5 ${d ? "bg-gray-800/60" : "bg-gray-100"} rounded mb-5`}></div>

          {/* Price Box */}
          <div className={`${d ? "bg-gray-800/40" : "bg-gray-50"} rounded-2xl p-4 mb-5`}>
            <div className="flex items-center justify-between">
              <div className={`h-3 w-16 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded`}></div>
              <div className={`h-6 w-20 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded`}></div>
            </div>
          </div>

          {/* Size Options */}
          <div className="mb-4">
            <div className={`h-3 w-12 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded mb-3`}></div>
            <div className="grid grid-cols-3 gap-2">
              <div className={`h-9 ${d ? "bg-gray-700" : "bg-gray-300"} rounded-xl`}></div>
              <div className={`h-9 ${d ? "bg-gray-800/40" : "bg-gray-100"} rounded-xl`}></div>
              <div className={`h-9 ${d ? "bg-gray-800/40" : "bg-gray-100"} rounded-xl`}></div>
            </div>
          </div>

          {/* Temperature Options */}
          <div className="mb-4">
            <div className={`h-3 w-12 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded mb-3`}></div>
            <div className="grid grid-cols-2 gap-2">
              <div className={`h-9 ${d ? "bg-gray-700" : "bg-gray-300"} rounded-xl`}></div>
              <div className={`h-9 ${d ? "bg-gray-800/40" : "bg-gray-100"} rounded-xl`}></div>
            </div>
          </div>

          {/* Quantity Control */}
          <div className="mb-5">
            <div className={`h-3 w-12 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded mb-3`}></div>
            <div className="flex items-center justify-center gap-4">
              <div className={`w-10 h-10 ${d ? "bg-gray-800/40" : "bg-gray-100"} rounded-xl`}></div>
              <div className={`h-5 w-8 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded`}></div>
              <div className={`w-10 h-10 ${d ? "bg-gray-800/40" : "bg-gray-100"} rounded-xl`}></div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className={`h-12 ${d ? "bg-gray-700" : "bg-gray-300"} rounded-2xl`}></div>
        </div>
      </div>

      <div className="w-[420px]">
        <div className={`text-[17px] ${c.t1} font-bold mb-6`}>作るべきエレメント</div>
        <div className="space-y-5">
          {[
            { name: "商品画像エリア", desc: "大きな画像プレースホルダー、固定比率で配置" },
            { name: "商品情報", desc: "タイトル・評価・説明文の階層構造、情報の優先順位を意識" },
            { name: "オプション選択", desc: "サイズ・温度などのボタングループ、グリッドレイアウト" },
            { name: "数量コントロール", desc: "－ボタン・数字・＋ボタンの横並び配置" },
            { name: "CTAボタン", desc: "固定配置の購入ボタン、目立つ配置とスタイル" },
          ].map((el, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className={`w-6 h-6 rounded-lg ${d ? "bg-purple-500/20" : "bg-purple-100"} flex items-center justify-center shrink-0 mt-0.5`}>
                <div className={`text-[12px] font-bold ${d ? "text-purple-300" : "text-purple-600"}`}>{idx + 1}</div>
              </div>
              <div className="flex-1">
                <div className={`text-[15px] font-bold ${c.t1} mb-1`}>{el.name}</div>
                <div className={`text-[13px] ${c.t3} leading-relaxed`}>{el.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PickupPracticeSlide() {
  const theme = useTheme();
  const c = tc(theme);
  const d = theme === "dark";

  return (
    <div className="flex gap-16 items-center justify-center">
      <div>
        <div className={`text-[17px] ${c.t1} font-bold mb-6 text-center`}>③ 受け取り画面</div>
        <div className={`w-[300px] h-[640px] ${d ? "bg-gray-900/60" : "bg-white"} rounded-3xl overflow-hidden p-8`} style={{ border: `2px solid ${d ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`, boxShadow: d ? "0 8px 24px rgba(0,0,0,0.5)" : "0 8px 24px rgba(0,0,0,0.08)" }}>
          {/* Header */}
          <div className="mb-6">
            <div className={`h-6 w-28 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded mb-2`}></div>
            <div className={`h-3 w-40 ${d ? "bg-gray-800/60" : "bg-gray-100"} rounded`}></div>
          </div>

          {/* Store Info */}
          <div className={`${d ? "bg-gray-800/40" : "bg-gray-50"} rounded-2xl p-4 mb-4`}>
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded-xl shrink-0`}></div>
              <div className="flex-1">
                <div className={`h-2 w-16 ${d ? "bg-gray-800/60" : "bg-gray-100"} rounded mb-2`}></div>
                <div className={`h-3 w-32 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded`}></div>
              </div>
            </div>
          </div>

          {/* Order Cards */}
          <div className="space-y-3">
            {/* Active Order - Emphasized */}
            <div className={`${d ? "bg-gray-800/60" : "bg-gray-50"} rounded-2xl p-4`} style={{ border: `2px solid ${d ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"}` }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-5 h-5 ${d ? "bg-gray-700" : "bg-gray-300"} rounded`}></div>
                    <div className={`h-3 w-20 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded`}></div>
                  </div>
                  <div className={`h-8 w-20 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded mb-1`}></div>
                  <div className={`h-2 w-16 ${d ? "bg-gray-800/60" : "bg-gray-100"} rounded`}></div>
                </div>
                <div>
                  <div className={`h-5 w-14 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded mb-1`}></div>
                  <div className={`h-2 w-12 ${d ? "bg-gray-800/60" : "bg-gray-100"} rounded`}></div>
                </div>
              </div>

              <div className="mb-4">
                <div className={`h-2 w-16 ${d ? "bg-gray-800/60" : "bg-gray-100"} rounded mb-2`}></div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className={`h-3 w-28 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded`}></div>
                    <div className={`h-3 w-8 ${d ? "bg-gray-800/60" : "bg-gray-100"} rounded`}></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className={`h-3 w-24 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded`}></div>
                    <div className={`h-3 w-8 ${d ? "bg-gray-800/60" : "bg-gray-100"} rounded`}></div>
                  </div>
                </div>
              </div>

              <div className={`h-10 ${d ? "bg-gray-700" : "bg-gray-300"} rounded-xl`}></div>
            </div>

            {/* Preparing Order */}
            <div className={`${d ? "bg-gray-800/30" : "bg-gray-50/60"} rounded-2xl p-4`} style={{ border: `1px solid ${d ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}` }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-5 h-5 ${d ? "bg-gray-700/60" : "bg-gray-200"} rounded`}></div>
                    <div className={`h-3 w-16 ${d ? "bg-gray-800/60" : "bg-gray-100"} rounded`}></div>
                  </div>
                  <div className={`h-7 w-20 ${d ? "bg-gray-800/60" : "bg-gray-100"} rounded mb-1`}></div>
                  <div className={`h-2 w-16 ${d ? "bg-gray-800/40" : "bg-gray-100"} rounded`}></div>
                </div>
                <div>
                  <div className={`h-5 w-14 ${d ? "bg-gray-800/60" : "bg-gray-100"} rounded mb-1`}></div>
                  <div className={`h-2 w-12 ${d ? "bg-gray-800/40" : "bg-gray-100"} rounded`}></div>
                </div>
              </div>

              <div className={`h-8 ${d ? "bg-gray-800/40" : "bg-gray-100"} rounded-xl`}></div>
            </div>

            {/* Completed Order */}
            <div className={`${d ? "bg-gray-800/20" : "bg-gray-50/40"} rounded-2xl p-4`} style={{ border: `1px solid ${d ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}` }}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-5 h-5 ${d ? "bg-gray-800/60" : "bg-gray-100"} rounded`}></div>
                    <div className={`h-3 w-20 ${d ? "bg-gray-800/40" : "bg-gray-100"} rounded`}></div>
                  </div>
                  <div className={`h-7 w-20 ${d ? "bg-gray-800/40" : "bg-gray-100"} rounded mb-1`}></div>
                  <div className={`h-2 w-16 ${d ? "bg-gray-800/30" : "bg-gray-100"} rounded`}></div>
                </div>
                <div>
                  <div className={`h-5 w-14 ${d ? "bg-gray-800/40" : "bg-gray-100"} rounded mb-1`}></div>
                  <div className={`h-2 w-12 ${d ? "bg-gray-800/30" : "bg-gray-100"} rounded`}></div>
                </div>
              </div>

              <div className={`h-3 w-36 ${d ? "bg-gray-800/30" : "bg-gray-100"} rounded mx-auto`}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[420px]">
        <div className={`text-[17px] ${c.t1} font-bold mb-6`}>作るべきエレメント</div>
        <div className="space-y-5">
          {[
            { name: "店舗情報カード", desc: "アイコン + 店舗名・住所、情報の整理" },
            { name: "注文カード", desc: "ステータス・番号・時刻・商品リスト、状態に応じたスタイル" },
            { name: "ステータス表示", desc: "アイコン + ラベル（受取可能・準備中・完了）、視覚的な差分" },
            { name: "受取番号", desc: "大きな文字で目立たせる、タイポグラフィの強弱" },
            { name: "アクションボタン", desc: "状態に応じて変わるボタン、優先順位の表現" },
          ].map((el, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className={`w-6 h-6 rounded-lg ${d ? "bg-purple-500/20" : "bg-purple-100"} flex items-center justify-center shrink-0 mt-0.5`}>
                <div className={`text-[12px] font-bold ${d ? "text-purple-300" : "text-purple-600"}`}>{idx + 1}</div>
              </div>
              <div className="flex-1">
                <div className={`text-[15px] font-bold ${c.t1} mb-1`}>{el.name}</div>
                <div className={`text-[13px] ${c.t3} leading-relaxed`}>{el.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══ Slides ═══ */
export const slides: Slide[] = [
  { id: "title", section: "intro", title: "Figmaを「描く道具」から「設計の道具」へ", message: "", content: <TitleSlide /> },
  { id: "goal", section: "intro", title: "今日のゴール", message: "デザインシステムの実践的な使い方をイメージできる・実践できる状態になる", content: <GoalSlide /> },
  { id: "overview", section: "intro", title: "全体像", message: "5つのテーマは別々の機能ではなく、実務ではつながっている", content: <OverviewSlide /> },
  { id: "al-basics", section: "auto-layout", title: "オートレイアウトの基本", message: "オートレイアウトは整列機能ではなく、要素同士の関係をルールにする機能", content: <AlBasicsSlide /> },
  { id: "al-apply", section: "auto-layout", title: "オートレイアウトとは", starred: true, message: "オートレイアウトは構造を持った配置ルールで柔軟なデザインを実現", content: <AlApplySlide /> },
  { id: "al-direction", section: "auto-layout", title: "オートレイアウトの適用", starred: true, message: "方向・間隔・パディングの適切な設定で柔軟なレイアウトを実現", content: <AlDirectionSlide /> },
  { id: "al-figma-ui", section: "auto-layout", title: "Figma UI：オートレイアウト設定", starred: true, message: "Figmaのオートレイアウト設定パネルを理解する", content: <AlFigmaUISlide /> },
  { id: "al-text", section: "auto-layout", title: "テキストの取り扱い", starred: true, message: "テキストはもっとも変化しやすい要素なので、見た目より先に振る舞いを決める", content: <AlTextSlide /> },
  { id: "al-advanced", section: "auto-layout", title: "最小最大幅 / 比率維持 / 絶対位置", message: "可変レイアウトの中で、どこまで許容し、何を例外にするかを決める", content: <AlAdvancedSlide /> },
  { id: "al-real-example", section: "auto-layout", title: "実例：商品カード", starred: true, message: "実際のカードコンポーネントでオートレイアウトの威力を体感する", content: <AlRealExampleSlide /> },
  { id: "comp-basics", section: "components", title: "コンポーネントの基本", message: "コンポーネントは、見た目の再利用ではなく、判断の再利用", content: <CompBasicsSlide /> },
  { id: "comp-props", section: "components", title: "プロパティについて", starred: true, message: "プロパティは「何を変えてよいか」を明示する、安全な自由度の設計", content: <CompPropsSlide /> },
  { id: "comp-variants-properties", section: "components", title: "バリアントのプロパティと値", starred: true, message: "バリアントはプロパティと値の組み合わせで構成される", content: <CompVariantsPropertiesSlide /> },
  { id: "comp-variants-button-example", section: "components", title: "実例：ボタンバリアント", starred: true, message: "ボタンコンポーネントでバリアントの実践的な使い方を理解する", content: <CompVariantsButtonExampleSlide /> },
  { id: "comp-variants-create", section: "components", title: "バリアントの作成手順", starred: true, message: "Figmaでバリアントを作成する実際の手順を理解する", content: <CompVariantsCreateSlide /> },
  { id: "comp-slot", section: "components", title: "Slot（スロット）", starred: true, message: "Slotでコンポーネント内に他の要素を自由に差し込める", content: <CompSlotSlide /> },
  { id: "comp-real-example", section: "components", title: "実例：ボタンシステム", starred: true, message: "実際のボタンシステムでコンポーネント設計を理解する", content: <CompRealExampleSlide /> },
  { id: "var-basics", section: "variables", title: "バリアブルの基本", message: "スタイルは見た目のまとまり、バリアブルは再利用する値の源泉", content: <VarBasicsSlide /> },
  { id: "var-apply", section: "variables", title: "バリアブルの適用", starred: true, message: "バリアブルの価値は、値を持つことではなく、変更の経路を設計すること", content: <VarApplySlide /> },
  { id: "var-alias", section: "variables", title: "トークンのエイリアス", starred: true, message: "トークンのエイリアスを使うと、デザインシステムを効率よく育てられる", content: <VarAliasSlide /> },
  { id: "var-real-example", section: "variables", title: "実例：カラーシステム", starred: true, message: "実際のカラーシステムでバリアブルの価値を体感する", content: <VarRealExampleSlide /> },
  { id: "lib-basics", section: "library", title: "ライブラリの基本", message: "ライブラリはアセット置き場ではなく、チームの共通言語", content: <LibBasicsSlide /> },
  { id: "lib-publish", section: "library", title: "ライブラリの公開・更新", message: "ライブラリ更新は、単なる修正ではなくチームへのリリース", content: <LibPublishSlide /> },
  { id: "token-basics", section: "tokens", title: "デザイントークンの基本", message: "トークンは、値に名前をつけることではなく、判断を再利用できる形にすること", content: <TokenBasicsSlide /> },
  { id: "token-semantic", section: "tokens", title: "セマンティックカラー", starred: true, message: "色は「何色か」ではなく「何のための色か」で扱う", content: <TokenSemanticSlide /> },
  { id: "token-hex", section: "tokens", title: "HEXカラーにトークンを適用する", starred: true, message: "HEXをトークン化する時は、値を置き換えるのではなく、意味を読み替える", content: <TokenHexSlide /> },
  { id: "token-typo", section: "tokens", title: "タイポグラフィについて", starred: true, message: "タイポグラフィは文字サイズ表ではなく、情報の優先順位と読みやすさの設計", content: <TokenTypoSlide /> },
  { id: "workflow-example", section: "others", title: "実例：実務フロー", starred: true, message: "デザインシステムが実務でどう機能するかを理解する", content: <WorkflowExampleSlide /> },
  { id: "others-ds", section: "others", title: "その他のデザインシステム要素", message: "デザインシステムは色とコンポーネントだけではない", content: <OthersDsSlide /> },
  { id: "summary", section: "others", title: "まとめ", message: "Figmaの機能は、見た目を作るためではなく、運用できる構造を作るために使う", content: <SummarySlide /> },
  { id: "practice-list", section: "practice", title: "① 商品一覧画面", starred: true, message: "左に画面サンプル、右に作るべきエレメント", content: <ProductListPracticeSlide /> },
  { id: "practice-detail", section: "practice", title: "② 商品詳細画面", starred: true, message: "商品情報の階層とオプション選択の実装", content: <ProductDetailPracticeSlide /> },
  { id: "practice-pickup", section: "practice", title: "③ 受け取り画面", starred: true, message: "ステータスによる状態差分と優先順位の表現", content: <PickupPracticeSlide /> },
];
