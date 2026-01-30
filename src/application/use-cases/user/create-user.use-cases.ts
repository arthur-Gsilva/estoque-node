import { v4 as uuidv4 } from 'uuid'
import { User } from '../../../domain/entities/user.entity'
import { Email } from '../../../domain/value-objects/email.vo'
import { Password } from '../../../domain/value-objects/password.vo'
import { type IUserRepository } from '../../../domain/repositories/user.repository.interface'
import { type IPasswordHasher } from '../../services/password-hasher.interface'

type CreateUserInput = {
    name: string
    email: string
    password: string
}

type CreateUserOutput = {
    id: string
    name: string
    email: string
    admin: boolean
    createdAt: Date
}

export class CreateUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private passwordHasher: IPasswordHasher
    ) {}

    async execute(input: CreateUserInput): Promise<CreateUserOutput> {
        
        const email = Email.create(input.email)

        
        const existingUser = await this.userRepository.findByEmail(email)
        if (existingUser) {
            throw new Error('Usuário já cadastrado')
        }

        
        const password = Password.create(input.password)

        
        const hashedPassword = await this.passwordHasher.hash(password.getValue())

        
        const user = User.create({
            id: uuidv4(),
            name: input.name,
            email,
            password: hashedPassword,
            admin: false
        })

        
        await this.userRepository.save(user)

        
        return {
            id: user.id,
            name: user.name,
            email: user.email.getValue(),
            admin: user.admin,
            createdAt: user.toObject().createdAt
        }
    }
}