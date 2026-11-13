import { Children, useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { ArrowLeft, ArrowRight, MoveHorizontal } from "lucide-react";

const scrollIdleMs = 120;
const easeOut = [0.23, 1, 0.32, 1];

function ChapterSlide({ card, index, active, position, reduce }) {
  const offset = useTransform(position, (value) => index - value);
  const transform = useTransform(offset, (value) => {
    const depth = Math.min(3, Math.max(0, value));
    const x = value < 0 ? Math.max(-120, value * 108) : depth * 9;
    return `translate3d(${x}%, ${depth * 12}px, 0) rotate(${depth * 1.6}deg) scale(${1 - depth * 0.055})`;
  });
  const opacity = useTransform(offset, (value) => {
    if (value < 0) return Math.max(0, 1 + value * 1.4);
    return Math.max(0, 1 - value * 0.42);
  });
  const selected = index === active;

  return (
    <motion.div
      className="chapter-slide"
      data-active={selected}
      aria-hidden={!selected}
      inert={!selected ? "" : undefined}
      style={{
        zIndex: 100 - index,
        pointerEvents: selected ? "auto" : "none",
        transform: reduce ? "none" : transform,
        opacity: reduce ? Number(selected) : opacity,
      }}
    >
      {card}
    </motion.div>
  );
}

export default function ChapterViewer({
  label,
  timeline = false,
  entries,
  children,
  selectedIndex,
  onSelect,
}) {
  const cards = Children.toArray(children);
  const [localActive, setActive] = useState(0);
  const active = selectedIndex ?? localActive;
  const stage = useRef(null);
  const wheelSnap = useRef(null);
  const position = useMotionValue(0);
  const gesture = useRef(null);
  const suppressClick = useRef(false);
  const reduce = useReducedMotion();
  const last = cards.length - 1;
  const progress = useTransform(
    position,
    (value) => (Math.max(0, Math.min(last, value)) + 1) / cards.length,
  );
  const clamp = (index) => Math.max(0, Math.min(last, index));

  function go(index, { instant = false, velocity } = {}) {
    clearTimeout(wheelSnap.current);
    const next = clamp(index);
    destination.current = next;
    if (onSelect) onSelect(next);
    else setActive(next);
    if (instant || reduce) {
      position.jump(next);
    } else {
      animate(
        position,
        next,
        velocity === undefined
          ? { duration: 0.24, ease: easeOut }
          : {
              type: "spring",
              stiffness: 480,
              damping: 34,
              mass: 0.75,
              velocity,
            },
      );
    }
  }

  const destination = useRef(active);
  useEffect(() => {
    if (destination.current !== active) {
      clearTimeout(wheelSnap.current);
      destination.current = active;
      position.jump(active);
    }
  }, [active, position]);

  useEffect(() => {
    const element = stage.current;
    function scrollHorizontally(event) {
      const delta =
        event.shiftKey && !event.deltaX ? event.deltaY : event.deltaX;
      if (
        event.ctrlKey ||
        gesture.current ||
        !delta ||
        (!event.shiftKey && Math.abs(delta) <= Math.abs(event.deltaY))
      )
        return;
      event.preventDefault();
      const width =
        element.firstElementChild?.offsetWidth || element.clientWidth || 1;
      const pixels =
        delta *
        (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? width : 1);

      // Follow the input, including its momentum. Only settle once it goes quiet.
      clearTimeout(wheelSnap.current);
      position.stop();
      position.set(clamp(position.get() + pixels / width));
      wheelSnap.current = setTimeout(() => {
        go(Math.round(position.get()), { velocity: 0 });
      }, scrollIdleMs);
    }
    element.addEventListener("wheel", scrollHorizontally, { passive: false });
    return () => element.removeEventListener("wheel", scrollHorizontally);
  });

  useEffect(() => () => clearTimeout(wheelSnap.current), []);

  function finishGesture(event, cancelled = false) {
    const drag = gesture.current;
    if (drag?.id !== event.pointerId) return;
    gesture.current = null;
    if (drag.start === undefined) return;
    const distance = drag.x - event.clientX;
    const velocity =
      cancelled || event.timeStamp - drag.time > 90 ? 0 : drag.velocity;
    const flick = !reduce && Math.abs(velocity) > 500;
    const moved = Math.abs(distance) > Math.min(drag.width * 0.25, 120);
    const next =
      !cancelled && (flick || moved)
        ? active + Math.sign(flick ? velocity : distance)
        : active;
    go(next, { velocity: velocity / drag.width });
  }

  return (
    <div
      className={`chapter-viewer ${timeline ? "career-viewer" : "project-viewer"}`}
    >
      <div className="chapter-toolbar">
        <span className="chapter-caption">
          {timeline
            ? "THE JOURNEY / NEWEST FIRST"
            : "SELECTED WORK / EXPLORE THE ARCHIVE"}
        </span>
        <span className="chapter-gesture">
          <MoveHorizontal size={16} /> Scroll sideways or drag
        </span>
      </div>
      <div
        className="chapter-stage"
        ref={stage}
        role="region"
        aria-roledescription="carousel"
        aria-label={timeline ? "Career timeline" : "Browse projects"}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          const destinations = {
            ArrowLeft: active - 1,
            ArrowRight: active + 1,
            Home: 0,
            End: cards.length - 1,
          };
          if (Object.hasOwn(destinations, event.key)) {
            event.preventDefault();
            go(destinations[event.key], { instant: true });
          }
        }}
        onPointerDown={(event) => {
          suppressClick.current = false;
          if (
            !event.isPrimary ||
            event.button !== 0 ||
            event.target.closest("a, button")
          )
            return;
          const width = event.target.closest(".chapter-slide")?.offsetWidth;
          if (!width) return;
          gesture.current = {
            id: event.pointerId,
            x: event.clientX,
            y: event.clientY,
            width,
            lastX: event.clientX,
            time: event.timeStamp,
            velocity: 0,
          };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onDragStart={(event) => event.preventDefault()}
        onClickCapture={(event) => {
          if (!suppressClick.current || event.detail === 0) return;
          event.preventDefault();
          event.stopPropagation();
        }}
        onPointerMove={(event) => {
          const drag = gesture.current;
          if (drag?.id !== event.pointerId) return;
          const dx = event.clientX - drag.x;
          if (drag.start === undefined) {
            if (
              Math.abs(event.clientY - drag.y) > Math.abs(dx) &&
              Math.abs(event.clientY - drag.y) > 6
            ) {
              gesture.current = null;
              return;
            }
            if (Math.abs(dx) < 6) return;
            clearTimeout(wheelSnap.current);
            position.stop();
            drag.start = position.get();
            suppressClick.current = true;
          }
          const dt = event.timeStamp - drag.time;
          if (dt > 0)
            drag.velocity = ((drag.lastX - event.clientX) * 1000) / dt;
          drag.lastX = event.clientX;
          drag.time = event.timeStamp;
          if (reduce) return;
          const raw = drag.start - dx / drag.width;
          const bounded = clamp(raw);
          position.set(bounded + (raw - bounded) * 0.2);
        }}
        onPointerUp={(event) => finishGesture(event)}
        onPointerCancel={(event) => finishGesture(event, true)}
        onLostPointerCapture={(event) => finishGesture(event, true)}
      >
        {cards.map((card, index) => (
          <ChapterSlide
            key={card.key}
            {...{ card, index, active, position, reduce }}
          />
        ))}
      </div>
      <div className="chapter-navigation">
        <button
          className="chapter-arrow"
          type="button"
          aria-label={`Previous ${label}`}
          disabled={active === 0}
          onClick={(event) => go(active - 1, { instant: event.detail === 0 })}
        >
          <ArrowLeft size={20} />
        </button>
        <div
          className="chapter-index"
          aria-label={timeline ? "Choose career chapter" : "Choose project"}
        >
          {entries.map((entry, index) => (
            <button
              key={index}
              type="button"
              aria-label={`${entry.title}, ${entry.date}`}
              aria-current={index === active ? "step" : undefined}
              onClick={(event) => go(index, { instant: event.detail === 0 })}
            >
              <span className="chapter-tick" />
              <span className="chapter-year">
                {timeline
                  ? entry.date.match(/\d{4}/)?.[0]
                  : String(index + 1).padStart(2, "0")}
              </span>
              <span className="chapter-index-title">{entry.title}</span>
            </button>
          ))}
          <motion.div
            className="chapter-progress"
            initial={false}
            style={{ scaleX: progress }}
          />
        </div>
        <button
          className="chapter-arrow"
          type="button"
          aria-label={`Next ${label}`}
          disabled={active === cards.length - 1}
          onClick={(event) => go(active + 1, { instant: event.detail === 0 })}
        >
          <ArrowRight size={20} />
        </button>
      </div>
      <div className="chapter-footer" aria-live="polite" aria-atomic="true">
        <span>
          {String(active + 1).padStart(2, "0")} /{" "}
          {String(cards.length).padStart(2, "0")}
        </span>
        <span>
          {entries[active].title} <span aria-hidden="true">↗</span>
        </span>
      </div>
    </div>
  );
}
