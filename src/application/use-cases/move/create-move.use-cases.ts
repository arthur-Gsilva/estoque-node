import { v4 as uuidv4 } from 'uuid'
import { prisma } from '../../../libs/prisma'

type CreateMoveInput = {
    productId: string
    userId: string
    type: "in" | "out"
    quantity: number
}

type CreateMoveOutput = {
    id: string
    productId: string
    productName: string
    userId: string
    userName: string
    type: "in" | "out"
    quantity: number
    unitPrice: number
    totalPrice: number
    previousStock: number
    newStock: number
    createdAt: Date
}

export class CreateMove {
    constructor(
    ){}

    async execute(data: CreateMoveInput): Promise<CreateMoveOutput> {
        return await prisma.$transaction(async (tx) => {
            
            const user = await tx.user.findFirst({
                where: { id: data.userId, deletedAt: null }
            })
            
            if (!user) {
                throw new Error("Usuário não encontrado")
            }

            const product = await tx.product.findFirst({
                where: { 
                    id: data.productId, 
                    deletedAt: null 
                }
            })

            if (!product) {
                throw new Error("Produto não encontrado")
            }

            const currentStock = product.stock
            const unitPrice = product.unitPrice

            if (data.type === 'out') {
                if (data.quantity > currentStock) {
                    throw new Error(
                        `Estoque insuficiente. Disponível: ${currentStock}, Solicitado: ${data.quantity}`
                    )
                }
            }

            const newStock = data.type === "in" 
                ? currentStock + data.quantity 
                : currentStock - data.quantity

            if (newStock < 0) {
                throw new Error("Operação resultaria em estoque negativo")
            }

            const totalPrice = unitPrice * data.quantity
            const moveId = uuidv4()

            await tx.move.create({
                data: {
                    id: moveId,
                    productId: data.productId,
                    userId: data.userId,
                    type: data.type,
                    quantity: data.quantity,
                    price: totalPrice
                }
            })

            await tx.product.update({
                where: { id: data.productId },
                data: {
                    stock: newStock,
                    updatedAt: new Date()
                }
            })

            return {
                id: moveId,
                productId: data.productId,
                productName: product.name,
                userId: data.userId,
                userName: user.name,
                type: data.type,
                quantity: data.quantity,
                unitPrice,
                totalPrice,
                previousStock: currentStock,
                newStock,
                createdAt: new Date()
            }
        })
        
    }
}