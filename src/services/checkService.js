const {
    query_select_all, query_select_by_id,
    query_delete_check_by_id, query_insert_check,
    query_update_check_by_id, query_update_close_check_by_id,
    query_select_all_where_status
} = require("../repositores/query_check");

class CheckService {
    async service_query_select_all() {
        try {
            const result = await query_select_all();
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_select_by_id(check_id) {
        try {
            const result = await query_select_by_id(check_id);
            if (!result) {
                return { status: 404, message: "check not found." };
            };
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

    async service_query_insert_check(data) {
        try {
            const result = await query_insert_check(data);
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_update_check_by_id(check_id, data) {
        try {
            const check_if_exists = await query_select_by_id(check_id);

            if (!check_if_exists[0].check_id) {
                return { status: 404, message: "check not found." };
            };

            const result = await query_update_check_by_id(check_id, data);
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_close_check_id(pay_form, check_id) {
        try {
            const check_if_exists = await query_select_by_id(check_id);

            if (!check_if_exists[0].check_id) {
                return { status: 404, message: "check not found." };
            };
            
            const result = await query_update_close_check_by_id(pay_form, check_id);
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_delete_check_by_id(check_id) {
        try {
            const check_if_exists = await query_select_by_id(check_id);

            if (!check_if_exists[0].check_id) {
                return { status: 404, message: "check not found." };
            };

            const result = await query_delete_check_by_id(check_id);
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

};

module.exports = new CheckService();