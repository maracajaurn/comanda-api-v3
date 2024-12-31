const router = require("express").Router();
const logger = require("../../../logger");
const UserService = require("../../services/userService");

router.get("/", async (req, res) => {
    try {
        const result = await UserService.service_query_select_all();
        res.status(200).send(result);
    } catch (error) {
        logger.error("Error fetching users:", error);
        res.status(500).send({ message: "Erro ao buscar os usuário" });
    };
});

router.get("/:user_id", async (req, res) => {
    const { user_id } = req.params;

    try {
        const result = await UserService.service_query_select_by_id(user_id);
        res.status(200).send(result);
    } catch (error) {
        logger.error("Error fetching user:", error);
        res.status(500).send({ message: "Erro ao buscar os usuários" });
    };
});

// TODO: Criar validação para e-mail
router.post("/", async (req, res) => {
    const { username, email, password, func } = req.body;

    try {
        const data = { username, email, password, func };

        await UserService.service_query_insert_user(data);
        res.status(201).send({ message: "Usuário criado com sucesso" });
    } catch (error) {
        logger.error("Error fetching user:", error);
        res.status(500).send({ message: "Erro ao criar o usuário" });
    };
});

// TODO: Criar validação para e-mail
router.put("/:user_id", async (req, res) => {
    const { user_id } = req.params;
    const { username, email, password, func } = req.body;

    try {
        let data = { username, email, password, func };

        await UserService.service_query_update_user_by_id(user_id, data);
        res.status(200).send({ message: "Usuário atualizado com sucesso" });
    } catch (error) {
        logger.error("Error fetching user:", error);
        res.status(500).send({ message: "Erro ao atualizar o usuário" });
    };
});

router.delete("/:user_id", async (req, res) => {
    const { user_id } = req.params;

    try {
        await UserService.service_query_delete_user_by_id(user_id);
        res.status(200).send({ message: "Usuário deletado com sucesso" });
    } catch (error) {
        logger.error("Error fetching user:", error);
        res.status(500).send({ message: "Erro ao deletar o usuário." });
    };
});

module.exports = router;