import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Plus, Sparkles, Lock } from 'lucide-react';

export default function Navbar({ onContactClick, onAdminClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-5 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Pill Navigation */}
        <div className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full glass-pill text-xs font-medium text-gray-300">
          <a 
            href="#service" 
            className="flex items-center gap-1 hover:text-white transition-colors px-2 py-0.5 rounded-full hover:bg-white/5"
          >
            <span>Service</span>
            <Plus className="w-3 h-3 text-purple-400" />
          </a>
          <span className="text-gray-500 font-mono">••</span>
          <a 
            href="#product" 
            className="flex items-center gap-1 hover:text-white transition-colors px-2 py-0.5 rounded-full hover:bg-white/5"
          >
            <span>Product</span>
            <ArrowUpRight className="w-3 h-3 text-purple-400 rotate-45" />
          </a>
        </div>

        {/* Center Brand Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="font-heading font-extrabold text-2xl tracking-wider text-white group-hover:text-purple-300 transition-colors">
            Hoosty
          </span>
          <span className="w-2 h-2 rounded-full bg-purple-500 purple-glow-sm"></span>
        </a>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-medium text-gray-200 hover:border-purple-400/50 transition-all cursor-pointer"
          >
            <span className="hidden sm:inline">Menu</span>
            <span className="w-6 h-6 rounded-full bg-purple-600/80 flex items-center justify-center text-white">
              {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
            </span>
          </button>

          {/* Contact Us Button */}
          <button 
            onClick={onContactClick}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs sm:text-sm font-semibold tracking-wide purple-glow-sm hover:purple-glow hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg shadow-purple-600/30"
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 max-w-sm mx-auto glass-panel p-5 rounded-3xl border border-purple-500/30 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-3 text-sm">
            <a 
              href="#service" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl hover:bg-purple-900/40 text-gray-200 hover:text-white transition-colors flex items-center justify-between"
            >
              <span>Service</span>
              <Plus className="w-4 h-4 text-purple-400" />
            </a>
            <a 
              href="#product" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl hover:bg-purple-900/40 text-gray-200 hover:text-white transition-colors flex items-center justify-between"
            >
              <span>Product</span>
              <ArrowUpRight className="w-4 h-4 text-purple-400" />
            </a>
            <a 
              href="#why-choose-us" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl hover:bg-purple-900/40 text-gray-200 hover:text-white transition-colors flex items-center justify-between"
            >
              <span>Why Choose Us</span>
              <Sparkles className="w-4 h-4 text-purple-400" />
            </a>
            <a 
              href="#testimonials" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl hover:bg-purple-900/40 text-gray-200 hover:text-white transition-colors"
            >
              Testimonials
            </a>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onAdminClick) onAdminClick();
              }}
              className="mt-2 px-4 py-2.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-300 hover:text-white hover:bg-purple-900/60 transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>Admin Portal</span>
              <Lock className="w-3.5 h-3.5 text-purple-400" />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
