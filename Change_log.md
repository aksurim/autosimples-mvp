# Change Log - AutoSimples

## [Versão 1.1.1] - Documentação e Polimento
- **Documentação (README.md)**:
    - **Melhoria Visual**: Adicionados Badges (Shields.io) com estilo `for-the-badge` para destacar a stack tecnológica (React, Vite, TypeScript, Tailwind, Node.js, Express, MySQL).
    - **Organização**: Inclusão de emojis nos títulos de seção para melhor legibilidade e apelo visual.

## [Versão 1.1.0] - Sprint de Refinamento
- **Captura de Lead**:
    - **Mudança**: Substituído o campo "E-mail" por "Telefone/WhatsApp" no modal de agendamento.
    - **Motivo**: Aumentar a taxa de contato efetivo com leads frios/mornos.
    - **Backend**: Adicionada coluna `telefone` na tabela `leads` e tornado `email` opcional.
- **Painel Admin**:
    - **Funcionalidade**: Adicionado botão para exportar CSV de telefones capturados.
    - **Objetivo**: Facilitar a criação de listas para campanhas de marketing/vendas.
- **UX/UI**:
    - **Ajuste**: Centralização de textos na Hero Section apenas para dispositivos móveis (`text-center md:text-left`).

## [Versão Estável 1.0.2] - Data Atual (Final)
- **Correção Crítica de Produção (Hotfix Final)**:
    - **Bug**: O `BookingModal` e o `AdminDashboard` estavam falhando em produção com erro de conexão.
    - **Causa**: Ambos os componentes ainda tinham a URL `http://localhost:3001` fixa no código, ignorando a configuração centralizada.
    - **Solução**: Atualizados todos os componentes para importar e usar `API_URL` do `src/config/api.ts`.
    - **Status**: Deploy realizado e validado com sucesso. Fluxos de agendamento e administração 100% funcionais.

## [Versão Final 1.0.1] - Pós-Deploy
- **Correção de API**: Ajuste na lógica de detecção de ambiente (`isLocalhost`) para garantir que o frontend use rotas relativas (`/api`) em produção.
- **Limpeza de Código**: Remoção de imports não utilizados (TypeScript) para garantir um build limpo.

## [Versão Final 1.0.0] - Lançamento
- **Identidade Visual**: Nova paleta (Azul Royal/Laranja), Logo oficial e Favicon.
- **UX Mobile**: Menu "App-Style" (Barra inferior).
- **Funcionalidades**:
    - Reset de Banco de Dados (Admin).
    - Relatório CSV Inteligente.
    - Vídeo "Na Prática".
    - Validação de duplicidade de agendamento (LocalStorage).

## [Versões Anteriores]
- **Fase 3 (Analytics)**: Dashboard e Métricas.
- **Fase 2 (Frontend)**: Landing Page e Simulador.
- **Fase 1 (Setup)**: Configuração inicial.