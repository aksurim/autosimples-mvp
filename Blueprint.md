    **🛠️ Blueprint de Validação: AutoSimples (MVP Santander Explorer)**

### 1\. Visão Geral do Experimento

O **AutoSimples** (antigo SPASE Connect) é um ecossistema AutoTech que utiliza a placa do veículo para eliminar a vulnerabilidade técnica do motorista e garantir a pontualidade no início dos serviços.

* **O Objetivo do MVP**: Validar se a tecnologia **"Plate-to-Part"** gera confiança suficiente para o cliente realizar um agendamento digital imediato.

### 2\. Estrutura do Experimento (Design de MVP)

Para este entregável, utilizaremos o método de **Landing Page de Validação com Simulador**.

#### 2.1. Funcionalidades Simuladas (Mock-up)

* **Identificação Visual**: Um campo de entrada de placa que, ao ser acionado, exibe uma animação de "Análise Técnica" para simular a precisão do sistema.
* **Catálogo Curado**: Exibição de 3 serviços padrão (Troca de Óleo, Pastilhas e Filtros) com preços médios reais da região de Campina Grande para teste de aceitação de valor.
* **Garantia de Início**: Um seletor de horários focado na **hora exata de entrada do veículo** na oficina.

### 3\. Guia de Preenchimento: Entregável 2 (Santander Explorer)

Com base nos seus arquivos, aqui estão os dados exatos para você preencher seu formulário oficial:

#### Passo 1: Hipóteses Básicas

| **Campo**                 | **Conteúdo para o AutoSimples**                                                                                                |
| :-----------------------: | :----------------------------------------------------------------------------------------------------------------------------: |
| **Hipóteses do cliente**  | Proprietários de veículos (leigos) que não possuem conhecimento técnico e sofrem com a assimetria de informação no mercado.    |
| **Hipóteses do problema** | A maior dor é o conflito de garantias (entre peça e instalador) e a incerteza se o serviço começará no horário agendado.       |
| **Hipóteses da solução**  | Um ecossistema digital que une a "Peça à Instalação" via placa e garante o horário de início resolve a insegurança do cliente. |

#### Passo 2: Design de Experimentos

* **Hipóteses Críticas**: O cliente confia em uma plataforma digital para ser seu "fiador técnico" e garantir a peça correta?
* **Hipóteses de Maior Risco**: O usuário está disposto a fornecer os dados do veículo (placa) em troca de assertividade no orçamento?
* **Método**: Landing Page de validação com simulador de placa e quiz de interesse.
* **Critério Mínimo de Sucesso**: Obter 15% de conversão (cliques em "Agendar") sobre o total de visitantes da página.

#### Passo 3: Business Case (O que medir)

* **Proposta de Valor do MVP**: Validar o interesse real e criar uma base de contatos (leads) para o lançamento futuro.
* **Funcionalidades**: Busca automática por placa, unificação de garantia (peça + mão de obra) e reserva de vaga em tempo real.
* **Métricas para Validação**: Taxa de conversão da landing page e número de e-mails coletados no formulário de "Avisar no Lançamento".

### 4\. Estratégia de Coleta (Google Forms / Landing Page)

Para responder o questionário com **dados reais**, você deve configurar sua coleta para obter:

1.  **Quantitativo**: "De 0 a 10, quanto você confia em comprar peças online sabendo que o app garante que ela serve no seu carro?".
2.  **Qualitativo**: "Qual o seu maior medo ao deixar o carro em uma oficina hoje?".
3.  **Conversão**: "Deseja ser um testador exclusivo da versão Alpha do AutoSimples? (Sim/Não)".

### 5\. Especificações Técnicas (Stack Tecnológica)

Definição da arquitetura para garantir performance, escalabilidade inicial e facilidade de deploy no ambiente SuperDominios.

#### 5.1. Frontend (Interface)
*   **Framework**: React (via Vite) - Foco em performance e modularidade.
*   **Linguagem**: TypeScript - Tipagem estática para reduzir bugs em produção.
*   **Estilização**: Tailwind CSS - Desenvolvimento ágil de UI responsiva e moderna.
*   **Ícones**: Lucide React.

#### 5.2. Backend (API & Lógica)
*   **Runtime**: Node.js (Express) - Suportado nativamente pelo host (SuperDominios).
*   **Função**: Gerenciar conexões com o banco, processar a lógica do simulador e capturar leads.

#### 5.3. Banco de Dados (Persistência)
*   **SGBD**: MySQL (Hospedado no SuperDominios).
*   **Uso**: Armazenamento de leads, logs de simulação (placas consultadas) e catálogo de serviços mockados.
*   **Conexão**: Direta via Backend hospedado no mesmo ambiente.

#### 5.4. Infraestrutura & Deploy
*   **Provedor**: SuperDominios.
*   **Ambiente**: Produção (Live) com suporte a Node.js App.
*   **CI/CD**: Manual ou via FTP/Git.
