import React from 'react';
import ModelDiagram from './ModelDiagram';
import VideoCompare from './VideoCompare';
import OverWaterContact from './OverWaterContact';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';

const OverWater = () => {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Animated Background */}
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
              'radial-gradient(circle at 0% 0%, #020617 0%, transparent 50%), radial-gradient(circle at 100% 0%, #081130 0%, transparent 50%), radial-gradient(circle at 100% 100%, #0f1c3f 0%, transparent 50%), radial-gradient(circle at 0% 100%, #172554 0%, transparent 50%)',
              'radial-gradient(circle at 100% 0%, #020617 0%, transparent 50%), radial-gradient(circle at 100% 100%, #081130 0%, transparent 50%), radial-gradient(circle at 0% 100%, #0f1c3f 0%, transparent 50%), radial-gradient(circle at 0% 0%, #172554 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, #020617 0%, transparent 50%), radial-gradient(circle at 0% 100%, #081130 0%, transparent 50%), radial-gradient(circle at 0% 0%, #0f1c3f 0%, transparent 50%), radial-gradient(circle at 100% 0%, #172554 0%, transparent 50%)',
              'radial-gradient(circle at 0% 100%, #020617 0%, transparent 50%), radial-gradient(circle at 0% 0%, #081130 0%, transparent 50%), radial-gradient(circle at 100% 0%, #0f1c3f 0%, transparent 50%), radial-gradient(circle at 100% 100%, #172554 0%, transparent 50%)',
              'radial-gradient(circle at 0% 0%, #020617 0%, transparent 50%), radial-gradient(circle at 100% 0%, #081130 0%, transparent 50%), radial-gradient(circle at 100% 100%, #0f1c3f 0%, transparent 50%), radial-gradient(circle at 0% 100%, #172554 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Content */}
      <Navbar className="bg-transparent relative z-10" />
      <main className="flex-grow relative z-10">
        <ModelDiagram />
        {/* <VideoCompare /> */}
        <OverWaterContact />
      </main>
      <Footer className="bg-transparent relative z-10" />
    </div>
  );
};

export default OverWater;