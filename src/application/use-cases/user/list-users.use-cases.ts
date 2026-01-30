import { type IUserRepository } from '../../../domain/repositories/user.repository.interface'

type ListUsersOutput = {
    users: {
        id: string
        name: string
        email: string
        admin: boolean
    }[]
}

export class ListUsersUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(offset: number = 0, limit: number = 10): Promise<ListUsersOutput> {
        const users = await this.userRepository.findAll(offset, limit)

        return {
            users: users.map(user => ({
                id: user.id,
                name: user.name,
                email: user.email.getValue(),
                admin: user.admin
            }))
        }
    }
}