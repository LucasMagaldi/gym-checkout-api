import { hash } from 'bcryptjs'
import { UserRegisterDTO } from '../DTO/User/UserRegisterDTO'
import { prismaClient } from '../lib/prisma'


export async function registerUseCase({ name, email, password }: UserRegisterDTO) {

    const isUserRegister = await prismaClient.user.findUnique({
        where: {
            email
        }
    })

    if(isUserRegister) throw new Error('E-mail already exists.')
    
    const password_hash = await hash(password, 6)

    await prismaClient.user.create({
        data: { name, email, password_hash }
    })

}