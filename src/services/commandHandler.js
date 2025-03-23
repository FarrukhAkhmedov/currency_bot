const CurrencyCommand = require('../commands/currencyCommand');
const StartCommand = require('../commands/startCommand')

class CommandHandler {
    constructor(telegramApi, currencyApi) {

        this.start = new StartCommand(telegramApi)
        this.currency = new CurrencyCommand(telegramApi, currencyApi)
    }

    async process(chatId, text) {
        switch(text){
            case "/start":
                await this.start.greet(chatId)
                break;
            case "/currency":
                await this.currency.getCurrencyBase(chatId)
                break;
            default:
                await this.telegramApi.sendMessage(chatId, 
                    "Ой! Что-то пошло не так." + 
                    "\nУбедись, что ввел валютную пару в формате USD-EUR, или попробуй позже.");
        
        }
    }
}


module.exports = CommandHandler
