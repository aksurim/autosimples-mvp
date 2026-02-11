import React from 'react';

export function Logo({ className = "", textClassName = "" }: { className?: string, textClassName?: string }) {
  // Se nenhuma classe for passada, usa um padrão responsivo inteligente
  const finalClass = className || "h-10 md:h-60";
  
  return (
    <img 
      src="/logo_autosimples.png" 
      alt="AutoSimples Logo" 
      className={`${finalClass} object-contain`}
    />
  );
}