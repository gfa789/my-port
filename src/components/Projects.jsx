import ProjectWheel from "./ProjectWheel";

const projects = [
  {
    id: "overwater",
    title: "Underwater Image Enhancement",
    date: "Jan–May 2024",
    tags: ["PyTorch", "GANs"],
    indexTitle: "OverWater",
    label: "Explore OverWater",
    route: "/overwater",
  },
  {
    id: "weather-forecasting",
    title: "ML for Weather Forecasting",
    indexTitle: "Weather Forecasting",
    date: "Jan–May 2024",
    tags: ["TensorFlow", "Time series"],
    href: "https://drive.google.com/file/d/111cPGMAF14W8wbxG88lhSIKxDMPB1ul9/view",
    label: "Read forecasting report",
  },
  {
    id: "model-analysis",
    title: "ML Model Analysis",
    date: "Nov–Dec 2023",
    tags: ["Python", "scikit-learn"],
    href: "https://github.com/gfa789/ml-cw",
    label: "View model analysis code",
  },
  {
    id: "dartboard-detector",
    title: "Dartboard Detector",
    date: "Nov–Dec 2023",
    tags: ["Computer vision", "YOLO"],
    href: "https://github.com/gfa789/darts-cw/tree/main/Part1",
    label: "View detector code",
  },
  {
    id: "stereo-vision",
    title: "Stereo Vision",
    date: "Nov–Dec 2023",
    tags: ["Python", "Computer vision"],
    href: "https://github.com/gfa789/darts-cw/tree/main/Part2",
    label: "View stereo vision code",
  },
];
export default function Projects() {
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
        <p>Five projects across machine learning and computer vision.</p>
      </div>
      <ProjectWheel projects={projects} />
    </section>
  );
}
