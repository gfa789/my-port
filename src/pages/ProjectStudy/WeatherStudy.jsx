import { ArrowUpRight } from "lucide-react";
import InteractiveFigure from "./InteractiveFigure";
import ProjectStudy from "./ProjectStudy";
import WeatherDemo from "./WeatherDemo";
import WeatherCityPlot from "./WeatherCityPlot";
import { studies } from "./studies";
import "./WeatherStudy.css";

const id = "weather-forecasting";
const study = studies[id];
const [reportLabel, reportUrl] = study.sources[0];
// Forecast scores are from Table 4 of the group report.
const rollingBaseline = ["Rolling baseline", 1.59];
const forecastResults = [
  [
    "Trained models",
    [
      ["LSTM recurrent network", 1.32],
      ["Multilayer perceptron", 1.74],
      ["Random forest", 1.78],
    ],
  ],
  [
    "Baselines",
    [rollingBaseline, ["Previous day", 3.45], ["Historical average", 4.09]],
  ],
];

const ticks = [0, 1, 2, 3, 4, 5];
const maxError = ticks[ticks.length - 1];

function ForecastComparison() {
  return (
    <div className="weather-comparison" id="approach">
      <div className="weather-comparison-heading">
        <h2>Six ways to forecast</h2>
        <p>Mean absolute error on the test set (°C) · lower is better</p>
      </div>
      <div className="weather-comparison-plot">
        {forecastResults.map(([group, rows]) => (
          <div className="weather-bar-group" key={group}>
            <h3>{group}</h3>
            <div className="weather-score-plot">
              <dl className="weather-forecast-bars">
                {rows.map(([model, score]) => (
                  <div key={model} style={{ "--score": score / maxError }}>
                    <dt>{model}</dt>
                    <dd>{score.toFixed(2)}</dd>
                  </div>
                ))}
              </dl>
              <div className="weather-score-axis" aria-hidden="true">
                {ticks.map((tick) => (
                  <span key={tick}>{tick}</span>
                ))}
              </div>
              <div
                className="weather-baseline-guide"
                aria-hidden="true"
                style={{ left: `${(rollingBaseline[1] / maxError) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="weather-baseline-label">Dotted line · rolling baseline</p>
      <div className="weather-method">
        {study.sections.map(([title, content], index) => (
          <article key={title} id={`exhibit-${index + 1}`}>
            <h3>{title}</h3>
            <p>{content}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function MissingTemperature() {
  return (
    <section
      className="case-shell weather-missing"
      aria-labelledby="missing-title"
    >
      <div className="weather-missing-copy">
        <h2 id="missing-title">When the temperature is missing</h2>
        <p>
          We trained a separate multilayer perceptron to estimate the
          temperature at the same hour from wind, rainfall, location and time.
          One model covered all 12 locations, and the test set included readings
          sampled from each.
        </p>
        <p>
          As the same years sweep across all three charts, teal predictions
          appear over the observed readings. Watch where the model follows the
          seasonal swings but misses the hottest or coldest readings. Each city
          uses its own temperature scale.
        </p>
        <p className="weather-missing-score">
          <strong>0.924</strong> <span>R² across all 12 locations</span>
        </p>
        <p>
          Churchill had a larger error in degrees, but a smaller error relative
          to its temperature range than Cape Town (5.43% vs 6.72%).
        </p>
        <a className="weather-report" href={reportUrl}>
          {reportLabel} <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
      <figure
        className="weather-city-figure"
        aria-labelledby="weather-city-title"
      >
        <h3 id="weather-city-title">Predicted vs actual temperature</h3>
        <WeatherCityPlot />
      </figure>
    </section>
  );
}

export default function WeatherStudy() {
  return (
    <ProjectStudy
      id={id}
      approachLink="Compare the models"
      heroVisual={
        <>
          <InteractiveFigure
            label="Forecast window"
            start={0.35}
            duration={3400}
          >
            {(step) => <WeatherDemo step={step} />}
          </InteractiveFigure>
          <ForecastComparison />
        </>
      }
      approach={<MissingTemperature />}
    />
  );
}
