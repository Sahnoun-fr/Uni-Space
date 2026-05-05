import React, { useState, useEffect } from 'react';
import { 
  School, UserCircle, Search, ChevronLeft, ChevronRight, CheckCircle2, 
  AlertTriangle, User, History as HistoryIcon, Settings, Building2, LogOut, Bell, ArrowLeft 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function History() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifsOn, setNotifsOn] = useState(true);
  const [userName, setUserName] = useState('User Name');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('notifsOn');
      if (stored !== null) setNotifsOn(JSON.parse(stored));
    } catch (e) {}
    try {
      const savedUser = JSON.parse(localStorage.getItem('user'));
      if (savedUser?.name) setUserName(savedUser.name);
    } catch (e) {}
  }, []);

  const toggleNotifs = () => {
    const next = !notifsOn;
    setNotifsOn(next);
    try { localStorage.setItem('notifsOn', JSON.stringify(next)); } catch (e) {}
  };

  const reservations = [
    { id: 'A-204', floor: 'Level 2,\nNorth Wing', date: 'Oct 22, 2023\n02:00 PM - 05:00 PM', status: 'Confirmed' },
    { id: 'A-204', floor: 'Level 2,\nNorth Wing', date: 'Oct 22, 2023\n02:00 PM - 05:00 PM', status: 'Cancelled' },
    { id: 'A-204', floor: 'Level 2,\nNorth Wing', date: 'Oct 22, 2023\n02:00 PM - 05:00 PM', status: 'Expired' },
    { id: 'A-204', floor: 'Level 2,\nNorth Wing', date: 'Oct 22, 2023\n02:00 PM - 05:00 PM', status: 'Confirmed' },
    { id: 'A-204', floor: 'Level 2,\nNorth Wing', date: 'Oct 22, 2023\n02:00 PM - 05:00 PM', status: 'Confirmed' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-[#dcfce7] text-[#166534]'; // Emerald 100/800
      case 'Cancelled': return 'bg-[#fca5a5] text-[#991b1b]'; // Red 300/800
      case 'Expired': return 'bg-[#e5e7eb] text-[#374151]'; // Gray 200/700
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-[url('/background%202.png')] bg-cover bg-center bg-no-repeat relative font-sans flex flex-col">
      <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-[2px] z-0" />

      {/* Top Navbar */}
      <header className="relative z-20 flex items-center justify-between px-8 py-6 w-full max-w-[1400px] mx-auto">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/') }>
            <School className="w-10 h-10 text-white drop-shadow-md" />
            <span className="text-3xl font-bold tracking-wide text-white drop-shadow-md">UniSpace</span>
          </div>
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors bg-white/10 px-4 py-2 rounded-full border border-white/20"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
        </div>

        <div className="flex items-center gap-6 relative">
          <button
            onClick={toggleNotifs}
            className={`p-2 rounded-full transition-colors ${notifsOn ? 'bg-white/10 text-white' : 'bg-white/5 text-slate-300'}`}
            title={notifsOn ? 'Notifications on' : 'Notifications off'}
          >
            <Bell className="w-6 h-6 drop-shadow-md" />
          </button>
          
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
            <span className="text-white font-medium text-lg drop-shadow-md">{userName}</span>
            <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center text-white bg-white/10 backdrop-blur-sm">
              <User className="w-6 h-6" />
            </div>
          </div>

          {showDropdown && (
            <div className="absolute top-[3.5rem] right-0 w-[240px] bg-[#F8FAFC] rounded-2xl shadow-2xl py-4 z-50 overflow-hidden transform origin-top-right transition-all">
              <button onClick={() => { setShowDropdown(false); navigate('/profile'); }} className="w-full text-left px-6 py-3 flex items-center gap-4 text-[#4B6185] hover:bg-slate-100 transition-colors font-semibold">
                <User className="w-5 h-5 opacity-70" /> Profile
              </button>
              <button onClick={() => { setShowDropdown(false); navigate('/history'); }} className="w-full text-left px-6 py-3 flex items-center gap-4 text-[#4B6185] hover:bg-slate-100 transition-colors font-semibold">
                <HistoryIcon className="w-5 h-5 opacity-70" /> My History
              </button>
              <button onClick={() => { setShowDropdown(false); navigate('/settings'); }} className="w-full text-left px-6 py-3 flex items-center gap-4 text-[#4B6185] hover:bg-slate-100 transition-colors font-semibold">
                <Settings className="w-5 h-5 opacity-70" /> Settings
              </button>
              <button onClick={() => { setShowDropdown(false); navigate('/interactive-maps'); }} className="w-full text-left px-6 py-3 flex items-center gap-4 text-[#4B6185] hover:bg-slate-100 transition-colors font-semibold">
                <Building2 className="w-5 h-5 opacity-70" /> Interactive Maps
              </button>
              <div className="h-px bg-slate-200 my-2 mx-4"></div>
              <button onClick={() => { try { localStorage.removeItem('user'); } catch(e){} setShowDropdown(false); navigate('/'); }} className="w-full text-left px-6 py-3 flex items-center gap-4 text-red-500 hover:bg-red-50 transition-colors font-bold tracking-wider text-sm">
                <LogOut className="w-5 h-5" /> LOGOUT
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Container - ensuring it sits above the background overlay */}
      <div className="relative z-10 flex flex-col h-full flex-1 px-6 md:px-8 pb-6 md:pb-8">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">My History</h1>
          <p className="text-white/90 text-lg">Review and manage your past<br/>workspace reservations.</p>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8 w-full max-w-[1200px] mx-auto">
          {/* Filters */}
          <div className="flex items-center bg-white/40 backdrop-blur-md rounded-full p-1 border border-white/20">
            <button className="px-6 py-2 bg-white rounded-full text-sm font-bold text-slate-800 shadow-sm transition-all">
              All
            </button>
            <button className="px-6 py-2 rounded-full text-sm font-bold text-slate-800 hover:bg-white/20 transition-all">
              Today
            </button>
            <button className="px-6 py-2 rounded-full text-sm font-bold text-slate-800 hover:bg-white/20 transition-all">
              This Week
            </button>
          </div>

          {/* Search */}
          <div className="relative w-full max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none hidden">
              <Search className="h-4 w-4 text-slate-500" />
            </div>
            <input 
              type="text" 
              placeholder="Search by Seat-ID, Floor ...."
              className="w-full bg-white/40 backdrop-blur-md border border-white/20 rounded-full py-2.5 px-6 text-sm font-bold text-slate-800 placeholder:text-slate-800/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
            />
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-6 w-full max-w-[1200px] mx-auto flex-1">
          
          {/* Left Column - Table */}
          <div className="flex-1 bg-white/50 backdrop-blur-md rounded-2xl border border-white/30 overflow-hidden flex flex-col shadow-lg">
            
            {/* Table Header */}
            <div className="grid grid-cols-4 bg-white/40 px-6 py-4 border-b border-white/30">
              <div className="text-sm font-bold text-slate-800">Seat-ID</div>
              <div className="text-sm font-bold text-slate-800">Floor</div>
              <div className="text-sm font-bold text-slate-800">Date & Time</div>
              <div className="text-sm font-bold text-slate-800">Status</div>
            </div>

            {/* Table Body */}
            <div className="flex-1 overflow-y-auto">
              {reservations.map((res, index) => (
                <div 
                  key={index} 
                  className={`grid grid-cols-4 px-6 py-4 items-center ${index !== reservations.length - 1 ? 'border-b border-white/20' : ''} hover:bg-white/10 transition-colors`}
                >
                  <div className="text-base font-bold text-slate-800">{res.id}</div>
                  <div className="text-sm font-medium text-slate-800 whitespace-pre-line leading-tight">{res.floor}</div>
                  <div className="text-sm font-medium text-slate-800 whitespace-pre-line leading-tight">{res.date}</div>
                  <div>
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${getStatusColor(res.status)}`}>
                      {res.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Table Footer / Pagination */}
            <div className="px-6 py-4 border-t border-white/30 flex items-center justify-between bg-black/5 mt-auto">
              <span className="text-xs font-semibold text-slate-100">Showing 1 to 4 from 24 Reservations</span>
              
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded bg-white/30 hover:bg-white/50 text-white flex items-center justify-center transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded bg-white/30 hover:bg-white/50 text-white flex items-center justify-center font-bold text-sm transition-colors">1</button>
                <button className="w-8 h-8 rounded bg-white/30 hover:bg-white/50 text-white flex items-center justify-center font-bold text-sm transition-colors">2</button>
                <button className="w-8 h-8 rounded bg-white/30 hover:bg-white/50 text-white flex items-center justify-center font-bold text-sm transition-colors">3</button>
                <button className="w-8 h-8 rounded bg-white/30 hover:bg-white/50 text-white flex items-center justify-center transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Cards */}
          <div className="w-full lg:w-[320px] flex flex-col gap-6">
            
            {/* Total Hours Card */}
            <div className="bg-[#eaf4ed] rounded-[1.5rem] p-8 shadow-lg">
              <h3 className="text-lg font-medium text-slate-800 mb-2">Total Hours</h3>
              <div className="text-[3.5rem] font-medium text-black leading-none mb-4 tracking-tight">128.5</div>
              <p className="text-sm font-medium text-slate-700 leading-snug">
                You've spent more time in the North Wing this month than anywhere else. Good focus session!
              </p>
            </div>

            {/* Quick Insight Card */}
            <div className="bg-[#cfd4dc] rounded-[1.5rem] p-8 shadow-lg">
              <h3 className="text-lg font-medium text-slate-800 mb-6">Quick Insight</h3>
              
              <div className="flex flex-col gap-4">
                {/* Attendance Rate */}
                <div className="bg-white rounded-full py-3 px-4 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm font-medium text-slate-700">Attendance rate</span>
                  </div>
                  <span className="text-base font-bold text-slate-800">92%</span>
                </div>

                {/* Cancellations */}
                <div className="bg-white rounded-full py-3 px-4 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <span className="text-sm font-medium text-slate-700">Cancellations</span>
                  </div>
                  <span className="text-base font-bold text-slate-800">3</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-xs font-medium text-white/50">
          @2026 UniSpace. All rights reserved
        </footer>

      </div>
    </div>
  );
}
