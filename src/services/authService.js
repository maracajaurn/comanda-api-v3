const { compareSync } = require("bcrypt");
const { sign, verify } = require('jsonwebtoken');
const {
    query_auth_verify_if_user_exists,
    query_auth_verify_if_user_exists_by_id
 } = require("../repositores/query_auth");
require('dotenv').config();

class AuthService {
    async login(email, password) {
        try {
            const user = await query_auth_verify_if_user_exists(email);

            if (!user) {
                throw new Error("User not found");
            };

            const isPasswordValid = compareSync(password, user.password);

            if (!isPasswordValid) {
                throw new Error("Invalid credentials");
            };

            const token = sign({ id: user.user_id }, process.env.JWT_SECRET, {
                expiresIn: "1d"
            });

            return { token, user };
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async verify(token) {
        try {
            const decoded = verify(token, process.env.JWT_SECRET, { expiresIn: "1d" });
            const result = await query_auth_verify_if_user_exists_by_id(decoded.id);
            
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };
};

module.exports = new AuthService();
