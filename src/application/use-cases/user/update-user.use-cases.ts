import { Email } from '../../../domain/value-objects/email.vo'
import { Password } from '../../../domain/value-objects/password.vo'
import { type IUserRepository } from '../../../domain/repositories/user.repository.interface'
import { type IPasswordHasher } from '../../services/password-hasher.interface'
import { type IFileStorage } from '../../services/file-storage.interface'

type UpdateUserInput = {
    userId: string
    name?: string
    email?: string
    password?: string
    file?: {
        buffer: Buffer
        originalname: string
    }
}

type UpdateUserOutput = {
    id: string
    name: string
    email: string
    avatar?: string
}

export class UpdateUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private passwordHasher: IPasswordHasher,
        private fileStorage: IFileStorage
    ) {}

    async execute(input: UpdateUserInput): Promise<UpdateUserOutput> {
        const user = await this.userRepository.findById(input.userId)
        if (!user) {
            throw new Error('Usuário não encontrado')
        }

        if (input.name) {
            user.updateName(input.name)
        }

        if (input.email) {
            const newEmail = Email.create(input.email)
            
            const emailInUse = await this.userRepository.findByEmail(newEmail)
            if (emailInUse && emailInUse.id !== user.id) {
                throw new Error('Email já está em uso')
            }

            user.updateEmail(newEmail)
        }

        if (input.password) {
            const password = Password.create(input.password)
            const hashedPassword = await this.passwordHasher.hash(password.getValue())
            user.updatePassword(hashedPassword)
        }

        if (input.file) {
            if (user.avatar) {
                await this.fileStorage.deleteAvatar(user.avatar)
            }

            const filename = await this.fileStorage.saveAvatar(
                input.file.buffer,
                input.file.originalname
            )
            user.updateAvatar(filename)
        }

        await this.userRepository.update(user)

        return {
            id: user.id,
            name: user.name,
            email: user.email.getValue(),
            avatar: user.avatar as string
        }
    }
}