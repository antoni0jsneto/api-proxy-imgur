# API Proxy para Upload de Imagens no Imgur

Este projeto é um proxy simples em Node.js que permite enviar imagens para o Imgur usando uma requisição HTTP `POST`. Ele é útil para proteger seu `Client-ID` do Imgur ao realizar uploads a partir do front-end.

---

## 🚀 Como usar

### 1. Clone o repositório

```bash
git clone https://github.com/antoni0jsneto/api-proxy-imgur.git
cd api-proxy-imgur
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Crie o arquivo `.env`

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
IMGUR_CLIENT_ID=sua_client_id_do_imgur
```

### 4. Obtenha seu **Client ID** do Imgur

1. Acesse: [https://api.imgur.com/oauth2/addclient](https://api.imgur.com/oauth2/addclient)
2. Faça login ou crie uma conta.
3. No campo `Authorization type`, escolha **Anonymous usage without user authorization**.
4. Dê um nome e descrição à sua aplicação.
5. Após enviar, você verá seu `Client ID`. Copie e cole no `.env`.

### 5. Inicie o servidor

```bash
node index.js
```

O servidor irá rodar em: `http://localhost:3001`

---

## 📤 Endpoint

### `POST /upload`

Envia uma imagem para o Imgur.

- **Body**: FormData com o campo `image` contendo a imagem a ser enviada.
- **Resposta**: JSON com os dados da imagem hospedada no Imgur.

---

## 📦 Tecnologias usadas

- `express`
- `multer`
- `axios`
- `form-data`
- `dotenv`
- `cors`

---

## 📃 Licença

MIT
