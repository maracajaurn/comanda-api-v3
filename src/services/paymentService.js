const { MercadoPagoConfig, Payment, Preference } = require("mercadopago");
const { v4: uuidv4 } = require('uuid');

class PaymentService {
    constructor() {
        this.client = new MercadoPagoConfig({
            accessToken: '',
            options: {
                timeout: 5000,
                idempotencyKey: uuidv4()
            }
        });
    };

    async createPaymentPix(data) {
        const {
            transaction_amount,
            description,
            payment_method_id,
            payer
        } = data;

        const payment = new Payment(this.client);

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
