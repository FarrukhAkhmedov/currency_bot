const Command = require('./command')



class CurrencyCommand extends Command{
    constructor(telegramApi, currencyApi){
        super(telegramApi)
        this.currencyApi = currencyApi
    }

    async getCurrencyBase(chatId){
        this.telegramApi.sendMessage(chatId, "Введи валютную пару в формате USD-EUR, чтобы узнать курс обмена.")
    }

    async exchange(base){
        await this.currencyApi.getExchangeRate(base)
    }
}

module.exports = CurrencyCommand