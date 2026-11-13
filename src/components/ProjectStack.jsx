import { useRef, useState } from "react";
import { motion, useDragControls, useReducedMotion } from "framer-motion";
import ProjectDetail from "./ProjectDetail";
import "./ProjectStack.css";

const offsets = [0, 1, 2, -2, -1];

export default function ProjectStack({ projects }) {
  const [active, setActive] = useState(0);
  const controls = useDragControls();
  const reduceMotion = useReducedMotion();
  const stack = useRef(null);
  const count = projects.length;
  const current = projects[active];

  function step(direction) {
    setActive((index) => (index + direction + count) % count);
  }

  return (
    <div
      className="project-stack"
      role="region"
      aria-label="Browse projects"
      ref={stack}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        step(event.key === "ArrowLeft" ? -1 : 1);
      }}
    >
      <div className="project-stack-pile">
        {projects.map((project, index) => {
          const offset = offsets[(index - active + count) % count];
          const front = offset === 0;
          return (
            <div
              key={project.id}
              className="project-stack-layer"
              data-offset={offset}
              style={{
                "--depth": Math.abs(offset),
                "--side": Math.sign(offset),
              }}
            >
              {!front && (
                <button
                  type="button"
                  className="project-stack-peek"
                  aria-label={`Bring ${project.indexTitle ?? project.title} to front`}
                  onClick={(event) => {
                    if (event.detail === 0)
                      stack.current?.focus({ preventScroll: true });
                    setActive(index);
                  }}
                >
                  <span>{project.indexTitle ?? project.title}</span>
                </button>
              )}
              <motion.div
                className="project-stack-card"
                inert={front ? undefined : ""}
                aria-hidden={front ? undefined : true}
                drag={front && !reduceMotion ? "x" : false}
                dragControls={front ? controls : undefined}
                dragListener={false}
                dragMomentum={false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.55}
                onPointerDown={(event) => {
                  if (
                    front &&
                    !reduceMotion &&
                    !event.target.closest("a, button")
                  )
                    controls.start(event);
                }}
                onDragEnd={(event, info) => {
                  if (event.type === "pointercancel") return;
                  const travel = info.offset.x + info.velocity.x * 0.12;
                  if (Math.abs(travel) >= 65) step(travel < 0 ? 1 : -1);
                }}
              >
                <ProjectDetail project={project} />
              </motion.div>
            </div>
          );
        })}
      </div>
      <span className="project-stack-status" aria-live="polite">
        {current.indexTitle ?? current.title} · {active + 1} / {count}
      </span>
    </div>
  );
}
