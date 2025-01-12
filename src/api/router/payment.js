const router = require("express").Router();
const logger = require("../../../logger");

const PaymentService = require("../../services/paymentService");

router.post("/process_payment/pix", async (req, res) => {
    const paymentData = req.body;

    try {
        const result = await PaymentService.createPaymentPix(paymentData);

        res.status(200).send(result.point_of_interaction.transaction_data);
    } catch (error) {
        logger.error(`Error fetching order: ${error.message}`);
        res.status(500).send({ message: "Erro ao buscar o pedido.", status: false });
    }
});

router.post("/process_payment", async (req, res) => {
    const paymentData = req.body;

    try {
        const result = await PaymentService.createPayment(paymentData);

        res.status(200).send(result.init_point);
    } catch (error) {
        logger.error(`Error fetching order: ${error.message}`);
        res.status(500).send({ message: "Erro ao buscar o pedido.", status: false });
    }
});

module.exports = router;