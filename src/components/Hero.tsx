import React, { useState } from 'react';
import { Search, ShieldCheck, Clock, Loader2, Camera, Droplets, Disc, Wind, Battery } from 'lucide-react';
import { SimulationResults } from './SimulationResults';
import { BookingModal } from './BookingModal';
import { SERVICOS_INICIAIS } from '../data/mockData';

export function Hero() {
  const [step, setStep] = useState(1); // 1: Escolha Serviço, 2: Digita Placa, 3: Resultados
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  const [placa, setPlaca] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOficina, setSelectedOficina] = useState<any>(null);

  // Mapeamento de ícones
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'droplet': return <Droplets className="w-10 h-10 mb-3 text-brand-teal" />;
      case 'disc': return <Disc className="w-10 h-10 mb-3 text-brand-orange" />;
      case 'wind': return <Wind className="w-10 h-10 mb-3 text-gray-400" />;
      case 'battery': return <Battery className="w-10 h-10 mb-3 text-yellow-500" />;
      default: return <Search className="w-10 h-10 mb-3" />;
    }
  };

  const handleServiceSelect = (id: number) => {
    setSelectedServiceId(id);
    setStep(2);
  };

  const handlePlacaFocus = () => {
    fetch('http://localhost:3001/api/metrics/increment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ metric: 'plate_input_clicks' })
    }).catch(console.error);
  };

  const handleSimulacao = async (e: React.FormEvent) => {
    e.preventDefault();
    if (placa.length < 7) return;

    setLoading(true);
    setResultado(null);

    try {
      const response = await fetch('http://localhost:3001/api/simular', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ placa })
      });
      
      const data = await response.json();
      if (response.ok) {
        const servicoEscolhido = data.servicos.find((s: any) => s.id === selectedServiceId) || data.servicos[0];
        setResultado({ ...data, servicoFocado: servicoEscolhido });
        setStep(3);
      } else {
        alert('Erro ao simular: ' + data.error);
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  const handleAgendar = (oficina: any) => {
    setSelectedOficina(oficina);
    setIsModalOpen(true);
  };

  return (
    <section id="servicos" className="pt-32 pb-20 bg-gradient-to-br from-brand-light to-white min-h-[90vh] relative overflow-hidden">
      
      {/* Elemento Decorativo de Fundo (Círculo) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-teal/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Coluna da Esquerda: Copy */}
          <div className="text-left animate-fade-in-up">
            <div className="inline-block px-4 py-1 bg-brand-lime/20 text-brand-dark text-xs font-bold rounded-full mb-6 border border-brand-lime/50">
              ⚡ TUDO EM 3 CLICKS
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold text-brand-dark tracking-tight mb-6 leading-[1.3]">
              A <span className="text-brand-teal">peça</span> certa.<br/>
              <span className="text-brand-teal">Agendamento</span> garantido.
            </h1>
            
            <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-lg">
              Com a tecnologia <span className="font-bold text-brand-dark">plate-to-part</span>, elimine orçamentos confusos. Escolha o serviço, digite sua placa e garanta peças compatíveis com instalação agendada.
            </p>

            <div id="garantia" className="flex flex-col sm:flex-row gap-4 text-sm font-semibold text-gray-600">
              <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-sm border border-gray-100 hover:border-brand-teal/30 transition-colors">
                <ShieldCheck className="w-6 h-6 text-brand-teal" />
                <span>Garantia Unificada</span>
              </div>
              <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-sm border border-gray-100 hover:border-brand-teal/30 transition-colors">
                <Clock className="w-6 h-6 text-brand-orange" />
                <span>Pontualidade Real</span>
              </div>
            </div>
          </div>

          {/* Coluna da Direita: Fluxo Interativo */}
          <div className="relative">
            
            {/* Passo 1: Escolha do Serviço */}
            {step === 1 && (
              <div className="bg-white p-8 rounded-3xl shadow-2xl shadow-brand-teal/10 border border-gray-100 animate-fade-in relative">
                
                {/* Seta Indicativa (SVG) */}
                <div className="absolute -top-12 -left-12 hidden md:block transform rotate-12">
                  <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 10 C 40 10, 60 40, 80 80" stroke="#DAF043" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 10"/>
                    <path d="M80 80 L 60 75 M 80 80 L 75 60" stroke="#DAF043" strokeWidth="4" strokeLinecap="round"/>
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-brand-dark mb-2 text-center">O que seu carro precisa hoje?</h3>
                <p className="text-center text-gray-500 mb-8 text-sm">Selecione o serviço desejado abaixo 👇</p>

                <div className="grid grid-cols-2 gap-4">
                  {SERVICOS_INICIAIS.map((servico) => (
                    <button
                      key={servico.id}
                      onClick={() => handleServiceSelect(servico.id)}
                      className="flex flex-col items-center justify-center p-6 border-2 border-gray-50 rounded-2xl hover:border-brand-teal hover:bg-brand-teal/5 transition-all group bg-gray-50/50"
                    >
                      <div className="transform group-hover:scale-110 transition-transform duration-300">
                        {getIcon(servico.icon)}
                      </div>
                      <span className="font-bold text-gray-700 group-hover:text-brand-teal">{servico.nome}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Passo 2: Input de Placa */}
            {step === 2 && (
              <div className="bg-white p-8 rounded-3xl shadow-2xl shadow-brand-teal/10 border border-gray-100 animate-fade-in">
                <button onClick={() => setStep(1)} className="text-sm font-semibold text-gray-400 hover:text-brand-teal mb-6 flex items-center gap-1 transition-colors">
                  ← Voltar para serviços
                </button>
                <h3 className="text-2xl font-bold text-brand-dark mb-2">Qual a placa do veículo?</h3>
                <p className="text-gray-500 mb-8">Para identificarmos a peça exata compatível.</p>
                
                <form onSubmit={handleSimulacao} className="space-y-6">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <div className="bg-[#003399] text-white text-xs font-bold px-1.5 py-0.5 rounded flex flex-col items-center leading-none border border-white/20">
                        <span className="text-[8px]">BRASIL</span>
                        <span className="text-[10px]">BR</span>
                      </div>
                    </div>
                    <input
                      type="text"
                      value={placa}
                      onChange={(e) => setPlaca(e.target.value.toUpperCase())}
                      onFocus={handlePlacaFocus}
                      placeholder="ABC1D23"
                      className="block w-full pl-16 pr-14 py-5 text-3xl font-mono font-bold border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-brand-teal/20 focus:border-brand-teal uppercase tracking-widest bg-gray-50 transition-all text-brand-dark placeholder-gray-300"
                      maxLength={7}
                      required
                      autoFocus
                    />
                    {/* Ícone de Câmera (Mock) */}
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-help">
                      <Camera className="w-7 h-7 text-gray-300 group-hover:text-brand-teal transition-colors" />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 bg-brand-orange text-white text-lg font-bold rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-brand-orange/30 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-1"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Analisando...
                      </>
                    ) : (
                      <>
                        <Search className="w-6 h-6" />
                        BUSCAR OFICINAS
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* Passo 3: Resultados (Oficinas) */}
            {step === 3 && resultado && (
              <SimulationResults 
                placa={resultado.placa}
                servico={resultado.servicoFocado}
                onAgendar={handleAgendar}
                onVoltar={() => setStep(1)}
              />
            )}

          </div>
        </div>
      </div>

      {/* Modal de Agendamento */}
      <BookingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        servico={resultado?.servicoFocado}
        oficina={selectedOficina}
        placa={placa}
      />
    </section>
  );
}