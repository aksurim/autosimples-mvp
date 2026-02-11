import pool from './db.js';

const setupFeedback = async () => {
  try {
    console.log('Configurando Tabela de Feedbacks...');

    // Cria tabela estruturada para estatísticas
    await pool.query(`
      CREATE TABLE IF NOT EXISTS feedbacks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        lead_id INT NOT NULL,
        confianca_nota INT NOT NULL,
        medo_selecionado VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE
      )
    `);

    console.log('✅ Tabela "feedbacks" criada com sucesso.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao configurar feedbacks:', error);
    process.exit(1);
  }
};

setupFeedback();