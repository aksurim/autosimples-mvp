// Configuração centralizada da API

// Em produção (Deploy), a API estará no mesmo domínio (/api)
// Em desenvolvimento local, usamos localhost:3001
const isProduction = import.meta.env.PROD;

export const API_URL = isProduction 
  ? '/api' 
  : 'http://localhost:3001/api';