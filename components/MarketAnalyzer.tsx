
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { MarketInsight } from '../types';

interface MarketAnalyzerProps {
  onBack: () => void;
}

const MarketAnalyzer: React.FC<MarketAnalyzerProps> = ({ onBack }) => {
  const [query, setQuery] = useState('');
  const [analysis, setAnalysis] = useState<MarketInsight | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const result = await geminiService.analyzeMarket(query);
      setAnalysis(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-zinc-400 hover:text-black transition-colors text-xs font-black uppercase tracking-widest"
      >
        <i className="fas fa-arrow-left text-[10px]"></i>
        Back to Dashboard
      </button>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 ring-4 ring-black/5">
        <div className="flex gap-4">
          <input 
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 border-2 border-zinc-100 rounded-2xl px-8 py-5 text-lg font-bold text-black focus:ring-4 focus:ring-red-600/5 focus:border-red-600 focus:outline-none transition-all placeholder:text-zinc-300"
            placeholder="Search market intelligence..."
          />
          <button 
            onClick={handleAnalyze}
            disabled={loading}
            className="bg-black text-white font-black px-12 rounded-2xl hover:bg-red-600 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-4 uppercase tracking-widest text-sm"
          >
            {loading ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-satellite"></i>}
            SCAN
          </button>
        </div>
      </div>

      {analysis && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-10 rounded-3xl shadow-xl border border-zinc-100">
            <h3 className="text-xl font-black text-black mb-8 flex items-center gap-4 uppercase tracking-tighter">
              <span className="w-12 h-1 w-1 bg-red-600"></span>
              Intelligence Report
            </h3>
            <div className="prose prose-zinc max-w-none text-black leading-loose whitespace-pre-wrap font-medium">
              {analysis.summary}
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-zinc-50 p-8 rounded-3xl border border-zinc-200">
              <h4 className="font-black text-black text-sm uppercase tracking-widest mb-6 flex items-center gap-3">
                <i className="fas fa-link text-red-600"></i>
                Grounding
              </h4>
              <ul className="space-y-4">
                {analysis.sources.map((src, i) => (
                  <li key={i}>
                    <a 
                      href={src.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-zinc-600 hover:text-red-600 text-xs font-bold flex items-center gap-3 group transition-colors"
                    >
                      <i className="fas fa-chevron-right text-[8px] text-red-600 transition-transform group-hover:translate-x-1"></i>
                      <span className="truncate border-b border-transparent group-hover:border-red-600">{src.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-black p-8 rounded-3xl text-white shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <i className="fas fa-bolt text-red-600"></i>
                <h4 className="font-black uppercase tracking-tighter text-sm italic">Mind Insight</h4>
              </div>
              <p className="text-zinc-400 text-xs font-medium leading-relaxed">
                Grounding protocols verified via Google Search. This analysis is optimized for immediate strategic deployment.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketAnalyzer;
