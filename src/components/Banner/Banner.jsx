import React from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projectRoutes } from '../../projectRoutes';

const Banner = ({ onClose }) => {
  return (
    <div className="w-full bg-gradient-to-r from-blue-500/70 to-blue-600/70 backdrop-blur-sm px-4 py-2 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex-grow text-center">
          <p className="text-sm sm:text-base">
            <Link 
              to={projectRoutes['underwater-image-enhancement']}
              className="text-white underline font-medium hover:text-blue-100 transition-colors"
            >
              Explore Underwater Image Enhancement
            </Link>
          </p>
        </div>
        <button
          onClick={onClose}
          className="ml-4 p-1 rounded-full hover:bg-white/20 transition-colors flex-shrink-0"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default Banner;
