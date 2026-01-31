import type { ICategoryRepository } from "../../../domain/repositories/category.repository.interface";
import type { IProductRepository } from "../../../domain/repositories/product.repository.interface";

export class GetProductById {
    constructor(
        private readonly productRepository: IProductRepository,
        private readonly categoryRepository: ICategoryRepository  
    ){}

    async execute(id: string){
        const product = await this.productRepository.findById(id)

        if(!product){
            throw new Error("Produto não encontrado")
        }

        const category = await this.categoryRepository.findById(
            product.toObject().categoryId
        )

        return {
            ...product.toObject(),
            categoryName: category?.name || 'Categoria não encontrada'
        }
    }  
}