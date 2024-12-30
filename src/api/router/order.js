const router = require("express").Router();
const logger = require("../../../logger");
const OrderService = require("../../services/orderService");

router.get("/", async (req, res) => {
    try {
        const result = await OrderService.service_query_select_all();
        res.status(200).send(result);
    } catch (err) {
        logger.error("Error fetching orders:", err);
        res.status(500).send({ message: "Erro ao buscar os pedidos." });
    };
});

router.get("/:order_id", async (req, res) => {
    const { order_id } = req.params;

    try {
        const result = await OrderService.service_query_select_by_id(order_id);
        res.status(200).send(result);
    } catch (err) {
        logger.error("Error fetching order:", err);
        res.status(500).send({ message: "Erro ao buscar o pedido." });
    };
});

router.get("/status/:status", async (req, res) => {
    const { status } = req.params;

    try {
        const result = await OrderService.service_query_select_all_where_status(status);
        res.status(200).send(result);
    } catch (err) {
        logger.error("Error fetching order:", err);
        res.status(500).send({ message: "Erro ao buscar o pedido." });
    };
});

router.get("/check_id/:check_id", async (req, res) => {
    const { check_id } = req.params;

    try {
        const result = await OrderService.service_query_select_all_where_check_id(check_id);
        res.status(200).send(result);
    } catch (err) {
        logger.error("Error fetching order:", err);
        res.status(500).send({ message: "Erro ao buscar o pedido." });
    };
});

router.get("/length/products_ordered", async (req, res) => {
    try {
        const result = await OrderService.service_query_length_products_ordered();
        res.status(200).send(result);
    } catch (err) {
        logger.error("Error fetching order:", err);
        res.status(500).send({ message: "Erro ao buscar o pedido." });
    };
});

router.get("/total_value/products_ordered", async (req, res) => {
    try {
        const result = await OrderService.service_query_total_value_products_ordered();
        res.status(200).send(result);
    } catch (err) {
        logger.error("Error fetching order:", err);
        res.status(500).send({ message: "Erro ao buscar o pedido." });
    };
});

router.post("/", async (req, res) => {
    const { list_order, check_id } = req.body;
    try {
        await OrderService.service_query_insert_order(list_order, check_id);
        res.status(201).send({message: "Pedido criado com sucesso"});
    } catch (err) {
        logger.error("Error fetching order:", err);
        res.status(500).send({ message: "Erro ao criar pedido." });
    };
});

router.put("/:order_id", async (req, res) => {
    const { order_id } = req.params;
    const { check_id, status, quantity, obs } = req.body;

    const data = {
        status, quantity, obs
    };

    try {
        await OrderService.service_query_update_order_by_id(order_id, data, check_id);
        res.status(201).send({message: "Pedido atualizado com sucesso"});
    } catch (err) {
        logger.error("Error fetching order:", err);
        res.status(500).send({ message: "Erro ao atualizar pedido." });
    };
});

router.delete("/:order_id", async (req, res) => {
    const { order_id } = req.params;
    const { check_id } = req.query;

    try {
        await OrderService.service_query_delete_order_by_id(order_id, check_id);
        res.status(201).send({message: "Pedido deletado com sucesso"});
    } catch (err) {
        logger.error("Error fetching order:", err);
        res.status(500).send({ message: "Erro ao deletar pedido." });
    };
});

module.exports = router;