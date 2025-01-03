const pool = require("../../db/conn");

const query_select_all = () => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT 
                o.order_id,
                c.name_client,
                p.product_id,
                p.product_name,
                o.quantity,
                o.status,
                o.created_at,
                c.pay_form
            FROM comanda_menu.check as c
            JOIN comanda_menu.order as o
                ON c.check_id = o.check_id
            JOIN comanda_menu.product p
                ON p.product_id = o.product_id
            ORDER BY o.created_at;`;

        pool.query(sql, (err, result) => {
            if (err) {

                reject(err);
                return;
            };

            resolve(result);
        });
    });
};

const query_select_by_id = (order_id) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT 
                o.order_id,
                c.name_client,
                p.product_id,
                p.product_name,
                o.quantity,
                o.status,
                o.created_at,
                c.pay_form
            FROM comanda_menu.check as c
            JOIN comanda_menu.order as o
                ON c.check_id = o.check_id
            JOIN comanda_menu.product p
                ON p.product_id = o.product_id
            WHERE o.order_id =?;`;

        pool.query(sql, [order_id], (err, result) => {
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
            SELECT 
                o.order_id,
                c.name_client,
                c.pay_form,
                c.check_id,
                p.product_id,
                p.product_name,
                p.category,
                o.quantity,
                o.status,
                o.obs,
                o.created_at
            FROM comanda_menu.order as o
            JOIN comanda_menu.check as c
                ON c.check_id = o.check_id
            JOIN comanda_menu.product p
                ON p.product_id = o.product_id
            WHERE o.status = ?
            ORDER BY o.created_at;`;

        pool.query(sql, [status], (err, result) => {
            if (err) {

                reject(err);
                return;
            };

            resolve(result);
        });
    });
};

const query_select_all_from_barmen = () => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT 
                o.order_id,
                c.name_client,
                c.pay_form,
                c.check_id,
                p.product_id,
                p.product_name,
                p.category,
                o.quantity,
                o.status,
                o.obs,
                o.created_at
            FROM comanda_menu.order as o
            JOIN comanda_menu.check as c
                ON c.check_id = o.check_id
            JOIN comanda_menu.product p
                ON p.product_id = o.product_id
            WHERE o.status = 1
            AND p.category = 'Drink'
            ORDER BY o.created_at;`;

        pool.query(sql, (err, result) => {
            if (err) {

                reject(err);
                return;
            };

            resolve(result);
        });
    });
}

const query_select_all_from_cozinha = () => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT 
                o.order_id,
                c.name_client,
                c.pay_form,
                c.check_id,
                p.product_id,
                p.product_name,
                p.category,
                o.quantity,
                o.status,
                o.obs,
                o.created_at
            FROM comanda_menu.order as o
            JOIN comanda_menu.check as c
                ON c.check_id = o.check_id
            JOIN comanda_menu.product p
                ON p.product_id = o.product_id
            WHERE o.status = 1
            AND (
                p.category = 'Porcao'
                OR p.category = 'Petisco'
                OR p.category = 'Refeicao'
                OR p.category = 'Salada'
            )
            ORDER BY o.created_at;`;

        pool.query(sql, (err, result) => {
            if (err) {

                reject(err);
                return;
            };

            resolve(result);
        });
    });
}

const query_select_all_where_check_id = (check_id) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT
                o.order_id,
                c.name_client,
                p.product_name,
                p.category,
                o.quantity,
                o.status,
                o.obs,
                o.created_at,
                c.pay_form,
                SUM(p.price * o.quantity) AS total_price
            FROM comanda_menu.check AS c
            JOIN comanda_menu.order AS o
                ON c.check_id = o.check_id
            JOIN comanda_menu.product AS p
                ON p.product_id = o.product_id
            WHERE c.check_id = ?
            GROUP BY
                o.order_id,
                c.name_client,
                p.product_name,
                o.quantity,
                o.status,
                o.created_at,
                c.pay_form;`;

        pool.query(sql, [check_id], (err, result) => {
            if (err) {

                reject(err);
                return;
            };

            resolve(result);
        });
    });
};

const query_insert_order = (data) => {

    return new Promise((resolve, reject) => {

        const placeholders = data.map(() => '(?, ?, ?, ?)').join(', ');

        const sql = `
            INSERT INTO comanda_menu.order 
            (check_id, product_id, quantity, obs)
            VALUES ${placeholders};`;

        const values = data.flat();

        pool.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
                return;
            };

            resolve(result);
        });
    });
};

const query_update_order_by_id = (order_id, data) => {
    return new Promise((resolve, reject) => {
        const sql = `
            UPDATE comanda_menu.order o
            SET o.quantity = ?,
                o.status = ?,
                o.obs = ?
            WHERE o.order_id = ?;`;

        const values = [
            data.quantity,
            data.status,
            data.obs,
            order_id,
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

const query_update_total_value_order_by_check_id = (check_id) => {
    return new Promise((resolve, reject) => {
        const sql = `
            UPDATE comanda_menu.check c
            SET c.total_value = (
                SELECT SUM(o.quantity * p.price)
                FROM comanda_menu.order o
                JOIN comanda_menu.product p
                    ON o.product_id = p.product_id
                WHERE o.check_id = c.check_id
            )
            WHERE c.check_id = ?;`;

        pool.query(sql, [check_id], (err, result) => {
            if (err) {

                reject(err);
                return;
            };

            resolve(result);
        });
    });
};

const query_delete_order_by_id = (order_id) => {
    return new Promise((resolve, reject) => {
        const sql = `
            DELETE FROM comanda_menu.order o
            WHERE o.order_id =?;`;

        pool.query(sql, [order_id], (err, result) => {
            if (err) {

                reject(err);
                return;
            };

            resolve(result);
        });
    });
};

const query_length_products_ordered = () => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT SUM(o.quantity) AS quantity_product_ordered
            FROM comanda_menu.order o;`;

        pool.query(sql, (err, result) => {
            if (err) {

                reject(err);
                return;
            };

            resolve(result);
        });
    });
};

const query_total_value_products_ordered = () => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT
                SUM(o.quantity * p.price) AS total_value
            FROM comanda_menu.order o
            JOIN comanda_menu.product p
                ON o.product_id = p.product_id;`;

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
    query_select_all_where_status,
    query_select_all_where_check_id,
    query_select_all_from_barmen,
    query_select_all_from_cozinha,

    query_insert_order,
    query_update_order_by_id,
    query_update_total_value_order_by_check_id,
    query_delete_order_by_id,

    query_length_products_ordered,
    query_total_value_products_ordered
};