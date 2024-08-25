import { AuthenticationUseCase } from '../authentication-use-case'
import { PrismaUserRepository } from '../../repositories/prisma/prisma-user-repository'

export function makeAuthenticateUseCase() {
    const userRepository = new PrismaUserRepository()
    const authenticationUseCase = new AuthenticationUseCase(userRepository)

    return authenticationUseCase
}