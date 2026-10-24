import { Play, Pause } from "lucide-react";
import { useEffect, useRef, useState } from "react";
function Comparison({ index }) {
  const [split, setSplit] = useState(50);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState("");
  const before = useRef(null),
    after = useRef(null);
  useEffect(() => {
    if (!playing) return;
    const stop = () => {
      if (document.hidden) {
        before.current?.pause();
        after.current?.pause();
        setPlaying(false);
      }
    };
    document.addEventListener("visibilitychange", stop);
    return () => document.removeEventListener("visibilitychange", stop);
  }, [playing]);
  async function toggle() {
    if (playing) {
      before.current.pause();
      after.current.pause();
      setPlaying(false);
      return;
    }
    try {
      setError("");
      after.current.currentTime = before.current.currentTime;
      await Promise.all([before.current.play(), after.current.play()]);
      setPlaying(true);
    } catch {
      before.current?.pause();
      after.current?.pause();
      setPlaying(false);
      setError(
        "The videos could not play. You can still compare the still images or read the dissertation.",
      );
    }
  }
  function sync() {
    if (
      before.current &&
      after.current &&
      Math.abs(before.current.currentTime - after.current.currentTime) > 0.15
    )
      after.current.currentTime = before.current.currentTime;
  }
  function drag(event) {
    const bounds = event.currentTarget.getBoundingClientRect();
    if (bounds.width)
      setSplit(
        Math.max(
          0,
          Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100),
        ),
      );
  }
  function handleKey(event) {
    const step = event.shiftKey ? 10 : 1;
    const changes = {
      ArrowLeft: -step,
      ArrowDown: -step,
      ArrowRight: step,
      ArrowUp: step,
    };
    if (event.key === "Home" || event.key === "End" || event.key in changes) {
      event.preventDefault();
      setSplit((value) =>
        event.key === "Home"
          ? 0
          : event.key === "End"
            ? 100
            : Math.max(0, Math.min(100, value + changes[event.key])),
      );
    }
  }
  return (
    <figure
      className="comparison-card"
      aria-label={`Underwater comparison ${index + 1}`}
    >
      <div className="comparison-media">
        <video
          ref={after}
          preload="none"
          poster={`/overwater/${index * 2 + 1}.webp`}
          loop
          muted
          playsInline
          aria-label={`Enhanced underwater footage, example ${index + 1}`}
          onError={() =>
            setError("Video unavailable. The still image remains available.")
          }
        >
          <source
            src={`/overwater/optimized_videos/optimized_${index}_good.mp4`}
            type="video/mp4"
          />
        </video>
        <video
          ref={before}
          preload="none"
          poster={`/overwater/${index * 2}.webp`}
          loop
          muted
          playsInline
          style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
          aria-label={`Original underwater footage, example ${index + 1}`}
          onTimeUpdate={sync}
          onError={() =>
            setError("Video unavailable. The still image remains available.")
          }
        >
          <source
            src={`/overwater/optimized_videos/optimized_${index}.mp4`}
            type="video/mp4"
          />
        </video>
        <span
          className="comparison-divider"
          style={{ left: `${split}%` }}
          aria-hidden="true"
        />
        <span className="comparison-label before-label">Original</span>
        <span className="comparison-label after-label">Enhanced</span>
        <div
          className="comparison-drag-surface"
          role="slider"
          tabIndex={0}
          aria-label={`Image split, example ${index + 1}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(split)}
          aria-valuetext={`${Math.round(split)}% original, ${100 - Math.round(split)}% enhanced`}
          onKeyDown={handleKey}
          onPointerDown={(event) => {
            if (event.button !== 0) return;
            event.preventDefault();
            event.currentTarget.focus({ preventScroll: true });
            event.currentTarget.setPointerCapture(event.pointerId);
            drag(event);
          }}
          onPointerMove={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId))
              drag(event);
          }}
          onPointerUp={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              drag(event);
              event.currentTarget.releasePointerCapture(event.pointerId);
            }
          }}
        />
        <div className="comparison-player-controls">
          <span>Example {String(index + 1).padStart(2, "0")}</span>
          <button
            className="comparison-play"
            type="button"
            onClick={toggle}
            aria-label={`${playing ? "Pause" : "Play"} comparison ${index + 1}`}
          >
            {playing ? (
              <Pause size={17} aria-hidden="true" />
            ) : (
              <Play size={17} aria-hidden="true" />
            )}
            {playing ? "Pause" : "Play"}
          </button>
        </div>
      </div>
      {error && <p role="alert">{error}</p>}
    </figure>
  );
}
export default function VideoComparison({ headingLevel = 2 }) {
  const Heading = `h${headingLevel}`;
  return (
    <section
      id="examples-title"
      className="comparison-section section shell"
      aria-labelledby="examples-heading"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">In practice</p>
          <Heading id="examples-heading">See the difference.</Heading>
        </div>
        <p>
          Drag the divider to compare. Play or pause directly in each video.
        </p>
      </div>
      <div className="comparison-grid">
        <Comparison index={0} />
        <Comparison index={1} />
      </div>
      <a
        className="text-link"
        href="https://drive.google.com/file/d/1n85HyTZDCYAQlW12iAW1lgoUPREGd93h/view"
      >
        Read the full dissertation <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}
