import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import productRibbon from '../assets/product-ribbon.jpg';
import productChrome from '../assets/product-chrome.jpg';
import productSculpture from '../assets/product-sculpture.jpg';

export default function ProductSection({ onExploreProduct }) {
  const products = [
    {
      num: '02/',
      tag: 'EfficioAI',
      title: 'Automate workflows for efficiency.',
      image: productRibbon,
      alt: 'Automate workflows with EfficioAI',
      glow: 'from-purple-900/40 to-indigo-900/30'
    },
    {
      num: '03/',
      tag: 'OptiFlow',
      title: 'Effortlessly optimize workflows with AI.',
      image: productChrome,
      alt: 'Optimize workflows with OptiFlow',
      glow: 'from-indigo-900/40 to-purple-900/30'
    },
    {
      num: '04/',
      tag: 'OptiFlow',
      title: 'Guide your business to higher profits using AI.',
      image: productSculpture,
      alt: 'Higher profits with OptiFlow',
      glow: 'from-purple-950/40 to-fuchsia-950/30'
    }
  ];

  return (
    <section id="product" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 text-left">
          <span className="text-purple-400 font-mono-tech text-xs tracking-widest uppercase font-bold block mb-2">
            OUR PRODUCT
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Maximize ROI with Efficiency-Driven AI.
          </h2>
        </div>

        {/* 3 Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((item, idx) => (
            <div 
              key={idx}
              className="glass-panel rounded-3xl p-6 sm:p-7 border border-purple-500/25 flex flex-col justify-between relative overflow-hidden group hover:border-purple-400/60 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)] transition-all duration-300 min-h-[440px]"
            >
              {/* Top Row: Index number & Tech Icon */}
              <div className="flex items-center justify-between z-10">
                <span className="font-mono-tech text-xs sm:text-sm font-semibold text-gray-400">
                  {item.num}
                </span>
                <div className="w-7 h-7 rounded-full border border-purple-400/40 flex items-center justify-center bg-purple-950/40 text-purple-300">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                </div>
              </div>

              {/* Center Artwork Visual */}
              <div className="my-6 h-48 w-full rounded-2xl overflow-hidden relative z-10">
                <img 
                  src={item.image} 
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090514]/80 via-transparent to-transparent" />
              </div>

              {/* Bottom Content: Tag, Title, and Action Link */}
              <div className="z-10 text-left">
                <span className="text-xs font-mono-tech text-purple-400 block mb-1">
                  [{item.tag}]
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-4 leading-snug">
                  {item.title}
                </h3>

                <button 
                  onClick={() => onExploreProduct(item.tag)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-purple-300 hover:text-white transition-colors group/link cursor-pointer"
                >
                  <span>Explore more</span>
                  <span className="w-6 h-6 rounded-full bg-purple-600/80 flex items-center justify-center text-white group-hover/link:bg-purple-500 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all shadow-md">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              </div>

              {/* Ambient Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-b ${item.glow} opacity-30 pointer-events-none -z-10`} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
