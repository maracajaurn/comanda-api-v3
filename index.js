const express = require("express");
const app = express();

require("dotenv").config();

const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: [process.env.URL_FRONT] } });

const cors = require("cors");
const logger = require("./logger");

app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));

app.use(cors({
    origin: [process.env.URL_FRONT],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
}));

const cashierRouter = require("./src/api/router/cashier");
const productRouter = require("./src/api/router/products");
const checkRouter = require("./src/api/router/check");
const orderRouter = require("./src/api/router/order");
const settingRouter = require("./src/api/router/setting");
const userRouter = require("./src/api/router/user");
const homeRouter = require("./src/api/router/home");

app.use("api/home", homeRouter)
app.use("/api/cashier", cashierRouter);
app.use("/api/product", productRouter);
app.use("/api/check", checkRouter);
app.use("/api/order", orderRouter);
app.use("/api/user", userRouter);
app.use("/api/setting", settingRouter);

// Eventos de WebSocket
io.on("connection", (socket) => {
    logger.info("Novo cliente conectado");

    socket.on("disconnect", () => {
        logger.info("Cliente desconectado");
    });

    socket.on("novo_pedido", (pedido) => {
        socket.data.pedido = pedido;
        logger.info(`Novo pedido recebido: ${JSON.stringify(pedido)}`);
        socket.broadcast.emit("lista_novo_pedido", socket.data.pedido);
    });

    socket.on("nova_comanda", () => {
        logger.info("Nova comanda emitida");
        socket.broadcast.emit("nova_comanda");
    });

    socket.on("comanda_finalizada", (data) => {
        socket.data.comanda_finalizada = data;
        logger.info(`Comanda finalizada: ${JSON.stringify(data)}`);
        socket.broadcast.emit("comanda_finalizada", socket.data.comanda_finalizada);
    });

    socket.on("produto_pronto", (data) => {
        socket.data.produto_pronto = data;
        logger.info(`Produto pronto: ${JSON.stringify(data)}`);
        socket.broadcast.emit("produto_pronto", socket.data.produto_pronto);
    });

    socket.on("produto_removido", (data) => {
        socket.data.produto_removido = data;
        logger.info(`Produto removido: ${JSON.stringify(data)}`);
        socket.broadcast.emit("produto_removido", socket.data.produto_removido);
    });

    socket.on("alterar_quantidade", (data) => {
        socket.data.alterar_quantidade = data;
        logger.info(`Quantidade alterada: ${JSON.stringify(data)}`);
        socket.broadcast.emit("alterar_quantidade", socket.data.alterar_quantidade);
    });

    socket.on("comanda_cancelada", (data) => {
        socket.data.comanda_cancelada = data;
        logger.info(`Comanda cancelada: ${JSON.stringify(data)}`);
        socket.broadcast.emit("comanda_cancelada", socket.data.comanda_cancelada);
    });
});

server.listen(process.env.PORT_BACK, () => {
    logger.info(`Servidor iniciado na porta ${process.env.PORT_BACK}`);
});
