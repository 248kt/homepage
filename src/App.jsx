import { useMemo, useState, useCallback, memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Moon, Sun, ExternalLink } from "lucide-react";

/**
 * Homepage — Clean tiles, dark/light mode, smooth motion
 * This is JSX (no TypeScript). Includes "One Ting" at the top.
 */

const CONFIG = {
  github: "https://github.com/248kt",
  username: "248kt",
  projects: [
    // New project
    {
      title: "One Ting",
      url: "https://oneting.netlify.app/",
      tagline: "A simple one-thing focus tool.",
      tags: ["Web", "Minimal"],
      preview: "",
    },
    {
      title: "StudyDot",
      url: "https://studydot.netlify.app/",
      tagline: "Minimal study app for focus: timer + tasks.",
      tags: ["React", "UI", "Productivity"],
      preview: "",
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
  light: { bg: "#fafafa", text: "#0b0b0b" },
  dark: { bg: "#0a0a0a", text: "#e5e5e5" },
};

function useStoredTheme() {
  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return prefersDark ? "dark" : "light";
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return prefersDark ? "dark" : "light";
  });

  const set = useCallback((t) => {
    setTheme(t);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", t);
    }
  }, []);

  return [theme, set];
}

const ProjectCard = memo(function ProjectCard({ project }) {
  const reduce = !!useReducedMotion();
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noreferrer noopener"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduce ? 0.15 : 0.28 }}
      className="group h-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow flex flex-col p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
          {project.title}
        </h3>
        <ExternalLink className="size-4 text-zinc-500 group-hover:text-zinc-700 dark:text-zinc-400 dark:group-hover:text-zinc-200 transition-colors" />
      </div>

      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
        {project.tagline}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span
            key={t}
            className="text-[11px] leading-none px-2 py-1 rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300"
          >
            {t}
          </span>
        ))}
      </div>

      {/* spacer keeps heights equal by pushing content up */}
      <div className="mt-auto" />
    </motion.a>
  );
});

export default function App() {
  const [theme, setTheme] = useStoredTheme();
  const reduce = !!useReducedMotion();

  const palette = useMemo(() => palettes[theme], [theme]);
  const year = new Date().getFullYear();

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <div className={theme === "dark" ? "dark" : undefined} data-theme={theme}>
      <motion.main
        initial={false}
        animate={{ backgroundColor: palette.bg, color: palette.text }}
        transition={{ duration: reduce ? 0.15 : 0.3 }}
        className="min-h-dvh"
      >
        <div className="max-w-5xl mx-auto px-5 py-10">
          {/* Top bar: username (left) + theme toggle (right) */}
          <div className="flex items-center justify-between">
            <a
              href={CONFIG.github}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
            >
              {CONFIG.username}
            </a>

            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 text-sm
                         hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="size-4" />
                  Light
                </>
              ) : (
                <>
                  <Moon className="size-4" />
                  Dark
                </>
              )}
            </button>
          </div>

          {/* Header */}
          <header className="mt-8">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Projects
            </h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Clean tiles with quick tags. Click to open.
            </p>
          </header>

          {/* Grid of tiles — equal heights across rows */}
          <section className="mt-6">
            <div
              className="
                grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4
                [grid-auto-rows:1fr]
              "
            >
              {CONFIG.projects.map((p) => (
                <div key={p.title} className="min-h-[180px]">
                  <ProjectCard project={p} />
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-6">
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
