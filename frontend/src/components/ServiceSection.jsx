import React, { useState } from 'react';
import { 
  Globe, 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  Zap, 
  Shield, 
  BarChart3, 
  Cloud, 
  Layers, 
  Bot, 
  Database,
  CheckCircle2
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import aboutRibbon from '../assets/about-ribbon.jpg';

export default function ServiceSection({ onSelectService }) {
  const { content } = useContent();
  const [activeTier, setActiveTier] = useState(2);

  const servicesData = content?.services || {};
  const tag = servicesData.tag || 'OUR SERVICE';
  const headline = servicesData.headline || 'Tailored Services Designed to Elevate Your Business';
  const items = (servicesData.items && servicesData.items.length > 0) ? servicesData.items : [
    {
      id: 'workflow',
      title: 'Workflow Automation',
      badge: 'Productivity',
      description: 'End-to-end task automation and process orchestration to eliminate repetitive work.',
      buttonText: 'Get Started',
      icon: 'Layers',
      color: 'purple',
      image: aboutRibbon
    },
    {
      id: 'scalable',
      title: 'Scalable AI Solutions',
      badge: 'Compute Tier',
      description: 'Dynamic machine intelligence nodes tailored for enterprise data throughput.',
      buttonText: 'Get Started',
      icon: 'Cpu',
      color: 'indigo'
    },
    {
      id: 'cost',
      title: 'Cost Optimization',
      badge: 'High ROI',
      description: 'Cut operational costs by automating and streamlining processes with algorithmic accuracy.',
      buttonText: 'Get Started',
      icon: 'Zap',
      color: 'cyan'
    }
  ];

  const renderIcon = (iconName) => {
    switch ((iconName || '').toLowerCase()) {
      case 'cpu': return <Cpu className="w-5 h-5" />;
      case 'zap': return <Zap className="w-5 h-5" />;
      case 'shield': return <Shield className="w-5 h-5" />;
      case 'barchart':
      case 'analytics': return <BarChart3 className="w-5 h-5" />;
      case 'cloud': return <Cloud className="w-5 h-5" />;
      case 'bot':
      case 'ai': return <Bot className="w-5 h-5" />;
      case 'database': return <Database className="w-5 h-5" />;
      case 'workflow':
      case 'layers': return <Layers className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const getGradient = (color) => {
    switch (color) {
      case 'indigo': return 'from-indigo-600 to-purple-600';
      case 'cyan': return 'from-cyan-500 to-blue-600';
      case 'emerald': return 'from-emerald-500 to-teal-600';
      case 'rose': return 'from-rose-500 to-purple-600';
      case 'amber': return 'from-amber-500 to-orange-600';
      default: return 'from-purple-600 to-indigo-600';
    }
  };

  const getBorderHover = (color) => {
    switch (color) {
      case 'indigo': return 'hover:border-indigo-400/60';
      case 'cyan': return 'hover:border-cyan-400/60';
      case 'emerald': return 'hover:border-emerald-400/60';
      case 'rose': return 'hover:border-rose-400/60';
      case 'amber': return 'hover:border-amber-400/60';
      default: return 'hover:border-purple-400/60';
    }
  };

  return (
    <section id="service" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-5 border-b border-purple-500/15 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-heading font-black text-xs sm:text-sm tracking-widest uppercase text-purple-400">
                {tag}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white max-w-2xl leading-tight">
              {headline}
            </h2>
          </div>

          {/* Right Action Icons / Badges */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-mono-tech text-gray-400 bg-purple-950/40 border border-purple-500/20 px-3 py-1.5 rounded-full">
              {items.length} {items.length === 1 ? 'Solution' : 'Active Solutions'}
            </span>
            <div className="w-8 h-8 rounded-full glass-pill border border-purple-500/30 flex items-center justify-center text-purple-300">
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        <div className={`grid grid-cols-1 ${items.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' : items.length >= 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'max-w-xl mx-auto'} gap-6`}>
          {items.map((service, index) => {
            const cardColor = service.color || (index % 3 === 0 ? 'purple' : index % 3 === 1 ? 'indigo' : 'cyan');
            const cardGradient = getGradient(cardColor);
            const borderHover = getBorderHover(cardColor);

            return (
              <div 
                key={service.id || service._id || index}
                className={`glass-panel rounded-3xl p-6 sm:p-7 border border-purple-500/20 flex flex-col justify-between relative overflow-hidden group ${borderHover} transition-all duration-300 min-h-[380px] hover:shadow-xl hover:shadow-purple-950/40`}
              >
                {/* Top Row: Title + Badge + Icon */}
                <div className="z-10">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono-tech border border-purple-400/30 text-purple-300 bg-purple-950/40">
                      {service.badge || `Service 0${index + 1}`}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-purple-950/60 border border-purple-400/30 flex items-center justify-center text-purple-300 group-hover:scale-110 group-hover:border-purple-400 transition-all duration-300">
                      {renderIcon(service.icon)}
                    </div>
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors leading-snug">
                    {service.title}
                  </h3>

                  {service.description && (
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  )}
                </div>

                {/* Middle Content: Custom Image OR Interactive Widget OR Features */}
                <div className="my-6 z-10">
                  {service.image ? (
                    <div className="h-28 w-full rounded-2xl overflow-hidden relative border border-purple-500/20">
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090514] via-transparent to-transparent" />
                    </div>
                  ) : service.id === 'scalable' ? (
                    <div className="flex flex-col items-center p-3 rounded-2xl bg-black/40 border border-purple-500/20 backdrop-blur-sm">
                      <div className="flex items-center gap-2">
                        {[0, 1, 2, 3, 4].map((tier) => (
                          <button
                            key={tier}
                            type="button"
                            onClick={() => setActiveTier(tier)}
                            className={`h-10 w-7 rounded-lg bg-gradient-to-t ${cardGradient} transition-all duration-300 cursor-pointer ${
                              activeTier === tier ? 'scale-110 ring-2 ring-white shadow-[0_0_12px_rgba(168,85,247,0.7)]' : 'opacity-60 hover:opacity-100'
                            }`}
                            title={`Compute Level ${tier + 1}`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono-tech text-gray-400 mt-2">
                        Dynamic Compute Tier: Level {activeTier + 1}
                      </span>
                    </div>
                  ) : service.features && service.features.length > 0 ? (
                    <div className="space-y-1.5">
                      {service.features.slice(0, 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-gray-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-16 rounded-2xl bg-purple-950/20 border border-purple-500/10 flex items-center justify-center p-3">
                      <span className="text-xs text-purple-300/80 font-mono-tech">
                        Ready for instant deployment
                      </span>
                    </div>
                  )}
                </div>

                {/* Bottom Row: CTA Button */}
                <div className="z-10 pt-2 border-t border-purple-500/10">
                  <button 
                    type="button"
                    onClick={() => onSelectService(service.title)}
                    className={`w-full py-2.5 px-4 rounded-xl bg-gradient-to-r ${cardGradient} text-white font-semibold text-xs tracking-wide purple-glow-sm hover:purple-glow hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2`}
                  >
                    <span>{service.buttonText || 'Get Started'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Ambient glowing background aura */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-600/20 transition-colors" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
