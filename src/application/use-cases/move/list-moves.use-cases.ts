import type { IMoveRepository } from "../../../domain/repositories/move.repository.interface"
import { prisma } from '../../../libs/prisma'

type MoveOutput = {
    id: string
    productId: string
    productName: string
    userId: string
    userName: string
    type: "in" | "out"
    quantity: number
    price: number
    createdAt: Date
}

export class ListMoves {
    constructor(
        private readonly moveRepository: IMoveRepository
    ){}

    async execute(): Promise<MoveOutput[]> {
        const moves = await prisma.move.findMany({
            include: {
                product: true,
                user: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return moves.map(move => ({
            id: move.id,
            productId: move.productId,
            productName: move.product.name,
            userId: move.userId,
            userName: move.user.name,
            type: move.type as "in" | "out",
            quantity: move.quantity,
            price: move.price,
            createdAt: move.createdAt
        }))
    }
}