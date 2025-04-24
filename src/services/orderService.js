const {
    query_select_all, query_select_by_id, query_select_all_created_online,
    query_select_all_from_barmen, query_select_all_from_cozinha,
    query_select_all_where_status, query_select_all_where_check_id,

    query_insert_order,
    query_delete_order_by_id,

    query_update_order_by_id, query_update_total_value_order_by_check_id,
    query_update_stock_product_by_id,

    query_length_products_ordered,
    query_total_value_products_ordered
} = require("../repositores/query_order");

class OrderService {
    async service_query_select_all() {
        try {
            const result = await query_select_all();
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_select_by_id(order_id, check_id) {
        try {
            const result = await query_select_by_id(order_id);
            if (!result) {
                return { status: 404, message: "order not found." };
            };
            await query_update_total_value_order_by_check_id(check_id);
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_select_all_where_status(status) {
        try {
            const result = await query_select_all_where_status(status);
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_select_all_from_barmen() {
        try {
            const result = await query_select_all_from_barmen();
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_select_all_from_cozinha() {
        try {
            const result = await query_select_all_from_cozinha();
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_select_all_where_check_id(check_id) {
        try {
            await query_update_total_value_order_by_check_id(check_id);
            const result = await query_select_all_where_check_id(check_id);
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_select_all_created_online() {
        try {
            const result = await query_select_all_created_online();
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_insert_order(data, check_id, new_stock) {
        try {
            const result = await query_insert_order(data);

            await query_update_total_value_order_by_check_id(check_id);

            new_stock.map(async (item) => {
                await query_update_stock_product_by_id(item);
            });

            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_update_order_by_id(order_id, data, check_id, new_stock) {
        try {
            const order_if_exists = await query_select_by_id(order_id);

            if (!order_if_exists[0].order_id) {
                return { status: 404, message: "Order not found." };
            };

            const result = await query_update_order_by_id(order_id, data);

            await query_update_total_value_order_by_check_id(check_id);

            if (new_stock) {
                await query_update_stock_product_by_id(new_stock);
            };
            
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_delete_order_by_id(order_id, check_id, new_stock) {
        try {
            const order_if_exists = await query_select_by_id(order_id);

            if (!order_if_exists[0].order_id) {
                return { status: 404, message: "order not found." };
            };

            const result = await query_delete_order_by_id(order_id);
            await query_update_total_value_order_by_check_id(check_id);
            await query_update_stock_product_by_id(new_stock);
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_length_products_ordered() {
        try {
            const result = await query_length_products_ordered();
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_total_value_products_ordered() {
        try {
            const result = await query_total_value_products_ordered();
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };
};

module.exports = new OrderService();