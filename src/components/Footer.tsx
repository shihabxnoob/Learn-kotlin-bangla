import { Heart } from "lucide-react";
import KotlinLogo from "./KotlinLogo";
import { ThemeChipIcon } from "./ThemeIcons";

export default function Footer() {
  return (
    <footer
      className="relative border-t transition-colors duration-300"
      style={{
        borderColor: "var(--theme-surface-border, rgba(255,117,143,0.1))",
        background: "var(--color-void, #0d0713)",
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 py-10 sm:px-6 md:flex-row lg:px-8">
        <div className="flex items-center gap-3">
          <div
            className="flex size-9 items-center justify-center rounded-xl border shadow-sm"
            style={{
              borderColor: "var(--theme-surface-border)",
              background: "var(--theme-badge-bg)",
            }}
          >
            <KotlinLogo className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="font-display text-sm font-bold leading-tight text-white/90 flex items-baseline">
                Kotlin
                <span className="ml-1 font-bengali font-semibold" style={{ color: "var(--theme-primary)" }}>
                  বাংলা
                </span>
              </p>
              <ThemeChipIcon size={12} color="var(--theme-primary, #ff758f)" />
            </div>
            <p className="font-bengali text-[11px] leading-tight text-white/50">
              Fundamentals থেকে Advanced পর্যন্ত বাংলায়
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 font-bengali text-[11.5px] tracking-[0.02em] text-white/60">
          <span>Made with</span>
          <Heart className="size-3" style={{ color: "var(--theme-primary)", fill: "var(--theme-primary)" }} />
          <span>for Kotlin Developers</span>
        </div>
      </div>
    </footer>
  );
}
