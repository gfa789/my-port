import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { ArrowUp, Home, FolderGit, Mail, ChevronLeft, ChevronRight, Rewind} from 'lucide-react';

const sectionData = [
  { id: 'home', title: 'Home', description: 'Welcome to our site', icon: Home },
  { id: 'timeline', title: 'Timeline', description: 'Check out my history', icon: Rewind },
  { id: 'projects', title: 'Projects', description: 'Check out my projects', icon: FolderGit },
  { id: 'contact', title: 'Contact', description: 'Get in touch with us', icon: Mail },
];

const Sidebar = ({ isOpen, onToggle }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [, setHoveredSection] = useState(null);

  const x = useMotionValue(0);
  const opacity = useTransform(x, [-192, 0], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sectionData.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionData[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectionData[i].id);
          break;
        }
      }
    };

    // const handleResize = () => {
    //   if (window.innerWidth < 1024) {
    //     setIsOpen(false);
    //   } else {
    //     setIsOpen(true);
    //   }
    // };

    window.addEventListener('scroll', handleScroll);
    // window.addEventListener('resize', handleResize);
    // handleResize();
    handleScroll(); // Initial check for active section

    return () => {
      window.removeEventListener('scroll', handleScroll);
      // window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleDragEnd = (event, info) => {
    if (info.offset.x < -50) {
      onToggle(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
          initial={{ x: -192 }}
          animate={{ x: 0 }}
          exit={{ x: -192 }}
          transition={{ duration: 0.3 }}
          drag="x"
          dragConstraints={{ left: -192, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          style={{ x, opacity }}
          className="fixed left-0 top-0 h-full w-screen sm:w-48 bg-sagegreen bg-opacity-70 backdrop-blur-md p-4 shadow-lg overflow-y-auto z-40"
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
              onClick={() => onToggle}
              className="absolute bottom-1/2 right-4 text-puce hover:text-white transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
      {!isOpen && (
        <button
          onClick={() => onToggle(true)}
          className="fixed z-30 left-4 top-32 bg-sagegreen bg-opacity-70 backdrop-blur-md p-2 rounded-full shadow-lg text-puce hover:text-white transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      )}
    </>
  );
};

export default Sidebar;