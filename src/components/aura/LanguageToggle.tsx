import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";

/** FR/EN switch, styled to match ThemeToggle. */
export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={() => setLocale(locale === "fr" ? "en" : "fr")}
      aria-label={t.language.label}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-hairline bg-glass px-3 py-2 font-mono text-[10px] tracking-[0.2em] uppercase backdrop-blur-md transition-all hover:border-signal/50 hover:text-signal",
        className,
      )}
    >
      <span className={locale === "fr" ? "text-signal" : "text-muted-foreground"}>FR</span>
      <span className="text-muted-foreground">/</span>
      <span className={locale === "en" ? "text-signal" : "text-muted-foreground"}>EN</span>
    </button>
  );
}
