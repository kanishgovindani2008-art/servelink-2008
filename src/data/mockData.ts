export interface Specialist {
  id: string;
  name: string;
  avatar: string;
  role: string;
  certification: string;
  rating: number;
  reviewsCount: number;
  location: string;
  vicinityKey: string;
  distanceKm: number;
  isAvailableToday: boolean;
  tags: string[];
  completedJobs: number;
  experienceYears: number;
  startingPrice: number;
  phone: string;
  category: string;
  portfolio: {
    title: string;
    description: string;
    photoUrl: string;
    feedback: string;
    customerName: string;
    date: string;
  };
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  prosCount: number;
  shortDesc: string;
  tags?: string[];
  popularServices: { title: string; price: number }[];
}

export interface Booking {
  id: string;
  proId: string;
  proName: string;
  proRole: string;
  proAvatar: string;
  proPhone: string;
  serviceTitle: string;
  date: string;
  timeSlot: string;
  address: string;
  vicinity: string;
  price: number;
  status: 'dispatched' | 'en_route' | 'in_progress' | 'completed' | 'cancelled';
  otp: string;
  createdAt: string;
  etaMinutes: number;
}

export const BHOPAL_AREAS = [
  { key: 'mp-nagar', label: 'Near Bhopal (MP Nagar Zone II)', short: 'MP Nagar' },
  { key: 'arera-colony', label: 'Arera Colony (E-Sector)', short: 'Arera Colony' },
  { key: 'kolar-road', label: 'Kolar Road (Chuna Bhatti)', short: 'Kolar Road' },
  { key: 'indrapuri', label: 'Indrapuri (Sector C, BHEL)', short: 'Indrapuri' },
  { key: 'hoshangabad', label: 'Hoshangabad Rd (Aashima Mall)', short: 'Hoshangabad Rd' }
];

export const CATEGORIES: ServiceCategory[] = [
  {
    id: 'electricians',
    name: 'Electricians',
    icon: 'bolt',
    prosCount: 14,
    shortDesc: 'Rewiring, MCB & Inverters',
    popularServices: [
      { title: 'MCB & Fuse Box Tripping Diagnostic', price: 299 },
      { title: 'Inverter & Battery Wiring Setup', price: 449 },
      { title: 'Concealed Short Circuit Repair', price: 399 },
      { title: 'Ceiling Fan & Heavy Appliance Fitment', price: 199 }
    ]
  },
  {
    id: 'plumbers',
    name: 'Plumbers',
    icon: 'plumbing',
    prosCount: 19,
    shortDesc: 'Pipelines, Taps & Motors',
    popularServices: [
      { title: 'Submersible & Jet Pump Overhaul', price: 349 },
      { title: 'Concealed Wall Leakage Acoustic Scan', price: 299 },
      { title: 'Jaquar/Grohe Sanitary Fittings Fix', price: 249 },
      { title: 'High-Pressure Drain Jetting Unblock', price: 399 }
    ]
  },
  {
    id: 'painters',
    name: 'Painters',
    icon: 'format_paint',
    prosCount: 8,
    shortDesc: 'Emulsion, Damp & Polish',
    popularServices: [
      { title: 'Waterproof Damp Seal Inspection', price: 299 },
      { title: 'Single Room Asian Paints Emulsion Roll', price: 1499 },
      { title: 'Wood Texture PU Polish Touch-up', price: 599 }
    ]
  },
  {
    id: 'carpenters',
    name: 'Carpenters',
    icon: 'carpenter',
    prosCount: 11,
    shortDesc: 'Furniture, Locks & Fitments',
    popularServices: [
      { title: 'Godrej / Yale Smart Lock Installation', price: 399 },
      { title: 'Modular Kitchen Hydraulic Hinge Fix', price: 249 },
      { title: 'Bed Frame & Wardrobe Assembly', price: 499 }
    ]
  },
  {
    id: 'mechanics',
    name: 'Mechanics',
    icon: 'car_repair',
    prosCount: 18,
    shortDesc: 'Bikes, Cars & Scooters',
    tags: ['EV', 'Fuel'],
    popularServices: [
      { title: 'Ather / Ola EV Battery & BMS Diagnostics', price: 299 },
      { title: 'Scooter Brake Pad Replacement & Bleed', price: 199 },
      { title: 'Carburetor Clean & Engine Tuning', price: 349 },
      { title: 'On-Site Puncture & Roadside Rescue', price: 249 }
    ]
  },
  {
    id: 'ac-repair',
    name: 'AC Repair',
    icon: 'mode_fan',
    prosCount: 22,
    shortDesc: 'Gas Refill, Coil & Service',
    popularServices: [
      { title: 'Split AC Power Jet Foam Cleaning', price: 449 },
      { title: 'R32 / R410A Eco Gas Top-Up', price: 1499 },
      { title: 'Inverter PCB Board Diagnostic & Solder', price: 499 },
      { title: 'Outdoor Compressor Capacitor Replacement', price: 349 }
    ]
  },
  {
    id: 'tv-repair',
    name: 'TV Repair',
    icon: 'tv',
    prosCount: 7,
    shortDesc: 'OLED, LED & Motherboard',
    popularServices: [
      { title: 'Backlight Strip LED Replacement', price: 699 },
      { title: 'Sound IC & Motherboard Diagnostics', price: 399 },
      { title: 'HDMI / Port Solder & Wall Mount Fitment', price: 299 }
    ]
  },
  {
    id: 'refrigerator',
    name: 'Refrigerator',
    icon: 'kitchen',
    prosCount: 16,
    shortDesc: 'Compressor, Gas & Defrost',
    popularServices: [
      { title: 'Defrost Timer & Thermostat Overhaul', price: 399 },
      { title: 'Inverter Compressor Gas Charging', price: 1299 },
      { title: 'Door Gasket Magnetic Seal Replacement', price: 249 }
    ]
  },
  {
    id: 'washing-machine',
    name: 'Washing Machine',
    icon: 'local_laundry_service',
    prosCount: 12,
    shortDesc: 'Top/Front Load & Drum Motor',
    popularServices: [
      { title: 'Front Load Drum Bearing & Belt Fix', price: 499 },
      { title: 'Drain Motor & Inlet Valve Replacement', price: 349 },
      { title: 'PCB Control Panel Diagnostics', price: 399 }
    ]
  }
];

export const INITIAL_SPECIALISTS: Specialist[] = [
  {
    id: 'pro-1',
    name: 'Rajesh Kumar Sharma',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsZn0MRlrnqp4RGLFTMJytV8iGjfkdolHIh9i0Fh7Q5Nzias06CP4p37kl3NYJefebRCy7dJTlsyLzHhUGfNWXvbiMU26CI9BHWajc79DuB5w8wVO7DKB5H-jWasxdPsAjBKyQo-oeYlBVWwkJf3Mw3R4-URvePAb7uXLoDGGZBFF1aYGBoT9dq5YWHBuAWrZom6I9BfaUd0oCviBAMLpVMpcpWeMH0h_Kh8BEEFmNChlCSq-_3ZSw',
    role: 'Master Electrician',
    certification: 'Bhopal Gov Tech Certified',
    rating: 4.9,
    reviewsCount: 184,
    location: 'MP Nagar, Bhopal',
    vicinityKey: 'mp-nagar',
    distanceKm: 2.4,
    isAvailableToday: true,
    tags: ['High-Voltage MCB', 'Inverter Wiring', 'Short Circuit Audit', 'Havells / L&T Authorized'],
    completedJobs: 420,
    experienceYears: 11,
    startingPrice: 299,
    phone: '+91 755 255 0192',
    category: 'electricians',
    portfolio: {
      title: 'Distribution Board Upgrade & MCB Balancing',
      description: 'Upgraded residential main switchgear from ceramic fuses to RCBO protection with Havells surge arrestors in MP Nagar Zone II.',
      photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLIxfSS1ob2RQ_kWHEHhWdSDTET2fKbmMmx4qQc7XktrLQpm3zBtWOFPpVFyFtqiU-B0R3ONojMuLeEa5l54H0xXZUD2jacW6r5nXMq8kTHojjihs8uTg2C2cK97mJB2fv8fmHWsbP3DPJzU17TKi2YLRHtaSdElPNSAGtGnzdQIvDNR9hj4RUcwcf80wEAyVFx64ODYRD6JCOew6h2z3HdggGqCkWXtUNsiaqqElyshFth41FANDF',
      feedback: '“Neat conduit layout, problem resolved in 40 mins. Very polite and brought laser tester.”',
      customerName: 'Anil Saxena (MP Nagar)',
      date: 'Completed 2 days ago'
    }
  },
  {
    id: 'pro-2',
    name: 'Vikram Rathore',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIDLr8_oYLvAH1AMquaYDjkCOzCpZAskpWXhsuu_emEavlmBBoh6cua-gwQPtMok-wXjSMgNmIlBk3-Xm1seoJa5pVY8Xa5cd6jkO-S--v86td-1uv48AQsNTHHFAYk9QRF59Mn5MbNaiHBiCwc1rgA3gFLzUd02kW9X_W22AIMfHjybXRz1i4ErCqw6C87HFXWX4JvHw7gApsFHlAJtYMHwD04rv2gDCmVxdDLyXnwgp3COCYSO3A',
    role: 'HVAC & Inverter AC Diagnostic Specialist',
    certification: 'Blue Star / Daikin Master HVAC',
    rating: 4.95,
    reviewsCount: 231,
    location: 'Arera Colony, Bhopal',
    vicinityKey: 'arera-colony',
    distanceKm: 1.8,
    isAvailableToday: true,
    tags: ['Daikin / Voltas Pro', 'R32 / R410A Gas Refill', 'Jet Pump Cleaning', 'Compressor Repair'],
    completedJobs: 510,
    experienceYears: 9,
    startingPrice: 349,
    phone: '+91 755 255 0193',
    category: 'ac-repair',
    portfolio: {
      title: 'Inverter Split AC Evaporator Coil Replacement & Vacuum Test',
      description: 'Resolved persistent gas leakage by replacing pinholed copper U-bends and vacuumized unit to 500 microns before precision R32 weighing.',
      photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      feedback: '“Came within 20 mins with vacuum pump and digital manifold gauge. Cooling is ice cold now.”',
      customerName: 'Dr. Meenakshi S. (E-6 Arera)',
      date: 'Completed yesterday'
    }
  },
  {
    id: 'pro-3',
    name: 'Amit Patel',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5fMDwoWXdYcDrol3ECub0yfk5dLZqud-f9zUWIQosp5NE8DUIFVzYMBeeTFpHIfcuthF2wEr4aQuWNnFP-9qHyOArKYeh1Ynudis6lWLR5DPVW9joO1ul-xmxOIQHyOa_pwhaHacgTJ9lh096RbMszbkGRCDhEQboXgky8C52r4jnNGKJAoO_F5EXE74Z5-HXHhs1gGHxVfDDxEozxA1GsqOzsByn2wYrKxW9FHiwoIlEevSUPY6r',
    role: 'EV & Multi-Brand Scooter Mechanic',
    certification: 'Ather & Ola Certified Level 3',
    rating: 4.88,
    reviewsCount: 124,
    location: 'Indrapuri, Bhopal',
    vicinityKey: 'indrapuri',
    distanceKm: 3.1,
    isAvailableToday: true,
    tags: ['Ola & Ather Certified', 'BMS Troubleshooting', 'Fuel Scooter Carburetor', 'On-Site Road Rescue'],
    completedJobs: 290,
    experienceYears: 7,
    startingPrice: 199,
    phone: '+91 755 255 0194',
    category: 'mechanics',
    portfolio: {
      title: 'Ather 450X Belt Tensioning & Disc Pad Replacement',
      description: 'On-site breakdown rescue near BHEL Gate 5. Installed sintered brake pads and re-calibrated hall sensor error code.',
      photoUrl: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
      feedback: '“Rescued me when my scooter stalled in heavy rain. Quick repair and fair pricing.”',
      customerName: 'Kunal Verma (Indrapuri C)',
      date: 'Completed 3 days ago'
    }
  },
  {
    id: 'pro-4',
    name: 'Manoj Vishwakarma',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUl6xVkLZAonYwDpJS104ZZQmpKrltCcd9HNXt-EqBMRTFdDbuobn8qHLlUg_ntJRq8oThXM4USCIhxNXJS4BMYUJ0e-8tr-RAJvcSgUMztiRWsRs7xyeJD4tskpguKxYgCHRPCXnnJ27PmAqGup-UNa8_1QMUruSVAef9h13JUZTHYPpPIbzleVLyTuPWbqmwalIv14KFEaPOVpcFadZCk488r6JNtaeaiU0qWsqDYt_rH6vS1N0E',
    role: 'Sanitary & Submersible Pump Specialist',
    certification: 'Crompton Certified Hydraulic Tech',
    rating: 4.92,
    reviewsCount: 196,
    location: 'Kolar Road, Bhopal',
    vicinityKey: 'kolar-road',
    distanceKm: 2.1,
    isAvailableToday: true,
    tags: ['Crompton Pump Repair', 'Concealed Leak Detection', 'Jaquar Fitting Expert', 'Drain Jetting'],
    completedJobs: 480,
    experienceYears: 12,
    startingPrice: 249,
    phone: '+91 755 255 0195',
    category: 'plumbers',
    portfolio: {
      title: 'Borewell Submersible Starter Panel Overhaul & Capacitor Splicing',
      description: 'Diagnosed single-phasing burn out in underground 1.5 HP motor starter box. Replaced thermal overload relay.',
      photoUrl: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
      feedback: '“Water supply was restored before morning. Manoj ji knows motor hydraulics inside out.”',
      customerName: 'Shalini Agrawal (Chuna Bhatti)',
      date: 'Completed 1 day ago'
    }
  },
  {
    id: 'pro-5',
    name: 'Sunita Verma',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    role: 'Smart Home Automation & CCTV Specialist',
    certification: 'Hikvision & CP Plus Master Installer',
    rating: 4.91,
    reviewsCount: 142,
    location: 'Hoshangabad Rd, Bhopal',
    vicinityKey: 'hoshangabad',
    distanceKm: 3.8,
    isAvailableToday: true,
    tags: ['Hikvision IP Cameras', 'Smart Wi-Fi Relays', 'NVR Remote Access', 'Motion Sensors'],
    completedJobs: 310,
    experienceYears: 8,
    startingPrice: 349,
    phone: '+91 755 255 0196',
    category: 'electricians',
    portfolio: {
      title: '8-Channel IP Dome Camera Grid with Mobile App Sync',
      description: 'Concealed CAT6 cabling and setup of remote live viewing via encrypted local mesh server.',
      photoUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
      feedback: '“Clean cabling without damaging interior plaster. Mobile alerts work instantly.”',
      customerName: 'Ravi Prakash (Aashima Mall Enclave)',
      date: 'Completed 4 days ago'
    }
  },
  {
    id: 'pro-6',
    name: 'Imran Khan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    role: 'Smart Refrigerator & Inverter PCB Technician',
    certification: 'Samsung & LG Certified Engineer',
    rating: 4.87,
    reviewsCount: 165,
    location: 'MP Nagar, Bhopal',
    vicinityKey: 'mp-nagar',
    distanceKm: 1.5,
    isAvailableToday: true,
    tags: ['Inverter Compressor', 'Defrost Sensor Fix', 'Dual Cool LG Tech', 'Door Seal Leveling'],
    completedJobs: 380,
    experienceYears: 10,
    startingPrice: 299,
    phone: '+91 755 255 0197',
    category: 'refrigerator',
    portfolio: {
      title: 'Side-by-Side LG Inverter Compressor Replacement & R600a Re-gas',
      description: 'Detected burnt inverter driver circuit and welded new compressor with nitrogen purge.',
      photoUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      feedback: '“Saved me from buying a new fridge. Very transparent with original LG spare prices.”',
      customerName: 'Sunil Dubey (Zone I, MP Nagar)',
      date: 'Completed 5 days ago'
    }
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'SL-8842',
    proId: 'pro-2',
    proName: 'Vikram Rathore',
    proRole: 'HVAC & Inverter AC Specialist',
    proAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIDLr8_oYLvAH1AMquaYDjkCOzCpZAskpWXhsuu_emEavlmBBoh6cua-gwQPtMok-wXjSMgNmIlBk3-Xm1seoJa5pVY8Xa5cd6jkO-S--v86td-1uv48AQsNTHHFAYk9QRF59Mn5MbNaiHBiCwc1rgA3gFLzUd02kW9X_W22AIMfHjybXRz1i4ErCqw6C87HFXWX4JvHw7gApsFHlAJtYMHwD04rv2gDCmVxdDLyXnwgp3COCYSO3A',
    proPhone: '+91 755 255 0193',
    serviceTitle: 'Split AC Power Jet Foam Cleaning & Gas Check',
    date: 'Today, Oct 17',
    timeSlot: '11:30 AM - 12:30 PM',
    address: 'Flat 204, Silver Oak Heights, MP Nagar Zone II',
    vicinity: 'MP Nagar',
    price: 449,
    status: 'en_route',
    otp: '4921',
    createdAt: '10:45 AM',
    etaMinutes: 12
  },
  {
    id: 'SL-8839',
    proId: 'pro-1',
    proName: 'Rajesh Kumar Sharma',
    proRole: 'Master Electrician',
    proAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsZn0MRlrnqp4RGLFTMJytV8iGjfkdolHIh9i0Fh7Q5Nzias06CP4p37kl3NYJefebRCy7dJTlsyLzHhUGfNWXvbiMU26CI9BHWajc79DuB5w8wVO7DKB5H-jWasxdPsAjBKyQo-oeYlBVWwkJf3Mw3R4-URvePAb7uXLoDGGZBFF1aYGBoT9dq5YWHBuAWrZom6I9BfaUd0oCviBAMLpVMpcpWeMH0h_Kh8BEEFmNChlCSq-_3ZSw',
    proPhone: '+91 755 255 0192',
    serviceTitle: 'MCB Trip Inspection & Geyser Power Line Fix',
    date: 'Oct 14, 2026',
    timeSlot: '3:00 PM',
    address: 'House 14, Sector C, Indrapuri',
    vicinity: 'Indrapuri',
    price: 349,
    status: 'completed',
    otp: '8114',
    createdAt: 'Oct 14, 2:10 PM',
    etaMinutes: 0
  }
];

export const DIAGNOSTIC_PRESETS = [
  {
    label: 'Voltas Split AC Gas Leak',
    query: 'My Voltas split AC outdoor unit is running but blowing normal room temperature air and there is light hissing near the copper valves.',
    diagnosis: 'Likely refrigerant underpressure (R32 / R410A) or copper flare nut micro-leak.',
    category: 'ac-repair',
    confidence: '96%',
    estimatedCost: '₹349 - ₹1,499',
    recommendedProId: 'pro-2'
  },
  {
    label: 'Ather 450X Brake Pad',
    query: 'Ather 450X rear wheel making squealing scraping noise when applying brake and regen feels jerky.',
    diagnosis: 'Worn rear brake pad lining rubbing metal-to-metal on disc rotor.',
    category: 'mechanics',
    confidence: '98%',
    estimatedCost: '₹199 - ₹450',
    recommendedProId: 'pro-3'
  },
  {
    label: 'Main MCB Tripping',
    query: 'Every time we turn on the immersion heater or microwave, the 32A C-curve main breaker trips immediately with a loud click.',
    diagnosis: 'Neutral-earth leakage fault or overloaded sub-circuit phase balance.',
    category: 'electricians',
    confidence: '95%',
    estimatedCost: '₹299 - ₹450',
    recommendedProId: 'pro-1'
  },
  {
    label: 'Submersible Pump No Water',
    query: 'Motor starter hums and ammeter shoots up to 18A but water is not lifting to the overhead tank.',
    diagnosis: 'Capacitor bank discharge or pump impeller sand blockage in borehole.',
    category: 'plumbers',
    confidence: '93%',
    estimatedCost: '₹249 - ₹650',
    recommendedProId: 'pro-4'
  }
];
