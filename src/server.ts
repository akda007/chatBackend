import { app } from "./app";
import { WebSocketServer } from "ws";


async function startServer() {
    const port = process.env.PORT || 8080;

    const server = app.listen(port, () => {
        console.log(`Server listening at: http://localhost:${port}`);
    })


    const wss = new WebSocketServer({ server });

    wss.on('connection', (ws) => {
        console.log("New client connected!");

        ws.on('close', () => {
            console.log("Client disconnected");
        })
    })

    app.post('/webhook', async (req, res) => {
        const data = req.body;

        console.log('Webhook event received:', data);

        wss.clients.forEach(async (client) => {
            if (client.readyState == client.OPEN) {
                await client.send(JSON.stringify(data));
            }
        });

        res.send("Message received!");
    })
}


startServer();