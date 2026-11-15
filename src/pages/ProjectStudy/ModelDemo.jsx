import data from "./pca-example.json";
import { clampProgress, DemoPanel } from "./DemoControls";
import { BayesianFit } from "./ModelExperiments";
import ActivitySequence from "./ActivitySequence";
import InteractiveFigure from "./InteractiveFigure";

const {
  points,
  variance,
  models,
  zero: [centerX, centerY],
} = data;
const pointMarks = points.map(([x, y, label], i) => (
  <circle
    key={i}
    cx={x}
    cy={y}
    r="2.6"
    fill={label ? "var(--case-second)" : "var(--case-accent)"}
    opacity=".64"
  />
));
const kernels = [
  ["linear", "Linear kernel"],
  ["rbf", "RBF kernel"],
];

function Axis({ vertical, children }) {
  return vertical ? (
    <text x="16" y="168" transform="rotate(-90 16 168)" textAnchor="middle">
      {children}
    </text>
  ) : (
    <text x="337" y="333" textAnchor="middle">
      {children}
    </text>
  );
}

function KernelPlot({ kernel, title, step }) {
  const model = models[kernel];
  return (
    <DemoPanel title={title}>
      <svg
        className="demo-chart demo-drag"
        viewBox="0 0 660 350"
        role="img"
        aria-label={
          title + " decision boundary over the Wisconsin dataset PCA projection"
        }
      >
        {[70, 120, 170, 220, 270].map((line) => (
          <line
            key={line}
            x1="48"
            x2="630"
            y1={line}
            y2={line}
            className="demo-grid"
          />
        ))}
        <line
          x1="48"
          x2="630"
          y1={centerY}
          y2={centerY}
          className="demo-axis"
        />
        <line
          x1={centerX}
          x2={centerX}
          y1="27"
          y2="302"
          className="demo-axis"
        />
        <Axis>PC1 · {variance[0]}% variance</Axis>
        <Axis vertical>PC2 · {variance[1]}%</Axis>
        <g
          className="pca-points"
          style={{
            transformOrigin: `0 ${centerY}px`,
            transform: `scaleY(${0.06 + 0.94 * clampProgress(step)})`,
          }}
        >
          {pointMarks}
        </g>
        {step > 1 && (
          <g opacity={clampProgress(step - 1)} fill="none">
            {[-1, 1].map((level) => (
              <path
                key={level}
                d={model.paths[level]}
                stroke="var(--case-ink)"
                strokeWidth="1"
                strokeDasharray="4 5"
                opacity=".5"
              />
            ))}
            <path
              d={model.paths[0]}
              stroke="var(--case-ink)"
              strokeWidth="2.4"
            />
            {model.support.map((id) => (
              <circle
                key={id}
                cx={points[id][0]}
                cy={points[id][1]}
                r="4.2"
                stroke="var(--case-ink)"
                strokeWidth=".7"
                opacity=".7"
              />
            ))}
          </g>
        )}
      </svg>
    </DemoPanel>
  );
}

function KernelComparison({ step }) {
  const pcaStep = clampProgress(step * 2 + 0.15, 2);
  return (
    <div className="model-exhibit">
      <div className="exhibit-readout">
        <span>Wisconsin dataset · teaching fit</span>
        <strong>PCA / SVM</strong>
      </div>
      <div className="demo-pair">
        {kernels.map(([kernel, title]) => (
          <KernelPlot key={kernel} {...{ kernel, title }} step={pcaStep} />
        ))}
      </div>
      <div className="demo-legend">
        <span>
          <i className="legend-second" /> Benign
        </span>
        <span>
          <i className="legend-accent" /> Malignant
        </span>
        <span>
          <i /> Decision boundary
        </span>
      </div>
    </div>
  );
}

export default function ModelDemo() {
  return (
    <>
      <section
        className="case-shell exhibit-feature model-kernels"
        id="exhibit-1"
        aria-labelledby="demo-title"
      >
        <header className="exhibit-lead">
          <h2 id="demo-title">PCA and kernels</h2>
          <p>
            I standardised 30 Wisconsin breast cancer features, reduced them to
            two principal components and compared how well an SVM classified
            tumours with and without that reduction.
          </p>
        </header>
        <InteractiveFigure
          label="PCA and kernel comparison"
          start={0.6}
          duration={3600}
        >
          {(step) => <KernelComparison step={step} />}
        </InteractiveFigure>
        <div className="model-method" id="exhibit-2">
          <p>
            <strong>Coursework result.</strong> My report records 96.6% accuracy
            for the two-component model and 97.3% with all 30 features. The
            plots compare linear and RBF boundaries fitted for this demo.
          </p>
        </div>
      </section>
      <section
        className="model-sequence"
        id="exhibit-3"
        aria-labelledby="sequence-title"
      >
        <div className="case-shell exhibit-feature">
          <header className="exhibit-lead">
            <h2 id="sequence-title">Activity recognition</h2>
            <p>
              I built a hidden Markov model to label walking, lying down, and
              sitting on a bed or chair from accelerometer and radio readings.
              The model used the order of the readings to infer a sequence of
              activities.
            </p>
          </header>
          <InteractiveFigure
            label="Decoding an activity sequence"
            duration={3900}
          >
            {(step) => <ActivitySequence progress={step} />}
          </InteractiveFigure>
          <div className="model-method">
            <p>
              <strong>Coursework result.</strong> The model reached 92.9%
              accuracy on held-out sensor sequences. In this simplified example,
              the highlighted spike looks like a step on its own. The
              surrounding readings keep the decoded activity at sitting on the
              bed.
            </p>
          </div>
        </div>
      </section>
      <section
        className="case-shell exhibit-feature model-regression"
        id="exhibit-4"
        aria-labelledby="regression-title"
      >
        <header className="exhibit-lead">
          <h2 id="regression-title">Bayesian regression</h2>
          <p>
            I fitted a Bayesian linear model in PyMC to Seoul bike rental counts
            using time of day and weather. I sampled the posterior to estimate
            how each input related to demand and how uncertain those estimates
            were.
          </p>
        </header>
        <InteractiveFigure label="Bayesian regression" duration={3800}>
          {(step) => <BayesianFit progress={step} />}
        </InteractiveFigure>
        <div className="model-method">
          <p>
            <strong>Coursework result.</strong> The fitted model associated
            warmer temperatures with more rentals and rain with fewer. The
            remaining error was high, so I judged the linear model a poor fit
            for predicting demand. This plot uses synthetic data to show how
            observations update the fit.
          </p>
        </div>
      </section>
    </>
  );
}
