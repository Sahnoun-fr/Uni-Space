import React from 'react';
import { ShieldAlert, Info, CheckCircle2, Trash2, Check, AlertTriangle } from 'lucide-react';

const AdminNotifications = () => {
  const notifications = [
    {
      id: 1,
      type: 'security',
      title: 'Unauthorized Access Attempt',
      message: 'Multiple failed login attempts detected from IP 192.168.1.55 on the admin portal.',
      time: '10 mins ago',
      read: false,
      icon: ShieldAlert,
      color: 'rose'
    },
    {
      id: 2,
      type: 'alert',
      title: 'High Occupancy Alert',
      message: 'Library Floor 2 has reached 95% capacity. Consider dispatching personnel or updating status.',
      time: '1 hour ago',
      read: false,
      icon: AlertTriangle,
      color: 'amber'
    },
    {
      id: 3,
      type: 'system',
      title: 'System Update Completed',
      message: 'The UniSpace core system has been successfully updated to version 2.4.1.',
      time: 'Yesterday',
      read: true,
      icon: CheckCircle2,
      color: 'emerald'
    },
    {
      id: 4,
      type: 'info',
      title: 'New Map Published',
      message: 'Science Building Floor 3 has been successfully published to the live environment.',
      time: 'Yesterday',
      read: true,
      icon: Info,
      color: 'blue'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Notifications</h1>
          <p className="text-slate-500 font-medium">System alerts, security warnings, and updates.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all flex items-center gap-2">
            <Check className="w-4 h-4" /> Mark all as read
          </button>
          <button className="px-5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold rounded-xl transition-all flex items-center gap-2">
            <Trash2 className="w-4 h-4" /> Clear All
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-4">
          <button className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full">All Alerts</button>
          <button className="text-sm font-bold text-slate-500 hover:text-slate-700 px-4 py-1.5 rounded-full transition-colors">Unread (2)</button>
          <button className="text-sm font-bold text-slate-500 hover:text-slate-700 px-4 py-1.5 rounded-full transition-colors">Security</button>
        </div>
        
        <div className="divide-y divide-slate-100">
          {notifications.map((notif) => (
            <div key={notif.id} className={`p-6 flex gap-4 transition-colors hover:bg-slate-50 ${!notif.read ? 'bg-blue-50/30' : ''}`}>
              <div className={`w-12 h-12 shrink-0 rounded-2xl bg-${notif.color}-100 flex items-center justify-center`}>
                <notif.icon className={`w-6 h-6 text-${notif.color}-600`} />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className={`text-base font-bold text-slate-900 ${!notif.read ? 'flex items-center gap-2' : ''}`}>
                      {notif.title}
                      {!notif.read && <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>}
                    </h3>
                    <p className="text-slate-600 mt-1 leading-relaxed text-sm">{notif.message}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-400 whitespace-nowrap">{notif.time}</span>
                </div>
                <div className="mt-3 flex gap-3">
                  {!notif.read && (
                    <button className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">Mark as read</button>
                  )}
                  <button className="text-sm font-bold text-slate-400 hover:text-rose-600 transition-colors">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminNotifications;
