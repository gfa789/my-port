import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Reveal from "./Reveal";
const projects = [
  {
    title: "Underwater Image Enhancement",
    icon: "🌊",
    date: "Jan–May 2024",
    description:
      "My university dissertation: creating a dataset and researching underwater image enhancement with GANs in PyTorch.",
    tags: ["PyTorch", "GANs"],
    internal: "/overwater",
    label: "Explore OverWater",
    code: "https://github.com/gfa789/finalproject",
    paper:
      "https://drive.google.com/file/d/1n85HyTZDCYAQlW12iAW1lgoUPREGd93h/view",
  },
  {
    title: "ML for Weather Forecasting",
    icon: "⛅",
    date: "Jan–May 2024",
    description:
      "A university group project set by the Met Office: wrangling weather time-series data and forecasting with scikit-learn and TensorFlow.",
    tags: ["TensorFlow", "Time series"],
    href: "https://drive.google.com/file/d/111cPGMAF14W8wbxG88lhSIKxDMPB1ul9/view",
    label: "Read forecasting report",
  },
  {
    title: "ML Model Analysis",
    icon: "📈",
    date: "Nov–Dec 2023",
    description:
      "Exploring techniques for fitting models with scikit-learn, then analysing and comparing their performance.",
    tags: ["Python", "scikit-learn"],
    href: "https://github.com/gfa789/ml-cw",
    label: "View model analysis code",
  },
  {
    title: "Dartboard Detector",
    icon: "🎯",
    date: "Nov–Dec 2023",
    description:
      "Finding and locating dartboards using Hough transforms and YOLO, built for my computer vision module.",
    tags: ["Computer vision", "YOLO"],
    href: "https://github.com/gfa789/darts-cw/tree/main/Part1",
    label: "View detector code",
  },
  {
    title: "Stereo Vision",
    icon: "🎥",
    date: "Nov–Dec 2023",
    description:
      "Detecting correspondences across two viewpoints and using epipolar geometry to reconstruct a scene in 3D.",
    tags: ["Python", "Computer vision"],
    href: "https://github.com/gfa789/darts-cw/tree/main/Part2",
    label: "View stereo vision code",
  },
  {
    title: "Veterinary Database",
    icon: "📊",
    date: "Sept 2022–May 2023",
    description:
      "A team of four building a full-stack React, Node.js and MongoDB database for the university vet school, with different user permission levels. Further details are confidential under an NDA.",
    tags: ["React", "Node.js", "MongoDB"],
  },
];
export default function Projects() {
  const reduce = useReducedMotion();
  return (
    <section
      id="projects"
      className="work-section section shell"
      aria-labelledby="work-title"
    >
      <h2 id="work-title" className="section-title">
        My Projects
      </h2>
      <div className="project-grid">
        {projects.map((project) => (
          <Reveal key={project.title}>
            <motion.article
              className="project-card glass-card"
              whileHover={reduce ? {} : { scale: 1.04, y: -5 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
            >
              <div className="project-top">
                <span className="project-emoji" aria-hidden="true">
                  {project.icon}
                </span>
                <span>{project.date}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <ul className="tags" aria-label="Technologies">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <div className="project-links">
                {project.internal ? (
                  <Link className="text-link" to={project.internal}>
                    {project.label}
                    <ExternalLink size={15} aria-hidden="true" />
                  </Link>
                ) : project.href ? (
                  <a className="text-link" href={project.href}>
                    {project.label}
                    <ExternalLink size={15} aria-hidden="true" />
                  </a>
                ) : (
                  <span className="private-project">Private project · NDA</span>
                )}
                {project.paper && <a href={project.paper}>Read dissertation</a>}
                {project.code && <a href={project.code}>View research code</a>}
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
