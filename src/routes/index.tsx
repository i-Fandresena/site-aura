import { createFileRoute } from "@tanstack/react-router";
import { Scene3D } from "@/components/3d/Scene3D";
import { HudNav } from "@/components/hud/HudNav";
import { OrbitNav } from "@/components/hud/OrbitNav";
import { ProgressBar } from "@/components/hud/ProgressBar";
import { Hero } from "@/components/sections/Hero";
import { SectionSkeleton } from "@/components/sections/SectionSkeleton";
import { Suspense, lazy } from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useKeyboardSceneNav } from "@/hooks/useKeyboardSceneNav";
import { fr } from "@/i18n/locales/fr";

const Vision = lazy(() =>
  import("@/components/sections/Vision").then((m) => ({ default: m.Vision })),
);
const Universe = lazy(() =>
  import("@/components/sections/Universe").then((m) => ({ default: m.Universe })),
);
const Sanctuary = lazy(() =>
  import("@/components/sections/Sanctuary").then((m) => ({ default: m.Sanctuary })),
);
const Projects = lazy(() =>
  import("@/components/sections/Projects").then((m) => ({ default: m.Projects })),
);
const Technology = lazy(() =>
  import("@/components/sections/Technology").then((m) => ({ default: m.Technology })),
);
const Process = lazy(() =>
  import("@/components/sections/Process").then((m) => ({ default: m.Process })),
);
const Team = lazy(() => import("@/components/sections/Team").then((m) => ({ default: m.Team })));
const Timeline = lazy(() =>
  import("@/components/sections/Timeline").then((m) => ({ default: m.Timeline })),
);
const Contact = lazy(() =>
  import("@/components/sections/Contact").then((m) => ({ default: m.Contact })),
);

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
        <Suspense fallback={<SectionSkeleton />}>
          <Vision />
          <Universe />
          <Sanctuary />
          <Projects />
          <Technology />
          <Process />
          <Team />
          <Timeline />
          <Contact />
        </Suspense>
      </main>
    </div>
  );
}
