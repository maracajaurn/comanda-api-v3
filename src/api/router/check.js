const router = require("express").Router();
const logger = require("../../../logger");
const CheckService = require("../../services/checkService");

router.get("/", async (req, res) => {
    try {
        const result = await CheckService.service_query_select_all();
        res.status(200).send(result);
    } catch (error) {
        logger.error("Error fetching checks:", error);
        res.status(500).send({ message: "Erro ao buscar comandas.", status: false });
    };
});

router.get("/:check_id", async (req, res) => {
    const { check_id } = req.params;

    try {
        const result = await CheckService.service_query_select_by_id(check_id);
        res.status(200).send(result);
    } catch (error) {
        logger.error("Error fetching check:", error);
        res.status(500).send({ message: "Erro ao buscar comanda.", status: false });
    };
});

router.get("/status/:status", async (req, res) => {
    const { status } = req.params;

    try {
        const result = await CheckService.service_query_select_all_where_status(status);
        res.status(200).send(result);
    } catch (error) {
        logger.error("Error fetching check:", error);
        res.status(500).send({ message: "Erro ao buscar comandas.", status: false });
    };
});

router.post("/", async (req, res) => {
    const { name_client, obs, cashier_id } = req.body;

    const data = {
        name_client, obs, cashier_id, created_for: 0
    };

    try {
        const check_id = await CheckService.service_query_insert_check(data);
        res.status(201).send({ message: "Comanda criada com sucesso!", status: true, check_id });
    } catch (error) {
        logger.error("Error fetching check:", error);
        res.status(500).send({ message: "Erro ao criar comanda.", status: false });
    };
});

router.post("/closed", async (req, res) => {
    const { name_client, obs, cashier_id } = req.body;

    const data = {
        name_client, obs, cashier_id, status: 0, created_for: 1
    };

    try {
        const check_id = await CheckService.service_query_insert_check_closed(data);
        res.status(201).send({ message: "Comanda criada com sucesso!", status: true, check_id });
    } catch (error) {
        logger.error("Error fetching check:", error);
        res.status(500).send({ message: "Erro ao criar comanda.", status: false });
    };
});

router.put("/:check_id", async (req, res) => {
    const { check_id } = req.params;
    const { name_client, obs, total_value, status, pay_form, cashier_id } = req.body;

    const data = {
        name_client, obs, total_value, status, pay_form, cashier_id
    };

    try {
        await CheckService.service_query_update_check_by_id(check_id, data);
        res.status(200).send({ message: "Comanda atualizada com sucesso!", status: true });
    } catch (error) {
        logger.error("Error fetching check:", error);
        res.status(500).send({ message: "Erro ao atualizar comanda.", status: false });
    };
});

router.put("/close/:check_id", async (req, res) => {
    const { check_id } = req.params;
    const { pay_form } = req.body;
    try {
        await CheckService.service_query_close_check_id(pay_form, check_id);
        res.status(200).send({ message: "Comanda fechada com sucesso!", status: true });
    } catch (error) {
        logger.error("Error fetching check:", error);
        res.status(500).send({ message: "Erro ao atualizar comanda.", status: false });
    };
});

router.delete("/:check_id", async (req, res) => {
    const { check_id } = req.params;

    try {
        await CheckService.service_query_delete_check_by_id(check_id);
        res.status(200).send({ message: "Comanda deletada com sucesso!", status: true });
    } catch (error) {
        logger.error("Error fetching check:", error);
        res.status(500).send({ message: "Erro ao deletar comanda.", status: false });
    };
});

router.delete("/delete/delete_all", async (req, res) => {
    try {
        await CheckService.service_query_delete_all_check();
        res.status(200).send({ message: "Todas as comandas deletadas com sucesso!", status: true })
    } catch (error) {
        logger.error("Error fetching check:", error);
        res.status(500).send({ message: "Erro ao deletar comandas.", status: false });
    };
});

module.exports = router;