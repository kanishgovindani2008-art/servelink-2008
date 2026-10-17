import React, { useState } from 'react';
import { Specialist, Booking, CATEGORIES } from '../data/mockData';

interface BookingModalProps {
  specialist: Specialist | null;
  onClose: () => void;
  onConfirmBooking: (booking: Booking) => void;
  defaultVicinity: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  specialist,
  onClose,
  onConfirmBooking,
  defaultVicinity
}) => {
  if (!specialist) return null;

  const categoryData = CATEGORIES.find((c) => c.id === specialist.category);
  const availableServices = categoryData?.popularServices || [
    { title: `General Diagnosis & Inspection for ${specialist.role}`, price: specialist.startingPrice }
  ];

  const [selectedService, setSelectedService] = useState(availableServices[0]);
  const [selectedSlot, setSelectedSlot] = useState('Within 15-30 Mins (Emergency Dispatch)');
  const [address, setAddress] = useState(`Flat 302, Phase 1, near main market, ${specialist.location}`);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    'Within 15-30 Mins (Emergency Dispatch)',
    'Today 2:00 PM - 4:00 PM',
    'Today 5:00 PM - 7:00 PM',
    'Tomorrow 10:00 AM - 12:00 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
    const newBooking: Booking = {
      id: `SL-${Math.floor(8800 + Math.random() * 200)}`,
      proId: specialist.id,
      proName: specialist.name,
      proRole: specialist.role,
      proAvatar: specialist.avatar,
      proPhone: specialist.phone,
      serviceTitle: selectedService.title,
      date: 'Today, Oct 17',
      timeSlot: selectedSlot,
      address,
      vicinity: specialist.location,
      price: selectedService.price,
      status: 'en_route',
      otp: randomOtp,
      createdAt: 'Just now',
      etaMinutes: 14
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onConfirmBooking(newBooking);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#213145]/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-4 border border-[#d3e4fe] animate-in fade-in zoom-in-95 duration-150">
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
                <h3 className="font-display font-bold text-base text-[#0b1c30]">
                  Dispatch {specialist.name}
                </h3>
                <span className="material-symbols-outlined text-[#006b2c] text-[16px]">verified</span>
              </div>
              <p className="text-xs text-[#3f4850]">
                {specialist.role} • {specialist.distanceKm} km away
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Booking Modal"
            className="p-1 rounded-full text-[#3f4850] hover:bg-[#eff4ff] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Select Service Type */}
          <div>
            <label className="block text-xs font-semibold text-[#0b1c30] mb-1.5">
              Select Service Required:
            </label>
            <div className="space-y-1.5">
              {availableServices.map((svc) => (
                <label
                  key={svc.title}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                    selectedService.title === svc.title
                      ? 'bg-[#eff4ff] border-[#006194] text-[#006194] font-semibold'
                      : 'border-[#d3e4fe] hover:bg-[#f8f9ff] text-[#0b1c30]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="serviceOption"
                      checked={selectedService.title === svc.title}
                      onChange={() => setSelectedService(svc)}
                      className="text-[#006194] focus:ring-[#006194]"
                    />
                    <span>{svc.title}</span>
                  </div>
                  <span className="font-bold">₹{svc.price}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Select Time Slot */}
          <div>
            <label className="block text-xs font-semibold text-[#0b1c30] mb-1.5">
              Choose Dispatch Window:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-2 rounded-xl text-left text-xs border transition-colors ${
                    selectedSlot === slot
                      ? 'bg-[#006194] text-white border-[#006194] font-semibold shadow-sm'
                      : 'bg-[#eff4ff] text-[#0b1c30] border-[#d3e4fe] hover:bg-[#dce9ff]'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Service Address */}
          <div>
            <label className="block text-xs font-semibold text-[#0b1c30] mb-1">
              Bhopal Service Address & Landmark:
            </label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-[#eff4ff] rounded-xl px-3 py-2 text-xs text-[#0b1c30] border border-[#d3e4fe] focus:outline-none focus:ring-2 focus:ring-[#006194]"
              placeholder="House/Flat No., Building, Street..."
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-[#0b1c30] mb-1">
              Notes for the Technician (Optional):
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#eff4ff] rounded-xl px-3 py-2 text-xs text-[#0b1c30] border border-[#d3e4fe] focus:outline-none focus:ring-2 focus:ring-[#006194]"
              placeholder="e.g. Ring bell twice, bring ladder / spare capacitor..."
            />
          </div>

          {/* Pricing Transparency Card */}
          <div className="bg-[#eff4ff] p-3 rounded-xl border border-[#d3e4fe] space-y-1 text-xs">
            <div className="flex justify-between text-[#3f4850]">
              <span>Base Service Inspection</span>
              <span>₹{selectedService.price}</span>
            </div>
            <div className="flex justify-between text-[#3f4850]">
              <span>Gov Tech Background Check Protocol</span>
              <span className="text-[#006b2c] font-semibold">FREE (Covered by Servelink)</span>
            </div>
            <div className="border-t border-[#d3e4fe] pt-1 mt-1 flex justify-between font-bold text-[#0b1c30]">
              <span>Total Estimated Upfront</span>
              <span className="text-[#006194] text-sm">₹{selectedService.price}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#3f4850] hover:text-[#0b1c30]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">task_alt</span>
              <span>{isSubmitting ? 'Dispatching Pro...' : 'Confirm & Dispatch Pro'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
