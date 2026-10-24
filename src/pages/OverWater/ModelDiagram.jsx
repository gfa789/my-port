export default function ModelDiagram() {
  return (
    <figure
      className="model-diagram"
      aria-label="Underwater enhancement workflow"
    >
      <div className="model-frames">
        <p>Original frames</p>
        <div>
          {[0, 2, 4].map((index) => (
            <img
              key={index}
              src={`/overwater/${index}.webp`}
              alt=""
              width="256"
              height="256"
              loading="lazy"
            />
          ))}
        </div>
      </div>
      <span className="model-arrow" aria-hidden="true">
        →
      </span>
      <div className="model-node">
        <span>OW</span>
        <span>
          Underwater image
          <br />
          enhancement
        </span>
      </div>
      <span className="model-arrow" aria-hidden="true">
        →
      </span>
      <div className="model-frames">
        <p>Enhanced frames</p>
        <div>
          {[1, 3, 5].map((index) => (
            <img
              key={index}
              src={`/overwater/${index}.webp`}
              alt=""
              width="256"
              height="256"
              loading="lazy"
            />
          ))}
        </div>
      </div>
      <figcaption>
        Original imagery → learned enhancement → model outputs
      </figcaption>
    </figure>
  );
}
