import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import Logo from "../Logo";
import Button from "../Button";
import Banner from "../Banner/Banner";

const Navbar = () => {
  const [showBanner, setShowBanner] = useState(true);
  const location = useLocation();
  const isOverWater = location.pathname === '/overwater' || location.pathname === '/overwater/';

  return (
    <div className="sticky top-0 z-[60] w-full">
      <nav className={`${isOverWater ? '' : 'bg-sage'} p-4 flex justify-between items-center w-full`}>
        <Logo />
        <div className="mr-8 hidden lg:flex gap-4">
          <Button text="Contact Me" to="contact"/>
        </div>
      </nav>
      {!isOverWater && showBanner && <Banner onClose={() => setShowBanner(false)} />}
    </div>
  );
};

export default Navbar;