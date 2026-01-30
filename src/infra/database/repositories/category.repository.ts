import { Category } from "../../../domain/entities/category.entity";
import type { ICategoryRepository } from "../../../domain/repositories/category.repository.interface";
import { prisma } from "../../../libs/prisma";

export class CategoryRepository implements ICategoryRepository {

    async findById(id: string): Promise<Category | null> {
        const category = await prisma.category.findFirst({
            where: {id, deletedAt: null}
        })

        if(!category) return null

        return this.toDomain(category)
    }

    async findAll(includeProductCount: boolean): Promise<Category[]> {
        const categories = includeProductCount
            ? await prisma.category.findMany({
                where: { deletedAt: null },
                include: {
                _count: {
                    select: { products: true }
                }
                }
            })
            : await prisma.category.findMany({
                where: { deletedAt: null }
            })

        return categories.map(category =>
            this.toDomain({
            ...category,
            productCount: includeProductCount
                ? (category as any)._count.products
                : undefined
            })
        )
    }


    async save(category: Category): Promise<void> {
        const data = category.toObject()

        await prisma.category.create({
            data: {
                id: data.id,
                name: data.name,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })
    }

    async update(category: Category): Promise<void> {
        const data = category.toObject()

        await prisma.category.update({
            where: {id: data.id},
            data: {
                name: data.name,
                updatedAt: data.updatedAt
            }
        })
    }

    async delete(id: string): Promise<void> {
        await prisma.category.update({
            where: {id},
            data: {
                deletedAt: new Date()
            }
        })
    }

    private toDomain(data: any): Category {
        return new Category({
            id: data.id,
            name: data.name,
            createdAt: data.createdAt,
            updatedAt: data.uptadesAt,
            productCount: data.productCount
        })
    }
}