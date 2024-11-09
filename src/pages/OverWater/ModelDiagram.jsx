import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ModelDiagram = () => {
  const [triggerAnimation, setTriggerAnimation] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    if (!shouldAnimate) {
      setShouldAnimate(true);
    }
  }, [triggerAnimation, shouldAnimate]);

  // Updated positions to be more spread out and closer to center
  const getInputPosition = (index) => {
    return [
      { x: -200, y: 70 },    // bottom
      { x: -140, y: -70 },   // top
      { x: -210, y: -20 },   // middle-top
      { x: -120, y: 100 },   // bottom
      { x: -140, y: 20 },    // middle
    ][index];
  };

  const getOutputPosition = (index) => {
    return [
      { x: 200, y: 70 },    // bottom
      { x: 140, y: -70 },   // top
      { x: 210, y: -20 },   // middle-top
      { x: 120, y: 100 },   // bottom
      { x: 140, y: 20 },    // middle
    ][index];
  };

  // Rest of the helper functions remain the same...
  const generatePath = (start, isInput) => {
    const controlPoint = {
      x: isInput ? -100 : 100,
      y: start.y * 0.2
    };
    return isInput 
      ? `M ${start.x} ${start.y} Q ${controlPoint.x} ${controlPoint.y}, 0 0`
      : `M 0 0 Q ${controlPoint.x} ${controlPoint.y}, ${start.x} ${start.y}`;
  };

  const inputPaths = Array(5).fill().map((_, i) => 
    generatePath(getInputPosition(i), true)
  );
  
  const outputPaths = Array(5).fill().map((_, i) => 
    generatePath(getOutputPosition(i), false)
  );

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

  // Animation configurations remain the same...
  const imageHoverAnimation = {
    scale: 1.1,
    transition: { duration: 0.1 }
  };

  const getImageVariants = () => ({
    initial: (i) => ({
      x: getInputPosition(i).x,
      y: getInputPosition(i).y,
      scale: 0,
      opacity: 0,
    }),
    animate: (i) => ({
      x: getInputPosition(i).x,
      y: getInputPosition(i).y,
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: i * 0.05
      }
    }),
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

  const getOutputVariants = () => ({
    initial: {
      x: 0,
      y: 0,
      scale: 0,
      opacity: 0,
    },
    animate: (i) => ({
      x: getOutputPosition(i).x,
      y: getOutputPosition(i).y,
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 1 + i * 0.05
      }
    })
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

  const inputTextVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2
      }
    }
  };

  const arrowVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.5
      }
    }
  };

  const outputTextVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.7
      }
    }
  };

  const handleCenterClick = () => {
    setShouldAnimate(false);
    setTriggerAnimation(prev => prev + 1);
  };

  return (
    <section className="w-full min-h-[60vh] lg:min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <h2 className="font-serif text-3xl font-bold text-white mb-2 text-center">OverWater-UIE</h2>
        <p className="font-serif text-white text-lg text-center mb-8 italic">Painting a clearer picture</p>
        
        <div className="w-full max-w-4xl mx-auto relative">
          <div className="aspect-[1.4/1] w-full relative">
            <svg 
              viewBox="-250 -150 500 300"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Definitions remain the same */}
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
                    {/* Input paths */}
                    {inputPaths.map((path, index) => (
                      <motion.path
                        key={`input-path-${index}`}
                        d={path}
                        stroke="rgba(255, 255, 255, 0.2)"
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1
                        }}
                      />
                    ))}

                    {/* Input images */}
                    {inputImages.map((img, index) => (
                      <motion.g
                        key={img.id}
                        custom={index}
                        initial="initial"
                        animate="animate"
                        variants={getImageVariants()}
                        whileHover={imageHoverAnimation}
                      >
                        <rect
                          width="70"
                          height="70"
                          x="-35"
                          y="-35"
                          rx="8"
                          fill="url(#overwater-gradient)"
                          filter="url(#drop-shadow)"
                        />
                        <image
                          href={`/overwater/${(parseInt(img.id.split('-')[1])-1)*2}.png`}
                          width="70"
                          height="70"
                          x="-35"
                          y="-35"
                          rx="8"
                          style={{ clipPath: "inset(0 round 8px)" }}
                        />
                      </motion.g>
                    ))}

                    {/* Input text */}
                    <motion.text
                      initial="initial"
                      animate="animate"
                      variants={inputTextVariants}
                      x="-160"
                      y="170"
                      textAnchor="middle"
                      fill="white"
                      fontSize="22"
                      fontFamily="serif"
                    >
                      Raw Images
                    </motion.text>

                    {/* Output paths */}
                    {outputPaths.map((path, index) => (
                      <motion.path
                        key={`output-path-${index}`}
                        d={path}
                        stroke="rgba(255, 255, 255, 0.2)"
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          duration: 0.5,
                          delay: 1 + index * 0.1
                        }}
                      />
                    ))}

                    {/* Output images */}
                    {outputImages.map((img, index) => (
                      <motion.g
                        key={img.id}
                        custom={index}
                        initial="initial"
                        animate="animate"
                        variants={getOutputVariants()}
                        whileHover={imageHoverAnimation}
                      >
                        <rect
                          width="70"
                          height="70"
                          x="-35"
                          y="-35"
                          rx="8"
                          fill="#34D399"
                          filter="url(#drop-shadow)"
                        />
                        <image
                          href={`/overwater/${(parseInt(img.id.split('-')[1])-1)*2 + 1}.png`}
                          width="70"
                          height="70"
                          x="-35"
                          y="-35"
                          rx="8"
                          style={{ clipPath: "inset(0 round 8px)" }}
                        />
                      </motion.g>
                    ))}

                    {/* Output text */}
                    <motion.text
                      initial="initial"
                      animate="animate"
                      variants={outputTextVariants}
                      x="160"
                      y="170"
                      textAnchor="middle"
                      fill="white"
                      fontSize="22"
                      fontFamily="serif"
                    >
                      Enhanced Images
                    </motion.text>

                    {/* Center arrow */}
                    <motion.path
                      initial="initial"
                      animate="animate"
                      variants={arrowVariants}
                      d="M -40 120 L 40 120 M 25 105 L 40 120 L 25 135"
                      stroke="white"
                      strokeWidth="2"
                      fill="none"
                    />
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
              >
                <rect
                  width="140"
                  height="140"
                  x="-70"
                  y="-70"
                  rx="18"
                  fill="none"
                  stroke="#a7a88a"
                  strokeWidth="2"
                />

                <rect
                  width="130"
                  height="130"
                  x="-65"
                  y="-65"
                  rx="16"
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
                  fontSize="30"
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
      </div>
    </section>
  );
};

export default ModelDiagram;