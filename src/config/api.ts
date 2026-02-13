// Configuração centralizada da API

// Detecta se está rodando em localhost (desenvolvimento) ou em domínio real (produção)
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Se for localhost, usa a porta 3001. Se for produção, usa o caminho relativo /api
export const API_URL = isLocalhost 
  ? 'http://localhost:3001/api' 
  : '/api';