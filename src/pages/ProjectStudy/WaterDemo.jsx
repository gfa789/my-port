import { DemoPanel, GestureHint, useDemoProgress } from "./DemoControls";

const sampleRate = 24;
const samples = 192;
const sources = [
  ["original", "Original"],
  ["enhanced", "Enhanced"],
];

export default function WaterDemo() {
  const progress = useDemoProgress(samples - 1, 4600);
  const frame = Math.round(progress.step);
  const time = (frame / sampleRate).toFixed(1);
  const revealed = ((frame + 1) / samples) * 100;
  const framePosition = `${((frame % 16) / 15) * 100}% ${(Math.floor(frame / 16) / 11) * 100}%`;

  return (
    <div
      className="case-shell demo-scene"
      {...progress.gesture}
      data-sequence-playing={progress.playing}
      aria-label="Original and enhanced underwater footage in sync"
    >
      <div className="demo-pair water-demo">
        {sources.map(([source, title]) => {
          const base = "/projects/water-" + source;
          return (
            <DemoPanel title={title} key={source}>
              <div className="water-panel">
                <div
                  className="water-frame demo-drag"
                  role="img"
                  aria-label={
                    title + " video frame with its centre column marked"
                  }
                  style={{
                    backgroundImage: `url(${base}-frames.webp)`,
                    backgroundPosition: framePosition,
                  }}
                >
                  <span aria-hidden="true" />
                </div>
                <div className="water-slices demo-drag">
                  <img
                    src={base + "-slices.webp"}
                    width="100"
                    height={samples}
                    alt={title + " centre columns stacked downward in time"}
                    draggable="false"
                    style={{ clipPath: `inset(0 0 ${100 - revealed}% 0)` }}
                  />
                  <span aria-hidden="true" style={{ top: revealed + "%" }} />
                </div>
              </div>
            </DemoPanel>
          );
        })}
      </div>
      <GestureHint id={progress.gesture["aria-describedby"]}>
        {time} s
      </GestureHint>
      <p className="demo-note">
        Each strip stacks the marked centre columns at 24 frames per second.
        Time runs downward.
      </p>
    </div>
  );
}
