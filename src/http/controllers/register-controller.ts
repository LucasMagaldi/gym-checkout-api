import { EmailAlreadyExist } from '../../use-cases/errors/email-already-exist'
import { PrismaUserRepository } from '../../repositories/prisma/prisma-user-repository'
import { RegisterUseCase } from '../../use-cases/register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from "zod"
import { makeRegisterUseCase } from '../../use-cases/factories/make-register-use-case'


export async function register(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string()
    })

    const { name, email, password } = bodySchema.parse(request.body)
    try {
        const registerUseCase = makeRegisterUseCase()
        await registerUseCase.execute({ name, email, password })    
        reply.status(201)
    } catch (error) {
        if(error instanceof EmailAlreadyExist) reply.status(409).send({ message: error.message })
        reply.status(500).send()
    }

    return reply.status(201).send()
}