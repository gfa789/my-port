import React from "react";

function Logo() {
    return (
      <div className="ml-8 ">
        <span className="hover:animate-wiggle hover:before:animate-shine bg-gradient-to-br from-white to-sagegreen font-dmserif text-6xl text-puce border-2 border-puce p-2 rounded inline-block overflow-hidden group cursor-pointer">
          <span className="relative z-10 italic inline-block transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:rotate-12 group-hover:scale-110">
            g
          </span>
          <span className="relative z-10 inline-block transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-x-1 group-hover:scale-125 origin-center group-hover:-rotate-2">
            A
          </span>
          <span className=" absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent
                       -translate-x-full group-hover:animate-shine" 
            style={{ '--shine-deg': '15deg' }}
      />
        </span>
      </div>
    );
}

export default Logo;