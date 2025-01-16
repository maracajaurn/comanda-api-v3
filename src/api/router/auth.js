const router = require("express").Router();
const logger = require("../../../logger");
const AuthService = require("../../services/authService");

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const { token, user } = await AuthService.login(email, password);

        return res.status(200).send({ message: "Login realizado com sucesso.", func: user.func, token: token, status: true });
    } catch (error) {
        logger.error("Error on login:", error.message);
        return res.status(500).send({ message: "Erro ao realizar login.", status: false });
    };
});

router.post("/create_token_for_client", async (req, res) => {
    const { client } = req.body;

    try {
        const token = await AuthService.create_token_for_client(client);

        return res.status(200).send({ message: "Cliente autenticado com sucesso.", token: token, status: true });
    } catch (error) {
        logger.error("Error on login:", error.message);
        return res.status(500).send({ message: "Erro ao autenticar cliente.", status: false });
    };
});

module.exports = router;