import { Prisma } from '@prisma/client'
import { prismaClient } from '../../lib/prisma'
import { UserRepository } from '../user-repository'

export class PrismaUserRepository implements UserRepository {
    async create({ name, email, password_hash }: Prisma.UserCreateInput) {
        const user = await prismaClient.user.create({
            data: { name, email, password_hash }
        })

        return user
    }

    async findByEmail(email: string) {
        return await prismaClient.user.findUnique({
            where: {
                email
            }
        })
    }
}