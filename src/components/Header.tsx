import React, { useState, useEffect } from 'react';
import { Home, Wrench, ShieldCheck, Lock } from 'lucide-react';
import { LoginModal } from './LoginModal';
import { Logo } from './Logo';

export function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    } else if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
    }
  };

  // Detecta scroll para atualizar ícone ativo
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['servicos', 'garantia'];
      let current = 'home';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= (element.offsetTop - 200)) {
          current = section;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm fixed w-full top-0 z-50 border-b border-gray-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div onClick={() => scrollToSection('home')}>
              <Logo />
            </div>

            <nav className="flex space-x-8 items-center">
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
          </div>
        </div>
      </header>

      {/* Mobile Header (Apenas Logo) */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm fixed w-full top-0 z-50 border-b border-gray-100 md:hidden flex justify-center items-center h-16">
        <div onClick={() => scrollToSection('home')}>
          <Logo className="h-6 w-6" textClassName="text-lg" />
        </div>
      </header>

      {/* Mobile Bottom Navigation (App Style) */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 md:hidden pb-safe">
        <div className="flex justify-around items-center h-16 px-2">
          <NavButton 
            icon={<Home className="w-6 h-6" />} 
            label="Início" 
            isActive={activeSection === 'home'} 
            onClick={() => scrollToSection('home')} 
          />
          <NavButton 
            icon={<Wrench className="w-6 h-6" />} 
            label="Serviços" 
            isActive={activeSection === 'servicos'} 
            onClick={() => scrollToSection('servicos')} 
          />
          <NavButton 
            icon={<ShieldCheck className="w-6 h-6" />} 
            label="Garantia" 
            isActive={activeSection === 'garantia'} 
            onClick={() => scrollToSection('garantia')} 
          />
          <NavButton 
            icon={<Lock className="w-6 h-6" />} 
            label="Oficina" 
            isActive={isLoginOpen} 
            onClick={() => setIsLoginOpen(true)} 
          />
        </div>
      </nav>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}

function NavButton({ icon, label, isActive, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${isActive ? 'text-brand-teal' : 'text-gray-400 hover:text-gray-600'}`}
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}