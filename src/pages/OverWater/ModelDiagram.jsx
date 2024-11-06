import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ModelDiagram = () => {
  const [triggerAnimation, setTriggerAnimation] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!shouldAnimate) {
      setShouldAnimate(true);
    }
  }, [triggerAnimation]);

  const inputPositions = [
    { x: -290, y: 40 },    
    { x: -260, y: -50 },   
    { x: -320, y: -20 },   
    { x: -220, y: 70 },    
    { x: -210, y: 10 },    
  ];

  const outputPositions = [
    { x: 290, y: 40 },    
    { x: 260, y: -50 },   
    { x: 320, y: -20 },   
    { x: 220, y: 70 },    
    { x: 210, y: 10 },    
  ];

  const generatePath = (start, isInput) => {
    const controlPoint = {
      x: isInput ? -150 : 150,
      y: start.y * 0.2
    };
    return isInput 
      ? `M ${start.x} ${start.y} Q ${controlPoint.x} ${controlPoint.y}, 0 0`
      : `M 0 0 Q ${controlPoint.x} ${controlPoint.y}, ${start.x} ${start.y}`;
  };

  const inputPaths = inputPositions.map(pos => generatePath(pos, true));
  const outputPaths = outputPositions.map(pos => generatePath(pos, false));

  const inputImages = [
    { id: "input-1", label: "Raw 1" },
    { id: "input-2", label: "Raw 2" },
    { id: "input-3", label: "Raw 3" },
    { id: "input-4", label: "Raw 4" },
    { id: "input-5", label: "Raw 5" },
  ];

  const outputImages = [
    { id: "output-1", label: "Enhanced 1" },
    { id: "output-2", label: "Enhanced 2" },
    { id: "output-3", label: "Enhanced 3" },
    { id: "output-4", label: "Enhanced 4" },
    { id: "output-5", label: "Enhanced 5" },
  ];

  const getImageVariants = (isSelected) => ({
    initial: (i) => ({
      x: inputPositions[i].x,
      y: inputPositions[i].y,
      scale: 0,
      opacity: 0,
    }),
    animate: (i) => ({
      x: inputPositions[i].x,
      y: inputPositions[i].y,
      scale: isSelected ? 1.2 : 1.1,
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: i * 0.05
      }
    }),
    hover: {
      scale: 1.2,
      transition: {
        duration: 0.2
      }
    },
    exit: {
      x: 0,
      y: 0,
      scale: 0,
      opacity: 0,
      transition: {
        duration: 0.1
      }
    }
  });

  const getOutputVariants = (isSelected) => ({
    initial: {
      x: 0,
      y: 0,
      scale: 0,
      opacity: 0,
    },
    animate: (i) => ({
      x: outputPositions[i].x,
      y: outputPositions[i].y,
      scale: isSelected ? 1.2 : 1.1,
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.5 +  i * 0.1
      }
    }),
    hover: {
      scale: 1.2,
      transition: {
        duration: 0.2
      }
    }
  });

  const centerSquareAnimation = {
    initial: { 
      scale: 1,
    },
    hover: { 
      scale: 1.1,
      transition: {
        duration: 0.2
      }
    },
  };

  const handleImageClick = (id) => {
    setSelectedImage(selectedImage === id ? null : id);
  };

  const handleCenterClick = () => {
    setSelectedImage(null);
    setShouldAnimate(false);
    setTriggerAnimation(prev => prev + 1);
  };

  return (
    <section className="w-full relative overflow-hidden py-8">
      

      <div className="container mx-auto px-4 relative">
        <h2 className="font-serif text-3xl font-bold text-white my-4 text-center">OverWater-UIE</h2>
        <p className="font-serif text-white text-lg text-center mb-8 italic">For keeping your head above water</p>
        
        <div className="flex justify-center items-center">
          <svg width="1000" height="600" viewBox="-400 -250 800 500">
            <defs>
              <linearGradient id="overwater-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#d0ccb9" />
              </linearGradient>
              
              <filter id="drop-shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
                <feOffset dx="2" dy="4" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.4" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <AnimatePresence mode="wait" key={triggerAnimation}>
              {shouldAnimate && (
                <>
                  {/* Left side - Input paths */}
                  {inputPaths.map((path, index) => (
                    <motion.path
                      key={`input-path-${index}`}
                      d={path}
                      stroke="rgba(255, 255, 255, 0.2)"
                      strokeWidth="3"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1
                      }}
                    />
                  ))}

                  {/* Left side - Input images */}
                  {inputImages.map((img, index) => {
                    const isSelected = selectedImage === img.id;
                    return (
                      <motion.g
                        key={img.id}
                        custom={index}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        variants={getImageVariants(isSelected)}
                        onClick={() => handleImageClick(img.id)}
                        style={{ 
                          cursor: 'pointer',
                          position: 'relative',
                          zIndex: isSelected ? 100 : 1 
                        }}
                      >
                        <rect
                          width="90"
                          height="90"
                          x="-45"
                          y="-45"
                          rx="10"
                          fill="url(#overwater-gradient)"
                          filter="url(#drop-shadow)"
                        />
                        <image
                          href={`/overwater/${(parseInt(img.id.split('-')[1])-1)*2}.png`}
                          width="90"
                          height="90"
                          x="-45"
                          y="-45"
                          rx="10"
                          style={{ clipPath: "inset(0 round 10px)" }}
                        />
                      </motion.g>
                    );
                  })}

                  {/* Right side - Output paths */}
                  {outputPaths.map((path, index) => (
                    <motion.path
                      key={`output-path-${index}`}
                      d={path}
                      stroke="rgba(255, 255, 255, 0.2)"
                      strokeWidth="3"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 1+ index * 0.1
                      }}
                    />
                  ))}

                  {/* Right side - Output images */}
                  {outputImages.map((img, index) => {
                    const isSelected = selectedImage === img.id;
                    return (
                      <motion.g
                        key={img.id}
                        custom={index}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        variants={getOutputVariants(isSelected)}
                        onClick={() => handleImageClick(img.id)}
                        style={{ 
                          cursor: 'pointer',
                          position: 'relative',
                          zIndex: isSelected ? 100 : 1 
                        }}
                      >
                        <rect
                          width="90"
                          height="90"
                          x="-45"
                          y="-45"
                          rx="10"
                          fill="#34D399"
                          filter="url(#drop-shadow)"
                        />
                        <image
                          href={`/overwater/${(parseInt(img.id.split('-')[1])-1)*2 + 1}.png`}
                          width="90"
                          height="90"
                          x="-45"
                          y="-45"
                          rx="10"
                          style={{ clipPath: "inset(0 round 10px)" }}
                        />
                      </motion.g>
                    );
                  })}
                </>
              )}
            </AnimatePresence>

            {/* OW-UIE Square */}
            <motion.g
              onClick={handleCenterClick}
              className="cursor-pointer"
              initial="initial"
              whileHover="hover"
              variants={centerSquareAnimation}
              style={{ 
                position: 'relative',
                zIndex: selectedImage === 'center' ? 100 : 1 
              }}
            >
              <rect
                width="170"
                height="170"
                x="-85"
                y="-85"
                rx="22"
                fill="none"
                stroke="#a7a88a"
                strokeWidth="2"
              />

              <rect
                width="160"
                height="160"
                x="-80"
                y="-80"
                rx="20"
                fill="url(#overwater-gradient)"
                filter="url(#drop-shadow)"
              />

              <text
                x="0"
                y="0"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#474241"
                fontFamily="DM Serif Text"
                fontSize="28"
                fontWeight="bold"
                fontStyle="italic"
                className="select-none"
              >
                OW-UIE
              </text>
            </motion.g>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default ModelDiagram;