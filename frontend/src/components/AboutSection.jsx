import React from 'react';
import { ArrowDown, CheckCircle2, Zap, ShieldCheck } from 'lucide-react';
import aboutRibbon from '../assets/about-ribbon.jpg';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background Subtle Glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-purple-900/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Visual Card with 3D Chrome Ribbon & Overlay */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden glass-panel border border-purple-500/25 group shadow-2xl">
              
              {/* Background 3D Ribbon Art */}
              <div className="h-[340px] sm:h-[400px] w-full overflow-hidden relative">
                <img 
                  src={aboutRibbon} 
                  alt="AI Infrastructure Ribbon Flow" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090514] via-[#090514]/40 to-transparent" />
              </div>

              {/* Glass Overlay Card on Top Left / Center */}
              <div className="absolute bottom-6 left-6 right-6 p-5 sm:p-6 rounded-2xl glass-panel border border-purple-500/30 backdrop-blur-md shadow-xl">
                <p className="text-gray-200 text-xs sm:text-sm leading-relaxed mb-4">
                  Leverage our AI tools to automate repetitive tasks, reduce costs, and improve your bottom line seamlessly.
                </p>

                <div className="flex items-center justify-between">
                  <a 
                    href="#service"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-purple-300 hover:text-white transition-colors group/btn cursor-pointer"
                  >
                    <span>Service</span>
                    <span className="w-7 h-7 rounded-full bg-purple-600/80 flex items-center justify-center text-white group-hover/btn:bg-purple-500 group-hover/btn:translate-y-0.5 transition-all shadow-[0_0_10px_rgba(168,85,247,0.4)]">
                      <ArrowDown className="w-3.5 h-3.5" />
                    </span>
                  </a>

                  <span className="text-[11px] font-mono-tech text-gray-400">
                    Ecosystem v2.4
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Text Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Subtitle Badge */}
            <div className="mb-3">
              <span className="text-purple-400 font-mono-tech text-xs tracking-widest uppercase font-bold">
                ABOUT US
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.18] mb-6">
              Boost Efficiency, Maximize Profits with Smart AI Solutions.
            </h2>

            {/* Value Highlights */}
            <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
              <p>
                Hoosty empowers forward-thinking enterprises with hyper-automated machine intelligence. We bridge high-velocity data execution with self-optimizing business pipelines.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3 p-3.5 rounded-xl glass-panel-subtle border border-purple-500/15">
                  <Zap className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-sm">Ultra-Low Latency</h4>
                    <p className="text-gray-400 text-xs mt-0.5">Sub-millisecond decision pipelines</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl glass-panel-subtle border border-purple-500/15">
                  <ShieldCheck className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-sm">Enterprise Grade</h4>
                    <p className="text-gray-400 text-xs mt-0.5">Zero-trust security architecture</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
