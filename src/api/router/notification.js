const router = require("express").Router();
const logger = require("../../../logger");
const notificationService = require("../../services/notificationService");

require("dotenv").config();

router.post("/notifyUser", async (req, res) => {
    const payload = req.body;

    try {
        await notificationService.notifyUser(payload);
        res.status(200).send({ message: "Usuário notificado com sucesso", status: true });
    } catch (error) {
        logger.error("Error while notifying user:", error);
        res.status(500).send({ message: "Erro ao notificar usuário", status: false });
    };
});

module.exports = router;