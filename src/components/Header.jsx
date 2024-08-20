import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PhotoStack = () => {
  const [isHovered, setIsHovered] = useState(false);

  const items = [
    { type: 'photo', content: '/api/placeholder/200/200', alt: 'Placeholder 1' },
    { type: 'text', content: 'Passionate about web development' },
    { type: 'photo', content: '/api/placeholder/200/200', alt: 'Placeholder 2' },
    { type: 'text', content: 'Experienced in React and Node.js' },
    { type: 'photo', content: '/api/placeholder/200/200', alt: 'Placeholder 3' },
  ];

  return (
    <div 
      className="relative w-64 h-64 mx-auto mt-8 sm:mt-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute top-0 left-0 w-48 h-48 ${
            item.type === 'photo' ? '' : 'bg-white p-4 shadow-md rounded'
          }`}
          initial={{ x: 0, y: 0, rotate: 0, scale: 1 }}
          animate={isHovered ? {
            x: `${(index - 2) * 30}px`,
            y: `${(index - 2) * 30}px`,
            rotate: (index - 2) * 5,
            scale: 1,
            zIndex: index,
          } : {
            x: 0,
            y: 0,
            rotate: (index - 2) * 2,
            scale: 1 - index * 0.05,
            zIndex: items.length - index,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {item.type === 'photo' ? (
            <img src={item.content} alt={item.alt} className="w-full h-full object-cover rounded shadow-md" />
          ) : (
            <p className="text-sm">{item.content}</p>
          )}
        </motion.div>
      ))}
    </div>
  );
};

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-sagegreen to-puce text-white p-8 w-full">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div>
          <motion.h1 
            className="text-4xl font-bold mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your Name
          </motion.h1>
          <motion.h2 
            className="text-2xl mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Your Position
          </motion.h2>
          <motion.p 
            className="text-lg max-w-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            A brief sentence about yourself or your professional mission.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <PhotoStack />
        </motion.div>
      </div>
    </header>
  );
};

export default Header;