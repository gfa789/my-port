import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import ModelDiagram from "./ModelDiagram";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import Contact from "../../components/Contact";
import VideoComparison from "./VideoComparison";
const paper =
  "https://drive.google.com/file/d/1n85HyTZDCYAQlW12iAW1lgoUPREGd93h/view";

export function OverWaterContent({ embedded = false }) {
  const ResearchHeading = embedded ? "h3" : "h2";
  const DetailHeading = embedded ? "h4" : "h3";
  return (
    <section
      id="overwater"
      className={
        embedded ? "overwater-page overwater-embedded" : "overwater-content"
      }
      aria-labelledby="overwater-title"
    >
      <div className="water-background" aria-hidden="true" />
      <div className="overwater-hero shell" aria-labelledby="overwater-title">
        {!embedded && (
          <Link className="back-link" to="/">
            ← Back to portfolio
          </Link>
        )}
        <ModelDiagram headingLevel={embedded ? 2 : 1} />
        <p className="water-summary">
          My computer science dissertation exploring underwater image
          enhancement with generative adversarial networks in PyTorch.
        </p>
        <div className="water-actions">
          <a className="button button-soft shine" href="#examples-title">
            See the examples ↓
          </a>
          <a className="button button-soft shine" href={paper}>
            Read the dissertation ↗
          </a>
        </div>
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
      </div>
      <section
        className="research-section section shell"
        aria-labelledby="research-heading"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / The research</p>
            <ResearchHeading id="research-heading">
              About the project
            </ResearchHeading>
          </div>
          <p>
            Underwater scenes can lose colour and clarity. This project explores
            a learned approach to enhancement.
          </p>
        </div>
        <div className="research-grid">
          <article>
            <span className="research-number">01</span>
            <DetailHeading>The approach</DetailHeading>
            <p>
              I created a dataset and researched deep learning approaches for
              enhancing underwater imagery, working with generative adversarial
              networks in PyTorch.
            </p>
          </article>
          <article>
            <span className="research-number">02</span>
            <DetailHeading>The evaluation</DetailHeading>
            <p>
              The comparisons below show changes between original and enhanced
              footage. The dissertation documents the methodology, experiments
              and evaluation.
            </p>
          </article>
          <article>
            <span className="research-number">03</span>
            <DetailHeading>The limitations</DetailHeading>
            <p>
              These examples illustrate visual changes rather than proving
              accuracy or generalisation. Enhanced colours are model outputs,
              not known ground-truth colours.
            </p>
          </article>
        </div>
        <a className="text-link" href="https://github.com/gfa789/finalproject">
          Explore the research code <span aria-hidden="true">↗</span>
        </a>
      </section>
      <VideoComparison headingLevel={embedded ? 3 : 2} />
    </section>
  );
}
export default function OverWater() {
  return (
    <div className="overwater-page standalone-water">
      <Navbar />
      <Sidebar />
      <main id="main-content" tabIndex={-1}>
        <OverWaterContent />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
