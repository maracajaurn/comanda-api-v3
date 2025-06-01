const router = require("express").Router();
const logger = require("../../../logger");

const PaymentService = require("../../services/paymentService");

router.post("/process_payment", async (req, res) => {
    const paymentData = req.body;

    try {
        const result = await PaymentService.createPayment(paymentData);

        res.status(200).send(result);
    } catch (error) {
        logger.error(`Error create payment: ${error.message}`);
        res.status(500).send({ message: "Erro ao criar pagamento.", status: false });
    };
});

router.post("/payment_status", async (req, res) => {
    const { id } = req.body;

    try {
        const result = await PaymentService.getPayment(id);

        res.status(200).send(result);
    } catch (error) {
        logger.error(`Error fetching payment: ${error.message}`);
        res.status(500).send({ message: "Erro ao buscar pagamento.", status: false });
    };
});

module.exports = router;
