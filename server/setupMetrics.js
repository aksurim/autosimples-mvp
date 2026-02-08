import pool from './db.js';

const setupMetrics = async () => {
  try {
    console.log('Configurando Tabela de Métricas...');

    // Tabela de Métricas (Contadores Simples)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS metrics (
        id INT AUTO_INCREMENT PRIMARY KEY,
        metric_name VARCHAR(50) UNIQUE NOT NULL,
        count INT DEFAULT 0,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Inicializa contadores se não existirem
    const metrics = ['total_visits', 'plate_input_clicks', 'simulation_success', 'schedule_button_clicks'];
    
    for (const metric of metrics) {
      await pool.query(`
        INSERT IGNORE INTO metrics (metric_name, count) VALUES (?, 0)
      `, [metric]);
    }

    console.log('✅ Tabela de métricas configurada.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao configurar métricas:', error);
    process.exit(1);
  }
};

setupMetrics();