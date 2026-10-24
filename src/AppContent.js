import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import OverWater, { OverWaterContent } from "./pages/OverWater/OverWater";
import PageMetadata from "./components/PageMetadata";
import NotFound from "./components/NotFound";

export default function AppContent() {
  const [waterTheme, setWaterTheme] = useState(false);
  const palette = useRef(false);
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.slice(1));
      element?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, key]);
  useEffect(() => {
    if (pathname !== "/") return;
    const update = () => {
      const section = document.getElementById("overwater");
      const headerBottom =
        document.querySelector(".site-header")?.getBoundingClientRect()
          .bottom ?? 100;
      const next = Boolean(
        section &&
          section.getBoundingClientRect().top <=
            Math.max(headerBottom + 24, window.innerHeight * 0.4),
      );
      if (next === palette.current) return;
      palette.current = next;
      setWaterTheme(next);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);
  return (
    <>
      <PageMetadata />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Routes>
        <Route path="/overwater" element={<OverWater />} />
        <Route
          path="/"
          element={
            <div
              className={`portfolio-page ${waterTheme ? "water-theme" : ""}`}
            >
              <Navbar />
              <Sidebar />
              <main id="main-content" tabIndex={-1}>
                <Header />
                <Experience />
                <Projects />
                <Contact />
                <OverWaterContent embedded />
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
