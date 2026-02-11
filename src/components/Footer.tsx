import React, { useState } from 'react';
import { Instagram, Facebook, Mail } from 'lucide-react';
import { Toast } from './Toast';

export function Footer() {
  const [showToast, setShowToast] = useState(false);

  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowToast(true);
  };

  return (
    <>
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800 pb-24 md:pb-12"> {/* Padding extra no mobile por causa do menu inferior */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8 text-center md:text-left">
            
            {/* Brand (Vazio ou Nome Texto se preferir, mas removi a logo conforme pedido) */}
            <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start justify-center">
               <h3 className="text-2xl font-bold text-white tracking-tight">AutoSimples</h3>
               <p className="text-gray-500 text-sm mt-2">Tecnologia Plate-to-Part</p>
            </div>

            {/* Links Rápidos */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-lg font-bold mb-4 text-gray-200">Links Rápidos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#como-funciona" className="hover:text-brand-teal transition-colors">Como Funciona</a></li>
                <li><a href="#" onClick={handleLinkClick} className="hover:text-brand-teal transition-colors">Oficinas Parceiras</a></li>
                <li><a href="#" onClick={handleLinkClick} className="hover:text-brand-teal transition-colors">Para Mecânicos</a></li>
                <li><a href="#" onClick={handleLinkClick} className="hover:text-brand-teal transition-colors">Sobre Nós</a></li>
              </ul>
            </div>

            {/* Contato */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-lg font-bold mb-4 text-gray-200">Contato</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2 justify-center md:justify-start">
                  <Mail className="w-4 h-4" />
                  contato@autosimples.com.br
                </li>
                <li className="flex gap-4 mt-4 justify-center md:justify-start">
                  <a href="#" onClick={handleLinkClick} className="hover:text-brand-teal transition-colors"><Instagram className="w-6 h-6" /></a>
                  <a href="#" onClick={handleLinkClick} className="hover:text-brand-teal transition-colors"><Facebook className="w-6 h-6" /></a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
            <p>&copy; 2023 AutoSimples Tecnologia. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <a href="#" onClick={handleLinkClick} className="hover:text-gray-300">Termos de Uso</a>
              <a href="#" onClick={handleLinkClick} className="hover:text-gray-300">Privacidade</a>
            </div>
          </div>
        </div>
      </footer>

      <Toast 
        message="Funcionalidade disponível em breve!" 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </>
  );
}