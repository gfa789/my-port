import React from "react";
import ModelDiagram from "./ModelDiagram";
import OverWaterContact from "./OverWaterContact";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import VideoComparison from "./VideoComparison";

const OverWater = () => {
  return (
    <div className="overwater-page">
      {/* Rest of the content */}
      <Navbar className="bg-transparent relative z-10" />
      <main id="main-content" tabIndex={-1}>
        <div className="shell">
          <a className="text-link back-link" href="/">
            ← Back to portfolio
          </a>
        </div>
        <ModelDiagram />
        <section
          className="container mx-auto max-w-3xl px-6 py-12 text-white space-y-5"
          aria-labelledby="research-heading"
        >
          <h2 id="research-heading" className="text-3xl font-bold">
            Underwater image enhancement with deep learning
          </h2>
          <p>
            OverWater is my University of Bristol computer science dissertation
            project, completed in 2024. It explores how generative adversarial
            networks (GANs) can enhance underwater imagery using PyTorch.
          </p>
          <h3 className="text-xl font-semibold">The problem</h3>
          <p>
            Underwater scenes can lose colour and clarity. This project
            investigates learned image enhancement, using visual comparisons to
            show how model outputs differ from the original footage.
          </p>
          <h3 className="text-xl font-semibold">My contribution</h3>
          <p>
            I created a dataset and researched deep learning approaches for
            underwater image enhancement. The examples below show original and
            enhanced footage; the dissertation contains the methodology and
            evaluation.
          </p>
          <h3 className="text-xl font-semibold">Evaluation and limitations</h3>
          <p>
            These examples illustrate visual changes rather than proving
            accuracy or generalisation. Enhanced colours are model outputs, not
            a reconstruction of known ground-truth colours. Read the
            dissertation for the evaluation, assumptions and limitations.
          </p>
        </section>
        <VideoComparison />
        <OverWaterContact />
      </main>
      <Footer className="bg-transparent relative z-10" />
    </div>
  );
};

export default OverWater;
