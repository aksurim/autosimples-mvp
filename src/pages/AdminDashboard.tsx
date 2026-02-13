import React, { useEffect, useState } from 'react';
import { BarChart3, Users, MousePointer, CheckCircle, TrendingUp, Lock, Download, PieChart, Trash2, AlertTriangle } from 'lucide-react';
import { API_URL } from '../config/api';

export function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);

  const fetchMetrics = async () => {
    try {
      const response = await fetch(`${API_URL}/metrics/report`);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchMetrics();
      const interval = setInterval(fetchMetrics, 5000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '231010') {
      setIsAuthenticated(true);
    } else {
      alert('Senha incorreta');
    }
  };

  const handleResetDatabase = async () => {
    if (confirm('ATENÇÃO: Isso apagará TODOS os dados (Leads, Métricas, Feedbacks). Tem certeza absoluta?')) {
      try {
        const response = await fetch(`${API_URL}/admin/reset`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: '231010' })
        });
        
        if (response.ok) {
          alert('Base de dados zerada com sucesso!');
          fetchMetrics();
          setShowResetModal(false);
        } else {
          alert('Erro ao resetar.');
        }
      } catch (error) {
        console.error(error);
        alert('Erro de conexão.');
      }
    }
  };

  const downloadCSV = () => {
    if (!data) return;
    
    const totalVisits = data.raw_data.total_visits || 1;
    const plateClicks = data.raw_data.plate_input_clicks || 0;
    const leads = data.raw_data.leads_captured || 0;
    const interesseRate = ((plateClicks / totalVisits) * 100).toFixed(1);
    const conversaoRate = data.analysis.conversion_rate;
    const mediaConfianca = data.feedback_analysis?.media_confianca || 'N/A';

    const medosTexto = data.feedback_analysis?.medos_distribuicao
      .map((m: any) => `${m.medo} (${m.porcentagem})`)
      .join(' | ');

    const csvRows = [
      ["RELATÓRIO DE VALIDAÇÃO - AUTOSIMPLES (MVP SANTANDER EXPLORER)"],
      ["Data de Extração", new Date().toLocaleString()],
      [],
      ["--- 1. DADOS BRUTOS (EVIDÊNCIAS) ---"],
      ["Métrica", "Valor", "Significado"],
      ["Total de Visitas", totalVisits, "Base de tráfego"],
      ["Cliques na Placa", plateClicks, `Interesse na Solução (${interesseRate}%)`],
      ["Simulações Realizadas", data.raw_data.simulation_success, "Sucesso Técnico do Mock"],
      ["Leads Capturados", leads, "Pré-reservas (Validação de Negócio)"],
      ["Taxa de Conversão", conversaoRate, leads >= (totalVisits * 0.15) ? "META BATIDA (>15%)" : "Abaixo da Meta"],
      [],
      ["--- 2. FEEDBACK QUALITATIVO (QUIZ) ---"],
      ["Média de Confiança (0-10)", mediaConfianca, "Validação da Hipótese de Solução"],
      ["Distribuição de Medos", medosTexto || "Sem dados", "Validação da Hipótese de Problema"],
      [],
      ["--- 3. RESPOSTAS PARA O ENTREGÁVEL ---"],
      ["Campo da Planilha", "Dado/Texto Sugerido"],
      ["Hipótese do Problema", `Confirmada. O maior medo relatado foi: ${data.feedback_analysis?.medos_distribuicao[0]?.medo || 'N/A'}`],
      ["Hipótese da Solução", `Validada. Confiança média de ${mediaConfianca}/10 na tecnologia.`],
      ["Evidência Quantitativa", `Taxa de Conversão de ${conversaoRate}% com ${leads} leads qualificados.`]
    ];

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
      + csvRows.map(e => e.join(";")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "autosimples_relatorio_completo.csv");
    document.body.appendChild(link);
    link.click();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Acesso Restrito</h2>
          <input
            type="password"
            placeholder="Senha de Admin"
            className="w-full border p-3 rounded-lg mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">
            Entrar
          </button>
        </form>
      </div>
    );
  }

  if (loading) return <div className="p-8 text-center">Carregando métricas...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8 pb-24">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard de Validação</h1>
            <p className="text-gray-500">Dados em tempo real do experimento AutoSimples</p>
          </div>
          <div className="flex gap-4 items-center">
            <span className={`px-4 py-2 rounded-full text-sm font-bold ${data.analysis.success_criteria_met ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              Meta: {data.analysis.conversion_rate} (Alvo: 15%)
            </span>
            <button 
              onClick={downloadCSV}
              className="bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-md"
            >
              <Download className="w-4 h-4" /> Baixar Relatório
            </button>
          </div>
        </header>

        {/* Cards de Métricas */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <MetricCard 
            title="Visitas Totais" 
            value={data.raw_data.total_visits} 
            icon={<Users className="text-blue-600" />} 
          />
          <MetricCard 
            title="Cliques na Placa" 
            value={data.raw_data.plate_input_clicks} 
            icon={<MousePointer className="text-purple-600" />} 
          />
          <MetricCard 
            title="Leads Capturados" 
            value={data.raw_data.leads_captured} 
            icon={<TrendingUp className="text-orange-600" />} 
            highlight
          />
          <MetricCard 
            title="Média Confiança" 
            value={data.feedback_analysis?.media_confianca || '-'} 
            icon={<CheckCircle className="text-green-600" />} 
          />
        </div>

        {/* Seção de Feedback Qualitativo */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5" />
            Distribuição de Medos (Hipótese do Problema)
          </h3>
          <div className="space-y-3">
            {data.feedback_analysis?.medos_distribuicao?.length > 0 ? (
              data.feedback_analysis.medos_distribuicao.map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">{item.medo}</span>
                  <span className="text-sm font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded">{item.porcentagem}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">Nenhum feedback coletado ainda.</p>
            )}
          </div>
        </div>

        {/* JSON Raw Data */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-12">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Log de Eventos (JSON)
          </h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>

        {/* Zona de Perigo (Reset) */}
        <div className="border-t border-gray-200 pt-8 mt-12">
          <div className="flex justify-between items-center bg-red-50 p-6 rounded-xl border border-red-100">
            <div>
              <h3 className="text-red-800 font-bold text-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Zona de Perigo
              </h3>
              <p className="text-red-600 text-sm mt-1">
                Ações irreversíveis para gestão do ambiente de produção.
              </p>
            </div>
            <button 
              onClick={() => setShowResetModal(true)}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center gap-2 shadow-lg shadow-red-200"
            >
              <Trash2 className="w-4 h-4" />
              ZERAR BASE DE DADOS
            </button>
          </div>
        </div>

        {/* Modal de Confirmação de Reset */}
        {showResetModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-md w-full text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Tem certeza absoluta?</h3>
              <p className="text-gray-600 mb-6">
                Isso apagará <strong>TODOS</strong> os leads, feedbacks e métricas coletadas até agora. Essa ação não pode ser desfeita.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowResetModal(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleResetDatabase}
                  className="flex-1 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700"
                >
                  SIM, APAGAR TUDO
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, highlight = false }: any) {
  return (
    <div className={`bg-white p-6 rounded-xl shadow-sm border ${highlight ? 'border-orange-200 bg-orange-50' : 'border-gray-200'}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${highlight ? 'bg-orange-100' : 'bg-gray-50'}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}