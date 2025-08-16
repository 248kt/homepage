import { useMemo, useState, useCallback, memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Moon, Sun, ExternalLink } from "lucide-react";

/**
 * Projects — Clean Tiles + Hover Preview + Easter‑egg theme + Perf polish
 */

const CONFIG = {
  github: "https://github.com/248kt",
  username: "248kt",
  projects: [
    {
      title: "StudyDot",
      url: "https://studydot.netlify.app/",
      tagline: "Minimal study app for focus: timer + tasks.",
      tags: ["React", "UI", "Productivity"],
      preview: "", // add an image URL if iframe is blocked
    },
    {
      title: "Wishlist Mini",
      url: "https://wishlistmini.netlify.app/",
      tagline: "Local wishlist with quick add/remove and confetti.",
      tags: ["Vanilla JS", "LocalStorage"],
      preview: "",
    },
    {
      title: "KeepGoing",
      url: "https://keepgoing8.netlify.app/",
      tagline: "Tiny motivation app.",
      tags: ["React", "Framer"],
      preview: "",
    },
  ],
};

const palettes = {
  light: { bg: "#ffffff", text: "#111827" },
  dark:  { bg: "#09090b", text: "#e4e4e7" },
  solar: { bg: "#fdf6e3", text: "#073642" },
};

const Tile = memo(function Tile({ p, i }) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState(false);

  return (
    <div className="relative">
      <motion.article
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.05 * i }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="group h-full min-h-[168px] flex flex-col rounded-2xl border border-zinc-300 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/60 backdrop-blur p-4 sm:p-5 hover:-translate-y-[2px] hover:shadow-md transition"
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base sm:text-lg font-semibold leading-tight tracking-tight text-zinc-900 dark:text-zinc-100">
            {p.title}
          </h3>
          <a
            href={p.url}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 text-sm underline-offset-4 text-zinc-700 dark:text-zinc-300 hover:underline"
          >
            Visit <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{p.tagline}</p>
        <div className="mt-auto pt-3 flex flex-wrap gap-2">
          {p.tags?.map((t) => (
            <span key={t} className="text-xs px-2 py-1 rounded-full border border-zinc-300 dark:border-zinc-800 bg-zinc-100 hover:bg-zinc-200/70 dark:bg-zinc-950/30 dark:hover:bg-zinc-900/50 transition-colors text-zinc-700 dark:text-zinc-300">
              {t}
            </span>
          ))}
        </div>
      </motion.article>

      
      </div>
  );
});

export default function App() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const reduce = useReducedMotion();
  const [theme, setTheme] = useState("dark"); // 'light' | 'dark' | 'solar'

  const toggleTheme = useCallback((e) => {
    if (e?.shiftKey) {
      setTheme((t) => (t === "solar" ? "light" : "solar"));
      return;
    }
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const palette = palettes[theme];

  return (
    <div className={theme === "dark" ? "dark" : undefined} data-theme={theme}>
      <motion.main
        initial={false}
        animate={{ backgroundColor: palette.bg, color: palette.text }}
        transition={{ duration: reduce ? 0.2 : 0.35 }}
        className="min-h-dvh"
      >
        <div className="max-w-5xl mx-auto px-5 py-10">
          <div className="flex items-center justify-between">
  <a
    href={CONFIG.github}
    target="_blank"
    rel="noreferrer noopener"
    className="text-sm text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 underline-offset-4 hover:underline"
  >
    {CONFIG.username || '248kt'}
  </a>
  <button
    onClick={toggleTheme}
    className="rounded-2xl border border-zinc-300 dark:border-zinc-800 px-3 py-2 hover:shadow-sm active:scale-[0.98] transition bg-white/90 dark:bg-zinc-900/60 backdrop-blur"
    aria-label="Toggle theme (Shift for Solarized)"
    title="Toggle light/dark — hold Shift for Solarized"
  >
    <motion.span
      key={theme}
      initial={{ rotate: -90, opacity: 0 }}
      animate={{ rotate: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="inline-flex"
    >
      {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </motion.span>
  </button>
</div>

          <section className="mt-6">
            <h1 className="text-xl font-semibold tracking-tight mb-4">Projects</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch gap-5 sm:gap-6">
              {CONFIG.projects.map((p, i) => (
                <Tile p={p} i={i} key={p.title} />
              ))}
            </div>
          </section>

          <footer className="mt-16 text-center">
            <a
              href={CONFIG.github}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 underline-offset-4 hover:underline"
            >
              github
            </a>
            <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">© {year}</div>
          </footer>
        </div>
      </motion.main>
    </div>
  );
}
