
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { SalesPitch } from '../types';

interface SalesPitcherProps {
  onBack: () => void;
}

const SalesPitcher: React.FC<SalesPitcherProps> = ({ onBack }) => {
  const [product, setProduct] = useState('');
  const [persona, setPersona] = useState('');
  const [pitch, setPitch] = useState<SalesPitch | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!product || !persona) return;
    setLoading(true);
    try {
      const result = await geminiService.generateSalesPitch(persona, product);
      setPitch(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-zinc-400 hover:text-black transition-colors text-xs font-black uppercase tracking-widest"
      >
        <i className="fas fa-arrow-left text-[10px]"></i>
        Back to Dashboard
      </button>

      <div className="bg-gradient-to-br from-black to-zinc-800 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-[100px] rounded-full"></div>
        <h2 className="text-3xl font-black mb-8 italic tracking-tighter">Pitch <span className="text-red-600">Architect</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">Solution Category</label>
            <input 
              value={product}
              onChange={e => setProduct(e.target.value)}
              className="w-full bg-white border border-white/10 rounded-xl px-5 py-3 text-black focus:ring-2 focus:ring-red-600 focus:outline-none transition-all placeholder:text-zinc-400 font-medium"
              placeholder="e.g. Quantum Analytics Engine"
            />
          </div>
          <div className="space-y-3">
            <label className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">Target Authority</label>
            <input 
              value={persona}
              onChange={e => setPersona(e.target.value)}
              className="w-full bg-white border border-white/10 rounded-xl px-5 py-3 text-black focus:ring-2 focus:ring-red-600 focus:outline-none transition-all placeholder:text-zinc-400 font-medium"
              placeholder="e.g. Fintech Operations VP"
            />
          </div>
        </div>
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="mt-10 bg-red-600 text-white font-black px-10 py-4 rounded-xl hover:bg-white hover:text-black transition-all disabled:opacity-50 uppercase tracking-widest text-sm shadow-xl shadow-red-900/40"
        >
          {loading ? 'Processing Logic...' : 'Craft Conversion Script'}
        </button>
      </div>

      {pitch && (
        <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500">
          <div className="border-b border-zinc-100 p-8 flex justify-between items-center bg-zinc-50/50">
            <div>
              <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1">Deployment Ready</p>
              <h3 className="font-black text-black text-xl">{pitch.title}</h3>
            </div>
            <div className="flex gap-3">
              <button className="w-10 h-10 flex items-center justify-center hover:bg-black hover:text-white rounded-full transition-all border border-zinc-200"><i className="fas fa-copy"></i></button>
              <button className="w-10 h-10 flex items-center justify-center hover:bg-black hover:text-white rounded-full transition-all border border-zinc-200"><i className="fas fa-share-alt"></i></button>
            </div>
          </div>
          <div className="p-10 prose prose-red max-w-none whitespace-pre-wrap leading-relaxed text-zinc-900 font-medium">
            {pitch.pitch}
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesPitcher;
