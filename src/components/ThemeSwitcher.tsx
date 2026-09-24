import { useState, useRef, useEffect } from "react";
import { Check, Sparkles, Sliders } from "lucide-react";
import { THEMES, useTheme, type ThemeId } from "../context/ThemeContext";
import { bnDigits } from "../utils/bn";

interface ThemeSwitcherProps {
  compact?: boolean;
  pill?: boolean;
}

export default function ThemeSwitcher({ compact = false, pill = false }: ThemeSwitcherProps) {
  const { theme, setTheme, bgGlow, setBgGlow, bgLevel } = useTheme();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape key
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const activeTheme = THEMES[theme];

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      {/* Trigger Button - lightweight, 0ms lag */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="থিম ও ব্যাকগ্রাউন্ড পরিবর্তন করুন"
        aria-expanded={open}
        className={
          pill
            ? "group flex items-center gap-1.5 rounded-full border border-pink-500/25 bg-[#140b1c]/80 backdrop-blur-md px-3 py-1.5 font-bengali text-[12.5px] font-semibold text-white/90 transition-all duration-150 hover:border-pink-400/50 hover:bg-pink-500/15 hover:text-white shadow-[0_4px_16px_-4px_rgba(0,0,0,0.5)] active:scale-95"
            : "group flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-1.5 font-bengali text-[12.5px] font-semibold text-white/90 transition-colors duration-150 hover:border-white/25 hover:bg-white/[0.08] sm:px-3 sm:py-2"
        }
        style={{
          borderColor: `var(--theme-primary, #ff758f)40`,
        }}
      >
        <span className="text-sm leading-none transition-transform duration-150 group-hover:scale-110 select-none">
          {activeTheme.emoji}
        </span>
        {!compact && (
          <span className="hidden sm:inline-block font-medium">
            {activeTheme.nameBn}
          </span>
        )}
        <Sparkles
          className="size-3.5 opacity-70 transition-opacity duration-150 group-hover:opacity-100"
          style={{ color: "var(--theme-primary, #ff758f)" }}
        />
      </button>

      {/* Dropdown Menu - Fast CSS rendering without heavy backdrop blur to prevent stutter */}
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 z-50 w-64 origin-top-right rounded-2xl border p-1.5 shadow-2xl animate-in fade-in zoom-in-95 duration-100"
          style={{
            borderColor: `var(--theme-primary, #ff758f)44`,
            background: "var(--color-panel, #170d20)",
            boxShadow: "0 16px 36px -10px rgba(0, 0, 0, 0.8)",
          }}
        >
          <div className="px-3 py-2 border-b border-white/[0.07]">
            <span className="font-bengali text-[11px] font-bold tracking-wide text-white/80">
              থিম নির্বাচন করুন
            </span>
            <p className="font-bengali text-[10px] text-white/45">
              কালার ও আইকন স্বয়ংক্রিয়ভাবে পরিবর্তিত হবে
            </p>
          </div>

          <div className="mt-1 space-y-1">
            {(Object.keys(THEMES) as ThemeId[]).map((key) => {
              const opt = THEMES[key];
              const isSelected = theme === key;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setTheme(key);
                  }}
                  className={`group flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition-colors duration-150 ${
                    isSelected
                      ? "bg-white/[0.1] shadow-sm"
                      : "hover:bg-white/[0.05]"
                  }`}
                >
                  {/* Theme Emoji & Color Indicator */}
                  <div
                    className="relative flex size-9 flex-none items-center justify-center rounded-xl border text-base"
                    style={{
                      borderColor: `${opt.primary}60`,
                      background: `${opt.primary}18`,
                    }}
                  >
                    <span className="select-none">{opt.emoji}</span>
                    <span
                      className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border border-black/60 shadow"
                      style={{ background: opt.primary }}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bengali text-[13px] font-bold text-white">
                        {opt.nameBn}
                      </span>
                      {isSelected && (
                        <Check
                          className="size-4"
                          style={{ color: opt.primary }}
                        />
                      )}
                    </div>
                    <span className="block truncate font-bengali text-[10.5px] text-white/60">
                      {opt.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Background Atmosphere / Glow Controller */}
          <div className="mt-2.5 pt-2.5 border-t border-white/[0.08] px-2.5 pb-2">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bengali text-[11.5px] font-bold text-white/90 flex items-center gap-1.5">
                <Sliders className="size-3.5" style={{ color: "var(--theme-primary)" }} />
                <span>ব্যাকগ্রাউন্ড আভা</span>
              </span>
              <span
                className="font-mono text-[10.5px] font-semibold px-2 py-0.5 rounded-full border shadow-sm"
                style={{
                  borderColor: "var(--theme-primary)40",
                  background: "var(--theme-primary)15",
                  color: "var(--theme-primary)",
                }}
              >
                {bnDigits(bgGlow)}%
              </span>
            </div>

            {/* 3 Quick Presets */}
            <div className="grid grid-cols-3 gap-1 mb-2.5">
              <button
                type="button"
                onClick={() => setBgGlow(20)}
                className={`py-1.5 px-1 rounded-lg text-center font-bengali text-[11px] font-medium transition-all ${
                  bgLevel === "subtle"
                    ? "border font-bold text-white shadow-sm"
                    : "bg-white/[0.03] text-white/60 hover:bg-white/[0.07]"
                }`}
                style={
                  bgLevel === "subtle"
                    ? {
                        borderColor: "var(--theme-primary)60",
                        background: "var(--theme-primary)25",
                      }
                    : {}
                }
              >
                মৃদু ডার্ক
              </button>
              <button
                type="button"
                onClick={() => setBgGlow(60)}
                className={`py-1.5 px-1 rounded-lg text-center font-bengali text-[11px] font-medium transition-all ${
                  bgLevel === "balanced"
                    ? "border font-bold text-white shadow-sm"
                    : "bg-white/[0.03] text-white/60 hover:bg-white/[0.07]"
                }`}
                style={
                  bgLevel === "balanced"
                    ? {
                        borderColor: "var(--theme-primary)60",
                        background: "var(--theme-primary)25",
                      }
                    : {}
                }
              >
                স্বাভাবিক
              </button>
              <button
                type="button"
                onClick={() => setBgGlow(100)}
                className={`py-1.5 px-1 rounded-lg text-center font-bengali text-[11px] font-medium transition-all ${
                  bgLevel === "vibrant"
                    ? "border font-bold text-white shadow-sm"
                    : "bg-white/[0.03] text-white/60 hover:bg-white/[0.07]"
                }`}
                style={
                  bgLevel === "vibrant"
                    ? {
                        borderColor: "var(--theme-primary)60",
                        background: "var(--theme-primary)25",
                      }
                    : {}
                }
              >
                উজ্জ্বল
              </button>
            </div>

            {/* Smooth live slider */}
            <div className="space-y-1">
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={bgGlow}
                onChange={(e) => setBgGlow(Number(e.target.value))}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-white/15 accent-[var(--theme-primary)]"
                aria-label="ব্যাকগ্রাউন্ড উজ্জ্বলতার স্লাইডার"
              />
              <div className="flex justify-between text-[9.5px] font-bengali text-white/45">
                <span>০% (Pure OLED)</span>
                <span>১০০% (Vibrant Glow)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
