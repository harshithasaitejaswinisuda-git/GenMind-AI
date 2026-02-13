
import React, { useState } from 'react';

interface AuthProps {
  onLogin: (email: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateGmail = (email: string) => {
    return email.toLowerCase().endsWith('@gmail.com');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateGmail(email)) {
      setError('Access denied. Please use a valid @gmail.com address.');
      return;
    }

    if (password.length < 6) {
      setError('Security protocol: Password must be at least 6 characters.');
      return;
    }

    // Simulate authentication
    onLogin(email);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-900/10 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-md bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl relative z-10">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-600/20 mb-6">
            <i className="fas fa-bolt text-2xl text-white"></i>
          </div>
          <h1 className="text-3xl font-black text-white italic tracking-tighter">
            Market<span className="text-red-600">Mind</span>
          </h1>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.3em] mt-2">Intelligence Protocol</p>
        </div>

        <div className="flex bg-black/40 p-1 rounded-2xl mb-8 border border-white/5">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${isLogin ? 'bg-red-600 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}
          >
            Login
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${!isLogin ? 'bg-red-600 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}
          >
            Signup
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 px-1">Email Address</label>
            <div className="relative">
              <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 text-sm"></i>
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@gmail.com"
                className="w-full bg-black/60 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white text-sm focus:ring-2 focus:ring-red-600 focus:outline-none transition-all placeholder:text-zinc-700 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 px-1">Security Key</label>
            <div className="relative">
              <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 text-sm"></i>
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black/60 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white text-sm focus:ring-2 focus:ring-red-600 focus:outline-none transition-all placeholder:text-zinc-700 font-medium"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-600/10 border border-red-600/20 text-red-500 text-[10px] font-black uppercase tracking-widest p-4 rounded-xl flex items-center gap-3 animate-pulse">
              <i className="fas fa-exclamation-triangle"></i>
              {error}
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-red-600 hover:text-white transition-all transform active:scale-[0.98] shadow-xl uppercase tracking-widest text-xs mt-4"
          >
            {isLogin ? 'Establish Connection' : 'Register Protocol'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
            {isLogin ? 'New operative?' : 'Existing operative?'} 
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-red-600 hover:underline"
            >
              {isLogin ? 'Initialize Signup' : 'Return to Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
