const {
    query_select_all, query_insert_setting,
    query_update_setting_by_id,
} = require("../repositores/query_setting");

class SettingService {
    async service_query_select_all() {
        try {
            const result = await query_select_all();
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_insert_setting(data) {
        try {
            const if_existis_setting = await query_select_all();

            if (if_existis_setting) {
                
                const setting_id =  if_existis_setting[0].setting_id;
                const result = await query_update_setting_by_id(setting_id, data);
                
                return result;
            };

            const result = await query_insert_setting(data);
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async service_query_update_setting_by_id(setting_id, data) {
        try {
            const result = await query_update_setting_by_id(setting_id, data);
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };
};

module.exports = new SettingService();