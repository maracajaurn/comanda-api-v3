const { query_select_all_category, query_insert_category,
     query_select_by_id, query_update_category,
     query_delete_category
} = require("../repositores/query_category");

class CategoryService {
    async service_query_select_all() {
        try {
            const result = await query_select_all_category();
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_select_by_id(id) {
        try {
            const result = await query_select_by_id(id);
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_insert(data) {
        try {
            const result = await query_insert_category(data);
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_update(id, data) {
        try {
            const result = await query_update_category(id, data);
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_delete(id) {
        try {
            const result = await query_delete_category(id);
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };
};

module.exports = new CategoryService();