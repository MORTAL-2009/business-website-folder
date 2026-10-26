import React from 'react';
import { Play, ArrowUpRight, ArrowRight, Sparkles } from 'lucide-react';
import heroOrbDefault from '../assets/hero-orb.jpg';
import { useContent } from '../context/ContentContext';

export default function Hero({ onGetStarted, onPlayVideo }) {
  const { content } = useContent();
  const hero = content?.hero || {};

  return (
    <section className="relative min-h-[90vh] pt-32 pb-16 flex flex-col justify-center overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-gradient-to-tr from-purple-900/30 via-indigo-900/20 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-purple-600/15 rounded-full blur-[90px] pointer-events-none -z-10 animate-pulse-glow" />

      {/* Massive Watermark Text Behind Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-full select-none pointer-events-none -z-1 text-center">
        <span className="font-heading font-black text-[13vw] tracking-[0.22em] text-purple-400/[0.06] whitespace-nowrap block">
          {hero.watermark || 'INTELLIGENT'}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full relative">
        
        {/* Top Tag & HUD Annotations Grid */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wide shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping"></span>
            <span>{hero.badge || 'Next-Level Business'}</span>
          </div>

          {/* Top Right HUD Annotations */}
          <div className="hidden lg:flex flex-col gap-3 font-mono-tech text-xs text-gray-400 pl-8">
            <div className="flex items-center gap-3 group cursor-default">
              <span className="h-[1px] w-12 bg-purple-500/40 group-hover:w-16 transition-all duration-300"></span>
              <span className="text-gray-300">{hero.hudStrategy || 'Future-Ready Strategies'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="flex items-center gap-3 group cursor-default">
              <span className="h-[1px] w-16 bg-purple-500/40 group-hover:w-20 transition-all duration-300"></span>
              <span className="text-gray-300">{hero.hudSupport || '24/7 Customer Support'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Hero Center Grid: Headline, 3D Sphere, and CTAs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[460px]">
          
          {/* Left Headline */}
          <div className="lg:col-span-4 z-10 text-left">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] whitespace-pre-line">
              {hero.headline || "Boost Efficiency,\nMaximize Profits."}
            </h1>
          </div>

          {/* Center 3D Floating Sphere */}
          <div className="lg:col-span-4 flex items-center justify-center relative my-6 lg:my-0">
            <div className="relative group">
              {/* Backlight reflection glow */}
              <div className="absolute inset-0 bg-purple-600/30 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-700 -z-10 scale-95" />
              
              {/* 3D Iridescent Sphere */}
              <div className="w-64 h-64 sm:w-76 sm:h-76 md:w-84 md:h-84 rounded-full overflow-hidden p-1 relative animate-float">
                <img 
                  src={hero.orbImage || heroOrbDefault} 
                  alt="Hoosty Intelligent AI Core Orb" 
                  className="w-full h-full object-cover rounded-full mix-blend-screen scale-105 filter drop-shadow-[0_15px_35px_rgba(168,85,247,0.5)] transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Decorative orbital ring */}
              <div className="absolute -inset-4 border border-purple-500/20 rounded-full pointer-events-none animate-[spin_24s_linear_infinite]" />
            </div>
          </div>

          {/* Right Subtext and CTA */}
          <div className="lg:col-span-4 z-10 flex flex-col items-start lg:items-start text-left gap-6 lg:pl-6">
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-sm">
              {hero.subtext || "Use our AI tools to automate tasks, cut costs, and enhance your bottom line with intelligent precision."}
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              <button 
                onClick={onGetStarted}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 text-white font-semibold text-sm tracking-wide purple-glow hover:purple-glow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-lg shadow-purple-600/40"
              >
                {hero.ctaText || "Get Started"}
              </button>

              {/* Play Video Button */}
              <button 
                onClick={onPlayVideo}
                className="w-12 h-12 rounded-full glass-panel border border-purple-500/30 flex items-center justify-center text-purple-300 hover:text-white hover:bg-purple-600/30 hover:border-purple-400 hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.25)]"
                aria-label="Watch demo video"
              >
                <Play className="w-4 h-4 fill-purple-300 ml-0.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
