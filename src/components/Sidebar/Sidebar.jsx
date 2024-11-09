import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Home, FolderGit, Mail, ChevronLeft, ChevronRight, Rewind} from 'lucide-react';

const sectionData = [
  { id: 'home', title: 'Home', description: 'Welcome to our site', icon: Home },
  { id: 'timeline', title: 'Timeline', description: 'Check out my history', icon: Rewind },
  { id: 'projects', title: 'Projects', description: 'Check out my projects', icon: FolderGit },
  { id: 'contact', title: 'Contact', description: 'Get in touch with us', icon: Mail },
];

const Sidebar = ({ onToggle }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [, setHoveredSection] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Check if we're at the very top of the page
      if (scrollPosition === 0) {
        setActiveSection('home');
        return;
      }

      for (let i = sectionData.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionData[i].id);
        if (section && section.offsetTop <= scrollPosition + window.innerHeight / 3) {
          setActiveSection(sectionData[i].id);
          break;
        }
      }
    };

    const handleResize = () => {
      const mobile = window.innerWidth < 1400;
      setIsMobile(mobile);
      if (mobile) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // Close sidebar only on mobile after selection
    if (isMobile) {
      setIsOpen(false);
      onToggle(false);
    }
  };

  const toggleSidebar = (open) => {
    setIsOpen(open);
    onToggle(open);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('home');
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={isMobile ? { x: -192 } : false}
            animate={isMobile ? { x: 0 } : false}
            exit={isMobile ? { x: -192 } : false}
            transition={{ duration: 0.3 }}
            className="fixed left-0 top-0 h-full w-screen sm:w-48 bg-sagegreen bg-opacity-70 backdrop-blur-md p-4 shadow-lg overflow-y-auto z-40"
          >
            <button 
              onClick={scrollToTop}
              className="absolute top-4 left-4 text-puce hover:text-white transition-colors"
            >
              <ArrowUp size={24} />
            </button>
            <ul className='relative top-48'>
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
            {isMobile && (
              <button 
                onClick={() => toggleSidebar(false)}
                className="absolute bottom-1/2 right-4 text-puce hover:text-white transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
      {!isOpen && isMobile && (
        <button
          onClick={() => toggleSidebar(true)}
          className="fixed z-30 left-4 top-46 bg-sagegreen bg-opacity-70 backdrop-blur-md p-2 rounded-full shadow-lg text-puce hover:text-white transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      )}
    </>
  );
};

export default Sidebar;