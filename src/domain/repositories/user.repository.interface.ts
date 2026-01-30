import { User } from '../entities/user.entity'
import { Email } from '../value-objects/email.vo'

export interface IUserRepository {
    findByEmail(email: Email): Promise<User | null>
    findById(id: string): Promise<User | null>
    findByToken(token: string): Promise<User | null>
    findAll(offset: number, limit: number): Promise<User[]>
    
    save(user: User): Promise<void>
    update(user: User): Promise<void>
    delete(id: string): Promise<void>
}