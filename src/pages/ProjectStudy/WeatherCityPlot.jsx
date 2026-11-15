import InteractiveFigure from "./InteractiveFigure";

// Tick positions and point layers come from figures 18–20 of the report.
const weatherCities = [
  {
    id: "churchill",
    name: "Churchill",
    ticks: [
      [30, 75],
      [10, 176],
      [-10, 277],
      [-30, 378],
      [-50, 478],
    ],
  },
  {
    id: "marseille",
    name: "Marseille",
    ticks: [
      [30, 32],
      [20, 172],
      [10, 313],
      [0, 453],
    ],
  },
  {
    id: "cape-town",
    name: "Cape Town",
    ticks: [
      [22.5, 70],
      [17.5, 179],
      [12.5, 288],
      [7.5, 397],
    ],
  },
];

function CityChart({ city, date, nearEnd }) {
  return (
    <div className="weather-city-panel">
      <div className="weather-city-label">
        <h4>{city.name}</h4>
        <a
          href={`/projects/weather-actual-vs-predicted-${city.id}.webp`}
          aria-label={`Original plot for ${city.name}`}
        >
          Original
        </a>
      </div>
      <div
        className="weather-city-plot"
        role="img"
        aria-label={`${city.name}: observed and predicted temperatures over four decades. The predictions track seasonal swings and tend to miss the extremes.`}
      >
        {city.ticks.map(([temperature, pixel]) => (
          <div
            className="weather-city-tick"
            key={temperature}
            style={{ top: `${((pixel - 31) / 454) * 100}%` }}
          >
            <span>{temperature}°</span>
          </div>
        ))}
        <div className="weather-city-series" aria-hidden="true">
          <img
            alt=""
            draggable={false}
            loading="lazy"
            src={`/projects/weather-points-${city.id}-actual.webp`}
          />
          <img
            alt=""
            draggable={false}
            loading="lazy"
            className="weather-prediction-layer"
            src={`/projects/weather-points-${city.id}-predicted.webp`}
          />
        </div>
        <div className="weather-city-cursor" aria-hidden="true">
          <span data-end={nearEnd}>{date}</span>
        </div>
      </div>
      <div className="weather-city-years" aria-hidden="true">
        {[1980, 1990, 2000, 2010, 2020].map((year) => (
          <span key={year}>{year}</span>
        ))}
      </div>
    </div>
  );
}

function TemperatureSweep({ step }) {
  const date = Math.floor(1980 + step * 40);

  return (
    <>
      <div className="weather-sweep-key">
        <span>Observed</span>
        <span>Predicted</span>
      </div>
      <div
        className="weather-city-sweep"
        style={{ "--scan": `${step * 100}%` }}
      >
        {weatherCities.map((city) => (
          <CityChart
            key={city.id}
            city={city}
            date={date}
            nearEnd={step > 0.82}
          />
        ))}
      </div>
    </>
  );
}

export default function WeatherCityPlot() {
  return (
    <InteractiveFigure
      label="Temperature playback for Churchill, Marseille and Cape Town"
      start={0.22}
      duration={3800}
    >
      {(step) => <TemperatureSweep step={step} />}
    </InteractiveFigure>
  );
}
