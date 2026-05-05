import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [user, setUser] = useState({ name: 'User', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('user');
      if (saved) setUser(JSON.parse(saved));
    } catch (e) {}
  }, []);

  return (
    <div className="min-h-screen bg-[url('/background%202.png')] bg-cover bg-center relative font-sans">
      <div className="absolute inset-0 bg-blue-900/40" />
      <div className="relative z-10 max-w-3xl mx-auto p-8">
        <h1 className="text-3xl text-white font-bold mb-4">My Profile</h1>
        <div className="bg-white/10 p-6 rounded-2xl border border-white/10 text-white">
          <p className="mb-2"><strong>Name:</strong> {user.name}</p>
          <p className="mb-2"><strong>Email:</strong> {user.email}</p>
          <div className="mt-4">
            <button onClick={() => navigate('/settings')} className="px-4 py-2 bg-blue-500 text-white rounded">Edit in Settings</button>
          </div>
        </div>
      </div>
    </div>
  );
}
