import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
const timelineItems = [
  {
    title: "St Mary's Catholic School",
    date: "Sept 2014 - June 2021",
    description: "Secondary School",
    longDescription:
      "Excelled in academic studies, particularly in sciences and mathematics. Scored A*A*A* in Physics, Maths, and Further Maths in addition to AA in EPQ and Thinking Skills. Attained 12 GCSEs: four 9's, seven 8's, and one 7.",
    isActive: true,
    image: "/photos/marys.png",
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
    image: "/photos/shapeperformance.jpg",
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
    image: "/photos/nhq.png",
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
    image: "/photos/bris.png",
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
    image: "/photos/neptune2.png",
    clientImage: "/photos/rokos-capital-management.svg",
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
    image: "/photos/neptune2.png",
    clientImage: "/photos/rokos-capital-management.svg",
    icon: "...",
  },
];
const newestFirst = [...timelineItems].reverse();

export default function Experience() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    let frame;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = ref.current?.getBoundingClientRect();
        if (bounds)
          setProgress(
            Math.max(
              0,
              Math.min(
                100,
                ((window.innerHeight * 0.6 - bounds.top) / bounds.height) * 100,
              ),
            ),
          );
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <section
      id="experience"
      className="timeline-section section shell"
      aria-labelledby="experience-title"
    >
      <h2 id="experience-title" className="section-title">
        Experience &amp; Education
      </h2>
      <div ref={ref} className="journey-timeline">
        <div className="timeline-track" aria-hidden="true">
          <div style={{ height: `${progress}%` }} />
        </div>
        {newestFirst.map((item, index) => (
          <Reveal
            key={item.title + item.date}
            className={`journey-stop ${index % 2 ? "right" : "left"} ${progress > (index / timelineItems.length) * 100 ? "passed" : ""}`}
          >
            <div className="journey-marker" aria-hidden="true">
              {item.isActive ? "✓" : "…"}
            </div>
            <motion.article
              className="timeline-card glass-card"
              whileHover={reduce ? {} : { scale: 1.035, y: -3 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
            >
              <div className="timeline-logos">
                <img
                  src={item.image}
                  alt={item.title}
                  width="180"
                  height="180"
                  loading="lazy"
                />
                {item.clientImage && (
                  <div className="timeline-client">
                    <span>Client account</span>
                    <img
                      src={item.clientImage}
                      alt="Rokos Capital Management"
                      width="180"
                      height="70"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
              <div>
                <h3>{item.title}</h3>
                <p className="timeline-role">{item.description}</p>
                <p className="timeline-date">{item.date}</p>
                <p className="timeline-description">{item.longDescription}</p>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
