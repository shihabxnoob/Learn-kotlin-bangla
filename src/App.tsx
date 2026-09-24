import { useEffect, lazy, Suspense } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import { ThemeProvider } from "./context/ThemeContext";

// Lazy-load heavier secondary pages with idle prefetching to significantly shrink initial bundle size
const loadModulePage = () => import("./pages/ModulePage");
const loadLessonPage = () => import("./pages/LessonPage");
const ModulePage = lazy(loadModulePage);
const LessonPage = lazy(loadLessonPage);

/**
 * Global, fixed background layers:
 * Grid visibility priority: technical grid rendered with subtle blend over subdued glow orbs.
 * Deep dark base background is preserved with restrained glow saturation/opacity.
 */
function BackgroundFX() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden transform-gpu"
    >
      {/* Background ambient glow - subdued saturation & opacity so dark base stays deep */}
      <div
        className="absolute inset-0 overflow-hidden transition-opacity duration-500"
        style={{ opacity: "calc(var(--bg-glow-scale, 0.6) * 0.72)" }}
      >
        <div
          className="absolute left-1/2 top-[-180px] h-[480px] w-[min(800px,120vw)] -translate-x-1/2 rounded-full blur-[72px] transition-colors duration-700"
          style={{ background: "var(--theme-glow)" }}
        />
        <div
          className="absolute right-[-140px] top-[38%] h-[380px] w-[380px] rounded-full blur-[72px] transition-colors duration-700"
          style={{ background: "var(--theme-secondary-glow)" }}
        />
        <div
          className="absolute bottom-[-180px] left-[8%] h-[360px] w-[360px] rounded-full blur-[72px] transition-colors duration-700"
          style={{ background: "var(--theme-tertiary-glow)" }}
        />
      </div>

      {/* Grid visibility priority: layered above glow so grid lines are always crisp, subtle, and never buried under glow */}
      <div className="bg-grid absolute inset-0" />
    </div>
  );
}

/**
 * Scroll behaviour on route change:
 * - "/#roadmap" → smooth-scroll directly to the roadmap section without top-jump
 * - everything else → back to the top
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function AppShell() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  // Home ('/') has 0 segments, Module ('/:slug') has 1 segment, Lesson ('/:slug/:lessonSlug') has 2 segments.
  // Home and Module Page keep the existing global Topbar (Navbar) exactly as is.
  // Lesson Page uses its dedicated compact sticky Lesson Bar.
  const isLessonPage = pathSegments.length === 2;

  // Preload secondary route chunks during browser idle time so transitions feel instantaneous
  useEffect(() => {
    const hasIdle = typeof window !== "undefined" && "requestIdleCallback" in window;
    const idleId = hasIdle
      ? window.requestIdleCallback(() => {
          loadModulePage();
          loadLessonPage();
        })
      : window.setTimeout(() => {
          loadModulePage();
          loadLessonPage();
        }, 1200);

    return () => {
      if (hasIdle) {
        window.cancelIdleCallback(idleId as number);
      } else {
        window.clearTimeout(idleId as number);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--color-void)] font-sans text-slate-200 antialiased transition-colors duration-300">
      <BackgroundFX />
      {!isLessonPage && <Navbar />}

      <main className="relative z-10">
        <Suspense
          fallback={
            <div className="flex min-h-[70vh] items-center justify-center">
              <div
                className="size-8 animate-spin rounded-full border-2 border-pink-400/20 border-t-pink-400"
                style={{ borderTopColor: "var(--theme-primary, #ff758f)" }}
              />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:slug" element={<ModulePage />} />
            <Route path="/:slug/:lessonSlug" element={<LessonPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>

      <ScrollManager />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </ThemeProvider>
  );
}
