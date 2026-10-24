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
      <VideoComparison headingLevel={embedded ? 3 : 2} />
    </section>
  );
}
export default function OverWater() {
  return (
    <div className="overwater-page standalone-water water-theme">
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
