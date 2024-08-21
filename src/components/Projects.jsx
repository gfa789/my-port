import React, { useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { motion} from 'framer-motion';

const projects = [
    {
      id: 1,
      title: "Underwater Image Enhancement",
      icon: "🚀",
      date: "2024",
      description: "University dissertation project in which I researched deep learning methods for obtaining enhanced underwater images.",
      link: "#" // Replace with actual project link
    },
    {
      id: 2,
      title: "ML for Weather Forecasting",
      icon: "🔧",
      date: "2024",
      description: "University group coursework set by the MET Office to wrangle time-series weather data, and use it to make weather forecasts using machine learning methods.",
      link: "#" // Replace with actual project link
    },
    {
      id: 3,
      title: "Gamma Analytics",
      icon: "📊",
      date: "2023-04-20",
      description: "Gamma Analytics is a comprehensive data analysis platform that helps businesses make sense of large datasets. It features machine learning algorithms, interactive visualizations, and real-time data processing capabilities.",
      link: "#" // Replace with actual project link
    },{
      id: 4,
      title: "Project Alpha",
      icon: "🚀",
      date: "2023-08-15",
      description: "Project Alpha is a cutting-edge task management application that utilizes AI to prioritize and organize your daily activities. It integrates seamlessly with your calendar and learns from your habits to provide personalized productivity suggestions.",
      link: "#" // Replace with actual project link
    },
    {
      id: 5,
      title: "Beta Framework",
      icon: "🔧",
      date: "2023-06-01",
      description: "Beta Framework is designed for developers who need a fast, efficient, and easy-to-use JavaScript framework. It offers a suite of powerful tools for building responsive and interactive web applications with minimal overhead.",
      link: "#" // Replace with actual project link
    },
    {
      id: 6,
      title: "Gamma Analytics",
      icon: "📊",
      date: "2023-04-20",
      description: "Gamma Analytics is a comprehensive data analysis platform that helps businesses make sense of large datasets. It features machine learning algorithms, interactive visualizations, and real-time data processing capabilities.",
      link: "#" // Replace with actual project link
    },
    // Add more projects as needed
  ];
  

  const ProjectCard = ({ project }) => {
    return (
      <motion.div whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }} 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl h-[400px] flex flex-col">
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <span className="text-4xl">{project.icon}</span>
            <span className="text-sm text-gray-500">{project.date}</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <div className="flex-grow overflow-y-auto">
            <p className="text-gray-600 mb-4">{project.description}</p>
          </div>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center mt-4 text-blue-500 hover:text-blue-700 transition-colors duration-200"
          >
            Visit Project <ExternalLink className="ml-1" size={16} />
          </a>
        </div>
      </motion.div>
    );
  };
  
  const ProjectShowcase = () => {
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
        rowRefs.current.forEach(row => {
          if (row) observer.unobserve(row);
        });
      };
    }, []);
  
    const getRowRef = (index) => (el) => {
      rowRefs.current[index] = el;
    };
  
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-100">My Projects</h1>
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
  
  export default ProjectShowcase;