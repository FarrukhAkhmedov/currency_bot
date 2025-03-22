const http = require("http");

class WebhookServer {
    constructor(port, onUpdate) {
        this.port = port;
        this.onUpdate = onUpdate;
        this.server = http.createServer(async (req, res) => {
            if (req.method === "POST") {
                let body = "";
                req.on("data", (chunk) => (body += chunk.toString()));
                req.on("end", async () => {
                    try {
                        const update = JSON.parse(body);
                        await this.onUpdate(update);                        
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ status: "ok" }));
                    } catch (error) {
                        console.error("Ошибка обработки вебхука:", error);
                        res.writeHead(500);
                        res.end();
                    }
                });
            } else {
                res.writeHead(404);
                res.end("Not Found");
            }
        });
    }

    start() {
        this.server.listen(this.port, () => {
            console.log(`Webhook-сервер запущен на порту ${this.port}`);
        });
    }
}

module.exports = WebhookServer;
