import { Link, Navigate, useParams } from "react-router";
import { motion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronRight, CheckCircle2, Trophy, Clock, BookOpen, Sparkles } from "lucide-react";
import { findModule, modules } from "../data/modules";
import { bnDigits } from "../utils/bn";
import { useTheme } from "../context/ThemeContext";
import {
  ThemeMilestoneIcon,
  ThemeChipIcon,
  ThemeWatermarkIcon,
  ThemeLessonBadge,
} from "../components/ThemeIcons";
import {
  CutePartyIcon,
  CuteStarIcon,
  CuteHeartIcon,
} from "../components/KittyIcons";

/* opacity + transform only — lightweight, no blur/scroll effects */
const rise: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const levelFor = (id: number) =>
  id <= 3 ? "বেসিক লেভেল" : id <= 6 ? "ইন্টারমিডিয়েট লেভেল" : "অ্যাডভান্সড লেভেল";

export default function ModulePage() {
  const { slug } = useParams<{ slug: string }>();
  const module = findModule(slug);

  if (!module) {
    return <Navigate to="/" replace />;
  }

  const { getAccent } = useTheme();

  // Consistent Theme Accent for this milestone
  const ac = getAccent(module.id);
  const prevModule = modules[module.id - 2];
  const nextModule = modules[module.id];
  const nextAc = nextModule ? getAccent(nextModule.id) : ac;
  const bnNumber = bnDigits(module.id); // e.g. "০১", "০২" (single leading zero)

  return (
    <div className="relative z-10 mx-auto w-full max-w-2xl px-4 pb-28 pt-20 sm:px-6 md:pt-24 overflow-x-clip">
      {/* Top accent glow matching this milestone's color, scaled by user's bg intensity */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden -z-10 transform-gpu"
      >
        <div
          className="absolute left-1/2 top-8 h-[300px] w-[520px] max-w-[100vw] -translate-x-1/2 rounded-full blur-[64px] transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle, ${ac}33 0%, var(--theme-glow) 50%, transparent 80%)`,
            opacity: "calc(0.7 * var(--bg-glow-scale, 0.6))",
          }}
        />
      </div>

      {/* Module header */}
      <motion.header
        variants={group}
        initial="hidden"
        animate="show"
      >
        {/* Breadcrumb */}
        <motion.nav
          variants={rise}
          aria-label="breadcrumb"
          className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px]"
        >
          <Link
            to="/"
            className="flex items-center gap-1 font-display text-pink-300/60 transition-colors hover:text-pink-200"
          >
            <span>Kotlin বাংলা</span>
          </Link>
          <ChevronRight aria-hidden className="size-3.5 text-pink-400/30" />
          <Link
            to="/#roadmap"
            className="font-display text-pink-300/60 transition-colors hover:text-pink-200"
          >
            Roadmap
          </Link>
          <ChevronRight aria-hidden className="size-3.5 text-pink-400/30" />
          <span className="font-display font-semibold" style={{ color: ac }}>
            {module.title}
          </span>
        </motion.nav>

        {/* Milestone Mascot & Theme Icon Badge */}
        <motion.div variants={rise} className="mt-6 flex items-center gap-4">
          {/* Custom Mascot SVG container matching milestone theme */}
          <div
            className="flex size-16 flex-none items-center justify-center rounded-2xl border shadow-lg transition-transform duration-300 hover:scale-105"
            style={{
              borderColor: `${ac}55`,
              background: `linear-gradient(135deg, ${ac}28, ${ac}0a)`,
              boxShadow: `0 10px 30px -8px ${ac}50`,
            }}
          >
            <ThemeMilestoneIcon
              moduleId={module.id}
              size={40}
              color={ac}
            />
          </div>

          <div>
            {/* Theme Icon Badge instead of raw text number */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold shadow-sm"
                style={{
                  borderColor: `${ac}55`,
                  background: `linear-gradient(135deg, ${ac}25, ${ac}0a)`,
                  color: ac,
                }}
              >
                <ThemeChipIcon size={13} color={ac} />
                <span className="font-bengali">অধ্যায় {bnNumber}</span>
                <span className="text-white/30">•</span>
                <ThemeWatermarkIcon variant="primary" size={14} color={ac} />
              </span>

              <span className="font-bengali text-xs font-semibold text-pink-200/70">
                / {bnDigits(modules.length)}টি অধ্যায়
              </span>
            </div>
            <p className="mt-1.5 font-bengali text-[12.5px] text-pink-200/60 flex items-center gap-1.5">
              <span>{levelFor(module.id)}</span>
            </p>
          </div>
        </motion.div>

        {/* Module Title */}
        <motion.h1
          variants={rise}
          className="mt-6 font-display text-4xl font-bold text-white sm:text-5xl tracking-tight"
        >
          {module.title}
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={rise}
          className="mt-3 max-w-lg font-bengali text-base leading-relaxed text-pink-100/70"
        >
          {module.moduleDesc}
        </motion.p>

        {/* Metadata stats pill */}
        <motion.div
          variants={rise}
          className="mt-4 flex flex-wrap items-center gap-3 font-bengali text-[13px] text-pink-200/60"
        >
          <span className="flex items-center gap-1.5 rounded-full border border-pink-400/20 bg-pink-500/5 px-3 py-1">
            <BookOpen className="size-3.5 text-pink-400/80" />
            {bnDigits(module.lessons.length)} টি পাঠ
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-pink-400/20 bg-pink-500/5 px-3 py-1">
            <Clock className="size-3.5 text-pink-400/80" />
            আনুমানিক {bnDigits(module.lessons.length * 8)} মিনিট
          </span>
          <span className="rounded-full border border-pink-400/20 bg-pink-500/5 px-3 py-1">
            {levelFor(module.id)}
          </span>
        </motion.div>

        {/* Module 1 Milestone Completed Banner */}
        {module.slug === "fundamentals" && (
          <motion.div variants={rise} className="mt-4 flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-bengali text-[12px] font-semibold shadow-sm"
              style={{
                borderColor: `${ac}66`,
                background: `linear-gradient(135deg, ${ac}25, ${ac}0a)`,
                color: "#ffd6e0",
              }}
            >
              <CheckCircle2 className="size-3.5" style={{ color: ac }} />
              <span>মডিউল সম্পন্ন • ১০/১০ লেসন প্রস্তুত</span>
              <CutePartyIcon size={14} color="#ffd166" />
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-400/30 bg-[#1f1027] px-3 py-1 font-bengali text-[12px] font-medium text-pink-200">
              <CuteStarIcon size={14} color="#ffd166" />
              <span>১০০% ফাউন্ডেশন কভারেজ</span>
            </span>
          </motion.div>
        )}

        {/* Divider with Kitty accent glow */}
        <motion.span
          variants={rise}
          aria-hidden
          className="mt-7 block h-px"
          style={{
            background: `linear-gradient(to right, ${ac}88, rgba(255,117,143,0.15), transparent)`,
          }}
        />
      </motion.header>

      {/* Lesson list matching milestone theme & color */}
      <motion.ol
        variants={group}
        initial="hidden"
        animate="show"
        className="mt-9 flex flex-col"
        aria-label="লেসনের তালিকা"
      >
        {module.lessons.map((lesson, i) => (
          <motion.li
            key={lesson.id}
            variants={rise}
            className="flex gap-4 pb-3.5 last:pb-0 sm:gap-5"
          >
            {/* Theme-adaptive number badge rail */}
            <div className="flex flex-col items-center flex-none">
              <ThemeLessonBadge number={bnDigits(lesson.id)} accent={ac} />
              {i < module.lessons.length - 1 && (
                <span
                  aria-hidden
                  className="my-1.5 w-[2px] flex-1 rounded-full"
                  style={{
                    background: `linear-gradient(to bottom, ${ac}66, ${ac}14)`,
                  }}
                />
              )}
            </div>

            {/* Lesson card — navigates to the lesson page */}
            <Link
              to={`/${module.slug}/${lesson.slug}`}
              aria-label={`${lesson.title} লেসনে যান`}
              style={{ ["--ac" as string]: ac }}
              className="rail-card group relative flex flex-1 items-center gap-4 overflow-hidden rounded-2xl border border-pink-500/[0.16] bg-gradient-to-b from-[#160c1e] to-[#0f0715] py-4 pl-5 pr-4 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-pink-400/40 hover:shadow-[0_12px_32px_-8px_rgba(255,117,143,0.25)] sm:py-5 sm:pl-6"
            >
              {/* Left accent book spine rail */}
              <span
                aria-hidden
                className="absolute bottom-3 left-0 top-3 w-[3.5px] rounded-full"
                style={{
                  background: `linear-gradient(to bottom, ${ac}, #ff758f)`,
                  boxShadow: `0 0 10px ${ac}88`,
                }}
              />

              <span className="min-w-0 flex-1">
                <span className="block font-display text-[15px] font-bold text-white transition-colors group-hover:text-pink-100 sm:text-base">
                  {lesson.title}
                </span>
                <span className="mt-1 block font-bengali text-[13px] leading-relaxed text-pink-200/60 sm:text-sm">
                  {lesson.desc}
                </span>
              </span>

              {/* Arrow button with Kitty theme hover */}
              <span
                className="rail-arrow flex size-9 flex-none items-center justify-center rounded-full border border-pink-500/20 bg-pink-500/5 text-pink-300/60 shadow-sm transition-all duration-300 group-hover:scale-110"
                style={{
                  borderColor: `${ac}40`,
                }}
              >
                <ArrowRight className="size-4" style={{ color: ac }} />
              </span>
            </Link>
          </motion.li>
        ))}
      </motion.ol>

      {/* Module Complete Celebration & Next Step Banner */}
      {module.slug === "fundamentals" && nextModule && (
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative mt-10 overflow-hidden rounded-3xl border p-6 shadow-2xl sm:p-8"
          style={{
            borderColor: `${ac}45`,
            background: `linear-gradient(135deg, ${ac}18, #180d22 65%, #0e0714)`,
            boxShadow: `0 20px 50px -15px ${ac}30, inset 0 1px 0 rgba(255,255,255,0.12)`,
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl opacity-30"
            style={{ background: ac }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-12 -bottom-12 h-44 w-44 rounded-full blur-3xl opacity-20"
            style={{ background: nextAc }}
          />

          <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <span
                  className="flex size-8 items-center justify-center rounded-xl border text-amber-300"
                  style={{
                    borderColor: `${ac}55`,
                    background: `${ac}22`,
                  }}
                >
                  <Trophy className="size-4.5 text-amber-300" />
                </span>
                <span className="font-bengali text-[13px] font-bold flex items-center gap-1.5" style={{ color: ac }}>
                  <span>মাইলস্টোন অর্জিত!</span>
                  <CutePartyIcon size={14} color="#ffd166" />
                </span>
              </div>

              <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                অভিনন্দন! {module.title} মডিউল সম্পন্ন হয়েছে
              </h3>

              <p className="max-w-xl font-bengali text-[14.5px] leading-relaxed text-pink-100/80">
                আপনি কোটলিনের মৌলিক ভিত্তি—ভেরিয়েবল, ডেটা টাইপ, টাইপ কাস্টিং, অপারেটর ও স্ট্রিং টেমপ্লেটের ১০টি লেসন সাফল্যের সাথে শেষ করেছেন। এবার ডিসিশন মেকিং ও লুপের জগতে প্রবেশ করুন!
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1 font-bengali text-[12px] text-pink-200/70">
                <span className="inline-flex items-center gap-1 rounded-md border border-pink-400/30 bg-pink-500/10 px-2 py-0.5 text-pink-200 font-medium">
                  <CheckCircle2 className="size-3 text-[#ff758f]" />
                  ১০/১০ লেসন সম্পন্ন
                </span>
                <span className="inline-flex items-center gap-1 rounded-md border border-purple-400/30 bg-purple-500/10 px-2 py-0.5 text-purple-200 font-medium">
                  <Sparkles className="size-3 text-[#c77dff]" />
                  বেসিক লেভেল আনলকড
                </span>
              </div>
            </div>

            <div className="flex-none w-full sm:w-auto">
              <Link
                to={`/${nextModule.slug}`}
                style={{
                  background: `linear-gradient(135deg, ${nextAc}, #ff758f)`,
                  boxShadow: `0 0 30px ${nextAc}60`,
                }}
                className="group flex w-full sm:inline-flex items-center justify-center gap-2.5 sm:gap-3 rounded-2xl px-4 sm:px-5 py-3 sm:py-3.5 font-display text-[13.5px] sm:text-[14.5px] font-bold text-white transition-all hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(255,117,143,0.6)] text-center"
              >
                <span className="font-bengali">মডিউল ০২: {nextModule.title} শুরু করুন</span>
                <ArrowRight className="size-4 sm:size-4.5 flex-none transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      {/* Bottom module navigation */}
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2"
      >
        {prevModule ? (
          <motion.div variants={rise}>
            <Link
              to={`/${prevModule.slug}`}
              className="group flex h-full items-center gap-3.5 rounded-2xl border border-pink-500/20 bg-[#160c1d] p-4 transition-all duration-200 hover:border-pink-400/40 hover:bg-[#1a0e23] shadow-sm"
            >
              <div
                className="flex size-10 flex-none items-center justify-center rounded-xl border border-pink-400/20 bg-pink-500/10"
              >
                <ThemeMilestoneIcon moduleId={prevModule.id} size={22} color={getAccent(prevModule.id)} />
              </div>
              <span className="min-w-0">
                <span className="block font-bengali text-[13px] font-semibold text-pink-200">
                  আগের মডিউল
                </span>
                <span className="mt-0.5 block font-display text-[12.5px] text-pink-300/60 group-hover:text-white transition-colors">
                  {prevModule.title}
                </span>
              </span>
            </Link>
          </motion.div>
        ) : (
          <motion.div variants={rise}>
            <Link
              to="/#roadmap"
              className="group flex h-full items-center gap-3 rounded-2xl border border-pink-500/20 bg-[#160c1d] p-4 transition-all duration-200 hover:border-pink-400/40 hover:bg-[#1a0e23]"
            >
              <ArrowLeft className="size-4 flex-none text-pink-300 transition-transform duration-200 group-hover:-translate-x-0.5" />
              <span className="min-w-0">
                <span className="block font-bengali text-[13px] font-semibold text-pink-200">
                  রোডম্যাপ
                </span>
                <span className="mt-0.5 block font-bengali text-[12px] text-pink-300/60">
                  শুরুতে ফিরে যান
                </span>
              </span>
            </Link>
          </motion.div>
        )}

        {nextModule ? (
          <motion.div variants={rise}>
            <Link
              to={`/${nextModule.slug}`}
              className="group flex h-full items-center justify-between gap-3 rounded-2xl border p-4 text-right transition-all duration-200 hover:scale-[1.01] shadow-md"
              style={{
                borderColor: `${nextAc}55`,
                background: `linear-gradient(135deg, ${nextAc}20, #160c1d 60%)`,
                boxShadow: `0 8px 24px -8px ${nextAc}40`,
              }}
            >
              <div
                className="flex size-10 flex-none items-center justify-center rounded-xl border"
                style={{
                  borderColor: `${nextAc}40`,
                  background: `${nextAc}15`,
                }}
              >
                <ThemeMilestoneIcon moduleId={nextModule.id} size={22} color={nextAc} />
              </div>
              <span className="min-w-0">
                <span className="block font-bengali text-[13px] font-bold text-white">
                  পরের মডিউল
                </span>
                <span
                  className="mt-0.5 block font-display text-[12.5px] font-semibold"
                  style={{ color: nextAc }}
                >
                  {nextModule.title}
                </span>
              </span>
              <ArrowRight
                className="size-4 flex-none transition-transform duration-200 group-hover:translate-x-0.5"
                style={{ color: nextAc }}
              />
            </Link>
          </motion.div>
        ) : (
          <motion.div
            variants={rise}
            className="flex items-center justify-end gap-3 rounded-2xl border border-pink-500/10 bg-[#160c1d]/60 p-4 text-right opacity-60"
          >
            <span className="min-w-0">
              <span className="block font-bengali text-[13px] font-semibold text-pink-200/50">
                শেষ মডিউল
              </span>
              <span className="mt-0.5 block font-bengali text-[12px] text-pink-300/40">
                সবগুলো মডিউল শেষ
              </span>
            </span>
            <ArrowRight className="size-4 flex-none text-pink-300/40" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
