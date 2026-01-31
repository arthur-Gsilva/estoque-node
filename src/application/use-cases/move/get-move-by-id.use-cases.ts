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

export class GetMoveById {
    constructor(
        private readonly moveRepository: IMoveRepository
    ){}

    async execute(id: string): Promise<MoveOutput> {
        const move = await prisma.move.findFirst({
            where: { id },
            include: {
                product: true,
                user: true
            }
        })

        if (!move) {
            throw new Error("Movimentação não encontrada")
        }

        return {
            id: move.id,
            productId: move.productId,
            productName: move.product.name,
            userId: move.userId,
            userName: move.user.name,
            type: move.type as "in" | "out",
            quantity: move.quantity,
            price: move.price,
            createdAt: move.createdAt
        }
    }
}