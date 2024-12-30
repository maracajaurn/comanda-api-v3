const router = require("express").Router();
const logger = require("../../../logger");
const ProductService = require("../../services/productService");

router.get("/", async (req, res) => {
    try {
        const result = await ProductService.service_query_select_all();
        res.status(200).send(result);
    } catch (err) {
        logger.error("Error fetching orders:", err);
        res.status(500).send({ message: "Erro ao buscar produtos."});
    };
});

router.get("/paginated", async (req, res) => {
    const { limit, page } = req.query;

    try {
        const result = await ProductService.service_query_select_by_paginated(limit, page);
        res.status(200).send(result);
    } catch (err) {
        logger.error("Error fetching orders:", err);
        res.status(500).send({ message: "Erro ao buscar produtos."});
    };
});

router.get("/:product_id", async (req, res) => {
    const { product_id } = req.params;

    try {
        const result = await ProductService.service_query_select_by_id(product_id);
        res.status(200).send(result);
    } catch (err) {
        logger.error("Error fetching orders:", err);
        res.status(500).send({ message: "Erro ao buscar produto."});
    };
});

router.get("/stock/:stock", async (req, res) => {
    const { stock } = req.params;

    try {
        const result = await ProductService.service_query_select_by_stock(stock);
        res.status(200).send(result);
    } catch (err) {
        logger.error("Error fetching product:", err);
        res.status(500).send({ message: "Erro ao buscar produto."});
    };
});

router.post("/", async (req, res) => {
    const { product_name, price, category, description, stock, image } = req.body;

    let image_buffer = null;
    if (image) {
        const base64Data = image.replace(/^data:image\/(png|jpeg);base64,/, "");
        image_buffer = Buffer.from(base64Data, 'base64');
    };

    const data = {
        product_name, price, category, description, stock, image_buffer
    };

    try {
        await ProductService.service_query_insert_product(data);
        res.status(201).send({ message: "Produto criado com sucesso."});
    } catch (err) {
        logger.error("Error fetching product:", err);
        res.status(500).send({ message: "Erro ao inserir produto."});
    };
});

router.put("/:product_id", async (req, res) => {
    const { product_id } = req.params;
    const { product_name, price, category, description, stock, image } = req.body;

    
    let image_buffer = null;
    if (image) {
        const base64Data = image.replace(/^data:image\/(png|jpeg);base64,/, "");
        console.log(base64Data);
        image_buffer = Buffer.from(base64Data, 'base64');
    };

    const data = {
        product_name, price, category, description, stock, image_buffer
    };

    try {
        await ProductService.service_query_update_product_by_id(product_id, data);
        res.status(200).send({ message: "Produto atualizado com sucesso."});
    } catch (err) {
        logger.error("Error fetching product:", err);
        res.status(500).send({ message: "Erro ao atualizar produto."});
    };
});

router.delete("/:product_id", async (req, res) => {
    const { product_id } = req.params;

    try {       
        await ProductService.service_query_delete_product_by_id(product_id);
        res.status(200).send({ message: "Produto deletado com sucesso."});
    } catch (err) {
        logger.error("Error fetching product:", err);
        res.status(500).send({ message: "Erro ao deletar produto."});
    };
});

module.exports = router;