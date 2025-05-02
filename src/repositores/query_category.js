const pool = require("../../db/conn");

const query_select_all_category = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM comanda_menu.category;`;

        pool.query(sql, (err, result) => {
            if (err) {

                reject(err);
                return;
            };

            resolve(result);
        });
    });
};

const query_select_by_id = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT * FROM comanda_menu.category AS c
            WHERE c.category_id = ?;`;

        pool.query(sql, [id], (err, result) => {
            if (err) {
                reject(err);
                return;
            };

            resolve(result);
        });
    });
};

const query_insert_category = (data) => {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO comanda_menu.category (name_category, screen)
            VALUES (?,?);`;

        const value = [
            data.name_category,
            data.screen
        ];

        pool.query(sql, value, (err, result) => {
            if (err) {
                reject(err);
                return;
            };

            resolve(result);
        });
    });
};

const query_update_category = (id, data) => {
    return new Promise((resolve, reject) => {
        const sql = `
            UPDATE
            comanda_menu.category AS c
            SET c.name_category = ?, c.screen = ?
            WHERE c.category_id = ?;`;

        const value = [
            data.name_category,
            data.screen,
            id
        ];

        pool.query(sql, value, (err, result) => {
            if (err) {
                reject(err);
                return;
            };

            resolve(result);
        });
    });
};

const query_delete_category = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `
            DELETE FROM comanda_menu.category AS c
            WHERE c.category_id = ?;`;

        pool.query(sql, [id], (err, result) => {
            if (err) {
                reject(err);
                return;
            };

            resolve(result);
        });
    });
};

module.exports = {
    query_select_all_category,
    query_select_by_id,
    query_insert_category,
    query_update_category,
    query_delete_category
};