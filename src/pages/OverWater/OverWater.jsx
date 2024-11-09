import React from 'react';
import ModelDiagram from './ModelDiagram';
import OverWaterContact from './OverWaterContact';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';
import VideoComparison from './VideoComparison';

const OverWater = () => {
  return (
    <div className="flex flex-col min-h-full relative overflow-hidden">
      {/* Simplified Animated Background */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          background: `
            radial-gradient(circle at 0% 0%, #020617 0%, transparent 50%),
            radial-gradient(circle at 100% 0%, #081130 0%, transparent 50%),
            radial-gradient(circle at 100% 100%, #0f1c3f 0%, transparent 50%),
            radial-gradient(circle at 0% 100%, #172554 0%, transparent 50%),
            #020617
          `
        }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, #020617 0%, transparent 50%), radial-gradient(circle at 100% 100%, #0f1c3f 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, #020617 0%, transparent 50%), radial-gradient(circle at 0% 0%, #0f1c3f 0%, transparent 50%)',
              'radial-gradient(circle at 0% 0%, #020617 0%, transparent 50%), radial-gradient(circle at 100% 100%, #0f1c3f 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Rest of the content */}
      <Navbar className="bg-transparent relative z-10" />
      <main className="flex-grow relative z-10">
        <ModelDiagram />
        <VideoComparison />
        <OverWaterContact />
      </main>
      <Footer className="bg-transparent relative z-10" />
    </div>
  );
};

export default OverWater;