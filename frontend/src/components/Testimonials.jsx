import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import testimonialWave from '../assets/testimonial-wave.jpg';

export default function Testimonials() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const testimonials = [
    {
      quote: "Using this has transformed the way we work. Tasks that used to take hours are now completed in minutes. It's a game-changer for our team!",
      author: "Mark L.",
      role: "IT Specialist",
      featuredName: "Anna K.",
      featuredRole: "Business Strategist"
    },
    {
      quote: "The autonomous agent workflows lowered our operational overhead by 42% in just two quarters. Hoosty's accuracy is unmatched in the industry.",
      author: "Elena Rostova",
      role: "VP of Product Engineering",
      featuredName: "David C.",
      featuredRole: "Operations Lead"
    },
    {
      quote: "Seamless integration into our existing stack. Our engineers spend less time managing pipelines and more time innovating on core models.",
      author: "Siddharth Verma",
      role: "Chief Technology Officer",
      featuredName: "Claire M.",
      featuredRole: "Principal Data Architect"
    }
  ];

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIdx];

  return (
    <section id="testimonials" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header & Nav Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="text-left">
            <span className="text-purple-400 font-mono-tech text-xs tracking-widest uppercase font-bold block mb-2">
              TESTIMONIALS
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Future of
              <br />
              Efficiency is Here
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button 
              onClick={handlePrev}
              className="w-10 h-10 rounded-full glass-panel border border-purple-500/30 flex items-center justify-center text-purple-300 hover:text-white hover:bg-purple-600/30 hover:border-purple-400 transition-all cursor-pointer shadow-sm active:scale-90"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white purple-glow-sm hover:purple-glow hover:scale-105 active:scale-90 transition-all cursor-pointer shadow-md"
              aria-label="Next testimonial"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Quote Card */}
          <div className="lg:col-span-8 glass-panel rounded-3xl p-8 sm:p-10 border border-purple-500/25 flex flex-col justify-between relative shadow-2xl overflow-hidden group">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Large Quote Mark */}
            <div className="text-purple-400/80 mb-6 z-10">
              <Quote className="w-12 h-12 fill-purple-400/20 text-purple-400" />
            </div>

            {/* Testimonial Quote */}
            <p className="text-gray-100 text-base sm:text-xl lg:text-2xl font-normal leading-relaxed z-10 my-4 max-w-2xl text-left">
              "{current.quote}"
            </p>

            {/* Author Attribution */}
            <div className="mt-8 pt-6 border-t border-purple-500/15 flex items-center justify-between z-10">
              <div className="text-left">
                <h4 className="font-heading font-bold text-white text-base">
                  {current.author}
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
                  {current.role}
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIdx(i)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      currentIdx === i ? 'w-6 bg-purple-400' : 'w-2 bg-purple-900/60 hover:bg-purple-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Visual / Strategist Persona Card */}
          <div className="lg:col-span-4 glass-panel rounded-3xl p-6 sm:p-7 border border-purple-500/25 flex flex-col justify-between relative overflow-hidden shadow-2xl">
            {/* Header info */}
            <div className="text-left mb-4 z-10">
              <h4 className="font-heading font-bold text-white text-base">
                {current.featuredName}
              </h4>
              <p className="text-purple-300 text-xs mt-0.5">
                {current.featuredRole}
              </p>
            </div>

            {/* Smooth Neon Silk Artwork */}
            <div className="w-full h-52 rounded-2xl overflow-hidden relative z-10">
              <img 
                src={testimonialWave} 
                alt="AI Strategy Aesthetic Art" 
                className="w-full h-full object-cover rounded-2xl opacity-90 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06040d]/60 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="mt-4 pt-3 text-center border-t border-purple-500/10 z-10">
              <span className="text-[11px] font-mono-tech text-gray-400">
                Verified Enterprise Partner
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
