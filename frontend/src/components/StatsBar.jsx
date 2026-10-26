import React from 'react';

export default function StatsBar({ onJoinNow }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 -mt-4 mb-20 relative z-20">
      <div className="glass-panel rounded-3xl p-4 sm:p-6 lg:p-7 border border-purple-500/20 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
        
        {/* Left Stats Section */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-8 w-full lg:w-auto">
          {/* Stat 1 */}
          <div className="flex flex-col items-center sm:items-start">
            <span className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              125k<span className="text-purple-400">+</span>
            </span>
            <span className="text-gray-400 text-xs font-medium mt-0.5">
              Happy Client
            </span>
          </div>

          {/* Join Now Button */}
          <button 
            onClick={onJoinNow}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs sm:text-sm tracking-wide purple-glow-sm hover:purple-glow hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md"
          >
            Join Now
          </button>

          {/* Stat 2 */}
          <div className="flex flex-col items-center sm:items-start pl-2 sm:pl-4 border-l border-white/10">
            <span className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              95<span className="text-purple-400">%</span>
            </span>
            <span className="text-gray-400 text-xs font-medium mt-0.5">
              Growth
            </span>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center sm:items-start pl-2 sm:pl-4 border-l border-white/10">
            <span className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              25
            </span>
            <span className="text-gray-400 text-xs font-medium mt-0.5">
              Years
            </span>
          </div>
        </div>

        {/* Divider for desktop */}
        <div className="hidden lg:flex items-center text-purple-400/30 text-lg font-mono px-2 select-none">
          |
        </div>

        {/* Right Sponsor Logos Section */}
        <div className="flex flex-wrap items-center justify-center lg:justify-end gap-6 sm:gap-8 w-full lg:w-auto">
          <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase font-mono-tech">
            Trusted by.
          </span>

          <div className="flex flex-wrap items-center gap-6 sm:gap-8 opacity-75">
            {/* Niscola.io */}
            <span className="font-heading font-bold text-sm tracking-wider text-gray-300 hover:text-white transition-colors cursor-default">
              Niscola.io
            </span>

            {/* SAMTIV */}
            <span className="font-mono-tech font-extrabold text-sm tracking-widest text-gray-300 hover:text-white transition-colors cursor-default">
              SAMTIV
            </span>

            {/* IEA */}
            <span className="flex items-center gap-1 font-heading font-black text-sm tracking-widest text-gray-300 hover:text-white transition-colors cursor-default">
              <span className="text-purple-400 text-xs">✳</span> IEA.
            </span>

            {/* BOEING */}
            <span className="font-heading font-extrabold text-sm tracking-wider text-gray-300 hover:text-white transition-colors cursor-default border-l-2 border-purple-500 pl-2">
              BOEING
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
