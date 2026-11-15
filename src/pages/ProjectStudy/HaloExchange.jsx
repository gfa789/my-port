import { ArrowLeft, ArrowRight } from "lucide-react";
import InteractiveFigure from "./InteractiveFigure";
import "./HaloExchange.css";

function CellRow({ cells }) {
  return (
    <div className="halo-cells">
      {[...cells].map((cell, index) => (
        <span key={index} data-live={cell === "1"} />
      ))}
    </div>
  );
}

function Exchange({ step }) {
  return (
    <div className="halo-diagram" aria-hidden="true">
      <strong>Worker A</strong>
      <span />
      <strong>Worker B</strong>
      <div>
        <span>Bottom row</span>
        <CellRow cells="01101010" />
      </div>
      <div className="halo-transfer">
        <ArrowRight size={20} />
        <i style={{ left: `${step * 100}%` }} />
      </div>
      <div className="halo-copy">
        <span>Top halo</span>
        <CellRow cells="01101010" />
      </div>
      <div className="halo-copy">
        <span>Bottom halo</span>
        <CellRow cells="10011001" />
      </div>
      <div className="halo-transfer">
        <ArrowLeft size={20} />
        <i style={{ left: `${(1 - step) * 100}%` }} />
      </div>
      <div>
        <span>Top row</span>
        <CellRow cells="10011001" />
      </div>
    </div>
  );
}

export default function HaloExchange() {
  return (
    <section className="halo-exchange" aria-labelledby="halo-title">
      <header className="exhibit-lead">
        <h2 id="halo-title">Halo exchange</h2>
        <p>
          To update their boundary cells, two neighbouring workers can swap just
          their touching rows. A’s bottom row becomes B’s top halo, and B’s top
          row becomes A’s bottom halo. Each halo is a read-only copy from the
          previous generation.
        </p>
      </header>
      <InteractiveFigure label="Halo exchange illustration" duration={2100}>
        {(step) => <Exchange step={step} />}
      </InteractiveFigure>
    </section>
  );
}
