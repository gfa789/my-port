import { ArrowUpRight } from "lucide-react";
import InteractiveFigure from "../ProjectStudy/InteractiveFigure";
import { useEffect, useRef, useState } from "react";
import "./DiveLog.css";

const chapters = [
  {
    id: "light",
    label: "Light loss",
    body: "Water absorbs red light faster than blue or green. Scattered light softens the contrast. I used estimated depth and a light attenuation model to make synthetic pairs: a clear image and a degraded version with a known target.",
  },
  {
    id: "model",
    label: "Model",
    body: "I trained Pix2Pix on synthetic pairs and CycleGAN on unpaired collections I assembled. I modified CycleGAN to take consecutive frames and output either one frame or a sequence, and tested separate depth and video losses with Pix2Pix.",
  },
  {
    id: "result",
    label: "Result",
    body: "I tested temporal consistency on a clip left out of training. I compared colour bands and the edges of a pole over time. Video-to-image CycleGAN gave smoother edges, and depth-loss Pix2Pix gave the best qualitative balance of colour and consistency on that clip.",
  },
];

const opticsChannels = [
  {
    label: "B",
    color: "blue",
    underwater: [20, 33, 51],
    corrected: [15, 19, 27],
  },
  {
    label: "G",
    color: "green",
    underwater: [28, 56, 72],
    corrected: [17, 27, 44],
  },
  {
    label: "R",
    color: "red",
    underwater: [47, 75, 87],
    corrected: [19, 31, 61],
  },
];
const opticsLabels = ["Underwater", "Correction in progress", "Restored"];
const curve = ([a, b, c]) => `M8 13C99 ${a} 211 ${b} 432 ${c}`;

function WaterOptics({ step }) {
  const amount = step;
  const chapter = Math.round(step * 2);
  return (
    <div className="dive-readout dive-optics">
      <div className="dive-readout-head">
        <p className="dive-stage-title">RGB signal</p>
        <p className="dive-stage-detail">{opticsLabels[chapter]}</p>
      </div>
      <svg
        viewBox="0 0 480 110"
        role="img"
        aria-label="Illustrative RGB curves over distance. Red attenuates most underwater and gains the most during colour correction. Dashed lines mark the starting signal."
      >
        <path className="dive-gridline" d="M8 8v80h464 M8 35h464 M8 62h464" />
        {opticsChannels.map(({ label, color, underwater }) => (
          <path
            key={label}
            className={`dive-baseline dive-${color}`}
            d={curve(underwater)}
          />
        ))}
        {opticsChannels.map(({ label, color, underwater, corrected }) => {
          const values = underwater.map(
            (start, i) => start + (corrected[i] - start) * amount,
          );
          return (
            <g key={label} className={`dive-${color}`}>
              <path className="dive-curve" d={curve(values)} />
              <text x="443" y={values[2] + 4}>
                {label}
              </text>
            </g>
          );
        })}
        <text x="472" y="106" textAnchor="end">
          Distance →
        </text>
      </svg>
    </div>
  );
}

function ModelFlow({ step }) {
  return (
    <div
      className="dive-pipeline"
      role="img"
      aria-label="A schematic of two experiments. Paired examples train Pix2Pix. Unpaired examples train CycleGAN. Both produce an enhanced frame."
    >
      <svg viewBox="0 0 480 110" preserveAspectRatio="none" aria-hidden="true">
        <path d="M120 25H183 M120 85H183 M313 25C348 25 337 55 371 55 M313 85C348 85 337 55 371 55" />
        <path
          className="dive-flow-pulse"
          pathLength="100"
          strokeDashoffset={12 - 112 * step}
          opacity={Math.sin(Math.PI * step)}
          d="M120 25H183 M120 85H183 M313 25C348 25 337 55 371 55 M313 85C348 85 337 55 371 55"
        />
      </svg>
      <span>Paired</span>
      <strong>Pix2Pix</strong>
      <span>Unpaired</span>
      <strong>CycleGAN</strong>
      <span className="dive-pipeline-output">
        Restored
        <br />
        frame
      </span>
    </div>
  );
}

function ClipPair() {
  const surface = useRef(null);
  const original = useRef(null);
  const enhanced = useRef(null);
  const [error, setError] = useState(false);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    const clips = [original.current, enhanced.current];
    const preferences = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    let visible = false;
    let request = 0;
    function refresh() {
      const current = ++request;
      if (!visible || document.hidden || preferences?.matches || held) {
        clips.forEach((clip) => {
          if (!clip.paused) clip.pause();
        });
        return;
      }
      Promise.all(clips.map((clip) => clip.play())).then(
        () => {
          if (request === current) setError(false);
        },
        () => {
          if (request !== current) return;
          clips.forEach((clip) => {
            if (!clip.paused) clip.pause();
          });
          setError(true);
        },
      );
    }
    const observer =
      typeof IntersectionObserver === "function"
        ? new IntersectionObserver(
            ([entry]) => {
              visible = entry.isIntersecting && entry.intersectionRatio >= 0.35;
              refresh();
            },
            { threshold: 0.35 },
          )
        : null;
    observer?.observe(surface.current);
    document.addEventListener("visibilitychange", refresh);
    preferences?.addEventListener("change", refresh);
    return () => {
      observer?.disconnect();
      visible = false;
      refresh();
      document.removeEventListener("visibilitychange", refresh);
      preferences?.removeEventListener("change", refresh);
    };
  }, [held]);

  function sync() {
    if (
      !original.current.paused &&
      !enhanced.current.paused &&
      Math.abs(original.current.currentTime - enhanced.current.currentTime) >
        0.18
    ) {
      enhanced.current.currentTime = original.current.currentTime;
    }
  }
  return (
    <>
      <div
        className="dive-frames"
        ref={surface}
        tabIndex={0}
        role="group"
        aria-label="Original and enhanced footage. Press Space to pause or resume."
        onKeyDown={(event) => {
          if (event.key !== " " || event.repeat) return;
          event.preventDefault();
          setHeld((previous) => !previous);
        }}
      >
        <figure>
          <video
            ref={original}
            poster="/underwater/0.webp"
            preload="none"
            muted
            playsInline
            aria-label="Original underwater footage"
            onTimeUpdate={sync}
            loop
          >
            <source
              src="/underwater/optimized_videos/optimized_0.mp4"
              type="video/mp4"
            />
          </video>
          <figcaption>Original</figcaption>
        </figure>
        <figure>
          <video
            ref={enhanced}
            poster="/underwater/1.webp"
            preload="none"
            muted
            playsInline
            aria-label="Enhanced underwater footage"
            loop
          >
            <source
              src="/underwater/optimized_videos/optimized_0_good.mp4"
              type="video/mp4"
            />
          </video>
          <figcaption>Enhanced</figcaption>
        </figure>
      </div>
      {error && (
        <p className="dive-media-status" role="status">
          Playback unavailable. Showing stills.
        </p>
      )}
    </>
  );
}

export default function DiveLog({ sources }) {
  return (
    <section
      className="dive-log"
      id="approach"
      aria-labelledby="approach-title"
    >
      <div className="case-shell dive-layout">
        <header className="exhibit-lead">
          <h2 id="approach-title">Dive log</h2>
          <p>
            By comparing the same clip before and after correction, I could look
            for both colour recovery and flicker.
          </p>
        </header>
        <ClipPair />
        <div className="dive-analysis">
          <section aria-label="Light loss">
            <p>
              Red attenuates fastest with distance. The dashed curves show the
              starting signal before illustrative correction.
            </p>
            <InteractiveFigure label="RGB colour restoration" duration={3400}>
              {(step) => <WaterOptics step={step} />}
            </InteractiveFigure>
          </section>
          <section aria-label="Model flow">
            <p>
              Pix2Pix learns from paired images. CycleGAN learns from
              collections without matching pairs.
            </p>
            <InteractiveFigure label="Model flow" duration={2700}>
              {(step) => <ModelFlow step={step} />}
            </InteractiveFigure>
          </section>
        </div>
        <div className="exhibit-notes">
          {chapters.map(({ id, label, body }) => (
            <article key={id} id={`dive-${id}`}>
              <h3>{label}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
        <div className="dive-sources case-sources">
          {sources.map(([label, url]) => (
            <a key={url} href={url}>
              {label} <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
