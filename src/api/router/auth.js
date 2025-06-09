const router = require("express").Router();
const logger = require("../../../logger");
const AuthService = require("../../services/authService");
const UserService = require("../../services/userService");

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const { token, user } = await AuthService.login(email, password);

        return res.status(200).send({
            message: "Login realizado com sucesso.",
            func: user.func,
            token: token,
            user_id: user.user_id,
            status: true
        });
    } catch (error) {
        logger.error("Error on login:", error);
        return res.status(500).send({ message: "Erro ao realizar login.", status: false });
    };
});

router.post("/first_access", async (req, res) => {
    const { username, email, password, func } = req.body;

    const data = { username, email, password, func };

    try {
        await UserService.service_query_insert_user(data);
        res.status(201).send({ message: "Usuário criado com sucesso", status: true });
    } catch (error) {
        logger.error("Error on login:", error);
        return res.status(500).send({ message: "Erro ao realizar primeiro acesso.", status: false });
    };
});

router.post("/create_token_for_client", async (req, res) => {
    const { client } = req.body;

    try {
        const token = await AuthService.create_token_for_client(client);

        return res.status(200).send({ message: "Cliente autenticado com sucesso.", token: token, status: true });
    } catch (error) {
        logger.error("Error on login:", error);
        return res.status(500).send({ message: "Erro ao autenticar cliente.", status: false });
    };
});

module.exports = router;