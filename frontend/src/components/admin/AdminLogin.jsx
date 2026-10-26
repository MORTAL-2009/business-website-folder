import React, { useState } from 'react';
import { Lock, Mail, KeyRound, ArrowRight, ShieldCheck, AlertCircle, Eye, EyeOff, Sparkles } from 'lucide-react';
import { API_BASE_URL } from '../../config/api';

export default function AdminLogin({ onLoginSuccess, onBackToSite }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Invalid email or password');
      }

      // Save token to localStorage
      localStorage.setItem('hoosty_admin_token', data.token);
      localStorage.setItem('hoosty_admin_user', JSON.stringify(data.user));

      onLoginSuccess(data.user, data.token);
    } catch (err) {
      setError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@hoosty.com');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#07050d] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Dynamic ambient lights */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-purple-900/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-indigo-900/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-950/60 border border-purple-500/40 text-purple-300 shadow-xl shadow-purple-950/50 mb-4 purple-glow">
            <ShieldCheck className="w-7 h-7 text-purple-400" />
          </div>
          <h1 className="font-heading text-3xl font-extrabold text-white tracking-tight">
            Hoosty <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Admin</span>
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1.5">
            Sign in to manage services, content, and live website settings
          </p>
        </div>

        {/* Login Box */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/30 shadow-2xl relative">
          
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-mono-tech text-gray-300 mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@hoosty.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-mono-tech text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm tracking-wide purple-glow hover:purple-glow-lg hover:scale-[1.01] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-600/30"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Sign In as Admin</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Fill Helper */}
          <div className="mt-6 pt-5 border-t border-purple-500/15">
            <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/20 text-center">
              <span className="text-[11px] text-gray-400 block mb-2 font-mono-tech">
                Default Credentials:
              </span>
              <div className="text-xs text-purple-200 font-mono flex items-center justify-center gap-2 mb-2">
                <span>admin@hoosty.com</span>
                <span className="text-gray-500">|</span>
                <span>admin123</span>
              </div>
              <button
                type="button"
                onClick={handleFillDemo}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold text-purple-300 hover:text-white bg-purple-900/50 hover:bg-purple-800/60 border border-purple-400/30 transition-all cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-purple-400" />
                <span>Auto-fill Credentials</span>
              </button>
            </div>
          </div>

          {/* Back to Website Button */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={onBackToSite}
              className="text-xs text-gray-400 hover:text-purple-300 transition-colors underline decoration-purple-500/30 cursor-pointer"
            >
              ← Back to Main Website
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
