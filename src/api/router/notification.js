const router = require("express").Router();
const logger = require("../../../logger");
const notificationService = require("../../services/notificationService");

require("dotenv").config();

router.post("/notifyUser", async (req, res) => {
    const { token, title, body, link } = req.body;

    if (!token || !title || !body) {
        return res.status(400).json({ error: "token, title e body são obrigatórios." });
    };

    const payload = {
        token,
        notification: {
            title,
            body,
        },
        webpush: {
            fcmOptions: {
                link: link || `${process.env.URL_FRONT}/register_client`,
            },
        },
    };

    try {
        await notificationService.notifyUser(payload);
        res.status(200).send({ message: "Usuário notificado com sucesso", status: true });
    } catch (error) {
        logger.error("Error while notifying user:", error);
        res.status(500).send({ message: "Erro ao notificar usuário", status: false });
    };
});

module.exports = router;