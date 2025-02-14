const { MercadoPagoConfig, Preference, Payment } = require("mercadopago");
const { v4: uuidv4 } = require('uuid');
require("dotenv").config();

class PaymentService {
    constructor() {
        this.client = new MercadoPagoConfig({
            accessToken: process.env.ACCESS_TOKEN_MERCADO_PAGO,
            options: {
                timeout: 5000,
                idempotencyKey: uuidv4()
            }
        });
    };

    async createPayment(data) {
        const preference = new Preference(this.client);

        const result = await preference.create({ body: data });

        return result;
    };

    async getPreference(payment_id) {
        const preference = new Payment(this.client)

        const result = await preference.get({ id: payment_id });

        return result;
    };
};

module.exports = new PaymentService();
