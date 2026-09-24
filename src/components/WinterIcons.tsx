import { useId, type SVGProps } from "react";

export interface WinterIconProps extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}

/**
  * Winter Theme Accents for 8 milestones
  */
export const WINTER_ACCENTS: Record<number, string> = {
  1: "#38bdf8", // Sky Glacier
  2: "#00f0ff", // Neon Cyan
  3: "#818cf8", // Mystic Polar Indigo
  4: "#2dd4bf", // Glacier Mint / Teal
  5: "#a78bfa", // Aurora Periwinkle
  6: "#38bdf8", // Diamond Ice
  7: "#60a5fa", // Cobalt Ice
  8: "#6366f1", // Deep Space Polar
};

export const WINTER_CHAPTER_TITLES: Record<number, string> = {
  1: "Frost Scholar · মৌলিক ভিত্তি",
  2: "Frost Glider · লুপ ও শর্ত",
  3: "Frost Sorcerer · ফাংশন ম্যাজিক",
  4: "Glacier Guard · নাল সেফটি",
  5: "Crystal Vault · কালেকশনস",
  6: "Ice Architect · অবজেক্ট অরিয়েন্টেড",
  7: "Aurora Weaver · ফাংশনাল ও স্কোপ",
  8: "Cosmic Frost · কোরুটিন ও কনকারেন্সি",
};

/**
 * Universal Crisp Snowflake Icon (counterpart of CatPawIcon)
 */
export function SnowflakeIcon({ color = "currentColor", size = 16, className = "", ...props }: WinterIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* 3 Main Crossing Axes */}
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="3.34" y1="7" x2="20.66" y2="17" />
      <line x1="3.34" y1="17" x2="20.66" y2="7" />

      {/* Vertical axis crystal branches */}
      <path d="M9 5 L12 7 L15 5" />
      <path d="M9 19 L12 17 L15 19" />

      {/* Diagonal 1 branches */}
      <path d="M4.5 10.5 L7.5 9.5 L6.5 6.5" />
      <path d="M19.5 13.5 L16.5 14.5 L17.5 17.5" />

      {/* Diagonal 2 branches */}
      <path d="M4.5 13.5 L7.5 14.5 L6.5 17.5" />
      <path d="M19.5 10.5 L16.5 9.5 L17.5 6.5" />

      {/* Center core hexagon */}
      <circle cx="12" cy="12" r="1.5" fill={color} stroke="none" />
    </svg>
  );
}

/**
 * Faceted Frost Crystal / Ice Star Icon (counterpart of CatFaceIcon)
 */
export function FrostCrystalIcon({ color = "currentColor", size = 20, className = "", ...props }: WinterIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Outer Diamond */}
      <path
        d="M12 2 L20 8 L20 16 L12 22 L4 16 L4 8 Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Internal crystal facets */}
      <path
        d="M12 2 L12 22 M4 8 L20 16 M4 16 L20 8"
        stroke={color}
        strokeWidth="1.2"
        strokeOpacity="0.6"
      />
      <circle cx="12" cy="12" r="2" fill={color} />
    </svg>
  );
}

/**
 * 01. Frost Scholar — Ice Prism & Frosted Book/Scroll
 */
export function FrostScholarIcon({ color = "#38bdf8", size = 28, className = "", ...props }: WinterIconProps) {
  const id = useId();
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id={`${id}-grad`} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#bae6fd" />
        </linearGradient>
      </defs>
      {/* Crystal Prism Top */}
      <path d="M24 4 L34 16 L24 22 L14 16 Z" fill={`url(#${id}-grad)`} opacity="0.9" />
      <path d="M24 4 L14 16 L24 22 Z" fill="#ffffff" opacity="0.25" />
      <path d="M24 22 L34 16 L24 28 L14 16 Z" stroke={color} strokeWidth="1.2" />

      {/* Floating Ice Sparks */}
      <circle cx="9" cy="12" r="1.5" fill={color} />
      <circle cx="39" cy="10" r="1.2" fill="#7dd3fc" />

      {/* Frost Open Book */}
      <path
        d="M10 32 Q24 28 24 35 Q24 28 38 32 L38 42 Q24 38 24 45 Q24 38 10 42 Z"
        fill="#0c1d33"
        stroke={color}
        strokeWidth="1.6"
      />
      <path d="M24 35 L24 45" stroke={color} strokeWidth="1.6" />
      {/* Runes / text in book */}
      <path d="M14 34 H20 M14 37 H19 M28 34 H34 M28 37 H33" stroke="#7dd3fc" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 02. Frost Glider — Branching Snowflake Loop (Control Flow)
 */
export function FrostLoopIcon({ color = "#60a5fa", size = 28, className = "", ...props }: WinterIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Dual Interlocking Frost Loop */}
      <circle cx="19" cy="24" r="11" stroke={color} strokeWidth="2.5" opacity="0.85" />
      <circle cx="29" cy="24" r="11" stroke="#93c5fd" strokeWidth="2" strokeDasharray="3 2" />
      {/* Intersection Crystal */}
      <path d="M24 16 L27 24 L24 32 L21 24 Z" fill={color} />
      <circle cx="24" cy="24" r="2.5" fill="#ffffff" />
      {/* Loop Arrows */}
      <path d="M19 13 L22 13 L20.5 10" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M29 35 L26 35 L27.5 38" stroke="#93c5fd" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Frost Stars */}
      <circle cx="10" cy="18" r="1.5" fill="#ffffff" />
      <circle cx="38" cy="30" r="1.5" fill="#ffffff" />
    </svg>
  );
}

/**
 * 03. Frost Sorcerer — Crystalline Wand / Spell Core (Functions)
 */
export function FrostWandIcon({ color = "#818cf8", size = 28, className = "", ...props }: WinterIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Wand Staff */}
      <line x1="12" y1="36" x2="28" y2="20" stroke="#a5b4fc" strokeWidth="2.8" strokeLinecap="round" />
      {/* Crystal Star Tip */}
      <path
        d="M32 6 L35 15 L44 18 L35 21 L32 30 L29 21 L20 18 L29 15 Z"
        fill={color}
        stroke="#ffffff"
        strokeWidth="1.2"
      />
      <circle cx="32" cy="18" r="3" fill="#ffffff" />
      {/* Orbiting Sparkles */}
      <circle cx="20" cy="10" r="1.5" fill="#c7d2fe" />
      <circle cx="42" cy="30" r="1.2" fill="#c7d2fe" />
      <circle cx="10" cy="26" r="1.8" fill={color} />
    </svg>
  );
}

/**
 * 04. Glacier Guard — Ice Barrier / Shield (Null Safety)
 */
export function GlacierShieldIcon({ color = "#06b6d4", size = 28, className = "", ...props }: WinterIconProps) {
  const id = useId();
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id={`${id}-s`} x1="24" y1="6" x2="24" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor="#083344" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      {/* Ice Shield Boundary */}
      <path
        d="M24 6 L38 12 C38 26 31 37 24 42 C17 37 10 26 10 12 Z"
        fill={`url(#${id}-s)`}
        stroke={color}
        strokeWidth="2"
      />
      {/* Facet lines */}
      <path d="M24 6 L24 42 M10 12 L38 12 M13 22 L35 22" stroke={color} strokeWidth="1.2" strokeOpacity="0.6" />
      {/* Frost Crest Checkmark */}
      <path d="M19 23 L23 27 L29 19" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * 05. Crystal Vault — Ice Geode / Chest (Collections)
 */
export function FrostVaultIcon({ color = "#a5b4fc", size = 28, className = "", ...props }: WinterIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Chest Body */}
      <rect x="8" y="16" width="32" height="24" rx="4" fill="#0f172a" stroke={color} strokeWidth="2" />
      {/* Vault Grid Compartments */}
      <line x1="8" y1="28" x2="40" y2="28" stroke={color} strokeWidth="1.5" strokeOpacity="0.7" />
      <line x1="24" y1="16" x2="24" y2="40" stroke={color} strokeWidth="1.5" strokeOpacity="0.7" />
      {/* Glowing ice gems inside */}
      <circle cx="16" cy="22" r="2.5" fill="#38bdf8" />
      <circle cx="32" cy="22" r="2.5" fill="#818cf8" />
      <circle cx="16" cy="34" r="2.5" fill="#c084fc" />
      <circle cx="32" cy="34" r="2.5" fill="#38bdf8" />
      {/* Lock gem */}
      <circle cx="24" cy="28" r="3.5" fill="#ffffff" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

/**
 * 06. Ice Architect — Frost Citadel / Spires (OOP)
 */
export function IceCitadelIcon({ color = "#22d3ee", size = 28, className = "", ...props }: WinterIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Center Grand Spire */}
      <path d="M24 6 L29 18 L27 40 H21 L19 18 Z" fill="#082f49" stroke={color} strokeWidth="1.8" />
      {/* Left Tower */}
      <path d="M13 14 L18 24 L17 40 H10 L9 24 Z" fill="#0c4a6e" stroke={color} strokeWidth="1.4" />
      {/* Right Tower */}
      <path d="M35 14 L39 24 L38 40 H31 L30 24 Z" fill="#0c4a6e" stroke={color} strokeWidth="1.4" />
      {/* Crystal Spires Top Gems */}
      <circle cx="24" cy="6" r="2" fill="#ffffff" />
      <circle cx="13" cy="14" r="1.5" fill="#7dd3fc" />
      <circle cx="35" cy="14" r="1.5" fill="#7dd3fc" />
      {/* Citadel Arch Gate */}
      <path d="M22 40 V32 Q24 30 26 32 V40" stroke="#ffffff" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

/**
 * 07. Aurora Weaver — Northern Lights & Crystal (Functional & Scope)
 */
export function AuroraCrystalIcon({ color = "#3b82f6", size = 28, className = "", ...props }: WinterIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Aurora Curving Bands */}
      <path
        d="M6 14 Q16 6 24 16 T42 12"
        stroke="#38bdf8"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeOpacity="0.85"
      />
      <path
        d="M6 22 Q16 14 24 24 T42 20"
        stroke="#818cf8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.75"
      />
      <path
        d="M8 30 Q18 22 26 32 T40 28"
        stroke="#a5b4fc"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeOpacity="0.6"
      />
      {/* Central Floating Aurora Diamond */}
      <path d="M24 16 L31 24 L24 32 L17 24 Z" fill="#1e1b4b" stroke={color} strokeWidth="1.8" />
      <circle cx="24" cy="24" r="2.5" fill="#ffffff" />
      {/* Sparkles */}
      <circle cx="12" cy="10" r="1.2" fill="#ffffff" />
      <circle cx="36" cy="36" r="1.5" fill="#ffffff" />
    </svg>
  );
}

/**
 * 08. Cosmic Frost — Polar Comet / Orbit Core (Coroutines & Concurrency)
 */
export function CosmicFrostIcon({ color = "#6366f1", size = 28, className = "", ...props }: WinterIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Cosmic Orbit Rings */}
      <ellipse cx="24" cy="24" rx="18" ry="7" stroke={color} strokeWidth="1.5" strokeDasharray="3 2" transform="rotate(-25 24 24)" />
      <ellipse cx="24" cy="24" rx="18" ry="7" stroke="#38bdf8" strokeWidth="1.2" transform="rotate(35 24 24)" strokeOpacity="0.6" />
      {/* Central Ice Star Core */}
      <circle cx="24" cy="24" r="6" fill="#1e1b4b" stroke="#ffffff" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="2.5" fill="#67e8f9" />
      {/* Orbiting Particles / Concurrent tasks */}
      <circle cx="10" cy="16" r="2" fill="#38bdf8" />
      <circle cx="38" cy="32" r="2" fill="#a5b4fc" />
      <circle cx="34" cy="14" r="1.5" fill="#ffffff" />
      <circle cx="14" cy="34" r="1.5" fill="#6366f1" />
    </svg>
  );
}

/**
 * Dynamic Milestone Winter Icon Picker by Milestone ID (1 to 8)
 */
export function MilestoneWinterIcon({
  moduleId,
  className = "",
  color,
  size = 28,
  ...props
}: {
  moduleId: number;
} & WinterIconProps) {
  const chosenColor = color || WINTER_ACCENTS[moduleId] || "#38bdf8";

  switch (moduleId) {
    case 1:
      return <FrostScholarIcon color={chosenColor} size={size} className={className} {...props} />;
    case 2:
      return <FrostLoopIcon color={chosenColor} size={size} className={className} {...props} />;
    case 3:
      return <FrostWandIcon color={chosenColor} size={size} className={className} {...props} />;
    case 4:
      return <GlacierShieldIcon color={chosenColor} size={size} className={className} {...props} />;
    case 5:
      return <FrostVaultIcon color={chosenColor} size={size} className={className} {...props} />;
    case 6:
      return <IceCitadelIcon color={chosenColor} size={size} className={className} {...props} />;
    case 7:
      return <AuroraCrystalIcon color={chosenColor} size={size} className={className} {...props} />;
    case 8:
      return <CosmicFrostIcon color={chosenColor} size={size} className={className} {...props} />;
    default:
      return <FrostScholarIcon color={chosenColor} size={size} className={className} {...props} />;
  }
}
