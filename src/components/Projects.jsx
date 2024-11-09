import React, { useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { motion} from 'framer-motion';

const projects = [
    {
      id: 1,
      title: "Underwater Image Enhancement",
      icon: "🌊",
      date: "Jan-May 2024",
      description: "University dissertation project in which I created a rich dataset, and researched deep learning methods for obtaining enhanced underwater images using GANs in PyTorch.",
      link: "https://drive.google.com/file/d/1n85HyTZDCYAQlW12iAW1lgoUPREGd93h/view?usp=sharing",
      hasVisitButton: true
      
    },
    {
      id: 2,
      title: "ML for Weather Forecasting",
      icon: "⛅",
      date: "Jan-May 2024",
      description: "University group coursework set by the MET Office to wrangle time-series weather data, and use it to make weather forecasts using machine learning methods in both sklearn and TensorFlow.",
      link: "https://drive.google.com/file/d/111cPGMAF14W8wbxG88lhSIKxDMPB1ul9/view?usp=sharing",
      hasVisitButton: true
    },
    {
      id: 3,
      title: "ML Model Analysis",
      icon: "📈",
      date: "Nov-Dec 2023",
      description: "Coursework for my university module in Machine Learning. Explored a number of techniques for fitting models using sklearn, and analyzing their performance.",
      link: "https://github.com/gfa789/ml-cw",
      hasVisitButton: true
    },{
      id: 4,
      title: "Dartboard Detector",
      icon: "🎯",
      date: "Nov-Dec 2023",
      description: "Implemented an algorithm using Hough transforms and YOLO for detecting and locating dartboards in images. This was towards my university module in computer vision.",
      link: "https://github.com/gfa789/darts-cw",
      hasVisitButton: true
    },
    {
      id: 5,
      title: "Stereo Vision",
      icon: "🎥",
      date: "Nov-Dec 2023",
      description: "As part of my computer vision module at university, implemented an algorithm that detects objects from two viewpoints, and uses epipolar lines to reconstruct the scene in 3D.",
      link: "https://github.com/gfa789/darts-cw",
      hasVisitButton: true
    },
    {
      id: 6,
      title: "Veterinary Database",
      icon: "📊",
      date: "Sept 2022 - May 2023",
      description: "Worked in a team of 4 to develop a full stack project using React, Node.js, and MongoDB. The product was a self sustaining database with different authority levels for each user type. This was for the university vet school contributing towards our module in Software Engineering. Further details cannot be displayed due to an NDA.",
      link: "#",
      hasVisitButton: false
    },
    // Add more projects as needed
  ];
  

  const ProjectCard = ({ project }) => {
    return (
      <motion.div whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }} 
      className="text-puce bg-gradient-to-br from-white to-sagegreen
                            ring-1 ring-puce focus:ring-2 rounded-lg shadow-md overflow-hidden hover:shadow-xl h-[350px] flex flex-col mr-4 md:mr-0">
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <span className="text-4xl">{project.icon}</span>
            <span className="text-sm text-gray-500">{project.date}</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <div className="flex-grow overflow-y-auto">
            <p className="text-gray-600 mb-4">{project.description}</p>
          </div>
          
          {project.hasVisitButton && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center mt-4 text-slate-500 hover:text-slate-700 transition-colors duration-200"
          >
            Visit Project <ExternalLink className="ml-1" size={16} />
          </a>
        )}
        </div>
      </motion.div>
    );
  };
  
  const Projects = () => {
    const rowRefs = useRef([]);
  
    useEffect(() => {
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      };
  
      const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      };
  
      const observer = new IntersectionObserver(observerCallback, observerOptions);
  
      rowRefs.current.forEach(row => {
        if (row) observer.observe(row);
      });
  
      return () => {
          // eslint-disable-next-line
        rowRefs.current.forEach(row => {
          if (row) observer.unobserve(row);
        });
      };
    }, []);
  
    const getRowRef = (index) => (el) => {
      rowRefs.current[index] = el;
    };
  
    return (
      <div className="container mx-auto px-4 py-8 lg:max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 text-gray-100 text-center">My Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              ref={getRowRef(index)}
              className="opacity-0"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Projects;