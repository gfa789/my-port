import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import Logo from "../Logo";
import Button from "../Button";
import { FiMail, FiMenu, FiX } from "react-icons/fi";
import { GiBigWave } from "react-icons/gi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isOverWater = location.pathname === '/overwater' || location.pathname === '/overwater/';

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sticky top-0 z-[60] w-full">
      <nav className={`${isOverWater ? '' : 'bg-sage'} p-4 flex justify-between items-center w-full relative`}>
        <Logo />
        
        {/* Mobile Menu Button */}
        {`${isOverWater}` ? <></> :
        <button 
          onClick={toggleMenu}
          className={`lg:hidden p-2 focus:outline-none ${isOverWater? 'text-white' : 'text-puce'}`}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <FiX className="h-6 w-6" />
          ) : (
            <FiMenu className="h-6 w-6" />
          )}
        </button>}
        

        {/* Desktop Navigation */}
        <div className="mr-8 hidden lg:flex gap-4">
          <Button text="Contact Me" to="contact" icon={<FiMail />}/>
          <a href="/overwater">
            <Button text="OverWater" icon={<GiBigWave />} water={true}/>
          </a>
        </div>

        {/* Mobile Dropdown Menu */}
        {`${isOverWater}` ? <></> : 
        <div className={`
          lg:hidden 
          absolute 
          top-full 
          left-0 
          right-0
          shadow-lg
          transition-all 
          duration-300 
          ease-in-out
          ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
          ${isOverWater ? '' : 'bg-sage'}
        `}>
          <div className="flex flex-col p-4 space-y-4">
          <Button text="Contact Me" to="contact" icon={<FiMail />}/>
          <Button text="OverWater" icon={<GiBigWave />} link="/overwater" water={true}/>
          </div>
        </div>}
      </nav>
    </div>
  );
};

export default Navbar;