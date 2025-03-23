const HttpHandler = require("./httpHandler")

class ExchangeApi extends HttpHandler{
    constructor(accessToken){
        super(`https://api.exchangeratesapi.io/v1/latest${accessToken}`,)

    }

    async getExchangeRate(base){
        try{
            await this.api.get("", {
                params:{
                    base: base
                }
            })
        } catch (error){

        }
    }
}

module.exports = ExchangeApi