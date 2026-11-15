import { useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import SectionCue from "./SectionCue";

const photos = [
  {
    src: "/photos/graduation.webp",
    alt: "George Atkinson in his graduation gown",
  },
  {
    src: "/photos/coastal-travel.webp",
    alt: "George Atkinson at a coastal viewpoint",
  },
  {
    src: "/photos/beach.webp",
    alt: "George Atkinson with friends at the beach",
  },
];
function PhotoComposition() {
  const [featured, setFeatured] = useState(null);
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 240, damping: 28 });
  const y = useSpring(pointerY, { stiffness: 240, damping: 28 });

  return (
    <div
      className="hero-photo-composition"
      role="group"
      aria-label="Personal photos"
      onKeyDown={(event) => {
        if (event.key === "Escape") setFeatured(null);
      }}
      onPointerMove={(event) => {
        if (reducedMotion || event.pointerType !== "mouse") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 24);
        pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 18);
      }}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
    >
      <motion.div className="hero-photo-arch" style={{ x, y }}>
        <img src={photos[0].src} alt={photos[0].alt} fetchpriority="high" />
      </motion.div>
      {photos.slice(1).map((photo, index) => (
        <div
          key={photo.src}
          className={`hero-photo-print-position hero-photo-print-position-${index === 0 ? "left" : "right"}`}
          data-featured={featured === index}
        >
          <button
            className="hero-photo-print"
            type="button"
            aria-pressed={featured === index}
            onClick={() => setFeatured(featured === index ? null : index)}
          >
            <img src={photo.src} alt={photo.alt} />
          </button>
        </div>
      ))}
    </div>
  );
}
export default function Header() {
  return (
    <section id="home" className="hero shell" aria-labelledby="hero-title">
      <div className="hero-copy">
        <h1 id="hero-title">George Atkinson</h1>
        <p className="hero-role">Software Engineer</p>
        <p className="hero-description">
          I build full-stack applications and explore machine learning and
          computer vision.
        </p>
        <p className="hero-detail">
          At Neptune North, I work in reference data technology with .NET,
          Python, React and SQL. I studied Computer Science at the University of
          Bristol, where my dissertation explored underwater image enhancement
          with GANs.
        </p>
        <div className="hero-actions">
          <Link
            className="button hero-action hero-action-primary"
            to="/#experience"
          >
            My experience <ArrowDown size={16} aria-hidden="true" />
          </Link>
          <Link
            className="button hero-action hero-action-secondary"
            to="/#contact"
          >
            Contact me <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="hero-photos">
        <PhotoComposition />
      </div>
      <SectionCue target="experience" label="Scroll to experience" />
    </section>
  );
}
