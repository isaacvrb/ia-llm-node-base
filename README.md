# Integrações com LLMs

Este projeto fornece uma API REST para integração com diversos provedores de modelos de linguagem (LLMs), como OpenAI, Anthropic, xAI, Google, Groq e Ollama.

---

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![LLM](https://img.shields.io/badge/LLM-API-blue)

---

## Sumário

- [Descrição](#descrição)
- [Instalação](#instalação)
- [Rotas da API](#rotas-da-api)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)

---

## Instalação

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Configure as variáveis de ambiente no arquivo `.env`.

3. Inicie o servidor em modo desenvolvimento:
   ```bash
   npm run dev
   ```
   Ou faça o build e rode em produção:
   ```bash
   npm run build
   npm start
   ```

---

## Rotas da API

Todas as rotas estão sob o prefixo `/api/llm`.

### 1. OpenAI

- **GET** `/api/llm/openai`
  - **Parâmetros:** nenhum
  - **Retorno:** `{ message: string }`
- **GET** `/api/llm/openai/book-finder`
  - **Parâmetros:** nenhum
  - **Retorno:** `{ book: object|null, error: string|null }`
- **GET** `/api/llm/openai/image-reader`
  - **Parâmetros:** nenhum
  - **Retorno:** `{ description: string }`

### 2. Anthropic (Claude)

- **GET** `/api/llm/anthropic`
  - **Parâmetros:** nenhum
  - **Retorno:** `{ message: string }`

### 3. xAI (Grok)

- **GET** `/api/llm/xai`
  - **Parâmetros:** nenhum
  - **Retorno:** `{ message: string }`

### 4. Google AI (Gemini)

- **GET** `/api/llm/google`
  - **Parâmetros:** nenhum
  - **Retorno:** `{ message: string }`

### 5. Groq

- **GET** `/api/llm/groq`
  - **Parâmetros:** nenhum
  - **Retorno:** `{ message: string }`

### 6. Ollama

- **GET** `/api/llm/ollama`
  - **Parâmetros:** nenhum
  - **Retorno:** `{ message: string }`

---

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- Cors
- Prettier
- TSX
- Zod
- OpenAI SDK
- Anthropic SDK
- xAI SDK
- Google Generative AI SDK
- Groq SDK
- Ollama SDK

---
