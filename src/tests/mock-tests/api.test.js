const CommandHandler = require('../../services/commandHandler')

const mockTelegramApi = {
    sendMessage: jest.fn()
};

const mockCurrencyApi = {
    getExchangeRate: jest.fn()
};



describe('Mock-тесты API запросов', () => {
    let commandHandler

    beforeEach(() => {

        commandHandler = new CommandHandler(mockTelegramApi, mockCurrencyApi)
        jest.clearAllMocks();
        
    });

    test('Должен отправлять курс валют при успешном запросе', async () => {
        mockCurrencyApi.getExchangeRate.mockResolvedValue({ EUR: 0.85 });
        await commandHandler.process(1234, "USD-EUR");
        expect(mockTelegramApi.sendMessage).toHaveBeenCalledWith(1234, "Текущий курс USD к EUR: 0.85");
    });

    test('Должен отправлять сообщение об ошибке при сбое API', async () => {
        mockCurrencyApi.getExchangeRate.mockRejectedValue( Error());
        await commandHandler.process(12345, "USD-EUR");
        expect(mockTelegramApi.sendMessage).toHaveBeenCalledWith(12345, "Ой! Что-то пошло не так." + 
            "\nУбедись, что ввел валютную пару в формате USD-EUR, или попробуй позже.");
    });

    test('Должен отправлять сообщение об ошибке при некорректном вводе', async () => {
        await commandHandler.process(12345, 'USDEUR');  
    
        expect(mockTelegramApi.sendMessage).toHaveBeenCalledWith(
            12345,
            "Ой! Что-то пошло не так.\nУбедись, что ввел валютную пару в формате USD-EUR, или попробуй позже."
        );
    });
    
    
    
});