import data from "./dart-example.json";
import { clampProgress, DemoPanel } from "./DemoControls";

const reference = { x: 407, y: 0, width: 224, height: 240 };
const candidate = { x: 451, y: 42, width: 128, height: 137 };
const iou = (
  (candidate.width * candidate.height) /
  (reference.width * reference.height)
).toFixed(2);
const voteY = (rho) => ((rho - data.low) / (data.high - data.low)) * 178;
const lineColors = ["var(--case-accent)", "var(--case-second)"];

const houghTrace = Array.from({ length: 181 }, (_, angle) => {
  const radians = (angle * Math.PI) / 180;
  const rho =
    data.center[0] * Math.cos(radians) + data.center[1] * Math.sin(radians);
  return `${angle},${voteY(rho)}`;
}).join(" ");

export default function DartDemo({ step }) {
  const edgeOpacity = clampProgress(1 - Math.abs(step - 1));
  const voteOpacity = clampProgress(step - 1);
  const resultOpacity = clampProgress(step - 2);
  return (
    <div className="dart-exhibit">
      <div className="exhibit-readout">
        <span>Coursework photograph</span>
        <strong>ρ = x cos θ + y sin θ</strong>
      </div>
      <div className="demo-split">
        <DemoPanel title="Image space">
          <svg
            className="demo-drag"
            viewBox="0 0 640 426"
            role="img"
            aria-label="Dartboard coursework photo with edge and candidate overlays"
          >
            <image
              href="/projects/dartboard-source.jpg"
              width="640"
              height="426"
            />
            <image
              href="/projects/dartboard-edges.webp"
              width="640"
              height="426"
              opacity={edgeOpacity}
            />
            {data.lines.map(({ line: [x1, y1, x2, y2] }, i) => (
              <line
                key={i}
                {...{ x1, y1, x2, y2 }}
                stroke={lineColors[i]}
                strokeWidth="4"
                opacity={voteOpacity * (1 - resultOpacity * 0.45)}
              />
            ))}
            <circle
              cx={data.center[0]}
              cy={data.center[1]}
              r="6"
              fill="var(--case-ink)"
              opacity={voteOpacity}
            />
            <g opacity={resultOpacity} fill="none" strokeWidth="4">
              <rect
                {...reference}
                stroke="var(--case-second)"
                strokeDasharray="10 6"
              />
              <rect {...candidate} stroke="var(--case-accent)" />
              <circle
                cx={data.center[0]}
                cy={data.center[1]}
                r="10"
                stroke="var(--case-accent)"
              />
            </g>
          </svg>
        </DemoPanel>
        <DemoPanel title="Hough space" detail="Angle × distance">
          <svg
            className="demo-drag"
            viewBox="0 0 180 178"
            role="img"
            aria-label="Hough accumulator with the corresponding coloured vote peaks"
          >
            <image
              href="/projects/dartboard-votes.webp"
              width="180"
              height="178"
              preserveAspectRatio="none"
              opacity={0.15 + voteOpacity * 0.85}
            />
            <polyline
              points={houghTrace}
              pathLength="100"
              fill="none"
              stroke="var(--case-ink)"
              strokeWidth=".85"
              strokeDasharray="100"
              strokeDashoffset={100 * (1 - voteOpacity)}
              opacity={voteOpacity * 0.7}
            />
            {data.lines.map((line, i) => (
              <circle
                key={i}
                cx={line.theta}
                cy={voteY(line.rho)}
                r="5"
                stroke={lineColors[i]}
                fill="none"
                strokeWidth="1.3"
                opacity={voteOpacity}
              />
            ))}
          </svg>
        </DemoPanel>
      </div>
      <div className="exhibit-readout">
        <span>Solid: candidate · Dashed: reference</span>
        <strong>
          {resultOpacity > 0.8 ? `IoU ${iou} < 0.50` : "Box check pending"}
        </strong>
      </div>
    </div>
  );
}
