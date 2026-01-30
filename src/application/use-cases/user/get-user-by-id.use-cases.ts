import { type IUserRepository } from '../../../domain/repositories/user.repository.interface'

type GetUserOutput = {
    id: string
    name: string
    email: string
    admin: boolean
    avatar?: string
}

export class GetUserByIdUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(userId: string): Promise<GetUserOutput> {
        const user = await this.userRepository.findById(userId)
        
        if (!user) {
            throw new Error('Usuário não encontrado')
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email.getValue(),
            admin: user.admin,
            avatar: user.avatar as string
        }
    }
}