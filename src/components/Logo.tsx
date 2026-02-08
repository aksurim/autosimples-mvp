import React from 'react';
import { Car, Wrench } from 'lucide-react';

export function Logo({ className = "h-8 w-8", textClassName = "text-xl" }: { className?: string, textClassName?: string }) {
  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      <div className="relative flex items-center justify-center bg-brand-teal/10 p-2 rounded-lg border border-brand-teal/20">
        {/* Carro */}
        <Car className={`${className} text-brand-teal stroke-[2px]`} />
        
        {/* Chave Inglesa (Sem fundo, apenas sobreposta com sombra suave para contraste) */}
        <div className="absolute -bottom-1 -right-2 drop-shadow-md">
          <Wrench className="w-5 h-5 text-brand-orange stroke-[2.5px] transform -rotate-12" />
        </div>
      </div>
      
      <div className={`flex flex-col leading-none ${textClassName}`}>
        <span className="font-extrabold text-brand-dark tracking-tight">
          AUTO<span className="text-brand-teal">SIMPLES</span>
        </span>
        <span className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase mt-0.5">
          Da Peça à Instalação
        </span>
      </div>
    </div>
  );
}