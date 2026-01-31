import { prisma } from "../../../libs/prisma"
import type { IMoveRepository } from "../../../domain/repositories/move.repository.interface"
import { Move } from "../../../domain/entities/move.entity"

export class MoveRepository implements IMoveRepository {
    
    async findById(id: string): Promise<Move | null> {
        const move = await prisma.move.findFirst({
            where: { id }
        })

        if (!move) return null
        return this.toDomain(move)
    }

    async findAll(): Promise<Move[]> {
        const moves = await prisma.move.findMany({
            orderBy: { createdAt: 'desc' }
        })

        return moves.map(move => this.toDomain(move))
    }

    async findByProductId(productId: string): Promise<Move[]> {
        const moves = await prisma.move.findMany({
            where: { productId },
            orderBy: { createdAt: 'desc' }
        })

        return moves.map(move => this.toDomain(move))
    }

    async findByUserId(userId: string): Promise<Move[]> {
        const moves = await prisma.move.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        })

        return moves.map(move => this.toDomain(move))
    }

    async save(move: Move, tx?: any): Promise<void> {
        const client = tx || prisma
        const data = move.toObject()

        await client.move.create({
            data: {
                id: data.id,
                productId: data.product,
                userId: data.user,
                type: data.type,
                quantity: data.quantity,
                price: data.price,
                createdAt: data.createdAt
            }
        })
    }

    private toDomain(data: any): Move {
        return new Move({
            id: data.id,
            productId: data.productId,
            userId: data.userId,
            type: data.type,
            quantity: data.quantity,
            price: data.price,
            createdAt: data.createdAt
        })
    }
}