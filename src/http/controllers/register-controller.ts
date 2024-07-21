import { registerUseCase } from '../../use-cases/register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from "zod"


export async function register(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string()
    })

    const { name, email, password } = bodySchema.parse(request.body)
    try {
        await registerUseCase({ name, email, password })    
        reply.status(201)
    } catch (error) {
        reply.status(409).send()
    }

    return reply.status(201).send()
}