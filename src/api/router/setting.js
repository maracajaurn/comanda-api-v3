const router = require("express").Router();
const logger = require("../../../logger");
const SettingService = require("../../services/settingService");

router.get("/", async (req, res) => {
    try {
        const result = await SettingService.service_query_select_all();
        res.status(200).send(result);
    } catch (err) {
        logger.error("Error fetching settings:", err);
        res.status(500).send({ message: "Erro ao buscar as configurações.", status: false });
    };
});

router.post("/", async (req, res) => {
    const { estabishment_name, serveiceChange, service_change_percentage, image_pix, color } = req.body;

    let image_buffer = null;
    if (image_pix) {
        image_buffer = Buffer.from(image_pix, 'base64');
    };

    const data = {
        estabishment_name, serveiceChange, service_change_percentage, image_buffer, color
    };

    try {
        await SettingService.service_query_insert_setting(data);
        res.status(201).send({ message: "Configuração criada com sucesso.", status: true });
    } catch (err) {
        logger.error("Error fetching setting:", err);
        res.status(500).send({ message: "Erro ao criar nova configuração.", status: false });
    };
});

router.put("/:setting_id", async (req, res) => {
    const { setting_id } = req.params;
    const { estabishment_name, serveice_change, service_change_percentage, image_pix, color } = req.body;

    let image_buffer = null;
    if (image_pix) {
        const base64Data = image_pix.replace(/^data:image\/(png|jpeg);base64,/, "");
        image_buffer = Buffer.from(base64Data, 'base64');
    };

    const data = {
        estabishment_name, serveice_change, service_change_percentage, image_buffer, color
    };

    try {
        await SettingService.service_query_update_setting_by_id(setting_id, data);
        res.status(200).send({ message: "Configuração atualizada com sucesso.", status: true });
    } catch (err) {
        logger.error("Error fetching setting:", err);
        res.status(500).send({ message: "Erro ao atualizar a configuração.", status: false });
    };
});

module.exports = router;