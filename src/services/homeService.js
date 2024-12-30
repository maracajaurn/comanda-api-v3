const { check_connection } = require("../repositores/query_home");

class HomeService {
    async check_connection() {
        try {
            const result = await check_connection();
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };
};

module.exports = new HomeService();