import pool from './db.js';

const updateDatabase = async () => {
  try {
    console.log('Atualizando Banco de Dados...');

    // Verifica se o serviço de Bateria já existe
    const [rows] = await pool.query('SELECT * FROM servicos WHERE nome LIKE ?', ['%Bateria%']);
    
    if (rows.length === 0) {
      console.log('Inserindo serviço de Bateria...');
      await pool.query(`
        INSERT INTO servicos (id, nome, descricao, preco_medio, tempo_estimado_min, categoria) 
        VALUES (4, 'Troca de Bateria', 'Bateria 60Ah + Instalação e Check-up', 450.00, 20, 'Eletrica')
      `);
      console.log('✅ Serviço de Bateria inserido com sucesso!');
    } else {
      console.log('ℹ️ Serviço de Bateria já existe.');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao atualizar banco:', error);
    process.exit(1);
  }
};

updateDatabase();