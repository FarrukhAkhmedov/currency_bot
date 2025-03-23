const HttpHandler = require("./httpHandler");
require('dotenv').config()

class TelegramApi extends HttpHandler {
    constructor(accessToken) {
        super(`https://api.telegram.org/bot${accessToken}`);
        this.webhookUrl = process.env.WEBHOOK_URL;
    }

    async setWebhook() {
        try {
            const response = await this.api.post(`/setWebhook`, { url: this.webhookUrl });
            console.log("Webhook установлен:", response.data);
        } catch (error) {
            console.error("Ошибка установки Webhook:", error.response?.data || error.message);
        }
    }

    async sendMessage(chatId, text) {
        try {
            await this.api.post("/sendMessage", { chat_id: chatId, text });
        } catch (error) {
            console.error("Ошибка отправки сообщения:", error.message);
        }
    }
}

module.exports = TelegramApi;
