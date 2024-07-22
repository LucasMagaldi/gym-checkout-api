import { UserRepository } from "../repositories/user-repository"
import { UserAuthenticationDTO } from '../DTO/User/UserAuthenticationDTO'
import { compare } from "bcryptjs"
import { InvalidCredentials } from './errors/invalid-credentials'


export class AuthenticationUseCase {
    constructor(private userRepository: UserRepository){}

    async execute({ email, password } : UserAuthenticationDTO) : Promise<string> {
        const user = await this.userRepository.findByEmail(email)
        
        if(!user) throw new InvalidCredentials()

        const doesPasswordMatches = await compare(password, user.password_hash)
        if(!doesPasswordMatches) throw new InvalidCredentials()

        const token = "u9u4rj9d´4h9rjr984r4"
        return token
    }
}