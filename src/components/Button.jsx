import React from "react";
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const Button = ({ text, to, onClick, icon }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      if (location.pathname === '/overwater') {
        // If we're on the overwater page, navigate to home first
        navigate('/', { state: { scrollTo: to }});
      } else {
        // If we're already on home, just scroll
        const element = document.getElementById(to);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="relative overflow-hidden text-puce bg-gradient-to-br from-white to-sagegreen
                 ring-1 ring-puce focus:ring-2 dark:focus:ring-blue-800
                 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2
                 group hover:before:animate-shine flex"
    >
      <span className="relative z-10">{text}</span>
      {icon ? <span className={text ? "pl-2" : ""}>{icon}</span> : <></>}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent
                       -translate-x-full group-hover:animate-shine" 
            style={{ '--shine-deg': '45deg' }}
      />
    </motion.button>
  );
};

export default Button;