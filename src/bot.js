require('dotenv').config();
const TelegramApi = require('./services/api/telegramApi');
const WebhookServer = require('./services/webhookServer');
const CommandHandler = require('./services/commandHandler');
const CurrencyApi = require('./services/api/currencyApi')

class Bot {
    constructor() {
        this.telegramApi = new TelegramApi(process.env.TELEGRAM_ACCESS_TOKEN);
        this.currencyApi = new CurrencyApi(process.env.EXCHANGE_ACCESS_TOKEN)
        this.commandHandler = new CommandHandler(this.telegramApi, this.currencyApi);
        this.server = new WebhookServer(process.env.PORT, this.handleUpdate.bind(this));
    }

    async launch() {
        try {
            await this.telegramApi.setWebhook(process.env.WEBHOOK_URL);
            this.server.start();
        } catch (error) {
            console.error("Ошибка запуска бота:", error);
        }
    }

    async handleUpdate(update) {
        console.log("Получено сообщение от Telegram:", update);
        if (!update.message || !update.message.text) return;

        const chatId = update.message.chat.id;
        const text = update.message.text.trim();

        await this.commandHandler.process(chatId, text);
    }
}

module.exports = Bot
