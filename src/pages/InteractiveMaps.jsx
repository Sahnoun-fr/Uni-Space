import React, { useState, useEffect } from 'react';
import { School, Search, Building, Clock, Star, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function InteractiveMaps() {
  const [user, setUser] = useState({ name: 'Mounia Kadi', email: 'Estin Student' });
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser({
        name: parsedUser.name || 'User',
        email: parsedUser.email?.includes('estin.dz') ? 'Estin Student' : (parsedUser.email || 'Student')
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[url('/background%202.png')] bg-cover bg-center relative font-sans">
      {/* subtle blue tint overlay instead of full black */}
      <div className="absolute inset-0 bg-blue-700/12" />

      {/* Top-left brand */}
      <header className="absolute top-4 left-6 z-20 flex items-center gap-3 text-white">
        <div className="p-2 bg-white/10 rounded-md"><School className="w-6 h-6 text-white" /></div>
        <div>
          <h3 className="text-lg font-bold tracking-wide">UniSpace</h3>
        </div>
      </header>

      {/* Centered glass panel */}
      <div className="relative max-w-[1200px] mx-auto mt-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-6 grid grid-cols-[220px_1fr_260px] gap-6">

        {/* Left Filters */}
        <aside className="text-white flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-md"><School className="w-6 h-6 text-white" /></div>
            <div>
              <h3 className="text-xl font-bold">UniSpace</h3>
              <p className="text-xs text-white/70">Find your seat</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm uppercase text-white/80 tracking-wide mb-4">Filter</h4>
            <ul className="space-y-3 text-sm text-white/90">
              <li><label className="flex items-center gap-2"><input type="checkbox" className="accent-blue-400" /> With Power Outlet</label></li>
              <li><label className="flex items-center gap-2"><input type="checkbox" className="accent-blue-400" /> Window View</label></li>
              <li><label className="flex items-center gap-2"><input type="checkbox" className="accent-blue-400" /> Quiet Zone</label></li>
              <li><label className="flex items-center gap-2"><input type="checkbox" className="accent-blue-400" /> Strong Wifi</label></li>
              <li><label className="flex items-center gap-2"><input type="checkbox" className="accent-blue-400" /> Available Only</label></li>
            </ul>
          </div>

          <div className="mt-auto text-xs text-white/60">&copy; 2024 UniSpace</div>
        </aside>

        {/* Center Map + Charts */}
        <main className="flex flex-col gap-6">

          <div className="bg-white rounded-xl p-4 shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input placeholder="search for locals or spaces ..." className="w-full border border-slate-200 rounded-full py-3 pl-10 pr-4 text-sm" />
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-blue-100 rounded-full text-xs text-blue-700">Silent Study</button>
                <button className="px-3 py-1 bg-white/50 rounded-full text-xs text-slate-700">Group Work</button>
                <button className="px-3 py-1 bg-white/50 rounded-full text-xs text-slate-700">Outlets</button>
              </div>
            </div>

            <div className="h-[320px] bg-slate-100 rounded-lg border border-slate-200 overflow-hidden relative">
              {/* simplified map placeholder; keep the app's interactive visuals if needed later */}
              <div className="absolute inset-4 border-8 border-slate-200 rounded-lg bg-white/30"></div>

              <div className="absolute bottom-4 left-4 bg-white rounded-full px-3 py-2 shadow text-xs flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full" /> Calm
                <span className="inline-block w-2 h-2 bg-orange-400 rounded-full ml-2" /> Medium
                <span className="inline-block w-2 h-2 bg-red-500 rounded-full ml-2" /> Crowded
              </div>

              <div className="absolute bottom-6 right-6 bg-white/90 text-xs px-3 py-1 rounded shadow">RASA Club's Local</div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 shadow">
              <h4 className="text-sm font-bold mb-2">Historical Usage Patterns</h4>
              <div className="h-36 bg-slate-50 rounded" />
            </div>
            <div className="bg-white rounded-xl p-4 shadow">
              <h4 className="text-sm font-bold mb-2">Hourly Occupancy Trend</h4>
              <div className="h-36 bg-slate-50 rounded" />
            </div>
          </div>

        </main>

        {/* Right seat panel */}
        <aside className="bg-white/90 rounded-xl p-4 flex flex-col items-center">
          <img src="/seat.jpg" alt="seat" className="w-full h-32 object-cover rounded-lg mb-4" onError={(e)=> e.currentTarget.src='/background.png'} />
          <h3 className="text-lg font-bold text-slate-800">Seat 12-B04</h3>
          <p className="text-sm text-slate-600 text-center mb-4">Located in the first floor with views of the central courtyard.</p>

          <div className="w-full space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">WiFi</div>
              <div className="text-sm">Wifi State</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">Plug</div>
              <div className="text-sm">Outlet State</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">Noise</div>
              <div className="text-sm">Noise State</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">Warm</div>
              <div className="text-sm">Warmth State</div>
            </div>
          </div>

          <button className="mt-auto bg-emerald-300 text-slate-900 px-4 py-2 rounded-lg shadow">Report An Issue</button>
        </aside>

      </div>
    </div>
  );
}