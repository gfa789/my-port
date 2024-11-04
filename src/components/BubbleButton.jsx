import React from "react";
import { motion } from 'framer-motion';

const BubbleButton = ({ text, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="relative h-48 w-48 drop-shadow-lg opacity-80
                 rounded-[51%_49%_48%_52%/62%_44%_56%_38%] border-2 border-[#3d93ff]
                 before:content-[''] before:absolute before:h-full before:w-full 
                 before:rounded-[51%_49%_48%_52%/62%_44%_56%_38%]
                 before:bg-[#318CFE]
                 before:shadow-[inset_-6px_6px_10px_#1B6CFB,inset_20px_-20px_22px_white,inset_40px_-40px_44px_#a8ceff,-20px_30px_16px_#1B6CFB,-40px_60px_32px_#1b6cfb]
                 after:content-[''] after:absolute after:h-10 after:w-10 
                 after:rounded-[44%_56%_46%_54%/36%_50%_50%_64%]
                 after:bg-[#E6FDFB] after:left-[130px] after:top-[40px]
                 after:shadow-[16px_40px_0_-10px_white]
                 after:opacity-80"
    >
      <span className="relative z-10 text-white font-medium">{text}</span>
    </motion.button>
  );
};

export default BubbleButton;