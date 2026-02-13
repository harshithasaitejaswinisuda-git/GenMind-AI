
import React, { useState } from 'react';

interface AuthProps {
  onLogin: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateGmail = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateGmail(email)) {
      setError('System Error: Access restricted to authorized @gmail.com accounts only.');
      return;
    }

    if (password.length < 6) {
      setError('Security Error: Password must be at least 6 characters.');
      return;
    }

    // Mock authentication success
    onLogin();
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-red-600/20 mb-4 transform rotate-3">
            <i className="fas fa-bolt text-2xl text-white"></i>
          </div>
          <h1 className="text-4xl font-black text-black tracking-tighter italic">
            Market<span className="text-red-600">Mind</span>
          </h1>
          <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Intelligence Deployment Hub</p>
        </div>

        <div className="bg-black rounded-3xl p-8 shadow-2xl relative overflow-hidden ring-1 ring-white/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-[60px] rounded-full -mr-16 -mt-16"></div>
          
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-white italic tracking-tighter">
              {isSignup ? 'Create Account' : 'Operator Login'}
            </h2>
            {isSignup && (
              <button 
                onClick={() => setIsSignup(false)}
                className="text-zinc-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest flex items-center gap-2"
              >
                <i className="fas fa-arrow-left text-[10px]"></i> Back
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2">Gmail Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="identity@gmail.com"
                className="w-full bg-white border border-white/10 rounded-xl px-5 py-4 text-black font-bold focus:ring-2 focus:ring-red-600 focus:outline-none transition-all placeholder:text-zinc-300"
              />
            </div>

            <div>
              <label className="block text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2">Access Key</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-white border border-white/10 rounded-xl px-5 py-4 text-black font-bold focus:ring-2 focus:ring-red-600 focus:outline-none transition-all placeholder:text-zinc-300"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-600/10 border border-red-600/20 rounded-xl">
                <p className="text-red-500 text-[10px] font-black uppercase leading-tight">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-red-600 text-white font-black py-4 rounded-xl hover:bg-white hover:text-black transition-all transform active:scale-[0.98] shadow-xl shadow-red-900/20 uppercase tracking-widest text-sm"
            >
              {isSignup ? 'Deploy Identity' : 'Establish Connection'}
            </button>
          </form>

          {!isSignup && (
            <div className="mt-8 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
              <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">First time here?</p>
              <button 
                onClick={() => setIsSignup(true)}
                className="text-white hover:text-red-600 transition-colors font-black uppercase text-xs tracking-widest"
              >
                Request Authorization
              </button>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]">
            Authorized Personnel Only • Secure 256-bit Encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
