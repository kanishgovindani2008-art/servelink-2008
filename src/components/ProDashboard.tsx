import React, { useState } from 'react';

interface ProDashboardProps {
  onSwitchToCustomer: () => void;
}

export const ProDashboard: React.FC<ProDashboardProps> = ({ onSwitchToCustomer }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [activeJobAlert, setActiveJobAlert] = useState<{
    id: string;
    customer: string;
    location: string;
    service: string;
    rate: number;
    urgency: string;
    distance: string;
  } | null>({
    id: 'JOB-9921',
    customer: 'Sunil Dubey',
    location: 'Zone I, MP Nagar (near Chetak Bridge)',
    service: 'Main 32A MCB Tripping & Inverter Neutral Spark',
    rate: 399,
    urgency: '15-min Dispatch Required',
    distance: '1.2 km away'
  });

  const [acceptedJobsCount, setAcceptedJobsCount] = useState(3);
  const [todayEarnings, setTodayEarnings] = useState(1490);

  const handleAcceptJob = () => {
    if (activeJobAlert) {
      setAcceptedJobsCount((prev) => prev + 1);
      setTodayEarnings((prev) => prev + activeJobAlert.rate);
      setActiveJobAlert(null);
    }
  };

  const handleDeclineJob = () => {
    setActiveJobAlert(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-col gap-6">
      {/* Header with Mode Alert */}
      <div className="bg-[#006194] text-white rounded-2xl p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsZn0MRlrnqp4RGLFTMJytV8iGjfkdolHIh9i0Fh7Q5Nzias06CP4p37kl3NYJefebRCy7dJTlsyLzHhUGfNWXvbiMU26CI9BHWajc79DuB5w8wVO7DKB5H-jWasxdPsAjBKyQo-oeYlBVWwkJf3Mw3R4-URvePAb7uXLoDGGZBFF1aYGBoT9dq5YWHBuAWrZom6I9BfaUd0oCviBAMLpVMpcpWeMH0h_Kh8BEEFmNChlCSq-_3ZSw"
              alt="Rajesh Kumar Sharma"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white/40 shadow-inner"
            />
            <span
              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                isOnline ? 'bg-[#7ffc97]' : 'bg-gray-400'
              }`}
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-xl sm:text-2xl font-bold">
                Rajesh Kumar Sharma
              </h1>
              <span className="text-[10px] bg-[#7ffc97] text-[#002109] px-2 py-0.5 rounded-full font-bold">
                Master Electrician
              </span>
            </div>
            <p className="text-xs text-[#cce5ff] mt-0.5">
              Servelink Bhopal Pro ID: #BPL-ELE-420 • Mesh Node #04 (Bhopal East)
            </p>
          </div>
        </div>

        {/* Online Toggle & Customer switch */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${
              isOnline
                ? 'bg-[#7ffc97] text-[#002109] shadow-sm'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-[#006b2c]' : 'bg-gray-400'}`} />
            <span>{isOnline ? 'Online: Accepting Jobs' : 'Offline'}</span>
          </button>

          <button
            onClick={onSwitchToCustomer}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
          >
            Switch to Customer
          </button>
        </div>
      </div>

      {/* Incoming Job Radar / Dispatch Alert */}
      {isOnline && activeJobAlert && (
        <div className="bg-white rounded-2xl p-6 border-2 border-[#006194] shadow-lg animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-[#eff4ff] pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ba1a1a] animate-ping" />
              <h3 className="font-display font-bold text-base text-[#ba1a1a]">
                New Hyperlocal Job Request Available!
              </h3>
            </div>
            <span className="text-xs bg-[#eff4ff] text-[#006194] px-2.5 py-1 rounded-full font-bold">
              {activeJobAlert.distance}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="md:col-span-2 space-y-1 text-xs">
              <span className="text-gray-400 block font-semibold uppercase tracking-wider text-[10px]">
                Service Requested
              </span>
              <p className="font-bold text-sm text-[#0b1c30]">{activeJobAlert.service}</p>
              <p className="text-[#3f4850]">
                📍 {activeJobAlert.location} • Client: {activeJobAlert.customer}
              </p>
            </div>

            <div className="flex flex-col justify-center items-start md:items-end bg-[#eff4ff] p-3 rounded-xl border border-[#d3e4fe]">
              <span className="text-[11px] text-[#3f4850]">Guaranteed Minimum Payout</span>
              <span className="font-display font-bold text-xl text-[#006194]">₹{activeJobAlert.rate}</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-4 pt-3 border-t border-[#eff4ff]">
            <button
              onClick={handleDeclineJob}
              className="px-4 py-2 text-xs font-semibold text-[#3f4850] hover:text-[#0b1c30]"
            >
              Pass to Next Technician
            </button>
            <button
              onClick={handleAcceptJob}
              className="bg-[#006b2c] hover:bg-[#005320] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span>Accept Job & Route GPS</span>
            </button>
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#d3e4fe] shadow-sm">
          <span className="text-xs text-[#3f4850] block">Today's Earnings</span>
          <span className="font-display font-bold text-2xl text-[#006194] mt-1 block">
            ₹{todayEarnings}
          </span>
          <span className="text-[10px] text-[#006b2c] font-semibold mt-1 block">
            Direct UPI settlements daily
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#d3e4fe] shadow-sm">
          <span className="text-xs text-[#3f4850] block">Jobs Completed</span>
          <span className="font-display font-bold text-2xl text-[#0b1c30] mt-1 block">
            {acceptedJobsCount} Today
          </span>
          <span className="text-[10px] text-[#3f4850] mt-1 block">
            420 All-Time Verified
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#d3e4fe] shadow-sm">
          <span className="text-xs text-[#3f4850] block">Customer Rating</span>
          <span className="font-display font-bold text-2xl text-[#0b1c30] mt-1 flex items-center gap-1">
            4.9
            <span className="material-symbols-outlined text-amber-500 text-[20px]">star</span>
          </span>
          <span className="text-[10px] text-[#3f4850] mt-1 block">
            From 184 reviews
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#d3e4fe] shadow-sm">
          <span className="text-xs text-[#3f4850] block">Acceptance Rate</span>
          <span className="font-display font-bold text-2xl text-[#006b2c] mt-1 block">
            98.4%
          </span>
          <span className="text-[10px] text-[#3f4850] mt-1 block">
            Average response: 45 secs
          </span>
        </div>
      </div>

      {/* Credentials & Mesh Badges */}
      <div className="bg-white rounded-2xl p-6 border border-[#d3e4fe] shadow-sm flex flex-col gap-4">
        <h3 className="font-display font-bold text-base text-[#0b1c30]">
          Verified Credentials & Safety Badges
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-[#eff4ff] p-3.5 rounded-xl border border-[#d3e4fe] flex items-center gap-3">
            <span className="material-symbols-outlined text-[#006194] text-[24px]">verified</span>
            <div>
              <p className="font-bold text-xs text-[#0b1c30]">Bhopal Gov Tech Certificate</p>
              <p className="text-[11px] text-[#3f4850]">Level 3 High Voltage Safety</p>
            </div>
          </div>
          <div className="bg-[#eff4ff] p-3.5 rounded-xl border border-[#d3e4fe] flex items-center gap-3">
            <span className="material-symbols-outlined text-[#006b2c] text-[24px]">shield</span>
            <div>
              <p className="font-bold text-xs text-[#0b1c30]">Police Background Clearance</p>
              <p className="text-[11px] text-[#3f4850]">Clean Record • Verified 2026</p>
            </div>
          </div>
          <div className="bg-[#eff4ff] p-3.5 rounded-xl border border-[#d3e4fe] flex items-center gap-3">
            <span className="material-symbols-outlined text-[#007bb9] text-[24px]">handshake</span>
            <div>
              <p className="font-bold text-xs text-[#0b1c30]">Havells & L&T Authorized</p>
              <p className="text-[11px] text-[#3f4850]">Official OEM Spare Access</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
