import { useState, useEffect } from 'react';
import SearchMovie from '../container/SearchMovie';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/icons/tv-logo.svg';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isBlur, setIsBlur] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsBlur(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed z-20 top-0 left-0 right-0 transition-all duration-300 ${
        isBlur ? 'bg-black/60 backdrop-blur-md shadow' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center md:py-6.5 px-6 md:px-35 gap-1.5">
        <img src={logo} alt="Logo" className="w-8 h-8"/>
        <span className="text-white font-semibold text-2xl md:text-3xl tracking-wide ml-2">Movie</span>
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-12 ml-20">
          <NavLink
            to="/"
            className={({isActive}) => `text-white text-md font-regular hover:text-red-500 transition${isActive ? " text-red-500" : ""}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/favorites"
            className={({isActive}) => `text-white text-md font-regular hover:text-red-500 transition${isActive ? " text-red-500" : ""}`}
          >
            Favorites
          </NavLink>
        </div>
        {/* Mobile Hamburger */}
        <button
          className="md:hidden ml-auto text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
        {/* Search */}
        <div className="ml-auto hidden md:block">
          <SearchMovie />
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 px-6 pb-4">
          <NavLink
            to="/"
            className="block py-2 text-white hover:text-red-500"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/favorites"
            className="block py-2 text-white hover:text-red-500"
            onClick={() => setMenuOpen(false)}
          >
            Favorites
          </NavLink>
          <SearchMovie />
          
        </div>
      )}
    </nav>
  );
};

export default NavBar;