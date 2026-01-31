import type { ICategoryRepository } from "../../../domain/repositories/category.repository.interface";
import type { IProductRepository } from "../../../domain/repositories/product.repository.interface";

export class ListProducts{
    constructor(
        private readonly productRepository: IProductRepository,
        private readonly categoryRepository: ICategoryRepository
    ){}


    async execute(offset: number = 0, limit: number = 10, name?: string){
        const products = await this.productRepository.findAll(offset, limit, name)
        
        const productsWithCategory = await Promise.all(
            products.map(async (product) => {
                const category = await this.categoryRepository.findById(product.toObject().categoryId)
                
                return {
                    ...product.toObject(),
                    categoryName: category?.name || 'Categoria não encontrada'
                }
            })
        )
        
        return productsWithCategory
    }
}