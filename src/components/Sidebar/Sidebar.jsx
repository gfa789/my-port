import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Home, Info, Briefcase, Mail, ChevronLeft, ChevronRight } from 'lucide-react';

const sectionData = [
  { id: 'home', title: 'Home', description: 'Welcome to our site', icon: Home },
  { id: 'about', title: 'About', description: 'Learn about our company', icon: Info },
  { id: 'services', title: 'Services', description: 'Explore our offerings', icon: Briefcase },
  { id: 'contact', title: 'Contact', description: 'Get in touch with us', icon: Mail },
];

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredSection, setHoveredSection] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = sectionData.map(section => 
        document.getElementById(section.id)
      );
      
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= scrollPosition) {
          setActiveSection(sectionData[i].id);
          break;
        }
      }
    };

    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      if (mobile) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ x: isMobile ? '-100%' : -192 }}
            animate={{ x: 0 }}
            exit={{ x: isMobile ? '-100%' : -192 }}
            transition={{ duration: 0.3 }}
            className="z-20 fixed left-0 top-0 h-full bg-sagegreen p-4 shadow-lg overflow-y-auto md:w-48 w-full"
          >
            <button 
              onClick={scrollToTop} 
              className="absolute top-4 left-4 text-puce hover:text-white transition-colors"
            >
              <ArrowUp size={24} />
            </button>
            <ul className='relative top-32'>
              {sectionData.map((section) => (
                <li key={section.id} className="mb-4">
                  <motion.button 
                    onClick={() => handleClick(section.id)}
                    className="block relative w-full text-left"
                    onMouseEnter={() => setHoveredSection(section.id)}
                    onMouseLeave={() => setHoveredSection(null)}
                  >
                    <motion.div
                      className={`p-2 rounded-md transition-colors flex items-center ${
                        activeSection === section.id 
                          ? 'font-bold text-puce bg-gradient-to-br from-white to-sagegreen ring-puce ring-1' 
                          : 'hover:ring-1 ring-puce'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    >
                      <section.icon className="mr-2" size={18} />
                      {section.title}
                    </motion.div>
                  </motion.button>
                </li>
              ))}
            </ul>
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute bottom-1/2 right-4 text-puce hover:text-white transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed z-20 left-4 top-32 bg-sagegreen p-2 rounded-full shadow-lg text-puce hover:text-white transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      )}
      <AnimatePresence>
        {hoveredSection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10 flex items-center justify-center"
            onClick={() => setHoveredSection(null)}
          >
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md">
              <h2 className="text-2xl font-bold mb-2">
                {sectionData.find(section => section.id === hoveredSection)?.title}
              </h2>
              <p>
                {sectionData.find(section => section.id === hoveredSection)?.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;