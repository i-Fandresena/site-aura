import { useCallback, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";

const STORAGE_KEY = "aura-theme";

/** Light-default theme toggle. Applies the `dark` class on <html>. */
export function ThemeToggle({ className }: { className?: string }) {
  const { t } = useLanguage();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const isDark = stored === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      window.localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
      return next;
    });
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? t.theme.switchToLight : t.theme.switchToDark}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-hairline bg-glass px-3 py-2 font-mono text-[10px] tracking-[0.2em] uppercase backdrop-blur-md transition-all hover:border-signal/50 hover:text-signal",
        className,
      )}
    >
      {dark ? <Moon className="size-3.5 text-signal" /> : <Sun className="size-3.5 text-signal" />}
      {dark ? t.theme.dark : t.theme.light}
    </button>
  );
}
