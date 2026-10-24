import { Link } from "react-router-dom";
const paper =
  "https://drive.google.com/file/d/1n85HyTZDCYAQlW12iAW1lgoUPREGd93h/view";
const projects = [
  {
    title: "Dartboard detector",
    date: "2023",
    tags: ["Computer vision", "Python", "YOLO"],
    description:
      "Finding dartboards in images with Hough transforms and object detection. Built for my computer vision coursework at Bristol.",
    href: "https://github.com/gfa789/darts-cw/tree/main/Part1",
    label: "View detector code",
  },
  {
    title: "Weather forecasting",
    date: "2024",
    tags: ["Machine learning", "TensorFlow", "Time series"],
    description:
      "A team project set by the Met Office: wrangling weather observations and exploring machine learning methods for forecasting.",
    href: "https://drive.google.com/file/d/111cPGMAF14W8wbxG88lhSIKxDMPB1ul9/view",
    label: "Read forecasting report",
  },
];
const archive = [
  {
    title: "Stereo vision",
    description:
      "Reconstructing a scene in 3D from two viewpoints using image correspondences and epipolar geometry.",
    href: "https://github.com/gfa789/darts-cw/tree/main/Part2",
    label: "View stereo vision code",
  },
  {
    title: "ML model analysis",
    description:
      "Exploring model-fitting techniques in scikit-learn and analysing their performance.",
    href: "https://github.com/gfa789/ml-cw",
    label: "View model analysis code",
  },
  {
    title: "Veterinary database",
    description:
      "A team of four building a full-stack React, Node.js and MongoDB database for the university vet school, with different user permission levels. Further details are confidential under an NDA.",
  },
];
export default function Projects() {
  return (
    <section
      id="projects"
      className="work-section section shell"
      aria-labelledby="work-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 / Selected work</p>
          <h2 id="work-title">Ideas, put into practice.</h2>
        </div>
        <p>
          A selection of research and university projects, from machine learning
          to computer vision.
        </p>
      </div>
      <article className="featured-project">
        <Link
          to="/overwater"
          className="project-visual"
          aria-label="Explore the OverWater case study"
        >
          <div className="image-pair">
            <figure>
              <img
                src="/overwater/0.webp"
                alt="Original underwater scene with a green colour cast"
                width="512"
                height="512"
                loading="lazy"
              />
              <figcaption>Original</figcaption>
            </figure>
            <figure>
              <img
                src="/overwater/1.webp"
                alt="Corresponding scene enhanced by the OverWater model"
                width="512"
                height="512"
                loading="lazy"
              />
              <figcaption>Enhanced</figcaption>
            </figure>
          </div>
          <span className="visual-caption">
            A clearer view below the surface <span aria-hidden="true">↗</span>
          </span>
        </Link>
        <div className="project-copy">
          <p className="eyebrow">Featured project / 2024</p>
          <h3>OverWater</h3>
          <p className="project-subtitle">Underwater image enhancement</p>
          <p>
            My dissertation exploring how generative adversarial networks can
            bring colour and clarity to underwater imagery. I created a dataset
            and researched deep learning approaches in PyTorch.
          </p>
          <ul className="tags" aria-label="Technologies">
            <li>PyTorch</li>
            <li>GANs</li>
            <li>Computer vision</li>
          </ul>
          <div className="project-links">
            <Link className="text-link" to="/overwater">
              Read case study <span aria-hidden="true">↗</span>
            </Link>
            <a href={paper}>Read dissertation</a>
            <a href="https://github.com/gfa789/finalproject">
              View research code
            </a>
          </div>
        </div>
      </article>
      <div className="project-grid">
        {projects.map((project, index) => (
          <article className="project-card" key={project.title}>
            {index === 0 ? (
              <figure className="project-photo">
                <img
                  src="/projects/dartboard.webp"
                  alt="Sample input scene containing a dartboard"
                  width="960"
                  height="640"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>Sample input / Dartboard detection</figcaption>
              </figure>
            ) : (
              <div
                className="project-illustration illustration-weather"
                aria-label="Forecasting workflow: observations, model, forecast"
              >
                <span className="workflow-label">
                  From observations to forecasts
                </span>
                <div className="weather-lines" aria-hidden="true">
                  <svg viewBox="0 0 500 130" fill="none">
                    <path
                      d="M0 96 Q35 100 65 70 T130 80 T195 35 T260 65 T325 38 T390 25 T455 40 T520 15"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M0 115 Q35 118 65 95 T130 105 T195 65 T260 85 T325 68 T390 55 T455 65 T520 45"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeDasharray="5 6"
                    />
                  </svg>
                </div>
                <div className="workflow-steps">
                  <span>Observations</span>
                  <span aria-hidden="true">→</span>
                  <span>Model</span>
                  <span aria-hidden="true">→</span>
                  <span>Forecast</span>
                </div>
                <span className="workflow-note">Illustrated workflow</span>
              </div>
            )}
            <div className="project-card-copy">
              <p className="eyebrow">
                {project.date} /{" "}
                {index === 0 ? "Computer vision" : "Applied machine learning"}
              </p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <ul className="tags" aria-label="Technologies">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <a className="text-link" href={project.href}>
                {project.label} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        ))}
      </div>
      <details className="project-archive">
        <summary>
          More projects <span className="archive-count">03</span>
        </summary>
        <div className="archive-grid">
          {archive.map((project) => (
            <article key={project.title}>
              {project.title === "Stereo vision" && (
                <img
                  className="archive-preview"
                  src="/projects/stereo.webp"
                  alt="Epipolar lines over a stereo vision scene from the coursework"
                  width="640"
                  height="480"
                  loading="lazy"
                  decoding="async"
                />
              )}
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              {project.href && (
                <a className="text-link" href={project.href}>
                  {project.label} <span aria-hidden="true">↗</span>
                </a>
              )}
            </article>
          ))}
        </div>
      </details>
    </section>
  );
}
