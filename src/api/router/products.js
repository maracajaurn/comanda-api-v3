const router = require("express").Router();
const logger = require("../../../logger");
const ProductService = require("../../services/productService");

router.get("/", async (req, res) => {
    try {
        const result = await ProductService.service_query_select_all();
        res.status(200).send(result);
    } catch (error) {
        logger.error("Error fetching orders:", error);
        res.status(500).send({ message: "Erro ao buscar produtos.", status: false });
    };
});

router.get("/paginated", async (req, res) => {
    const { limit, page } = req.query;

    try {
        const result = await ProductService.service_query_select_by_paginated(limit, page);
        res.status(200).send(result);
    } catch (error) {
        logger.error("Error fetching orders:", error);
        res.status(500).send({ message: "Erro ao buscar produtos.", status: false });
    };
});

router.get("/:product_id", async (req, res) => {
    const { product_id } = req.params;

    try {
        const result = await ProductService.service_query_select_by_id(product_id);
        res.status(200).send(result);
    } catch (error) {
        logger.error("Error fetching orders:", error);
        res.status(500).send({ message: "Erro ao buscar produto.", status: false });
    };
});

router.get("/stock/:stock", async (req, res) => {
    const { stock } = req.params;

    try {
        const result = await ProductService.service_query_select_by_stock(stock);
        res.status(200).send(result);
    } catch (error) {
        logger.error("Error fetching product:", error);
        res.status(500).send({ message: "Erro ao buscar produto.", status: false });
    };
});

router.get("/get_product/by_name", async (req, res) => {
    const { name_product } = req.query;

    console.log("name_product", name_product)

    try {
        const result = await ProductService.service_query_select_by_name(name_product);
        res.status(200).send(result);
    } catch (error) {
        logger.error("Error fetching product:", error);
        res.status(500).send({ message: "Erro ao buscar produto." });
    };
});

router.post("/", async (req, res) => {
    const { product_name, price, category_id, description, stock, image } = req.body;

    let image_buffer = null;
    if (image) {
        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
        image_buffer = Buffer.from(base64Data, 'base64');
    };

    const data = {
        product_name, price, category_id, description, stock, image_buffer
    };

    try {
        await ProductService.service_query_insert_product(data);
        res.status(201).send({ message: "Produto criado com sucesso.", status: true });
    } catch (error) {
        logger.error("Error fetching product:", error);
        res.status(500).send({ message: "Erro ao inserir produto.", status: false });
    };
});

router.put("/:product_id", async (req, res) => {
    const { product_id } = req.params;
    const { product_name, price, category_id, description, stock, image } = req.body;


    let image_buffer = null;
    if (image) {
        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
        image_buffer = Buffer.from(base64Data, 'base64');
    };

    const data = {
        product_name, price, category_id, description, stock, image_buffer
    };

    try {
        await ProductService.service_query_update_product_by_id(product_id, data);
        res.status(200).send({ message: "Produto atualizado com sucesso.", status: true });
    } catch (error) {
        logger.error("Error fetching product:", error);
        res.status(500).send({ message: "Erro ao atualizar produto.", status: false });
    };
});

router.delete("/:product_id", async (req, res) => {
    const { product_id } = req.params;

    try {
        await ProductService.service_query_delete_product_by_id(product_id);
        res.status(200).send({ message: "Produto deletado com sucesso.", status: true });
    } catch (error) {
        logger.error("Error fetching product:", error);
        res.status(500).send({ message: "Erro ao deletar produto.", status: false });
    };
});

module.exports = router;