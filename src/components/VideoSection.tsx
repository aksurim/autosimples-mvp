import React from 'react';
import { Play } from 'lucide-react';

export function VideoSection() {
  return (
    <section id="video" className="py-20 bg-brand-dark relative overflow-hidden">
      {/* Elementos Decorativos de Fundo */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-dark via-transparent to-brand-dark"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="text-brand-teal font-bold tracking-widest uppercase text-sm">Tecnologia em Ação</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">
            Veja como é simples <span className="text-brand-orange">na prática</span>.
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Sem burocracia, sem termos técnicos. Apenas a solução que você precisa, validada em segundos.
          </p>
        </div>

        {/* Container do Vídeo */}
        <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-brand-teal/20 border border-gray-800 group bg-black">
          <div className="aspect-video w-full relative"> {/* Força proporção 16:9 */}
            <video 
              className="absolute top-0 left-0 w-full h-full object-cover"
              controls
              poster="/video_cover.png" // Nome sugerido para a nova capa
            >
              <source src="/AutoSimples.mp4" type="video/mp4" />
              Seu navegador não suporta o elemento de vídeo.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}