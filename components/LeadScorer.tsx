
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { Lead } from '../types';

const LeadScorer: React.FC = () => {
  const [input, setInput] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  const handleScore = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const result = await geminiService.scoreLeads(input);
      setLeads(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const mockLeadsText = `John Doe, Tesla, high interest in CRM
Sarah Connor, Skynet, looking for security automation
Walter White, Blue Meth Co, basic inquiry`;

  return (
    <div className="space-y-8">
      <div className="bg-white p-10 rounded-3xl shadow-sm border border-zinc-100">
        <h2 className="text-2xl font-black text-black mb-4 uppercase tracking-tighter italic">Predictive Intelligence</h2>
        <p className="text-zinc-500 mb-8 text-sm font-medium">Input prospect metadata to calculate conversion probabilities.</p>
        <div className="space-y-6">
          <textarea
            rows={5}
            value={input}
            onChange={e => setInput(e.target.value)}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-red-600/5 focus:border-red-600 focus:outline-none text-sm font-medium"
            placeholder="Paste raw lead data, bios, or thread snippets..."
          />
          <div className="flex justify-between items-center">
            <button 
              onClick={() => setInput(mockLeadsText)}
              className="text-red-600 text-xs font-black uppercase tracking-widest hover:underline"
            >
              Load Simulation
            </button>
            <button 
              onClick={handleScore}
              disabled={loading}
              className="bg-black text-white font-black px-12 py-4 rounded-xl hover:bg-red-600 transition-all transform active:scale-95 disabled:opacity-50 uppercase tracking-widest text-xs"
            >
              {loading ? 'CALCULATING...' : 'GENERATE SCORES'}
            </button>
          </div>
        </div>
      </div>

      {leads.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leads.map((lead, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-xl border border-zinc-100 relative overflow-hidden group hover:border-red-600 transition-all">
              <div className={`absolute top-0 right-0 w-1.5 h-full ${
                lead.score >= 80 ? 'bg-red-600' : lead.score >= 50 ? 'bg-black' : 'bg-zinc-300'
              }`}></div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="font-black text-black text-lg">{lead.name}</h4>
                  <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">{lead.company}</p>
                </div>
                <div className={`text-3xl font-black italic ${
                  lead.score >= 80 ? 'text-red-600' : 'text-black'
                }`}>
                  {lead.score}
                </div>
              </div>
              <p className="text-xs text-zinc-600 font-medium leading-relaxed line-clamp-4 mb-6">{lead.reasoning}</p>
              <div className="flex items-center gap-3">
                <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full ${
                  lead.status === 'hot' ? 'bg-red-600 text-white' : lead.status === 'warm' ? 'bg-black text-white' : 'bg-zinc-100 text-zinc-500'
                }`}>
                  {lead.status}
                </span>
                <button className="text-[10px] text-red-600 font-black uppercase tracking-widest ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  Full Dossier →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeadScorer;