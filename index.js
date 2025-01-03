const express = require("express");
const app = express();

require("dotenv").config();

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: [process.env.URL_FRONT],
        methods: ["GET", "POST"],
        credentials: true,
    }
});

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
const authRouter = require("./src/api/router/auth");

app.use("/api", homeRouter)
app.use("/api/cashier", cashierRouter);
app.use("/api/product", productRouter);
app.use("/api/check", checkRouter);
app.use("/api/order", orderRouter);
app.use("/api/user", userRouter);
app.use("/api/setting", settingRouter);
app.use("/api/auth", authRouter);

// Eventos de WebSocket
io.on("connection", (socket) => {
    logger.info(`Socket ${socket.id} conectado.`);

    socket.on("disconnect", (reason) => {
        logger.info(`Socket ${socket.id} desconectado. Motivo: ${reason}`);
    });

    // novo pedido
    socket.on("new_order", (order) => {
        socket.data.order = order;
        socket.broadcast.emit("new_order", socket.data.order);
    });

    // nova comanda
    socket.on("new_check", () => {
        socket.broadcast.emit("new_check");
    });

    // comanda finalizada
    socket.on("check_finished", (data) => {
        socket.data.check_finished = data;
        socket.broadcast.emit("check_finished", socket.data.check_finished);
    });

    // pedido pronto
    socket.on("order_ready", (data) => {
        socket.data.order_ready = data;
        socket.broadcast.emit("order_ready", socket.data.order_ready);
    });

    // produto removido
    socket.on("product_removed", (data) => {
        socket.data.product_removed = data;
        socket.broadcast.emit("product_removed", socket.data.product_removed);
    });

    // quantidade alterada
    socket.on("quantity_change", (data) => {
        socket.data.quantity_change = data;
        socket.broadcast.emit("quantity_change", socket.data.quantity_change);
    });

    // comanda cancelado
    socket.on("check_canceled", (data) => {
        socket.data.check_canceled = data;
        socket.broadcast.emit("check_canceled", socket.data.check_canceled);
    });
});

server.listen(process.env.PORT_BACK, () => {
    logger.info(`Servidor iniciado na porta ${process.env.PORT_BACK}`);
});
