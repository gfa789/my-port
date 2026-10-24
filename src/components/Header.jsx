import { Link } from "react-router-dom";
export default function Header() {
  return (
    <section id="home" className="hero shell" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">George Atkinson / Software engineer</p>
        <h1 id="hero-title">
          Thoughtful software.
          <br />
          <em>From end to end.</em>
        </h1>
        <p className="hero-description">
          I build across the full stack in reference data technology, from
          system design to independent delivery.
        </p>
        <p className="hero-detail">
          Currently at Neptune North. Working with .NET, Python, React and SQL.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" to="/#projects">
            Explore my work <span aria-hidden="true">↓</span>
          </Link>
          <Link className="text-link" to="/#contact">
            Get in touch <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
      <figure className="hero-portrait">
        <img
          src="/photos/head.jpg"
          alt="George Atkinson at his University of Bristol graduation"
          width="640"
          height="760"
          fetchpriority="high"
        />
        <figcaption>
          <span>Engineer. Curious by nature.</span>
          <span>01 / Introduction</span>
        </figcaption>
      </figure>
    </section>
  );
}
