import React, { useState } from 'react';
import { Mail, Phone, MapPin, Globe, ArrowUpRight, Lock } from 'lucide-react';

export default function Footer({ onContactClick, onAdminClick }) {
  const [selectedLang, setSelectedLang] = useState('En');

  const languages = ['En', 'Es', 'Fr', 'De', 'Ru'];

  return (
    <footer className="pt-20 pb-12 border-t border-purple-500/15 relative bg-[#040209] overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-48 bg-purple-900/10 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-purple-500/15">
          
          {/* Left Column: Brand & Nav links */}
          <div className="md:col-span-6 flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="font-heading font-extrabold text-3xl tracking-wider text-white">
                  Hoosty
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 purple-glow-sm"></span>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm max-w-sm leading-relaxed mb-8">
                Autonomous AI infrastructure designed for ambitious businesses looking to maximize operational output and eliminate inefficiencies.
              </p>
            </div>

            {/* Navigation links formatted exactly as design: Service / Why Choose / Product / Contact / Document */}
            <div className="flex flex-wrap items-center gap-y-2 text-xs sm:text-sm text-gray-400 font-medium font-mono-tech">
              <a href="#service" className="hover:text-purple-300 transition-colors">Service</a>
              <span className="mx-2.5 text-gray-600">/</span>
              <a href="#why-choose-us" className="hover:text-purple-300 transition-colors">Why Choose</a>
              <span className="mx-2.5 text-gray-600">/</span>
              <a href="#product" className="hover:text-purple-300 transition-colors">Product</a>
              <span className="mx-2.5 text-gray-600">/</span>
              <button onClick={onContactClick} className="hover:text-purple-300 transition-colors cursor-pointer">Contact</button>
              <span className="mx-2.5 text-gray-600">/</span>
              <a href="#document" className="hover:text-purple-300 transition-colors">Document</a>
            </div>
          </div>

          {/* Right Column: Contact Details, Location, and Languages */}
          <div className="md:col-span-6 flex flex-col justify-between md:items-end text-left md:text-right space-y-8">
            
            {/* Contact Details */}
            <div className="space-y-2">
              <span className="text-xs font-mono-tech text-gray-400 uppercase tracking-widest block font-bold">
                Contact Us
              </span>
              <a 
                href="tel:+19998887766" 
                className="block font-heading text-lg sm:text-xl font-bold text-white hover:text-purple-300 transition-colors"
              >
                +1 (999) 888-77-66
              </a>
              <a 
                href="mailto:hello@niskalastd.com" 
                className="block text-xs sm:text-sm text-purple-300 hover:text-white transition-colors"
              >
                hello@niskalastd.com
              </a>
            </div>

            {/* Location */}
            <div className="space-y-1">
              <span className="text-xs font-mono-tech text-gray-400 uppercase tracking-widest block font-bold">
                Location
              </span>
              <p className="text-xs sm:text-sm text-gray-300">
                483920, Indonesia,
              </p>
              <p className="text-xs sm:text-sm text-gray-400">
                Lampung 22/2/5, Office 4
              </p>
            </div>

            {/* Languages Selector */}
            <div className="pt-2">
              <span className="text-xs font-mono-tech text-gray-400 uppercase tracking-widest block font-bold mb-2">
                Languages
              </span>
              <div className="flex items-center md:justify-end gap-3 text-xs font-mono-tech">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLang(lang)}
                    className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                      selectedLang === lang 
                        ? 'text-white font-bold bg-purple-600/60 border border-purple-400/40 shadow-sm' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} Hoosty Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <button 
              type="button"
              onClick={onAdminClick} 
              className="flex items-center gap-1.5 text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
