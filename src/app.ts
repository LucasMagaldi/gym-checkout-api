import fastify from "fastify"
import { z } from 'zod'
import { prismaClient } from './lib/prisma'

export const app = fastify()

app.post('/user',  async (request, response) => {
    const bodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string()
    })

    const { name, email, password } = bodySchema.parse(request.body)
    await prismaClient.user.create({
        data: { name, email, password_hash: password }
    })

    return response.status(201).send()
})  