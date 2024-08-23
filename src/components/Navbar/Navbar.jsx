import React from "react";
import Logo from "../Logo";
import Button from "../Button";
// import ImageCarousel from "../ImageCarousel"


// const images = [
//   "https://images.unsplash.com/photo-1422565096762-bdb997a56a84?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=2034&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?q=80&w=1949&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// ];

const Navbar = () => {
  

    return (
      <nav className="z-50 bg-sage p-4 flex justify-between items-center w-screen">
        {/* <ImageCarousel images={images} /> */}
        <Logo />
        <div className="mr-8 hidden lg:block">
          {/* <a href="#contact" className="text-puce hover:text-nude transition-colors duration-300">
            Contact Me
          </a> */}
          <Button text={"Contact Me"} to={"contact"}/>
        </div>
      </nav>
    );
  };
  
  export default Navbar;