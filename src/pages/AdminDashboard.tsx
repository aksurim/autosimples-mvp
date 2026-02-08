import React, { useEffect, useState } from 'react';
import { BarChart3, Users, MousePointer, CheckCircle, TrendingUp, Lock, Download } from 'lucide-react';

export function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const fetchMetrics = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/metrics/report');
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
      const interval = setInterval(fetchMetrics, 5000); // Atualiza a cada 5s
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '231010') { // Senha do MVP
      setIsAuthenticated(true);
    } else {
      alert('Senha incorreta');
    }
  };

  const downloadCSV = () => {
    if (!data) return;
    
    // Dados Calculados para o Relatório
    const totalVisits = data.raw_data.total_visits || 1;
    const plateClicks = data.raw_data.plate_input_clicks || 0;
    const leads = data.raw_data.leads_captured || 0;
    
    const interesseRate = ((plateClicks / totalVisits) * 100).toFixed(1);
    const conversaoRate = data.analysis.conversion_rate;

    // Cria o conteúdo do CSV Otimizado para o Entregável
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
      ["--- 2. RESPOSTAS PARA O ENTREGÁVEL ---"],
      ["Campo da Planilha", "Dado/Texto Sugerido"],
      ["Hipótese da Solução", `Validada. ${interesseRate}% dos visitantes interagiram com o input de placa.`],
      ["Evidência Quantitativa", `Taxa de Conversão de ${conversaoRate}% com ${leads} leads qualificados.`],
      ["Resultado Esperado", `Validação de interesse transacional com base de ${leads} usuários.`],
      ["Métricas de Validação", "Leads capturados, Taxa de cliques na placa e Conversão do funil."]
    ];

    // Adiciona o BOM (\uFEFF) para forçar o Excel a reconhecer UTF-8 (Acentos)
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
      + csvRows.map(e => e.join(";")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "autosimples_relatorio_santander.csv");
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
    <div className="min-h-screen bg-gray-50 p-8">
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
              <Download className="w-4 h-4" /> Baixar Relatório Santander
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
            title="Simulações Feitas" 
            value={data.raw_data.simulation_success} 
            icon={<CheckCircle className="text-green-600" />} 
          />
          <MetricCard 
            title="Leads Capturados" 
            value={data.raw_data.leads_captured} 
            icon={<TrendingUp className="text-orange-600" />} 
            highlight
          />
        </div>

        {/* JSON Raw Data para Print */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Log de Eventos (JSON)
          </h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            {JSON.stringify(data, null, 2)}
          </pre>
          <p className="text-xs text-gray-500 mt-2">
            *Use este JSON como evidência no seu relatório do Santander Explorer.
          </p>
        </div>
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