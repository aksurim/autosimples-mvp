# AutoSimples - MVP Santander Explorer 🚀

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)

> **"A Peça Certa. Agendamento Garantido."**

Bem-vindo ao repositório oficial do MVP **AutoSimples**, desenvolvido como parte do programa de aceleração **Santander Explorer**. Este projeto é uma Landing Page de alta fidelidade projetada para validar a tecnologia **Plate-to-Part** e o modelo de negócio de agendamento unificado.

---

## 🎯 Objetivo do Projeto
Validar se a tecnologia de identificação de peças via placa gera confiança suficiente para o cliente realizar um agendamento digital imediato, eliminando a vulnerabilidade técnica e o conflito de garantias.

## 🛠️ Stack Tecnológica
O projeto foi construído com foco em **performance**, **escalabilidade** e **rapidez de desenvolvimento**:

*   **Frontend**: React 18 + TypeScript + Vite
*   **Estilização**: Tailwind CSS (Design System Responsivo)
*   **Backend**: Node.js + Express (API REST)
*   **Banco de Dados**: MySQL (Hospedado no SuperDominios)
*   **Deploy**: cPanel / Node.js App

## 📱 Funcionalidades Principais

### Para o Usuário (Cliente)
1.  **Simulador Plate-to-Part**: Identificação visual e técnica do veículo pela placa.
2.  **Catálogo Inteligente**: Sugestão de serviços (Óleo, Freios, Bateria) baseada na necessidade.
3.  **Agendamento Real**: Escolha de oficinas parceiras com preço final (Peça + Mão de Obra).
4.  **UX Mobile-First**: Navegação estilo aplicativo com barra inferior.

### Para o Administrador (Validação)
1.  **Dashboard em Tempo Real**: Acompanhamento de visitas, cliques e leads.
2.  **Análise de Conversão**: Cálculo automático da taxa de sucesso (Meta: >15%).
3.  **Feedback Qualitativo**: Gráficos de "Nível de Confiança" e "Maiores Medos" dos usuários.
4.  **Exportação de Relatório**: Geração de CSV formatado para o entregável do Santander.

---

## 🚀 Como Rodar Localmente

### Pré-requisitos
*   Node.js (v18+)
*   MySQL (Local ou Remoto)

### Instalação
1.  Clone o repositório:
    ```bash
    git clone https://github.com/aksurim/autosimples-mvp.git
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Configure o banco de dados:
    *   Crie um arquivo `.env` na raiz com suas credenciais (veja `.env.example`).
    *   Rode os scripts de migração:
        ```bash
        npm run db:setup
        npm run db:update
        npm run db:metrics
        npm run db:feedback
        ```
4.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
5.  Acesse: `http://localhost:5173`

---

## ☁️ Deploy em Produção (cPanel/Node.js)

O projeto está configurado para rodar em ambientes cPanel com CloudLinux Passenger.

1.  **Build**: Gere a versão de produção com `npm run build`.
2.  **Upload**: Suba a pasta `dist` e a pasta `server` para a raiz do app no servidor.
3.  **Configuração**:
    *   Defina as variáveis de ambiente (`DB_HOST`, `DB_USER`, etc.) no painel do Node.js App.
    *   Aponte o arquivo de inicialização para `server/index.js`.
4.  **Banco de Dados**: Importe a estrutura SQL via phpMyAdmin.

---

## 📂 Estrutura de Pastas
*   `/src`: Código fonte do Frontend (React).
*   `/server`: Código fonte do Backend (API Node.js).
*   `/public`: Assets estáticos (Imagens, Vídeos, Favicon).
*   `/dist`: Versão de produção (gerada após build).

---

## 📄 Licença
Este projeto é exclusivo para fins de validação no programa Santander Explorer. Todos os direitos reservados à equipe AutoSimples.