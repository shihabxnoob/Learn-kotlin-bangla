import type { ReactNode } from "react";
import { Copy, Terminal, ChevronRight, FileCode } from "lucide-react";
import { CatFaceIcon, CatPawIcon } from "./KittyIcons";

interface CodeBlockProps {
  filename: string;
  children: ReactNode;
}

/**
 * Clean developer-friendly Kotlin code block with Kitty palette accents.
 */
export function CodeBlock({ filename, children }: CodeBlockProps) {
  return (
    <figure className="relative overflow-hidden rounded-xl border border-pink-500/20 bg-[#12091a] shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
      {/* Subtle Kitty watermark in code background */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-3 -right-3 select-none opacity-[0.035] text-pink-300"
      >
        <CatFaceIcon size={84} color="#ff758f" />
      </div>

      <figcaption className="relative z-10 flex items-center gap-2 border-b border-pink-500/10 bg-pink-500/[0.04] px-4 py-2.5">
        <span aria-hidden className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff758f]/80" />
          <span className="size-2.5 rounded-full bg-[#ffa6c1]/80" />
          <span className="size-2.5 rounded-full bg-[#c77dff]/80" />
        </span>
        <span className="ml-1.5 flex items-center gap-1.5 font-mono text-[11px] text-pink-200/70">
          <FileCode className="size-3.5 text-pink-400/60" />
          <span>{filename}</span>
        </span>
        <span className="ml-auto flex items-center gap-1 text-[11px] text-pink-300/40">
          <CatPawIcon size={11} color="#ff758f" />
          <Copy aria-hidden className="size-3.5" />
        </span>
      </figcaption>
      <div
        role="region"
        aria-label={`Kotlin code — ${filename}`}
        tabIndex={0}
        className="relative z-10 overflow-x-auto"
      >
        <pre className="min-w-max px-4 py-4 font-mono text-[13px] leading-[1.85] text-pink-100/90 sm:px-5">
          <code>{children}</code>
        </pre>
      </div>
    </figure>
  );
}

interface CodeOutputProps {
  children: ReactNode;
  label?: string;
}

export function CodeOutput({ children, label = "OUTPUT" }: CodeOutputProps) {
  return (
    <figure className="relative overflow-hidden rounded-xl border border-pink-500/20 bg-[#0d0614] shadow-md">
      {/* Cute Kitty watermark in CLI background */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-3 -right-2 select-none opacity-[0.05] text-pink-300"
      >
        <CatFaceIcon size={76} color="#ff758f" />
      </div>

      <figcaption className="relative z-10 flex items-center gap-2 border-b border-pink-500/10 bg-pink-500/[0.03] px-4 py-2.5">
        <Terminal aria-hidden className="size-3.5 text-[#ff758f]" />
        <span className="font-mono text-[10px] tracking-[0.22em] text-pink-300/60">
          {label}
        </span>
        <span className="ml-auto flex items-center gap-1 text-[10.5px] font-mono text-pink-300/40">
          <CatPawIcon size={10} color="#ff758f" />
          <span>CLI</span>
        </span>
      </figcaption>
      <div className="relative z-10 overflow-x-auto px-4 py-4 sm:px-5">
        <div className="flex min-w-max items-start gap-2 font-mono text-[13px] leading-relaxed text-pink-100">
          <ChevronRight className="size-3.5 text-[#ff758f] mt-0.5 flex-none" />
          <div className="space-y-0.5">{children}</div>
        </div>
      </div>
    </figure>
  );
}
