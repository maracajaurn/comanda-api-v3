const pool = require("../../db/conn");

const check_connection = async () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            reject(err);
            resolve(connection);
        });
    });
};

module.exports = {
    check_connection
};