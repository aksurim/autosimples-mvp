import React from 'react';
import { CheckCircle2, MapPin, Star, ArrowRight, ShieldCheck } from 'lucide-react';
import { OFICINAS_MOCK } from '../data/mockData';

interface SimulationResultsProps {
  placa: string;
  servico: any;
  onAgendar: (oficina: any) => void;
  onVoltar: () => void;
}

export function SimulationResults({ placa, servico, onAgendar, onVoltar }: SimulationResultsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden animate-fade-in">
      {/* Header do Resultado */}
      <div className="bg-green-50 p-6 border-b border-green-100">
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle2 className="text-green-600 w-8 h-8" />
          <div>
            <h2 className="text-xl font-bold text-gray-800">Peça Compatível Encontrada!</h2>
            <p className="text-sm text-green-700">Validamos a compatibilidade para a placa <strong>{placa}</strong></p>
          </div>
        </div>
      </div>

      {/* Serviço Selecionado */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500 uppercase font-bold">Serviço Solicitado</p>
          <p className="font-bold text-gray-900">{servico.nome}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 uppercase font-bold">Tempo Estimado</p>
          <p className="font-bold text-gray-900">~{servico.tempo_estimado_min} min</p>
        </div>
      </div>

      {/* Lista de Oficinas */}
      <div className="p-6">
        <h3 className="text-sm font-bold text-gray-500 uppercase mb-4">Oficinas Parceiras Próximas</h3>
        
        <div className="space-y-3">
          {OFICINAS_MOCK.map((oficina) => {
            const precoFinal = Number(servico.preco_medio) + oficina.preco_extra;
            
            return (
              <div 
                key={oficina.id} 
                className="border border-gray-200 rounded-xl p-4 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group bg-white"
                onClick={() => onAgendar(oficina)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{oficina.nome}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {oficina.distancia}</span>
                      <span className="flex items-center gap-1 text-yellow-600"><Star className="w-3 h-3 fill-current" /> {oficina.nota}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-lg font-bold text-blue-700">
                      R$ {precoFinal.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-[10px] text-gray-400">Peça + Mão de Obra</span>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                  <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                    <ShieldCheck className="w-3 h-3" /> Garantia AutoSimples
                  </div>
                  <button className="text-sm font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Agendar <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-center">
          <button 
            onClick={onVoltar}
            className="text-sm text-gray-400 hover:text-gray-600 underline"
          >
            Começar de novo
          </button>
        </div>
      </div>
    </div>
  );
}