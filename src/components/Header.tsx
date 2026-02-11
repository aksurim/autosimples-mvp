import React, { useState, useEffect } from 'react';
import { Home, Wrench, PlayCircle, Lock } from 'lucide-react';
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

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['servicos', 'video', 'como-funciona'];
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
        <div className="w-full max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8"> {/* Aumentei a largura para 95% */}
          <div className="flex justify-between items-center h-28">
            <div onClick={() => scrollToSection('home')} className="cursor-pointer hover:opacity-90 transition-opacity">
              {/* Logo Forçada para 300px (Desktop) */}
              <img 
                src="/logo_autosimples.png" 
                alt="AutoSimples" 
                style={{ height: '300px', width: 'auto' }} 
                className="object-contain"
              />
            </div>

            <nav className="flex space-x-8 items-center">
              <button onClick={() => scrollToSection('como-funciona')} className="text-brand-dark hover:text-brand-teal transition-colors font-semibold text-sm uppercase tracking-wide">Como Funciona</button>
              <button onClick={() => scrollToSection('servicos')} className="text-brand-dark hover:text-brand-teal transition-colors font-semibold text-sm uppercase tracking-wide">Serviços</button>
              <button onClick={() => scrollToSection('video')} className="text-brand-dark hover:text-brand-teal transition-colors font-semibold text-sm uppercase tracking-wide flex items-center gap-1">
                <PlayCircle className="w-4 h-4" /> Na Prática
              </button>
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

      {/* Mobile Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm fixed w-full top-0 z-50 border-b border-gray-100 md:hidden flex justify-center items-center h-20">
        <div onClick={() => scrollToSection('home')}>
          {/* Logo Forçada para 300px (Mobile - Conforme validado pelo usuário) */}
          <img 
            src="/logo_autosimples.png" 
            alt="AutoSimples" 
            style={{ height: '300px', width: 'auto', maxHeight: '300px' }} 
            className="object-contain"
          />
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
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
            icon={<PlayCircle className="w-6 h-6" />} 
            label="Na Prática" 
            isActive={activeSection === 'video'} 
            onClick={() => scrollToSection('video')}
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