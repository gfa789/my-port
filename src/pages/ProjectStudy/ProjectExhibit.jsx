import { ArrowUpRight } from "lucide-react";
import InteractiveFigure from "./InteractiveFigure";
import ModelDemo from "./ModelDemo";
import { studies } from "./studies";
import { exhibits } from "./exhibits";
import "./ProjectExhibit.css";

function ProjectNotes({ sections }) {
  return (
    <div className="exhibit-notes">
      {sections.map(([title, body], index) => (
        <article key={title} id={`exhibit-${index + 1}`}>
          <h3>{title}</h3>
          <p>{body}</p>
        </article>
      ))}
    </div>
  );
}

export default function ProjectExhibit({ id, Visual }) {
  const exhibit = exhibits[id];
  const study = studies[id];
  return (
    <div className="case-demo project-exhibit" id="approach">
      {id === "model-analysis" ? (
        <ModelDemo />
      ) : (
        <section
          className="case-shell exhibit-feature"
          aria-labelledby="demo-title"
        >
          <header className="exhibit-lead">
            <h2 id="demo-title">{exhibit.name}</h2>
            <p>{exhibit.intro}</p>
          </header>
          <InteractiveFigure
            label={exhibit.name}
            end={exhibit.end}
            duration={exhibit.duration}
          >
            {(step) => <Visual step={step} />}
          </InteractiveFigure>
          <ProjectNotes sections={study.sections} />
        </section>
      )}
      <div className="case-shell exhibit-sources case-sources">
        {study.sources.map(([label, url]) => (
          <a key={url} href={url}>
            {label}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  );
}
