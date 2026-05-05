import React, { useEffect, useState } from 'react';
import { School, ArrowLeft, User, Mail, IdCard, BookOpen, Award, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: 'User Name', email: 'username@estin.dz' });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('user');
      if (saved) setUser(JSON.parse(saved));
    } catch (e) {}
  }, []);

  return (
    <div className="min-h-screen bg-[url('/background%202.png')] bg-cover bg-center bg-no-repeat relative font-sans flex flex-col">
      <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-[4px] z-0" />

      {/* Top Navbar */}
      <header className="relative z-20 flex items-center justify-between px-8 py-6 w-full max-w-[1400px] mx-auto">
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
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-start px-8 w-full max-w-[1000px] mx-auto pt-8 pb-12">
        <div className="w-full bg-[#F8FAFC]/95 backdrop-blur-xl rounded-[2rem] shadow-2xl overflow-hidden border border-white/40">
          
          {/* Header Banner */}
          <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
            <div className="absolute -bottom-16 left-12 w-32 h-32 rounded-full border-4 border-[#F8FAFC] bg-white flex items-center justify-center overflow-hidden shadow-lg">
              <User className="w-16 h-16 text-slate-400" />
            </div>
            <div className="absolute bottom-4 right-6 text-white text-right">
              <p className="text-sm font-bold tracking-wider opacity-90">Member since 2024</p>
            </div>
          </div>

          <div className="pt-20 px-12 pb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-10">
              <div>
                <h1 className="text-4xl font-bold text-[#1E293B] mb-2">{user.name}</h1>
                <p className="text-lg text-[#64748B] font-medium flex items-center gap-2">
                  <Mail className="w-5 h-5" /> {user.email}
                </p>
              </div>
              <button className="mt-4 sm:mt-0 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-6 py-2.5 rounded-full font-bold shadow-md transition-colors border border-blue-400">
                Edit Profile
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="p-3 bg-indigo-50 rounded-xl text-indigo-500">
                  <IdCard className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Student ID</p>
                  <p className="text-[#334155] font-bold">EST-2024-089</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="p-3 bg-emerald-50 rounded-xl text-emerald-500">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Major</p>
                  <p className="text-[#334155] font-bold">Computer Science</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="p-3 bg-amber-50 rounded-xl text-amber-500">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Status</p>
                  <p className="text-[#334155] font-bold">Active Student</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1E293B] mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-blue-500" /> Recent Activity Highlights
              </h2>
              <div className="bg-white rounded-2xl border border-slate-100 p-2 shadow-sm">
                <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                      <School className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-[#334155]">Booked Seat 12-B04 in Quiet Zone</p>
                      <p className="text-sm text-slate-500">Today, 12:00 PM</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">Completed</span>
                </div>
                <div className="h-px bg-slate-100 mx-4"></div>
                <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                      <School className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-[#334155]">Booked Group Room A1</p>
                      <p className="text-sm text-slate-500">Yesterday, 14:00 PM</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">Completed</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
