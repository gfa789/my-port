import React, { useState } from "react";
import Logo from "../Logo";
import Button from "../Button";
import { X } from 'lucide-react';

const Banner = ({ onClose }) => {
  return (
    <div className="w-full bg-gradient-to-r from-sagegreen/70 to-sage/70 backdrop-blur-sm px-4 py-2 text-puce">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex-grow text-center">
          <p className="text-sm sm:text-base">
            Check out my project OverWater{' '}
            <a 
              href="https://your-overwater-url.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-puce underline font-medium hover:text-white transition-colors"
            >
              here
            </a>
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

const Navbar = () => {
  const [showBanner, setShowBanner] = useState(false);

  return (
    <div className="sticky top-0 z-[60] w-full">
      <nav className="bg-sage p-4 flex justify-between items-center w-full">
        <Logo />
        <div className="mr-8 hidden lg:flex gap-4">
          <Button text="Contact Me" to="contact"/>
        </div>
      </nav>
      {showBanner && <Banner onClose={() => setShowBanner(false)} />}
    </div>
  );
};

export default Navbar;