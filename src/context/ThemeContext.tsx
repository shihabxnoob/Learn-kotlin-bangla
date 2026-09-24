import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { KITTY_ACCENTS } from "../components/KittyIcons";
import { WINTER_ACCENTS } from "../components/WinterIcons";

export type ThemeId = "kitty" | "winter";

export interface ThemeOption {
  id: ThemeId;
  nameBn: string;
  nameEn: string;
  emoji: string;
  description: string;
  primary: string;
  secondary: string;
  accents: Record<number, string>;
}

export const THEMES: Record<ThemeId, ThemeOption> = {
  kitty: {
    id: "kitty",
    nameBn: "কিটি থিম",
    nameEn: "Kitty Theme",
    emoji: "🐱",
    description: "মিষ্টি পিঙ্ক ও লাভেন্ডার কিউট ভাইব",
    primary: "#ff758f",
    secondary: "#c77dff",
    accents: KITTY_ACCENTS,
  },
  winter: {
    id: "winter",
    nameBn: "উইন্টার থিম",
    nameEn: "Winter Frost",
    emoji: "❄️",
    description: "আইস ব্লু, ফ্রস্ট ক্রিস্টাল ও ডিপ গ্লেসিয়ার",
    primary: "#38bdf8",
    secondary: "#818cf8",
    accents: WINTER_ACCENTS,
  },
};

export type BgIntensityLevel = "subtle" | "balanced" | "vibrant";

interface ThemeContextType {
  theme: ThemeId;
  themeConfig: ThemeOption;
  setTheme: (theme: ThemeId) => void;
  getAccent: (moduleId: number) => string;
  bgGlow: number; // 0 to 100
  setBgGlow: (val: number) => void;
  bgLevel: BgIntensityLevel;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const STORAGE_KEY = "kotlin_journey_theme";
const BG_GLOW_STORAGE_KEY = "kotlin_bg_glow";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
      if (saved && saved in THEMES) return saved;
    } catch {
      // ignore
    }
    return "kitty";
  });

  const [bgGlow, setBgGlowState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(BG_GLOW_STORAGE_KEY);
      if (saved !== null) {
        const parsed = Number(saved);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 100) return parsed;
      }
    } catch {
      // ignore
    }
    return 60; // default balanced
  });

  const setTheme = useCallback((newTheme: ThemeId) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // ignore
    }
  }, []);

  const setBgGlow = useCallback((val: number) => {
    const clamped = Math.max(0, Math.min(100, Math.round(val)));
    setBgGlowState(clamped);
    try {
      localStorage.setItem(BG_GLOW_STORAGE_KEY, String(clamped));
    } catch {
      // ignore
    }
  }, []);

  const bgLevel: BgIntensityLevel =
    bgGlow <= 30 ? "subtle" : bgGlow <= 75 ? "balanced" : "vibrant";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const scale = bgGlow / 100;
    document.documentElement.style.setProperty("--bg-glow-scale", String(scale));
    document.documentElement.setAttribute("data-bg-intensity", bgLevel);
  }, [bgGlow, bgLevel]);

  const themeConfig = THEMES[theme];

  const getAccent = useCallback(
    (moduleId: number): string => {
      return themeConfig.accents[moduleId] || themeConfig.primary;
    },
    [themeConfig]
  );

  const contextValue = useMemo(
    () => ({
      theme,
      themeConfig,
      setTheme,
      getAccent,
      bgGlow,
      setBgGlow,
      bgLevel,
    }),
    [theme, themeConfig, setTheme, getAccent, bgGlow, setBgGlow, bgLevel]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
