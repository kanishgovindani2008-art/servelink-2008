import React, { useState } from 'react';
import { Specialist } from '../data/mockData';

interface CallModalProps {
  specialist: Specialist | null;
  onClose: () => void;
}

export const CallModal: React.FC<CallModalProps> = ({ specialist, onClose }) => {
  const [callInitiated, setCallInitiated] = useState(false);

  if (!specialist) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#213145]/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl flex flex-col items-center text-center gap-4 border border-[#d3e4fe] animate-in fade-in zoom-in-95 duration-150">
        <div className="w-16 h-16 rounded-full bg-[#eff4ff] border-2 border-[#006194] flex items-center justify-center overflow-hidden shadow-inner">
          <img src={specialist.avatar} alt={specialist.name} className="w-full h-full object-cover" />
        </div>

        <div>
          <h3 className="font-display font-bold text-lg text-[#0b1c30]">
            {specialist.name}
          </h3>
          <p className="text-xs text-[#3f4850]">{specialist.role}</p>
          <div className="flex items-center justify-center gap-1.5 mt-1 text-[11px] text-[#006b2c] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#006b2c] animate-pulse"></span>
            <span>Direct Line Active • Speaks Hindi & English</span>
          </div>
        </div>

        {callInitiated ? (
          <div className="w-full bg-[#eff4ff] border border-[#7ffc97] p-3 rounded-xl">
            <p className="text-xs font-bold text-[#006b2c] flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-[16px]">ring_volume</span>
              Connecting to Servelink Secure VoIP Bridge...
            </p>
            <p className="text-[11px] text-[#3f4850] mt-1">
              Dialing {specialist.phone}. Identity protected via masked proxy.
            </p>
          </div>
        ) : (
          <div className="w-full bg-[#eff4ff] p-3 rounded-xl border border-[#d3e4fe] text-xs text-[#3f4850]">
            <p className="font-medium text-[#0b1c30]">Direct Phone Line:</p>
            <p className="text-sm font-bold text-[#006194] tracking-wider mt-0.5">{specialist.phone}</p>
            <p className="text-[10px] text-gray-500 mt-1">Response time typically under 60 seconds</p>
          </div>
        )}

        <div className="flex flex-col w-full gap-2">
          <a
            href={`tel:${specialist.phone.replace(/\s+/g, '')}`}
            onClick={() => setCallInitiated(true)}
            className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span>Call Now ({specialist.phone})</span>
          </a>

          <button
            onClick={onClose}
            className="w-full py-2 text-xs font-semibold text-[#3f4850] hover:text-[#0b1c30] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
