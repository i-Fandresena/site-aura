import { Skeleton } from "@/components/ui/skeleton";

export function SectionSkeleton() {
  return (
    <section className="relative flex min-h-screen scroll-mt-24 items-center py-24">
      <div className="pointer-events-auto relative z-10 mx-auto w-full max-w-[1400px] px-5 lg:px-10">
        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-96" />
            <Skeleton className="h-5 w-64" />
          </div>
          <Skeleton className="h-5 w-48" />
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Skeleton className="h-48 w-full rounded-2xl" />
          <Skeleton className="h-48 w-full rounded-2xl" />
        </div>
      </div>
    </section>
  );
}
