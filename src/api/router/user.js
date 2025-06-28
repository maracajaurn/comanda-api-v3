const router = require("express").Router();
const logger = require("../../../logger");
const UserService = require("../../services/userService");

router.get("/", async (req, res) => {
    try {
        const result = await UserService.service_query_select_all();
        res.status(200).send(result);
    } catch (error) {
        logger.error("Error fetching users:", error);
        res.status(500).send({ message: "Erro ao buscar os usuário", status: false });
    };
});

router.get("/:user_id", async (req, res) => {
    const { user_id } = req.params;

    try {
        const result = await UserService.service_query_select_by_id(user_id);
        res.status(200).send(result);
    } catch (error) {
        logger.error("Error fetching user:", error);
        res.status(500).send({ message: "Erro ao buscar os usuários", status: false });
    };
});

router.post("/get_by_funcs", async (req, res) => {
    const { funcs } = req.body;

    try {
        const result = await UserService.service_query_select_by_func(funcs);
        res.status(200).send(result);
    } catch (error) {
        logger.error("Error fetching user:", error);
        res.status(500).send({ message: "Erro ao buscar os usuários", status: false });
    };
});

router.post("/", async (req, res) => {
    const { username, email, password, func } = req.body;

    try {
        const data = { username, email, password, func };

        await UserService.service_query_insert_user(data);
        res.status(201).send({ message: "Usuário criado com sucesso", status: true });
    } catch (error) {
        logger.error("Error fetching user:", error);
        res.status(500).send({ message: "Erro ao criar o usuário", status: false });
    };
});

router.put("/:user_id", async (req, res) => {
    const { user_id } = req.params;
    const { username, email, password, func } = req.body;

    try {
        let data = { username, email, password, func };

        await UserService.service_query_update_user_by_id(user_id, data);
        res.status(200).send({ message: "Usuário atualizado com sucesso", status: true });
    } catch (error) {
        logger.error("Error fetching user:", error);
        res.status(500).send({ message: "Erro ao atualizar o usuário", status: false });
    };
});

router.put("/insert_notify_id/:user_id", async (req, res) => {
    const { user_id } = req.params;
    const { notify_id } = req.body;

    try {
        await UserService.service_query_insert_notify_id(user_id, notify_id);
        res.status(200).send({ message: "Id de notificação inserido com sucesso", status: true });
    } catch (error) {
        logger.error("Error fetching user:", error);
        res.status(500).send({ message: "Erro ao inserir o id de notificação.", status: false });
    };
});

router.delete("/:user_id", async (req, res) => {
    const { user_id } = req.params;

    try {
        await UserService.service_query_delete_user_by_id(user_id);
        res.status(200).send({ message: "Usuário deletado com sucesso", status: true });
    } catch (error) {
        logger.error("Error fetching user:", error);
        res.status(500).send({ message: "Erro ao deletar o usuário.", status: false });
    };
});

module.exports = router;