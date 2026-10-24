import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import OverWater from "./pages/OverWater/OverWater";
import PageMetadata from "./components/PageMetadata";
import NotFound from "./components/NotFound";

export default function AppContent() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.slice(1));
      element?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, key]);
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
