const pool = require("../../db/conn");

const query_select_all = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM comanda_menu.cashier;`;

        pool.query(sql, (err, result) => {
            if (err) {

                reject(err);
                return;
            };

            resolve(result);
        });
    });
};

const query_select_by_id = (cashier_id) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT * 
            FROM comanda_menu.cashier c
            WHERE c.cashier_id =?;`;

        pool.query(sql, [cashier_id], (err, result) => {
            if (err) {

                reject(err);
                return;
            };

            resolve(result);
        });
    });
};

const query_select_where_status = (status) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT * 
            FROM comanda_menu.cashier c
            WHERE c.status = ?;`;

        pool.query(sql, [status], (err, result) => {
            if (err) {

                reject(err);
                return;
            };

            resolve(result);
        });
    });
};

const query_insert_cashier = () => {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO comanda_menu.cashier 
            (lenght_cheks, lenght_products, total_value, status)
            VALUES (?,?,?,?);`;

        const values = [0, 0, 0, 1];

        pool.query(sql, values, (err, result) => {
            if (err) {

                reject(err);
                return;
            };

            resolve(result);
        });
    });
};

const query_update_cashier_by_id = (cashier_id, data) => {
    return new Promise((resolve, reject) => {
        const sql = `
            UPDATE comanda_menu.cashier c
            SET c.lenght_cheks =?,
                c.lenght_products =?,
                c.total_value =?,
                c.status =?
            WHERE c.cashier_id =?;`;

        const values = [
            data.lenght_cheks,
            data.lenght_products,
            data.total_value,
            data.status,
            cashier_id,
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

const query_update_close_cashier = (cashier_id) => {
    return new Promise((resolve, reject) => {
        const sql = `
            UPDATE comanda_menu.cashier c
            SET c.status = 0 WHERE c.cashier_id = ?;`;

        pool.query(sql, [cashier_id], (err, result) => {
            if (err) {

                reject(err);
                return;
            };

            resolve(result);
        });
    });
};

const query_update_cashier_total_value = (cashier_id) => {
    return new Promise((resolve, reject) => {
        const sql = `
            UPDATE comanda_menu.cashier c
            SET
                c.lenght_cheks = (
                    SELECT COUNT(*)
                    FROM comanda_menu.check c
                    WHERE c.status = 0
                ),
                c.lenght_products = (
                    SELECT SUM(o.quantity)
                    FROM comanda_menu.order o
                    JOIN comanda_menu.check c
                        USING(check_id)
                    WHERE c.status = 0
                ),
                c.total_value = (
                    SELECT 
                        SUM(c.total_value)
                    FROM comanda_menu.check c
                    WHERE c.status = 0
                ),
                c.pix = (
                    SELECT 
                        SUM(c.total_value)
                    FROM comanda_menu.check c
                    WHERE c.status = 0 
                    AND c.pay_form = 'pix'
                ),
                c.debit = (
                    SELECT 
                        SUM(c.total_value)
                    FROM comanda_menu.check c
                    WHERE c.status = 0 
                    AND c.pay_form = 'debit'
                ),
                c.credit = (
                    SELECT 
                        SUM(c.total_value)
                    FROM comanda_menu.check c
                    WHERE c.status = 0 
                    AND c.pay_form = 'credit'
                ),
                c.cash = (
                    SELECT 
                        SUM(c.total_value)
                    FROM comanda_menu.check c
                    WHERE c.status = 0 
                    AND c.pay_form = 'cash'
                )
            WHERE c.cashier_id = ?;`;

        pool.query(sql, [cashier_id], (err, result) => {
            if (err) {

                reject(err);
                return;
            };

            resolve(result);
        });
    });
};

const query_delete_cashier_by_id = (cashier_id) => {
    return new Promise((resolve, reject) => {
        const sql = `
            DELETE FROM comanda_menu.cashier c
            WHERE c.cashier_id =?;`;

        pool.query(sql, [cashier_id], (err, result) => {
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
    query_select_where_status,
    query_update_cashier_by_id,
    query_update_close_cashier,
    query_update_cashier_total_value,
    query_insert_cashier,
    query_delete_cashier_by_id,
};