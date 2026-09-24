import { Link } from "react-router";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Map, Sparkles } from "lucide-react";
import { ThemeChipIcon } from "./ThemeIcons";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const MotionLink = motion.create(Link);

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-24 sm:px-6 md:pb-24 md:pt-32 lg:px-8"
    >
      {/* Background ambient lights scaled by theme & intensity — GPU-friendly blur */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden -z-10 transition-opacity duration-300 transform-gpu"
        style={{ opacity: "var(--bg-glow-scale, 0.6)" }}
      >
        <div
          className="absolute top-[8%] left-1/2 h-[480px] w-[640px] -translate-x-1/2 rounded-full blur-[72px] transition-colors duration-500"
          style={{ background: "var(--theme-glow)" }}
        />
        <div
          className="absolute top-[28%] right-[10%] h-[320px] w-[320px] rounded-full blur-[64px] transition-colors duration-500"
          style={{ background: "var(--theme-secondary-glow)" }}
        />
        <div
          className="absolute top-[35%] left-[-80px] h-[280px] w-[280px] rounded-full blur-[64px] transition-colors duration-500"
          style={{ background: "var(--theme-tertiary-glow)" }}
        />
      </div>

      {/* floating code chips — theme-adaptive */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-[5%] top-[30%] hidden lg:block xl:left-[8%]"
      >
        <div
          className="animate-float-y rounded-2xl border px-4 py-3 font-mono text-[11px] text-pink-200/70 shadow-[0_16px_48px_-16px_rgba(0,0,0,0.5)] transform-gpu"
          style={{
            borderColor: "var(--theme-surface-border)",
            background: "var(--theme-card-bg)",
            ["--flt-r" as string]: "-5deg",
          }}
        >
          <div className="flex items-center gap-1.5 pb-1.5 mb-1.5 border-b border-white/[0.08] text-[9px] text-pink-300/50">
            <ThemeChipIcon size={10} color="var(--theme-primary, #ff758f)" /> main.kt
          </div>
          <div>
            <span style={{ color: "var(--theme-primary)" }}>fun</span>{" "}
            <span className="text-white">main</span>
            <span className="text-pink-300/60">() {"{"}</span>
          </div>
          <div className="pl-4 text-pink-300/80">
            <span style={{ color: "var(--theme-secondary)" }}>println</span>(
            <span className="text-white/90">"হ্যালো, Kotlin!"</span>)
          </div>
          <span className="text-pink-300/60">{"}"}</span>
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.25, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-[5%] top-[25%] hidden lg:block xl:right-[8%]"
      >
        <div
          className="animate-float-y rounded-2xl border px-4 py-3 font-mono text-[11px] text-pink-200/70 shadow-[0_16px_48px_-16px_rgba(0,0,0,0.5)] transform-gpu"
          style={{
            borderColor: "var(--theme-surface-border)",
            background: "var(--theme-card-bg)",
            ["--flt-r" as string]: "4deg",
            animationDelay: "-3.2s",
          }}
        >
          <div className="flex items-center gap-1.5 pb-1.5 mb-1.5 border-b border-white/[0.08] text-[9px] text-pink-300/50">
            <ThemeChipIcon size={10} color="var(--theme-primary, #ff758f)" /> journey.kt
          </div>
          <span style={{ color: "var(--theme-primary)" }}>val</span>{" "}
          <span className="text-white">status</span>{" "}
          <span className="text-pink-300/60">=</span>{" "}
          <span className="text-white/90">"শুরু"</span>
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-[24%] right-[11%] hidden xl:block"
      >
        <div
          className="animate-float-y flex items-center gap-2 rounded-xl border px-3.5 py-2 font-bengali text-[11.5px] text-pink-200/70 shadow-[0_16px_48px_-16px_rgba(0,0,0,0.5)] transform-gpu"
          style={{
            borderColor: "var(--theme-surface-border)",
            background: "var(--theme-card-bg)",
            ["--flt-r" as string]: "-3deg",
            animationDelay: "-5s",
          }}
        >
          <ThemeChipIcon size={12} color="var(--theme-primary, #ff758f)" />
          <span>সম্পূর্ণ বাংলায় <span className="font-semibold" style={{ color: "var(--theme-primary)" }}>Kotlin গাইড</span></span>
        </div>
      </motion.div>

      {/* content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        {/* badge */}
        <motion.div variants={fadeUp} className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/25 bg-pink-500/10 px-4 py-1.5 backdrop-blur shadow-[0_0_20px_rgba(255,117,143,0.2)]">
            <Sparkles className="size-3.5 text-[#ff758f]" />
            <span className="font-bengali text-[12px] font-semibold tracking-[0.04em] text-pink-200">
              আধুনিক ও সম্পূর্ণ বাংলা গাইড
            </span>
          </span>
        </motion.div>

        {/* heading */}
        <motion.h1
          id="hero-heading"
          variants={fadeUp}
          className="mt-8 font-display text-[clamp(2.5rem,7vw,5.4rem)] font-bold leading-[1.18]"
        >
          <span className="block text-white">Kotlin শিখুন</span>
          <span className="text-gradient-kotlin block pb-1">সহজ ও সাবলীল</span>
          <span className="block text-white">বাংলা ভাষায়</span>
        </motion.h1>

        {/* description */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-7 max-w-xl font-bengali text-base leading-relaxed text-pink-100/70 md:text-lg"
        >
          Kotlin-এর Fundamentals থেকে Advanced concepts পর্যন্ত প্রতিটি ধাপ ধাপে শিখুন গভীরতা ও স্পষ্টতার সাথে।
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <MotionLink
            to="/fundamentals"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-[#ff5d8f] via-[#ff758f] to-[#c77dff] px-8 py-4 font-bengali text-[15px] font-bold text-white shadow-[0_16px_48px_-12px_rgba(255,117,143,0.7)] transition-shadow duration-300 hover:shadow-[0_20px_56px_-10px_rgba(255,117,143,0.85)] sm:w-auto"
          >
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
            />
            <span className="relative">পড়া শুরু করুন</span>
            <ArrowRight className="relative size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </MotionLink>

          <MotionLink
            to="/#roadmap"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-pink-400/30 bg-pink-500/5 px-8 py-4 font-bengali text-[15px] font-semibold text-pink-100 backdrop-blur transition-[border-color,background-color,box-shadow] duration-300 hover:border-[#ff758f]/60 hover:bg-pink-500/15 sm:w-auto shadow-[0_0_20px_rgba(255,117,143,0.15)]"
          >
            <Map className="size-4 text-pink-300 transition-colors duration-300 group-hover:text-[#ff758f]" />
            <span>রোডম্যাপ দেখুন</span>
          </MotionLink>
        </motion.div>

        {/* micro trust line */}
        <motion.p
          variants={fadeUp}
          className="mt-9 font-bengali text-[11.5px] tracking-[0.06em] text-pink-300/50 flex items-center justify-center gap-2"
        >
          <ThemeChipIcon size={12} color="var(--theme-primary, #ff758f)" />
          <span>৮টি মডিউল • Beginner থেকে Advanced • সম্পূর্ণ ফ্রি</span>
        </motion.p>
      </motion.div>

      {/* scroll indicator */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5"
      >
        <span className="font-bengali text-[10px] tracking-[0.1em] text-pink-300/50 flex items-center gap-1.5">
          <ThemeChipIcon size={10} color="var(--theme-primary, #ff758f)" />
          <span>স্ক্রোল করে রোডম্যাপ দেখুন</span>
        </span>
        <span className="relative block h-10 w-px overflow-hidden bg-pink-400/20">
          <span className="animate-scroll-dot absolute left-0 top-0 block h-2 w-px rounded-full bg-gradient-to-b from-[#ff758f] to-[#c77dff]" />
        </span>
      </motion.div>
    </section>
  );
}
