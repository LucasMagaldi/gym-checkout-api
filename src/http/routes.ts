import { FastifyInstance } from "fastify";
import { register } from './controllers/register-controller'
import { authenticate } from './controllers/authentication-controller'

export async function appRoutes(app: FastifyInstance) {
    app.post('/user', register)
    app.post('/authenticate', authenticate)
}
