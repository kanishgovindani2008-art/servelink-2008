import React, { useState } from 'react';
import { Specialist, BHOPAL_AREAS, CATEGORIES } from '../data/mockData';

interface HomeScreenProps {
  specialists: Specialist[];
  selectedVicinity: string;
  setSelectedVicinity: (vicinity: string) => void;
  onOpenAITriage: () => void;
  onOpenPortfolio: (specialist: Specialist) => void;
  onOpenCall: (specialist: Specialist) => void;
  onOpenBooking: (specialist: Specialist) => void;
  onSelectCategory: (categoryId: string) => void;
  onSearchQuerySubmit: (query: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  specialists,
  selectedVicinity,
  setSelectedVicinity,
  onOpenAITriage,
  onOpenPortfolio,
  onOpenCall,
  onOpenBooking,
  onSelectCategory,
  onSearchQuerySubmit
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredSpecialists = specialists.filter((pro) => {
    if (activeFilter === 'available' && !pro.isAvailableToday) return false;
    if (activeFilter === 'within-3km' && pro.distanceKm > 3.0) return false;
    if (activeFilter === 'top-rated' && pro.rating < 4.9) return false;
    if (activeFilter === 'fixed-price' && pro.startingPrice > 300) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = pro.name.toLowerCase().includes(q);
      const matchRole = pro.role.toLowerCase().includes(q);
      const matchTags = pro.tags.some((t) => t.toLowerCase().includes(q));
      const matchCategory = pro.category.toLowerCase().includes(q);
      return matchName || matchRole || matchTags || matchCategory;
    }
    return true;
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchQuerySubmit(searchQuery);
    }
  };

  const handleTrendingClick = (tag: string) => {
    setSearchQuery(tag);
    onSearchQuerySubmit(tag);
  };

  return (
    <div className="w-full flex flex-col">
      {/* Top Demo Alert Banner */}
      <aside aria-label="Demo Notice" className="w-full bg-[#dce9ff] py-1.5 px-4 sm:px-8 border-b border-[#cce5ff]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#006194] text-white shrink-0">
              <span className="material-symbols-outlined text-[14px]">school</span>
            </span>
            <p className="text-[11px] sm:text-xs text-[#0b1c30] truncate">
              <strong className="font-semibold text-[#006194]">Servelink MVP</strong> • College Startup Competition Edition • Demo Data & Local Fallback Active
            </p>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-[#3f4850] text-[11px]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#006b2c] animate-pulse"></span>
            <span>Local Mesh Node #04 (Bhopal East)</span>
          </div>
        </div>
      </aside>

      {/* Welcome / Search / Location Sector */}
      <section className="w-full py-8 sm:py-10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          {/* Greeting Header with Contextual Location Selector */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-xs text-[#006194] tracking-wider uppercase font-semibold">
                Bhopal Hyperlocal Network
              </span>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0b1c30] tracking-tight mt-1">
                Good Morning, User!
              </h1>
              <p className="text-sm sm:text-base text-[#3f4850] mt-1">
                Book verified campus-vetted tradesmen and technicians within 15 minutes.
              </p>
            </div>

            {/* Custom Dropdown Selector */}
            <div className="relative inline-block self-start md:self-auto">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-[#3f4850] font-medium">Service Vicinity</span>
                <div className="relative">
                  <select
                    aria-label="Select Bhopal Vicinity"
                    value={selectedVicinity}
                    onChange={(e) => setSelectedVicinity(e.target.value)}
                    className="appearance-none bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0b1c30] text-xs sm:text-sm font-semibold pl-8 pr-9 py-2.5 rounded-xl cursor-pointer transition-colors shadow-sm focus:outline-none border border-[#d3e4fe]"
                  >
                    {BHOPAL_AREAS.map((area) => (
                      <option key={area.key} value={area.key}>
                        📍 {area.label}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[#006194] text-[18px] pointer-events-none">
                    my_location
                  </span>
                  <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[#3f4850] text-[18px] pointer-events-none">
                    unfold_more
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Omnisearch Command Bar */}
          <div className="w-full bg-white rounded-2xl shadow-md p-2 sm:p-3 border border-[#d3e4fe]">
            <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
              <div className="relative flex-1 flex items-center min-w-0">
                <span className="material-symbols-outlined absolute left-3.5 text-[#006194] text-[22px]">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for a service or professional... (e.g., AC PCB repair, EV scooter mechanic, Vikram Sharma)"
                  className="w-full bg-[#eff4ff] rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm text-[#0b1c30] placeholder:text-[#707881] focus:outline-none focus:bg-[#e5eeff] border border-transparent focus:border-[#006194] transition-all"
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1.5 bg-[#eff4ff] px-3.5 py-3 rounded-xl text-[#3f4850] text-xs border border-[#d3e4fe]">
                  <span className="material-symbols-outlined text-[18px] text-[#006b2c]">verified_user</span>
                  <span className="font-medium">100% Background-Checked</span>
                </div>
                <button
                  type="submit"
                  className="w-full md:w-auto bg-[#006194] hover:bg-[#007bb9] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>Find Experts</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </form>

            {/* Dynamic Query Pills */}
            <div className="flex items-center gap-2 mt-2 pt-1 overflow-x-auto no-scrollbar">
              <span className="text-[11px] text-[#3f4850] whitespace-nowrap pl-1">
                Trending in Bhopal:
              </span>
              <button
                type="button"
                onClick={() => handleTrendingClick('Voltas Split AC Gas Leak')}
                className="bg-[#e5eeff] px-2.5 py-1 rounded-full text-[#0b1c30] text-xs whitespace-nowrap hover:bg-[#d3e4fe] transition-colors border border-[#d3e4fe]"
              >
                Voltas Split AC Gas Leak
              </button>
              <button
                type="button"
                onClick={() => handleTrendingClick('Ather 450X Brake Pad')}
                className="bg-[#e5eeff] px-2.5 py-1 rounded-full text-[#0b1c30] text-xs whitespace-nowrap hover:bg-[#d3e4fe] transition-colors border border-[#d3e4fe]"
              >
                Ather 450X Brake Pad
              </button>
              <button
                type="button"
                onClick={() => handleTrendingClick('LG Inverter Board')}
                className="bg-[#e5eeff] px-2.5 py-1 rounded-full text-[#0b1c30] text-xs whitespace-nowrap hover:bg-[#d3e4fe] transition-colors border border-[#d3e4fe]"
              >
                LG Inverter Board
              </button>
              <button
                type="button"
                onClick={() => handleTrendingClick('Main MCB Tripping')}
                className="bg-[#e5eeff] px-2.5 py-1 rounded-full text-[#0b1c30] text-xs whitespace-nowrap hover:bg-[#d3e4fe] transition-colors border border-[#d3e4fe]"
              >
                Main MCB Tripping
              </button>
            </div>
          </div>

          {/* Prominent AI Feature Diagnostic Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#006194] to-[#007bb9] text-white p-6 sm:p-8 shadow-lg">
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-start gap-4 max-w-2xl">
                <div className="w-14 h-14 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center shrink-0 shadow-inner">
                  <span className="material-symbols-outlined text-[#7ffc97] text-[32px]">
                    auto_fix_high
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#7ffc97] text-[#002109]">
                      New Multimodal Engine
                    </span>
                    <span className="text-[#cce5ff] text-xs">• 30-sec Triage</span>
                  </div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-white mt-1.5 tracking-tight">
                    Not sure which service you need?
                  </h2>
                  <p className="text-xs sm:text-sm text-[#cce5ff] mt-1 leading-relaxed">
                    Describe your problem or upload a photo to find the right professional. Our AI maps symptoms directly to verified technicians.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-start lg:self-auto flex-wrap">
                <button
                  type="button"
                  onClick={onOpenAITriage}
                  className="bg-white hover:bg-[#eff4ff] text-[#006194] text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md transition-all active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-[#006194] text-[18px]">
                    arrow_back_ios_new
                  </span>
                  <span>AI Help Me</span>
                </button>
                <button
                  type="button"
                  onClick={onOpenAITriage}
                  className="bg-[#007bb9] hover:bg-[#006194] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1.5 border border-white/20 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">add_a_photo</span>
                  <span className="hidden sm:inline">Upload Snapshot</span>
                </button>
              </div>
            </div>

            {/* Ambient decorative geometry */}
            <div className="absolute -right-12 -bottom-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none blur-2xl" />
            <div className="absolute right-48 -top-12 w-48 h-48 rounded-full bg-[#7ffc97]/10 pointer-events-none blur-3xl" />
          </div>
        </div>
      </section>

      {/* Service Categories Grid (All 9 Required Categories) */}
      <section className="w-full py-8 px-4 sm:px-8 bg-[#eff4ff]/60 border-y border-[#d3e4fe]/50">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs text-[#006194] font-semibold uppercase tracking-wider">
                Browse Specializations
              </span>
              <h2 className="font-display text-2xl font-bold text-[#0b1c30] mt-0.5">
                Nine Core Service Categories
              </h2>
            </div>
            <button
              onClick={() => onSelectCategory('all')}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#e5eeff] rounded-full text-[#006194] text-xs font-semibold hover:bg-[#dce9ff] transition-colors"
              type="button"
            >
              <span>View All Categories</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mt-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="group bg-white rounded-2xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-all text-left border border-[#d3e4fe]/60 hover:border-[#006194]"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#006194] group-hover:bg-[#006194] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[26px]">{cat.icon}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {cat.tags?.map((t) => (
                      <span
                        key={t}
                        className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                          t === 'EV' ? 'bg-[#7ffc97] text-[#002109]' : 'bg-[#e5eeff] text-[#3f4850]'
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                    <span className="text-[11px] text-[#006b2c] font-bold">
                      {cat.prosCount} Pros
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="font-display font-semibold text-sm text-[#0b1c30] group-hover:text-[#006194] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-[#3f4850] mt-0.5 leading-snug">
                    {cat.shortDesc}
                  </p>
                </div>
              </button>
            ))}

            {/* 10th Quick Tile: View All */}
            <button
              onClick={() => onSelectCategory('all')}
              className="group bg-[#dce9ff]/70 hover:bg-[#d3e4fe] rounded-2xl p-4 flex flex-col justify-center items-center text-center shadow-sm transition-colors border border-[#cce5ff]"
            >
              <div className="w-12 h-12 rounded-full bg-[#006194]/10 flex items-center justify-center text-[#006194]">
                <span className="material-symbols-outlined text-[26px]">grid_view</span>
              </div>
              <span className="font-display text-xs font-bold text-[#006194] mt-2.5">
                View All Categories
              </span>
              <span className="text-[11px] text-[#3f4850] mt-0.5">32 Specialized Niches</span>
            </button>
          </div>
        </div>
      </section>

      {/* Live Hyperlocal Quick Filter Chips */}
      <section className="w-full py-4 px-4 sm:px-8 bg-white border-b border-[#eff4ff]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-[#3f4850] font-medium">Quick Filters:</span>
            <button
              onClick={() => setActiveFilter(activeFilter === 'available' ? 'all' : 'available')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                activeFilter === 'available'
                  ? 'bg-[#006194] text-white shadow-sm'
                  : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#e5eeff] border border-[#d3e4fe]'
              }`}
            >
              Available Right Now
            </button>
            <button
              onClick={() => setActiveFilter(activeFilter === 'within-3km' ? 'all' : 'within-3km')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                activeFilter === 'within-3km'
                  ? 'bg-[#006194] text-white shadow-sm'
                  : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#e5eeff] border border-[#d3e4fe]'
              }`}
            >
              Within 3 km
            </button>
            <button
              onClick={() => setActiveFilter(activeFilter === 'top-rated' ? 'all' : 'top-rated')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                activeFilter === 'top-rated'
                  ? 'bg-[#006194] text-white shadow-sm'
                  : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#e5eeff] border border-[#d3e4fe]'
              }`}
            >
              Top Rated (4.8+)
            </button>
            <button
              onClick={() => setActiveFilter(activeFilter === 'fixed-price' ? 'all' : 'fixed-price')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                activeFilter === 'fixed-price'
                  ? 'bg-[#006194] text-white shadow-sm'
                  : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#e5eeff] border border-[#d3e4fe]'
              }`}
            >
              Fixed Price Guarantee
            </button>
          </div>

          <span className="text-xs text-[#3f4850]">
            Showing {filteredSpecialists.length} verified local pros
          </span>
        </div>
      </section>

      {/* Recommended Professionals Section (Grid of Verified Cards) */}
      <section className="w-full py-8 sm:py-10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1">
            <div>
              <span className="text-xs text-[#006b2c] font-bold tracking-wider uppercase">
                Direct Dispatch
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0b1c30] mt-0.5">
                Recommended Bhopal Specialists
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#3f4850]">
              Identity verified via Servelink Local Mesh Protocol
            </p>
          </div>

          {/* Grid of Specialists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSpecialists.slice(0, 4).map((specialist) => (
              <article
                key={specialist.id}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-4 border border-[#d3e4fe]/80"
              >
                <div className="flex flex-col gap-4">
                  {/* Header Row: Avatar, Identity & Badge, Availability */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3.5">
                      <img
                        className="w-16 h-16 rounded-2xl object-cover bg-[#eff4ff] border border-[#d3e4fe]"
                        src={specialist.avatar}
                        alt={specialist.name}
                      />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-display font-bold text-base sm:text-lg text-[#0b1c30]">
                            {specialist.name}
                          </h3>
                          <span className="inline-flex items-center text-[#006b2c]" title="Verified Background Pro">
                            <span className="material-symbols-outlined text-[18px]">verified</span>
                          </span>
                        </div>
                        <span className="text-xs text-[#3f4850] font-medium">
                          {specialist.role} • {specialist.certification}
                        </span>

                        {/* Rating & Location snippet */}
                        <div className="flex items-center gap-2 mt-1 flex-wrap text-xs">
                          <span className="flex items-center gap-0.5 font-bold text-[#0b1c30]">
                            <span className="material-symbols-outlined text-[16px] text-amber-500">
                              star
                            </span>
                            {specialist.rating}
                          </span>
                          <span className="text-[#3f4850]">({specialist.reviewsCount} reviews)</span>
                          <span className="text-[#3f4850]">•</span>
                          <span className="flex items-center gap-0.5 text-[#3f4850]">
                            <span className="material-symbols-outlined text-[14px]">location_on</span>
                            {specialist.location} • {specialist.distanceKm} km away
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Green availability pill */}
                    {specialist.isAvailableToday && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#7ffc97] text-[#002109] text-[11px] font-bold shrink-0">
                        <span className="w-2 h-2 rounded-full bg-[#006b2c]"></span>
                        Available Today
                      </span>
                    )}
                  </div>

                  {/* Tags & Specializations */}
                  <div className="flex flex-wrap gap-1.5">
                    {specialist.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#eff4ff] px-2.5 py-0.5 rounded-md text-[#0b1c30] text-xs font-medium border border-[#d3e4fe]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Metrics Bar */}
                  <div className="grid grid-cols-3 gap-2 bg-[#eff4ff] rounded-xl p-3 text-center border border-[#d3e4fe]/60">
                    <div>
                      <span className="block text-[11px] text-[#3f4850]">Completed Jobs</span>
                      <span className="font-display font-bold text-sm text-[#0b1c30]">
                        {specialist.completedJobs}+ jobs
                      </span>
                    </div>
                    <div>
                      <span className="block text-[11px] text-[#3f4850]">Experience</span>
                      <span className="font-display font-bold text-sm text-[#0b1c30]">
                        {specialist.experienceYears} yrs exp
                      </span>
                    </div>
                    <div>
                      <span className="block text-[11px] text-[#3f4850]">Starting Price</span>
                      <span className="font-display font-bold text-sm text-[#006194]">
                        From ₹{specialist.startingPrice}
                      </span>
                    </div>
                  </div>
                </div>

                {/* EXACT MANDATORY 3 ACTIONS IN ORDER: 1) Previous Work, 2) Call, 3) Book Now (NO MESSAGE BUTTON) */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {/* 1. Previous Work */}
                  <button
                    onClick={() => onOpenPortfolio(specialist)}
                    className="w-full bg-[#eff4ff] hover:bg-[#dce9ff] text-[#006194] text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1 transition-colors border border-[#d3e4fe]"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">photo_library</span>
                    <span>Previous Work</span>
                  </button>

                  {/* 2. Call */}
                  <button
                    onClick={() => onOpenCall(specialist)}
                    className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1 transition-colors shadow-sm"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">call</span>
                    <span>Call</span>
                  </button>

                  {/* 3. Book Now */}
                  <button
                    onClick={() => onOpenBooking(specialist)}
                    className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1 transition-colors shadow-sm"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                    <span>Book Now</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Trust & Operational Transparency Section */}
      <section className="w-full py-10 px-4 sm:px-8 bg-[#eff4ff]/60 border-t border-[#d3e4fe]/60">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#d3e4fe] flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#006194]/10 text-[#006194] flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">shield_person</span>
            </div>
            <h3 className="font-display font-bold text-base text-[#0b1c30]">Vetted Background Checks</h3>
            <p className="text-xs sm:text-sm text-[#3f4850] leading-relaxed">
              Every professional undergoes dual ID authentication, police clearance, and trade certificate verification before accepting appointments.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#d3e4fe] flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#006b2c]/10 text-[#006b2c] flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">receipt_long</span>
            </div>
            <h3 className="font-display font-bold text-base text-[#0b1c30]">Transparent Upfront Pricing</h3>
            <p className="text-xs sm:text-sm text-[#3f4850] leading-relaxed">
              Standardized inspection rates start from ₹199. Final costs are estimated via digital bill before parts replacement begins.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#d3e4fe] flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#007bb9]/10 text-[#007bb9] flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">schedule</span>
            </div>
            <h3 className="font-display font-bold text-base text-[#0b1c30]">15-Minute Local Dispatch</h3>
            <p className="text-xs sm:text-sm text-[#3f4850] leading-relaxed">
              Our algorithmic area clustering in Bhopal connects you only to pros within a 4 km radial perimeter for rapid turnaround.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
