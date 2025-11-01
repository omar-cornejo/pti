import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header({ style = 'dark', position = 'static' }) {
  const location = useLocation();
  const { token, username, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLink = (label, path) => {
    const isActive = location.pathname === path;
    return (
      <Link
        to={path}
        className={`text-sm font-medium uppercase tracking-wider transition-colors duration-300 
          ${isActive
            ? 'text-black border-b-2 border-black pb-1'
            : 'text-gray-600 hover:text-black'}`}
      >
        [ {label} ]
      </Link>
    );
  };

  const positionClass = {
    fixed: 'fixed top-0 left-0 right-0 z-50',
    absolute: 'absolute top-0 left-0 right-0 z-50',
    static: 'relative z-40'
  }[position] || 'relative z-40';

  return (
    <header className={`bg-white h-20 ${positionClass} border-b border-gray-100`}>
      <div className="container mx-auto flex justify-between items-center px-8 h-full">
        {/* Left: Brand */}
        <Link to="/" className="flex items-center">
          <h1 className="text-xl font-black tracking-wider text-black uppercase">
            TrendLens
          </h1>
        </Link>

        {/* Center: Nav */}
        <nav className="hidden md:flex items-center space-x-12">
          {navLink('HOME', '/')}
          {navLink('FEATURES', '/features')}
          {navLink('GALLERY', '/gallery')}
        </nav>

        {/* Right: User or Auth */}
        <div className="flex items-center">
          {!token ? (
            <div className="flex items-center space-x-6">
              <Link 
                to="/login" 
                className="text-sm font-medium uppercase tracking-wider text-gray-600 hover:text-black transition-colors duration-300"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="text-sm font-medium uppercase tracking-wider text-black hover:text-gray-600 transition-colors duration-300 border-b border-black hover:border-gray-600 pb-1"
              >
                Register →
              </Link>
            </div>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 cursor-pointer focus:outline-none"
              >
                <div className="flex items-center space-x-3">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(username || 'User')}&background=000000&color=fff`}
                    alt="User" 
                    className="w-8 h-8 rounded-full border border-gray-300" 
                  />
                  <span className="text-sm font-medium text-gray-800 hidden sm:block">
                    {username}
                  </span>
                  <svg 
                    className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
                  <Link 
                    to="/dashboard" 
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => {
                      setIsDropdownOpen(false);
                      logout();
                    }}
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-100 w-full text-left"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}