import { Link } from "react-router-dom";
import ModelDiagram from "./ModelDiagram";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import Contact from "../../components/Contact";
import VideoComparison from "./VideoComparison";
const paper =
  "https://drive.google.com/file/d/1n85HyTZDCYAQlW12iAW1lgoUPREGd93h/view";
export default function OverWater() {
  return (
    <div className="overwater-page">
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <section
          className="overwater-hero shell"
          aria-labelledby="overwater-title"
        >
          <Link className="back-link" to="/">
            ← Back to portfolio
          </Link>
          <div className="overwater-intro">
            <div>
              <p className="eyebrow">
                Research project / University of Bristol / 2024
              </p>
              <h1 id="overwater-title">
                Over<em>Water.</em>
              </h1>
              <p className="overwater-tagline">
                A clearer picture of what lies beneath.
              </p>
            </div>
            <div className="overwater-summary">
              <p>
                Exploring underwater image enhancement with generative
                adversarial networks. My dissertation in computer science, built
                with PyTorch.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#examples-title">
                  Explore the results <span aria-hidden="true">↓</span>
                </a>
                <a className="text-link" href={paper}>
                  Read dissertation <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
          <ModelDiagram />
          <dl className="project-facts">
            <div>
              <dt>My role</dt>
              <dd>Research & development</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Underwater image enhancement</dd>
            </div>
            <div>
              <dt>Tools</dt>
              <dd>Python · PyTorch · GANs</dd>
            </div>
            <div>
              <dt>Context</dt>
              <dd>BSc dissertation, 2024</dd>
            </div>
          </dl>
        </section>
        <section
          className="research-section section shell"
          aria-labelledby="research-heading"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / The research</p>
              <h2 id="research-heading">
                Making sense of
                <br />
                <em>murky waters.</em>
              </h2>
            </div>
            <p>
              Underwater scenes can lose colour and clarity. This project
              explores a learned approach to enhancement.
            </p>
          </div>
          <div className="research-grid">
            <article>
              <span className="research-number">01</span>
              <h3>The approach</h3>
              <p>
                I created a dataset and researched deep learning approaches for
                enhancing underwater imagery, working with generative
                adversarial networks in PyTorch.
              </p>
            </article>
            <article>
              <span className="research-number">02</span>
              <h3>The evaluation</h3>
              <p>
                The comparisons below show changes between original and enhanced
                footage. The dissertation documents the methodology, experiments
                and evaluation.
              </p>
            </article>
            <article>
              <span className="research-number">03</span>
              <h3>The limitations</h3>
              <p>
                These examples illustrate visual changes rather than proving
                accuracy or generalisation. Enhanced colours are model outputs,
                not known ground-truth colours.
              </p>
            </article>
          </div>
          <a
            className="text-link"
            href="https://github.com/gfa789/finalproject"
          >
            Explore the research code <span aria-hidden="true">↗</span>
          </a>
        </section>
        <VideoComparison />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
