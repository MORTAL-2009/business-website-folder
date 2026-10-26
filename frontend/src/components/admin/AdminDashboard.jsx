import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowUp, 
  ArrowDown, 
  Save, 
  Eye, 
  LogOut, 
  CheckCircle2, 
  AlertCircle, 
  Cpu, 
  Zap, 
  Shield, 
  BarChart3, 
  Cloud, 
  Layers, 
  Bot, 
  Database, 
  Lock, 
  KeyRound,
  X,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { API_BASE_URL } from '../../config/api';

const AVAILABLE_ICONS = [
  { name: 'Sparkles', label: 'Sparkles', component: Sparkles },
  { name: 'Layers', label: 'Workflow', component: Layers },
  { name: 'Cpu', label: 'Compute/AI', component: Cpu },
  { name: 'Zap', label: 'Speed/Power', component: Zap },
  { name: 'Shield', label: 'Security', component: Shield },
  { name: 'BarChart3', label: 'Analytics', component: BarChart3 },
  { name: 'Cloud', label: 'Cloud Host', component: Cloud },
  { name: 'Bot', label: 'AI Agent', component: Bot },
  { name: 'Database', label: 'Database', component: Database },
];

const AVAILABLE_COLORS = [
  { id: 'purple', label: 'Purple Neon', bg: 'bg-purple-600' },
  { id: 'indigo', label: 'Indigo Cyber', bg: 'bg-indigo-600' },
  { id: 'cyan', label: 'Cyan Matrix', bg: 'bg-cyan-500' },
  { id: 'emerald', label: 'Emerald Quantum', bg: 'bg-emerald-500' },
  { id: 'rose', label: 'Rose Prism', bg: 'bg-rose-500' },
  { id: 'amber', label: 'Amber Solar', bg: 'bg-amber-500' },
];

export default function AdminDashboard({ user, token, onLogout, onBackToSite }) {
  const { content, updateServices } = useContent();

  const [activeTab, setActiveTab] = useState('services'); // 'services' | 'settings'

  // Services Local Form State
  const [sectionTag, setSectionTag] = useState('OUR SERVICE');
  const [sectionHeadline, setSectionHeadline] = useState('Tailored Services Designed to Elevate Your Business');
  const [servicesList, setServicesList] = useState([]);

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    title: '',
    badge: '',
    description: '',
    buttonText: 'Get Started',
    icon: 'Sparkles',
    color: 'purple',
    features: ''
  });

  // Settings State
  const [settingsForm, setSettingsForm] = useState({
    currentPassword: '',
    newEmail: user?.email || '',
    newPassword: ''
  });
  const [settingsStatus, setSettingsStatus] = useState({ type: '', message: '' });

  // Notification Toast
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [isSaving, setIsSaving] = useState(false);

  // Sync with ContentContext
  useEffect(() => {
    if (content?.services) {
      setSectionTag(content.services.tag || 'OUR SERVICE');
      setSectionHeadline(content.services.headline || 'Tailored Services Designed to Elevate Your Business');
      if (content.services.items && Array.isArray(content.services.items)) {
        setServicesList(content.services.items);
      }
    }
  }, [content]);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3500);
  };

  // Open Add Service Modal
  const handleOpenAddModal = () => {
    setEditingIndex(null);
    setServiceForm({
      title: '',
      badge: 'New Solution',
      description: '',
      buttonText: 'Get Started',
      icon: 'Layers',
      color: 'purple',
      features: ''
    });
    setIsModalOpen(true);
  };

  // Open Edit Service Modal
  const handleOpenEditModal = (idx) => {
    const item = servicesList[idx];
    setEditingIndex(idx);
    setServiceForm({
      title: item.title || '',
      badge: item.badge || '',
      description: item.description || '',
      buttonText: item.buttonText || 'Get Started',
      icon: item.icon || 'Sparkles',
      color: item.color || 'purple',
      features: Array.isArray(item.features) ? item.features.join(', ') : ''
    });
    setIsModalOpen(true);
  };

  // Save Service from Modal
  const handleSaveModalService = (e) => {
    e.preventDefault();
    if (!serviceForm.title.trim()) {
      alert('Service title is required');
      return;
    }

    const formattedFeatures = serviceForm.features
      ? serviceForm.features.split(',').map((f) => f.trim()).filter(Boolean)
      : [];

    const newService = {
      id: editingIndex !== null ? servicesList[editingIndex].id || `service_${Date.now()}` : `service_${Date.now()}`,
      title: serviceForm.title.trim(),
      badge: serviceForm.badge.trim() || 'Enterprise',
      description: serviceForm.description.trim(),
      buttonText: serviceForm.buttonText.trim() || 'Get Started',
      icon: serviceForm.icon || 'Sparkles',
      color: serviceForm.color || 'purple',
      features: formattedFeatures
    };

    let updatedList = [...servicesList];
    if (editingIndex !== null) {
      updatedList[editingIndex] = { ...updatedList[editingIndex], ...newService };
    } else {
      updatedList.push(newService);
    }

    setServicesList(updatedList);
    setIsModalOpen(false);
    showToast(editingIndex !== null ? 'Service updated in list (Click Publish to save to MongoDB)' : 'New service added to list (Click Publish to save to MongoDB)', 'info');
  };

  // Delete Service
  const handleDeleteService = (idx) => {
    if (window.confirm(`Are you sure you want to delete "${servicesList[idx]?.title}"?`)) {
      const updated = servicesList.filter((_, i) => i !== idx);
      setServicesList(updated);
      showToast('Service removed from list', 'info');
    }
  };

  // Move Service Up/Down
  const handleMoveService = (idx, direction) => {
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= servicesList.length) return;
    const updated = [...servicesList];
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;
    setServicesList(updated);
  };

  // Save everything to MongoDB Atlas
  const handlePublishServices = async () => {
    setIsSaving(true);
    try {
      const payload = {
        tag: sectionTag,
        headline: sectionHeadline,
        items: servicesList
      };

      const result = await updateServices(payload, token);
      if (result.success) {
        showToast('Services published successfully to MongoDB Atlas! Live UI updated.', 'success');
      } else {
        showToast(result.message || 'Failed to update database', 'error');
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Change Admin Credentials
  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    setSettingsStatus({ type: '', message: '' });

    try {
      const res = await fetch(`${API_BASE_URL}/auth/credentials`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(settingsForm)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to update credentials');
      }

      setSettingsStatus({ type: 'success', message: 'Credentials successfully updated!' });
      setSettingsForm((prev) => ({ ...prev, currentPassword: '', newPassword: '' }));
      showToast('Admin credentials updated!', 'success');
    } catch (err) {
      setSettingsStatus({ type: 'error', message: err.message });
    }
  };

  const renderIconComponent = (iconName) => {
    const found = AVAILABLE_ICONS.find((i) => i.name.toLowerCase() === (iconName || '').toLowerCase());
    const Comp = found ? found.component : Sparkles;
    return <Comp className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-[#07050d] text-white font-sans pb-24">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-xl border animate-in slide-in-from-top-4 duration-300 ${
          toast.type === 'success' 
            ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200 shadow-emerald-950/50' 
            : toast.type === 'error'
            ? 'bg-red-950/80 border-red-500/50 text-red-200 shadow-red-950/50'
            : 'bg-purple-950/80 border-purple-500/50 text-purple-200 shadow-purple-950/50'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5" />}
          <span className="text-xs sm:text-sm font-medium">{toast.message}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#07050d]/80 backdrop-blur-xl border-b border-purple-500/20 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-950/80 border border-purple-400/40 flex items-center justify-center text-purple-300 purple-glow-sm">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-base sm:text-lg text-white flex items-center gap-2">
                <span>Hoosty</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-tech bg-purple-900/60 text-purple-300 border border-purple-400/30">
                  Admin Panel
                </span>
              </h1>
              <div className="flex items-center gap-2 text-[11px] text-gray-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>MongoDB Atlas: Connected</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Live Website Button */}
            <button
              type="button"
              onClick={onBackToSite}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold text-purple-300 hover:text-white glass-pill border border-purple-400/30 hover:border-purple-400 transition-all cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Main Website</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </button>

            {/* Logout Button */}
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-red-300 hover:bg-red-950/30 border border-transparent hover:border-red-500/30 transition-all cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 mt-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-purple-500/20 pb-4 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('services')}
            className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm tracking-wide transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'services'
                ? 'bg-purple-600 text-white purple-glow-sm shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-purple-950/40'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Services Section (CMS)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm tracking-wide transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'bg-purple-600 text-white purple-glow-sm shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-purple-950/40'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Admin Credentials</span>
          </button>
        </div>

        {/* TAB 1: SERVICES SECTION CMS */}
        {activeTab === 'services' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* Header Action Card */}
            <div className="glass-panel rounded-3xl p-6 border border-purple-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <span>Services Management</span>
                </h2>
                <p className="text-gray-300 text-xs sm:text-sm mt-1 max-w-xl">
                  Add, edit, reorder or remove services. Click <strong>"Publish to MongoDB"</strong> to update the live home page instantly.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  type="button"
                  onClick={handleOpenAddModal}
                  className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-purple-950/60 border border-purple-400/40 text-purple-300 hover:text-white hover:bg-purple-900/60 font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Service</span>
                </button>

                <button
                  type="button"
                  disabled={isSaving}
                  onClick={handlePublishServices}
                  className="flex-1 md:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs purple-glow hover:purple-glow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-lg shadow-purple-600/30"
                >
                  {isSaving ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Publish to MongoDB</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* General Section Settings */}
            <div className="glass-panel rounded-3xl p-6 border border-purple-500/20">
              <h3 className="text-sm font-mono-tech uppercase tracking-wider text-purple-400 mb-4">
                Section Header Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-tech text-gray-300 mb-1.5">
                    Section Tag (Small text above title)
                  </label>
                  <input
                    type="text"
                    value={sectionTag}
                    onChange={(e) => setSectionTag(e.target.value)}
                    placeholder="OUR SERVICE"
                    className="w-full px-4 py-2.5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-tech text-gray-300 mb-1.5">
                    Section Headline
                  </label>
                  <input
                    type="text"
                    value={sectionHeadline}
                    onChange={(e) => setSectionHeadline(e.target.value)}
                    placeholder="Tailored Services Designed to Elevate Your Business"
                    className="w-full px-4 py-2.5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>
            </div>

            {/* Services Cards List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-mono-tech uppercase tracking-wider text-purple-400">
                  Active Services ({servicesList.length})
                </h3>
                <span className="text-xs text-gray-400 font-mono-tech">
                  Reorder using Up/Down arrows
                </span>
              </div>

              {servicesList.length === 0 ? (
                <div className="glass-panel rounded-3xl p-12 text-center border border-dashed border-purple-500/30">
                  <Layers className="w-10 h-10 text-purple-400/60 mx-auto mb-3" />
                  <p className="text-gray-300 text-sm font-medium">No services currently configured</p>
                  <button
                    type="button"
                    onClick={handleOpenAddModal}
                    className="mt-4 px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold purple-glow-sm cursor-pointer"
                  >
                    Add Your First Service
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {servicesList.map((item, index) => (
                    <div 
                      key={item.id || index}
                      className="glass-panel rounded-2xl p-5 border border-purple-500/25 flex flex-col justify-between relative group hover:border-purple-400/50 transition-all"
                    >
                      {/* Top Action Row */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-tech bg-purple-950/80 border border-purple-400/30 text-purple-300">
                            {item.badge || `Service #${index + 1}`}
                          </span>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              disabled={index === 0}
                              onClick={() => handleMoveService(index, -1)}
                              className="w-7 h-7 rounded-lg bg-purple-950/50 border border-purple-500/20 flex items-center justify-center text-gray-400 hover:text-white disabled:opacity-30 cursor-pointer"
                              title="Move Up"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              disabled={index === servicesList.length - 1}
                              onClick={() => handleMoveService(index, 1)}
                              className="w-7 h-7 rounded-lg bg-purple-950/50 border border-purple-500/20 flex items-center justify-center text-gray-400 hover:text-white disabled:opacity-30 cursor-pointer"
                              title="Move Down"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenEditModal(index)}
                              className="w-7 h-7 rounded-lg bg-purple-950/50 border border-purple-500/20 flex items-center justify-center text-purple-300 hover:text-white cursor-pointer"
                              title="Edit Service"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteService(index)}
                              className="w-7 h-7 rounded-lg bg-purple-950/50 border border-purple-500/20 flex items-center justify-center text-red-400 hover:text-red-200 hover:bg-red-950/60 cursor-pointer"
                              title="Delete Service"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Title and Icon */}
                        <div className="flex items-start gap-3 my-2">
                          <div className="w-9 h-9 rounded-xl bg-purple-950/60 border border-purple-400/30 flex items-center justify-center text-purple-300 shrink-0">
                            {renderIconComponent(item.icon)}
                          </div>
                          <h4 className="font-heading text-lg font-bold text-white leading-snug">
                            {item.title}
                          </h4>
                        </div>

                        {/* Description */}
                        {item.description && (
                          <p className="text-gray-400 text-xs mt-2 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        )}

                        {/* Features Preview */}
                        {item.features && item.features.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {item.features.map((feat, fIdx) => (
                              <span key={fIdx} className="text-[10px] px-2 py-0.5 rounded-md bg-purple-950/50 text-purple-300 border border-purple-500/20">
                                {feat}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Card Footer Preview */}
                      <div className="mt-5 pt-3 border-t border-purple-500/15 flex items-center justify-between text-xs">
                        <span className="text-gray-400 font-mono-tech text-[11px]">
                          CTA: {item.buttonText || 'Get Started'}
                        </span>
                        <span className={`w-3 h-3 rounded-full ${AVAILABLE_COLORS.find(c => c.id === item.color)?.bg || 'bg-purple-600'}`} title={`Accent: ${item.color || 'purple'}`} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Save Reminder */}
            <div className="flex justify-end pt-4">
              <button
                type="button"
                disabled={isSaving}
                onClick={handlePublishServices}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs purple-glow hover:purple-glow-lg active:scale-95 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-purple-600/30"
              >
                <Save className="w-4 h-4" />
                <span>Save & Publish Changes to MongoDB</span>
              </button>
            </div>

          </div>
        )}

        {/* TAB 2: ADMIN CREDENTIALS SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-xl mx-auto glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/30 animate-in fade-in duration-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/40 flex items-center justify-center text-purple-300">
                <Lock className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-white">Admin Credentials</h3>
                <p className="text-gray-400 text-xs">Update your sign-in email and password</p>
              </div>
            </div>

            {settingsStatus.message && (
              <div className={`mb-5 p-3 rounded-xl text-xs flex items-center gap-2 ${
                settingsStatus.type === 'success' 
                  ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-300' 
                  : 'bg-red-950/40 border border-red-500/40 text-red-300'
              }`}>
                {settingsStatus.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" /> : <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />}
                <span>{settingsStatus.message}</span>
              </div>
            )}

            <form onSubmit={handleUpdateSettings} className="space-y-4">
              <div>
                <label className="block text-xs font-mono-tech text-gray-300 mb-1.5">
                  Current Password (Required for verification)
                </label>
                <input
                  type="password"
                  required
                  value={settingsForm.currentPassword}
                  onChange={(e) => setSettingsForm({ ...settingsForm, currentPassword: e.target.value })}
                  placeholder="Enter current password"
                  className="w-full px-4 py-2.5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-tech text-gray-300 mb-1.5">
                  Admin Email
                </label>
                <input
                  type="email"
                  value={settingsForm.newEmail}
                  onChange={(e) => setSettingsForm({ ...settingsForm, newEmail: e.target.value })}
                  placeholder="admin@hoosty.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-tech text-gray-300 mb-1.5">
                  New Password (Leave blank to keep unchanged)
                </label>
                <input
                  type="password"
                  value={settingsForm.newPassword}
                  onChange={(e) => setSettingsForm({ ...settingsForm, newPassword: e.target.value })}
                  placeholder="At least 6 characters"
                  className="w-full px-4 py-2.5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-400"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs tracking-wide purple-glow hover:purple-glow-lg transition-all cursor-pointer"
              >
                Update Credentials in MongoDB
              </button>
            </form>
          </div>
        )}

      </main>

      {/* MODAL: ADD / EDIT SERVICE */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-xl glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/40 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full glass-pill border border-purple-400/30 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6">
              <h3 className="font-heading text-2xl font-bold text-white">
                {editingIndex !== null ? 'Edit Service' : 'Add New Service'}
              </h3>
              <p className="text-gray-400 text-xs mt-1">
                Configure details that will appear on the live website cards
              </p>
            </div>

            <form onSubmit={handleSaveModalService} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-tech text-gray-300 mb-1.5">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={serviceForm.title}
                    onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                    placeholder="e.g. Workflow Automation"
                    className="w-full px-4 py-2.5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-tech text-gray-300 mb-1.5">
                    Badge / Category Tag
                  </label>
                  <input
                    type="text"
                    value={serviceForm.badge}
                    onChange={(e) => setServiceForm({ ...serviceForm, badge: e.target.value })}
                    placeholder="e.g. Productivity, AI Models"
                    className="w-full px-4 py-2.5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono-tech text-gray-300 mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  placeholder="Explain how this service helps clients boost efficiency and save costs..."
                  className="w-full px-4 py-2.5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-tech text-gray-300 mb-1.5">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={serviceForm.buttonText}
                    onChange={(e) => setServiceForm({ ...serviceForm, buttonText: e.target.value })}
                    placeholder="Get Started"
                    className="w-full px-4 py-2.5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-tech text-gray-300 mb-1.5">
                    Features / Bullet Points (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={serviceForm.features}
                    onChange={(e) => setServiceForm({ ...serviceForm, features: e.target.value })}
                    placeholder="24/7 Monitoring, Zero downtime, Custom API"
                    className="w-full px-4 py-2.5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              {/* Icon Selector */}
              <div>
                <label className="block text-xs font-mono-tech text-gray-300 mb-2">
                  Choose Icon
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {AVAILABLE_ICONS.map((iconItem) => {
                    const IconComp = iconItem.component;
                    const isSelected = serviceForm.icon === iconItem.name;
                    return (
                      <button
                        type="button"
                        key={iconItem.name}
                        onClick={() => setServiceForm({ ...serviceForm, icon: iconItem.name })}
                        className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-purple-600 border-purple-300 text-white shadow-md shadow-purple-600/40 scale-105'
                            : 'bg-purple-950/40 border-purple-500/20 text-gray-400 hover:text-white hover:border-purple-400/50'
                        }`}
                      >
                        <IconComp className="w-4 h-4" />
                        <span className="text-[10px] truncate max-w-full">{iconItem.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Color Accent Selector */}
              <div>
                <label className="block text-xs font-mono-tech text-gray-300 mb-2">
                  Accent Color Theme
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_COLORS.map((col) => {
                    const isSelected = serviceForm.color === col.id;
                    return (
                      <button
                        type="button"
                        key={col.id}
                        onClick={() => setServiceForm({ ...serviceForm, color: col.id })}
                        className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 text-xs transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-purple-950/80 border-purple-300 text-white ring-2 ring-purple-400/60'
                            : 'bg-purple-950/30 border-purple-500/20 text-gray-400 hover:text-white'
                        }`}
                      >
                        <span className={`w-3 h-3 rounded-full ${col.bg}`} />
                        <span>{col.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Modal Button */}
              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-400 hover:text-white glass-pill cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs purple-glow hover:purple-glow-lg transition-all cursor-pointer shadow-lg shadow-purple-600/30"
                >
                  {editingIndex !== null ? 'Save Changes' : 'Add Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
