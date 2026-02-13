# 🛠️ Blueprint de Validação: AutoSimples (MVP Santander Explorer)

## 1. Visão Geral do Experimento
O **AutoSimples** é um ecossistema AutoTech que utiliza a tecnologia **"Plate-to-Part"** para eliminar a vulnerabilidade técnica do motorista e garantir a pontualidade nos serviços automotivos.

*   **Objetivo do MVP**: Validar se a tecnologia gera confiança suficiente para o cliente realizar um agendamento digital imediato.
*   **Método**: Landing Page de Alta Fidelidade com Simulador de Placa e Agendamento Real (Beta).

## 2. Estrutura do Experimento (Design de MVP)

### 2.1. Funcionalidades Implementadas
*   **Simulador Plate-to-Part**: Input de placa com validação e feedback visual de "Análise Técnica".
*   **Catálogo Inteligente**: Sugestão de serviços baseada na necessidade do usuário (Óleo, Freios, Bateria).
*   **Agendamento Garantido**: Seleção de oficinas parceiras com geolocalização simulada e preços transparentes.
*   **Coleta de Dados (Analytics)**: Dashboard administrativo para monitoramento em tempo real de conversão e comportamento.

### 2.2. Fluxo do Usuário
1.  **Descoberta**: Usuário escolhe o serviço desejado (Cards Visuais).
2.  **Validação**: Digita a placa -> Sistema valida compatibilidade.
3.  **Decisão**: Escolhe oficina e vê preço final (Peça + Mão de Obra).
4.  **Conversão**: Agenda horário e fornece e-mail (Lead).
5.  **Feedback**: Responde Quiz de Confiança e Medo.

## 3. Especificações Técnicas (Stack Tecnológica)

### 3.1. Frontend (Interface)
*   **Framework**: React 18 (via Vite) - Performance e modularidade.
*   **Linguagem**: TypeScript - Segurança de tipagem.
*   **Estilização**: Tailwind CSS - Design System responsivo e moderno.
*   **Ícones**: Lucide React.
*   **UX Mobile**: Menu "App-Style" com navegação inferior.

### 3.2. Backend (API & Lógica)
*   **Runtime**: Node.js (Express).
*   **Arquitetura**: API RESTful com rotas para simulação, agendamento e métricas.
*   **Configuração de Ambiente**: Detecção automática de ambiente (`localhost` vs Produção) via `src/config/api.ts`.
*   **Segurança**: CORS configurado, validação de inputs e proteção de rotas admin.

### 3.3. Banco de Dados (Persistência)
*   **SGBD**: MySQL (Hospedado no SuperDominios).
*   **Estrutura**:
    *   `servicos`: Catálogo de peças e serviços.
    *   `leads`: Registro de agendamentos (Pré-reservas).
    *   `feedbacks`: Respostas do quiz de validação.
    *   `metrics`: Contadores de eventos (Visitas, Cliques, Conversão).

### 3.4. Infraestrutura & Deploy
*   **Provedor**: SuperDominios (cPanel / Node.js App).
*   **Ambiente**: Produção (Live).
*   **Build**: Otimizado via Vite (`npm run build`).
*   **Variáveis de Ambiente**: Gerenciadas via painel do Node.js App no cPanel.

## 4. Estratégia de Coleta de Dados (KPIs)

O sistema possui um **Dashboard Admin** (`/admin`) que monitora automaticamente:

| Métrica | Definição | Objetivo |
| :--- | :--- | :--- |
| **Total Visits** | Acessos únicos à Landing Page | Topo de Funil |
| **Plate Clicks** | Interação com o campo de placa | Interesse na Solução |
| **Leads Captured** | Agendamentos confirmados | Validação de Negócio |
| **Conversion Rate** | (Leads / Visits) * 100 | Meta: > 15% |
| **Trust Score** | Média (0-10) do Quiz | Validação de Confiança |

## 5. Guia de Preenchimento: Entregável Santander
O sistema gera um **Relatório CSV** formatado especificamente para responder às perguntas do formulário do Santander Explorer, correlacionando dados quantitativos com as hipóteses de negócio.