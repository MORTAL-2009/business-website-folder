import React, { useState } from 'react';
import { X, Send, CheckCircle2, Sparkles } from 'lucide-react';

export default function ContactModal({ isOpen, onClose, initialService = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: initialService || 'Workflow Automation',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/40 shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full glass-pill border border-purple-400/30 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-purple-600/30 border border-purple-400 flex items-center justify-center text-purple-300 mb-4 purple-glow">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-white mb-2">Message Received</h3>
            <p className="text-gray-300 text-sm max-w-xs">
              Thank you! Our AI deployment engineers will get in touch with you within 24 hours.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-xs text-purple-300 border border-purple-400/30 mb-2">
                <Sparkles className="w-3 h-3 text-purple-400" />
                <span>Get In Touch</span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-white">Let's Elevate Your Business</h3>
              <p className="text-gray-400 text-xs mt-1">
                Tell us about your automation goals and AI workflow requirements.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-mono-tech text-gray-300 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Alex Mercer"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl glass-panel-subtle border border-purple-500/30 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-tech text-gray-300 mb-1">Work Email</label>
                <input 
                  type="email" 
                  required
                  placeholder="alex@enterprise.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl glass-panel-subtle border border-purple-500/30 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-tech text-gray-300 mb-1">Interested Solution</label>
                <select 
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl glass-panel-subtle border border-purple-500/30 text-white text-sm focus:outline-none focus:border-purple-400 transition-all bg-[#120b22]"
                >
                  <option value="Workflow Automation">Workflow Automation (EfficioAI)</option>
                  <option value="Scalable AI Solutions">Scalable AI Solutions (OptiFlow)</option>
                  <option value="Cost Optimization">Cost Optimization AI</option>
                  <option value="Enterprise Custom Integration">Enterprise Custom Integration</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono-tech text-gray-300 mb-1">Project Details</label>
                <textarea 
                  rows="3"
                  placeholder="How can Hoosty optimize your operations?"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl glass-panel-subtle border border-purple-500/30 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-400 transition-all"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm purple-glow hover:purple-glow-lg hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-2"
              >
                <span>Submit Inquiry</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
