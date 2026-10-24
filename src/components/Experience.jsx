const roles = [
  {
    date: "2025 — Present",
    role: "Software Developer",
    company: "Neptune North",
    description:
      "Full-stack development in reference data technology, predominantly using .NET, Python, React and SQL. My work includes independent end-to-end delivery, design decisions and system architecture.",
    current: true,
  },
  {
    date: "2024 — 2025",
    role: "Graduate Software Developer",
    company: "Neptune North",
    description:
      "Worked on reference data for the Rokos Capital Management project across .NET/C#, Python, React and SQL Server. Also delivered internal full-stack AI applications used across the company.",
  },
  {
    date: "Summer 2023",
    role: "Data Engineering Intern",
    company: "NogginHQ",
    description:
      "Worked on SEO and built a data scraper to retrieve up-to-date information.",
  },
];
export default function Experience() {
  return (
    <section
      id="experience"
      className="experience-section section"
      aria-labelledby="experience-title"
    >
      <div className="shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">02 / Experience</p>
            <h2 id="experience-title">
              Built on experience.
              <br />
              <em>Driven by curiosity.</em>
            </h2>
          </div>
          <p>From data and research to software that people use.</p>
        </div>
        <ol className="experience-list">
          {roles.map((item) => (
            <li className="experience-row" key={item.role}>
              <p className="experience-date">
                {item.current && (
                  <span className="current-dot" aria-hidden="true" />
                )}
                {item.date}
              </p>
              <div>
                <p className="experience-company">{item.company}</p>
                <h3>{item.role}</h3>
              </div>
              <p>{item.description}</p>
            </li>
          ))}
        </ol>
        <div className="background-note">
          <p className="eyebrow">A little background</p>
          <h3>BSc Computer Science, University of Bristol</h3>
          <p>
            2021–2024 · 2:1 with honours. A foundation in software engineering,
            data science and machine learning.
          </p>
          <details>
            <summary>Earlier chapters</summary>
            <p>
              Before and during university, I coached sports with Shape
              Performance (2021–2023). I attended St Mary’s Catholic School
              (2014–2021), studying Physics, Maths and Further Maths at A level.
            </p>
            <p>
              Coaching meant taking responsibility for groups of 15–20 children
              aged 5–12 at summer camps across Newcastle. At school I achieved
              A*A*A* in Physics, Maths and Further Maths, AA in EPQ and Thinking
              Skills, and 12 GCSEs: four 9s, seven 8s and one 7.
            </p>
            <p>
              At Bristol I graduated with 67% and participated in the
              engineering football team alongside my studies.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}
