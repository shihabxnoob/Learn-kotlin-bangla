import { useId } from "react";

interface KotlinLogoProps {
  className?: string;
  showEars?: boolean;
}

/**
 * Kotlin Kitty Brandmark — Kotlin geometric emblem crowned with cute cat ears
 * and a charming strawberry pink ribbon bow.
 */
export default function KotlinLogo({ className = "", showEars = true }: KotlinLogoProps) {
  const gradientId = useId();
  const bowId = useId();

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Kotlin Kitty Logo"
    >
      <defs>
        {/* Kitty Kotlin Gradient */}
        <linearGradient
          id={gradientId}
          x1="0"
          y1="100"
          x2="100"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ff5d8f" />
          <stop offset="38%" stopColor="#ff758f" />
          <stop offset="70%" stopColor="#c77dff" />
          <stop offset="100%" stopColor="#ffa6c1" />
        </linearGradient>

        <linearGradient
          id={bowId}
          x1="0"
          y1="0"
          x2="100"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ff4d6d" />
          <stop offset="100%" stopColor="#ff758f" />
        </linearGradient>
      </defs>

      {/* Cute Cat Ears (if enabled) */}
      {showEars && (
        <g className="kitty-ears">
          {/* Left Cat Ear */}
          <path
            d="M8 26 L26 2 L38 24 Z"
            fill="#ff758f"
            opacity="0.95"
          />
          {/* Left Inner Ear */}
          <path
            d="M14 23 L25 8 L32 22 Z"
            fill="#ffd6e0"
            opacity="0.9"
          />

          {/* Right Cat Ear */}
          <path
            d="M62 24 L74 2 L92 26 Z"
            fill="#c77dff"
            opacity="0.95"
          />
          {/* Right Inner Ear */}
          <path
            d="M68 22 L75 8 L86 23 Z"
            fill="#ffd6e0"
            opacity="0.9"
          />
        </g>
      )}

      {/* Main Kotlin Logo Shape (Shifted slightly down to balance ears) */}
      <g transform={showEars ? "translate(0, 10) scale(0.9) translate(5.5, 5)" : ""}>
        <path fill={`url(#${gradientId})`} d="M0 0 L100 0 L0 58 Z" />
        <path fill={`url(#${gradientId})`} d="M0 100 L0 58 L100 0 L100 100 Z" />

        {/* Cute Kitty Bow / Ribbon in the corner */}
        {showEars && (
          <g transform="translate(68, 6) scale(0.35)">
            {/* Left loop */}
            <ellipse cx="20" cy="30" rx="16" ry="12" transform="rotate(-25 20 30)" fill={`url(#${bowId})`} />
            <circle cx="20" cy="30" r="4" fill="#ffd6e0" />
            {/* Right loop */}
            <ellipse cx="56" cy="30" rx="16" ry="12" transform="rotate(25 56 30)" fill={`url(#${bowId})`} />
            <circle cx="56" cy="30" r="4" fill="#ffd6e0" />
            {/* Center knot */}
            <circle cx="38" cy="30" r="8" fill="#ff4d6d" />
          </g>
        )}
      </g>
    </svg>
  );
}
