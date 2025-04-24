const pool = require("../../db/conn");

const query_select_all = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM comanda_menu.check;`;

        pool.query(sql, (err, result) => {
            if (err) {

                reject(err);
                return;
            };

            resolve(result);
        });
    });
};

const query_select_by_id = (check_id) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT * 
            FROM comanda_menu.check c
            WHERE c.check_id =?;`;

        pool.query(sql, [check_id], (err, result) => {
            if (err) {

                reject(err);
                return;
            };

            resolve(result);
        });
    });
};

const query_select_all_where_status = (status) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT *
            FROM comanda_menu.check c
            WHERE c.status =?;`;

        pool.query(sql, [status], (err, result) => {
            if (err) {

                reject(err);
                return;
            };

            resolve(result);
        });
    });
};

const query_select_order_by_id = () => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT c.check_id
            FROM comanda_menu.check c
            ORDER BY c.check_id DESC
            LIMIT 1;
        `;

        pool.query(sql, (err, result) => {
            if (err) {

                reject(err);
                return;
            };

            resolve(result);
        });
    });
};

const query_insert_check = (data) => {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO comanda_menu.check 
            (name_client, obs, cashier_id, created_for)
            VALUES (?,?,?,?);`;

        const values = [
            data.name_client,
            data.obs,
            data.cashier_id,
            data.created_for,
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

const query_insert_check_closed = (data) => {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO comanda_menu.check 
            (name_client, obs, cashier_id, status, created_for)
            VALUES (?,?,?,?,?);`;

        const values = [
            data.name_client,
            data.obs,
            data.cashier_id,
            data.status,
            data.created_for,
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

const query_update_check_by_id = (check_id, data) => {
    return new Promise((resolve, reject) => {
        const sql = `
            UPDATE comanda_menu.check c
            SET c.name_client =?,
                c.obs =?,
                c.total_value =?,
                c.status =?,
                c.pay_form =?,
                c.cashier_id =?
            WHERE c.check_id =?;`;

        const values = [
            data.name_client,
            data.obs,
            data.total_value,
            data.status,
            data.pay_form,
            data.cashier_id,
            check_id,
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

const query_update_close_check_by_id = (pay_form, check_id) => {
    return new Promise((resolve, reject) => {
        const sql = `
            UPDATE comanda_menu.check c
            SET status = 0, pay_form = ?
            WHERE c.check_id = ?;`;

        pool.query(sql, [pay_form, check_id], (err, result) => {
            if (err) {

                reject(err);
                return;
            };

            resolve(result);
        });
    });
};

const query_delete_check_by_id = (check_id) => {
    return new Promise((resolve, reject) => {
        const sql = `
            DELETE FROM comanda_menu.check c
            WHERE c.check_id =?;`;

        pool.query(sql, [check_id], (err, result) => {
            if (err) {

                reject(err);
                return;
            };

            resolve(result);
        });
    });
};

const query_delete_all_check = () => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM comanda_menu.check`;

        pool.query(sql, (err, result) => {
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
    query_select_by_id,
    query_select_order_by_id,
    query_select_all_where_status,

    query_insert_check,
    query_insert_check_closed,

    query_update_check_by_id,
    query_update_close_check_by_id,
    
    query_delete_check_by_id,
    query_delete_all_check,
};