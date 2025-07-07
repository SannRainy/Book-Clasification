'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useState } from 'react'

const inter = Inter({ subsets: ["latin"] });

// Komponen Navbar
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Function untuk mengecek apakah link aktif
  const isActive = (path) => {
    return pathname === path;
  };

  // Function untuk styling link aktif
  const getLinkClass = (path, isMobile = false) => {
    const baseClass = isMobile 
      ? "block px-3 py-2 transition-all duration-200 font-medium rounded-md"
      : "transition-colors duration-200 font-medium relative";
    
    if (isActive(path)) {
      return isMobile 
        ? `${baseClass} text-white bg-emerald-500/20 border-l-4 border-white shadow-lg`
        : `${baseClass} text-white`;
    }
    
    return isMobile 
      ? `${baseClass} text-emerald-50 hover:text-white hover:bg-emerald-500/20`
      : `${baseClass} text-emerald-50 hover:text-white`;
  };

  return (
<nav className="bg-gradient-to-r from-green-900 via-emerald-800 to-green-900 backdrop-blur-xl border-b border-emerald-300/30 sticky top-0 z-50 shadow-xl">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center h-16 relative">
          {/* Logo dan Brand - Absolute Left */}
          <div className="absolute left-0 flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-xl rounded-xl flex items-center justify-center shadow-lg border border-white/30">
              <span className="text-white text-xl font-bold drop-shadow-md">🍃</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white drop-shadow-md">
                TeaLeaf 
              </h1>
            </div>
          </div>
          
          {/* Navigation Menu - Center */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className={getLinkClass('/')}>
              <span className="text-xl drop-shadow-sm">Home</span>
              {isActive('/') && (
                <span className="absolute -bottom-4 left-0 right-0 h-0.5 bg-white rounded-full shadow-lg"></span>
              )}
            </Link>
            <a href="/klasifikasi" className={getLinkClass('/klasifikasi')}>
            <span className="text-xl drop-shadow-sm">Classification</span>
              {isActive('/klasifikasi') && (
                <span className="absolute -bottom-4 left-0 right-0 h-0.5 bg-white rounded-full shadow-lg"></span>
              )}
            </a>
            <Link href="/about" className={getLinkClass('/about')}>
            <span className="text-xl drop-shadow-sm"> About Our</span>
              {isActive('/about') && (
                <span className="absolute -bottom-4 left-0 right-0 h-0.5 bg-white rounded-full shadow-lg"></span>
              )}
            </Link>
          </div>
          
          {/* Mobile Menu Button - Absolute Right */}
          <div className="absolute right-0 md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-emerald-50 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-white/20"
              aria-label="Toggle menu"
            >
              {/* Hamburger Icon */}
              <div className="w-6 h-6 relative">
                <span 
                  className={`block absolute h-0.5 w-6 bg-current transition-all duration-300 drop-shadow-sm ${
                    isMenuOpen ? 'rotate-45 top-3' : 'top-1'
                  }`}
                ></span>
                <span 
                  className={`block absolute h-0.5 w-6 bg-current transition-all duration-300 top-3 drop-shadow-sm ${
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                ></span>
                <span 
                  className={`block absolute h-0.5 w-6 bg-current transition-all duration-300 drop-shadow-sm ${
                    isMenuOpen ? '-rotate-45 top-3' : 'top-5'
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-emerald-500/90 backdrop-blur-xl rounded-lg mt-2 shadow-xl border border-emerald-300/30">
            <Link 
              href="/" 
              onClick={() => setIsMenuOpen(false)}
              className={getLinkClass('/', true)}
            >
              <div className="flex items-center justify-between">
                Home
                {isActive('/') && (
                  <span className="w-2 h-2 bg-white rounded-full shadow-md"></span>
                )}
              </div>
            </Link>
            <a 
              href="/klasifikasi" 
              onClick={() => setIsMenuOpen(false)}
              className={getLinkClass('/klasifikasi', true)}
            >
              <div className="flex items-center justify-between">
                Classification
                {isActive('/klasifikasi') && (
                  <span className="w-2 h-2 bg-white rounded-full shadow-md"></span>
                )}
              </div>
            </a>
            <Link 
              href="/about" 
              onClick={() => setIsMenuOpen(false)}
              className={getLinkClass('/about', true)}
            >
              <div className="flex items-center justify-between">
                About Our
                {isActive('/about') && (
                  <span className="w-2 h-2 bg-white rounded-full shadow-md"></span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Komponen Footer
function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-900 via-emerald-800 to-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-xl flex items-center justify-center">
                <span className="text-white text-2xl font-bold">🍃</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">TeaLeaf</h3>
                <p className="text-emerald-100">Klasifikasi Hama Daun Teh</p>
              </div>
            </div>
            <p className="text-emerald-100 text-sm leading-relaxed max-w-md">
              Platform AI yang membantu petani teh mengidentifikasi hama pada daun teh dengan teknologi 
              Deep Learning CNN untuk meningkatkan produktivitas dan kualitas panen teh Anda.
            </p>
            
           
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className="text-emerald-100 hover:text-white transition-colors duration-200 text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <a 
                  href="/klasifikasi" 
                  className="text-emerald-100 hover:text-white transition-colors duration-200 text-sm"
                >
                  Classification
                </a>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-emerald-100 hover:text-white transition-colors duration-200 text-sm"
                >
                  About Me
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-emerald-100 text-sm">
                <span>📧</span>
                <span>info@tealeafai.com</span>
              </li>
              <li className="flex items-center space-x-2 text-emerald-100 text-sm">
                <span>📱</span>
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center space-x-2 text-emerald-100 text-sm">
                <span>📍</span>
                <span>Madiun, Jawa Timur, Indonesia</span>
              </li>
              <li className="flex items-center space-x-2 text-emerald-100 text-sm">
                <span>🕒</span>
                <span>24/7 AI Service</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-emerald-100 text-sm">
              © 2025 TeaLeaf AI. All rights reserved. Made with ❤️ for Indonesian Tea Farmers.
            </p>
            <div className="flex space-x-6">
              <a 
                href="#" 
                className="text-emerald-100 hover:text-white transition-colors duration-200 text-sm"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-emerald-100 hover:text-white transition-colors duration-200 text-sm"
              >
                Terms of Service
              </a>
              <a 
                href="#" 
                className="text-emerald-100 hover:text-white transition-colors duration-200 text-sm"
              >
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}