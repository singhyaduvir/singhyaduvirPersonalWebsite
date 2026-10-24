"use client";

import { useEffect, useReducer, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import {
  HINT_BUBBLE,
  WELCOME_BUBBLE,
  getSectionById,
  matchSection,
  sectionIndex,
  sectionSummary,
  type SectionId,
} from "@/lib/navigation-sections";
import { GuideRobot } from "@/components/navigation/guide-robot";
import { usePrefersReducedMotion } from "@/components/navigation/use-prefers-reduced-motion";

type ViewState = "intro" | "panel";

type NavState = {
  view: ViewState;
  activeSection: SectionId | null;
  pendingQuery: string | null;
  isTransitioning: boolean;
  direction: number;
  bubble: string;
};

type NavAction = { type: "submit"; query: string } | { type: "transitionEnd" };

const TRANSITION_MS = 600;

const initialState: NavState = {
  view: "intro",
  activeSection: null,
  pendingQuery: null,
  isTransitioning: false,
  direction: -1,
  bubble: WELCOME_BUBBLE,
};

function openSection(state: NavState, sectionId: SectionId): NavState {
  if (state.view === "panel" && state.activeSection === sectionId) {
    return {
      ...state,
      bubble: sectionSummary(getSectionById(sectionId).label),
      pendingQuery: null,
    };
  }

  const fromLeft = state.view === "intro" || !state.activeSection;
  const nextDirection = fromLeft
    ? -1
    : sectionIndex(sectionId) > sectionIndex(state.activeSection as SectionId)
      ? 1
      : -1;

  return {
    ...state,
    direction: nextDirection,
    bubble: sectionSummary(getSectionById(sectionId).label),
    activeSection: sectionId,
    view: "panel",
    isTransitioning: true,
    pendingQuery: null,
  };
}

function applyQuery(state: NavState, query: string): NavState {
  const matched = matchSection(query);
  if (!matched) {
    return { ...state, bubble: HINT_BUBBLE, pendingQuery: null };
  }
  return openSection(state, matched.id);
}

function reducer(state: NavState, action: NavAction): NavState {
  switch (action.type) {
    case "submit": {
      if (state.isTransitioning) {
        return { ...state, pendingQuery: action.query };
      }
      return applyQuery(state, action.query);
    }
    case "transitionEnd": {
      if (!state.isTransitioning) {
        return state;
      }
      const queued = state.pendingQuery;
      const idle: NavState = { ...state, isTransitioning: false, pendingQuery: null };
      if (!queued) {
        return idle;
      }
      return applyQuery(idle, queued);
    }
    default:
      return state;
  }
}

export function NavigationView({
  sections,
}: {
  sections: Record<SectionId, ReactNode>;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [query, setQuery] = useState("");
  const { view, activeSection, direction, bubble, isTransitioning } = state;

  useEffect(() => {
    if (!isTransitioning) {
      return;
    }

    const timeout = window.setTimeout(
      () => {
        dispatch({ type: "transitionEnd" });
      },
      reducedMotion ? 220 : TRANSITION_MS + 80,
    );
    return () => window.clearTimeout(timeout);
  }, [isTransitioning, activeSection, reducedMotion]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = query.trim();
    if (!nextQuery) {
      return;
    }

    setQuery("");
    dispatch({ type: "submit", query: nextQuery });
  }

  const duration = reducedMotion ? 0.18 : TRANSITION_MS / 1000;
  const panelVariants = {
    enter: (slide: number) =>
      reducedMotion
        ? { opacity: 0, x: 0 }
        : { opacity: 1, x: `${slide * 100}%` },
    center: { opacity: 1, x: 0 },
    exit: (slide: number) =>
      reducedMotion
        ? { opacity: 0, x: 0 }
        : { opacity: 1, x: `${slide * -100}%` },
  };

  return (
    <div
      className="guide-stage"
      data-view={view}
      data-reduced={reducedMotion ? "true" : "false"}
    >
      <div className="guide-panel-stage" aria-hidden={view !== "panel"}>
        <AnimatePresence initial={false} custom={direction}>
          {view === "panel" && activeSection ? (
            <motion.div
              key={activeSection}
              custom={direction}
              variants={panelVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration, ease: [0.42, 0, 0.58, 1] }}
              className="guide-panel"
            >
              <div className="guide-panel-scroll">{sections[activeSection]}</div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="guide-figure">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={bubble}
            role="status"
            aria-live="polite"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.12 : 0.22 }}
            className="guide-bubble"
          >
            <p>{bubble}</p>
          </motion.div>
        </AnimatePresence>
        <div className="guide-robot-idle">
          <GuideRobot className="text-ink" />
        </div>
      </div>

      <form className="guide-input-dock" onSubmit={handleSubmit}>
        <label htmlFor="guide-query" className="sr-only">
          Ask what you would like to explore
        </label>
        <input
          id="guide-query"
          name="query"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Ask about experience, research, books..."
          autoComplete="off"
          enterKeyHint="send"
        />
        <button type="submit" aria-label="Send question">
          <ArrowUp aria-hidden="true" className="size-4" />
        </button>
      </form>
    </div>
  );
}
