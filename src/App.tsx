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

// Lazy-load heavier secondary pages to significantly shrink initial bundle size
const ModulePage = lazy(() => import("./pages/ModulePage"));
const LessonPage = lazy(() => import("./pages/LessonPage"));

/**
 * Global, fixed background layers:
 * subtle technical grid + theme-colored glowing orbs scaled by user's bgGlow preference.
 * Uses GPU-optimized blur radius for fluid 60-120fps scrolling on mobile devices.
 */
function BackgroundFX() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition-opacity duration-300 transform-gpu"
      style={{ opacity: "var(--bg-glow-scale, 0.6)" }}
    >
      <div className="bg-grid absolute inset-0" />
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
  );
}

/**
 * Scroll behaviour on route change:
 * - "/#roadmap" → smooth-scroll to the roadmap section
 * - everything else → back to the top
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        const timer = window.setTimeout(
          () => el.scrollIntoView({ behavior: "smooth", block: "start" }),
          80
        );
        return () => window.clearTimeout(timer);
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function AppShell() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen bg-[var(--color-void)] font-sans text-slate-200 antialiased transition-colors duration-300">
      <BackgroundFX />
      <Navbar />

      {/* keying by pathname replays the light mount fade on each page */}
      <main key={location.pathname} className="relative z-10">
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
          <Routes location={location}>
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
