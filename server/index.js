import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

// --- ROTAS DE ADMINISTRAÇÃO ---

// Resetar Banco de Dados (Zerar Tudo)
app.post('/api/admin/reset', async (req, res) => {
  const { password } = req.body;

  if (password !== '231010') {
    return res.status(401).json({ error: 'Senha incorreta' });
  }

  try {
    // Desativa verificação de FK para permitir truncar em qualquer ordem
    await pool.query('SET FOREIGN_KEY_CHECKS = 0');
    
    await pool.query('TRUNCATE TABLE feedbacks');
    await pool.query('TRUNCATE TABLE leads');
    await pool.query('TRUNCATE TABLE metrics');
    
    // Reativa verificação de FK
    await pool.query('SET FOREIGN_KEY_CHECKS = 1');
    
    // Reinicializa métricas zeradas
    const metrics = ['total_visits', 'plate_input_clicks', 'simulation_success', 'schedule_button_clicks'];
    for (const metric of metrics) {
      // Usa INSERT IGNORE para evitar erro se por acaso não tiver limpado
      await pool.query('INSERT IGNORE INTO metrics (metric_name, count) VALUES (?, 0)', [metric]);
    }

    res.json({ status: 'success', message: 'Base de dados zerada com sucesso!' });
  } catch (error) {
    console.error('Erro ao resetar banco:', error);
    res.status(500).json({ error: 'Erro ao resetar banco de dados' });
  }
});

// --- ROTAS DE MÉTRICAS ---

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

app.get('/api/metrics/report', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT metric_name, count FROM metrics');
    const metrics = rows.reduce((acc, row) => {
      acc[row.metric_name] = row.count;
      return acc;
    }, {});

    const [leadRows] = await pool.query('SELECT COUNT(*) as total FROM leads');
    const leadsCaptured = leadRows[0].total;

    const [feedbackStats] = await pool.query(`
      SELECT 
        AVG(confianca_nota) as media_confianca,
        COUNT(*) as total_respostas
      FROM feedbacks
    `);

    const [medoStats] = await pool.query(`
      SELECT 
        medo_selecionado, 
        COUNT(*) as qtd 
      FROM feedbacks 
      GROUP BY medo_selecionado
    `);

    const totalFeedbacks = feedbackStats[0].total_respostas || 1;
    const medosPorcentagem = medoStats.map(row => ({
      medo: row.medo_selecionado,
      porcentagem: ((row.qtd / totalFeedbacks) * 100).toFixed(1) + '%'
    }));

    const totalVisits = metrics.total_visits || 1;
    const conversionRate = ((leadsCaptured / totalVisits) * 100).toFixed(2);
    const successCriteria = 15.0;
    const isSuccess = parseFloat(conversionRate) >= successCriteria;

    res.json({
      raw_data: { ...metrics, leads_captured: leadsCaptured },
      feedback_analysis: {
        media_confianca: Number(feedbackStats[0].media_confianca || 0).toFixed(1),
        medos_distribuicao: medosPorcentagem
      },
      analysis: {
        conversion_rate: `${conversionRate}%`,
        success_criteria_met: isSuccess,
        message: isSuccess ? "PARABÉNS! Meta batida." : "Ainda não atingiu a meta."
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
  if (!placa || placa.length < 7) return res.status(400).json({ error: 'Placa inválida' });

  try {
    await pool.query('UPDATE metrics SET count = count + 1 WHERE metric_name = ?', ['simulation_success']);
    const [servicos] = await pool.query('SELECT * FROM servicos');
    setTimeout(() => {
      res.json({
        placa: placa.toUpperCase(),
        mensagem: "Veículo validado.",
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
    await pool.query('UPDATE metrics SET count = count + 1 WHERE metric_name = ?', ['schedule_button_clicks']);
    const [result] = await pool.query(
      'INSERT INTO leads (placa, email, quer_ser_beta, interesse_nivel, medo_principal) VALUES (?, ?, ?, ?, ?)',
      [placa, contato, true, null, `Agendamento: ${oficina} - ${data_hora}`]
    );
    res.json({ status: 'success', message: 'Pré-agendamento realizado!', leadId: result.insertId });
  } catch (error) {
    console.error('Erro ao salvar lead:', error);
    res.status(500).json({ error: 'Erro ao salvar agendamento' });
  }
});

app.post('/api/feedback', async (req, res) => {
  const { leadId, confianca, medo } = req.body;
  try {
    await pool.query(
      'INSERT INTO feedbacks (lead_id, confianca_nota, medo_selecionado) VALUES (?, ?, ?)',
      [leadId, confianca, medo]
    );
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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});