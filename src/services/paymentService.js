const { MercadoPago, MercadoPagoConfig, Payment, Preference } = require("mercadopago");
const { v4: uuidv4 } = require('uuid');

const { query_select_by_id } = require("../repositores/query_payment");

class PaymentService {
    async createPaymentPix(data) {
        const {
            transaction_amount,
            description,
            payment_method_id,
            payer
        } = data;

        // TODO: Puxar o accessToken do db
        const client = new MercadoPagoConfig({
            accessToken: 'TEST-5076250759727026-011113-ffe9adfb145ddf3f8a2aac6f0bced704-215934195',
            options: {
                timeout: 5000,
                idempotencyKey: uuidv4()
            }
        });

        const payment = new Payment(client);

        const body = {
            transaction_amount,
            description,
            payment_method_id,
            payer
        };

        const result = await payment.create({ body });

        return result;
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

        const client = new MercadoPagoConfig({
            accessToken: 'TEST-5076250759727026-011113-ffe9adfb145ddf3f8a2aac6f0bced704-215934195',
            options: {
                timeout: 5000,
                idempotencyKey: uuidv4()
            }
        });

        const preference = new Preference(client);

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
        const client = new MercadoPagoConfig({ accessToken: "TEST-5076250759727026-011113-ffe9adfb145ddf3f8a2aac6f0bced704-215934195" });
        const preference = new Preference(client);
        const result = await preference.get({ preferenceId: id });

        return result;
    };
};

module.exports = new PaymentService();
