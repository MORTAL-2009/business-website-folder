import React from 'react';
import { Play, Sparkles, ArrowRight } from 'lucide-react';
import bannerFlow from '../assets/banner-flow.jpg';

export default function VideoBanner({ onTryTools, onPlayVideo }) {
  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Banner Glass Container */}
        <div className="relative rounded-3xl overflow-hidden glass-panel border border-purple-500/30 p-8 sm:p-12 lg:p-16 shadow-[0_0_50px_rgba(168,85,247,0.2)] group">
          
          {/* Background Flowing Neon Wave Artwork */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <img 
              src={bannerFlow} 
              alt="Luminous Purple Flow Ribbon" 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 opacity-60 mix-blend-screen"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#06040d]/90 via-[#06040d]/60 to-[#06040d]/90" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-5 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-purple-400/30 text-purple-300 text-xs font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>AI-Powered</span>
              </div>

              {/* Title */}
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
                Ready To Maximize Your Profits?
              </h2>

              {/* Action Button */}
              <button 
                onClick={onTryTools}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs sm:text-sm tracking-wide purple-glow hover:purple-glow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg"
              >
                Try AI Tools
              </button>
            </div>

            {/* Center Interactive Play Button */}
            <div className="lg:col-span-2 flex items-center justify-center my-6 lg:my-0">
              <button 
                onClick={onPlayVideo}
                className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full glass-panel border-2 border-purple-400/50 flex items-center justify-center text-white hover:scale-115 active:scale-95 transition-all duration-300 cursor-pointer shadow-[0_0_30px_rgba(168,85,247,0.5)] group/play"
                aria-label="Play interactive demo"
              >
                {/* Ripple glow animation */}
                <span className="absolute inset-0 rounded-full border border-purple-400/40 animate-ping opacity-75 pointer-events-none"></span>
                <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-white ml-1 group-hover/play:scale-110 transition-transform" />
              </button>
            </div>

            {/* Right Work Smarter Callout */}
            <div className="lg:col-span-5 lg:pl-10 text-left lg:text-right flex flex-col lg:items-end">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-2">
                Work Smarter.
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-sm">
                Our AI solutions boost ROI by enhancing efficiency and cutting redundant operational costs across your enterprise.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
