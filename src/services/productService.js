const {
    query_select_all, query_select_by_paginated,
    query_select_by_id, query_select_by_stock, query_select_by_name,
    query_insert_product,
    query_delete_product_by_id, 
    query_update_product_by_id, 
} = require("../repositores/query_product");

class ProductService {
    async service_query_select_all() {
        try {
            const result = await query_select_all();
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_select_by_paginated(limit, page) {
        const value = [Number(limit), (Number(page) - 1) * Number(limit)];

        try {
            const result = await query_select_by_paginated(value);
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_select_by_id(product_id) {
        try {
            const result = await query_select_by_id(product_id);
            if (!result) {
                return { status: 404, message: "Product not found." };
            };
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_select_by_stock(status) {
        try {
            const result = await query_select_by_stock(status);
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_select_by_name(name_product) {
        try {
            const result = await query_select_by_name(name_product);
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_insert_product(data) {
        try {
            const result = await query_insert_product(data);
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_update_product_by_id(product_id, data) {
        try {
            const check_if_exists = await query_select_by_id(product_id);

            if (!check_if_exists[0].product_id) {
                return { status: 404, message: "Product not found." };
            };

            const result = await query_update_product_by_id(product_id, data);
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_delete_product_by_id(product_id) {
        try {
            const check_if_exists = await query_select_by_id(product_id);

            if (!check_if_exists[0].product_id) {
                return { status: 404, message: "Product not found." };
            };

            const result = await query_delete_product_by_id(product_id);
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };
};

module.exports = new ProductService();