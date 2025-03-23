const Command = require('./command')



class CurrencyCommand extends Command{
    constructor(telegramApi, currencyApi){
        super(telegramApi)
        this.currencyApi = currencyApi
    }

    async inform(chatId){
        await this.telegramApi.sendMessage(chatId, "Введи валютную пару в формате USD-EUR, чтобы узнать курс обмена.")
    }

    async exchange(text, chatId){
        const base = text.split('-')[0].trim()
        const currency = text.split('-')[1].trim()
        
        const rate = await this.currencyApi.getExchangeRate(base)

        return this.telegramApi.sendMessage(chatId, `Текущий курс ${base} к ${currency}: ${rate[currency]}`)

    }

}

module.exports = CurrencyCommand