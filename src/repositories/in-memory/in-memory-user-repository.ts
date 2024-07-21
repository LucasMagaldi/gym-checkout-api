import { Prisma, User } from '@prisma/client';
import { UserRepository } from '../user-repository'
import { randomUUID } from 'crypto';

export class InMemoryUserRepository implements UserRepository {

    public items: User[] = []

    async create({ name, email, password_hash }: Prisma.UserCreateInput) {
        const user: User = {
            id: randomUUID(),
            name,
            email,
            password_hash,
            created_at: new Date(),
            updated_at: new Date()
        }

        this.items.push(...this.items, user)

        return user
    }

    async findByEmail(email: string) {
        const user = this.items.find((item) => item.email === email)

        if(!user) return null

        return user
    }
}