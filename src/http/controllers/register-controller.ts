import { FastifyReply, FastifyRequest } from 'fastify'
import { prismaClient } from '../../lib/prisma'
import { z } from "zod"

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string()
    })

    const { name, email, password } = bodySchema.parse(request.body)
    await prismaClient.user.create({
        data: { name, email, password_hash: password }
    })

    return reply.status(201).send()
}