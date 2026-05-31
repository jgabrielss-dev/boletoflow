# BoletoFlow Web 🪟

Interface de usuário e motor de renderização B2B para o sistema de extração em lote de faturas e boletos bancários.

## 🎯 O Foco no Produto

Enquanto o back-end processa a geometria complexa dos PDFs, o **BoletoFlow Web** foi arquitetado para resolver o problema na ponta final da operação: a visualização rápida e a impressão limpa. O operador financeiro não tem tempo para baixar planilhas complexas ou relatórios em novos PDFs; ele precisa da informação imediatamente na tela e no papel.

Esta aplicação consome a API do motor de extração, gerencia o estado de múltiplos uploads de forma cumulativa e utiliza o próprio motor de renderização do navegador para gerar comprovantes físicos, eliminando a necessidade de bibliotecas pesadas de geração de PDF no lado do cliente.

## 🧠 Arquitetura e Decisões de Engenharia

O desenvolvimento desta interface foi guiado por eficiência tática e isolamento de escopo:

1. **Acúmulo de Estado Imutável (Batch Memory):** A interface abandona o modelo "1 para 1" (sobrescrever resultados a cada novo upload). Através do uso do *Spread Operator* e gerenciamento de estado global no React, o sistema acumula faturas sucessivas em um único *Array*, permitindo que o usuário construa um lote massivo de boletos subindo dezenas de PDFs separados antes de finalizar a operação.
2. **Isolamento de Árvore DOM para Impressão:** Para entregar uma experiência de "One-Click Print" (`Ctrl+P`), a árvore de componentes foi desenhada com camadas estritas de CSS. O painel de controle e formulários são obliterados dinamicamente na mídia de impressão (`print:hidden`), fazendo com que a matriz de dados suba naturalmente para o topo da folha A4 em branco.
3. **Tipografia Responsiva de Alta Precisão:** Linhas digitáveis possuem 47 a 48 caracteres que não podem sofrer quebras no papel. A tipografia do recibo foi calibrada com fontes monoespaçadas, rastreamento apertado (`tracking-tight`) e escalonamento responsivo (`text-sm sm:text-base`) para garantir que viúvas tipográficas jamais ocorram, mantendo o padrão de legibilidade corporativa.

## 🛠️ Stack Tecnológica

* **Framework:** React / Next.js (Otimizado para implantação na Edge Network)
* **Estilização:** Tailwind CSS v3 (Motor utilitário com diretivas avançadas de *Print Media Queries*)
* **Integração:** Fetch API assíncrona com suporte a `multipart/form-data` para envio de binários ao servidor.

## 🚀 Como Executar (Ambiente Local)

1. Clone o repositório e acesse a pasta raiz.
2. Instale as dependências rigorosas do ecossistema:
   ```bash
   npm install
Configure a variável de ambiente para apontar para a sua API Python local (ou em produção). Crie um arquivo .env.local:

Snippet de código
NEXT_PUBLIC_API_URL=http://localhost:8000/api/extrair
Levante o servidor de desenvolvimento:

Bash
npm run dev
Acesse http://localhost:3000 no seu navegador. O Tailwind compilará os estilos em tempo real.

🗺️ Roadmap Futuro (Monetização)
Integração de Autenticação Edge-compatible (Supabase / Clerk).

Tabela de rastreamento de limite de cotas (Paywall / Lock-in).

Integração de Gateway de Pagamento para transição Freemium -> Pro.


***