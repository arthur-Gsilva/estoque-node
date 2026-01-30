import { type IUserRepository } from '../../../domain/repositories/user.repository.interface'
import { User } from '../../../domain/entities/user.entity'
import { Email } from '../../../domain/value-objects/email.vo'
import { prisma } from '../../../libs/prisma'

export class UserRepository implements IUserRepository {
    
    async findByEmail(email: Email): Promise<User | null> {
        const userData = await prisma.user.findUnique({
            where: { 
                email: email.getValue(),
                deletedAt: null 
            }
        })

        if (!userData) return null

        return this.toDomain(userData)
    }

    async findById(id: string): Promise<User | null> {
        const userData = await prisma.user.findFirst({
            where: { id, deletedAt: null }
        })

        if (!userData) return null

        return this.toDomain(userData)
    }

    async findByToken(token: string): Promise<User | null> {
        const userData = await prisma.user.findFirst({
            where: { token, deletedAt: null }
        })

        if (!userData) return null

        return this.toDomain(userData)
    }

    async findAll(offset: number, limit: number): Promise<User[]> {
        const usersData = await prisma.user.findMany({
            where: { deletedAt: null },
            skip: offset,
            take: limit
        })

        return usersData.map(user => this.toDomain(user))
    }

    async save(user: User): Promise<void> {
        const data = user.toObject()

        await prisma.user.create({
            data: {
                id: data.id,
                name: data.name,
                email: data.email,
                password: data.password,
                admin: data.admin,
                avatar: data.avatar == undefined ? null : data.avatar,
                token: data.token == undefined ? null : data.token,
                createdAt: data.createdAt,
                uptadesAt: data.updatedAt
            }
        })
    }

    async update(user: User): Promise<void> {
        const data = user.toObject()

        await prisma.user.update({
            where: { id: user.id },
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                admin: data.admin,
                avatar: data.avatar == undefined ? null : data.avatar,
                token: data.token == undefined ? null : data.token,
                uptadesAt: data.updatedAt
            }
        })
    }

    async delete(id: string): Promise<void> {
        await prisma.user.update({
            where: { id },
            data: { deletedAt: new Date() }
        })
    }

    private toDomain(data: any): User {
        return new User({
            id: data.id,
            name: data.name,
            email: Email.create(data.email),
            password: data.password,
            admin: data.admin,
            avatar: data.avatar,
            token: data.token,
            createdAt: data.createdAt,
            updatedAt: data.uptadesAt
        })
    }
}