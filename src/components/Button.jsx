import React from "react";
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";

const Button = ({ text, to, onClick, icon, water, link }) => {

  var navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (link){
      navigate(link);
    }else if (to) {
        const element = document.getElementById(to);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={`relative overflow-hidden text-puce bg-gradient-to-br ${water ? "from-blue-950 to-black ring-black text-white" : "from-white to-sagegreen ring-puce"}
                 ring-1  focus:ring-2 dark:focus:ring-blue-800
                 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2
                 group hover:before:animate-shine inline-flex items-center justify-center w-full lg:w-auto`}
    >
      <span className="relative z-10 inline-flex items-center">
        {text}
        {icon && <span className={text ? "ml-2" : ""}>{icon}</span>}
      </span>
    {water?<></> :<span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent
                       -translate-x-full group-hover:animate-shine" 
            style={{ '--shine-deg': '45deg' }}
      />}
    </motion.button>
  );
};

export default Button;