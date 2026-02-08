import React, { useEffect, useState } from 'react';
import { BarChart3, Users, MousePointer, CheckCircle, TrendingUp, Lock } from 'lucide-react';

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
    if (password === 'admin123') { // Senha simples para MVP
      setIsAuthenticated(true);
    } else {
      alert('Senha incorreta');
    }
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
          <div className="text-right">
            <span className={`px-4 py-2 rounded-full text-sm font-bold ${data.analysis.success_criteria_met ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              Meta: {data.analysis.conversion_rate} (Alvo: 15%)
            </span>
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