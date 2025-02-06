const {
    query_select_all, query_select_by_id,
    query_delete_cashier_by_id, query_insert_cashier,
    query_update_cashier_by_id, query_update_close_cashier,
    query_update_cashier_total_value,
    query_select_where_status
} = require("../repositores/query_cashier");

class CashierService {
    async service_query_select_all() {
        try {
            const result = await query_select_all();
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_select_where_status(status) {
        try {
            const result = await query_select_where_status(status);

            if (!result[0]) {
                await this.service_query_insert_cashier();

                const result = await query_select_where_status(status);
                return result;
            };
            await query_update_cashier_total_value(result[0].cashier_id);
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_select_by_id(cashier_id) {
        try {
            const result = await query_select_by_id(cashier_id);

            if (!result) {
                return { status: 404, message: "Cashier not found." };
            };

            await query_update_cashier_total_value(cashier_id);
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_insert_cashier() {
        try {
            const result = await query_insert_cashier();
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_update_cashier_by_id(cashier_id, data) {
        try {
            const check_if_exists = await query_select_by_id(cashier_id);

            if (!check_if_exists[0].cashier_id) {
                return { status: 404, message: "Cashier not found." };
            };

            const result = await query_update_cashier_by_id(cashier_id, data);
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_update_close_cashier(cashier_id) {
        try {
            const check_if_exists = await query_select_by_id(cashier_id);

            if (!check_if_exists[0].cashier_id) {
                return { status: 404, message: "Cashier not found." };
            };

            const result = await query_update_close_cashier(cashier_id);
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_delete_cashier_by_id(cashier_id) {
        try {
            const check_if_exists = await query_select_by_id(cashier_id);

            if (!check_if_exists[0].cashier_id) {
                return { status: 404, message: "Cashier not found." };
            };

            const result = await query_delete_cashier_by_id(cashier_id);
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };
};

module.exports = new CashierService();