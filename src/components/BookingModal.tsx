import React, { useState } from 'react';
import { MapPin, Calendar, Clock, X, CheckCircle, ShieldCheck, MessageSquare } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  servico: any;
  oficina: any;
  placa: string;
}

export function BookingModal({ isOpen, onClose, servico, oficina, placa }: BookingModalProps) {
  const [step, setStep] = useState(1); // 1: Data/Hora, 2: Contato, 3: Quiz, 4: Sucesso
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [contato, setContato] = useState('');
  const [loading, setLoading] = useState(false);
  const [leadId, setLeadId] = useState<number | null>(null);
  
  // Estados do Quiz
  const [quizConfianca, setQuizConfianca] = useState<number>(5);
  const [quizMedo, setQuizMedo] = useState('');

  if (!isOpen || !servico || !oficina) return null;

  const precoFinal = Number(servico.preco_medio) + oficina.preco_extra;

  const getFutureDate = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/agendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          placa,
          servico_id: servico.id,
          oficina: oficina.nome,
          data_hora: `${selectedDate} ${selectedTime}`,
          contato
        })
      });

      const data = await response.json();

      if (response.ok) {
        setLeadId(data.leadId);
        setStep(3); // Vai para o Quiz
      } else {
        alert('Erro ao agendar. Tente novamente.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitQuiz = async () => {
    setLoading(true);
    try {
      await fetch('http://localhost:3001/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId,
          confianca: quizConfianca,
          medo: quizMedo || 'Não informou'
        })
      });
      setStep(4); // Vai para Sucesso
    } catch (error) {
      console.error(error);
      setStep(4); // Mesmo com erro no quiz, mostra sucesso do agendamento
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Modal */}
        <div className="bg-blue-600 p-4 flex justify-between items-center text-white shrink-0">
          <h3 className="font-bold text-lg">
            {step === 3 ? 'Pesquisa Rápida' : 'Finalizar Agendamento'}
          </h3>
          {step !== 3 && (
            <button onClick={onClose} className="hover:bg-blue-700 p-1 rounded transition-colors"><X className="w-5 h-5" /></button>
          )}
        </div>

        {/* Resumo do Pedido (Visível apenas nos passos 1 e 2) */}
        {step < 3 && (
          <div className="bg-blue-50 p-4 border-b border-blue-100 shrink-0">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-bold text-gray-900">{servico.nome}</p>
                <p className="text-sm text-gray-600">{oficina.nome}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-blue-700">R$ {precoFinal.toFixed(2).replace('.', ',')}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-green-700 font-medium">
              <ShieldCheck className="w-3 h-3" /> Peça Compatível Garantida
            </div>
          </div>
        )}

        <div className="p-6 overflow-y-auto">
          
          {/* Passo 1: Data e Hora */}
          {step === 1 && (
            <>
              <h4 className="text-gray-800 font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Quando você pode levar o carro?
              </h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data Preferencial</label>
                  <input 
                    type="date" 
                    min={getFutureDate(1)}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Horário de Entrada</label>
                  <select 
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                  >
                    <option value="">Selecione...</option>
                    <option value="08:00">08:00 - Manhã</option>
                    <option value="09:00">09:00 - Manhã</option>
                    <option value="10:00">10:00 - Manhã</option>
                    <option value="14:00">14:00 - Tarde</option>
                    <option value="15:00">15:00 - Tarde</option>
                    <option value="16:00">16:00 - Tarde</option>
                  </select>
                </div>
              </div>

              <button 
                disabled={!selectedDate || !selectedTime}
                onClick={() => setStep(2)}
                className="w-full mt-8 bg-blue-600 text-white py-4 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
              >
                Continuar
              </button>
            </>
          )}

          {/* Passo 2: Contato Final */}
          {step === 2 && (
            <>
              <h4 className="text-gray-800 font-bold mb-2">Onde enviamos a confirmação?</h4>
              <p className="text-sm text-gray-500 mb-6">Você receberá o voucher da peça e o endereço exato da oficina.</p>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Seu melhor e-mail</label>
                <input 
                  type="email" 
                  placeholder="exemplo@email.com"
                  value={contato}
                  onChange={(e) => setContato(e.target.value)}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                  autoFocus
                />
              </div>

              <button 
                disabled={!contato || loading}
                onClick={handleConfirm}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-colors flex justify-center items-center gap-2 shadow-lg shadow-green-200"
              >
                {loading ? 'Processando...' : 'CONFIRMAR AGENDAMENTO'}
              </button>
              <button onClick={() => setStep(1)} className="w-full mt-3 text-gray-500 text-sm hover:text-gray-700 py-2">
                Voltar
              </button>
            </>
          )}

          {/* Passo 3: Quiz (Coleta de Dados Santander) */}
          {step === 3 && (
            <div className="animate-fade-in">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-gray-800 font-bold text-lg">Agendamento Recebido!</h4>
                <p className="text-sm text-gray-600">Ajude-nos a melhorar com 2 perguntas rápidas enquanto processamos seu pedido.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    De 0 a 10, quanto você confia em comprar peças online sabendo que o app garante a compatibilidade?
                  </label>
                  <div className="flex justify-between gap-1">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <button
                        key={num}
                        onClick={() => setQuizConfianca(num)}
                        className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                          quizConfianca === num 
                            ? 'bg-blue-600 text-white scale-110 shadow-md' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1 px-1">
                    <span>Não confio</span>
                    <span>Confio Totalmente</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Qual seu maior medo ao deixar o carro na oficina hoje?
                  </label>
                  <textarea
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 text-sm"
                    rows={3}
                    placeholder="Ex: Peças falsas, preço mudar na hora, demora..."
                    value={quizMedo}
                    onChange={(e) => setQuizMedo(e.target.value)}
                  />
                </div>

                <button 
                  onClick={handleSubmitQuiz}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
                >
                  Enviar e Finalizar
                </button>
              </div>
            </div>
          )}

          {/* Passo 4: Sucesso Final */}
          {step === 4 && (
            <div className="text-center py-4 animate-fade-in">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Obrigado!</h3>
              <p className="text-gray-600 mb-6">
                Você é um dos nossos <strong>Beta Testers</strong> exclusivos!
                <br/><br/>
                Sua pré-reserva foi registrada. Nossa equipe entrará em contato em breve pelo e-mail <strong>{contato}</strong> para confirmar a disponibilidade da peça.
              </p>
              <button onClick={onClose} className="w-full bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors">
                Voltar ao Início
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}