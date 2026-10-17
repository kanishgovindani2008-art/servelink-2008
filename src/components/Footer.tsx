import React from 'react';

interface FooterProps {
  onNavigate: (tab: 'home' | 'search' | 'my-bookings' | 'profile') => void;
  onOpenAI: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAI }) => {
  return (
    <footer className="w-full bg-[#eff4ff] mt-12 shadow-[0_-1px_6px_rgba(0,0,0,0.02)] border-t border-[#d3e4fe]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="flex items-center leading-none">
                <span className="font-display text-xl font-bold text-[#0b1c30] tracking-tight">Serve</span>
                <span className="font-display text-xl font-bold text-[#006194] tracking-tight">link</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#3f4850]">Your Local Service. One Platform.</p>
          </div>

          <nav className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#3f4850]">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#0b1c30] transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('search')}
              className="hover:text-[#0b1c30] transition-colors"
            >
              Search & Categories
            </button>
            <button
              onClick={onOpenAI}
              className="hover:text-[#0b1c30] transition-colors font-medium text-[#006194]"
            >
              AI Assistant
            </button>
            <button
              onClick={() => onNavigate('my-bookings')}
              className="hover:text-[#0b1c30] transition-colors"
            >
              My Bookings
            </button>
            <button
              onClick={() => onNavigate('profile')}
              className="hover:text-[#0b1c30] transition-colors"
            >
              Professional Hub
            </button>
          </nav>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#d3e4fe]/80 text-[#3f4850] text-xs">
          <span>© 2025 Servelink Technologies. All rights reserved.</span>
          <span className="px-3 py-1 bg-[#e5eeff] rounded-full text-[#565e74] font-medium border border-[#d3e4fe]">
            Servelink Demo MVP • College Startup Competition Edition
          </span>
        </div>
      </div>
    </footer>
  );
};
