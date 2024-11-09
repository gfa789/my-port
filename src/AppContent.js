import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header';
import { useState, useEffect } from 'react';
import VerticalTimeline from './components/VerticalTimeline';
import Footer from './components/Footer';
import Projects from './components/Projects';
import Contact from './components/Contact';
import OverWater from './pages/OverWater/OverWater';

function AppContent() {
  const [, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      // Clear the state after scrolling
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  return (
    <Routes>
      <Route path="/overwater" element={<OverWater />} />
      <Route
        path="/"
        element={
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="relative flex-grow">
              <Sidebar onToggle={(isOpen) => setIsSidebarOpen(isOpen)} />
              <main className="w-screen bg-gradient-to-r from-sagegreen to-puce">
                <section id="home"><Header /></section>
                <section id="timeline"><VerticalTimeline /></section>
                <section id="projects"><Projects /></section>
                <Contact />
              </main>
            </div>
            <Footer />
          </div>
        }
      />
    </Routes>
  );
}

export default AppContent;