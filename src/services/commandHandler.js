class CommandHandler {
    constructor(telegramApi) {
        this.telegramApi = telegramApi;
    }

    async process(chatId, text) {
        if (text === "/start") {
            await this.telegramApi.sendMessage(chatId, 
                "Привет! Я помогу тебе узнать текущие курсы валют." + 
                "\nНапиши /currency для получения списка доступных валют.");
        } else {
            await this.telegramApi.sendMessage(chatId, "Ой! Что-то пошло не так." + 
                "\nУбедись, что ввел валютную пару в формате USD-EUR, или попробуй позже.");
        }
    }
}

module.exports = CommandHandler;
