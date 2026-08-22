import { createFileRoute } from "@tanstack/react-router";
import { Scene3D } from "@/components/3d/Scene3D";
import { HudNav } from "@/components/hud/HudNav";
import { OrbitNav } from "@/components/hud/OrbitNav";
import { ProgressBar } from "@/components/hud/ProgressBar";
import { Hero } from "@/components/sections/Hero";
import { Vision } from "@/components/sections/Vision";
import { Universe } from "@/components/sections/Universe";
import { Sanctuary } from "@/components/sections/Sanctuary";
import { Projects } from "@/components/sections/Projects";
import { Technology } from "@/components/sections/Technology";
import { Process } from "@/components/sections/Process";
import { Team } from "@/components/sections/Team";
import { Timeline } from "@/components/sections/Timeline";
import { Contact } from "@/components/sections/Contact";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useKeyboardSceneNav } from "@/hooks/useKeyboardSceneNav";
import { fr } from "@/i18n/locales/fr";

// Static SSR meta defaults to French (AURA++'s primary audience); the page
// content itself switches language client-side via LanguageContext.
const { title, description } = fr.meta;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const lenisRef = useSmoothScroll();
  useKeyboardSceneNav(lenisRef);

  return (
    <div className="relative min-h-screen text-foreground">
      {/* The canvas stays interactive so the hero robot can be hovered and
          clicked. Sections above it are pointer-transparent by default and
          re-enable events only on their own content blocks. */}
      <Scene3D className="fixed inset-0 z-0 size-full" />
      <HudNav lenisRef={lenisRef} />
      <ProgressBar />
      <OrbitNav lenisRef={lenisRef} />
      <main className="pointer-events-none relative z-10">
        <Hero lenisRef={lenisRef} />
        <Vision />
        <Universe />
        <Sanctuary />
        <Projects />
        <Technology />
        <Process />
        <Team />
        <Timeline />
        <Contact />
      </main>
    </div>
  );
}
