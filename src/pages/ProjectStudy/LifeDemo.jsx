import "./LifeDemo.css";

const columns = 32;
const rows = 18;
const generations = 24;
const glider = [
  [1, 0],
  [2, 1],
  [0, 2],
  [1, 2],
  [2, 2],
];
const seeds = [
  [3, 2, glider],
  [17, 4, glider],
  [24, 11, glider],
  [
    11,
    11,
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
  ],
];
const indexAt = (x, y) =>
  ((y + rows) % rows) * columns + ((x + columns) % columns);
const neighbours = Array.from({ length: rows * columns }, (_, index) => {
  const x = index % columns;
  const y = Math.floor(index / columns);
  return [-1, 0, 1].flatMap((dy) =>
    [-1, 0, 1].filter((dx) => dx || dy).map((dx) => indexAt(x + dx, y + dy)),
  );
});

const initial = new Set(
  seeds.flatMap(([x, y, pattern]) =>
    pattern.map(([dx, dy]) => indexAt(x + dx, y + dy)),
  ),
);
const boards = [initial];
for (let generation = 0; generation < generations; generation += 1) {
  const board = boards[generation];
  boards.push(
    new Set(
      neighbours.flatMap((adjacent, index) => {
        const count = adjacent.filter((cell) => board.has(cell)).length;
        return count === 3 || (count === 2 && board.has(index)) ? [index] : [];
      }),
    ),
  );
}

export default function LifeDemo({ step }) {
  const generation = Math.floor(step);
  const current = boards[generation];
  const next = boards[Math.min(generation + 1, generations)];
  const fraction = step - generation;

  return (
    <div className="life-exhibit">
      <div className="life-readout">
        <span>
          Generation <strong>{String(generation).padStart(2, "0")}</strong>
        </span>
        <span>
          Live cells <strong>{current.size}</strong>
        </span>
      </div>
      <div
        className="life-board"
        role="img"
        aria-label="Illustrative Game of Life board divided into three worker row ranges"
      >
        <div className="life-strips" aria-hidden="true">
          {[1, 2, 3].map((worker) => (
            <span key={worker}>Worker {worker}</span>
          ))}
        </div>
        {[...new Set([...current, ...next])].map((cell) => (
          <span
            key={cell}
            aria-hidden="true"
            className="life-cell"
            style={{
              left: `${((cell % columns) / columns) * 100}%`,
              top: `${(Math.floor(cell / columns) / rows) * 100}%`,
              opacity: current.has(cell)
                ? next.has(cell)
                  ? 1
                  : 1 - fraction
                : fraction,
            }}
          />
        ))}
      </div>
    </div>
  );
}
