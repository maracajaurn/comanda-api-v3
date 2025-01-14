const router = require("express").Router();
const logger = require("../../../logger");

const { query_insert_payment } = require("../../repositores/query_payment");

router.post("/payment", async (req, res) => {
    console.log(req.body)

    try {
        await query_insert_payment(req.body);
        res.sendStatus(200);
    } catch (error) {
        logger.error(`Error on Webhook Payment: ${error.message}`);
        res.status(500).send(error.message);
    };
});

module.exports = router;
