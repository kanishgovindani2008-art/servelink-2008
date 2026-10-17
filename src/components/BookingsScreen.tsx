import React, { useState } from 'react';
import { Booking, Specialist } from '../data/mockData';

interface BookingsScreenProps {
  bookings: Booking[];
  specialists: Specialist[];
  onOpenCall: (specialist: Specialist) => void;
  onOpenBooking: (specialist: Specialist) => void;
  onCancelBooking: (bookingId: string) => void;
}

export const BookingsScreen: React.FC<BookingsScreenProps> = ({
  bookings,
  specialists,
  onOpenCall,
  onOpenBooking,
  onCancelBooking
}) => {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

  const activeBookings = bookings.filter((b) => b.status === 'en_route' || b.status === 'dispatched' || b.status === 'in_progress');
  const pastBookings = bookings.filter((b) => b.status === 'completed' || b.status === 'cancelled');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0b1c30]">
            My Service Bookings
          </h1>
          <p className="text-xs sm:text-sm text-[#3f4850] mt-0.5">
            Real-time technician tracking & dispatch verification in Bhopal
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center bg-white p-1 rounded-xl border border-[#d3e4fe] self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'active'
                ? 'bg-[#006194] text-white shadow-sm'
                : 'text-[#3f4850] hover:text-[#0b1c30]'
            }`}
          >
            Active Dispatches ({activeBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'history'
                ? 'bg-[#006194] text-white shadow-sm'
                : 'text-[#3f4850] hover:text-[#0b1c30]'
            }`}
          >
            Completed History ({pastBookings.length})
          </button>
        </div>
      </div>

      {activeTab === 'active' ? (
        activeBookings.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#d3e4fe] flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#006194]">
              <span className="material-symbols-outlined text-[32px]">calendar_today</span>
            </div>
            <h3 className="font-display font-bold text-lg text-[#0b1c30]">No Active Bookings Right Now</h3>
            <p className="text-xs sm:text-sm text-[#3f4850] max-w-md">
              Need urgent help with AC, MCB tripping, or plumbing leaks? Book verified Bhopal tradesmen with 15-minute dispatch.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {activeBookings.map((b) => {
              const matchedPro = specialists.find((p) => p.id === b.proId) || specialists[0];
              return (
                <div
                  key={b.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-[#d3e4fe] flex flex-col gap-5"
                >
                  {/* Top info row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#eff4ff] pb-4">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={b.proAvatar}
                        alt={b.proName}
                        className="w-14 h-14 rounded-xl object-cover bg-[#eff4ff] border border-[#d3e4fe]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-display font-bold text-lg text-[#0b1c30]">
                            {b.proName}
                          </h3>
                          <span className="text-[10px] bg-[#7ffc97] text-[#002109] px-2 py-0.5 rounded-full font-bold">
                            En Route
                          </span>
                        </div>
                        <p className="text-xs text-[#3f4850] font-medium">
                          {b.serviceTitle}
                        </p>
                        <p className="text-[11px] text-[#006194] mt-0.5 font-semibold">
                          Booking ID: {b.id} • Scheduled: {b.date} ({b.timeSlot})
                        </p>
                      </div>
                    </div>

                    {/* Arrival ETA Badge & OTP */}
                    <div className="flex items-center gap-3 bg-[#eff4ff] p-3 rounded-xl border border-[#d3e4fe]">
                      <div>
                        <span className="text-[10px] text-[#3f4850] uppercase tracking-wider font-semibold block">
                          Arrival ETA
                        </span>
                        <span className="font-display font-bold text-base text-[#006194]">
                          ~{b.etaMinutes} Mins
                        </span>
                      </div>
                      <div className="border-l border-[#d3e4fe] pl-3">
                        <span className="text-[10px] text-[#3f4850] uppercase tracking-wider font-semibold block">
                          Security OTP
                        </span>
                        <span className="font-mono font-bold text-base text-[#006b2c] tracking-wider">
                          {b.otp}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Visual Dispatch Progress Tracker */}
                  <div className="py-2">
                    <span className="text-xs font-bold text-[#0b1c30] block mb-3">
                      Live Bhopal Mesh Dispatch Status:
                    </span>
                    <div className="grid grid-cols-4 gap-2 relative">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-8 h-8 rounded-full bg-[#006b2c] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                          ✓
                        </div>
                        <span className="text-[11px] font-semibold text-[#0b1c30] mt-1.5">Dispatched</span>
                        <span className="text-[10px] text-[#3f4850]">{b.createdAt}</span>
                      </div>

                      <div className="flex flex-col items-center text-center">
                        <div className="w-8 h-8 rounded-full bg-[#006b2c] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                          ✓
                        </div>
                        <span className="text-[11px] font-semibold text-[#0b1c30] mt-1.5">Tech Assigned</span>
                        <span className="text-[10px] text-[#3f4850]">Verified Pro</span>
                      </div>

                      <div className="flex flex-col items-center text-center">
                        <div className="w-8 h-8 rounded-full bg-[#006194] text-white flex items-center justify-center text-xs font-bold animate-pulse shadow-md">
                          <span className="material-symbols-outlined text-[16px]">navigation</span>
                        </div>
                        <span className="text-[11px] font-bold text-[#006194] mt-1.5">On The Way</span>
                        <span className="text-[10px] text-[#006194] font-semibold">In Transit</span>
                      </div>

                      <div className="flex flex-col items-center text-center opacity-40">
                        <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs font-bold">
                          4
                        </div>
                        <span className="text-[11px] font-semibold text-gray-500 mt-1.5">At Doorstep</span>
                        <span className="text-[10px] text-gray-400">Share OTP</span>
                      </div>
                    </div>
                  </div>

                  {/* Destination Details & Cost */}
                  <div className="bg-[#eff4ff] p-3.5 rounded-xl border border-[#d3e4fe] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="text-[#3f4850] block font-medium">Service Destination:</span>
                      <span className="font-semibold text-[#0b1c30]">{b.address}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[#3f4850] block font-medium">Standard Inspection Fee:</span>
                      <span className="font-bold text-sm text-[#006194]">₹{b.price}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
                    <button
                      onClick={() => onCancelBooking(b.id)}
                      className="text-xs text-[#ba1a1a] hover:underline font-semibold"
                    >
                      Cancel Dispatch
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onOpenCall(matchedPro)}
                        className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">call</span>
                        <span>Call {b.proName.split(' ')[0]}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : (
        /* History Tab */
        <div className="flex flex-col gap-4">
          {pastBookings.map((b) => {
            const matchedPro = specialists.find((p) => p.id === b.proId) || specialists[0];
            return (
              <div
                key={b.id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-[#d3e4fe] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={b.proAvatar}
                    alt={b.proName}
                    className="w-12 h-12 rounded-xl object-cover bg-[#eff4ff] border border-[#d3e4fe]"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-display font-bold text-base text-[#0b1c30]">{b.proName}</h4>
                      <span className="text-[10px] bg-gray-100 text-[#006b2c] px-2 py-0.5 rounded font-bold">
                        Completed
                      </span>
                    </div>
                    <p className="text-xs text-[#3f4850]">{b.serviceTitle}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{b.date} • {b.vicinity}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-[11px] text-gray-500 block">Billed Total</span>
                    <span className="font-bold text-sm text-[#0b1c30]">₹{b.price}</span>
                  </div>
                  <button
                    onClick={() => onOpenBooking(matchedPro)}
                    className="bg-[#eff4ff] hover:bg-[#dce9ff] text-[#006194] text-xs font-bold px-3 py-2 rounded-xl border border-[#d3e4fe] transition-colors"
                  >
                    Re-Book
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
