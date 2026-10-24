import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ArrowDown,
} from "lucide-react";
const photos = [
  {
    src: "/photos/graduation.webp",
    alt: "George Atkinson in his graduation gown",
  },
  {
    src: "/photos/portrait-960.webp",
    alt: "George Atkinson at his University of Bristol graduation",
  },
  {
    src: "/photos/beach.webp",
    alt: "George Atkinson with friends at the beach",
  },
];
export function ImageCarousel() {
  const [index, setIndex] = useState(0);
  const [requested, setRequested] = useState(0);
  const [loaded, setLoaded] = useState(photos.map(() => false));
  const imageRefs = useRef([]);
  const markLoaded = useCallback((photoIndex) => {
    const image = imageRefs.current[photoIndex];
    if (!image?.naturalWidth) return;
    Promise.resolve(image.decode?.())
      .then(() => {
        setLoaded((previous) =>
          previous[photoIndex]
            ? previous
            : previous.map((ready, i) => i === photoIndex || ready),
        );
      })
      .catch(() => {});
  }, []);
  useEffect(() => {
    imageRefs.current.forEach((image, i) => {
      if (image?.complete) markLoaded(i);
    });
  }, [markLoaded]);
  useEffect(() => {
    if (loaded[requested]) setIndex(requested);
  }, [requested, loaded]);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    const check = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", check);
    return () => document.removeEventListener("visibilitychange", check);
  }, []);
  useEffect(() => {
    if (paused || hovered || focused || hidden || reduce) return;
    const timer = setInterval(
      () => setRequested((index + 1) % photos.length),
      5000,
    );
    return () => clearInterval(timer);
  }, [paused, hovered, focused, hidden, reduce, index]);
  function next(delta) {
    setRequested((requested + delta + photos.length) % photos.length);
  }
  return (
    <div
      className="personal-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Personal photos"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
    >
      <div className="carousel-window">
        {photos.map((photo, photoIndex) => (
          <img
            key={photo.src}
            ref={(element) => {
              imageRefs.current[photoIndex] = element;
            }}
            src={photo.src}
            alt={photoIndex === index ? photo.alt : ""}
            aria-hidden={photoIndex !== index}
            className={photoIndex === index ? "is-active" : ""}
            width="960"
            height="720"
            onLoad={() => markLoaded(photoIndex)}
            fetchpriority={photoIndex === 0 ? "high" : "low"}
            draggable="false"
          />
        ))}
      </div>
      <button
        className="carousel-arrow previous"
        type="button"
        onClick={() => next(-1)}
        aria-label="Previous photo"
      >
        <ChevronLeft aria-hidden="true" size={20} />
      </button>
      <button
        className="carousel-arrow next"
        type="button"
        onClick={() => next(1)}
        aria-label="Next photo"
      >
        <ChevronRight aria-hidden="true" size={20} />
      </button>
      <div className="carousel-controls">
        <div className="carousel-dots">
          {photos.map((photo, i) => (
            <button
              type="button"
              key={photo.src}
              onClick={() => setRequested(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-pressed={index === i}
            >
              <span className={index === i ? "active" : ""} />
            </button>
          ))}
        </div>
        <button
          className="carousel-pause"
          type="button"
          aria-label={paused ? "Play slideshow" : "Pause slideshow"}
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
        >
          {paused ? (
            <Play size={15} aria-hidden="true" />
          ) : (
            <Pause size={15} aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}
export default function Header() {
  return (
    <section id="home" className="hero shell" aria-labelledby="hero-title">
      <motion.div className="hero-copy" initial={false} animate={{ y: 0 }}>
        <h1 id="hero-title">George Atkinson</h1>
        <p className="hero-role">Software Engineer</p>
        <p className="hero-description">
          Full-stack development, curious thinking, and a passion for complex
          problems.
        </p>
        <p className="hero-detail">
          Currently at Neptune North, working in reference data technology with
          .NET, Python, React and SQL.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary shine" to="/#projects">
            My projects <ArrowDown size={16} aria-hidden="true" />
          </Link>
          <Link className="button button-soft shine" to="/#contact">
            Contact me <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </motion.div>
      <div className="hero-photos">
        <ImageCarousel />
      </div>
      <Link
        to="/#experience"
        className="journey-cue"
        aria-label="Explore my timeline"
      >
        <ArrowDown size={20} aria-hidden="true" />
      </Link>
    </section>
  );
}
