import { hash } from 'bcryptjs'
import { UserRegisterDTO } from '../DTO/User/UserRegisterDTO'
import { prismaClient } from '../lib/prisma'

export class RegisterUseCase {

    constructor(private userRepository: any) {

    }

    async execute({ name, email, password }: UserRegisterDTO) {

    const isUserRegister = await this.userRepository.findByEmail(email)

    if(isUserRegister) throw new Error('E-mail already exists.')
    
    const password_hash = await hash(password, 6)

    await this.userRepository.create({ name, email, password_hash })

}}

