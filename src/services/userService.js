const {
    query_select_all, query_select_by_id,
    query_delete_user_by_id, query_insert_user,
    query_update_user_by_id,
} = require("../repositores/query_user");

class UserService {
    async service_query_select_all() {
        try {
            const result = await query_select_all();
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_select_by_id(user_id) {
        try {
            const result = await query_select_by_id(user_id);
            if (!result) {
                return { status: 404, message: "user not found." };
            };
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_insert_user(data) {
        try {
            const result = await query_insert_user(data);
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_update_user_by_id(user_id, data) {
        try {
            const user_if_exists = await query_select_by_id(user_id);

            if (!user_if_exists[0].user_id) {
                return { status: 404, message: "user not found." };
            };

            const result = await query_update_user_by_id(user_id, data);
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_delete_user_by_id(user_id) {
        try {
            const user_if_exists = await query_select_by_id(user_id);

            if (!user_if_exists[0].user_id) {
                return { status: 404, message: "user not found." };
            };

            const result = await query_delete_user_by_id(user_id);
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };
};

module.exports = new UserService();