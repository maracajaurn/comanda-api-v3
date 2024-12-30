const router = require("express").Router();
const logger = require("../../../logger");
const CashierService = require("../../services/cashierService");

router.get("/", async (req, res) => {
    try {
        const result = await CashierService.service_query_select_all();
        res.status(200).send(result);
    } catch (err) {
        logger.error("Error fetching cashiers:", err);
        res.status(500).send({ message: "Erro ao buscar caixas." });
    };
});

router.get("/:cashier_id", async (req, res) => {
    const { cashier_id } = req.params;

    try {
        const result = await CashierService.service_query_select_by_id(cashier_id);
        res.status(200).send(result);
    } catch (err) {
        logger.error("Error fetching cashier:", err);
        res.status(500).send({ message: "Erro ao buscar caixa." });
    };
});

router.get("/status/:status", async (req, res) => {
    const { status } = req.params;

    try {
        const result = await CashierService.service_query_select_where_status(status);
        res.status(200).send(result);
    } catch (err) {
        logger.error("Error fetching cashier:", err);
        res.status(500).send({ message: "Erro ao buscar caixa." });
    };
});

router.post("/", async (req, res) => {
    try {
        await CashierService.service_query_insert_cashier();
        res.status(201).send({ message: "Caixa criado com sucesso." });
    } catch (err) {
        logger.error("Error fetching cashier:", err);
        res.status(500).send({ message: "Erro ao criar caixa." });
    };
});

router.put("/:cashier_id", async (req, res) => {
    const { cashier_id } = req.params;
    const { lenght_cheks, lenght_products, total_value, status } = req.body;

    const data = {
        lenght_cheks, lenght_products, total_value, status
    };

    try {
        await CashierService.service_query_update_cashier_by_id(cashier_id, data);
        res.status(200).send({ message: "Caixa atualizado com sucesso." });
    } catch (err) {
        logger.error("Error fetching cashier:", err);
        res.status(500).send({ message: "Erro ao atualizar caixa." });
    };
});

router.delete("/:cashier_id", async (req, res) => {
    const { cashier_id } = req.params;

    try {
        await CashierService.service_query_delete_cashier_by_id(cashier_id);
        res.status(200).send({ message: "Caixa deletado com sucesso." });
    } catch (err) {
        logger.error("Error fetching cashier:", err);
        res.status(500).send({ message: "Erro ao deletar caixa." });
    };
});

module.exports = router;