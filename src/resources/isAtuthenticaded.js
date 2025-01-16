const AuthService = require("../services/authService");
const logger = require("../../logger");

class Autenticarion {
    async authenticationUser(headers) {
        
        const authHeader = headers.authorization;
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return { message: "Token não fornecido ou inválido.", status: false };
        };
        
        const token = authHeader.split(" ")[1];
        
        try {
            const result = await AuthService.verifyUser(token);
            return result;
        } catch (error) {
            logger.error("Error on verify token:", error);
        };
    };

    async authenticationClient(headers) {

        const client = headers.is_client;
        const authHeader = headers.authorization;
    
        if (!client) {
            return { message: "Cliente não informado.", status: false };
        };

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return { message: "Token não fornecido ou inválido.", status: false };
        };

        const token = authHeader.split(" ")[1];

        try {
            const result = await AuthService.verifyClient(token, client);
            return result;
        } catch (error) {
            logger.error("Error on verify token:", error);
        };
    };

};

module.exports = new Autenticarion;