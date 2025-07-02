# 🍽️ Comanda Menu - API

Este é o servidor da aplicação **Comanda Menu**, desenvolvido em **Node.js** com **Express**, que fornece as rotas e lógica de negócio para gerenciamento de comandas, pedidos, usuários e notificações em tempo real.

---

## 📦 Sobre o Projeto

- API RESTful para bares e restaurantes de pequeno porte.
- Suporte a autenticação JWT.
- Integração com Firebase para envio de notificações.
- Integração com **Mercado Pago** para pagamentos online.
- Comunicação em tempo real com **Socket.IO**.

---

## 🧪 Tecnologias Utilizadas

- **Node.js** / **Express**
- **MySQL** (com `mysql2`)
- **JWT** (autenticação)
- **Socket.IO** (comunicação em tempo real)
- **Firebase Admin SDK** (push notifications)
- **Mercado Pago SDK**
- **bcrypt** (criptografia de senhas)
- **dotenv**, **winston**, **uuidv4**

---

## 🚀 Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/JackSSads/comanda-api-v3
cd comanda-api-v3
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` com as seguintes variáveis:

```
PORT_BACK=3001
URL_FRONT=http://localhost:3000

JWT_SECRET=developer
JWT_SECRET_CLIENT=developer
NODE_ENV=production

ACCESS_TOKEN_MERCADO_PAGO=APP_USR-*****-*****-*****-*****

# DATABASE
CONNECTION_LIMIT=10
HOST=localhost
USER=root
PASSWORD=123
DATABASE=db
PORT=1234

# FIREBASE
TYPE=service_account
PROJECT_ID=
PRIVATE_KEY_ID=
PRIVATE_KEY=
CLIENT_EMAIL=
CLIENT_ID=
AUTH_URI=https://accounts.google.com/o/oauth2/auth
TOKEN_URI=https://oauth2.googleapis.com/token
AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
CLIENT_X509_CERT_URL=
UNIVERSE_DOMAIN=googleapis.com
```

### 4. Inicie a API
Modo desenvolvimento (com `nodemon`):
```bash
npm run dev
```

## 📂 Estrutura Esperada
```
comanda_menu_api_v3
├── db/conn.js
├── src/
  ├── api/
    ├── router/
      ├── auth.js
      ├── cashier.js
      ├── category.js
      ├── check.js
      ├── home.js
      ├── notification.js
      ├── order.js
      ├── payment.js
      ├── product.js
      ├── setting.js
      └── user.js
  ├── repositores/
    ├── query_auth.js
    ├── query_cashier.js
    ├── query_category.js
    ├── query_check.js
    ├── query_home.js
    ├── query_order.js
    ├── query_product.js
    ├── query_setting.js
    └── query_user.js
  ├── resources/
    └── isAuthenticated.js
  ├── services/
    ├── authService.js
    ├── cashierService.js
    ├── categoryService.js
    ├── checkService.js
    ├── homeService.js
    ├── notificationService.js
    ├── orderService.js
    ├── paymentService.js
    ├── productService.js
    ├── settingService.js
    └── userService.js
├── .dockerignore
├── .env
├── .env_example
├── .gitignore
├── comanda_menu_api.postman_collection.json
├── docker-compose.yaml
├── Dockerfile
├── index.js
├── logger.js
├── package-lock.json
└── package.json
```

### 📡 Endpoints Principais
| Rota Base           | Protegido | Descrição                            |
| ------------------- | --------- | ------------------------------------ |
| `/api`              | ❌         | Rota inicial / teste da API          |
| `/api/auth`         | ❌         | Autenticação (login, logout)         |
| `/api/user`         | ✅         | Gerenciamento de usuários            |
| `/api/order`        | ✅         | Gerenciamento de pedidos             |
| `/api/check`        | ✅         | Comandas abertas/fechadas            |
| `/api/setting`      | ✅         | Configurações gerais do sistema      |
| `/api/cashier`      | ✅         | Controle de caixa                    |
| `/api/product`      | ✅         | Cadastro e listagem de produtos      |
| `/api/payment`      | ✅         | Registro de pagamentos               |
| `/api/category`     | ✅         | Categorias de produtos (ex: Bebidas) |
| `/api/notification` | ❌         | Notificações via Web Push ou afins   |

A lista completa de endpoints está organizada nas rotas do Express dentro da pasta `/routes`.

### 🔐 Autenticação
A autenticação é baseada em JWT. Os tokens são gerados no login e devem ser enviados via `Authorization: Bearer <token>` nas rotas protegidas.

### 🧾 Pagamentos
Integração com Mercado Pago para gerar links de pagamento e receber notificações de retorno via webhook.

### 📲 Notificações Push 
- Usa o Firebase Cloud Messaging.
- Cada usuário pode registrar um `notify_id` para receber alertas personalizados.

### 🧑‍💻 Autor
[Jackson Souza da Silva](https://github.com/JackSSads)

## 📄 Licença
Este projeto está licenciado sob a ISC License – veja o arquivo LICENSE para mais detalhes.

[Link frontend do projeto](https://github.com/JackSSads/comanda-menu-v3)
