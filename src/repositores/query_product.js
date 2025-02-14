const pool = require("../../db/conn");

const query_select_all = () => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT *
            FROM comanda_menu.product p
            ORDER BY p.product_name;`;

        pool.query(sql, (err, result) => {
            if (err) {
                
                reject(err);
                return;
            };

            resolve(result);
        });
    });
};

const query_select_by_paginated = (value) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT 
                p.product_id,
	            p.product_name,
	            p.price,
	            p.category,
                p.description,
                p.stock,
                p.image,
                (SELECT COUNT(*) FROM comanda_menu.product) AS total_products
            FROM comanda_menu.product p
            ORDER BY p.product_name
            LIMIT ? OFFSET ?;`;

        pool.query(sql, value, (err, result) => {
            if (err) {
                
                reject(err);
                return;
            };

            resolve(result);
        });
    });
};

const query_select_by_id = (product_id) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT * 
            FROM comanda_menu.product p
            WHERE p.product_id =?;`;

        pool.query(sql, [product_id], (err, result) => {
            if (err) {
                
                reject(err);
                return;
            };

            resolve(result);
        });
    });
};

const query_select_by_stock = (stock) => {
    return new Promise((resolve, reject) => {
        const value = stock === "1" ? ">" : "=";
        const sql = `
            SELECT *
            FROM comanda_menu.product p
            WHERE p.stock ${value} 0
            ORDER BY p.product_name`;

        pool.query(sql, (err, result) => {
            if (err) {
                
                reject(err);
                return;
            };

            resolve(result);
        });
    });
};

const query_insert_product = (data) => {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO comanda_menu.product 
            (product_name, price, category, description, stock, image)
            VALUES (?,?,?,?,?,?);`;

        const values = [
            data.product_name,
            data.price,
            data.category,
            data.description,
            data.stock,
            data.image_buffer,
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

const query_update_product_by_id = (product_id, data) => {
    return new Promise((resolve, reject) => {
        const sql = `
            UPDATE comanda_menu.product p
            SET product_name = ?,
                p.price = ?,
                p.category = ?,
                p.description = ?,
                p.stock = ?,
                p.image = ?
            WHERE p.product_id = ?;`;

        const values = [
            data.product_name,
            data.price,
            data.category,
            data.description,
            data.stock,
            data.image_buffer,
            product_id,
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

const query_delete_product_by_id = (product_id) => {
    return new Promise((resolve, reject) => {
        const sql = `
            DELETE FROM comanda_menu.product p
            WHERE p.product_id =?;`;

        pool.query(sql, [product_id], (err, result) => {
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
    query_select_by_paginated,
    query_select_by_stock,
    query_select_by_id,
    query_update_product_by_id,
    query_insert_product,
    query_delete_product_by_id,
};