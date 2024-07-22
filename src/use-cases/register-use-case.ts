import { hash } from 'bcryptjs'
import { UserRegisterDTO } from '../DTO/User/UserRegisterDTO'
import { EmailAlreadyExist } from './errors/email-already-exist'
import { User } from '@prisma/client'
import { UserRepository } from '../repositories/user-repository'

export class RegisterUseCase {

    constructor(private userRepository: UserRepository) {

    }

    async execute({ name, email, password }: UserRegisterDTO) : Promise<User> {

    const isUserRegister = await this.userRepository.findByEmail(email)

    if(isUserRegister) throw new EmailAlreadyExist()
    
    const password_hash = await hash(password, 6)

    return await this.userRepository.create({ name, email, password_hash })

}}

