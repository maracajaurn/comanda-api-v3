const { MercadoPagoConfig, Preference } = require("mercadopago");
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
        const {
            transaction_amount,
            description,
            payment_method_id,
            payer,
            back_urls,
            auto_return,
            items,
            payment_methods
        } = data;

        const preference = new Preference(this.client);

        const body = {
            transaction_amount,
            description,
            payment_method_id,
            payer,
            back_urls,
            auto_return,
            items,
            payment_methods
        };

        const result = await preference.create({ body });

        return result;
    };

    async getPreference(id) {
        const preference = new Preference(this.client);
        const result = await preference.get({ preferenceId: id });

        return result;
    };
};

module.exports = new PaymentService();
