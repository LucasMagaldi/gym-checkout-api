import { ZodError } from "zod"
import { appRoutes } from "./http/routes"
import fastify from "fastify"
import { env } from "./env"


export const app = fastify()
app.register(appRoutes)

// function will be called whenever an error happens
app.setErrorHandler((err, _, reply) => {
    if(err instanceof ZodError) {
        return reply.status(400).send({ message: 'Validation Error', issues: err.format()})
    }

    if(env.NODE_ENV !== "prod") {
        console.log(`\x1b[41m  ${err} \x1b[0m`)
    } else {
        // Logs from external plataform as DataDog/AWS
    }
    return reply.status(500).send({ message: 'Internal server error! '})
})