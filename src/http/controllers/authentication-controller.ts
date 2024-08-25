import { PrismaUserRepository } from '../../repositories/prisma/prisma-user-repository'
import { InvalidCredentials } from "../../use-cases/errors/invalid-credentials"
import { AuthenticationUseCase } from '../../use-cases/authentication-use-case'
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeAuthenticateUseCase } from '../../use-cases/factories/make-authenticate-use-case';

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
        email: z.string().email(),
        password: z.string()
    })

    const { email, password } = bodySchema.parse(request.body)
    try {
        const authenticationUseCase = makeAuthenticateUseCase()

        const token = await authenticationUseCase.execute({email, password})
        reply.status(201).send({ access_token: token})
    } catch (error) {
        if(error instanceof InvalidCredentials) reply.status(400).send({ message: "Invalid Credentials"})
        reply.status(500).send()
    }
}