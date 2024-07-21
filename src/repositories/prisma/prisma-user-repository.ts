import { UserRegisterDTO } from '../../DTO/User/UserRegisterDTO'
import { Prisma } from '@prisma/client'
import { prismaClient } from '../../lib/prisma'

export class PrismaUserRepository {
    async create({ name, email, password_hash }: Prisma.UserCreateInput) {
        const user = await prismaClient.user.create({
            data: { name, email, password_hash }
        })

        return user
    }
}