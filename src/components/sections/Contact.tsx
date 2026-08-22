import { useState, type FormEvent } from "react";
import { ChevronRight, Github, Linkedin, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { SectionLabel, StatusTag } from "@/components/aura/primitives";
import { useLanguage } from "@/i18n/LanguageContext";

const SOCIALS = [
  { icon: Github, path: "/github", href: "https://github.com" },
  { icon: MessageSquare, path: "/discord", href: "https://discord.com" },
  { icon: Linkedin, path: "/linkedin", href: "https://linkedin.com" },
];

export function Contact() {
  const [email, setEmail] = useState("");
  const { t } = useLanguage();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error(t.contact.toastInvalid);
      return;
    }
    toast.success(t.contact.toastSuccess);
    setEmail("");
  };

  return (
    <footer
      id="contact"
      data-scene="contact"
      className="relative flex min-h-screen scroll-mt-24 items-center overflow-hidden py-24"
    >
      <div className="pointer-events-auto relative z-10 mx-auto w-full max-w-[1400px] px-5 lg:px-10">
        <SectionLabel index={t.contact.index} title={t.contact.label} />

        <div className="glass-panel mt-8 rounded-3xl px-6 py-14 text-center sm:px-14">
          <StatusTag label={t.contact.channelOpen} tone="signal" />
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-3xl leading-tight font-bold sm:text-5xl">
            {t.contact.heading} <span className="neon-text">AURA++</span>?
          </h2>

          <form
            onSubmit={onSubmit}
            className="mx-auto mt-10 flex max-w-xl items-center gap-3 rounded-full border border-hairline bg-background/70 px-5 py-3 font-mono text-sm transition-colors focus-within:border-signal/60"
          >
            <span className="hidden text-signal sm:inline">{t.contact.promptUser}</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder={t.contact.emailPlaceholder}
              aria-label="Email address"
              className="min-w-0 flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1 rounded-full border border-signal/40 bg-signal-soft px-4 py-1.5 text-[11px] tracking-[0.2em] text-signal uppercase transition-all hover:bg-signal hover:text-primary-foreground"
            >
              {t.contact.send}
              <ChevronRight className="size-3.5" />
            </button>
          </form>

          <p className="mt-4 font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
            {t.contact.note}
          </p>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-hairline py-8 sm:flex-row">
          <p className="font-display text-sm font-bold tracking-[0.2em] neon-text">
            AURA<span className="text-foreground">++</span>
          </p>

          <div className="flex items-center gap-6">
            {SOCIALS.map(({ icon: Icon, path, href }) => (
              <a
                key={path}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-muted-foreground transition-colors hover:text-signal"
              >
                <Icon className="size-3.5" />
                {path}
              </a>
            ))}
          </div>

          <p className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
            {t.contact.footerNote}
          </p>
        </div>
      </div>
    </footer>
  );
}
