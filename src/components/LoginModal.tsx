import React, { useState } from 'react';
import { X, Lock, ArrowRight } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Acesso restrito a oficinas parceiras homologadas.');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        <div className="bg-gray-900 p-6 text-white flex justify-between items-start">
          <div>
            <h3 className="font-bold text-xl flex items-center gap-2">
              <Lock className="w-5 h-5 text-blue-400" />
              Área do Parceiro
            </h3>
            <p className="text-gray-400 text-sm mt-1">Acesso exclusivo para oficinas.</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleLogin} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CNPJ ou Email Corporativo</label>
            <input 
              type="text" 
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
              placeholder="00.000.000/0001-00"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha de Acesso</label>
            <input 
              type="password" 
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors flex justify-center items-center gap-2"
          >
            Entrar no Sistema <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-center mt-4">
            <a href="#" className="text-xs text-blue-600 hover:underline">Esqueci minha senha</a>
            <span className="mx-2 text-gray-300">|</span>
            <a href="#" className="text-xs text-blue-600 hover:underline">Quero ser parceiro</a>
          </div>
        </form>
      </div>
    </div>
  );
}