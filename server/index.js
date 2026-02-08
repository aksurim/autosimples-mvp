import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// --- ROTAS DE MÉTRICAS ---

// Incrementar métrica
app.post('/api/metrics/increment', async (req, res) => {
  const { metric } = req.body;
  try {
    await pool.query('UPDATE metrics SET count = count + 1 WHERE metric_name = ?', [metric]);
    res.json({ status: 'ok' });
  } catch (error) {
    console.error('Erro ao incrementar métrica:', error);
    res.status(500).json({ error: 'Erro interno' });
  }
});

// Obter relatório completo
app.get('/api/metrics/report', async (req, res) => {
  try {
    // Busca contadores
    const [rows] = await pool.query('SELECT metric_name, count FROM metrics');
    const metrics = rows.reduce((acc, row) => {
      acc[row.metric_name] = row.count;
      return acc;
    }, {});

    // Busca total de leads reais
    const [leadRows] = await pool.query('SELECT COUNT(*) as total FROM leads');
    const leadsCaptured = leadRows[0].total;

    // Calcula Taxa de Conversão
    const totalVisits = metrics.total_visits || 1; // Evita divisão por zero
    const conversionRate = ((leadsCaptured / totalVisits) * 100).toFixed(2);
    const successCriteria = 15.0;
    const isSuccess = parseFloat(conversionRate) >= successCriteria;

    res.json({
      raw_data: {
        ...metrics,
        leads_captured: leadsCaptured
      },
      analysis: {
        conversion_rate: `${conversionRate}%`,
        success_criteria_met: isSuccess,
        message: isSuccess 
          ? "PARABÉNS! Você superou a meta de 15% de conversão." 
          : "Ainda não atingiu a meta de 15%. Continue otimizando."
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Erro ao gerar relatório:', error);
    res.status(500).json({ error: 'Erro ao gerar relatório' });
  }
});

// --- ROTAS DA APLICAÇÃO ---

app.get('/api/health', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1');
    res.json({ status: 'ok', db: 'connected' });
  } catch (error) {
    console.error('Erro ao conectar no banco:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.post('/api/simular', async (req, res) => {
  const { placa } = req.body;

  if (!placa || placa.length < 7) {
    return res.status(400).json({ error: 'Placa inválida' });
  }

  try {
    // Incrementa métrica de simulação
    await pool.query('UPDATE metrics SET count = count + 1 WHERE metric_name = ?', ['simulation_success']);

    const [servicos] = await pool.query('SELECT * FROM servicos');

    setTimeout(() => {
      res.json({
        placa: placa.toUpperCase(),
        mensagem: "Veículo validado em nossa base.",
        servicos: servicos
      });
    }, 1500);

  } catch (error) {
    console.error('Erro na simulação:', error);
    res.status(500).json({ error: 'Erro ao processar simulação' });
  }
});

app.post('/api/agendar', async (req, res) => {
  const { placa, servico_id, oficina, data_hora, contato } = req.body;

  try {
    // Incrementa métrica de clique no botão agendar (intenção)
    await pool.query('UPDATE metrics SET count = count + 1 WHERE metric_name = ?', ['schedule_button_clicks']);

    const [result] = await pool.query(
      'INSERT INTO leads (placa, email, quer_ser_beta, interesse_nivel, medo_principal) VALUES (?, ?, ?, ?, ?)',
      [placa, contato, true, null, `Agendamento: ${oficina} - ${data_hora}`]
    );

    res.json({ 
      status: 'success', 
      message: 'Pré-agendamento realizado!',
      leadId: result.insertId 
    });
  } catch (error) {
    console.error('Erro ao salvar lead:', error);
    res.status(500).json({ error: 'Erro ao salvar agendamento' });
  }
});

app.post('/api/feedback', async (req, res) => {
  const { leadId, confianca, medo } = req.body;

  try {
    await pool.query(
      'UPDATE leads SET interesse_nivel = ?, medo_principal = CONCAT(medo_principal, " | Medo: ", ?) WHERE id = ?',
      [confianca, medo, leadId]
    );

    res.json({ status: 'success', message: 'Feedback salvo!' });
  } catch (error) {
    console.error('Erro ao salvar feedback:', error);
    res.status(500).json({ error: 'Erro ao salvar feedback' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});