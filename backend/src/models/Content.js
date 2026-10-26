import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: 'main_website'
    },
    hero: {
      badge: { type: String, default: 'Next-Level Business' },
      watermark: { type: String, default: 'INTELLIGENT' },
      headline: { type: String, default: 'Boost Efficiency,\nMaximize Profits.' },
      subtext: { type: String, default: 'Use our AI tools to automate tasks, cut costs, and enhance your bottom line with intelligent precision.' },
      ctaText: { type: String, default: 'Get Started' },
      orbImage: { type: String, default: '/src/assets/hero-orb.jpg' },
      hudStrategy: { type: String, default: 'Future-Ready Strategies' },
      hudSupport: { type: String, default: '24/7 Customer Support' }
    },
    stats: {
      happyClients: { type: String, default: '125k+' },
      growthRate: { type: String, default: '95%' },
      yearsExperience: { type: String, default: '25' },
      ctaText: { type: String, default: 'Join Now' },
      sponsors: [
        {
          name: { type: String }
        }
      ]
    },
    about: {
      tag: { type: String, default: 'ABOUT US' },
      headline: { type: String, default: 'Boost Efficiency, Maximize Profits with Smart AI Solutions.' },
      description: { type: String, default: 'Hoosty empowers forward-thinking enterprises with hyper-automated machine intelligence.' },
      cardText: { type: String, default: 'Leverage our AI tools to automate repetitive tasks, reduce costs, and improve your bottom line seamlessly.' },
      ribbonImage: { type: String, default: '/src/assets/about-ribbon.jpg' },
      version: { type: String, default: 'Ecosystem v2.4' }
    },
    services: {
      tag: { type: String, default: 'OUR SERVICE' },
      headline: { type: String, default: 'Tailored Services Designed to Elevate Your Business' },
      items: [
        {
          id: { type: String },
          title: { type: String },
          badge: { type: String },
          description: { type: String },
          buttonText: { type: String, default: 'Get Started' },
          features: [{ type: String }],
          icon: { type: String, default: 'Sparkles' },
          color: { type: String, default: 'purple' },
          image: { type: String }
        }
      ]
    },
    videoBanner: {
      tag: { type: String, default: 'AI-Powered' },
      title: { type: String, default: 'Ready To Maximize Your Profits?' },
      ctaText: { type: String, default: 'Try AI Tools' },
      smarterTitle: { type: String, default: 'Work Smarter.' },
      smarterDesc: { type: String, default: 'Our AI solutions boost ROI by enhancing efficiency and cutting redundant operational costs across your enterprise.' },
      bgImage: { type: String, default: '/src/assets/banner-flow.jpg' }
    },
    products: {
      tag: { type: String, default: 'OUR PRODUCT' },
      headline: { type: String, default: 'Maximize ROI with Efficiency-Driven AI.' },
      items: [
        {
          num: { type: String },
          tag: { type: String },
          title: { type: String },
          image: { type: String }
        }
      ]
    },
    whyChooseUs: {
      tag: { type: String, default: 'WHY CHOOSE US' },
      headline: { type: String, default: 'Work Smarter,\nNot Harder' },
      ribbonImage: { type: String, default: '/src/assets/about-ribbon.jpg' },
      orbImage: { type: String, default: '/src/assets/hero-orb.jpg' },
      items: [
        {
          title: { type: String },
          description: { type: String }
        }
      ]
    },
    testimonials: {
      tag: { type: String, default: 'TESTIMONIALS' },
      headline: { type: String, default: 'Future of\nEfficiency is Here' },
      items: [
        {
          quote: { type: String },
          author: { type: String },
          role: { type: String },
          featuredName: { type: String },
          featuredRole: { type: String },
          avatarImage: { type: String }
        }
      ]
    },
    footer: {
      brand: { type: String, default: 'Hoosty' },
      description: { type: String, default: 'Autonomous AI infrastructure designed for ambitious businesses looking to maximize operational output and eliminate inefficiencies.' },
      phone: { type: String, default: '+1 (999) 888-77-66' },
      email: { type: String, default: 'hello@niskalastd.com' },
      address: { type: String, default: '483920, Indonesia, Lampung 22/2/5, Office 4' },
      languages: [{ type: String }]
    }
  },
  {
    timestamps: true
  }
);

export const Content = mongoose.model('Content', ContentSchema);
