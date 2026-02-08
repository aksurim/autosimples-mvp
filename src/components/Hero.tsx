import React, { useState } from 'react';
import { Search, ShieldCheck, Clock, Loader2, Camera, Droplets, Disc, Wind, Battery, ArrowRight } from 'lucide-react';
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
      case 'droplet': return <Droplets className="w-8 h-8 mb-2 text-blue-600" />;
      case 'disc': return <Disc className="w-8 h-8 mb-2 text-red-600" />;
      case 'wind': return <Wind className="w-8 h-8 mb-2 text-gray-600" />;
      case 'battery': return <Battery className="w-8 h-8 mb-2 text-yellow-600" />;
      default: return <Search className="w-8 h-8 mb-2" />;
    }
  };

  const handleServiceSelect = (id: number) => {
    setSelectedServiceId(id);
    setStep(2);
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
        // Filtra apenas o serviço selecionado para mostrar no resultado
        const servicoEscolhido = data.servicos.find((s: any) => s.id === selectedServiceId) || data.servicos[0];
        
        setResultado({
          ...data,
          servicoFocado: servicoEscolhido
        });
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
    <section id="servicos" className="pt-24 pb-12 bg-gradient-to-b from-blue-50 to-white min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Coluna da Esquerda: Copy */}
          <div className="text-left animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
              A Peça Certa e a <br/>Oficina Pronta. <br />
              <span className="text-blue-600">Tudo pela Placa.</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Elimine orçamentos confusos. Escolha o serviço, digite sua placa e garanta peças compatíveis com instalação agendada.
            </p>

            <div id="garantia" className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                <span>Garantia Unificada</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                <Clock className="w-5 h-5 text-blue-500" />
                <span>Pontualidade Real</span>
              </div>
            </div>
          </div>

          {/* Coluna da Direita: Fluxo Interativo */}
          <div className="relative">
            
            {/* Passo 1: Escolha do Serviço */}
            {step === 1 && (
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 animate-fade-in">
                <h3 className="text-xl font-bold text-gray-800 mb-6">O que seu carro precisa hoje?</h3>
                <div className="grid grid-cols-2 gap-4">
                  {SERVICOS_INICIAIS.map((servico) => (
                    <button
                      key={servico.id}
                      onClick={() => handleServiceSelect(servico.id)}
                      className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
                    >
                      <div className="transform group-hover:scale-110 transition-transform">
                        {getIcon(servico.icon)}
                      </div>
                      <span className="font-semibold text-gray-700 group-hover:text-blue-700">{servico.nome}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Passo 2: Input de Placa */}
            {step === 2 && (
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 animate-fade-in">
                <button onClick={() => setStep(1)} className="text-sm text-gray-400 hover:text-gray-600 mb-4 flex items-center gap-1">
                  ← Voltar para serviços
                </button>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Qual a placa do veículo?</h3>
                <p className="text-sm text-gray-500 mb-6">Para identificarmos a peça exata compatível.</p>
                
                <form onSubmit={handleSimulacao} className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <div className="bg-blue-900 text-white text-xs font-bold px-1 rounded">BR</div>
                    </div>
                    <input
                      type="text"
                      value={placa}
                      onChange={(e) => setPlaca(e.target.value.toUpperCase())}
                      placeholder="ABC1D23"
                      className="block w-full pl-12 pr-12 py-4 text-2xl font-mono border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 uppercase tracking-widest bg-gray-50"
                      maxLength={7}
                      required
                      autoFocus
                    />
                    {/* Ícone de Câmera (Mock) */}
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center group cursor-help">
                      <Camera className="w-6 h-6 text-gray-400 group-hover:text-blue-500" />
                      <span className="absolute bottom-full right-0 mb-2 w-48 bg-gray-800 text-white text-xs rounded py-1 px-2 hidden group-hover:block text-center">
                        Escaneamento via câmera em breve!
                      </span>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Analisando Compatibilidade...
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5" />
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