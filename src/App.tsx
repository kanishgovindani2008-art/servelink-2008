/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  INITIAL_SPECIALISTS,
  INITIAL_BOOKINGS,
  Specialist,
  Booking,
  BHOPAL_AREAS
} from './data/mockData';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { SearchScreen } from './components/SearchScreen';
import { BookingsScreen } from './components/BookingsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { ProDashboard } from './components/ProDashboard';
import { AITriageModal } from './components/AITriageModal';
import { PortfolioModal } from './components/PortfolioModal';
import { BookingModal } from './components/BookingModal';
import { CallModal } from './components/CallModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'search' | 'my-bookings' | 'profile'>('home');
  const [selectedVicinity, setSelectedVicinity] = useState<string>('mp-nagar');
  const [demoMode, setDemoMode] = useState<'customer' | 'pro'>('customer');
  const [specialists, setSpecialists] = useState<Specialist[]>(INITIAL_SPECIALISTS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);

  // Modal states
  const [portfolioSpecialist, setPortfolioSpecialist] = useState<Specialist | null>(null);
  const [bookingSpecialist, setBookingSpecialist] = useState<Specialist | null>(null);
  const [callSpecialist, setCallSpecialist] = useState<Specialist | null>(null);
  const [isAITriageOpen, setIsAITriageOpen] = useState(false);

  // Search parameters when triggered from categories or search queries
  const [searchCategory, setSearchCategory] = useState<string>('all');
  const [searchInitialQuery, setSearchInitialQuery] = useState<string>('');

  // Toast notification state
  const [toast, setToast] = useState<{ title: string; message: string } | null>(null);

  const showToast = (title: string, message: string) => {
    setToast({ title, message });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const handleVicinityChange = (newVicinity: string) => {
    setSelectedVicinity(newVicinity);
    const area = BHOPAL_AREAS.find((a) => a.key === newVicinity);

    // Dynamically recalculate specialist distances based on selected vicinity
    const updated = specialists.map((s) => {
      let dist = s.distanceKm;
      if (s.vicinityKey === newVicinity) {
        dist = Number((1.1 + Math.random() * 0.8).toFixed(1));
      } else {
        dist = Number((2.8 + Math.random() * 2.2).toFixed(1));
      }
      return { ...s, distanceKm: dist };
    });
    setSpecialists(updated);

    showToast(
      'Vicinity Updated',
      `Vicinity centered on ${area?.short || 'Bhopal'}. Specialists re-clustered within 4 km.`
    );
  };

  const handleConfirmBooking = (newBooking: Booking) => {
    setBookings([newBooking, ...bookings]);
    showToast(
      'Booking Request Dispatched',
      `${newBooking.proName} has accepted your request. ETA: ~${newBooking.etaMinutes} mins.`
    );
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings(bookings.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' } : b)));
    showToast('Dispatch Cancelled', 'The technician dispatch has been safely cancelled.');
  };

  const handleCategorySelectFromHome = (categoryId: string) => {
    setSearchCategory(categoryId);
    setSearchInitialQuery('');
    setCurrentTab('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmitFromHome = (query: string) => {
    setSearchInitialQuery(query);
    setSearchCategory('all');
    setCurrentTab('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      {/* Fixed Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        selectedVicinity={selectedVicinity}
        setSelectedVicinity={handleVicinityChange}
        demoMode={demoMode}
        setDemoMode={setDemoMode}
        unreadCount={bookings.filter((b) => b.status === 'en_route').length}
      />

      {/* Main Content Area */}
      <main className="w-full pt-20 flex-1">
        {demoMode === 'pro' ? (
          <ProDashboard onSwitchToCustomer={() => setDemoMode('customer')} />
        ) : (
          <>
            {currentTab === 'home' && (
              <HomeScreen
                specialists={specialists}
                selectedVicinity={selectedVicinity}
                setSelectedVicinity={handleVicinityChange}
                onOpenAITriage={() => setIsAITriageOpen(true)}
                onOpenPortfolio={(pro) => setPortfolioSpecialist(pro)}
                onOpenCall={(pro) => setCallSpecialist(pro)}
                onOpenBooking={(pro) => setBookingSpecialist(pro)}
                onSelectCategory={handleCategorySelectFromHome}
                onSearchQuerySubmit={handleSearchSubmitFromHome}
              />
            )}

            {currentTab === 'search' && (
              <SearchScreen
                specialists={specialists}
                initialCategory={searchCategory}
                initialQuery={searchInitialQuery}
                onOpenPortfolio={(pro) => setPortfolioSpecialist(pro)}
                onOpenCall={(pro) => setCallSpecialist(pro)}
                onOpenBooking={(pro) => setBookingSpecialist(pro)}
              />
            )}

            {currentTab === 'my-bookings' && (
              <BookingsScreen
                bookings={bookings}
                specialists={specialists}
                onOpenCall={(pro) => setCallSpecialist(pro)}
                onOpenBooking={(pro) => setBookingSpecialist(pro)}
                onCancelBooking={handleCancelBooking}
              />
            )}

            {currentTab === 'profile' && (
              <ProfileScreen onSwitchToPro={() => setDemoMode('pro')} />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAI={() => setIsAITriageOpen(true)}
      />

      {/* AI Multimodal Triage Modal */}
      <AITriageModal
        isOpen={isAITriageOpen}
        onClose={() => setIsAITriageOpen(false)}
        specialists={specialists}
        onSelectPro={(proId) => {
          const pro = specialists.find((p) => p.id === proId) || specialists[0];
          setBookingSpecialist(pro);
        }}
      />

      {/* Portfolio Showcase Modal */}
      <PortfolioModal
        specialist={portfolioSpecialist}
        onClose={() => setPortfolioSpecialist(null)}
        onBookNow={(pro) => {
          setBookingSpecialist(pro);
        }}
      />

      {/* Direct Dispatch & Booking Modal */}
      <BookingModal
        specialist={bookingSpecialist}
        onClose={() => setBookingSpecialist(null)}
        onConfirmBooking={handleConfirmBooking}
        defaultVicinity={selectedVicinity}
      />

      {/* Call Modal */}
      <CallModal
        specialist={callSpecialist}
        onClose={() => setCallSpecialist(null)}
      />

      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-white text-[#0b1c30] px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border-l-4 border-[#0284c7] border border-[#d3e4fe] animate-in slide-in-from-bottom-5 duration-200">
          <span className="material-symbols-outlined text-[#0284c7] text-[26px]">task_alt</span>
          <div>
            <h4 className="text-xs font-bold text-[#0b1c30]">{toast.title}</h4>
            <p className="text-xs text-[#3f4850]">{toast.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
