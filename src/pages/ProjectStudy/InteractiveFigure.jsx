import { GestureHint, useDemoProgress } from "./DemoControls";

export default function InteractiveFigure({
  label,
  end = 1,
  start = 0,
  duration,
  children,
}) {
  const { gesture, step, playing } = useDemoProgress(end, duration, start);
  return (
    <div
      className="exhibit-scrub demo-scene"
      {...gesture}
      aria-label={label}
      data-sequence-playing={playing}
    >
      <GestureHint id={gesture["aria-describedby"]} />
      {children(step)}
    </div>
  );
}
