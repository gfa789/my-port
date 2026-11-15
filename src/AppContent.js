import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Underwater from "./pages/Underwater/Underwater";
import ProjectStudy from "./pages/ProjectStudy/ProjectStudy";
import WeatherStudy from "./pages/ProjectStudy/WeatherStudy";
import ModelDemo from "./pages/ProjectStudy/ModelDemo";
import DartDemo from "./pages/ProjectStudy/DartDemo";
import LifeDemo from "./pages/ProjectStudy/LifeDemo";
import StereoDemo from "./pages/ProjectStudy/StereoDemo";
import ProjectExhibit from "./pages/ProjectStudy/ProjectExhibit";
import { projectRoutes } from "./projectRoutes";
import PageMetadata from "./components/PageMetadata";
import NotFound from "./components/NotFound";

const caseStudyDemos = {
  "model-analysis": ModelDemo,
  "dartboard-detector": DartDemo,
  "stereo-vision": StereoDemo,
  "distributed-game-of-life": LifeDemo,
};

export default function AppContent() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    const section = document.getElementById(hash.slice(1));
    const heading = section?.querySelector(
      ".portfolio-section-heading h2, #contact-title",
    );
    const target = heading?.getBoundingClientRect().top > 0 ? heading : section;
    target?.scrollIntoView({ block: "start" });
  }, [pathname, hash, key]);
  return (
    <>
      <PageMetadata />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Routes>
        <Route
          path={projectRoutes["underwater-image-enhancement"]}
          element={<Underwater />}
        />
        <Route
          path={projectRoutes["weather-forecasting"]}
          element={<WeatherStudy />}
        />
        {Object.entries(caseStudyDemos).map(([id, Demo]) => (
          <Route
            key={id}
            path={projectRoutes[id]}
            element={
              <ProjectStudy
                key={id}
                id={id}
                approachLink="Explore the exhibit"
                approach={<ProjectExhibit id={id} Visual={Demo} />}
              />
            }
          />
        ))}
        <Route
          path="/"
          element={
            <div className="portfolio-page">
              <Navbar />
              <Sidebar />
              <main id="main-content" tabIndex={-1}>
                <Header />
                <Experience />
                <Projects />
                <Contact />
              </main>
              <Footer />
            </div>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
