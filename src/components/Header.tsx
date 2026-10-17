import React, { useState } from 'react';
import { Specialist, BHOPAL_AREAS } from '../data/mockData';

interface HeaderProps {
  currentTab: 'home' | 'search' | 'my-bookings' | 'profile';
  setCurrentTab: (tab: 'home' | 'search' | 'my-bookings' | 'profile') => void;
  selectedVicinity: string;
  setSelectedVicinity: (vicinity: string) => void;
  demoMode: 'customer' | 'pro';
  setDemoMode: (mode: 'customer' | 'pro') => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  selectedVicinity,
  setSelectedVicinity,
  demoMode,
  setDemoMode,
  unreadCount = 2
}) => {
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const activeVicinityObj = BHOPAL_AREAS.find((a) => a.key === selectedVicinity) || BHOPAL_AREAS[0];

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#ffffff]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#e5eeff]/80">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
        {/* Left: Brand + Navigation */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-2 group text-left focus:outline-none"
            aria-label="Servelink Home"
          >
            <img
              alt="Servelink Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida/AEtjO1VH9I_Y4kCbRY2N1kZQFnYsXfTuwV5vC0Vd3fa4lVVyq9yY9KpeIB01fHA7watqWfMTAJ_XYRYdxr-IaQLVQHwcwaJZ9Xv5FYNdwF-3K3DSVNv_7PnNQQHnBhMoY-2zvlQWP_78uKGufzepAcigjrm28B8VDd2kncYLdo4BEfg3wvIC86tRqVA3-xG6G1NlQL9E_uZlw9RGaTy6O6oQrnucPiQFRCk5BnuOizjykgbnyEiZ1sbcXFF3NFo"
            />
            <div className="flex flex-col">
              <div className="flex items-center leading-none">
                <span className="font-display text-2xl font-bold text-[#0b1c30] tracking-tight">Serve</span>
                <span className="font-display text-2xl font-bold text-[#006194] tracking-tight">link</span>
              </div>
              <span className="text-[11px] text-[#3f4850] font-medium hidden sm:inline-block leading-tight">
                Your Local Service. One Platform.
              </span>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setCurrentTab('home')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                currentTab === 'home'
                  ? 'bg-[#dae2fd] text-[#131b2e]'
                  : 'text-[#3f4850] hover:text-[#0b1c30] hover:bg-[#eff4ff]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentTab('search')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentTab === 'search'
                  ? 'bg-[#dae2fd] text-[#131b2e] font-semibold'
                  : 'text-[#3f4850] hover:text-[#0b1c30] hover:bg-[#eff4ff]'
              }`}
            >
              Search
            </button>
            <button
              onClick={() => setCurrentTab('my-bookings')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentTab === 'my-bookings'
                  ? 'bg-[#dae2fd] text-[#131b2e] font-semibold'
                  : 'text-[#3f4850] hover:text-[#0b1c30] hover:bg-[#eff4ff]'
              }`}
            >
              My Bookings
            </button>
            <button
              onClick={() => setCurrentTab('profile')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentTab === 'profile'
                  ? 'bg-[#dae2fd] text-[#131b2e] font-semibold'
                  : 'text-[#3f4850] hover:text-[#0b1c30] hover:bg-[#eff4ff]'
              }`}
            >
              Profile
            </button>
          </nav>
        </div>

        {/* Right: Vicinity Pill + Demo Switch + Notification + User */}
        <div className="flex items-center gap-3">
          {/* Location Selector Pill */}
          <div className="relative">
            <button
              onClick={() => setShowLocationMenu(!showLocationMenu)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0b1c30] transition-colors border border-[#d3e4fe]"
              type="button"
            >
              <span className="material-symbols-outlined text-[#006194] text-[18px]">location_on</span>
              <span className="text-xs font-semibold">{activeVicinityObj.short}</span>
              <span className="material-symbols-outlined text-[#3f4850] text-[16px]">expand_more</span>
            </button>

            {showLocationMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-[#d3e4fe] py-2 z-50">
                <div className="px-3 py-1.5 text-xs font-bold text-[#006194] uppercase tracking-wider border-b border-[#e5eeff]">
                  Select Bhopal Vicinity
                </div>
                {BHOPAL_AREAS.map((area) => (
                  <button
                    key={area.key}
                    onClick={() => {
                      setSelectedVicinity(area.key);
                      setShowLocationMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#eff4ff] transition-colors ${
                      selectedVicinity === area.key ? 'bg-[#dae2fd] font-semibold text-[#006194]' : 'text-[#0b1c30]'
                    }`}
                  >
                    <span>{area.label}</span>
                    {selectedVicinity === area.key && (
                      <span className="material-symbols-outlined text-[16px] text-[#006194]">check</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Demo Toggle (Customer / Pro) */}
          <div className="flex items-center bg-[#eff4ff] p-1 rounded-full border border-[#d3e4fe]">
            <span className="text-[11px] text-[#3f4850] px-1.5 font-medium hidden md:inline">Demo:</span>
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => setDemoMode('customer')}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                  demoMode === 'customer'
                    ? 'bg-white shadow-sm text-[#006194]'
                    : 'text-[#3f4850] hover:text-[#0b1c30]'
                }`}
                type="button"
              >
                Customer
              </button>
              <button
                onClick={() => setDemoMode('pro')}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                  demoMode === 'pro'
                    ? 'bg-white shadow-sm text-[#006194]'
                    : 'text-[#3f4850] hover:text-[#0b1c30]'
                }`}
                type="button"
              >
                Pro
              </button>
            </div>
          </div>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
              className="relative p-2 rounded-full text-[#3f4850] hover:bg-[#eff4ff] hover:text-[#0b1c30] transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ba1a1a]" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#d3e4fe] py-2 z-50">
                <div className="px-4 py-2 border-b border-[#e5eeff] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0b1c30]">Notifications (Bhopal East Node)</span>
                  <span className="text-[10px] text-[#006194] bg-[#eff4ff] px-1.5 py-0.5 rounded font-semibold">Live</span>
                </div>
                <div className="divide-y divide-[#eff4ff]">
                  <div className="p-3 text-xs hover:bg-[#f8f9ff] cursor-pointer">
                    <p className="font-semibold text-[#0b1c30]">Vikram Rathore is en-route</p>
                    <p className="text-[#3f4850] text-[11px] mt-0.5">ETA: 12 minutes to MP Nagar Zone II with jet wash kit.</p>
                    <span className="text-[10px] text-gray-400 mt-1 block">5 mins ago</span>
                  </div>
                  <div className="p-3 text-xs hover:bg-[#f8f9ff] cursor-pointer">
                    <p className="font-semibold text-[#0b1c30]">Specialist Rajesh Kumar Sharma verified</p>
                    <p className="text-[#3f4850] text-[11px] mt-0.5">High-voltage safety credentials renewed by Gov Tech Bhopal.</p>
                    <span className="text-[10px] text-gray-400 mt-1 block">2 hours ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <button
            onClick={() => setCurrentTab('profile')}
            aria-label="User Profile"
            className="w-8 h-8 rounded-full bg-[#006194] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
