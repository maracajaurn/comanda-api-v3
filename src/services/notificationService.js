const admin = require("firebase-admin");
const path = require("path");
const serviceAccount = require(path.join(__dirname, "../../notify-comanda-avante-firebase-adminsdk.json"));

class NotificationService {
    constructor() {
        this.admin = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    };

    async notifyUser(payload) {
        const result = await this.admin.messaging().send(payload);
        return result;
    };
};

module.exports = new NotificationService();