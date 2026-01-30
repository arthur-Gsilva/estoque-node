import { Product } from "../../../domain/entities/product.entity";
import type { ICategoryRepository } from "../../../domain/repositories/category.repository.interface";
import type { IProductRepository } from "../../../domain/repositories/product.repository.interface";
import { v4 as uuidv4 } from 'uuid'

type CreateProductInput = {
    id: string
    name: string
    categoryId: string
    unitPrice: number,
    unitType: "kg" | "g" | "l" | "ml" | "un",
    stock: number,
    minStock: number,
    maxStock: number
}



export class CreateProduct {
    constructor(
        private readonly productRepository: IProductRepository,
        private readonly categoryRepository: ICategoryRepository
    ){}

    async execute(data: CreateProductInput){
        const category = await this.categoryRepository.findById(data.categoryId)

        if(!category){
            throw new Error("Categoria não encontrada")
        }

        console.log("min"+data.minStock)

        const product = Product.create({
            id: uuidv4(),
            name: data.name,
            categoryId: data.categoryId,
            maxStock: data.maxStock,
            minStock: data.minStock,
            price: data.unitPrice,
            stock: data.stock,
            unitPrice: data.unitPrice,
            unitType: data.unitType
        })

        await this.productRepository.save(product)

        return{
            id: product.id,
            stock: product.stock,
            price: product.price,
            type: product.type,
            category: category.name,
            minStock: product.min
        }
    }
}