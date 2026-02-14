import pool from './db.js';

const updateTables = async () => {
  try {
    console.log('Iniciando atualização do Banco de Dados (Fase 5)...');

    // Adicionar coluna telefone na tabela leads se não existir
    // Como não posso verificar facilmente se a coluna existe com IF NOT EXISTS em ALTER TABLE no MySQL padrão de forma simples em uma linha sem procedure,
    // vou tentar adicionar e capturar erro se já existir, ou consultar schema.
    // Mas uma abordagem segura é tentar adicionar.
    
    try {
      await pool.query(`
        ALTER TABLE leads
        ADD COLUMN telefone VARCHAR(20) AFTER email;
      `);
      console.log('✅ Coluna "telefone" adicionada na tabela "leads".');
    } catch (error) {
      if (error.code === 'ER_DUP_FIELDNAME') {
        console.log('ℹ️ Coluna "telefone" já existe.');
      } else {
        throw error;
      }
    }

    // Tornar email nullable (opcional) já que agora o foco é telefone
    await pool.query(`
      ALTER TABLE leads
      MODIFY COLUMN email VARCHAR(255) NULL;
    `);
    console.log('✅ Coluna "email" agora é opcional.');

    console.log('🚀 Banco de dados atualizado com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao atualizar banco:', error);
    process.exit(1);
  }
};

updateTables();