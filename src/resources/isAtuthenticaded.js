const AuthService = require("../services/authService");
const logger = require("../../logger");

const authentication = async (headers) => {

    const authHeader = headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return { message: "Token não fornecido ou inválido.", status: false };
    };

    const token = authHeader.split(" ")[1];

    try {
        const result = await AuthService.verify(token);
        return result;
    } catch (error) {
        logger.error("Error on verify token:", error);
    };
};

module.exports = authentication;