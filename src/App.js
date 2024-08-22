import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header';
import { useState, useEffect } from 'react';
import VerticalTimeline from './components/VerticalTimeline';
import Footer from './components/Footer';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { motion, useMotionValue, useTransform } from 'framer-motion';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [0, 50], [0, 1]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 50 && !isSidebarOpen) {
      setIsSidebarOpen(true);
    }
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="relative flex-grow">
          <Sidebar isOpen={isSidebarOpen} onToggle={setIsSidebarOpen} />
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 50 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            style={{ x }}
            className="absolute inset-0 z-20"
          >
            <main className="w-screen bg-gradient-to-r from-sagegreen to-puce">
              <section id="home"><Header /></section>
              <section id="timeline"><VerticalTimeline /></section>
              <section id="projects"><Projects /></section>
              <section id="contact"><Contact /></section>
            </main>
          </motion.div>
          {!isSidebarOpen && (
            <motion.div
              className="fixed inset-y-0 left-0 w-2 bg-puce opacity-50"
              style={{ opacity }}
            />
          )}
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;