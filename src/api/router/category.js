const router = require('express').Router();
const logger = require("../../../logger");
const CategoryService = require("../../services/categoryService");

router.get("/", async (req, res) => {
    try {
        const result = await CategoryService.service_query_select_all();
        res.status(200).send(result);
    } catch (error) {
        logger.error("Error fetching categories:", error);
        res.status(500).send({ message: "Erro ao buscar categorias.", status: false });
    };
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await CategoryService.service_query_select_by_id(id);
        res.status(200).send(result);
    } catch (error) {
        logger.error("Error fetching category:", error);
        res.status(500).send({ message: "Erro ao buscar categoria.", status: false });
    };
});

router.post("/", async (req, res) => {
    try {
        const { name_category, screen } = req.body;

        await CategoryService.service_query_insert({ name_category, screen });
        res.status(200).send({ message: "Categoria criada com sucesso!", status: true });
    } catch (error) {
        logger.error("Error fetching category:", error);
        res.status(500).send({ message: "Erro ao buscar categoria.", status: false });
    };
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name_category, screen } = req.body;

        await CategoryService.service_query_update(id, { name_category, screen });
        res.status(200).send({ message: "Categoria atualizada com sucesso!", status: true });
    } catch (error) {
        logger.error("Error fetching category:", error);
        res.status(500).send({ message: "Erro ao buscar categoria.", status: false });
    };
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await CategoryService.service_query_delete(id);
        res.status(200).send({ message: "Categoria deletado com sucesso!", status: true });
    } catch (error) {
        logger.error("Error fetching category:", error);
        res.status(500).send({
            message: `Para deletar uma categoria, é necessário deletar ou alterar 
                    a categoria de todos os produtos vinculados a ela.`,
            status: false
        });
    };
});

module.exports = router;