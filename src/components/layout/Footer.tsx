import React from "react";
import logo from "../../assets/icons/tv-logo.svg";
const Footer: React.FC = () => (
  
  <footer>
  <div className="flex items-center py-6.5 px-35 gap-1.5">
    <img src={logo} alt="Logo"/>
    <span className="text-white font-semibold text-3xl tracking-wide">Movie</span>
    <span className="text-neutral-600 text-md font-regular ml-auto">
      Copyright © {new Date().getFullYear()} Movie Explorer</span>
  </div>
  {/* <footer className="text-left text-gray-500 py-6 text-sm bg-transparent px-4 md:px-10">
   © Movie {new Date().getFullYear()} | All rights reserved.
  </footer>   */}
</footer>
);

export default Footer;