import { RegisterUseCase } from '../register-use-case'
import { InMemoryUserRepository } from '../../repositories/in-memory/in-memory-user-repository'

export function makeRegisterUseCase() {
    const userRepository = new InMemoryUserRepository()
    const registerUseCase = new RegisterUseCase(userRepository)

    return registerUseCase
}