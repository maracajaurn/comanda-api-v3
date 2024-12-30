const router = require("express").Router();
const logger = require("../../../logger");
const HomeService = require("../../services/homeService");

router.get("/", async (req, res) => {
    try {
        const result = await HomeService.check_connection();
        logger.info("Connected as id " + result.threadId);
        res.status(200).send({ message: "To test, press ALT + F4!" });
        result.release()
    } catch (error) {
        logger.error("Error connecting to database:", error);
        res.status(500).send({ message: "Error connecting to database" });
    };
});

module.exports = router;