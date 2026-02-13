
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { Campaign } from '../types';

const CampaignCreator: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', audience: '', goals: '' });
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await geminiService.generateCampaign(formData);
      setCampaign(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100">
        <h2 className="text-xl font-black text-black mb-6 uppercase tracking-tight">Campaign Intelligence</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">Project Label</label>
            <input
              required
              type="text"
              placeholder="e.g. ALPHA_GROWTH_2025"
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all font-medium"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">Target Demographics</label>
            <input
              required
              type="text"
              placeholder="e.g. Enterprise CTOs"
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all font-medium"
              value={formData.audience}
              onChange={e => setFormData({...formData, audience: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">Primary Objectives</label>
            <textarea
              required
              rows={4}
              placeholder="Define mission success parameters..."
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all font-medium"
              value={formData.goals}
              onChange={e => setFormData({...formData, goals: e.target.value})}
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white font-black py-4 rounded-xl hover:bg-red-600 transition-all transform active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-widest"
          >
            {loading ? <i className="fas fa-sync fa-spin"></i> : <i className="fas fa-crosshairs"></i>}
            {loading ? 'Synthesizing Data...' : 'Generate Blueprint'}
          </button>
        </form>
      </div>

      <div className="bg-zinc-100 border-2 border-dashed border-zinc-300 rounded-2xl p-8 flex flex-col relative overflow-hidden">
        {campaign ? (
          <div className="bg-white p-8 rounded-xl shadow-xl border-l-8 border-red-600 animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-zinc-100">
              <span className="bg-black text-white text-[10px] font-black px-3 py-1 rounded uppercase tracking-tighter">AI Generated Asset</span>
              <button className="text-red-600 text-xs font-black uppercase hover:underline">Export to PDF</button>
            </div>
            <div className="prose prose-zinc max-w-none whitespace-pre-wrap text-black leading-relaxed font-medium">
              {campaign.content}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-zinc-400 text-center">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <i className="fas fa-microchip text-3xl text-zinc-200"></i>
            </div>
            <p className="font-black text-black uppercase tracking-tight">System Ready</p>
            <p className="text-xs font-bold max-w-[200px] mt-2">Provide parameters to initiate generative campaign synthesis.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignCreator;