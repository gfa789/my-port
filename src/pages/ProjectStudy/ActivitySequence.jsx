import { useId } from "react";

const activities = [
  { label: "Lying down", average: 0.16 },
  { label: "Sit on bed", average: 0.39 },
  { label: "Sit on chair", average: 0.62 },
  { label: "Walking", average: 0.86 },
];
const readings = [
  0.16, 0.19, 0.13, 0.18, 0.15, 0.38, 0.41, 0.38, 0.35, 0.36, 0.76, 0.37, 0.4,
  0.41, 0.39, 0.59, 0.63, 0.6, 0.65, 0.63, 0.83, 0.88, 0.78, 0.91, 0.85,
];
const spike = 10;
const axesStart = 164;
const axesEnd = 738;
const x = (index) =>
  axesStart + (index * (axesEnd - axesStart)) / (readings.length - 1);
const sensorY = (reading) => 108 - reading * 78;
const activityY = (index) => 148 + index * 28;

function emissionScore(reading, state) {
  return -0.5 * ((reading - activities[state].average) / 0.14) ** 2;
}

function bestIndex(scores) {
  return scores.indexOf(Math.max(...scores));
}

// Viterbi: track the highest-scoring path ending in each possible state.
const paths = [];
let scores = activities.map((_, state) => emissionScore(readings[0], state));
readings.forEach((reading, index) => {
  if (index > 0) {
    const choices = activities.map((_, state) => {
      const candidates = scores.map(
        (score, previous) => score + Math.log(state === previous ? 0.94 : 0.02),
      );
      return bestIndex(candidates);
    });
    paths.push(choices);
    scores = choices.map(
      (previous, state) =>
        scores[previous] +
        Math.log(state === previous ? 0.94 : 0.02) +
        emissionScore(reading, state),
    );
  }
});

const decoded = [bestIndex(scores)];
for (let i = paths.length - 1; i >= 0; i--) {
  decoded.unshift(paths[i][decoded[0]]);
}

const signal = readings
  .map((reading, index) => `${x(index)},${sensorY(reading)}`)
  .join(" ");
const activityPath = decoded.reduce(
  (path, state, index) =>
    index === 0
      ? `M${x(0)} ${activityY(state)}`
      : `${path} H${x(index)} V${activityY(state)}`,
  "",
);

export default function ActivitySequence({ progress }) {
  const clipId = useId();
  const position = progress * (readings.length - 1);
  const cursor = x(position);
  const current = decoded[Math.floor(position)];

  return (
    <div className="activity-sequence">
      <div className="exhibit-readout">
        <span>Simulated sensor sequence</span>
        <strong>{activities[current].label}</strong>
      </div>
      <svg
        className="exhibit-svg activity-chart"
        viewBox="0 0 760 268"
        role="img"
        aria-label="A sensor trace above four activity lanes. The decoded sequence stays on the bed through a brief spike, then moves to the chair and walking."
      >
        <defs>
          <clipPath id={clipId}>
            <rect x="0" y="0" width={cursor + 1} height="268" />
          </clipPath>
        </defs>
        <text x="0" y="18">
          Sensor
        </text>
        <text x="0" y="36">
          reading
        </text>
        <path className="demo-grid" d={`M${axesStart} 108H${axesEnd}`} />
        <polyline points={signal} className="exhibit-trace activity-preview" />

        {activities.map(({ label }, index) => (
          <g key={label}>
            <text x="0" y={activityY(index) + 4}>
              {label}
            </text>
            <line
              x1={axesStart}
              x2={axesEnd}
              y1={activityY(index)}
              y2={activityY(index)}
              className="demo-grid"
            />
          </g>
        ))}
        <path d={activityPath} className="exhibit-trace activity-preview" />
        <g clipPath={`url(#${clipId})`}>
          <polyline
            points={signal}
            className="exhibit-trace"
            stroke="var(--case-ink)"
          />
          <circle
            cx={x(spike)}
            cy={sensorY(readings[spike])}
            r="5"
            fill="var(--case-accent)"
          />
          <path
            d={activityPath}
            className="exhibit-trace"
            stroke="var(--case-accent)"
          />
        </g>
        <line
          x1={cursor}
          x2={cursor}
          y1="18"
          y2="243"
          className="activity-cursor"
        />
        <text x={axesEnd} y="261" textAnchor="end">
          Time →
        </text>
      </svg>
    </div>
  );
}
