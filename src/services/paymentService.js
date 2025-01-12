const { MercadoPagoConfig, Payment, Preference } = require("mercadopago");

class PaymentService {
    async createPaymentPix(data) {
        const { transaction_amount, description, payment_method_id, payer, idempotencyKey } = data;

        // TODO: Puxar o accessToken do db
        const client = new MercadoPagoConfig({
            accessToken: '',
            options: {
                timeout: 5000,
                idempotencyKey: idempotencyKey
            }
        });

        const payment = new Payment(client);

        const body = {
            transaction_amount,
            description,
            payment_method_id,
            payer
        };

        console.log(body);

        const result = await payment.create({ body });

        return result;
    };

    async createPayment(data) {
        const { transaction_amount, description, payment_method_id, payer, back_urls, auto_return, items, idempotencyKey } = data;

        // TODO: Puxar o accessToken do db
        const client = new MercadoPagoConfig({
            accessToken: '',
            options: {
                timeout: 5000,
                idempotencyKey: idempotencyKey
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
            payment_methods: {
                installments: 1,
                default_installments: 1,
            }
        };

        console.log(body);

        const result = await preference.create({ body });

        return result;
    };
};

module.exports = new PaymentService();
