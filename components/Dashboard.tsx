
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { geminiService } from '../services/geminiService';

const data = [
  { name: 'Mon', leads: 400, conv: 240 },
  { name: 'Tue', leads: 300, conv: 139 },
  { name: 'Wed', leads: 200, conv: 980 },
  { name: 'Thu', leads: 278, conv: 390 },
  { name: 'Fri', leads: 189, conv: 480 },
  { name: 'Sat', leads: 239, conv: 380 },
  { name: 'Sun', leads: 349, conv: 430 },
];

const Dashboard: React.FC = () => {
  const [fastInsight, setFastInsight] = useState<string>('Analyzing trends...');

  useEffect(() => {
    geminiService.getQuickInsight('Modern Sales Strategies').then(setFastInsight);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-black">Executive Summary</h1>
        <div className="bg-red-50 border border-red-100 px-4 py-2 rounded-lg flex items-center gap-3 animate-pulse">
           <i className="fas fa-bolt text-red-600"></i>
           <span className="text-sm text-red-900 font-bold uppercase tracking-tight">Real-time Insight: <span className="font-normal normal-case">{fastInsight}</span></span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Leads', value: '12,840', change: '+12%', icon: 'fa-users', color: 'bg-black' },
          { label: 'Conversion Rate', value: '4.2%', change: '+0.5%', icon: 'fa-percentage', color: 'bg-red-600' },
          { label: 'Active Campaigns', value: '24', change: '-2', icon: 'fa-bullhorn', color: 'bg-black' },
          { label: 'Avg. Lead Score', value: '78', change: '+5', icon: 'fa-star', color: 'bg-red-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-zinc-100 group hover:border-red-200 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-zinc-500 text-xs font-black uppercase tracking-widest">{stat.label}</p>
                <p className="text-3xl font-black text-black mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} w-10 h-10 rounded-lg flex items-center justify-center text-white transition-transform group-hover:scale-110`}>
                <i className={`fas ${stat.icon}`}></i>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-red-600' : 'text-zinc-400'}`}>
                {stat.change}
              </span>
              <span className="text-xs text-zinc-400">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-100">
          <h3 className="text-sm font-black uppercase tracking-widest text-black mb-6 border-l-4 border-red-600 pl-4">Lead Acquisition Flow</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#000', fontSize: 10, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#000', fontSize: 10, fontWeight: 700}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontWeight: 'bold'}}
                />
                <Area type="monotone" dataKey="leads" stroke="#dc2626" strokeWidth={3} fillOpacity={1} fill="url(#colorLeads)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-100">
          <h3 className="text-sm font-black uppercase tracking-widest text-black mb-6 border-l-4 border-black pl-4">Conversion Efficiency</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#000', fontSize: 10, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#000', fontSize: 10, fontWeight: 700}} />
                <Tooltip 
                  cursor={{fill: '#f8f8f8'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontWeight: 'bold'}}
                />
                <Bar dataKey="conv" fill="#000" radius={[2, 2, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;