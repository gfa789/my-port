import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="hover:animate-wiggle relative w-32 h-32  inline-block border-2 border-puce rounded-lg overflow-hidden group cursor-pointer" onClick={nextImage}>
      <AnimatePresence initial={false}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="absolute w-full h-full object-cover "
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
    </div>
  );
};

export default ImageCarousel;