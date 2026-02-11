# Change Log - AutoSimples

## [Versão Final 1.0.0] - Data Atual
- **Finalização Visual e UX**:
    - **Identidade Visual**: Aplicada nova paleta de cores (Azul Royal, Laranja, Amarelo) e tipografia Montserrat.
    - **Logo**: Implementada logo oficial (`logo_autosimples.png`) com ajuste de tamanho responsivo (300px Desktop / Mobile).
    - **Menu Mobile**: Substituído menu hambúrguer por **Bottom Navigation Bar** (estilo App) para melhor usabilidade.
    - **Hero Section**: Refinamento de copy ("A Peça Certa. Agendamento Garantido.") e remoção de elementos visuais desnecessários.
    - **Vídeo**: Adicionada seção "Na Prática" com player de vídeo estilizado.
- **Funcionalidades de Admin e Segurança**:
    - **Reset de Banco**: Implementada função crítica de "Zerar Base de Dados" no Dashboard Admin, protegida por senha e confirmação dupla.
    - **Relatório Inteligente**: Otimizada exportação CSV para incluir "Resumo Executivo" alinhado ao entregável do Santander.
- **Correções Técnicas**:
    - **API**: Configurada detecção automática de ambiente (Local vs Produção).
    - **Build**: Corrigidos erros de TypeScript (imports não usados) para garantir compilação limpa.
    - **Favicon**: Atualizado para ícone de Chave Inglesa (Branco/Turquesa).

## [Versões Anteriores]
- **Fase 3.5 (Polimento)**: Refatoração do fluxo de simulação, implementação de Toast, ajustes de scroll suave.
- **Fase 3 (Analytics)**: Criação de tabelas `metrics` e `feedbacks`, implementação do Dashboard Admin.
- **Fase 2 (Frontend)**: Desenvolvimento da Landing Page, Simulador e Agendamento.
- **Fase 1 (Setup)**: Configuração inicial do projeto (React, Node, MySQL).