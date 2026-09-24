import { useState, useMemo, memo, useEffect, type ReactNode } from "react";
import { Link, Navigate, useParams } from "react-router";
import { motion, useScroll, type MotionValue, type Variants } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Lightbulb,
  Sparkles,
  Code2,
  Zap,
  Lock,
  Unlock,
  Box,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Trophy,
} from "lucide-react";
import { CodeBlock, CodeOutput } from "../components/CodeBlock";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { findLesson, modules } from "../data/modules";
import { getLessonContent } from "../data/lessonContents";
import { bnDigits } from "../utils/bn";
import { useTheme } from "../context/ThemeContext";
import {
  ThemeWatermarkIcon,
  ThemeChipIcon,
} from "../components/ThemeIcons";
import {
  KITTY_ACCENTS,
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
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
};

/** inline code inside Bengali prose */
const Inline = ({ children }: { children: ReactNode }) => (
  <code className="rounded-md bg-pink-500/10 px-1.5 py-0.5 font-mono text-[12px] text-[#ff758f]">
    {children}
  </code>
);

/** syntax-highlighted code line (manual tokens — no runtime highlighting lib) */
const Line = ({ n, children }: { n: number; children?: ReactNode }) => (
  <span className="block">
    <span className="mr-4 inline-block w-5 select-none text-right text-pink-300/30">
      {n}
    </span>
    {children ?? <span className="h-4" />}
  </span>
);

const KW = ({ children }: { children: ReactNode }) => (
  <span className="text-[#ff758f] font-medium">{children}</span>
);

const FN = ({ children }: { children: ReactNode }) => (
  <span className="text-[#c77dff] font-medium">{children}</span>
);

const TYP = ({ children }: { children: ReactNode }) => (
  <span className="text-[#70d6ff] font-medium">{children}</span>
);

const STR = ({ children }: { children: ReactNode }) => {
  if (typeof children === "string" && (children.includes("$") || children.includes("${"))) {
    // Break down string into literal parts and template interpolations
    const parts = children.split(/(\$\{[^}]+\}|\$[a-zA-Z_]\w*)/g);
    return (
      <span className="text-[#8fd48f]">
        {parts.map((part, idx) => {
          if (part.startsWith("$")) {
            return (
              <span key={idx} className="font-semibold text-[#c4b5fd]">
                {part}
              </span>
            );
          }
          return part;
        })}
      </span>
    );
  }
  return <span className="text-[#8fd48f]">{children}</span>;
};

const NUM = ({ children }: { children: ReactNode }) => (
  <span className="text-[#ffcb6b] font-medium">{children}</span>
);

const PN = ({ children }: { children: ReactNode }) => (
  <span className="text-slate-400">{children}</span>
);

const tokenLineCache = new Map<string, ReactNode>();

function renderTokens(line: string): ReactNode {
  const cached = tokenLineCache.get(line);
  if (cached !== undefined) return cached;

  const tokenRegex =
    /(\/\/[^\n]*|\/\*.*|\*\/|^\s*\*.*)|("""[\s\S]*?"""|"[^"\n]*")|('(?:[^'\\]|\\.)')|\b(fun|val|var|class|object|interface|if|else|when|for|while|return|package|import)\b|\b(Int|Double|Float|Long|Boolean|Char|String|Byte|Short)\b|\b(println|print|main|toDouble|toInt|toLong|toFloat|toString|trimIndent)\b|(\b\d+(?:\.\d+)?(?:[fFL])?\b)|(==|!=|<=|>=|\+\+|--|&&|\|\||\+=|-=|\*=|\/=|[%+\-*\/=<>!&|])|([{}()[\],;:])|([^\s"'{}()[\],;:=+*\/\-<>!&|%]+|\s+)/g;
  const elements: ReactNode[] = [];
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = tokenRegex.exec(line)) !== null) {
    const [full, comment, str, chr, kw, typ, fn, num, op, pn] = match;
    if (comment) {
      elements.push(
        <span key={key++} className="italic text-slate-500">
          {comment}
        </span>
      );
    } else if (str) {
      elements.push(<STR key={key++}>{str}</STR>);
    } else if (chr) {
      elements.push(<STR key={key++}>{chr}</STR>);
    } else if (kw) {
      elements.push(<KW key={key++}>{kw}</KW>);
    } else if (typ) {
      elements.push(<TYP key={key++}>{typ}</TYP>);
    } else if (fn) {
      elements.push(<FN key={key++}>{fn}</FN>);
    } else if (num) {
      elements.push(<NUM key={key++}>{num}</NUM>);
    } else if (op) {
      elements.push(
        <span key={key++} className="font-semibold text-amber-300">
          {op}
        </span>
      );
    } else if (pn) {
      elements.push(<PN key={key++}>{pn}</PN>);
    } else {
      elements.push(
        <span key={key++} className="text-slate-200">
          {full}
        </span>
      );
    }
  }
  const result = elements.length > 0 ? elements : <span className="text-slate-200">{line}</span>;
  tokenLineCache.set(line, result);
  return result;
}

const DynamicKotlinCode = memo(function DynamicKotlinCode({ code }: { code: string }) {
  const lines = useMemo(() => code.trim().split("\n"), [code]);
  return (
    <>
      {lines.map((l, i) => (
        <Line key={i} n={i + 1}>
          {renderTokens(l)}
        </Line>
      ))}
    </>
  );
});

/** Render specialized colored token badges */
function renderTokenBadge(rawToken: string, key: number, wasQuoted = false): ReactNode {
  const trimmed = rawToken.trim();
  // Strip any wrapping quotes or backticks to inspect the clean core token
  const unquoted = trimmed.replace(/^["'`]+|["'`]+$/g, "").trim();

  // 1. File extension or filename (e.g. .kt, Main.kt) -> Cyan badge (NEVER quotes)
  if (unquoted === ".kt" || unquoted === "Main.kt" || unquoted.endsWith(".kt")) {
    return (
      <code
        key={key}
        className="mx-0.5 inline-flex items-center rounded-md border border-cyan-500/35 bg-cyan-950/45 px-1.5 py-0.5 font-mono text-[12.5px] font-medium text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.12)]"
      >
        {unquoted}
      </code>
    );
  }

  // 2. Built-in types (Int, Double, Float, Long, Boolean, Char, String, Byte, Short) -> Sky/Cyan badge (NEVER quotes)
  if (/^(Int|Double|Float|Long|Boolean|Char|String|Byte|Short)$/.test(unquoted)) {
    return (
      <code
        key={key}
        className="mx-0.5 inline-flex items-center rounded-md border border-sky-500/35 bg-sky-950/45 px-1.5 py-0.5 font-mono text-[12.5px] font-medium text-sky-300 shadow-[0_0_10px_rgba(14,165,233,0.15)]"
      >
        {unquoted}
      </code>
    );
  }

  // 3. main() entry function -> Amber badge (NEVER quotes)
  if (unquoted === "main()" || unquoted === "main") {
    return (
      <code
        key={key}
        className="mx-0.5 inline-flex items-center rounded-md border border-amber-500/35 bg-amber-950/40 px-1.5 py-0.5 font-mono text-[12.5px] font-medium text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.12)]"
      >
        {unquoted.includes("(") ? unquoted : `${unquoted}()`}
      </code>
    );
  }

  // 4. Output or Conversion functions: println(), print(), toDouble(), toInt(), toLong(), toString(), trimIndent() -> Orange badge (NEVER quotes)
  if (
    /^(println|print|toDouble|toInt|toLong|toFloat|toString|trimIndent)$/.test(unquoted) ||
    /^(println\(\)|print\(\)|toDouble\(\)|toInt\(\)|toLong\(\)|toFloat\(\)|toString\(\)|trimIndent\(\))$/.test(unquoted)
  ) {
    return (
      <code
        key={key}
        className="mx-0.5 inline-flex items-center rounded-md border border-orange-500/35 bg-orange-950/40 px-1.5 py-0.5 font-mono text-[12.5px] font-medium text-[#fe8a3c] shadow-[0_0_10px_rgba(254,138,60,0.12)]"
      >
        {unquoted.includes("(") ? unquoted : `${unquoted}()`}
      </code>
    );
  }

  // 5. String Templates: $name, ${age + 1}, $variable, ${expression} -> Fuchsia/Purple badge (NEVER extra quotes)
  if (unquoted.startsWith("$")) {
    return (
      <code
        key={key}
        className="mx-0.5 inline-flex items-center rounded-md border border-fuchsia-500/35 bg-fuchsia-950/45 px-1.5 py-0.5 font-mono text-[12.5px] font-medium text-fuchsia-300 shadow-[0_0_10px_rgba(217,70,239,0.15)]"
      >
        {unquoted}
      </code>
    );
  }

  // 6. Comments: //, /* ... */, /** ... */ -> Slate italic badge
  if (unquoted.startsWith("//") || unquoted.startsWith("/*") || unquoted.startsWith("/**")) {
    return (
      <code
        key={key}
        className="mx-0.5 inline-flex items-center rounded-md border border-slate-700/50 bg-slate-900/60 px-1.5 py-0.5 font-mono text-[12px] italic text-slate-400"
      >
        {unquoted}
      </code>
    );
  }

  // 7. Operators: +, -, *, /, %, ==, !=, >, <, >=, <=, &&, ||, !, ++, --, +=, -=, etc. -> Amber badge
  if (/^(\+|-|\*|\/|%|==|!=|>|<|>=|<=|&&|\|\||!|\+\+|--|\+=|-=|\*=|\/=|\+,\s*-\s*,\s*\*,\s*\/)$/.test(unquoted)) {
    return (
      <code
        key={key}
        className="mx-0.5 inline-flex items-center rounded-md border border-amber-500/35 bg-amber-950/45 px-1.5 py-0.5 font-mono text-[12.5px] font-medium text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.12)]"
      >
        {unquoted}
      </code>
    );
  }

  // 8. Function call expressions: print("A"), println("Hello"), toDouble(), etc.
  if (
    unquoted.startsWith("println(") ||
    unquoted.startsWith("print(") ||
    unquoted.startsWith("toDouble(") ||
    unquoted.startsWith("toInt(")
  ) {
    return (
      <code
        key={key}
        className="mx-0.5 inline-flex items-center rounded-md border border-orange-500/30 bg-[#0e0c18] px-1.5 py-0.5 font-mono text-[12.5px] shadow-[0_0_10px_rgba(0,0,0,0.3)]"
      >
        {renderTokens(unquoted)}
      </code>
    );
  }

  // 9. Kotlin keywords (fun, val, var, class, object, etc.) -> Purple badge (NEVER quotes)
  if (/^(fun|val|var|class|object|interface|if|else|when|for|while|return|package|import)$/.test(unquoted)) {
    return (
      <code
        key={key}
        className="mx-0.5 inline-flex items-center rounded-md border border-purple-500/35 bg-purple-950/45 px-1.5 py-0.5 font-mono text-[12.5px] font-medium text-[#b79cff] shadow-[0_0_10px_rgba(183,156,255,0.12)]"
      >
        {unquoted}
      </code>
    );
  }

  // 10. Symbols and brackets ({ }, ( ), ;, =, etc.) -> Slate badge (NEVER quotes)
  if (/^(\{\s*\}|\(\s*\)|\{|\}|\(\)|\(|\)|;|=|:)$/.test(unquoted)) {
    return (
      <code
        key={key}
        className="mx-0.5 inline-flex items-center rounded-md border border-white/15 bg-white/[0.08] px-1.5 py-0.5 font-mono text-[12.5px] font-semibold text-slate-200"
      >
        {unquoted}
      </code>
    );
  }

  // 11. Single Char literals: 'A', 'B', 'O', 'K', etc.
  if (/^'[^']'$/.test(trimmed) || /^'[^']'$/.test(unquoted)) {
    return (
      <code
        key={key}
        className="mx-0.5 inline-flex items-center rounded-md border border-emerald-500/30 bg-emerald-950/40 px-1.5 py-0.5 font-mono text-[12.5px] font-medium text-[#8fd48f] shadow-[0_0_10px_rgba(143,212,143,0.1)]"
      >
        {trimmed.startsWith("'") ? trimmed : `'${unquoted}'`}
      </code>
    );
  }

  // 12. String literal -> Emerald Green badge (WITH quotes)
  const isString =
    wasQuoted ||
    trimmed.startsWith('"') ||
    unquoted.includes("Hello") ||
    unquoted.includes("Kotlin") ||
    unquoted.includes("ready") ||
    unquoted.includes("welcome") ||
    unquoted.includes("awesome") ||
    unquoted.includes("learning") ||
    unquoted.includes("Shihab") ||
    unquoted.includes("Passed") ||
    /^(A|B|AB)$/.test(unquoted);

  if (isString) {
    return (
      <code
        key={key}
        className="mx-0.5 inline-flex items-center rounded-md border border-emerald-500/30 bg-emerald-950/40 px-1.5 py-0.5 font-mono text-[12.5px] font-medium text-[#8fd48f] shadow-[0_0_10px_rgba(143,212,143,0.1)]"
      >
        &quot;{unquoted}&quot;
      </code>
    );
  }

  // 13. General fallback code badge -> NO quotes
  return (
    <code
      key={key}
      className="mx-0.5 inline-flex items-center rounded-md border border-white/10 bg-white/[0.06] px-1.5 py-0.5 font-mono text-[12.5px] text-[#c4b5fd]"
    >
      {unquoted}
    </code>
  );
}

const bengaliTextCache = new Map<string, ReactNode>();

/** Formatter to highlight code terms, quotes, and keywords in Bengali text */
function formatBengaliText(text: string): ReactNode {
  if (!text) return null;
  const cached = bengaliTextCache.get(text);
  if (cached !== undefined) return cached;

  // Regex pattern matching:
  // 1. Double double quotes: ""...""
  // 2. Backticks: `...`
  // 3. Double quotes: "..."
  // 4. Single-quoted chars: 'A', 'B'
  // 5. String templates: $name, ${age + 1}
  // 6. Comments: //, /* ... */, /** ... */
  // 7. Operators: ==, !=, <=, >=, &&, ||, ++, --
  // 8. Functions with (): println(), print(), main(), toDouble(), toInt(), trimIndent()
  // 9. Keywords, types & function names
  // 10. File extensions/names: Main.kt, .kt
  // 11. Brackets/symbols: { }, ;
  // 12. Bold: **...**
  const pattern =
    /(""[^"]+"")|(`[^`]+`)|("([^"]+)")|('(?:[^'\\]|\\.)')|(\$\{[^}]+\}|\$[a-zA-Z_]\w*)|(\/\/[^\s]+|\/\*[\s\S]*?\*\/|\/\*\*[\s\S]*?\*\/)|(==|!=|<=|>=|\+\+|--|&&|\|\||%\b)|((?:println|print)\([^)]*\)|(?:toDouble|toInt|toLong|toFloat|toString|trimIndent|println|print|main)\(\)|\b(?:fun|val|var|class|object|interface|return|package|import|println|print|main|Int|Double|Float|Long|Boolean|Char|String|Byte|Short|toDouble|toInt|toLong|toFloat|toString|trimIndent)\b|Main\.kt|\.kt|\{\s*\}|(?:\s;|\(;|\b;\b))|(\*\*([^*]+)\*\*)/g;

  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const [full, doubleDbl, backtick, dblQuote, dblInner, charQuote, strTpl, commentMatch, opMatch, codeMatch, bold, boldInner] = match;

    if (bold) {
      parts.push(
        <strong key={key++} className="font-semibold text-white">
          {boldInner || bold.slice(2, -2)}
        </strong>
      );
    } else if (doubleDbl) {
      const inner = doubleDbl.slice(2, -2);
      parts.push(renderTokenBadge(inner, key++, true));
    } else if (backtick) {
      const inner = backtick.slice(1, -1);
      parts.push(renderTokenBadge(inner, key++, false));
    } else if (dblQuote) {
      parts.push(renderTokenBadge(dblInner, key++, true));
    } else if (charQuote) {
      parts.push(renderTokenBadge(charQuote, key++, false));
    } else if (strTpl) {
      parts.push(renderTokenBadge(strTpl, key++, false));
    } else if (commentMatch) {
      parts.push(renderTokenBadge(commentMatch, key++, false));
    } else if (opMatch) {
      parts.push(renderTokenBadge(opMatch, key++, false));
    } else if (codeMatch) {
      parts.push(renderTokenBadge(codeMatch.trim(), key++, false));
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  const result = parts.length > 0 ? parts : text;
  bengaliTextCache.set(text, result);
  return result;
}

/** Interactive Visual Diagram: Variable as a Memory Container */
const VariableVisualizer = memo(function VariableVisualizer() {
  const [valAttempt, setValAttempt] = useState(false);
  const [valShake, setValShake] = useState(false);
  const [varAge, setVarAge] = useState(22);
  const [varUpdated, setVarUpdated] = useState(false);

  const handleValChange = () => {
    setValShake(true);
    setValAttempt(true);
    setTimeout(() => setValShake(false), 500);
  };

  const handleVarChange = () => {
    setVarAge((prev) => (prev >= 30 ? 22 : prev + 1));
    setVarUpdated(true);
    setTimeout(() => setVarUpdated(false), 700);
  };

  const resetAll = () => {
    setValAttempt(false);
    setVarAge(22);
    setVarUpdated(false);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-purple-500/25 bg-gradient-to-b from-[#140f28]/95 via-[#0e0a1c]/90 to-[#080612] p-5 shadow-2xl sm:p-6">
      {/* Background ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-purple-600/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-12 -bottom-12 h-44 w-44 rounded-full bg-emerald-600/10 blur-3xl"
      />

      {/* Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg border border-purple-500/40 bg-purple-950/60 text-purple-300">
              <Box className="size-4" />
            </span>
            <h3 className="font-display text-base font-semibold text-white sm:text-lg">
              ভিজ্যুয়াল উপমা: ভেরিয়েবল হলো মেমরির একটি পাত্র (Container)
            </h3>
          </div>
          <p className="mt-1 font-bengali text-[13px] text-slate-400">
            নিচের পাত্র দুটিতে ক্লিক করে সরাসরি পরখ করুন কীভাবে <code className="text-[#b79cff] font-semibold">val</code> এবং <code className="text-[#b79cff] font-semibold">var</code> আচরণ করে:
          </p>
        </div>

        <button
          onClick={resetAll}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[12px] font-medium text-slate-300 transition-all hover:bg-white/[0.08] hover:text-white"
        >
          <RefreshCw className="size-3 text-slate-400" />
          রিসেট
        </button>
      </div>

      {/* Interactive Containers Grid */}
      <div className="relative z-10 mt-6 grid gap-5 sm:grid-cols-2">
        {/* Container 1: val */}
        <motion.div
          animate={valShake ? { x: [-6, 6, -4, 4, -2, 2, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-purple-500/35 bg-[#0e0a1c]/85 p-4 shadow-lg backdrop-blur-sm"
        >
          {/* Top Label */}
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-purple-500/40 bg-purple-950/50 px-2 py-0.5 font-mono text-[12px] font-semibold text-[#b79cff]">
                val (Immutable)
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-rose-500/30 bg-rose-950/30 px-2 py-0.5 text-[11px] font-medium text-rose-300">
                <Lock className="size-3 text-rose-400" />
                লকড পাত্র
              </span>
            </div>

            {/* Container Graphic */}
            <div className="my-4 rounded-xl border-2 border-dashed border-purple-500/30 bg-[#16102a]/70 p-4 text-center">
              <div className="flex items-center justify-center gap-1 text-[12px] text-slate-400">
                <span>পাত্রের নাম:</span>
                <span className="font-mono font-semibold text-white">birthYear</span>
                <span className="font-mono text-sky-400">: Int</span>
              </div>

              {/* Box core representation */}
              <div className="relative mx-auto my-3 flex h-20 w-36 items-center justify-center rounded-xl border-2 border-purple-400/50 bg-gradient-to-b from-[#241a45] to-[#140e2b] shadow-inner">
                <div className="text-center">
                  <div className="font-mono text-2xl font-bold tracking-wider text-amber-300">
                    2002
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-purple-300/80">
                    ফিক্সড ভ্যালু
                  </div>
                </div>
                {/* Lock seal icon */}
                <div className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full border border-rose-500 bg-rose-950 text-rose-300 shadow">
                  <Lock className="size-3" />
                </div>
              </div>

              <p className="font-bengali text-[12px] text-slate-400">
                🔒 ঢাকনা সিলগালা। একবার 2002 জমা করার পর এটি আর পরিবর্তন করা যাবে না।
              </p>
            </div>
          </div>

          {/* Action & Feedback */}
          <div>
            <button
              onClick={handleValChange}
              className="w-full rounded-lg border border-purple-500/40 bg-purple-600/20 py-2 font-bengali text-[13px] font-medium text-purple-200 transition-all hover:border-purple-400 hover:bg-purple-600/30 active:scale-[0.98]"
            >
              চেষ্টা করুন: birthYear = 2005 এসাইন করো
            </button>

            {valAttempt && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2.5 flex items-start gap-2 rounded-lg border border-rose-500/40 bg-rose-950/40 p-2.5 text-[12px] text-rose-200"
              >
                <AlertCircle className="size-4 flex-none text-rose-400" />
                <div>
                  <strong className="block font-mono text-[11.5px] text-rose-300">
                    Val cannot be reassigned
                  </strong>
                  <span className="mt-0.5 block font-bengali text-rose-200/90 leading-tight">
                    দেখুন! কম্পাইলার সরাসরি আটকে দিয়েছে। val পাত্রে নতুন মান রাখা অসম্ভব।
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Container 2: var */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-emerald-500/30 bg-[#0a1614]/85 p-4 shadow-lg backdrop-blur-sm">
          {/* Top Label */}
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/40 bg-emerald-950/50 px-2 py-0.5 font-mono text-[12px] font-semibold text-emerald-300">
                var (Mutable)
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-950/30 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
                <Unlock className="size-3 text-emerald-400" />
                খোলা পাত্র
              </span>
            </div>

            {/* Container Graphic */}
            <div className="my-4 rounded-xl border-2 border-dashed border-emerald-500/30 bg-[#0c1f1a]/70 p-4 text-center">
              <div className="flex items-center justify-center gap-1 text-[12px] text-slate-400">
                <span>পাত্রের নাম:</span>
                <span className="font-mono font-semibold text-white">currentAge</span>
                <span className="font-mono text-sky-400">: Int</span>
              </div>

              {/* Box core representation */}
              <div
                className={`relative mx-auto my-3 flex h-20 w-36 items-center justify-center rounded-xl border-2 transition-all duration-300 ${
                  varUpdated
                    ? "border-emerald-400 bg-emerald-900/60 shadow-[0_0_20px_rgba(16,185,129,0.3)] scale-105"
                    : "border-emerald-500/50 bg-gradient-to-b from-[#112922] to-[#0c1c17] shadow-inner"
                }`}
              >
                <div className="text-center">
                  <motion.div
                    key={varAge}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="font-mono text-2xl font-bold tracking-wider text-emerald-300"
                  >
                    {varAge}
                  </motion.div>
                  <div className="text-[10px] uppercase tracking-wider text-emerald-300/80">
                    আপডেটেবল ভ্যালু
                  </div>
                </div>
                {/* Open lock icon */}
                <div className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full border border-emerald-500 bg-emerald-950 text-emerald-300 shadow">
                  <Unlock className="size-3" />
                </div>
              </div>

              <p className="font-bengali text-[12px] text-slate-400">
                🔓 ঢাকনা খোলা। যেকোনো সময় পুরনো মান মুছে নতুন মান জমা করা যায়।
              </p>
            </div>
          </div>

          {/* Action & Feedback */}
          <div>
            <button
              onClick={handleVarChange}
              className="w-full rounded-lg border border-emerald-500/40 bg-emerald-600/20 py-2 font-bengali text-[13px] font-medium text-emerald-200 transition-all hover:border-emerald-400 hover:bg-emerald-600/30 active:scale-[0.98]"
            >
              মান পরিবর্তন করো (+১ বছর বাড়াও)
            </button>

            <motion.div
              key={varAge}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2.5 flex items-start gap-2 rounded-lg border border-emerald-500/40 bg-emerald-950/40 p-2.5 text-[12px] text-emerald-200"
            >
              <CheckCircle2 className="size-4 flex-none text-emerald-400" />
              <div>
                <strong className="block font-mono text-[11.5px] text-emerald-300">
                  currentAge = {varAge}
                </strong>
                <span className="mt-0.5 block font-bengali text-emerald-200/90 leading-tight">
                  সফল! var হওয়ার কারণে মেমরি পাত্রে নতুন মান প্রতিস্থাপন করা হয়েছে।
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Anatomy Breakdown footer */}
      <div className="relative z-10 mt-6 border-t border-white/[0.08] pt-4">
        <h4 className="font-bengali text-[13px] font-semibold text-slate-300">
          💡 একটি ভেরিয়েবলের ৪টি প্রধান অংশ:
        </h4>
        <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
            <span className="block font-mono text-[11px] text-[#b79cff]">১. Keyword</span>
            <span className="font-bengali text-[12px] text-slate-300">
              val (ফিক্সড) অথবা var (পরিবর্তনযোগ্য)
            </span>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
            <span className="block font-mono text-[11px] text-[#fe8a3c]">২. Name</span>
            <span className="font-bengali text-[12px] text-slate-300">
              পাত্রের নাম বা লেবেল (যেমন: birthYear)
            </span>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
            <span className="block font-mono text-[11px] text-sky-400">৩. Data Type</span>
            <span className="font-bengali text-[12px] text-slate-300">
              পাত্রে রাখা ডেটার ধরন (যেমন: Int, String)
            </span>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
            <span className="block font-mono text-[11px] text-amber-300">৪. Value</span>
            <span className="font-bengali text-[12px] text-slate-300">
              পাত্রে থাকা মূল তথ্য (যেমন: 2002)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

const levelFor = (id: number) =>
  id <= 3 ? "বেসিক লেভেল" : id <= 6 ? "ইন্টারমিডিয়েট লেভেল" : "অ্যাডভান্সড লেভেল";

const ReadingProgressIndicator = memo(function ReadingProgressIndicator({
  scrollYProgress,
  accent,
}: {
  scrollYProgress: MotionValue<number>;
  accent: string;
}) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let lastPct = 0;
    return scrollYProgress.on("change", (latest: number) => {
      const rounded = Math.min(100, Math.max(0, Math.round(latest * 100)));
      if (rounded !== lastPct) {
        lastPct = rounded;
        setPct(rounded);
      }
    });
  }, [scrollYProgress]);

  return (
    <div
      className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-mono font-medium border transition-colors duration-150"
      style={{
        borderColor: `${accent}33`,
        background: `${accent}10`,
        color: pct >= 95 ? "#10b981" : "var(--theme-primary, #ff758f)",
      }}
      title={`পড়ার অগ্রগতি: ${pct}%`}
    >
      <span className="hidden sm:inline text-[10.5px] font-bengali text-slate-400">পড়া:</span>
      <span>{pct}%</span>
    </div>
  );
});

interface LessonBarProps {
  moduleTitle: string;
  moduleSlug: string;
  lessonTitle: string;
  lessonNumber: number;
  totalLessons: number;
  accent: string;
  scrollYProgress: MotionValue<number>;
}

const LessonBar = memo(function LessonBar({
  moduleTitle,
  moduleSlug,
  lessonTitle,
  lessonNumber,
  totalLessons,
  accent,
  scrollYProgress,
}: LessonBarProps) {
  return (
    <header
      aria-label="লেসন নেভিগেশন ও অগ্রগতি"
      className="sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors duration-200"
      style={{
        borderColor: "var(--theme-surface-border, rgba(255, 117, 143, 0.18))",
        background: "var(--theme-card-bg, rgba(14, 7, 20, 0.92))",
        boxShadow: "0 4px 20px -4px rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="mx-auto flex h-11 sm:h-12 max-w-[50rem] items-center justify-between px-3 sm:px-4">
        {/* Left: Back arrow + module name */}
        <div className="flex items-center gap-2 min-w-0 pr-2">
          <Link
            to={`/${moduleSlug}`}
            aria-label={`${moduleTitle}-এ ফিরে যান`}
            title={`${moduleTitle}-এ ফিরে যান`}
            className="group flex size-8 sm:size-8.5 items-center justify-center rounded-lg border border-pink-500/20 bg-pink-500/5 text-pink-300 transition-all duration-150 hover:border-pink-400/50 hover:bg-pink-500/15 hover:text-white active:scale-95 flex-none"
          >
            <ArrowLeft className="size-4 transition-transform duration-150 group-hover:-translate-x-0.5" />
          </Link>

          <Link
            to={`/${moduleSlug}`}
            className="hidden sm:inline-flex items-center text-xs font-bengali text-pink-300/70 hover:text-pink-200 transition-colors truncate max-w-[130px]"
            title={`${moduleTitle}-এ ফিরে যান`}
          >
            {moduleTitle}
          </Link>
          <span className="hidden sm:inline text-white/20 text-xs select-none">/</span>

          {/* Current Lesson Name */}
          <div className="flex items-center gap-1.5 min-w-0">
            <span
              className="hidden xs:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold flex-none"
              style={{
                background: `${accent}18`,
                color: accent,
                border: `1px solid ${accent}35`,
              }}
            >
              {lessonNumber}/{totalLessons}
            </span>
            <h1 className="font-bengali text-[13px] sm:text-[14px] font-semibold text-slate-100 truncate tracking-tight">
              {lessonTitle}
            </h1>
          </div>
        </div>

        {/* Right: Reading progress indicator + compact theme switcher */}
        <div className="flex items-center gap-2 flex-none ml-2">
          <ReadingProgressIndicator
            scrollYProgress={scrollYProgress}
            accent={accent}
          />

          <ThemeSwitcher compact />
        </div>
      </div>

      {/* Embedded GPU-accelerated reading progress bar on bottom edge */}
      <motion.div
        aria-hidden
        className="absolute bottom-0 inset-x-0 h-[2px] origin-left pointer-events-none transform-gpu"
        style={{
          scaleX: scrollYProgress,
          background: `linear-gradient(to right, ${accent}, var(--theme-primary, #ff758f))`,
        }}
      />
    </header>
  );
});

export default function LessonPage() {
  const { slug, lessonSlug } = useParams<{
    slug: string;
    lessonSlug: string;
  }>();

  const result = findLesson(slug, lessonSlug);

  if (!result) {
    return <Navigate to="/" replace />;
  }

  const { module, lesson } = result;
  const { getAccent } = useTheme();
  const AC = getAccent(module.id);
  const lessonIndex = lesson.id - 1;
  const prevLesson = module.lessons[lessonIndex - 1];
  const nextLesson = module.lessons[lessonIndex + 1];
  const nextModule = modules[module.id];

  const { scrollYProgress } = useScroll();

  const content = getLessonContent(slug, lessonSlug);

  const learnPoints = [
    `${lesson.title}-এর মূল ধারণা`,
    "Kotlin syntax-এ এর ব্যবহার ও real example",
    "Practice করার জন্য জরুরি tips",
  ];

  /** section subheading with accent diamond */
  const Sub = ({ children }: { children: ReactNode }) => (
    <h2 className="flex items-center gap-3 font-display text-xl font-semibold text-white sm:text-2xl">
      <span
        aria-hidden
        className="size-2 flex-none rotate-45 rounded-[2px]"
        style={{ background: AC }}
      />
      {children}
    </h2>
  );

  return (
    <div className="relative z-10 w-full overflow-x-clip min-h-screen">
      {/* Mobile-first compact sticky reading-focused Lesson Bar */}
      <LessonBar
        moduleTitle={module.title}
        moduleSlug={module.slug}
        lessonTitle={lesson.title}
        lessonNumber={lesson.id}
        totalLessons={module.lessons.length}
        accent={AC}
        scrollYProgress={scrollYProgress}
      />

      <div className="relative mx-auto w-full max-w-[45rem] px-4 pb-28 pt-5 sm:px-6 md:pt-7">
        {/* top accent glow — static GPU accelerated */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden -z-10 transform-gpu"
        >
          <div
            className="absolute left-1/2 top-16 h-[260px] w-[480px] max-w-[100vw] -translate-x-1/2 rounded-full blur-[64px]"
            style={{ background: `${AC}1a` }}
          />
        </div>

      {/* back to module */}
      <motion.div variants={rise} initial="hidden" animate="show">
        <Link
          to={`/${module.slug}`}
          className="group inline-flex items-center gap-2 rounded-full border border-pink-500/20 bg-[#160c1d]/80 px-4 py-2 font-bengali text-[13px] text-pink-200 transition-all duration-200 hover:border-pink-400/40 hover:bg-pink-500/10 hover:text-white"
        >
          <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5 text-pink-300" />
          <span>{module.title}-এ ফিরে যান</span>
          <ThemeChipIcon size={12} color="var(--theme-primary, #ff758f)" />
        </Link>
      </motion.div>

      {/* lesson header */}
      <motion.header
        variants={group}
        initial="hidden"
        animate="show"
        className="relative mt-9 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#141028] via-[#0e0a1c] to-[#090612] p-6 shadow-2xl sm:p-8"
        style={{
          boxShadow: `0 20px 50px -15px ${AC}26, inset 0 1px 0 rgba(255,255,255,0.12)`,
        }}
      >
        {/* glowing radiant background blobs scaled by intensity */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl transition-opacity duration-300"
          style={{ background: AC, opacity: "calc(0.4 * var(--bg-glow-scale, 0.6))" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-12 -bottom-12 h-40 w-40 rounded-full blur-3xl transition-opacity duration-300"
          style={{ background: "var(--theme-secondary, #8b5cf6)", opacity: "calc(0.3 * var(--bg-glow-scale, 0.6))" }}
        />

        {/* top navigation / breadcrumb & metadata pills */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
          <motion.nav
            variants={rise}
            aria-label="breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[12.5px]"
          >
            <Link
              to={`/${module.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-display font-medium transition-all hover:scale-105"
              style={{
                borderColor: `${AC}55`,
                background: `${AC}1a`,
                color: `${AC}`,
              }}
            >
              <module.icon className="size-3.5" />
              <span>{module.title}</span>
            </Link>
            <ChevronRight aria-hidden className="size-3 text-slate-500" />
            <span className="font-display font-medium text-slate-300">
              {lesson.title}
            </span>
          </motion.nav>

          {/* status pills */}
          <motion.div variants={rise} className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-bengali text-[12px] font-medium shadow-sm"
              style={{
                borderColor: `${AC}45`,
                background: `${AC}16`,
                color: "#ede9fe",
              }}
            >
              <ThemeChipIcon size={13} color={AC} />
              লেসন {bnDigits(lesson.id)} / {bnDigits(module.lessons.length)}
            </span>

            <span className="inline-flex items-center rounded-full border border-emerald-500/35 bg-emerald-950/45 px-3 py-1 font-bengali text-[12px] font-medium text-emerald-300 shadow-sm">
              {levelFor(module.id)} লেভেল
            </span>
          </motion.div>
        </div>

        {/* Lesson Title & description */}
        <motion.div variants={rise} className="relative z-10 mt-6">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-[2.65rem] leading-tight">
            <span className="bg-gradient-to-r from-white via-slate-100 to-violet-200 bg-clip-text text-transparent">
              {lesson.title}
            </span>
          </h1>

          <p className="mt-3.5 max-w-2xl font-bengali text-[15.5px] leading-relaxed text-slate-300">
            {lesson.desc} — সহজ বাংলা ব্যাখ্যা, কোড উদাহরণ, সাধারণ ভুলসমূহ ও অনুশীলনী সহ সম্পূর্ণ পাঠ।
          </p>
        </motion.div>

        {/* Feature highlight chips */}
        <motion.div
          variants={rise}
          className="relative z-10 mt-6 flex flex-wrap items-center gap-2.5 border-t border-white/[0.08] pt-4 font-bengali text-[12.5px]"
        >
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/20 bg-amber-950/25 px-2.5 py-1 text-amber-200 font-medium">
            <Sparkles className="size-3.5 text-amber-400" />
            সহজ বাংলা কনসেপ্ট
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/20 bg-cyan-950/25 px-2.5 py-1 text-cyan-200 font-medium">
            <Code2 className="size-3.5 text-cyan-400" />
            রিয়েল কোড ও সিনট্যাক্স
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-purple-500/20 bg-purple-950/25 px-2.5 py-1 text-purple-200 font-medium">
            <Zap className="size-3.5 text-purple-400" />
            হ্যান্ডস-অন প্র্যাকটিস
          </span>
        </motion.div>
      </motion.header>

      {/* reading content */}
      <motion.article
        variants={group}
        initial="hidden"
        animate="show"
        className="mt-10 space-y-12"
      >
        {content ? (
          <>
            {/* 1. সহজ বাংলায় Concept Explanation */}
            <motion.section variants={rise} className="space-y-4">
              <Sub>{content.conceptExplanation.title}</Sub>
              <div className="space-y-3.5">
                {content.conceptExplanation.paragraphs.map((para, i) => (
                  <p
                    key={i}
                    className="font-bengali text-[15px] leading-[1.9] text-slate-300"
                  >
                    {formatBengaliText(para)}
                  </p>
                ))}
              </div>
            </motion.section>

            {/* Interactive Visualizer for Variables */}
            {lesson.slug === "variables-val-var" && (
              <motion.section variants={rise}>
                <VariableVisualizer />
              </motion.section>
            )}

            <motion.div
              variants={rise}
              aria-hidden
              className="h-px w-full bg-white/[0.07]"
            />

            {/* 2. Key Points */}
            <motion.section variants={rise} className="space-y-4">
              <Sub>{content.keyPoints.title}</Sub>
              <ul className="space-y-2.5 pt-1">
                {content.keyPoints.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-[9px] size-1.5 flex-none rotate-45 rounded-[1.5px]"
                      style={{ background: AC }}
                    />
                    <span className="font-bengali text-[15px] leading-[1.85] text-slate-300">
                      {formatBengaliText(pt)}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.section>

            <motion.div
              variants={rise}
              aria-hidden
              className="h-px w-full bg-white/[0.07]"
            />

            {/* 3. Kotlin Syntax */}
            <motion.section variants={rise} className="space-y-4">
              <Sub>{content.syntax.title}</Sub>
              <p className="font-bengali text-[15px] leading-[1.9] text-slate-300">
                {formatBengaliText(content.syntax.intro)}
              </p>

              <CodeBlock filename="Main.kt">
                <DynamicKotlinCode code={content.syntax.code} />
              </CodeBlock>

              <p className="font-bengali text-[15px] font-semibold text-slate-200 pt-1">
                এখানে:
              </p>

              <div className="space-y-2 font-bengali text-[15px] text-slate-300">
                {content.syntax.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    {renderTokenBadge(item.term, i)}
                    <span className="text-slate-500">→</span>
                    <span>{formatBengaliText(item.desc)}</span>
                  </div>
                ))}
              </div>

              {content.syntax.note && (
                <p className="font-bengali text-[15px] leading-[1.9] text-slate-300 pt-2">
                  {formatBengaliText(content.syntax.note)}
                </p>
              )}
            </motion.section>

            <motion.div
              variants={rise}
              aria-hidden
              className="h-px w-full bg-white/[0.07]"
            />

            {/* 4. Code Example */}
            <motion.section variants={rise} className="space-y-5">
              <Sub>{content.codeExample.title}</Sub>

              {content.codeExample.blocks ? (
                <div className="space-y-6">
                  {content.codeExample.blocks.map((blk, bi) => (
                    <div key={bi} className="space-y-3.5">
                      {blk.intro && (
                        <p className="font-bengali text-[15px] leading-[1.9] text-slate-300">
                          {formatBengaliText(blk.intro)}
                        </p>
                      )}
                      <CodeBlock filename={blk.filename || "Main.kt"}>
                        <DynamicKotlinCode code={blk.code} />
                      </CodeBlock>
                      {blk.footer && (
                        <p className="font-bengali text-[15px] leading-[1.9] text-slate-300">
                          {formatBengaliText(blk.footer)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <CodeBlock filename={content.codeExample.filename || "Main.kt"}>
                    <DynamicKotlinCode code={content.codeExample.code || ""} />
                  </CodeBlock>

                  {content.codeExample.explanations && (
                    <div className="space-y-2">
                      {content.codeExample.explanations.map((exp, i) => (
                        <p
                          key={i}
                          className="font-bengali text-[15px] leading-[1.9] text-slate-300"
                        >
                          {formatBengaliText(exp)}
                        </p>
                      ))}
                    </div>
                  )}
                </>
              )}
            </motion.section>

            <motion.div
              variants={rise}
              aria-hidden
              className="h-px w-full bg-white/[0.07]"
            />

            {/* 5. Expected Output */}
            <motion.section variants={rise} className="space-y-4">
              <Sub>{content.expectedOutput.title}</Sub>

              {content.expectedOutput.blocks ? (
                <div className="space-y-5">
                  {content.expectedOutput.blocks.map((ob, oi) => (
                    <div key={oi} className="space-y-2">
                      {ob.label && (
                        <p className="font-bengali text-[14px] font-medium text-slate-300">
                          {formatBengaliText(ob.label)}
                        </p>
                      )}
                      <CodeOutput label="OUTPUT">
                        {ob.lines.map((line, li) => (
                          <span
                            key={li}
                            className="block font-mono text-[13px] text-slate-200"
                          >
                            {line}
                          </span>
                        ))}
                      </CodeOutput>
                      {ob.note && (
                        <p className="font-bengali text-[14px] leading-relaxed text-slate-400">
                          {formatBengaliText(ob.note)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <CodeOutput label="OUTPUT">
                    {content.expectedOutput.lines?.map((line, li) => (
                      <span
                        key={li}
                        className="block font-mono text-[13px] text-slate-200"
                      >
                        {line}
                      </span>
                    ))}
                  </CodeOutput>
                  {content.expectedOutput.note && (
                    <p className="font-bengali text-[14px] leading-relaxed text-slate-400">
                      {formatBengaliText(content.expectedOutput.note)}
                    </p>
                  )}
                </>
              )}
            </motion.section>

            <motion.div
              variants={rise}
              aria-hidden
              className="h-px w-full bg-white/[0.07]"
            />

            {/* 6. Important Notes / Common Mistakes */}
            <motion.section variants={rise} className="space-y-6">
              <Sub>{content.importantNotes.title}</Sub>

              <div className="space-y-6">
                {content.importantNotes.items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-white/[0.08] bg-[#0c0a14] p-5 sm:p-6"
                  >
                    <h3 className="font-bengali text-[15px] font-semibold text-white">
                      {formatBengaliText(item.title)}
                    </h3>

                    {item.desc && (
                      <p className="mt-2 font-bengali text-[14px] leading-relaxed text-slate-300">
                        {formatBengaliText(item.desc)}
                      </p>
                    )}

                    {item.code && (
                      <div className="mt-3 overflow-hidden rounded-lg border border-white/10 bg-[#080610] p-3.5">
                        <div className="font-mono text-[13px] leading-relaxed">
                          <DynamicKotlinCode code={item.code} />
                        </div>
                      </div>
                    )}

                    {item.footer && (
                      <div className="mt-2.5 space-y-1 font-bengali text-[14px] text-slate-400">
                        {item.footer.split("\n\n").map((fline, fi) => (
                          <p key={fi}>{formatBengaliText(fline)}</p>
                        ))}
                      </div>
                    )}

                    {item.correct && (
                      <div className="mt-3.5 space-y-2 font-bengali text-[14px]">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-emerald-400">
                            সঠিক:
                          </span>
                          <code className="rounded bg-emerald-950/40 px-2 py-0.5 font-mono text-[13px] text-emerald-300 border border-emerald-800/40">
                            {renderTokens(item.correct)}
                          </code>
                        </div>
                        {item.wrong && (
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-rose-400">
                              ভুল:
                            </span>
                            <code className="rounded bg-rose-950/40 px-2 py-0.5 font-mono text-[13px] text-rose-300 border border-rose-800/40">
                              {renderTokens(item.wrong)}
                            </code>
                          </div>
                        )}
                      </div>
                    )}

                    {item.note && (
                      <p className="mt-2.5 font-bengali text-[13px] leading-relaxed text-slate-400">
                        {formatBengaliText(item.note)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.div
              variants={rise}
              aria-hidden
              className="h-px w-full bg-white/[0.07]"
            />

            {/* 7. ছোট Practice Task */}
            <motion.section variants={rise} className="space-y-4">
              <Sub>{content.practiceTask.title}</Sub>
              <div
                className="rounded-2xl border p-5 sm:p-6"
                style={{
                  borderColor: `${AC}35`,
                  background: `linear-gradient(135deg, ${AC}0f, #0d0a17)`,
                }}
              >
                <div className="space-y-2 font-bengali text-[15px] leading-[1.85] text-slate-200">
                  {content.practiceTask.instruction.split("\n\n").map((ins, ii) => (
                    <p key={ii}>{formatBengaliText(ins)}</p>
                  ))}
                </div>

                <div className="mt-3.5 overflow-hidden rounded-xl border border-white/10 bg-[#080610] p-4">
                  <pre className="font-mono text-[13px] leading-relaxed text-[#8fd48f]">
                    <code>{content.practiceTask.outputLines.join("\n")}</code>
                  </pre>
                </div>

                <div className="mt-4 rounded-xl border border-white/[0.08] bg-black/40 p-3.5">
                  <p className="font-bengali text-[14px] leading-relaxed text-amber-200/90">
                    {formatBengaliText(content.practiceTask.condition)}
                  </p>
                </div>
              </div>
            </motion.section>
          </>
        ) : (
          /* Fallback for lessons where detailed content has not yet been authored */
          <>
            <motion.section variants={rise} className="space-y-4">
              <Sub>কী কী শিখবেন</Sub>
              <p className="font-bengali text-[15px] leading-[1.9] text-slate-300">
                <span className="font-display text-slate-100">
                  {lesson.title}
                </span>{" "}
                হলো {module.title} মডিউলের {bnDigits(lesson.id)} নম্বর লেসন।{" "}
                {lesson.desc}।
              </p>
              <p className="font-bengali text-[15px] leading-[1.9] text-slate-300">
                নিচে মূল concept, code example ও practice tips সংক্ষেপে তুলে ধরা
                হলো, যাতে আপনি দ্রুত কোডে হাত দিতে পারেন।
              </p>

              <ul className="space-y-3 pt-1">
                {learnPoints.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-[11px] size-1.5 flex-none rotate-45 rounded-[1.5px]"
                      style={{ background: AC }}
                    />
                    <span className="font-bengali text-[15px] leading-[1.85] text-slate-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.section>

            <motion.section variants={rise} className="space-y-5">
              <Sub>Code example</Sub>
              <p className="font-bengali text-[15px] leading-[1.9] text-slate-300">
                Kotlin-এর syntax অত্যন্ত clean ও expressive। নিচে একটি সহজ
                example: <Inline>fun main()</Inline> block হলো Kotlin program-এর
                entry point যেখান থেকে execution শুরু হয়।
              </p>

              <CodeBlock filename="Main.kt">
                <Line n={1}>
                  <KW>fun</KW> <span className="text-slate-100">main</span>
                  <PN>() {"{"}</PN>
                </Line>
                <Line n={2}>
                  {"    "}
                  <FN>println</FN>
                  <PN>(</PN>
                  <STR>"Hello Kotlin"</STR>
                  <PN>)</PN>
                </Line>
                <Line n={3}>
                  <PN>{"}"}</PN>
                </Line>
              </CodeBlock>

              <CodeOutput>Hello Kotlin</CodeOutput>

              <p className="font-bengali text-[15px] leading-[1.9] text-slate-300">
                উপরের <Inline>println</Inline> একটি built-in function যা{" "}
                <Inline>()</Inline>-এর ভেতরের text-কে output console-এ print
                করে।
              </p>

              <aside
                className="flex gap-3.5 rounded-xl border p-4 sm:p-5"
                style={{
                  borderColor: `${AC}38`,
                  borderLeftWidth: "3px",
                  borderLeftColor: AC,
                  background: `${AC}0d`,
                }}
              >
                <Lightbulb
                  aria-hidden
                  className="mt-0.5 size-5 flex-none"
                  style={{ color: AC }}
                />
                <div>
                  <p className="font-bengali text-[14px] font-semibold text-slate-200">
                    মনে রাখবেন
                  </p>
                  <p className="mt-1.5 font-bengali text-[14px] leading-[1.85] text-slate-400">
                    Kotlin-এ statement-এর শেষে semicolon (<Inline>;</Inline>)
                    দেওয়ার প্রয়োজন নেই। Kotlin community convention অনুযায়ী clean
                    কোডের জন্য semicolon বাদ দেওয়া হয়।
                  </p>
                </div>
              </aside>
            </motion.section>
          </>
        )}
      </motion.article>

      {/* If this is the last lesson of the module, show an epic completion celebration card */}
      {!nextLesson && (
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative mt-12 overflow-hidden rounded-3xl border border-emerald-500/35 bg-gradient-to-br from-[#0c1815] via-[#0b101c] to-[#080512] p-6 shadow-2xl sm:p-8"
          style={{
            boxShadow:
              "0 25px 60px -15px rgba(16,185,129,0.22), inset 0 1px 0 rgba(255,255,255,0.12)",
          }}
        >
          {/* Radiant decorative blooms */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-emerald-500/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-12 -bottom-12 h-48 w-48 rounded-full bg-[#8f6bff]/20 blur-3xl"
          />

          <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-xl border border-amber-500/40 bg-amber-950/60 text-amber-300 shadow">
                  <Trophy className="size-5 text-amber-400" />
                </span>
                <span className="font-bengali text-[13.5px] font-semibold text-amber-300 flex items-center gap-1.5">
                  <CutePartyIcon size={16} color="#ffd166" />
                  <span>অভিনন্দন! মডিউল সমাপ্ত হয়েছে!</span>
                  <CuteStarIcon size={14} color="#ffd166" />
                </span>
              </div>

              <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
                আপনি সফলভাবে {module.title} শেষ করেছেন!
              </h2>

              <p className="max-w-xl font-bengali text-[14.5px] leading-relaxed text-slate-300">
                কোটলিন সিনট্যাক্স, ভেরিয়েবল (val & var), ডেটা টাইপ, টাইপ কাস্টিং, অপারেটর ও ক্লিন কোডিং স্টাইলের সবকটি ১০টি লেসন সম্পন্ন হয়েছে।
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1 font-bengali text-[12.5px]">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 font-medium text-emerald-300">
                  <CheckCircle2 className="size-3.5 text-emerald-400" />
                  ১০ / ১০ লেসন সমাপ্ত
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-950/40 px-3 py-1 font-medium text-purple-300">
                  <Sparkles className="size-3.5 text-purple-400" />
                  বেসিক ফাউন্ডেশন আনলকড
                </span>
              </div>
            </div>

            {nextModule && (
              <div className="flex-none">
                <Link
                  to={`/${nextModule.slug}`}
                  className="group inline-flex items-center gap-3 rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 px-6 py-4 font-display text-[15px] font-bold text-white shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)]"
                >
                  <div className="text-left">
                    <span className="block font-bengali text-[11px] font-medium uppercase tracking-wider text-emerald-100/90">
                      পরবর্তী মাইলস্টোন
                    </span>
                    <span className="block font-bengali text-[14.5px]">
                      Module 02: {nextModule.title} শুরু করুন
                    </span>
                  </div>
                  <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* lesson navigation */}
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        className="mt-14 grid grid-cols-1 gap-3 border-t border-white/[0.07] pt-10 sm:grid-cols-2"
      >
        {prevLesson ? (
          <motion.div variants={rise}>
            <Link
              to={`/${module.slug}/${prevLesson.slug}`}
              className="group relative overflow-hidden flex h-full items-center gap-3.5 rounded-2xl border border-pink-500/20 bg-[#160c1e]/85 p-4 transition-[border-color,background-color,box-shadow] duration-300 hover:border-pink-400/50 hover:bg-pink-500/10 hover:shadow-lg"
              style={{
                boxShadow: "0 6px 20px -6px rgba(255, 117, 143, 0.2)",
              }}
            >
              {/* Subtle Theme watermark in background */}
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-3 -left-2 select-none opacity-[0.05] transition-opacity duration-300 group-hover:opacity-[0.09]"
                style={{ color: AC }}
              >
                <ThemeWatermarkIcon variant="primary" size={76} color="currentColor" />
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute top-2 right-3 select-none opacity-[0.04]"
                style={{ color: AC }}
              >
                <ThemeWatermarkIcon variant="secondary" size={22} color="currentColor" />
              </div>

              <div
                className="relative z-10 flex size-9 flex-none items-center justify-center rounded-xl border border-pink-500/30 bg-pink-500/10 text-pink-300 transition-transform duration-200 group-hover:-translate-x-0.5"
                style={{
                  borderColor: `${AC}45`,
                  background: `${AC}15`,
                }}
              >
                <ArrowLeft className="size-4" style={{ color: AC }} />
              </div>

              <div className="relative z-10 min-w-0 flex-1">
                <div className="flex items-center gap-1.5 font-bengali text-[12px] font-semibold text-pink-300/80">
                  <span>আগের লেসন</span>
                </div>
                <span className="mt-0.5 block truncate font-display text-[13.5px] font-medium text-pink-100 group-hover:text-white">
                  {prevLesson.title}
                </span>
              </div>
            </Link>
          </motion.div>
        ) : (
          <motion.div
            variants={rise}
            className="flex items-center gap-3 rounded-2xl border border-pink-500/10 bg-pink-500/[0.02] p-4 opacity-50"
          >
            <ArrowLeft className="size-4 flex-none text-pink-300/40" />
            <span className="min-w-0">
              <span className="block font-bengali text-[13px] font-semibold text-pink-200/60">
                প্রথম লেসন
              </span>
              <span className="mt-0.5 block font-bengali text-[12px] text-pink-300/40">
                মডিউলের শুরুতে আছেন
              </span>
            </span>
          </motion.div>
        )}

        {nextLesson ? (
          <motion.div variants={rise}>
            <Link
              to={`/${module.slug}/${nextLesson.slug}`}
              className="group relative overflow-hidden flex h-full items-center justify-between gap-3.5 rounded-2xl border p-4 text-right transition-[border-color,box-shadow,transform] duration-300 hover:border-pink-400/50 hover:scale-[1.01]"
              style={{
                borderColor: `${AC}50`,
                background: `linear-gradient(135deg, ${AC}16, #160c1e 75%)`,
                boxShadow: `0 8px 24px -6px ${AC}30`,
              }}
            >
              {/* Subtle Theme watermark in background */}
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-3 -right-2 select-none opacity-[0.05] transition-opacity duration-300 group-hover:opacity-[0.09]"
                style={{ color: AC }}
              >
                <ThemeWatermarkIcon variant="primary" size={76} color="currentColor" />
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute top-2 left-3 select-none opacity-[0.04]"
                style={{ color: AC }}
              >
                <ThemeWatermarkIcon variant="secondary" size={22} color="currentColor" />
              </div>

              <div className="relative z-10 min-w-0 flex-1 text-left">
                <div className="flex items-center gap-1.5 font-bengali text-[12px] font-semibold" style={{ color: AC }}>
                  <span>পরের লেসন</span>
                </div>
                <span className="mt-0.5 block truncate font-display text-[13.5px] font-medium text-pink-100 group-hover:text-white">
                  {nextLesson.title}
                </span>
              </div>

              <div
                className="relative z-10 flex size-9 flex-none items-center justify-center rounded-xl border shadow-sm transition-transform duration-200 group-hover:translate-x-0.5"
                style={{
                  borderColor: `${AC}60`,
                  background: `${AC}25`,
                }}
              >
                <ArrowRight className="size-4" style={{ color: AC }} />
              </div>
            </Link>
          </motion.div>
        ) : nextModule ? (
          <motion.div variants={rise}>
            <Link
              to={`/${nextModule.slug}`}
              className="group flex h-full items-center justify-end gap-3.5 rounded-2xl border p-4 text-right transition-[border-color,box-shadow,transform] duration-300 hover:border-pink-400/60 hover:scale-[1.01]"
              style={{
                borderColor: `${AC}50`,
                background: `linear-gradient(135deg, ${AC}25, #170d22)`,
                boxShadow: `0 8px 24px -6px ${AC}40`,
              }}
            >
              <div className="min-w-0 text-right">
                <span className="block font-bengali text-[13px] font-semibold text-pink-100">
                  পরবর্তী অধ্যায়ে যান
                </span>
                <span className="mt-0.5 block font-display text-[12px] text-pink-200/80">
                  {nextModule.title}
                </span>
              </div>
              <div
                className="flex size-11 items-center justify-center rounded-2xl border shadow-sm"
                style={{
                  borderColor: `${AC}66`,
                  background: `${AC}25`,
                }}
              >
                <ArrowRight className="size-4.5" style={{ color: AC }} />
              </div>
            </Link>
          </motion.div>
        ) : (
          <motion.div variants={rise}>
            <Link
              to={`/${module.slug}`}
              className="group flex h-full items-center justify-end gap-3 rounded-2xl border border-pink-500/30 bg-[#160c1e] p-4 text-right transition-colors duration-200 hover:border-pink-400/50"
            >
              <span className="min-w-0">
                <span className="block font-bengali text-[13px] font-semibold text-white">
                  মডিউল সম্পন্ন
                </span>
                <span className="mt-0.5 block font-bengali text-[12px] text-pink-200/60">
                  সবগুলো লেসন শেষ
                </span>
              </span>
              <ThemeChipIcon size={16} color="var(--theme-primary, #ff758f)" />
            </Link>
          </motion.div>
        )}
      </motion.div>
      </div>
    </div>
  );
}
