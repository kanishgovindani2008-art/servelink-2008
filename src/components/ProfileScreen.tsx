import React, { useState } from 'react';

interface ProfileScreenProps {
  onSwitchToPro: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onSwitchToPro }) => {
  const [userName, setUserName] = useState('Anand Verma');
  const [userPhone, setUserPhone] = useState('+91 98260 12345');
  const [userEmail, setUserEmail] = useState('anand.verma@bhopalnet.in');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 py-8 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0b1c30]">
            User Account & Preferences
          </h1>
          <p className="text-xs sm:text-sm text-[#3f4850] mt-0.5">
            Manage your Bhopal hyperlocal dispatch profile & saved locations
          </p>
        </div>

        <button
          onClick={onSwitchToPro}
          className="bg-[#006194] hover:bg-[#007bb9] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition-colors self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-[16px]">engineering</span>
          <span>Switch to Tradesman Pro View</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="bg-[#7ffc97]/30 border border-[#006b2c] p-3 rounded-xl text-xs text-[#002109] font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-[#006b2c]">check_circle</span>
          Profile updated successfully!
        </div>
      )}

      {/* Profile Form */}
      <div className="bg-white rounded-2xl p-6 border border-[#d3e4fe] shadow-sm flex flex-col gap-4">
        <h3 className="font-display font-bold text-base text-[#0b1c30]">
          Personal Contact Information
        </h3>
        <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#0b1c30] mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-[#eff4ff] rounded-xl px-3.5 py-2.5 text-xs text-[#0b1c30] border border-[#d3e4fe] focus:outline-none focus:ring-2 focus:ring-[#006194]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0b1c30] mb-1">
              Registered Mobile (for OTP SMS)
            </label>
            <input
              type="text"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              className="w-full bg-[#eff4ff] rounded-xl px-3.5 py-2.5 text-xs text-[#0b1c30] border border-[#d3e4fe] focus:outline-none focus:ring-2 focus:ring-[#006194]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#0b1c30] mb-1">
              Email Address (for Invoices & Work Receipts)
            </label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full bg-[#eff4ff] rounded-xl px-3.5 py-2.5 text-xs text-[#0b1c30] border border-[#d3e4fe] focus:outline-none focus:ring-2 focus:ring-[#006194]"
            />
          </div>

          <div className="sm:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-[#006194] hover:bg-[#007bb9] text-white text-xs font-semibold px-5 py-2 rounded-xl transition-colors"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>

      {/* Saved Addresses in Bhopal */}
      <div className="bg-white rounded-2xl p-6 border border-[#d3e4fe] shadow-sm flex flex-col gap-4">
        <h3 className="font-display font-bold text-base text-[#0b1c30]">
          Saved Dispatch Addresses
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-[#eff4ff] p-4 rounded-xl border border-[#d3e4fe] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#006194] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">home</span>
                  Home (Primary)
                </span>
                <span className="text-[10px] bg-[#cce5ff] text-[#001d31] px-1.5 py-0.5 rounded font-bold">
                  MP Nagar Zone II
                </span>
              </div>
              <p className="text-xs text-[#0b1c30] font-medium mt-2">
                Flat 204, Silver Oak Heights, near Sargam Cinema, MP Nagar Zone II, Bhopal - 462011
              </p>
            </div>
            <span className="text-[11px] text-[#006b2c] font-semibold mt-3 block">
              Default dispatch vicinity
            </span>
          </div>

          <div className="bg-[#eff4ff] p-4 rounded-xl border border-[#d3e4fe] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0b1c30] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">business</span>
                  Work / Studio
                </span>
                <span className="text-[10px] bg-[#e5eeff] text-[#3f4850] px-1.5 py-0.5 rounded font-bold">
                  Arera Colony
                </span>
              </div>
              <p className="text-xs text-[#0b1c30] font-medium mt-2">
                Plot 18, Commercial Lane, E-6 Arera Colony, Bhopal - 462016
              </p>
            </div>
            <span className="text-[11px] text-[#3f4850] mt-3 block">
              Secondary address
            </span>
          </div>
        </div>
      </div>

      {/* Emergency Local Civic Contacts in Bhopal */}
      <div className="bg-white rounded-2xl p-6 border border-[#d3e4fe] shadow-sm flex flex-col gap-3">
        <h3 className="font-display font-bold text-base text-[#0b1c30]">
          Bhopal City Emergency Civic Helplines
        </h3>
        <p className="text-xs text-[#3f4850]">
          In case of electrical fires, high-voltage transformer bursts, or major main line sewer leaks:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-[#eff4ff] p-3 rounded-xl border border-[#d3e4fe]">
            <span className="block font-semibold text-[#0b1c30]">Electricity Discom Call Center</span>
            <span className="font-bold text-[#006194] text-sm mt-0.5 block">1912</span>
            <span className="text-[10px] text-gray-500">MPPKVVCL Bhopal Central</span>
          </div>
          <div className="bg-[#eff4ff] p-3 rounded-xl border border-[#d3e4fe]">
            <span className="block font-semibold text-[#0b1c30]">BMC Water & Drainage Control</span>
            <span className="font-bold text-[#006194] text-sm mt-0.5 block">0755-2540220</span>
            <span className="text-[10px] text-gray-500">Bhopal Municipal Helpline</span>
          </div>
          <div className="bg-[#eff4ff] p-3 rounded-xl border border-[#d3e4fe]">
            <span className="block font-semibold text-[#0b1c30]">Fire & Disaster Response</span>
            <span className="font-bold text-[#ba1a1a] text-sm mt-0.5 block">101 / 112</span>
            <span className="text-[10px] text-gray-500">24/7 Police & Rescue</span>
          </div>
        </div>
      </div>
    </div>
  );
};
