import type { IUserRepository } from "../../../domain/repositories/user.repository.interface"
import { Email } from "../../../domain/value-objects/email.vo"
import type { IPasswordHasher } from "../../services/password-hasher.interface"
import type { ITokenGenerator } from "../../services/token-generator.interface"


type LoginUserInput = {
    email: string
    password: string
}

type LoginUserOutput = {
    id: string
    name: string
    email: string
    admin: boolean
    token: string
}

export class LoginUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private passwordHasher: IPasswordHasher,
        private tokenGenerator: ITokenGenerator
    ) {}

    async execute(input: LoginUserInput): Promise<LoginUserOutput> {
        const email = Email.create(input.email)

        const user = await this.userRepository.findByEmail(email)
        if (!user) {
            throw new Error('Credenciais inválidas')
        }

        const isPasswordValid = await this.passwordHasher.compare(
            input.password,
            user.password
        )
        if (!isPasswordValid) {
            throw new Error('Credenciais inválidas')
        }

        const token = this.tokenGenerator.generate()
        user.setToken(token)

        await this.userRepository.update(user)

        return {
            id: user.id,
            name: user.name,
            email: user.email.getValue(),
            admin: user.admin,
            token
        }
    }
}