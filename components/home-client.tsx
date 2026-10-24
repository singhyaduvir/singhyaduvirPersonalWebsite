"use client";

import { Suspense, useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { NavigationView } from "@/components/navigation/navigation-view";
import { usePrefersReducedMotion } from "@/components/navigation/use-prefers-reduced-motion";
import type { SectionId } from "@/lib/navigation-sections";

export type HomeTab = "navigation" | "consolidated";

function parseTab(value: string | null): HomeTab | null {
  if (value === "navigation" || value === "consolidated") {
    return value;
  }
  return null;
}

function HomeTabs({
  activeTab,
  onChange,
}: {
  activeTab: HomeTab;
  onChange: (tab: HomeTab) => void;
}) {
  return (
    <div className="sticky top-16 z-30 border-b border-border bg-background">
      <div
        role="tablist"
        aria-label="Home view"
        className="mx-auto flex w-full max-w-6xl gap-1 px-5 sm:px-8"
      >
        {(
          [
            { id: "navigation", label: "Navigation" },
            { id: "consolidated", label: "Consolidated" },
          ] as const
        ).map((tab) => {
          const selected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`home-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`home-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(tab.id)}
              className={`relative px-3 py-3 text-sm tracking-[0.08em] uppercase transition-colors ${
                selected ? "text-ink" : "text-subtle hover:text-ink"
              }`}
            >
              {tab.label}
              {selected ? (
                <span className="absolute inset-x-3 bottom-0 h-px bg-ink" />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function HomeClientInner({
  consolidated,
  sections,
}: {
  consolidated: ReactNode;
  sections: Record<SectionId, ReactNode>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const reducedMotion = usePrefersReducedMotion();
  const activeTab = parseTab(searchParams.get("tab")) ?? "navigation";

  useEffect(() => {
    const syncFromHash = () => {
      if (!window.location.hash) {
        return;
      }

      const next = new URLSearchParams(window.location.search);
      if (next.get("tab") === "consolidated") {
        return;
      }

      next.set("tab", "consolidated");
      router.replace(`${pathname}?${next.toString()}${window.location.hash}`, {
        scroll: false,
      });
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [pathname, router]);

  function selectTab(tab: HomeTab) {
    const next = new URLSearchParams(searchParams.toString());
    next.set("tab", tab);
    const query = next.toString();
    const hash = window.location.hash;
    router.replace(`${pathname}${query ? `?${query}` : ""}${hash}`, {
      scroll: false,
    });
  }

  const duration = reducedMotion ? 0.16 : 0.4;

  return (
    <div>
      <HomeTabs activeTab={activeTab} onChange={selectTab} />
      <div className="grid">
        <AnimatePresence initial={false}>
          {activeTab === "navigation" ? (
            <motion.div
              key="navigation"
              id="home-panel-navigation"
              role="tabpanel"
              aria-labelledby="home-tab-navigation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration, ease: "easeInOut" }}
              className="col-start-1 row-start-1"
            >
              <NavigationView sections={sections} />
            </motion.div>
          ) : (
            <motion.div
              key="consolidated"
              id="home-panel-consolidated"
              role="tabpanel"
              aria-labelledby="home-tab-consolidated"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration, ease: "easeInOut" }}
              className="col-start-1 row-start-1"
            >
              {consolidated}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function HomeClientFallback() {
  return (
    <div>
      <HomeTabs activeTab="navigation" onChange={() => undefined} />
      <div className="h-[calc(100dvh-7rem)] bg-background" />
    </div>
  );
}

export function HomeClient({
  consolidated,
  sections,
}: {
  consolidated: ReactNode;
  sections: Record<SectionId, ReactNode>;
}) {
  return (
    <Suspense fallback={<HomeClientFallback />}>
      <HomeClientInner consolidated={consolidated} sections={sections} />
    </Suspense>
  );
}
