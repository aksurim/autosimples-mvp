import pool from './db.js';

const createTables = async () => {
  try {
    console.log('Iniciando configuração do Banco de Dados...');

    // Tabela de Leads (Interessados)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        placa VARCHAR(10),
        interesse_nivel INT COMMENT '0-10 nota de confiança',
        medo_principal TEXT,
        quer_ser_beta BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabela "leads" verificada/criada.');

    // Tabela de Serviços (Catálogo Mockado)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS servicos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        descricao VARCHAR(255),
        preco_medio DECIMAL(10, 2),
        tempo_estimado_min INT,
        categoria VARCHAR(50)
      )
    `);
    console.log('✅ Tabela "servicos" verificada/criada.');

    // Inserir dados iniciais (Seed) se a tabela estiver vazia
    const [rows] = await pool.query('SELECT COUNT(*) as count FROM servicos');
    if (rows[0].count === 0) {
      await pool.query(`
        INSERT INTO servicos (nome, descricao, preco_medio, tempo_estimado_min, categoria) VALUES
        ('Troca de Óleo Completa', 'Óleo sintético + Filtro de óleo', 250.00, 45, 'Manutencao'),
        ('Kit Pastilhas de Freio', 'Jogo dianteiro + Instalação', 320.00, 60, 'Seguranca'),
        ('Filtros de Ar e Cabine', 'Troca do par de filtros', 110.00, 30, 'Conforto')
      `);
      console.log('✅ Dados iniciais inseridos em "servicos".');
    }

    console.log('🚀 Banco de dados configurado com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao configurar banco:', error);
    process.exit(1);
  }
};

createTables();