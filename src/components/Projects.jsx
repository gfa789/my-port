import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProjectWheel from "./ProjectWheel";
import SectionCue from "./SectionCue";

const projects = [
  {
    id: "underwater-image-enhancement",
    title: "Underwater Image Enhancement",
    date: "Jan–May 2024",
    tags: ["PyTorch", "GANs"],
  },
  {
    id: "weather-forecasting",
    title: "ML for Weather Forecasting",
    indexTitle: "Weather Forecasting",
    date: "Jan–May 2024",
    tags: ["TensorFlow", "Time series"],
  },
  {
    id: "model-analysis",
    title: "ML Model Analysis",
    date: "Nov–Dec 2023",
    tags: ["Python", "scikit-learn"],
  },
  {
    id: "dartboard-detector",
    title: "Dartboard Detector",
    date: "Nov–Dec 2023",
    tags: ["OpenCV", "Hough transform"],
  },
  {
    id: "stereo-vision",
    title: "Stereo Vision",
    date: "Nov–Dec 2023",
    tags: ["Python", "Computer vision"],
  },
  {
    id: "distributed-game-of-life",
    title: "Distributed Game of Life",
    date: "2022",
    tags: ["Go", "RPC"],
  },
];
export default function Projects() {
  const { search } = useLocation();
  const [initialIndex, setInitialIndex] = useState(0);
  useEffect(() => {
    const selected = new URLSearchParams(search).get("project");
    setInitialIndex(
      Math.max(
        0,
        projects.findIndex((project) => project.id === selected),
      ),
    );
  }, [search]);
  return (
    <section
      id="projects"
      className="section shell project-deck"
      aria-labelledby="work-title"
    >
      <div className="portfolio-section-heading">
        <h2 id="work-title" className="section-title">
          Selected work
        </h2>
        <p>
          Six projects across machine learning, computer vision and distributed
          systems.
        </p>
      </div>
      <ProjectWheel
        key={initialIndex}
        projects={projects}
        initialIndex={initialIndex}
      />
      <SectionCue target="contact" label="Scroll to contact" />
    </section>
  );
}
