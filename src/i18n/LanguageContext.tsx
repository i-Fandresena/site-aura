import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { en } from "./locales/en";
import { fr } from "./locales/fr";
import type { Dictionary } from "./locales/en";

export type Locale = "fr" | "en";

const DICTIONARIES: Record<Locale, Dictionary> = { en, fr };
const STORAGE_KEY = "aura-locale";
const DEFAULT_LOCALE: Locale = "fr";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

/** Locale-aware content provider. Defaults to French on the server and on
 * first paint (matches AURA++'s Malagasy/francophone base), then syncs from
 * localStorage or the browser's language on mount — same pattern as
 * ThemeToggle, to avoid an SSR/client hydration mismatch. */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "fr" || stored === "en") {
      setLocaleState(stored);
      return;
    }
    setLocaleState(window.navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en");
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: DICTIONARIES[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
