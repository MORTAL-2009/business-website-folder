import React, { useState } from 'react';
import { X, Play, Pause, Activity, Cpu, Sparkles, Check } from 'lucide-react';
import bannerFlow from '../assets/banner-flow.jpg';

export default function VideoModal({ isOpen, onClose }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeStep, setActiveStep] = useState(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/40 shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full glass-pill border border-purple-400/30 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer z-20"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Video simulation screen */}
        <div className="relative rounded-2xl overflow-hidden border border-purple-500/30 bg-[#080514] min-h-[340px] flex flex-col justify-between p-6">
          <img 
            src={bannerFlow} 
            alt="AI Flow Simulation" 
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080514] via-[#080514]/60 to-transparent" />

          {/* Top telemetry HUD */}
          <div className="relative z-10 flex items-center justify-between text-xs font-mono-tech text-purple-300">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>LIVE AI ENGINE DEMO: Efficio v2.4</span>
            </div>
            <span>FPS: 60 | Latency: 1.2ms</span>
          </div>

          {/* Center Interactive Visualization */}
          <div className="relative z-10 my-8 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full border-2 border-purple-400/60 bg-purple-950/60 flex items-center justify-center text-purple-200 purple-glow mb-4">
              <Cpu className="w-9 h-9 animate-spin text-purple-300" style={{ animationDuration: '12s' }} />
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-2">
              Autonomous Multi-Agent Workflow Engine
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm max-w-md">
              Simulating real-time business task extraction, smart classification, cost routing, and automatic reconciliation.
            </p>
          </div>

          {/* Bottom Interactive Workflow Progress */}
          <div className="relative z-10 pt-4 border-t border-purple-500/20 grid grid-cols-3 gap-3 text-xs font-mono-tech">
            <div 
              onClick={() => setActiveStep(0)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                activeStep === 0 ? 'border-purple-400 bg-purple-900/40 text-white' : 'border-purple-500/10 text-gray-400 hover:text-white'
              }`}
            >
              <span className="block text-[10px] text-purple-300">01 / INGEST</span>
              <span>Input Pipeline</span>
            </div>

            <div 
              onClick={() => setActiveStep(1)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                activeStep === 1 ? 'border-purple-400 bg-purple-900/40 text-white shadow-sm' : 'border-purple-500/10 text-gray-400 hover:text-white'
              }`}
            >
              <span className="block text-[10px] text-purple-300">02 / PROCESS</span>
              <span>Neural Routing</span>
            </div>

            <div 
              onClick={() => setActiveStep(2)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                activeStep === 2 ? 'border-purple-400 bg-purple-900/40 text-white' : 'border-purple-500/10 text-gray-400 hover:text-white'
              }`}
            >
              <span className="block text-[10px] text-purple-300">03 / DELIVER</span>
              <span>Zero-Loss Output</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
