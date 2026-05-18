import React from 'react';
import { Search, Plus, Edit2, Trash2, Ban } from 'lucide-react';

const AdminUserManagement = () => {
  const users = [
    { id: 1, name: 'Alice Johnson', email: 'alice.j@university.edu', role: 'Student', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob.s@university.edu', role: 'Staff', status: 'Active' },
    { id: 3, name: 'Charlie Brown', email: 'charlie.b@university.edu', role: 'Student', status: 'Inactive' },
    { id: 4, name: 'Diana Prince', email: 'diana.p@university.edu', role: 'Admin', status: 'Active' },
    { id: 5, name: 'Evan Wright', email: 'evan.w@university.edu', role: 'Faculty', status: 'Active' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">User Management</h1>
          <p className="text-slate-500 font-medium">Manage students, staff, and administrators.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" /> Add User
        </button>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div className="relative w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              placeholder="Search users by name or email..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <div className="flex gap-3">
            <select className="bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
              <option>All Roles</option>
              <option>Student</option>
              <option>Staff</option>
              <option>Admin</option>
            </select>
            <select className="bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-sm text-slate-500 uppercase tracking-wider">
                <th className="py-4 px-6 font-bold">Name</th>
                <th className="py-4 px-6 font-bold">Email</th>
                <th className="py-4 px-6 font-bold">Role</th>
                <th className="py-4 px-6 font-bold">Status</th>
                <th className="py-4 px-6 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-slate-900">{user.name}</td>
                  <td className="py-4 px-6 text-slate-500">{user.email}</td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold">
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      user.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 flex justify-end gap-2">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Block User">
                      <Ban className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-6">
          <p className="text-sm text-slate-500 font-medium">Showing 1 to 5 of 5 entries</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50">Previous</button>
            <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserManagement;
