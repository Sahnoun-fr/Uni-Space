import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Map as MapIcon, TrendingUp, ShieldCheck, ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';
import ThirdFloorMap from '../components/ThirdFloorMap';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Students', value: '2,845', trend: '+12.5%', isUp: true, icon: Users, color: 'blue' },
    { label: 'Active Spaces', value: '42', trend: '+3.2%', isUp: true, icon: MapIcon, color: 'emerald' },
    { label: 'Avg. Occupancy', value: '68%', trend: '-4.1%', isUp: false, icon: TrendingUp, color: 'amber' },
    { label: 'Security Alerts', value: '0', trend: 'Stable', isUp: true, icon: ShieldCheck, color: 'purple' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500 font-medium">Welcome back, here's what's happening today.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center gap-2">
          Download Report <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-xl bg-${stat.color}-50`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.isUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                {stat.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts / Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Occupancy Chart Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900">Real-time Occupancy</h3>
            <Link to="/admin/maps" className="bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold py-2 px-4 rounded-xl transition-all flex items-center gap-2 text-sm">
              <MapIcon className="w-4 h-4" />
              All Maps
            </Link>
          </div>
          <div className="flex-1 rounded-2xl overflow-hidden shadow-inner border border-slate-200 relative">
            <ThirdFloorMap />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">New User Registered</p>
                  <p className="text-xs text-slate-500">Student from CSE department joined.</p>
                  <p className="text-[10px] font-bold text-slate-300 uppercase mt-1">2 mins ago</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold rounded-xl transition-all">
            View All Activity
          </button>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
