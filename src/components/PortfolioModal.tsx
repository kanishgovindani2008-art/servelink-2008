import React from 'react';
import { Specialist } from '../data/mockData';

interface PortfolioModalProps {
  specialist: Specialist | null;
  onClose: () => void;
  onBookNow: (specialist: Specialist) => void;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({
  specialist,
  onClose,
  onBookNow
}) => {
  if (!specialist) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#213145]/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl flex flex-col gap-4 border border-[#d3e4fe] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#eff4ff] pb-3">
          <div className="flex items-center gap-3">
            <img
              src={specialist.avatar}
              alt={specialist.name}
              className="w-12 h-12 rounded-xl object-cover border border-[#d3e4fe]"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-display font-bold text-lg text-[#0b1c30]">
                  {specialist.name}
                </h3>
                <span className="material-symbols-outlined text-[#006b2c] text-[18px]">verified</span>
              </div>
              <p className="text-xs text-[#3f4850]">
                {specialist.role} • {specialist.completedJobs}+ jobs completed
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Portfolio"
            className="p-1 rounded-full text-[#3f4850] hover:bg-[#eff4ff] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Portfolio Showcase Image */}
        <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden shadow-inner border border-[#d3e4fe] bg-[#eff4ff]">
          <img
            src={specialist.portfolio.photoUrl}
            alt={specialist.portfolio.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 left-3 bg-[#0b1c30]/80 backdrop-blur-md px-3 py-1 rounded-lg text-white text-xs font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#7ffc97]"></span>
            <span>Recent Job • Verified Bhopal Customer</span>
            <span className="text-gray-300">({specialist.portfolio.date})</span>
          </div>
        </div>

        {/* Case Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#0b1c30]">
          <div className="bg-[#eff4ff] p-3.5 rounded-xl border border-[#d3e4fe]">
            <span className="block text-[11px] font-semibold text-[#006194] uppercase tracking-wider">
              Project Title
            </span>
            <h4 className="text-xs sm:text-sm font-bold text-[#0b1c30] mt-0.5">
              {specialist.portfolio.title}
            </h4>
            <p className="text-xs text-[#3f4850] mt-1.5 leading-relaxed">
              {specialist.portfolio.description}
            </p>
          </div>

          <div className="bg-[#eff4ff] p-3.5 rounded-xl border border-[#d3e4fe] flex flex-col justify-between">
            <div>
              <span className="block text-[11px] font-semibold text-[#006194] uppercase tracking-wider">
                Customer Feedback
              </span>
              <p className="text-xs sm:text-sm font-medium italic text-[#0b1c30] mt-1">
                {specialist.portfolio.feedback}
              </p>
            </div>
            <div className="pt-2 border-t border-[#d3e4fe]/60 mt-2 flex items-center justify-between text-[11px] text-[#3f4850]">
              <span>Client: <strong>{specialist.portfolio.customerName}</strong></span>
              <span className="flex items-center text-amber-500 font-bold">
                <span className="material-symbols-outlined text-[14px]">star</span>
                5.0 Rating
              </span>
            </div>
          </div>
        </div>

        {/* Technical Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-[#3f4850] font-medium">Verified Competencies:</span>
          {specialist.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-[#eff4ff] text-[#0b1c30] px-2.5 py-0.5 rounded-md border border-[#d3e4fe]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[#eff4ff]">
          <span className="text-xs text-[#3f4850]">
            Standard Inspection Rate: <strong className="text-[#006194] text-sm">₹{specialist.startingPrice}</strong>
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#3f4850] hover:text-[#0b1c30] transition-colors"
              type="button"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookNow(specialist);
              }}
              className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">calendar_month</span>
              <span>Book This Specialist</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
