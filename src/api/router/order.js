const router = require("express").Router();
const logger = require("../../../logger");
const OrderService = require("../../services/orderService");

router.get("/", async (req, res) => {
    try {
        const result = await OrderService.service_query_select_all();
        res.status(200).send(result);
    } catch (error) {
        logger.error("Error fetching orders:", error);
        res.status(500).send({ message: "Erro ao buscar os pedidos.", status: false });
    };
});

router.get("/:order_id", async (req, res) => {
    const { order_id } = req.params;

    try {
        const result = await OrderService.service_query_select_by_id(order_id);
        res.status(200).send(result);
    } catch (error) {
        logger.error("Error fetching order:", error);
        res.status(500).send({ message: "Erro ao buscar o pedido.", status: false });
    };
});

router.get("/status/:status", async (req, res) => {
    const { status } = req.params;

    try {
        const result = await OrderService.service_query_select_all_where_status(status);
        res.status(200).send(result);
    } catch (error) {
        logger.error("Error fetching order:", error);
        res.status(500).send({ message: "Erro ao buscar o pedidos.", status: false });
    };
});

router.get("/cuisine/1", async (req, res) => {
    try {
        const result = await OrderService.service_query_select_all_from_cozinha();
        res.status(200).send(result);
    } catch (error) {
        logger.error("Error fetching order:", error);
        res.status(500).send({ message: "Erro ao buscar o pedidos.", status: false });
    };
});

router.get("/barmen/1", async (req, res) => {
    try {
        const result = await OrderService.service_query_select_all_from_barmen();
        res.status(200).send(result);
    } catch (error) {
        logger.error("Error fetching order:", error);
        res.status(500).send({ message: "Erro ao buscar o pedidos.", status: false });
    };
});

router.get("/check_id/:check_id", async (req, res) => {
    const { check_id } = req.params;

    try {
        const result = await OrderService.service_query_select_all_where_check_id(check_id);
        res.status(200).send(result);
    } catch (error) {
        logger.error("Error fetching order:", error);
        res.status(500).send({ message: "Erro ao buscar o pedido.", status: false });
    };
});

router.get("/length/products_ordered", async (req, res) => {
    try {
        const result = await OrderService.service_query_length_products_ordered();
        res.status(200).send(result);
    } catch (error) {
        logger.error("Error fetching order:", error);
        res.status(500).send({ message: "Erro ao buscar o pedido.", status: false });
    };
});

router.get("/total_value/products_ordered", async (req, res) => {
    try {
        const result = await OrderService.service_query_total_value_products_ordered();
        res.status(200).send(result);
    } catch (error) {
        logger.error("Error fetching order:", error);
        res.status(500).send({ message: "Erro ao buscar o pedido.", status: false });
    };
});

router.post("/", async (req, res) => {
    const { list_order, check_id, new_stock } = req.body;

    try {
        await OrderService.service_query_insert_order(list_order, check_id, new_stock);
        res.status(201).send({ message: "Pedido criado com sucesso", status: true });
    } catch (error) {
        logger.error("Error fetching order:", error);
        res.status(500).send({ message: "Erro ao criar pedido.", status: false });
    };
});

router.put("/:order_id", async (req, res) => {
    const { order_id } = req.params;
    const { check_id, status, quantity, obs, new_stock } = req.body;

    const data = { status, quantity, obs };

    try {
        await OrderService.service_query_update_order_by_id(order_id, data, check_id, new_stock);
        res.status(201).send({ message: "Pedido atualizado com sucesso", status: true });
    } catch (error) {
        logger.error("Error fetching order:", error);
        res.status(500).send({ message: "Erro ao atualizar pedido.", status: false });
    };
});

router.delete("/:order_id", async (req, res) => {
    const { order_id } = req.params;
    const { check_id, new_stock, product_id } = req.query;

    const new_stock_quantity = [ new_stock, product_id ]

    try {
        await OrderService.service_query_delete_order_by_id(order_id, check_id, new_stock_quantity);
        res.status(201).send({ message: "Pedido deletado com sucesso", status: true });
    } catch (error) {
        logger.error("Error fetching order:", error);
        res.status(500).send({ message: "Erro ao deletar pedido.", status: false });
    };
});

module.exports = router;