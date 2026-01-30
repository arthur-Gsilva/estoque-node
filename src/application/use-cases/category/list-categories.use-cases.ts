import type { ICategoryRepository } from "../../../domain/repositories/category.repository.interface";
import type { CategoryRepository } from "../../../infra/database/repositories/category.repository";

export class ListCategories {
    constructor(
        private readonly categoryRepository: ICategoryRepository
    ){}

    async execute(include: boolean){
        const categories = await this.categoryRepository.findAll(include)

        return{
            category: categories.map(data => ({
                id: data.id,
                name: data.name,
                productCount: data.productCount,
            }))
        }
    }
}