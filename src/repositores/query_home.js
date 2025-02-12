const pool = require("../../db/conn");

const check_connection = async () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {

                reject(err);
                return;
            };

            resolve(connection);
        });
    });
};

module.exports = {
    check_connection
};