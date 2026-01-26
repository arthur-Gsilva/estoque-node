import type {  } from "@prisma/client";
import { prisma } from "../../libs/prisma";
import type { Prisma } from "../../generated/prisma/client";

export class UserRepository {

    public async findByEmail(email: string){
        return await prisma.user.findUnique({
            where: {email: email, deletedAt: null}
        })
    }
    public async findById(id: string){
        return await prisma.user.findFirst({
            where: {id, deletedAt: null},
            omit: {
                password: true
            }
        })
    }

    public async loginUser(token: string, id: string){
        return await prisma.user.update({
            where: {id},
            data: {
                token,
                uptadesAt: new Date()
            },
            select: {
                id: true,
                admin: true,
                avatar: true,
                createdAt: true,
                deletedAt: true,
                email: true,
                name: true,
                token: true,
                uptadesAt: true,
                moves: true
            }
        })
    }

    public async logoutUser(token: string){
        return await prisma.user.updateMany({
            where: { token: token },
            data: {
                token: null,
                uptadesAt: new Date()
            }
        })
    }

    public async getAllUser(offset: number, limit: number){
        return await prisma.user.findMany({
            where: {
                deletedAt: null
            },
            skip: offset,
            take: limit
        })
    }

    public async create(data: Prisma.UserCreateInput){
        return await prisma.user.createManyAndReturn({
            data
        })
    }

    public async update(id: string, data: Prisma.UserUpdateInput){
        return await prisma.user.updateManyAndReturn({
            where: {id},
            data
        })
    }
    public async delete(id: string){
        return await prisma.user.update({
            where: {id: id},
            data: {
                deletedAt: new Date()
            }
        })
    }

    public async authenticateUser(token: string){
        return prisma.user.findFirst({
            where: {token, deletedAt: null}
        })
    }
}