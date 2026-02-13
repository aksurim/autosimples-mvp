# Change Log - AutoSimples

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