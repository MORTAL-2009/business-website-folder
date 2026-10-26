import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import AboutSection from './components/AboutSection';
import ServiceSection from './components/ServiceSection';
import VideoBanner from './components/VideoBanner';
import ProductSection from './components/ProductSection';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import VideoModal from './components/VideoModal';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import { ContentProvider } from './context/ContentContext';
import { Lock } from 'lucide-react';

export default function App() {
  const [view, setView] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
        return 'admin';
      }
    }
    return 'site';
  });

  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem('hoosty_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [adminToken, setAdminToken] = useState(() => {
    return localStorage.getItem('hoosty_admin_token') || null;
  });

  const [contactOpen, setContactOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  // Listen to browser hash changes (e.g. #admin)
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
        setView('admin');
      } else if (window.location.hash === '#site' || window.location.hash === '') {
        setView('site');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleOpenContact = (service = '') => {
    setSelectedService(service);
    setContactOpen(true);
  };

  const handleOpenVideo = () => {
    setVideoOpen(true);
  };

  const handleSwitchToAdmin = () => {
    setView('admin');
    window.location.hash = '#admin';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSwitchToSite = () => {
    setView('site');
    if (window.location.hash === '#admin') {
      window.history.pushState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (user, token) => {
    setAdminUser(user);
    setAdminToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('hoosty_admin_token');
    localStorage.removeItem('hoosty_admin_user');
    setAdminToken(null);
    setAdminUser(null);
  };

  return (
    <ContentProvider>
      {view === 'admin' ? (
        // ADMIN PORTAL VIEW
        adminToken && adminUser ? (
          <AdminDashboard 
            user={adminUser} 
            token={adminToken} 
            onLogout={handleLogout} 
            onBackToSite={handleSwitchToSite} 
          />
        ) : (
          <AdminLogin 
            onLoginSuccess={handleLoginSuccess} 
            onBackToSite={handleSwitchToSite} 
          />
        )
      ) : (
        // PUBLIC WEBSITE VIEW
        <div className="min-h-screen bg-[#06040d] text-white selection:bg-purple-600 selection:text-white relative font-sans">
          {/* Dynamic ambient background gradients */}
          <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-950/30 rounded-full blur-[140px]" />
            <div className="absolute top-[35%] -right-40 w-[550px] h-[550px] bg-indigo-950/25 rounded-full blur-[140px]" />
            <div className="absolute bottom-[20%] -left-40 w-[600px] h-[600px] bg-purple-950/25 rounded-full blur-[140px]" />
          </div>

          {/* Navigation */}
          <Navbar 
            onContactClick={() => handleOpenContact('General Inquiry')} 
            onAdminClick={handleSwitchToAdmin}
          />

          {/* Main Page Flow */}
          <main>
            {/* Section 1: Hero */}
            <Hero 
              onGetStarted={() => handleOpenContact('Hoosty AI Platform Onboarding')} 
              onPlayVideo={handleOpenVideo}
            />

            {/* Section 2: Stats & Client Bar */}
            <StatsBar 
              onJoinNow={() => handleOpenContact('Enterprise Growth Program')}
            />

            {/* Section 3: About Us */}
            <AboutSection />

            {/* Section 4: Our Service (Dynamic from MongoDB) */}
            <ServiceSection 
              onSelectService={(service) => handleOpenContact(service)}
            />

            {/* Section 5: Video Callout Banner */}
            <VideoBanner 
              onTryTools={() => handleOpenContact('AI Tools Demo')}
              onPlayVideo={handleOpenVideo}
            />

            {/* Section 6: Our Product */}
            <ProductSection 
              onExploreProduct={(product) => handleOpenContact(product)}
            />

            {/* Section 7: Why Choose Us */}
            <WhyChooseUs />

            {/* Section 8: Testimonials */}
            <Testimonials />
          </main>

          {/* Section 9: Footer */}
          <Footer 
            onContactClick={() => handleOpenContact('Direct Consultation')} 
            onAdminClick={handleSwitchToAdmin}
          />

          {/* Floating Admin Portal Button */}
          <aside className="fixed bottom-5 right-5 z-40">
            <button
              type="button"
              onClick={handleSwitchToAdmin}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-purple-950/90 hover:bg-purple-900 border border-purple-500/40 text-purple-300 hover:text-white text-xs font-mono-tech shadow-xl shadow-purple-950/60 backdrop-blur-md transition-all cursor-pointer hover:scale-105 active:scale-95 group"
              title="Open Admin Portal"
            >
              <Lock className="w-3.5 h-3.5 text-purple-400 group-hover:rotate-12 transition-transform" />
              <span>Admin Portal</span>
            </button>
          </aside>

          {/* Interactive Modals */}
          <ContactModal 
            isOpen={contactOpen} 
            onClose={() => setContactOpen(false)}
            initialService={selectedService}
          />

          <VideoModal 
            isOpen={videoOpen} 
            onClose={() => setVideoOpen(false)}
          />
        </div>
      )}
    </ContentProvider>
  );
}
