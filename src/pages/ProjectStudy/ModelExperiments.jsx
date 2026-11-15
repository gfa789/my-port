const observations = [
  [-1.6, -0.8],
  [1.5, 1.2],
  [-0.8, -0.21],
  [0.85, 0.55],
  [0.1, 0.46],
  [1.2, 0.9],
  [-1.25, -0.34],
  [0.45, 0.08],
];
const samples = Array.from({ length: 37 }, (_, i) => -2 + i / 9);
const sx = (x) => 28 + (x + 2) * 80;
const sy = (y) => 84 - y * 23;

function posterior(progress) {
  const count = progress * observations.length;
  const noisePrecision = 6;
  let a = 1,
    b = 0,
    d = 1,
    u = 0,
    v = 0;
  observations.forEach(([x, y], i) => {
    const weight = Math.max(0, Math.min(1, count - i)) * noisePrecision;
    a += weight;
    b += weight * x;
    d += weight * x * x;
    u += weight * y;
    v += weight * x * y;
  });
  const det = a * d - b * b;
  return samples.map((x) => {
    const mean = ((d - x * b) * u + (x * a - b) * v) / det;
    const width = 1.96 * Math.sqrt((d - 2 * x * b + x * x * a) / det);
    return { x, mean, width };
  });
}

export function BayesianFit({ progress }) {
  const fit = posterior(progress);
  const line = (fn, values = fit) =>
    values
      .map(({ x, mean, width }) => `${sx(x)},${sy(fn(mean, width))}`)
      .join(" ");
  const band = `${line((m, w) => m + w)} ${line((m, w) => m - w, [...fit].reverse())}`;
  return (
    <section
      className="model-experiment"
      aria-label="Bayesian regression teaching example"
    >
      <div className="exhibit-readout">
        <span>Bayesian fit · toy data</span>
        <strong>{Math.floor(progress * 8 + 0.001)} observations</strong>
      </div>
      <svg
        className="exhibit-svg bayes-plot"
        viewBox="0 0 376 170"
        role="img"
        aria-label="Bayesian fitted mean and its 95 percent credible band"
      >
        <path className="demo-grid" d="M28 20V150H348 M28 84H348" fill="none" />
        <polygon points={band} fill="var(--case-second)" opacity=".22" />
        <polyline
          points={line((mean) => mean)}
          className="exhibit-trace"
          stroke="var(--case-accent)"
        />
        {observations.map(([x, y], i) => (
          <circle
            key={x}
            cx={sx(x)}
            cy={sy(y)}
            r="4"
            fill="var(--case-ink)"
            opacity={Math.max(0, Math.min(1, progress * 8 - i))}
          />
        ))}
      </svg>
      <p className="model-footnote">Shading: 95% credible band for the mean</p>
    </section>
  );
}
