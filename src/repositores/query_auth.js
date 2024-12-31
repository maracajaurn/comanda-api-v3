const pool = require("../../db/conn");

const query_auth_verify_if_user_exists = (email) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT * FROM comanda_menu.user u
            WHERE u.email = ?`;
        pool.query(sql, [email], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result[0]); // Retorna o usuário diretamente
            };
        });
    });
};

module.exports = {
    query_auth_verify_if_user_exists,
};
