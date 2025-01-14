const pool = require("../../db/conn");

const query_select_by_id = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT *
            FROM comanda_menu.payment p
            WHERE p.payment_id = ?`;

        pool.query(sql, [id], (err, result) => {
            if (err) {

                reject(err);
                return;
            };

            resolve(result);
        });
    });
};

const query_insert_payment = (data) => {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO comanda_menu.payment
                (
                    payment_id,
                    action,
                    api_version,
                    data_id,
                    date_created,
                    live_mode,
                    payment_type,
                    user_id
                )
            VALUES (?,?,?,?,?,?,?,?)`;

            const values = [
                data.id,
                data.action,
                data.api_version,
                data.data.id,
                data.date_created,
                data.live_mode,
                data.type,
                data.user_id,
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
    query_select_by_id,
    query_insert_payment
};