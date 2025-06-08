const { MercadoPagoConfig, Payment } = require("mercadopago");
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
        const payment = new Payment(this.client);
        const result = await payment.create({
            body: data,
            requestOptions: {
                idempotencyKey: uuidv4()
            },
        });

        return result;
    };

    async getPayment(id) {
        const payment = new Payment(this.client)
        const result = await payment.get({ id });
        return result;
    };
};

module.exports = new PaymentService();
