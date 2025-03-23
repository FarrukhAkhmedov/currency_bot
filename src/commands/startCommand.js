const Command = require('./command')

class StartCommand extends Command{
    async greet(chatId){
        await this.telegramApi.sendMessage(chatId, 
            "Привет! Я помогу тебе узнать текущие курсы валют." + 
            "\nНапиши /currency для получения списка доступных валют."
        )
    }
}

module.exports = StartCommand

