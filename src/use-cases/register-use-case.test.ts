import { InMemoryUserRepository } from './../repositories/in-memory/in-memory-user-repository'
import { it, expect, describe, beforeEach } from 'vitest'
import { RegisterUseCase } from './register-use-case'
import { EmailAlreadyExist } from '../use-cases/errors/email-already-exist'

describe('Register use case', () => {
    let userRepository: InMemoryUserRepository
    let registerUseCase: RegisterUseCase

    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        registerUseCase = new RegisterUseCase(userRepository)
    })

    it('Should to register', async () => {

        const user = await registerUseCase.execute({
            name: 'Lucas',
            email: 'lucas.1234@gmail.com',
            password: '1234'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('Should not to register twice', async () => {

        const user = {
            name: 'Lucas',
            email: 'lucas.1234@gmail.com',
            password: '1234'
        }

        await registerUseCase.execute(user)
        
        expect(async () => {
            const userIsRegisterd = await registerUseCase.execute({...user, email: 'lucas.1234@gmail.com'})
            console.log(userIsRegisterd)
        }).rejects.toBeInstanceOf(EmailAlreadyExist)
    })
})