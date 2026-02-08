import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { LoginModal } from './LoginModal';
import { Logo } from './Logo';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <header className="bg-white/95 backdrop-blur-sm shadow-sm fixed w-full top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Logo />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              <button onClick={() => scrollToSection('como-funciona')} className="text-brand-dark hover:text-brand-teal transition-colors font-semibold text-sm uppercase tracking-wide">Como Funciona</button>
              <button onClick={() => scrollToSection('servicos')} className="text-brand-dark hover:text-brand-teal transition-colors font-semibold text-sm uppercase tracking-wide">Serviços</button>
              <button onClick={() => scrollToSection('garantia')} className="text-brand-dark hover:text-brand-teal transition-colors font-semibold text-sm uppercase tracking-wide">Garantia</button>
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="bg-brand-orange text-white px-6 py-2.5 rounded-full hover:bg-orange-600 transition-all font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Acesso Oficina
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-brand-dark hover:text-brand-teal focus:outline-none"
              >
                {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl animate-fade-in">
            <div className="px-4 pt-4 pb-6 space-y-2">
              <button onClick={() => scrollToSection('como-funciona')} className="block w-full text-left px-4 py-3 rounded-lg text-base font-semibold text-brand-dark hover:bg-brand-light hover:text-brand-teal">Como Funciona</button>
              <button onClick={() => scrollToSection('servicos')} className="block w-full text-left px-4 py-3 rounded-lg text-base font-semibold text-brand-dark hover:bg-brand-light hover:text-brand-teal">Serviços</button>
              <button onClick={() => scrollToSection('garantia')} className="block w-full text-left px-4 py-3 rounded-lg text-base font-semibold text-brand-dark hover:bg-brand-light hover:text-brand-teal">Garantia</button>
              <div className="pt-4">
                <button 
                  onClick={() => { setIsLoginOpen(true); setIsMenuOpen(false); }}
                  className="w-full text-center block px-4 py-3 rounded-full text-base font-bold bg-brand-orange text-white shadow-md"
                >
                  Acesso Oficina
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}