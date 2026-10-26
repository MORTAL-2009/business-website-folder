import React from 'react';
import { Globe, Crosshair, Cpu, ArrowUpRight } from 'lucide-react';
import aboutRibbon from '../assets/about-ribbon.jpg';
import heroOrb from '../assets/hero-orb.jpg';

export default function WhyChooseUs() {
  const features = [
    {
      title: 'Proven Expertise',
      description: 'Our team has deep AI experience, delivering tailored enterprise solutions that drive measurable growth.',
      icon: Globe,
    },
    {
      title: 'Custom AI Solutions',
      description: 'We create tools that fit your unique business workflows, seamlessly integrating with legacy and modern systems.',
      icon: Crosshair,
    },
    {
      title: 'Efficiency Redefined',
      description: 'We streamline core operations, eliminate manual bottlenecks, and boost productivity tenfold.',
      icon: Cpu,
    },
  ];

  return (
    <section id="why-choose-us" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="mb-12 text-left">
          <span className="text-purple-400 font-mono-tech text-xs tracking-widest uppercase font-bold block mb-2">
            WHY CHOOSE US
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Work Smarter,
            <br />
            Not Harder
          </h2>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Visual Artwork Card */}
          <div className="lg:col-span-4">
            <div className="rounded-3xl overflow-hidden glass-panel border border-purple-500/25 h-[380px] sm:h-[420px] relative group shadow-2xl">
              <img 
                src={aboutRibbon} 
                alt="Intelligent Architecture" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06040d] via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-panel-subtle border border-purple-400/20 backdrop-blur-md">
                <span className="text-xs font-mono-tech text-purple-300 font-semibold">
                  Intelligent Architecture
                </span>
                <p className="text-gray-300 text-[11px] mt-1">
                  Engineered for mission-critical reliability and precision.
                </p>
              </div>
            </div>
          </div>

          {/* Center Stacked Feature Cards */}
          <div className="lg:col-span-6 space-y-4">
            {features.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <div 
                  key={idx}
                  className="glass-panel rounded-2xl p-5 sm:p-6 border border-purple-500/20 flex items-center justify-between gap-6 hover:border-purple-400/50 hover:bg-purple-950/20 transition-all duration-300 group cursor-default"
                >
                  <div className="text-left">
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-white group-hover:text-purple-200 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm mt-1.5 leading-relaxed max-w-md">
                      {feat.description}
                    </p>
                  </div>

                  {/* Icon badge */}
                  <div className="w-10 h-10 rounded-full glass-pill border border-purple-400/30 flex items-center justify-center text-purple-300 shrink-0 group-hover:bg-purple-600/30 group-hover:border-purple-400 transition-all shadow-sm">
                    <IconComp className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Floating Mini 3D Orb */}
          <div className="lg:col-span-2 hidden lg:flex flex-col items-center justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-purple-600/25 rounded-full blur-xl animate-pulse-glow" />
              <div className="w-28 h-28 rounded-full overflow-hidden p-1 relative animate-float">
                <img 
                  src={heroOrb} 
                  alt="AI Orb Mini" 
                  className="w-full h-full object-cover rounded-full mix-blend-screen scale-110 filter drop-shadow-[0_10px_20px_rgba(168,85,247,0.4)]"
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
