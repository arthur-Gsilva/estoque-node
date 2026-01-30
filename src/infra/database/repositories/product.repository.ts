import { Product } from "../../../domain/entities/product.entity";
import type { IProductRepository } from "../../../domain/repositories/product.repository.interface";
import { prisma } from "../../../libs/prisma";

export class ProductRepository implements IProductRepository {
    async findById(id: string): Promise<Product | null> {
        const product = await prisma.product.findFirst({
            where: {id, deletedAt: null}
        })

        if(!product) return null
        return this.toDomain(product)
    }

    async findAll(): Promise<Product[]> {
        const products = await prisma.product.findMany({
            where: {deletedAt: null}
        })

        return products.map(product => this.toDomain(product))
    }

    async save(product: Product): Promise<void> {
        const data = product.toObject()

        await prisma.product.create({
            data
        })
    }

    async delete(id: string): Promise<void> {
        await prisma.product.update({
            where: {id},
            data: {
                deletedAt: new Date()
            }
        })
    }

    async update(product: Product): Promise<void> {
        const data = product.toObject()

        await prisma.category.update({
            where: {id: data.id},
            data
        })
    }



    private toDomain(data: any): Product {
        return new Product({
            id: data.id,
            name: data.name,
            stock: data.stock,
            maxStock: data.maxStock,
            price: data.unitPrice,
            categoryId: data.categoryId,
            minStock: data.minStock,
            unitPrice: data.unitPrice,
            unitType: data.unitType,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        })
    }
}