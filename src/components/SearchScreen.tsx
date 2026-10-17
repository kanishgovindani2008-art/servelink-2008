import React, { useState } from 'react';
import { Specialist, CATEGORIES, BHOPAL_AREAS } from '../data/mockData';

interface SearchScreenProps {
  specialists: Specialist[];
  initialCategory?: string;
  initialQuery?: string;
  onOpenPortfolio: (specialist: Specialist) => void;
  onOpenCall: (specialist: Specialist) => void;
  onOpenBooking: (specialist: Specialist) => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({
  specialists,
  initialCategory = 'all',
  initialQuery = '',
  onOpenPortfolio,
  onOpenCall,
  onOpenBooking
}) => {
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'price'>('distance');
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const filtered = specialists
    .filter((pro) => {
      if (selectedCategory !== 'all' && pro.category !== selectedCategory) return false;
      if (onlyAvailable && !pro.isAvailableToday) return false;

      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchName = pro.name.toLowerCase().includes(q);
        const matchRole = pro.role.toLowerCase().includes(q);
        const matchLocation = pro.location.toLowerCase().includes(q);
        const matchTags = pro.tags.some((t) => t.toLowerCase().includes(q));
        return matchName || matchRole || matchLocation || matchTags;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price') return a.startingPrice - b.startingPrice;
      return 0;
    });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-col gap-6">
      {/* Title & Search bar */}
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0b1c30]">
          Find Verified Bhopal Specialists
        </h1>
        <p className="text-xs sm:text-sm text-[#3f4850]">
          Search across 9 core disciplines and 32 specialized repair niches in Bhopal.
        </p>

        {/* Search Input Bar */}
        <div className="relative mt-2">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#006194] text-[22px]">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by specialty, symptom, pro name, or area (e.g. AC Gas Leak, MCB, Indrapuri)..."
            className="w-full bg-white rounded-2xl pl-11 pr-4 py-3.5 text-xs sm:text-sm text-[#0b1c30] placeholder:text-[#707881] border border-[#d3e4fe] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#006194]"
          />
        </div>
      </div>

      {/* Filter Tabs (Categories + Sort controls) */}
      <div className="flex flex-col gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#006194] text-white shadow-sm'
                : 'bg-white text-[#3f4850] hover:bg-[#eff4ff] border border-[#d3e4fe]'
            }`}
          >
            All Categories ({specialists.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-[#006194] text-white shadow-sm'
                  : 'bg-white text-[#3f4850] hover:bg-[#eff4ff] border border-[#d3e4fe]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Sort & Availability Bar */}
        <div className="flex items-center justify-between gap-4 flex-wrap bg-white p-3 rounded-xl border border-[#d3e4fe] text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#3f4850] font-medium">Sort By:</span>
            <button
              onClick={() => setSortBy('distance')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                sortBy === 'distance' ? 'bg-[#dae2fd] text-[#006194]' : 'text-[#3f4850] hover:bg-[#eff4ff]'
              }`}
            >
              Closest Distance
            </button>
            <button
              onClick={() => setSortBy('rating')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                sortBy === 'rating' ? 'bg-[#dae2fd] text-[#006194]' : 'text-[#3f4850] hover:bg-[#eff4ff]'
              }`}
            >
              Highest Rated
            </button>
            <button
              onClick={() => setSortBy('price')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                sortBy === 'price' ? 'bg-[#dae2fd] text-[#006194]' : 'text-[#3f4850] hover:bg-[#eff4ff]'
              }`}
            >
              Lowest Starting Rate
            </button>
          </div>

          <label className="flex items-center gap-1.5 cursor-pointer text-[#0b1c30] font-semibold">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              className="rounded text-[#006194] focus:ring-[#006194]"
            />
            <span>Available Today Only</span>
          </label>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-[#3f4850]">
        <span>Found <strong>{filtered.length}</strong> matching verified technicians</span>
        <span>Average dispatch radius: <strong>2.8 km in Bhopal</strong></span>
      </div>

      {/* Specialists List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((specialist) => (
          <article
            key={specialist.id}
            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-4 border border-[#d3e4fe]"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <img
                    className="w-16 h-16 rounded-xl object-cover bg-[#eff4ff] border border-[#d3e4fe]"
                    src={specialist.avatar}
                    alt={specialist.name}
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-display font-bold text-base text-[#0b1c30]">
                        {specialist.name}
                      </h3>
                      <span className="material-symbols-outlined text-[#006b2c] text-[18px]">verified</span>
                    </div>
                    <span className="text-xs text-[#3f4850] font-medium">
                      {specialist.role} • {specialist.certification}
                    </span>
                    <div className="flex items-center gap-2 mt-1 text-xs">
                      <span className="flex items-center font-bold text-[#0b1c30]">
                        <span className="material-symbols-outlined text-[15px] text-amber-500">star</span>
                        {specialist.rating}
                      </span>
                      <span className="text-[#3f4850]">({specialist.reviewsCount})</span>
                      <span className="text-[#3f4850]">•</span>
                      <span className="text-[#3f4850]">{specialist.location} ({specialist.distanceKm} km)</span>
                    </div>
                  </div>
                </div>

                {specialist.isAvailableToday && (
                  <span className="px-2 py-0.5 rounded-full bg-[#7ffc97] text-[#002109] text-[10px] font-bold">
                    Available Today
                  </span>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {specialist.tags.map((t) => (
                  <span
                    key={t}
                    className="bg-[#eff4ff] text-[#0b1c30] text-[11px] px-2 py-0.5 rounded border border-[#d3e4fe]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-1 bg-[#eff4ff] rounded-xl p-2.5 text-center text-xs">
                <div>
                  <span className="text-[10px] text-[#3f4850] block">Jobs</span>
                  <span className="font-bold text-[#0b1c30]">{specialist.completedJobs}+</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#3f4850] block">Experience</span>
                  <span className="font-bold text-[#0b1c30]">{specialist.experienceYears} yrs</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#3f4850] block">Starting Rate</span>
                  <span className="font-bold text-[#006194]">₹{specialist.startingPrice}</span>
                </div>
              </div>
            </div>

            {/* Actions: 1) Previous Work, 2) Call, 3) Book Now */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <button
                onClick={() => onOpenPortfolio(specialist)}
                className="w-full bg-[#eff4ff] hover:bg-[#dce9ff] text-[#006194] text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1 border border-[#d3e4fe] transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">photo_library</span>
                <span>Work</span>
              </button>
              <button
                onClick={() => onOpenCall(specialist)}
                className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1 shadow-sm transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">call</span>
                <span>Call</span>
              </button>
              <button
                onClick={() => onOpenBooking(specialist)}
                className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1 shadow-sm transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                <span>Book</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
