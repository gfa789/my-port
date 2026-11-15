import { useCallback, useEffect, useId, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";

export const clampProgress = (value, last = 1) =>
  Math.max(0, Math.min(last, value));

export function useHorizontalWheel(surface, onTravel) {
  useEffect(() => {
    const element = surface.current;
    function onWheel(event) {
      if (event.ctrlKey || event.metaKey || !event.cancelable) return;
      const { deltaX, deltaY } = event;
      const delta = event.shiftKey && !deltaX ? deltaY : deltaX;
      if (!delta || (!event.shiftKey && Math.abs(deltaX) <= Math.abs(deltaY)))
        return;
      event.preventDefault();
      const unit =
        event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? element.clientWidth
            : 1;
      onTravel(delta * unit);
    }
    element.addEventListener("wheel", onWheel, { passive: false });
    return () => element.removeEventListener("wheel", onWheel);
  }, [surface, onTravel]);
}

export function useDemoProgress(last, duration, start = 0) {
  const [step, setStep] = useState(start);
  const [playing, setPlaying] = useState(false);
  const hintId = useId();
  const surface = useRef(null);
  const enabled = useRef(true);
  const visible = useRef(false);
  const frame = useRef(0);
  const resumeTimer = useRef(null);
  const value = useRef(start);
  const direction = useRef(1);
  const pointer = useRef(null);
  const pixelsPerUnit = 520 / last;

  const update = useCallback((next) => {
    value.current = next;
    setStep(next);
  }, []);

  const stop = useCallback(() => {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
  }, []);

  const run = useCallback(() => {
    if (
      !enabled.current ||
      !visible.current ||
      document.hidden ||
      frame.current ||
      resumeTimer.current !== null ||
      pointer.current?.captured
    )
      return;

    // Convert the displayed position to the matching point in the cosine cycle.
    // That keeps the first resumed frame at the position the user selected.
    const forwardPhase = Math.acos(1 - 2 * (value.current / last)) / Math.PI;
    let phase = direction.current > 0 ? forwardPhase : 2 - forwardPhase;
    let previousTime;
    function tick(now) {
      if (previousTime !== undefined) {
        phase = (phase + Math.min(now - previousTime, 50) / duration) % 2;
        direction.current = phase < 1 ? 1 : -1;
        update((last * (1 - Math.cos(Math.PI * phase))) / 2);
      }
      previousTime = now;
      frame.current = requestAnimationFrame(tick);
    }
    frame.current = requestAnimationFrame(tick);
  }, [duration, last, update]);

  const resumeAfterInput = useCallback(
    (delay = 220) => {
      clearTimeout(resumeTimer.current);
      resumeTimer.current = setTimeout(() => {
        resumeTimer.current = null;
        run();
      }, delay);
    },
    [run],
  );

  const seek = useCallback(
    (next, delay) => {
      stop();
      update(clampProgress(next, last));
      resumeAfterInput(delay);
    },
    [last, resumeAfterInput, stop, update],
  );

  const travel = useCallback(
    (pixels) => {
      direction.current = Math.sign(pixels) || direction.current;
      seek(value.current + pixels / pixelsPerUnit);
    },
    [pixelsPerUnit, seek],
  );
  useHorizontalWheel(surface, travel);

  useEffect(() => {
    const preferences = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    function syncPreference() {
      if (preferences?.matches) {
        enabled.current = false;
        setPlaying(false);
        stop();
        update(last);
      }
    }
    syncPreference();
    preferences?.addEventListener("change", syncPreference);

    function onVisibility() {
      if (document.hidden) stop();
      else run();
    }

    const observer =
      typeof IntersectionObserver === "function" &&
      new IntersectionObserver(
        ([entry]) => {
          visible.current = entry.intersectionRatio >= 0.3;
          if (!visible.current) stop();
          else run();
        },
        { threshold: 0.3 },
      );
    if (observer) observer.observe(surface.current);
    else {
      visible.current = true;
      run();
    }

    setPlaying(enabled.current);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer?.disconnect?.();
      preferences?.removeEventListener("change", syncPreference);
      document.removeEventListener("visibilitychange", onVisibility);
      clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
      stop();
    };
  }, [last, run, stop, update]);

  function clearPointer(event) {
    if (pointer.current?.id !== event.pointerId) return;
    const { captured } = pointer.current;
    pointer.current = null;
    if (captured) resumeAfterInput();
  }

  const gesture = {
    ref: surface,
    tabIndex: 0,
    role: "group",
    "aria-describedby": hintId,
    onKeyDown(event) {
      if (
        event.target !== event.currentTarget ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey
      )
        return;

      const increment = event.shiftKey ? 65 : 520 / 24;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        travel(event.key === "ArrowLeft" ? -increment : increment);
      } else if (event.key === "Home" || event.key === "End") {
        event.preventDefault();
        direction.current = event.key === "Home" ? 1 : -1;
        seek(event.key === "Home" ? 0 : last);
      } else if (event.key === " ") {
        event.preventDefault();
        if (event.repeat) return;
        enabled.current = !enabled.current;
        setPlaying(enabled.current);
        clearTimeout(resumeTimer.current);
        resumeTimer.current = null;
        if (enabled.current) run();
        else stop();
      }
    },
    onPointerDown(event) {
      if (!event.isPrimary || event.button !== 0) return;
      if (event.target.closest("button, select, a")) return;
      pointer.current = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        captured: false,
      };
    },
    onPointerMove(event) {
      const drag = pointer.current;
      if (drag?.id !== event.pointerId) return;
      const delta = drag.x - event.clientX;
      if (!drag.captured) {
        const horizontal = Math.abs(delta);
        const vertical = Math.abs(event.clientY - drag.y);
        if (vertical > 6 && vertical > horizontal) {
          pointer.current = null;
          return;
        }
        if (horizontal < 5 || horizontal <= vertical) return;
        drag.captured = true;
        event.currentTarget.setPointerCapture(event.pointerId);
        if (event.pointerType === "mouse") {
          event.currentTarget.focus({ preventScroll: true });
        }
      }
      drag.x = event.clientX;
      if (delta) travel(delta);
    },
    onPointerUp: clearPointer,
    onPointerCancel: clearPointer,
    onLostPointerCapture: clearPointer,
    onPointerLeave(event) {
      if (!pointer.current?.captured) clearPointer(event);
    },
  };

  return { gesture, step, playing };
}

export function GestureHint({ children, id }) {
  return (
    <p className="demo-gesture-hint">
      <span id={id}>
        <MoveHorizontal size={16} aria-hidden="true" />
        Scroll or swipe sideways{" "}
        <span className="demo-key-help">
          · Arrow keys to scrub · Space to pause or resume
        </span>
      </span>
      {children && <span className="demo-gesture-value">{children}</span>}
    </p>
  );
}

export function DemoPanel({ title, detail, children }) {
  return (
    <figure className="demo-panel">
      <figcaption>
        <span>{title}</span>
        {detail && <span className="demo-panel-detail">{detail}</span>}
      </figcaption>
      {children}
    </figure>
  );
}
