const router = require("express").Router();
const logger = require("../../../logger");
const AuthService = require("../../services/authService");

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await AuthService.login(email, password);

        return res.status(200).send({ message: "Login realizado com sucesso.", func: result.user.func, token: result.token, status: true });
    } catch (error) {
        logger.error("Error on login:", error);
        return res.status(500).send({ message: "Erro ao realizar login.", status: false });
    };
});

module.exports = router;