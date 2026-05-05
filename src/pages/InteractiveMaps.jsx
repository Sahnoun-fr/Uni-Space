import React, { useState, useEffect } from 'react';
import { 
  School, Search, Heart, Wifi, Plug, Thermometer, Volume2, 
  CheckSquare, Square, User, History, Settings, Building2, LogOut, Bell, ArrowLeft
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { useNavigate } from 'react-router-dom';

const barData = [
  { name: 'Silent Zone', Free: 4, Soon: 7, Occupied: 0 },
  { name: 'Focus Zone', Free: 0, Soon: 5, Occupied: 1 },
  { name: 'Open Zone', Free: 3, Soon: 0, Occupied: 3 },
];

const lineData = [
  { name: '08:00', value: 20 },
  { name: '10:00', value: 45 },
  { name: '12:00', value: 85 },
  { name: '14:00', value: 90 },
  { name: '16:00', value: 70 },
  { name: '18:00', value: 30 },
];

export default function Maps() {
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

  const [filters, setFilters] = useState({
    power: false,
    window: false,
    quiet: false,
    group: false,
    wifi: true,
    available: true
  });

  const toggleFilter = (key) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
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
                <History className="w-5 h-5 opacity-70" /> My History
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

      <div className="relative z-10 flex flex-1 w-full max-w-[1400px] mx-auto gap-8 lg:px-8 px-4 pb-8 overflow-hidden h-0">
        
        {/* Left Sidebar */}
        <aside className="w-[180px] flex flex-col text-white shrink-0 hidden lg:flex mt-4">
          <div className="mb-12">
            <h3 className="text-[13px] tracking-widest uppercase font-bold text-white/90 mb-6 drop-shadow-sm leading-relaxed">
              Find Your<br />Seat
            </h3>
          </div>

          <div>
            <h3 className="text-[13px] tracking-widest uppercase font-bold text-white/90 mb-6 drop-shadow-sm">Filter</h3>
            <ul className="space-y-4">
              <FilterItem label="With Power Outlet" checked={filters.power} onClick={() => toggleFilter('power')} />
              <FilterItem label="Window View" checked={filters.window} onClick={() => toggleFilter('window')} />
              <FilterItem label="Quiet Zone" checked={filters.quiet} onClick={() => toggleFilter('quiet')} />
              <FilterItem label="Group Friendly" checked={filters.group} onClick={() => toggleFilter('group')} />
              <FilterItem label="Strong Wifi" checked={filters.wifi} onClick={() => toggleFilter('wifi')} />
              <FilterItem label="Available Only" checked={filters.available} onClick={() => toggleFilter('available')} />
            </ul>
          </div>
        </aside>

        {/* Main Glass Panel */}
        <div className="flex-1 bg-white/20 backdrop-blur-xl rounded-[2rem] border border-white/30 flex overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
          
          {/* Center Content (Map + Charts) */}
          <main className="flex-1 p-6 lg:p-8 flex flex-col gap-6 overflow-y-auto w-full">
            
            {/* Map Card */}
            <div className="bg-white rounded-[1.5rem] p-4 lg:p-6 shadow-md flex flex-col min-h-[400px]">
              
              {/* Search Toolbar */}
              <div className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-4">
                <div className="relative w-full lg:w-80">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input 
                    placeholder="search for locals or spaces ..." 
                    className="w-full border border-slate-200 rounded-full py-2.5 pl-11 pr-4 text-xs lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium text-slate-600 placeholder:text-slate-400"
                  />
                </div>
                
                <div className="flex gap-2 shrink-0">
                  <button className="px-3 lg:px-4 py-1.5 bg-blue-50 rounded-full text-xs font-semibold text-blue-600 border border-blue-100">Silent Study</button>
                  <button className="px-3 lg:px-4 py-1.5 bg-slate-100 hover:bg-slate-200 transition-colors rounded-full text-xs font-semibold text-slate-600">Group Work</button>
                  <button className="px-3 lg:px-4 py-1.5 bg-slate-100 hover:bg-slate-200 transition-colors rounded-full text-xs font-semibold text-slate-600">Outlets</button>
                </div>
              </div>

              {/* Map Canvas Placeholder */}
              <div className="flex-1 bg-[#F1F5F9] rounded-2xl relative overflow-hidden p-6 min-h-[280px]">
                 
                 {/* Decorative layout simulating building walls */}
                 <div className="absolute inset-8 border-[16px] border-white rounded-xl flex gap-4 p-4 opacity-100 backdrop-blur-sm">
                    <div className="w-[35%] flex flex-col gap-4">
                       <div className="h-1/5 border-[16px] border-white rounded-xl bg-[#E6EBEF] relative">
                          <span className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                       </div>
                       <div className="h-1/5 border-[16px] border-white rounded-xl bg-[#E6EBEF] relative">
                          <span className="absolute top-1/2 left-[20%] -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-orange-400 rounded-full"></span>
                       </div>
                       <div className="flex-1 border-[16px] border-white rounded-xl bg-[#E6EBEF] relative">
                          <span className="absolute top-1/2 left-[40%] -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                       </div>
                    </div>
                    <div className="w-[35%] border-[16px] border-white rounded-xl bg-[#E6EBEF] relative flex flex-col">
                       <span className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                    </div>
                    <div className="w-[30%] flex flex-col gap-4">
                       <div className="h-[40%] border-[16px] border-white rounded-xl bg-[#E6EBEF] relative">
                          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                       </div>
                       <div className="h-[15%] border-[16px] border-white rounded-xl bg-[#E6EBEF]"></div>
                       <div className="h-[15%] border-[16px] border-white rounded-xl bg-[#E6EBEF]"></div>
                       <div className="flex-1 border-[16px] border-b-0 border-white rounded-t-xl bg-[#E6EBEF]"></div>
                    </div>
                 </div>

                 {/* Corridors overlays to simulate hallways */}
                 <div className="absolute top-[40%] left-[30%] right-[20%] h-12 bg-[#F1F5F9] z-10"></div>
                 <div className="absolute top-0 bottom-0 left-[35%] w-12 bg-[#F1F5F9] z-10"></div>
                 <div className="absolute top-[60%] left-0 right-[40%] h-12 bg-[#F1F5F9] z-10"></div>
                 <div className="absolute top-[30%] right-0 left-[60%] h-12 bg-[#F1F5F9] z-10"></div>

                 <div className="absolute bottom-4 left-4 bg-white shadow-sm rounded-full px-4 py-2 text-[11px] font-bold text-slate-700 flex items-center gap-3 z-20">
                    <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-green-500"></div> Calm</span>
                    <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-orange-400"></div> Medium</span>
                    <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500"></div> Crowded</span>
                 </div>

                 <div className="absolute bottom-0 right-0 bg-white shadow-sm rounded-tl-xl px-5 py-3 text-[13px] font-bold text-slate-700 z-20">
                    RASA Club's Local
                 </div>
              </div>

            </div>

            {/* Charts Section */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4 drop-shadow-sm ml-1">Historical Usage Patterns</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2">
                 
                 {/* Bar Chart */}
                 <div className="bg-white rounded-2xl p-4 shadow-md flex flex-col h-[180px]">
                    <div className="flex justify-between items-start mb-2">
                       <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                          <span className="text-[10px] bg-slate-100 p-1 rounded">📊</span> Session Analysis
                       </span>
                       <div className="flex gap-2 text-[9px] font-bold text-slate-600 uppercase tracking-wide">
                         <span className="flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-[2px]" /> Free</span>
                         <span className="flex items-center gap-1"><div className="w-2 h-2 bg-orange-400 rounded-[2px]" /> Soon</span>
                         <span className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500 rounded-[2px]" /> Occupied</span>
                       </div>
                    </div>
                    <div className="flex-1 -ml-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} barSize={10}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b', fontWeight: 700 }} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b' }} />
                          <Bar dataKey="Free" fill="#22c55e" radius={[2, 2, 0, 0]} />
                          <Bar dataKey="Soon" fill="#fb923c" radius={[2, 2, 0, 0]} />
                          <Bar dataKey="Occupied" fill="#ef4444" radius={[2, 2, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                 </div>

                 {/* Line Chart */}
                 <div className="bg-white rounded-2xl p-4 shadow-md flex flex-col h-[180px]">
                    <div className="flex justify-between items-start mb-2">
                       <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                          <span className="text-[10px] bg-slate-100 p-1 rounded">🕒</span> Hourly Occupancy Trend
                       </span>
                    </div>
                    <div className="flex-1 -ml-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={lineData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b', fontWeight: 700 }} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b' }} />
                          <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                 </div>

              </div>
              
              <div className="text-center text-[10px] font-semibold text-slate-300 pt-2 opacity-80 mix-blend-overlay">
                 @2026 UniSpace, All rights reserved
              </div>
            </div>

          </main>

          {/* Right Panel */}
          <aside className="w-[280px] bg-[#B0C4DE] border-l border-white/20 flex flex-col shrink-0">
             <div className="p-5 pb-0 mt-2">
                <div className="w-full h-32 rounded-xl overflow-hidden shadow-sm mb-6">
                   <img 
                     src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600" 
                     alt="Seat View"
                     className="w-full h-full object-cover" 
                   />
                </div>
                
                <div className="flex justify-between items-start mb-3">
                   <h2 className="text-2xl font-bold text-[#354868] leading-tight drop-shadow-sm">Seat 12-<br/>B04</h2>
                   <button className="text-[#354868] hover:text-red-500 transition-colors p-1">
                      <Heart className="w-6 h-6" strokeWidth={1.5} />
                   </button>
                </div>

                <p className="text-[13px] font-semibold text-[#48638C] mb-8 leading-relaxed pr-2">
                   Located in the first floor with views of the central courtyard.
                </p>

                <div className="flex flex-col gap-5">
                   <div className="flex items-center gap-4 text-[#354868]">
                      <div className="w-10 h-10 rounded-xl bg-[#86A0C8] text-white flex items-center justify-center shadow-sm">
                         <Wifi className="w-5 h-5" strokeWidth={2.5}/>
                      </div>
                      <span className="font-bold text-[13px] tracking-wide">Wifi State</span>
                   </div>
                   <div className="flex items-center gap-4 text-[#354868]">
                      <div className="w-10 h-10 rounded-xl bg-[#86A0C8] text-white flex items-center justify-center shadow-sm">
                         <Plug className="w-5 h-5" strokeWidth={2.5}/>
                      </div>
                      <span className="font-bold text-[13px] tracking-wide">Outlet State</span>
                   </div>
                   <div className="flex items-center gap-4 text-[#354868]">
                      <div className="w-10 h-10 rounded-xl bg-[#86A0C8] text-white flex items-center justify-center shadow-sm">
                         <Volume2 className="w-5 h-5" strokeWidth={2.5}/>
                      </div>
                      <span className="font-bold text-[13px] tracking-wide">Noise State</span>
                   </div>
                   <div className="flex items-center gap-4 text-[#354868]">
                      <div className="w-10 h-10 rounded-xl bg-[#86A0C8] text-white flex items-center justify-center shadow-sm">
                         <Thermometer className="w-5 h-5" strokeWidth={2.5}/>
                      </div>
                      <span className="font-bold text-[13px] tracking-wide">Warmth State</span>
                   </div>
                </div>
             </div>

             <div className="mt-auto p-5 text-center">
                <button className="w-full py-3.5 bg-[#D5F5EC] hover:bg-[#AEEBDB] text-[#2F7E6B] font-bold flex items-center justify-center rounded-[12px] text-[13px] tracking-wide transition-all shadow-sm">
                   Report An Issue
                </button>
             </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

function FilterItem({ label, checked, onClick }) {
  return (
    <div className="flex items-center gap-3 cursor-pointer group" onClick={onClick}>
       <div className="text-white drop-shadow-sm">
          {checked ? <CheckSquare className="w-5 h-5 text-white stroke-[2]" /> : <Square className="w-5 h-5 text-white stroke-[2]" />}
       </div>
       <span className="text-[13px] font-bold tracking-wide text-white group-hover:text-amber-100 drop-shadow-sm transition-all select-none">
          {label}
       </span>
    </div>
  );
}