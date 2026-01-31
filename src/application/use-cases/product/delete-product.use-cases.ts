import type { ICategoryRepository } from "../../../domain/repositories/category.repository.interface";
import type { IProductRepository } from "../../../domain/repositories/product.repository.interface";

export class DeleteProduct {
    constructor(
        private readonly productRepository: IProductRepository
    ){}

    async execute(id: string){
        const product = await this.productRepository.findById(id)

        if(!product){
            throw new Error("Categoria não encontrada")
        }

        await this.productRepository.delete(product.id)
    }
}