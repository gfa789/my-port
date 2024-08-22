import React, { useState, useEffect} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';

const images = [
  "/photos/head.jpg",
  "/photos/sea.jpg",
  "/photos/glasto.jpg",
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [resetCount, setResetCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [resetCount]);

  const resetTimer = () => {
    setResetCount(prev => prev + 1);
  };

  const goToIndex = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    resetTimer();
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    resetTimer();
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    resetTimer();
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => goToNext(),
    onSwipedRight: () => goToPrevious(),
    trackMouse: true
  });

  const slideVariants = {
    hiddenRight: {
      x: "100%",
      opacity: 0,
    },
    hiddenLeft: {
      x: "-100%",
      opacity: 0,
    },
    visible: {
      x: "0",
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className=" relative w-full h-72 sm:w-96 sm:h-72 overflow-hidden rounded-lg shadow-xl" {...handlers}>
      <AnimatePresence initial={false} custom={direction} >
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="absolute w-full h-full object-cover"
          variants={slideVariants}
          initial={direction > 0 ? "hiddenRight" : "hiddenLeft"}
          animate="visible"
          exit="exit"
          onClick={goToNext}
        />
      </AnimatePresence>

      <button
        className="absolute -left-16 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hidden sm:block hover:bg-opacity-75 transition-all"
        onClick={goToPrevious}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute -right-16 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hidden sm:block hover:bg-opacity-75 transition-all"
        onClick={goToNext}
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-white scale-125' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>
      {/* <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent
                       -translate-x-full group-hover:animate-shine" 
            style={{ '--shine-deg': '45deg' }} /> */}
    </div>
  );
};

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-sagegreen to-puce text-white p-8 w-full">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="ml-24 md:ml-48">
          <motion.h1 
            className="text-4xl font-bold mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            George Atkinson
          </motion.h1>
          <motion.h2 
            className="text-2xl mb-4 text-gray-100"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Software Engineer, 21
          </motion.h2>
          <motion.p 
            className="text-lg max-w-md text-gray-200"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Computer Science graduate with a passion for complex problems.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="ml-24"
        >
          <ImageCarousel />
        </motion.div>
      </div>
    </header>
  );
};

export default Header;

