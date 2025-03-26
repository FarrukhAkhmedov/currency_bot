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
        try{
            const base = text.split('-')[0].trim()
            const currency = text.split('-')[1].trim()
            
            const rate = await this.currencyApi.getExchangeRate(base)
    
            await this.telegramApi.sendMessage(chatId, `Текущий курс ${base} к ${currency}: ${rate[currency]}`)
        } catch(error){
            console.error(error);
            await this.telegramApi.sendMessage(chatId, 
                "Ой! Что-то пошло не так." + 
                "\nУбедись, что ввел валютную пару в формате USD-EUR, или попробуй позже.")
            
        }

    }

}

module.exports = CurrencyCommand