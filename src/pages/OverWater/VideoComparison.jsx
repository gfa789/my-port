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
  return (
    <figure className="comparison-card">
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
      </div>
      <figcaption>
        <span>Example {String(index + 1).padStart(2, "0")}</span>
        <button
          className="text-link"
          type="button"
          onClick={toggle}
          aria-label={`${playing ? "Pause" : "Play"} comparison ${index + 1}`}
        >
          {playing ? "Pause footage" : "Play footage"}{" "}
          <span aria-hidden="true">{playing ? "Ⅱ" : "▷"}</span>
        </button>
      </figcaption>
      <label htmlFor={`compare-${index}`}>
        Compare original and enhanced footage
      </label>
      <input
        id={`compare-${index}`}
        className="comparison-range"
        type="range"
        min="0"
        max="100"
        value={split}
        onChange={(event) => setSplit(Number(event.target.value))}
        aria-valuetext={`${split}% original, ${100 - split}% enhanced`}
      />
      {error && <p role="alert">{error}</p>}
    </figure>
  );
}
export default function VideoComparison() {
  return (
    <section
      className="comparison-section section shell"
      aria-labelledby="examples-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">02 / In practice</p>
          <h2 id="examples-title">See the difference.</h2>
        </div>
        <p>Move the slider to compare. Play the footage when you’re ready.</p>
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
