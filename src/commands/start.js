const Command = require('./command')

class Start extends Command{
    async greet(chatId){
        await this.telegramApi.sendMessage(chatId, 
            `Привет! Я помогу тебе узнать текущие курсы валют. 
            Напиши /currency для получения списка доступных валют.`
        )
    }
}

module.exports = Start

