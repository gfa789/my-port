import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projectRoutes } from "../../projectRoutes";
import useScrollHidden from "../../components/Navbar/useScrollHidden";
import { studies } from "./studies";
import "./ProjectStudy.css";

export default function ProjectStudy({
  id,
  demo,
  heroVisual,
  approach,
  approachLink = "Read the approach",
}) {
  const hidden = useScrollHidden();
  const study = studies[id];
  const backToProjects = "/?project=" + id + "#projects";
  const projects = Object.keys(projectRoutes);
  const index = projects.indexOf(id);
  const previous = projects[(index + projects.length - 1) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <div className="case-study" data-theme={id}>
      <header className="case-bar" data-scroll-hidden={hidden}>
        <nav className="case-shell" aria-label="Project navigation">
          <Link to={backToProjects}>
            <ArrowLeft size={17} aria-hidden="true" /> Back to projects
          </Link>
          <Link to="/">George Atkinson</Link>
        </nav>
      </header>
      <main id="main-content" tabIndex={-1}>
        <section className="case-shell case-hero" aria-labelledby="case-title">
          <div className="case-intro">
            <div className="case-title-bar">
              <p className="case-context">{study.context}</p>
              <nav className="case-arrows" aria-label="Browse project pages">
                <Link
                  to={projectRoutes[previous]}
                  aria-label={`Previous project: ${studies[previous].title}`}
                  title={studies[previous].title}
                >
                  <ArrowLeft size={17} aria-hidden="true" />
                </Link>
                <span aria-hidden="true">
                  0{index + 1} / 0{projects.length}
                </span>
                <Link
                  to={projectRoutes[next]}
                  aria-label={`Next project: ${studies[next].title}`}
                  title={studies[next].title}
                >
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </nav>
            </div>
            <h1 id="case-title">{study.title}</h1>
            <p className="case-summary">{study.intro}</p>
            <a className="case-jump" href="#approach">
              {approachLink} <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
          {heroVisual}
        </section>
        {demo && (
          <section className="case-demo" aria-labelledby="demo-title">
            <header className="case-shell case-demo-header">
              <h2 id="demo-title">{study.demo}</h2>
              <p>{study.guide}</p>
            </header>
            {demo}
          </section>
        )}
        {approach ?? (
          <section
            className="case-shell case-approach"
            id="approach"
            aria-labelledby="approach-title"
          >
            <h2 id="approach-title">The approach</h2>
            <div className="case-notes">
              {study.sections.map(([title, content]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{content}</p>
                </article>
              ))}
            </div>
            <div className="case-sources">
              {study.sources.map(([label, url]) => (
                <a key={url} href={url}>
                  {label} <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </section>
        )}
      </main>
      <footer className="case-shell case-footer">
        <Link to={backToProjects}>
          <ArrowLeft size={17} aria-hidden="true" /> Back to projects
        </Link>
        <Link to={projectRoutes[next]}>
          Next project · {studies[next].title}{" "}
          <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </footer>
    </div>
  );
}
