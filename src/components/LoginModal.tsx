import React, { useState } from 'react';
import { X, ArrowRight, AlertCircle } from 'lucide-react';
import { Logo } from './Logo';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('Acesso restrito a oficinas parceiras homologadas.');
  };

  return (
    <div className="fixed inset-0 bg-brand-dark/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-gray-200">
        
        {/* Header Compacto */}
        <div className="bg-gray-50 p-5 text-center border-b border-gray-100 relative">
          <button 
            onClick={onClose} 
            className="absolute top-3 right-3 text-gray-400 hover:text-brand-orange transition-colors p-1 hover:bg-orange-50 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex justify-center mb-2 scale-90">
            <Logo className="h-10" />
          </div>
          <h3 className="font-bold text-lg text-brand-dark">Área do Parceiro</h3>
        </div>

        <form onSubmit={handleLogin} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-2 rounded-lg text-xs flex items-center gap-2 animate-shake">
              <AlertCircle className="w-3 h-3 shrink-0" />
              {error}
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1">CNPJ ou Email</label>
            <div className="relative">
              <input 
                type="text" 
                className="w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-teal/10 focus:border-brand-teal p-2.5 pl-3 text-sm transition-all outline-none text-brand-dark font-medium"
                placeholder="00.000.000/0001-00"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1">Senha</label>
            <div className="relative">
              <input 
                type="password" 
                className="w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-teal/10 focus:border-brand-teal p-2.5 pl-3 text-sm transition-all outline-none text-brand-dark font-medium"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-brand-teal text-white py-3 rounded-lg font-bold hover:bg-teal-700 transition-all shadow-md shadow-brand-teal/20 flex justify-center items-center gap-2 text-sm transform hover:-translate-y-0.5"
          >
            Entrar <ArrowRight className="w-3 h-3" />
          </button>

          <div className="text-center pt-1">
            <a href="#" className="text-[10px] text-gray-400 hover:text-brand-orange transition-colors">Esqueci minha senha</a>
          </div>
        </form>
      </div>
    </div>
  );
}