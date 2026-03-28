import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Flame, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';

interface LoginViewProps {
  onLogin: (sparkId: string) => void;
}

export function LoginView({ onLogin }: LoginViewProps) {
  const [sparkId, setSparkId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Basic strong password validation
  const isStrongPassword = (pass: string) => {
    const minLength = pass.length >= 8;
    const hasUpper = /[A-Z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    return minLength && hasUpper && hasNumber && hasSpecial;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!sparkId.trim()) {
      setError('Please enter your Spark ID');
      return;
    }

    if (!isStrongPassword(password)) {
      setError('Password must be at least 8 characters and include an uppercase letter, a number, and a special character.');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      onLogin(sparkId);
    }, 800);
  };

  return (
    <div className="flex-1 bg-white h-full flex flex-col relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-rose-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-orange-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="flex-1 flex flex-col justify-center px-8 z-10 max-w-md mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-12"
        >
          <div className="w-20 h-20 bg-gradient-to-tr from-rose-500 to-orange-400 rounded-3xl flex items-center justify-center shadow-xl shadow-rose-200 mb-6 transform rotate-12">
            <Flame size={40} className="text-white transform -rotate-12" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Spark</h1>
          <p className="text-gray-500 font-medium text-center">Find your perfect match today.</p>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleLogin} 
          className="space-y-5"
        >
          <div>
            <label className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 block pl-1">Spark ID</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={sparkId}
                onChange={(e) => setSparkId(e.target.value)}
                placeholder="Enter your Spark ID"
                className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all text-gray-900 font-medium placeholder:font-normal"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 block pl-1">Strong Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={20} className="text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all text-gray-900 font-medium placeholder:font-normal"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            {/* Password strength indicator hints */}
            <div className="mt-3 flex gap-1 px-1">
              <div className={`h-1 flex-1 rounded-full ${password.length >= 8 ? 'bg-green-400' : 'bg-gray-200'}`} />
              <div className={`h-1 flex-1 rounded-full ${/[A-Z]/.test(password) && /[0-9]/.test(password) ? 'bg-green-400' : 'bg-gray-200'}`} />
              <div className={`h-1 flex-1 rounded-full ${/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'bg-green-400' : 'bg-gray-200'}`} />
            </div>
            <p className="text-xs text-gray-400 mt-2 px-1">
              Must contain 8+ chars, 1 uppercase, 1 number, 1 special char.
            </p>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="text-rose-500 text-sm font-medium px-1"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full mt-8 bg-gradient-to-r from-rose-500 to-orange-400 text-white font-bold py-4 rounded-2xl shadow-lg shadow-rose-200 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 group"
          >
            Sign In
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.form>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-500 text-sm">
            Don't have a Spark ID? <button className="text-rose-500 font-bold hover:underline">Create one</button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
