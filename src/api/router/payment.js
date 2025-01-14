const router = require("express").Router();
const logger = require("../../../logger");

const PaymentService = require("../../services/paymentService");

router.post("/process_payment/pix", async (req, res) => {
    const paymentData = req.body;

    try {
        const result = await PaymentService.createPaymentPix(paymentData);

        res.status(200).send(result.point_of_interaction.transaction_data);
    } catch (error) {
        logger.error(`Error create payment: ${error.message}`);
        res.status(500).send({ message: "Erro ao criar pagamento.", status: false });
    }
});

router.post("/process_payment", async (req, res) => {
    const paymentData = req.body;

    try {
        const result = await PaymentService.createPayment(paymentData);

        res.status(200).send(result.init_point);
    } catch (error) {
        logger.error(`Error create payment: ${error.message}`);
        res.status(500).send({ message: "Erro ao criar pagamento.", status: false });
    }
});

router.post("/get_preference", async (req, res) => {
    const { preference_id } = req.body;

    try {
        const result = await PaymentService.getPreference(preference_id);

        res.status(200).send(result);
    } catch (error) {
        logger.error(`Error fetching payment: ${error.message}`);
        res.status(500).send({ message: "Erro ao buscar pagamento.", status: false });
    };
});

module.exports = router;