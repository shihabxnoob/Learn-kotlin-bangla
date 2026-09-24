import { useTheme } from "../context/ThemeContext";
import {
  MilestoneCatIcon,
  CatPawIcon,
  CatFaceIcon,
  KittyLessonBadge,
  KITTY_CHAPTER_TITLES,
  type KittyIconProps,
} from "./KittyIcons";
import {
  MilestoneWinterIcon,
  SnowflakeIcon,
  FrostCrystalIcon,
  WINTER_CHAPTER_TITLES,
  type WinterIconProps,
} from "./WinterIcons";

export interface ThemeIconProps extends KittyIconProps, WinterIconProps {}

/**
 * Automatically renders either Kitty or Winter mascot icon based on active theme
 */
export function ThemeMilestoneIcon({
  moduleId,
  size = 28,
  color,
  className = "",
  ...props
}: {
  moduleId: number;
} & ThemeIconProps) {
  const { theme, getAccent } = useTheme();
  const accentColor = color || getAccent(moduleId);

  if (theme === "winter") {
    return (
      <MilestoneWinterIcon
        moduleId={moduleId}
        size={size}
        color={accentColor}
        className={className}
        {...props}
      />
    );
  }

  return (
    <MilestoneCatIcon
      moduleId={moduleId}
      size={size}
      color={accentColor}
      className={className}
      {...props}
    />
  );
}

/**
 * Automatically renders watermark icon based on active theme (kitty vs winter)
 */
export function ThemeWatermarkIcon({
  variant,
  size = 48,
  color = "currentColor",
  className = "",
  ...props
}: {
  variant: "primary" | "secondary";
} & ThemeIconProps) {
  const { theme } = useTheme();

  if (theme === "winter") {
    if (variant === "primary") {
      return <FrostCrystalIcon size={size} color={color} className={className} {...props} />;
    }
    return <SnowflakeIcon size={size} color={color} className={className} {...props} />;
  }

  // Kitty theme default
  if (variant === "primary") {
    return <CatFaceIcon size={size} color={color} className={className} {...props} />;
  }
  return <CatPawIcon size={size} color={color} className={className} {...props} />;
}

/**
 * Small decorative chip icon (Paw for Kitty, Snowflake for Winter)
 */
export function ThemeChipIcon({
  size = 14,
  color = "currentColor",
  className = "",
  ...props
}: ThemeIconProps) {
  const { theme } = useTheme();

  if (theme === "winter") {
    return <SnowflakeIcon size={size} color={color} className={className} {...props} />;
  }
  return <CatPawIcon size={size} color={color} className={className} {...props} />;
}

/**
 * Returns the theme-specific chapter title (e.g. Scholar Kitty vs Frost Scholar)
 */
export function useChapterTitle(moduleId: number): string {
  const { theme } = useTheme();
  if (theme === "winter") {
    return WINTER_CHAPTER_TITLES[moduleId] || `অধ্যায় ${moduleId}`;
  }
  return KITTY_CHAPTER_TITLES[moduleId] || `অধ্যায় ${moduleId}`;
}

/**
 * Frosted Crystal Badge for Winter Theme
 */
export function WinterLessonBadge({
  number,
  accent = "#38bdf8",
  className = "",
}: {
  number: string;
  accent?: string;
  className?: string;
}) {
  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* 3D Frost Crystal Spires poking up */}
      <div className="relative z-10 -mb-[5px] flex w-[34px] justify-between px-0.5 pointer-events-none">
        {/* Left crystal spire */}
        <div
          className="relative size-3 rounded-tl-[6px] -rotate-12 border-t border-l shadow-sm overflow-hidden"
          style={{
            borderColor: `${accent}aa`,
            background: `linear-gradient(135deg, ${accent}, #0b1c33)`,
          }}
        />
        {/* Right crystal spire */}
        <div
          className="relative size-3 rounded-tr-[6px] rotate-12 border-t border-r shadow-sm overflow-hidden"
          style={{
            borderColor: `${accent}aa`,
            background: `linear-gradient(225deg, ${accent}, #0b1c33)`,
          }}
        />
      </div>

      {/* Main Frost Crystal Badge body */}
      <div
        className="relative grid size-11 place-items-center rounded-2xl border font-bengali text-[13.5px] font-extrabold shadow-md transition-transform duration-300 group-hover:scale-105"
        style={{
          borderColor: `${accent}77`,
          color: "#ffffff",
          background: `linear-gradient(145deg, ${accent}38 0%, #0c182b 60%, #050d18 100%)`,
          boxShadow: `0 6px 20px -4px ${accent}40, inset 0 1px 0 rgba(255,255,255,0.25)`,
        }}
      >
        {/* Crystal Facet Left */}
        <div
          aria-hidden
          className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-[1.5px] rounded-full opacity-60 pointer-events-none"
          style={{ background: accent }}
        />
        {/* Crystal Facet Right */}
        <div
          aria-hidden
          className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-[1.5px] rounded-full opacity-60 pointer-events-none"
          style={{ background: accent }}
        />

        {/* Number in Bengali */}
        <span className="relative z-10 font-bold tracking-tight text-sky-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          {number}
        </span>

        {/* Tiny Snowflake Crystal Bean on bottom border */}
        <div
          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 flex items-center justify-center rounded-full p-[2px] shadow-sm z-20 border border-white/20"
          style={{
            background: `linear-gradient(135deg, ${accent}, #818cf8)`,
            boxShadow: `0 2px 8px ${accent}66`,
          }}
        >
          <SnowflakeIcon size={9} color="#ffffff" />
        </div>
      </div>
    </div>
  );
}

/**
 * Universal Lesson Rail Badge: Kitty Ears for Kitty, Frost Crystal for Winter
 */
export function ThemeLessonBadge({
  number,
  accent,
  className = "",
}: {
  number: string;
  accent?: string;
  className?: string;
}) {
  const { theme } = useTheme();
  if (theme === "winter") {
    return <WinterLessonBadge number={number} accent={accent} className={className} />;
  }
  return <KittyLessonBadge number={number} accent={accent} className={className} />;
}

