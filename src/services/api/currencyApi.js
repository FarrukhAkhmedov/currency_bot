const HttpHandler = require("./httpHandler")

class ExchangeApi extends HttpHandler{
    constructor(accessToken){
        super(`https://v6.exchangerate-api.com/v6/${accessToken}`,)

    }

    async getExchangeRate(base){
        try{
            const res = await this.api.get(`/latest/${base}`, {
                params:{
                    base: base
                }
            })

            
            return res.data.conversion_rates
        } catch (error){
            console.error( "Ошибка доступа к API курса валют", error.message);
        }
    }
}

module.exports = ExchangeApi