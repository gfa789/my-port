import { useId } from "react";
import { clampProgress } from "./DemoControls";

const temps = Array.from(
  { length: 48 },
  (_, h) =>
    14 +
    4.1 * Math.sin(((h - 8) * Math.PI) / 12) +
    0.6 * Math.sin(h * 0.71) +
    0.055 * h,
);
const mean = (values) => values.reduce((sum, n) => sum + n, 0) / values.length;
const x = (i) => 43 + i * 12;
const y = (value) => 245 - (value - 7) * 12;
const path = (values, start) =>
  values.map((value, i) => `${x(start + i)},${y(value)}`).join(" ");
const interpolate = (a, b, fraction) => a + (b - a) * fraction;
const historyTrace = path(temps, 0);

function forecastAt(origin) {
  const baseline = mean(temps.slice(origin - 5, origin + 1));
  const previous = temps[origin - 24];
  const forecast = Array.from(
    { length: 6 },
    (_, i) =>
      temps[origin] +
      (previous === undefined
        ? ((temps[origin] - temps[origin - 3]) / 3) * (i + 1)
        : temps[origin - 23 + i] - previous),
  );
  return { baseline, forecast };
}

const forecastWindows = Array.from({ length: 21 }, (_, i) =>
  forecastAt(15 + i),
);

export default function WeatherDemo({ step }) {
  const id = useId();
  const position = clampProgress(step);
  const origin = 15 + position * 20;
  const hour = Math.floor(origin);
  const fraction = origin - hour;
  const start = origin - 11;
  const temperature = (offset) =>
    interpolate(temps[hour + offset], temps[hour + offset + 1], fraction);
  const anchor = temperature(0);
  const { baseline, forecast } = forecastWindows[hour - 15];
  const next = forecastWindows[Math.min(hour - 14, 20)];
  const prediction = forecast.map((value, i) =>
    interpolate(value, next.forecast[i], fraction),
  );
  const observed = forecast.map((_, i) => temperature(i + 1));
  const rolling = observed.map(() =>
    interpolate(baseline, next.baseline, fraction),
  );
  const ahead = clampProgress((position - 0.02) / 0.33);
  const score = clampProgress((position - 0.31) / 0.44);
  const errors = [prediction, rolling].map((series) =>
    mean(series.map((value, i) => Math.abs(value - observed[i]))),
  );

  return (
    <div className="weather-visual">
      <div className="weather-chart-heading">
        <div>
          <h2 id="demo-title">Forecast window</h2>
          <p>Illustration using synthetic temperatures</p>
        </div>
        <strong>
          Hour {hour} → {hour + 6}
        </strong>
      </div>
      <svg
        className="exhibit-svg weather-chart"
        viewBox="0 0 640 277"
        role="img"
        aria-label="A rolling forecast window with two predictions, observed values, and vertical prediction errors"
      >
        <defs>
          <clipPath id={`${id}-past`}>
            <rect x="43" y="22" width={x(origin) - 43} height="224" />
          </clipPath>
          <clipPath id={`${id}-input`}>
            <rect x={x(start)} y="22" width="132" height="224" />
          </clipPath>
          <clipPath id={`${id}-forecast`}>
            <rect
              x={x(origin) - 2}
              y="22"
              width={2 + ahead * 74}
              height="224"
            />
          </clipPath>
          <linearGradient id={`${id}-window`}>
            <stop stopColor="var(--case-accent)" stopOpacity=".23" />
            <stop offset="1" stopColor="var(--case-accent)" stopOpacity=".04" />
          </linearGradient>
        </defs>
        <rect
          x={x(start)}
          y="26"
          width={x(origin) - x(start)}
          height="219"
          fill="var(--case-hit)"
        />
        <rect
          x={x(origin)}
          y="26"
          width="72"
          height="219"
          fill={`url(#${id}-window)`}
        />
        {[8, 12, 16, 20, 24].map((temp) => (
          <g key={temp}>
            <path d={`M43 ${y(temp)}H607`} className="demo-grid" />
            <text x="33" y={y(temp) + 5} textAnchor="end">
              {temp}°
            </text>
          </g>
        ))}
        {[0, 12, 24, 36, 47].map((h) => (
          <text key={h} x={x(h)} y="270" textAnchor="middle">
            {h} h
          </text>
        ))}
        <path
          d={`M${x(origin)} 22V245`}
          stroke="var(--case-accent)"
          strokeWidth="1.15"
          vectorEffect="non-scaling-stroke"
        />
        <text x={x(origin) - 7} y="16" textAnchor="end">
          Past readings
        </text>
        <text x={x(origin) + 7} y="16" className="weather-window-label">
          Next 6 hours
        </text>
        <polyline
          points={historyTrace}
          className="exhibit-trace"
          stroke="var(--case-line)"
          clipPath={`url(#${id}-past)`}
        />
        <polyline
          points={historyTrace}
          className="exhibit-trace"
          stroke="var(--case-ink)"
          clipPath={`url(#${id}-input)`}
        />
        <circle
          cx={x(origin)}
          cy={y(anchor)}
          r={7 + score * 4}
          fill="var(--case-accent)"
          opacity=".16"
        />
        <circle cx={x(origin)} cy={y(anchor)} r="3" fill="var(--case-ink)" />
        <g clipPath={`url(#${id}-forecast)`}>
          <polyline
            points={path([anchor, ...prediction], origin)}
            className="exhibit-trace"
            stroke="var(--case-accent)"
          />
          <polyline
            points={path(rolling, origin + 1)}
            className="exhibit-trace"
            stroke="var(--case-second)"
          />
        </g>
        <g opacity={score}>
          {[prediction, rolling].map((series, method) =>
            series.map((value, i) => {
              const column = x(origin + 1 + i) + (method ? 2.5 : -2.5);
              return (
                <line
                  key={`${method}-${i}`}
                  x1={column}
                  x2={column}
                  y1={y(value)}
                  y2={y(interpolate(value, observed[i], score))}
                  stroke={method ? "var(--case-second)" : "var(--case-accent)"}
                  strokeWidth="1.7"
                  opacity=".6"
                />
              );
            }),
          )}
          <polyline
            points={path([anchor, ...observed], origin)}
            className="exhibit-trace"
            stroke="var(--case-ink)"
            strokeDasharray="4 5"
          />
        </g>
      </svg>
      <div className="weather-observed">Observed temperature</div>
      <div className="forecast-readings">
        {["Demo forecast", "Rolling baseline"].map((name, i) => (
          <div key={name}>
            <span>{name}</span>
            <strong>
              {score > 0.5 ? `${errors[i].toFixed(2)} °C MAE` : "— °C MAE"}
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
}
