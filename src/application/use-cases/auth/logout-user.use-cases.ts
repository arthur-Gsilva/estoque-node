import type { IUserRepository } from "../../../domain/repositories/user.repository.interface"


export class LogoutUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(token: string): Promise<void> {
        const user = await this.userRepository.findByToken(token)
        
        if (user) {
            user.clearToken()
            await this.userRepository.update(user)
        }
    }
}