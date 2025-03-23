const Command = require("./command");

class ErrorCommand extends Command{

    async unknownCommand(chatId){
        await this.telegramApi.sendMessage(chatId, 
            "Ой! Что-то пошло не так." + 
            "\nУбедись, что ввел валютную пару в формате USD-EUR, или попробуй позже.");
    }
}

module.exports = ErrorCommand