import React, { createContext, useContext, useState, useEffect } from 'react';
import heroOrbDefault from '../assets/hero-orb.jpg';
import aboutRibbonDefault from '../assets/about-ribbon.jpg';
import bannerFlowDefault from '../assets/banner-flow.jpg';
import productRibbonDefault from '../assets/product-ribbon.jpg';
import productChromeDefault from '../assets/product-chrome.jpg';
import productSculptureDefault from '../assets/product-sculpture.jpg';
import testimonialWaveDefault from '../assets/testimonial-wave.jpg';

import { API_BASE_URL } from '../config/api';

const ContentContext = createContext();

const defaultContentState = {
  hero: {
    badge: 'Next-Level Business',
    watermark: 'INTELLIGENT',
    headline: 'Boost Efficiency,\nMaximize Profits.',
    subtext: 'Use our AI tools to automate tasks, cut costs, and enhance your bottom line with intelligent precision.',
    ctaText: 'Get Started',
    orbImage: heroOrbDefault,
    hudStrategy: 'Future-Ready Strategies',
    hudSupport: '24/7 Customer Support'
  },
  stats: {
    happyClients: '125k+',
    growthRate: '95%',
    yearsExperience: '25',
    ctaText: 'Join Now',
    sponsors: [
      { name: 'Niscola.io' },
      { name: 'SAMTIV' },
      { name: 'IEA.' },
      { name: 'BOEING' }
    ]
  },
  about: {
    tag: 'ABOUT US',
    headline: 'Boost Efficiency, Maximize Profits with Smart AI Solutions.',
    description: 'Hoosty empowers forward-thinking enterprises with hyper-automated machine intelligence. We bridge high-velocity data execution with self-optimizing business pipelines.',
    cardText: 'Leverage our AI tools to automate repetitive tasks, reduce costs, and improve your bottom line seamlessly.',
    ribbonImage: aboutRibbonDefault,
    version: 'Ecosystem v2.4'
  },
  services: {
    tag: 'OUR SERVICE',
    items: [
      {
        id: 'workflow',
        title: 'Workflow Automation',
        badge: 'Productivity',
        buttonText: 'Get Started',
        image: aboutRibbonDefault
      },
      {
        id: 'scalable',
        title: 'Scalable AI Solutions',
        badge: 'Compute Tier',
        buttonText: 'Get Started'
      },
      {
        id: 'cost',
        title: 'Cost Optimization',
        buttonText: 'Get Started',
        description: 'Cut operational costs by automating and streamlining processes with algorithmic accuracy.'
      }
    ]
  },
  videoBanner: {
    tag: 'AI-Powered',
    title: 'Ready To Maximize Your Profits?',
    ctaText: 'Try AI Tools',
    smarterTitle: 'Work Smarter.',
    smarterDesc: 'Our AI solutions boost ROI by enhancing efficiency and cutting redundant operational costs across your enterprise.',
    bgImage: bannerFlowDefault
  },
  products: {
    tag: 'OUR PRODUCT',
    headline: 'Maximize ROI with Efficiency-Driven AI.',
    items: [
      {
        num: '02/',
        tag: 'EfficioAI',
        title: 'Automate workflows for efficiency.',
        image: productRibbonDefault
      },
      {
        num: '03/',
        tag: 'OptiFlow',
        title: 'Effortlessly optimize workflows with AI.',
        image: productChromeDefault
      },
      {
        num: '04/',
        tag: 'OptiFlow',
        title: 'Guide your business to higher profits using AI.',
        image: productSculptureDefault
      }
    ]
  },
  whyChooseUs: {
    tag: 'WHY CHOOSE US',
    headline: 'Work Smarter,\nNot Harder',
    ribbonImage: aboutRibbonDefault,
    orbImage: heroOrbDefault,
    items: [
      {
        title: 'Proven Expertise',
        description: 'Our team has deep AI experience, delivering tailored enterprise solutions that drive measurable growth.'
      },
      {
        title: 'Custom AI Solutions',
        description: 'We create tools that fit your unique business workflows, seamlessly integrating with legacy and modern systems.'
      },
      {
        title: 'Efficiency Redefined',
        description: 'We streamline core operations, eliminate manual bottlenecks, and boost productivity tenfold.'
      }
    ]
  },
  testimonials: {
    tag: 'TESTIMONIALS',
    headline: 'Future of\nEfficiency is Here',
    items: [
      {
        quote: "Using this has transformed the way we work. Tasks that used to take hours are now completed in minutes. It's a game-changer for our team!",
        author: "Mark L.",
        role: "IT Specialist",
        featuredName: "Anna K.",
        featuredRole: "Business Strategist",
        avatarImage: testimonialWaveDefault
      },
      {
        quote: "The autonomous agent workflows lowered our operational overhead by 42% in just two quarters. Hoosty's accuracy is unmatched in the industry.",
        author: "Elena Rostova",
        role: "VP of Product Engineering",
        featuredName: "David C.",
        featuredRole: "Operations Lead",
        avatarImage: testimonialWaveDefault
      }
    ]
  },
  footer: {
    brand: 'Hoosty',
    description: 'Autonomous AI infrastructure designed for ambitious businesses looking to maximize operational output and eliminate inefficiencies.',
    phone: '+1 (999) 888-77-66',
    email: 'hello@niskalastd.com',
    address: '483920, Indonesia, Lampung 22/2/5, Office 4',
    languages: ['En', 'Es', 'Fr', 'De', 'Ru']
  }
};

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(defaultContentState);
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchContent = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/content`, {
        signal: AbortSignal.timeout(6000)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          // Merge API content with fallback default images if backend paths are relative
          setContent((prev) => ({
            ...prev,
            ...json.data,
            hero: {
              ...prev.hero,
              ...(json.data.hero || {}),
              orbImage: json.data.hero?.orbImage?.startsWith('http') 
                ? json.data.hero.orbImage 
                : prev.hero.orbImage
            }
          }));
          setIsBackendConnected(true);
        }
      }
    } catch (e) {
      // Backend not running or timeout; seamlessly use local state
      setIsBackendConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  const updateServices = async (servicesData, token) => {
    try {
      const res = await fetch(`${API_BASE_URL}/content/services`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(servicesData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        await fetchContent();
        return { success: true, data };
      }
      return { success: false, message: data.message || 'Failed to update services' };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <ContentContext.Provider value={{
      content,
      isBackendConnected,
      isLoading,
      refreshContent: fetchContent,
      updateServices
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
