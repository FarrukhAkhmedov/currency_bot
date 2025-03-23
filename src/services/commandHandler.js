const CurrencyCommand = require('../commands/currencyCommand');
const StartCommand = require('../commands/startCommand')
const ErrorCommand = require('../commands/errorCommand')

class CommandHandler {
    constructor(telegramApi, currencyApi) {
        this.telegramApi = telegramApi

        this.start = new StartCommand(this.telegramApi)
        this.currency = new CurrencyCommand(this.telegramApi, currencyApi)
        this.error = new ErrorCommand(this.telegramApi)
    }

    async process(chatId, text) {
        const currencyPairRegExp = /^[A-Z]{3}-[A-Z]{3}$/
        switch(text){
            case "/start":
                await this.start.greet(chatId)
                break;
            case "/currency":
                await this.currency.inform(chatId)
                break;
            default:
                if(currencyPairRegExp.test(text)){
                    return this.currency.exchange(text, chatId)
                }
                await this.error.unknownCommand(chatId)
        }
    }
}


module.exports = CommandHandler
