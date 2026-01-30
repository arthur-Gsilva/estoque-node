import { type IUserRepository } from '../../../domain/repositories/user.repository.interface'

export class DeleteUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(userId: string): Promise<void> {
        const user = await this.userRepository.findById(userId)
        
        if (!user) {
            throw new Error('Usuário não encontrado')
        }

        await this.userRepository.delete(userId)
    }
}