import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import ProjectDetail from "./ProjectDetail";
import { projectRoutes } from "../projectRoutes";
import "./ProjectWheel.css";

const fullTurn = 2 * Math.PI;
const radius = 0.66;
const spring = {
  type: "spring",
  stiffness: 330,
  damping: 30,
  restDelta: 0.002,
};
const wrap = (value, count) => ((value % count) + count) % count;
const offsetFrom = (index, current, count) =>
  wrap(index - current + count / 2, count) - count / 2;
const clamp = (value, maximum) => Math.max(-maximum, Math.min(maximum, value));
const dragStep = (stage, count) =>
  ((stage.firstElementChild?.offsetHeight || 150) * radius * fullTurn) / count;

function WheelCard({
  project,
  index,
  count,
  position,
  active,
  onSelect,
  onOpen,
}) {
  const angle = useTransform(
    position,
    (value) => ((index - value) * fullTurn) / count,
  );
  const facing = useTransform(angle, Math.cos);
  const transform = useTransform(angle, (value) => {
    const depth = Math.cos(value);
    const arc = Math.sin(value);
    return `translate3d(${(1 - depth) * 10}%, ${arc * radius * 100}%, 0) rotateX(${-arc * 49}deg) scale(${0.8 + depth * 0.2})`;
  });
  const opacity = useTransform(facing, [-0.23, 0.31, 1], [0, 0.83, 1]);
  const zIndex = useTransform(facing, (value) => Math.round((value + 1) * 100));
  const offset = offsetFrom(index, active, count);
  const name = project.indexTitle ?? project.title;
  const path = projectRoutes[project.id];

  function select() {
    onSelect(index);
  }

  return (
    <motion.div
      className="project-wheel-card"
      data-project={project.id}
      data-active={offset === 0}
      aria-hidden={Math.abs(offset) > 1}
      style={{ transform, opacity, zIndex }}
    >
      <Link
        className="project-wheel-art"
        to={path}
        tabIndex={offset === 0 ? 0 : -1}
        aria-label={`Open ${name}`}
        draggable={false}
        onClick={(event) => onOpen(event, path)}
      >
        <img
          src={`/projects/previews/${project.id}.webp`}
          alt=""
          draggable={false}
          decoding="async"
        />
        <span className="project-wheel-open" aria-hidden="true">
          <ArrowUpRight size={17} />
        </span>
      </Link>
      {Math.abs(offset) === 1 ? (
        <button
          className="project-wheel-label project-wheel-peek"
          type="button"
          tabIndex={-1}
          aria-label={`Show ${name}`}
          onClick={select}
        >
          <span>{name}</span>
          <span>{project.date}</span>
        </button>
      ) : (
        <div className="project-wheel-label">
          <span>{name}</span>
          <span>{project.date}</span>
        </div>
      )}
    </motion.div>
  );
}

export default function ProjectWheel({ projects, initialIndex = 0 }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(initialIndex);
  const [dragging, setDragging] = useState(false);
  const position = useMotionValue(initialIndex);
  const reduced = useReducedMotion();
  const wheel = useRef(null);
  const stage = useRef(null);
  const gesture = useRef(null);
  const wheelTimer = useRef(null);
  const destination = useRef(initialIndex);
  const suppressClick = useRef(false);
  const count = projects.length;

  const snapTo = useCallback(
    (target, velocity = 0) => {
      clearTimeout(wheelTimer.current);
      wheelTimer.current = null;
      destination.current = target;
      setActive(wrap(target, count));
      if (reduced) position.jump(target);
      else animate(position, target, { ...spring, velocity });
    },
    [count, position, reduced],
  );

  function step(direction) {
    snapTo(destination.current + direction);
  }

  function pick(index) {
    const nearest = Math.round(position.get());
    snapTo(nearest + offsetFrom(index, nearest, count));
  }

  function openPreview(event, path) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.detail === 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey ||
      reduced ||
      !document.startViewTransition
    )
      return;

    event.preventDefault();
    const root = document.documentElement;
    if (root.classList.contains("project-preview-transition")) return;

    const preview = event.currentTarget.querySelector("img");
    if (!preview.naturalWidth) {
      navigate(path);
      return;
    }

    preview.style.viewTransitionName = "project-preview";
    root.classList.add("project-preview-transition");
    const transition = document.startViewTransition(() => {
      preview.style.viewTransitionName = "";
      flushSync(() => navigate(path));
      window.scrollTo({ top: 0, behavior: "instant" });
    });
    const reset = () => root.classList.remove("project-preview-transition");
    transition.finished.then(reset, reset);
  }

  useEffect(() => {
    const element = wheel.current;
    function onWheel(event) {
      const delta =
        event.shiftKey && !event.deltaX ? event.deltaY : event.deltaX;
      if (
        (!stage.current.contains(event.target) && event.target !== element) ||
        gesture.current ||
        event.ctrlKey ||
        !delta ||
        (!event.shiftKey && Math.abs(delta) <= Math.abs(event.deltaY))
      )
        return;

      event.preventDefault();
      position.stop();
      const size = dragStep(stage.current, count);
      const unit =
        event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? size : 1;
      position.set(position.get() + (delta * unit) / size);
      clearTimeout(wheelTimer.current);
      wheelTimer.current = setTimeout(
        () => snapTo(Math.round(position.get())),
        110,
      );
    }
    element.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      element.removeEventListener("wheel", onWheel);
      clearTimeout(wheelTimer.current);
      position.stop();
    };
  }, [position, count, snapTo]);

  function endDrag(event, cancelled = false) {
    const drag = gesture.current;
    if (drag?.id !== event.pointerId) return;
    gesture.current = null;
    setDragging(false);
    if (!drag.moved) {
      if (position.get() !== destination.current) snapTo(destination.current);
      return;
    }
    const velocity =
      !cancelled && !reduced && drag.moved && event.timeStamp - drag.time < 75
        ? clamp(drag.velocity, 8)
        : 0;
    snapTo(Math.round(position.get() + velocity * 0.12), velocity);
  }

  return (
    <div
      className="project-wheel-layout"
      role="region"
      aria-label="Browse projects"
      ref={wheel}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.target.closest("a")) return;
        const direction = {
          ArrowUp: -1,
          ArrowDown: 1,
          ArrowLeft: -1,
          ArrowRight: 1,
        }[event.key];
        if (!direction) return;
        event.preventDefault();
        step(direction);
      }}
    >
      <div className="project-wheel-viewer">
        <div
          className="project-wheel-stage"
          ref={stage}
          data-dragging={dragging}
          onPointerDown={(event) => {
            if (!event.isPrimary || event.button !== 0) return;
            clearTimeout(wheelTimer.current);
            wheelTimer.current = null;
            position.stop();
            suppressClick.current = false;
            gesture.current = {
              id: event.pointerId,
              y: event.clientY,
              start: position.get(),
              size: dragStep(event.currentTarget, count),
              last: position.get(),
              time: event.timeStamp,
              velocity: 0,
              moved: false,
            };
          }}
          onPointerMove={(event) => {
            const drag = gesture.current;
            if (drag?.id !== event.pointerId) return;
            const distance = drag.y - event.clientY;
            if (!drag.moved) {
              if (Math.abs(distance) < 5) return;
              drag.moved = true;
              suppressClick.current = true;
              setDragging(true);
              event.currentTarget.setPointerCapture(event.pointerId);
            }
            const value = drag.start + distance / drag.size;
            const elapsed = event.timeStamp - drag.time;
            if (elapsed > 0)
              drag.velocity = (1000 * (value - drag.last)) / elapsed;
            drag.last = value;
            drag.time = event.timeStamp;
            position.set(value);
          }}
          onPointerUp={endDrag}
          onPointerCancel={(event) => endDrag(event, true)}
          onLostPointerCapture={(event) => {
            if (event.target === event.currentTarget) endDrag(event, true);
          }}
          onPointerLeave={(event) => {
            if (!gesture.current?.moved) endDrag(event, true);
          }}
          onClickCapture={(event) => {
            if (suppressClick.current && event.detail !== 0) {
              event.preventDefault();
              event.stopPropagation();
            }
          }}
        >
          {projects.map((project, index) => (
            <WheelCard
              key={project.id}
              {...{ project, index, count, position, active }}
              onSelect={pick}
              onOpen={openPreview}
            />
          ))}
        </div>
        <div className="project-wheel-controls">
          <button
            type="button"
            aria-label="Previous project"
            onClick={() => step(-1)}
          >
            <ChevronUp size={19} aria-hidden="true" />
          </button>
          <span className="project-wheel-count" aria-hidden="true">
            {String(active + 1).padStart(2, "0")}
            <span />
            {String(count).padStart(2, "0")}
          </span>
          <button
            type="button"
            aria-label="Next project"
            onClick={() => step(1)}
          >
            <ChevronDown size={19} aria-hidden="true" />
          </button>
        </div>
        <p className="project-wheel-hint">Drag or swipe to rotate</p>
      </div>
      <div className="project-wheel-details">
        {projects.map((project, index) => (
          <ProjectDetail
            key={project.id}
            project={project}
            active={index === active}
          />
        ))}
      </div>
      <span className="project-wheel-status" aria-live="polite">
        {projects[active].indexTitle ?? projects[active].title}, {active + 1} of{" "}
        {count}
      </span>
    </div>
  );
}
