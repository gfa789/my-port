import { Link } from "react-router-dom";

const details = {
  overwater: {
    context: "BSc dissertation",
    summary:
      "I trained generative adversarial networks in PyTorch to enhance underwater images. The full showcase explains the model and lets you compare the original and enhanced footage.",
    image: "/overwater/0.webp",
    alt: "Underwater imagery from the OverWater project",
  },
  "weather-forecasting": {
    context: "Met Office group project",
    summary:
      "We turned weather observations into time-series inputs and used them to build forecasting models with scikit-learn and TensorFlow.",
    steps: [
      "Prepare weather observations",
      "Build time-series inputs",
      "Train forecasting models",
    ],
  },
  "model-analysis": {
    context: "Machine learning coursework",
    summary:
      "I explored different ways to fit models in scikit-learn, then compared their performance to see how the choice of approach affected the result.",
    steps: [
      "Fit candidate models",
      "Evaluate their predictions",
      "Compare performance",
    ],
  },
  "dartboard-detector": {
    context: "Computer vision coursework",
    summary:
      "I used Hough transforms and YOLO to detect dartboards and locate them in images.",
    image: "/projects/dartboard.webp",
    alt: "Dartboard detection coursework output",
  },
  "stereo-vision": {
    context: "Computer vision coursework",
    summary:
      "I matched corresponding points across two viewpoints and used epipolar geometry to reconstruct the scene in three dimensions.",
    image: "/projects/stereo.webp",
    alt: "Stereo vision coursework output",
  },
};

export default function ProjectDetail({ project }) {
  const detail = details[project.id];
  return (
    <article
      id={project.id}
      className="project-detail section"
      aria-labelledby={project.id + "-title"}
    >
      <div className="shell project-detail-layout">
        <div>
          <p className="eyebrow">{detail.context}</p>
          <h3 id={project.id + "-title"}>{project.title}</h3>
          <p className="project-detail-summary">{detail.summary}</p>
          <ul className="project-detail-tags" aria-label="Technologies">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          {project.route ? (
            <Link className="project-detail-link" to={project.route}>
              {project.label} <span aria-hidden="true">→</span>
            </Link>
          ) : (
            <a className="project-detail-link" href={project.href}>
              {project.label} <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
        {detail.image ? (
          <img
            className="project-detail-image"
            src={detail.image}
            alt={detail.alt}
          />
        ) : (
          <ol className="project-method" aria-label="Project workflow">
            {detail.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        )}
      </div>
    </article>
  );
}
