const pool = require("../../db/conn");

const query_select_all = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM comanda_menu.setting LIMIT 1;`;

        pool.query(sql, (err, result) => {
            if (err) {
                
                reject(err);
                return;
            };

            resolve(result);
        });
    });
};

const query_insert_setting = (data) => {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO comanda_menu.setting 
            (estabishment_name, serveiceChange, service_change_percentage, staimage_pixtus, color)
            VALUES (?,?,?,?,?);`;

        const values = [
            data.estabishment_name,
            data.serveiceChange,
            data.service_change_percentage,
            data.image_pix,
            data.color,
        ];

        pool.query(sql, values, (err, result) => {
            if (err) {
                
                reject(err);
                return;
            };

            resolve(result);
        });
    });
};

const query_update_setting_by_id = (setting_id, data) => {
    return new Promise((resolve, reject) => {
        const sql = `
            UPDATE comanda_menu.setting s
            SET s.estabishment_name =?,
                s.serveice_change =?,
                s.service_change_percentage =?,
                s.image_pix =?,
                s.color =?,
                s.service_change_printer =?,
                s.printer_name =?
            WHERE s.setting_id =?;`;

        const values = [
            data.estabishment_name,
            data.serveice_change,
            data.service_change_percentage,
            data.image_buffer,
            data.color,
            data.service_change_printer,
            data.printer_name,
            setting_id,
        ];

        pool.query(sql, values, (err, result) => {
            if (err) {
                
                reject(err);
                return;
            };

            resolve(result);
        });
    });
};

module.exports = {
    query_select_all,
    query_update_setting_by_id,
    query_insert_setting,
};