# Interface de Gestão Agrícola (Front-end)

Interface web desenvolvida em React para o gerenciamento de culturas agrícolas e registo de manejos, oferecendo uma experiência simples e segura na introdução de dados.

## 🚀 Tecnologias Utilizadas

* **React.js**
* **React-Bootstrap**
* **Bootstrap Icons**
* **Yarn** (gerenciador de pacotes)

## 📋 Arquitetura da Interface e Padrão de Datas

* **Inputs Nativos (`<input type="date">`):** Utiliza o padrão nativo do HTML5 para seleção de datas através do calendário do navegador, consumindo e enviando datas no formato padrão `YYYY-MM-DD`.
* **Formatos de Exibição:** As tabelas exibem as datas em um formato amigável para o utilizador, mantendo os formulários alinhados com o padrão exigido pela API.
* **Ações Rápidas:** Botão de registo de colheita rápida que valida a data atual em relação à data de plantio antes de enviar o pedido à API.

## ⚙️ Como Executar o Front-end

### Pré-requisitos

* Node.js e Yarn instalados.
* API (back-end) em execução.

### Passos para Execução

**1. Clone o repositório e aceda à pasta do projeto:**

```bash
git clone <https://github.com/MatheusWD2006/CULTURAS_AGRICOLAS_FRONT>
cd <CULTURAS_AGRICOLAS_FRONT>
```

**2. Instale as dependências:**

```bash
yarn install
```

**3. Inicie a aplicação React:**

```bash
yarn start
```
