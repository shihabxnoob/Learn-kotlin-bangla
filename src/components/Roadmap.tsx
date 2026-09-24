import { memo, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  CheckCircle2,
  BookOpen,
  Clock,
  ArrowRight,
  Sparkles,
  Trophy,
} from "lucide-react";
import { Link } from "react-router";
import { modules as rawMilestones, type ModuleMeta } from "../data/modules";
import { bnDigits } from "../utils/bn";
import { useTheme } from "../context/ThemeContext";
import {
  ThemeMilestoneIcon,
  ThemeChipIcon,
} from "./ThemeIcons";
import {
  CutePartyIcon,
} from "./KittyIcons";

const milestones = rawMilestones.slice(0, 8);

const levelFor = (id: number) =>
  id <= 3 ? "বেসিক কোর্স" : id <= 6 ? "ইন্টারমিডিয়েট কোর্স" : "অ্যাডভান্সড কোর্স";

const ESTIMATED_TIMES: Record<number, string> = {
  1: "৪০ মিনিট",
  2: "৪৫ মিনিট",
  3: "৪৫ মিনিট",
  4: "৩৫ মিনিট",
  5: "৫০ মিনিট",
  6: "৫৫ মিনিট",
  7: "৫০ মিনিট",
  8: "৬০ মিনিট",
};

interface DeckCardProps {
  milestone: ModuleMeta;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

const STICKY_BASE_TOP = "clamp(72px, 9vh, 88px)";
const STICKY_STEP_PX = 16;
const CARD_RUNWAY = "clamp(180px, 30vh, 240px)";

const DeckCard = memo(function DeckCard({ milestone: m, index: i, total, progress }: DeckCardProps) {
  const { getAccent } = useTheme();
  const isLast = i === total - 1;
  const accent = getAccent(m.id);
  const estTime = ESTIMATED_TIMES[m.id] || "৪০ মিনিট";
  const levelTitle = levelFor(m.id);
  const bnNumber = bnDigits(m.id); // e.g. "০১", "০২" (single zero)

  /**
   * Layout animation timeline:
   * Each card gently compresses down in scale as the next card arrives over it.
   * Card 8 (isLast) stays firmly at scale: 1.0 pinned at the top.
   */
  const stepStart = i / total;
  const stepEnd = Math.min(1, (i + 1) / total);

  // Progressive target scale: earlier cards slightly scale down to create stacked depth
  const targetScale = isLast ? 1 : 1 - (total - 1 - i) * 0.014;

  const scale = useTransform(
    progress,
    [Math.max(0, stepStart - 0.04), Math.min(1, stepEnd)],
    [1, targetScale]
  );

  const dim = useTransform(
    progress,
    [Math.max(0, stepStart), Math.min(1, stepEnd)],
    [0, 0.36]
  );

  return (
    <div
      className="sticky"
      style={{
        /* Stepped top offset: linear arithmetic progression across all cards */
        top: `calc(${STICKY_BASE_TOP} + ${i * STICKY_STEP_PX}px)`,
        /* Linear z-index: ensures each arriving card stacks cleanly above previous ones */
        zIndex: i + 1,
        /* Unified scroll runway: EVERY card has the identical margin to travel and stick */
        marginBottom: CARD_RUNWAY,
      }}
    >
      <Link
        to={`/${m.slug}`}
        aria-label={`${m.title} অধ্যায় পড়ুন`}
        className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 rounded-2xl"
      >
        <motion.article
          style={{
            scale: isLast ? 1 : scale,
            ["--ac" as string]: accent,
          }}
          className={`relative overflow-hidden rounded-2xl border border-pink-500/[0.18] bg-[#140b1c] shadow-[0_16px_40px_-15px_rgba(0,0,0,0.8)] transition-all duration-300 group-hover:border-pink-400/40 group-hover:shadow-[0_20px_50px_-12px_rgba(255,117,143,0.3)] transform-gpu ${
            i % 2 === 0 ? "md:mr-3" : "md:ml-3"
          }`}
        >
          {/* Theme colored book spine on the left edge */}
          <div
            aria-hidden
            className="absolute left-0 top-0 bottom-0 w-[4px]"
            style={{
              background: `linear-gradient(180deg, ${accent}, var(--theme-primary, #ff758f))`,
              boxShadow: `0 0 14px ${accent}aa`,
            }}
          />

          {/* Theme ambient subtle glow scaled by intensity */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 right-0 w-72 h-36 blur-2xl transition-opacity duration-300"
            style={{
              background: accent,
              opacity: "calc(0.22 * var(--bg-glow-scale, 0.6))",
            }}
          />

          {/* Background ghost number watermark in Bengali digits */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-4 top-2 select-none flex items-center gap-1 opacity-[0.06] sm:opacity-[0.08]"
          >
            <span
              className="font-bengali text-5xl font-black tracking-tighter"
              style={{ color: accent }}
            >
              {bnNumber}
            </span>
          </div>

          <div className="p-5 sm:p-6 pl-6 sm:pl-7">
            {/* Header: Bengali Number Badge + Mascot SVG Icon + Chapter Title */}
            <div className="flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                {/* Bengali Number Badge (e.g. ০১, ০২, ০৩ ...) */}
                <span
                  className="flex size-7 items-center justify-center rounded-lg border font-bengali text-[13px] font-bold shadow-sm"
                  style={{
                    borderColor: `${accent}66`,
                    background: `linear-gradient(135deg, ${accent}30, ${accent}0d)`,
                    color: accent,
                  }}
                >
                  {bnNumber}
                </span>

                {/* Theme Mascot SVG Icon in Header */}
                <div
                  className="flex size-7 items-center justify-center rounded-lg border shadow-sm transition-transform duration-300 group-hover:scale-110"
                  style={{
                    borderColor: `${accent}44`,
                    background: `${accent}16`,
                  }}
                >
                  <ThemeMilestoneIcon moduleId={m.id} size={18} color={accent} />
                </div>

                <div className="flex items-center gap-1 font-bengali font-bold tracking-wide text-[13px] sm:text-sm">
                  <span style={{ color: accent }}>অধ্যায় {bnDigits(m.id)}</span>
                </div>

                <span className="text-white/20">·</span>
                <span className="font-bengali text-white/60 hidden sm:inline text-[12px]">
                  {levelTitle}
                </span>
              </div>

              {m.id === 1 && (
                <span
                  className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-bengali text-[10.5px] font-medium shadow-sm"
                  style={{
                    borderColor: "var(--theme-surface-border)",
                    background: "var(--theme-badge-bg)",
                    color: "var(--theme-primary)",
                  }}
                >
                  <CheckCircle2 className="size-3" style={{ color: "var(--theme-primary)" }} />
                  সম্পন্ন
                </span>
              )}
            </div>

            {/* Main Info: Bespoke Theme Mascot SVG + Title + Study Description */}
            <div className="mt-3.5 flex items-start gap-3.5">
              <div
                className="flex size-12 flex-none items-center justify-center rounded-2xl border shadow-md transition-transform duration-300 group-hover:scale-105"
                style={{
                  borderColor: `${accent}35`,
                  background: `linear-gradient(135deg, ${accent}25, ${accent}08)`,
                  boxShadow: `0 8px 24px -6px ${accent}40`,
                }}
              >
                <ThemeMilestoneIcon
                  moduleId={m.id}
                  size={32}
                  color={accent}
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-display text-lg font-bold text-white sm:text-xl tracking-tight transition-colors">
                  {m.title}
                </h3>
                <p className="mt-1 font-bengali text-sm text-white/70 leading-relaxed line-clamp-2">
                  {m.cardDesc}
                </p>
              </div>
            </div>

            {/* Clean Footer Row: Metadata & Study Link */}
            <div className="mt-4 flex items-center justify-between border-t border-white/[0.08] pt-3 text-xs">
              <div className="flex items-center gap-3 font-bengali text-white/60">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="size-3.5 opacity-80" style={{ color: "var(--theme-primary)" }} />
                  {bnDigits(m.lessons.length)}টি পাঠ
                </span>
                <span className="text-white/20">·</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="size-3.5 opacity-80" style={{ color: "var(--theme-primary)" }} />
                  {estTime}
                </span>
              </div>

              <div
                className="inline-flex items-center gap-1.5 font-bengali font-semibold text-white transition-colors"
                style={{
                  ["--hover-clr" as string]: "var(--theme-primary)",
                }}
              >
                <span>অধ্যায়টি পড়ুন</span>
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </div>

          {/* Dim overlay while covered by later cards in the stack */}
          {!isLast && (
            <motion.span
              aria-hidden
              style={{ opacity: dim }}
              className="pointer-events-none absolute inset-0 bg-[#0a050f]"
            />
          )}
        </motion.article>
      </Link>
    </div>
  );
});

export default function Roadmap() {
  const deckRef = useRef<HTMLDivElement>(null);

  /**
   * Target scroll progress of the complete deck container.
   * Maps continuously from start to end of the deck runway.
   */
  const { scrollYProgress } = useScroll({
    target: deckRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="roadmap"
      aria-labelledby="roadmap-heading"
      className="relative px-4 py-20 sm:px-6 md:py-28 lg:px-8"
    >
      {/* Background Kitty ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden -z-10"
      >
        <div className="absolute left-1/2 top-[8%] h-[520px] w-[680px] -translate-x-1/2 rounded-full bg-[#ff758f]/[0.08] blur-[160px]" />
        <div className="absolute right-[10%] top-[40%] h-[380px] w-[380px] rounded-full bg-[#c77dff]/[0.06] blur-[140px]" />
      </div>

      {/* Section Header */}
      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-pink-400/25 bg-pink-500/10 px-4 py-1.5 font-bengali text-xs tracking-wide text-pink-200 backdrop-blur shadow-[0_0_20px_rgba(255,117,143,0.15)]"
        >
          <Sparkles className="size-3.5 text-[#ff758f]" />
          <span>সম্পূর্ণ সিলেবাস ও স্টাডি গাইড</span>
        </motion.div>

        <motion.h2
          id="roadmap-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl tracking-tight"
        >
          সম্পূর্ণ <span className="text-gradient-kotlin">রোডম্যাপ</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-3 font-bengali text-sm leading-relaxed text-pink-100/70 md:text-base"
        >
          ৮টি অধ্যায় ও ৮৮টি ধারাবাহিক পাঠে সাজানো গোছানো স্টাডি কারিকুলাম।
        </motion.p>
      </div>

      {/* The Deck — Clean Sticky Stacked Cards with Uniform Runway & Smooth Exit */}
      <div
        ref={deckRef}
        className="relative mx-auto mt-12 max-w-2xl md:mt-16"
        style={{
          /* Natural breathing room after the complete stacked deck before the goal marker */
          paddingBottom: "clamp(40px, 6vh, 64px)",
        }}
      >
        {milestones.map((m, i) => (
          <DeckCard
            key={m.id}
            milestone={m}
            index={i}
            total={milestones.length}
            progress={scrollYProgress}
          />
        ))}
      </div>

      {/* Goal Marker — Milestone Achieved Flag */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        whileInView={{ scale: 1, opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className="relative mt-4 flex flex-col items-center gap-3 text-center pb-12"
      >
        <div className="relative">
          <div
            aria-hidden
            className="animate-pulse-soft absolute -inset-4 rounded-full blur-xl"
            style={{
              background:
                "radial-gradient(circle, rgba(255,117,143,0.45) 0%, rgba(199,125,255,0.3) 60%, transparent 80%)",
            }}
          />
          <span className="relative flex size-14 items-center justify-center rounded-2xl rotate-45 border border-pink-300/30 bg-gradient-to-br from-[#ff5d8f] via-[#ff758f] to-[#c77dff] shadow-[0_0_40px_-5px_rgba(255,117,143,0.8)]">
            <Trophy className="size-6 text-white -rotate-45" />
          </span>
        </div>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-400/35 bg-pink-950/60 px-4 py-1.5 font-bengali text-xs font-bold text-pink-100 shadow-[0_0_20px_rgba(255,117,143,0.3)] backdrop-blur">
            <CutePartyIcon size={14} color="#ffd166" />
            <span>লক্ষ্য অর্জন — প্রফেশনাল Kotlin ডেভেলপার</span>
            <ThemeChipIcon size={12} color="var(--theme-primary, #ff758f)" />
          </div>
          <p className="max-w-sm font-bengali text-xs leading-relaxed text-pink-200/60">
            ৮টি অধ্যায়ের সবকটি পাঠ সম্পন্ন করে আধুনিক কোটলিন ডেভেলপমেন্টে দক্ষ হয়ে উঠুন।
          </p>
        </div>
      </motion.div>
    </section>
  );
}
