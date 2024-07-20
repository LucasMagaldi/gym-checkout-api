import { app } from "./app";
import { env } from "./env";

app.listen({
    host: '0.0.0.0',
    port: env.PORT
}).then(() => {
    console.log(`\x1b[32m HTTP Server is running on ${env.PORT} \x1b[0m`)
})