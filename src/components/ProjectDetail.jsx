import { Link } from "react-router-dom";
import { projectRoutes } from "../projectRoutes";

const projectDetails = {
  "underwater-image-enhancement": {
    context: "BSc dissertation",
    summary:
      "I trained generative adversarial networks in PyTorch to enhance underwater images. The full showcase explains the model and lets you compare the original and enhanced footage.",
  },
  "weather-forecasting": {
    context: "Met Office group project",
    summary:
      "We turned weather observations into time-series inputs and used them to build forecasting models with scikit-learn and TensorFlow.",
  },
  "model-analysis": {
    context: "Machine learning coursework",
    summary:
      "I explored different ways to fit models in scikit-learn, then compared their performance to see how the choice of approach affected the result.",
  },
  "dartboard-detector": {
    context: "Computer vision coursework",
    summary:
      "I combined a Viola–Jones detector with Hough line geometry to locate dartboards and filter out false positives.",
  },
  "stereo-vision": {
    context: "Computer vision coursework",
    summary:
      "I matched corresponding points across two viewpoints and used epipolar geometry to reconstruct the scene in three dimensions.",
  },
};

export default function ProjectDetail({ project, active }) {
  const detail = projectDetails[project.id];
  return (
    <article
      id={project.id}
      className="project-detail"
      aria-labelledby={project.id + "-title"}
      aria-hidden={!active}
      inert={active ? undefined : ""}
      data-active={active}
    >
      <p className="eyebrow">{detail.context}</p>
      <h3 id={project.id + "-title"}>{project.title}</h3>
      <p className="project-detail-summary">{detail.summary}</p>
      <ul className="project-detail-tags" aria-label="Technologies">
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <Link
        className="project-detail-link"
        to={projectRoutes[project.id]}
        aria-label={`View project: ${project.indexTitle ?? project.title}`}
      >
        View project <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
