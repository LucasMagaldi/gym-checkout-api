import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-user-repository'
import { describe, expect, it, beforeEach } from "vitest";
import { AuthenticationUseCase } from './authentication-use-case';
import { InvalidCredentials } from './errors/invalid-credentials'
import { hash } from 'bcryptjs';

let userRepository: InMemoryUserRepository
let authenticationUseCase: AuthenticationUseCase


describe('Authentication use case', () => {
    const password = 'randon@1223'
    const email = 'lucas.1234@gmail.com'

    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        authenticationUseCase = new AuthenticationUseCase(userRepository)
    })

    it('Should not authenticate user when credentials not founded', async () => {
        expect(async() => {
            await authenticationUseCase.execute({email: "lucas.s.magaldi@hotmail.com", password: "123454"})
        }).rejects.toBeInstanceOf(InvalidCredentials)
    })

    it("Should return invalid credentials when password didnt match", async () => {
        await userRepository.create({
            name: 'Lucas',
            email,
            password_hash: await hash(password, 6)
        })

        expect(async() => {
           await authenticationUseCase.execute({email, password: "1234"})
        }).rejects.toBeInstanceOf(InvalidCredentials)
    })

    it('Should be authenticated', async () => {
        await userRepository.create({
            name: 'Lucas',
            email,
            password_hash: await hash(password, 6)
        })

        const token = await authenticationUseCase.execute({email, password})

        expect(token).toEqual(expect.any(String))
    })
})