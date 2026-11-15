import { clampProgress, DemoPanel } from "./DemoControls";

const spheres = [
  [-1.35, 0.36, 5.1, 0.48],
  [0.12, -0.6, 6.2, 0.56],
  [1.31, 0.51, 7.2, 0.64],
];
const cameras = [
  [-1.17, 0, 0],
  [1.17, 0, 0],
];
const perturbation = [
  [5, -3],
  [-4, 4],
  [5, 3],
];
const f = 170;
const project = ([x, y, z], [cameraX]) => [
  135 + ((x - cameraX) * f) / z,
  86 + (y * f) / z,
];
const dot = (a, b) => a.reduce((sum, value, i) => sum + value * b[i], 0);
const subtract = (a, b) => a.map((value, i) => value - b[i]);
const add = (a, b) => a.map((value, i) => value + b[i]);
const scale = (v, factor) => v.map((value) => value * factor);

function solve(a, b) {
  const rays = [a, b].map(([x, y]) => [(x - 135) / f, (y - 86) / f, 1]);
  const [u, v] = rays;
  const w = subtract(cameras[0], cameras[1]);
  const uu = dot(u, u),
    uv = dot(u, v),
    vv = dot(v, v),
    uw = dot(u, w),
    vw = dot(v, w);
  const denominator = uu * vv - uv * uv;
  const ends = [
    add(cameras[0], scale(u, (uv * vw - vv * uw) / denominator)),
    add(cameras[1], scale(v, (uu * vw - uv * uw) / denominator)),
  ];
  return { ends, center: scale(add(...ends), 0.5) };
}

function CameraImage({ side, points, line, lineOpacity }) {
  return (
    <figure>
      <figcaption>Camera {side === 0 ? "A" : "B"}</figcaption>
      <svg
        viewBox="0 0 270 172"
        role="img"
        aria-label={"Projected spheres in camera " + (side === 0 ? "A" : "B")}
      >
        <path className="demo-grid" d="M20 86h230 M135 18v136" />
        <path
          className="demo-axis stereo-frame-marks"
          d="M30 22h-14v14 M240 22h14v14 M16 136v14h14 M254 136v14h-14"
        />
        {lineOpacity > 0 && (
          <path
            className="demo-strong"
            opacity={lineOpacity}
            d={`M0 ${line}h270`}
            strokeDasharray="5 5"
          />
        )}
        {points.map(([x, y], i) => (
          <g
            key={i}
            stroke={
              i === 0
                ? side === 0
                  ? "var(--case-accent)"
                  : "var(--case-second)"
                : "var(--case-line)"
            }
            fill="var(--case-panel)"
          >
            <circle
              cx={x}
              cy={y}
              r={(spheres[i][3] * f) / spheres[i][2]}
              strokeWidth={i === 0 ? 2.5 : 1.2}
            />
            <circle cx={x} cy={y} r="2.2" fill="currentColor" />
          </g>
        ))}
      </svg>
    </figure>
  );
}

function Orbit({ angle, ends, center, target, reveal }) {
  const radians = (angle * Math.PI) / 180;
  const view = ([x, y, z]) => {
    const centeredZ = z - 3.9;
    const rotatedX = x * Math.cos(radians) + centeredZ * Math.sin(radians);
    const rotatedZ = centeredZ * Math.cos(radians) - x * Math.sin(radians);
    const depth = 13.5 - rotatedZ * 0.7;
    const perspective = 13.5 / depth;
    return [
      320 + rotatedX * 57 * perspective,
      143 + (y * 55 + rotatedZ * 23) * perspective,
    ];
  };
  const lines = Array.from({ length: 8 }, (_, i) => [
    [view([-3.5, 1.18, i]), view([3.5, 1.18, i])],
    [view([i - 3.5, 1.18, 0]), view([i - 3.5, 1.18, 7])],
  ]).flat();
  const [px, py] = view(center);
  const [tx, ty] = view(target);
  const resultOpacity = clampProgress((reveal - 0.7) / 0.3);
  return (
    <svg
      className="demo-chart stereo-orbit"
      viewBox="0 0 640 300"
      role="img"
      aria-label="Orbit view of both camera rays, their triangulated point and the simulated ground truth"
    >
      {lines.map(([[x1, y1], [x2, y2]], i) => (
        <line key={i} className="demo-grid" {...{ x1, y1, x2, y2 }} />
      ))}
      {spheres.map(([x, y, z, r], i) => (
        <circle
          key={i}
          cx={view([x, y, z])[0]}
          cy={view([x, y, z])[1]}
          r={r * 29}
          stroke="var(--case-line)"
          fill="var(--case-hit)"
          opacity=".65"
        />
      ))}
      {cameras.map((camera, i) => {
        const [x1, y1] = view(camera);
        const rayTip = add(camera, scale(subtract(ends[i], camera), reveal));
        const [x2, y2] = view(rayTip);
        const color = i === 0 ? "var(--case-accent)" : "var(--case-second)";
        return (
          <g key={i}>
            <line {...{ x1, y1, x2, y2 }} stroke={color} strokeWidth="2.2" />
            <circle cx={x1} cy={y1} r="7" fill={color} />
            <text x={x1} y={y1 - 13} textAnchor="middle">
              {i === 0 ? "A" : "B"}
            </text>
          </g>
        );
      })}
      {resultOpacity > 0 && (
        <g opacity={resultOpacity}>
          <line
            x1={view(ends[0])[0]}
            y1={view(ends[0])[1]}
            x2={view(ends[1])[0]}
            y2={view(ends[1])[1]}
            stroke="var(--case-ink)"
            strokeWidth="2"
          />
          <line
            x1={px}
            y1={py}
            x2={tx}
            y2={ty}
            stroke="var(--case-second)"
            strokeDasharray="2 4"
          />
          <circle
            cx={tx}
            cy={ty}
            r="11"
            fill="none"
            stroke="var(--case-second)"
            strokeWidth="2"
          />
        </g>
      )}
      <circle
        cx={px}
        cy={py}
        r="5"
        fill="var(--case-ink)"
        opacity={resultOpacity}
      />
    </svg>
  );
}

const a = spheres.map((sphere) => project(sphere, cameras[0]));
const b = spheres.map((sphere, i) =>
  add(project(sphere, cameras[1]), perturbation[i]),
);
const target = spheres[0].slice(0, 3);
const { ends, center } = solve(a[0], b[0]);
const distance = Math.hypot(...subtract(center, target)).toFixed(2);

export default function StereoDemo({ step: phase }) {
  const reveal = clampProgress((phase - 1.14) / 0.78);
  const sceneAngle = -16 + 47 * reveal + Math.max(0, phase - 2) * 64 * reveal;

  return (
    <div className="stereo-exhibit">
      <div className="exhibit-readout">
        <span>Simulated camera rig</span>
        <strong>
          {phase > 3
            ? `Centre error · ${distance} units`
            : "Camera A + Camera B"}
        </strong>
      </div>
      <DemoPanel title="Camera projections">
        <div className="demo-split stereo-views">
          <CameraImage side={0} points={a} lineOpacity={0} />
          <CameraImage
            side={1}
            points={b}
            line={a[0][1]}
            lineOpacity={clampProgress((phase - 0.35) / 0.55)}
          />
        </div>
      </DemoPanel>
      <DemoPanel title="3D reconstruction">
        <Orbit angle={sceneAngle} {...{ ends, center, target, reveal }} />
      </DemoPanel>
      <div className="exhibit-readout">
        <span>Dot: estimate · Ring: simulated centre</span>
        <strong>Closest approach</strong>
      </div>
    </div>
  );
}
