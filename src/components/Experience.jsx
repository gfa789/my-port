import { ArrowUpRight } from "lucide-react";
import ChapterViewer from "./ChapterViewer";

const neptuneNorth = {
  brand: "neptune",
  image: "/photos/neptune-north-wordmark.webp",
  url: "https://www.neptunenorth.co.uk/",
};

const rokos = {
  name: "Rokos Capital Management",
  brand: "rokos",
  image: "/photos/rokos-capital-management.svg",
  url: "https://www.rokoscapital.com/",
};

const timelineItems = [
  {
    title: "St Mary's Catholic School",
    date: "Sept 2014 - June 2021",
    description: "Secondary School",
    longDescription:
      "Excelled in academic studies, particularly in sciences and mathematics. Scored A*A*A* in Physics, Maths, and Further Maths in addition to AA in EPQ and Thinking Skills. Attained 12 GCSEs: four 9's, seven 8's, and one 7.",
    isActive: true,
    organisation: {
      brand: "st-marys",
      image: "/photos/marys.png",
    },
    icon: (
      <svg
        className="fill-current"
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="10"
      >
        <path
          fillRule="nonzero"
          d="M10.422 1.257 4.655 7.025 2.553 4.923A.916.916 0 0 0 1.257 6.22l2.75 2.75a.916.916 0 0 0 1.296 0l6.415-6.416a.916.916 0 0 0-1.296-1.296Z"
        />
      </svg>
    ),
  },
  {
    title: "Shape Performance",
    date: "July 2021- April 2023",
    description: "Sports Coach ",
    longDescription:
      "A summer job to help fund my university studies. Responsible for groups of 15‑20 children aged 5‑12 as part of sports summer camps across Newcastle, coaching a range of sports and activities. ",
    isActive: true,
    organisation: {
      brand: "shape",
      image: "/photos/shapeperformance.jpg",
    },
    icon: (
      <svg
        className="fill-current"
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="10"
      >
        <path
          fillRule="nonzero"
          d="M10.422 1.257 4.655 7.025 2.553 4.923A.916.916 0 0 0 1.257 6.22l2.75 2.75a.916.916 0 0 0 1.296 0l6.415-6.416a.916.916 0 0 0-1.296-1.296Z"
        />
      </svg>
    ),
  },
  {
    title: "NogginHQ",
    date: "Jul-Aug 2023",
    description: "Intern Data Engineer",
    longDescription:
      "Summer internship during Summer 2023. Responsible for SEO and produced a data scraper to efficiently retrieve up to date information.",
    isActive: true,
    organisation: {
      brand: "noggin",
      image: "/photos/nhq.png",
      url: "https://www.nogginhq.com/business",
    },
    icon: (
      <svg
        className="fill-current"
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="10"
      >
        <path
          fillRule="nonzero"
          d="M10.422 1.257 4.655 7.025 2.553 4.923A.916.916 0 0 0 1.257 6.22l2.75 2.75a.916.916 0 0 0 1.296 0l6.415-6.416a.916.916 0 0 0-1.296-1.296Z"
        />
      </svg>
    ),
  },
  {
    title: "University of Bristol",
    date: "2021-2024",
    description: "BSc Computer Science",
    longDescription:
      "Attained a high 2:1 with honours (67%), achieving outstanding results in software engineering, data science, and machine learning. Participated in various extracurricular activities including the engineering football team.",
    isActive: true,
    organisation: {
      brand: "bristol",
      image: "/photos/bris.png",
      url: "https://www.bristol.ac.uk/",
    },
    icon: (
      <svg
        className="fill-current"
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="10"
      >
        <path
          fillRule="nonzero"
          d="M10.422 1.257 4.655 7.025 2.553 4.923A.916.916 0 0 0 1.257 6.22l2.75 2.75a.916.916 0 0 0 1.296 0l6.415-6.416a.916.916 0 0 0-1.296-1.296Z"
        />
      </svg>
    ),
  },
  {
    title: "Neptune North",
    date: "2024-2025",
    description: "Graduate Software Developer",
    longDescription:
      "Worked on the Rokos Capital Management account in reference data technology, developing with .NET/C#, Python, React and MS SQL Server. Additionally, deployed full-stack AI applications used company-wide.",
    isActive: true,
    organisation: neptuneNorth,
    client: rokos,
    icon: (
      <svg
        className="fill-current"
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="10"
      >
        <path
          fillRule="nonzero"
          d="M10.422 1.257 4.655 7.025 2.553 4.923A.916.916 0 0 0 1.257 6.22l2.75 2.75a.916.916 0 0 0 1.296 0l6.415-6.416a.916.916 0 0 0-1.296-1.296Z"
        />
      </svg>
    ),
  },
  {
    title: "Neptune North",
    date: "2025-Present",
    description: "Software Developer",
    longDescription:
      "Working on the Rokos Capital Management account in reference data technology, developing across the full stack with .NET, Python, React and SQL. I am involved in independent end-to-end delivery, design decisions and system architecture.",
    isActive: false,
    organisation: neptuneNorth,
    client: rokos,
    icon: "...",
  },
];
const newestFirst = [...timelineItems].reverse();

function OrganisationLogo({ brand, image, url, name }) {
  if (!url) {
    return (
      <div className="career-logo" data-brand={brand}>
        <img src={image} alt={name} loading="lazy" />
      </div>
    );
  }

  return (
    <a
      className="career-logo"
      data-brand={brand}
      href={url}
      aria-label={`Visit ${name} website`}
    >
      <img src={image} alt="" loading="lazy" />
      <ArrowUpRight size={16} aria-hidden="true" />
    </a>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="timeline-section section shell"
      aria-labelledby="experience-title"
    >
      <div className="portfolio-section-heading">
        <h2 id="experience-title" className="section-title">
          Experience &amp; Education
        </h2>
        <p>From Bristol to reference data engineering.</p>
      </div>
      <ChapterViewer label="career entry" timeline entries={newestFirst}>
        {newestFirst.map((item) => (
          <article key={item.title + item.date} className="career-chapter">
            <div className="career-identity">
              <span className="chapter-overline">
                {item.date.includes("Present")
                  ? "CURRENT CHAPTER"
                  : "EARLIER CHAPTER"}
              </span>
              <div className="timeline-logos">
                <OrganisationLogo {...item.organisation} name={item.title} />
                {item.client && (
                  <div className="timeline-client">
                    <span>Client account</span>
                    <OrganisationLogo {...item.client} />
                  </div>
                )}
              </div>
            </div>
            <div className="career-story">
              <span className="chapter-overline">{item.date}</span>
              <h3>{item.title}</h3>
              <p className="timeline-role">{item.description}</p>
              <p className="timeline-date">{item.date}</p>
              <p className="timeline-description">{item.longDescription}</p>
            </div>
          </article>
        ))}
      </ChapterViewer>
    </section>
  );
}
