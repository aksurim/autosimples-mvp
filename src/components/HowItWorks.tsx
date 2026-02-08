import React from 'react';
import { Search, MapPin, CalendarCheck } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: <Search className="w-8 h-8 text-blue-600" />,
      title: "1. Identifique seu Carro",
      description: "Digite a placa do veículo. Nossa tecnologia valida o modelo e encontra as peças exatas compatíveis."
    },
    {
      icon: <MapPin className="w-8 h-8 text-blue-600" />,
      title: "2. Escolha a Oficina",
      description: "Compare preços e distâncias de oficinas parceiras avaliadas. Sem surpresas no valor final."
    },
    {
      icon: <CalendarCheck className="w-8 h-8 text-blue-600" />,
      title: "3. Agende e Relaxe",
      description: "Reserve o horário de entrada. A peça estará lá esperando por você. Garantia total de execução."
    }
  ];

  return (
    <section id="como-funciona" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Como funciona o AutoSimples
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Resolva o problema do seu carro em 3 passos simples.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
              
              {/* Conector visual (seta) apenas para desktop e não no último item */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 -right-6 w-12 h-0.5 bg-gray-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}