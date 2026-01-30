import type { ICategoryRepository } from "../../../domain/repositories/category.repository.interface";

export class GetCategoryById {
    constructor(
        private readonly categoryRepository: ICategoryRepository
    ){}


    async execute(id: string){
        const category = await this.categoryRepository.findById(id)

        if(!category){
            throw new Error('Categoria não encontrada')
        }

        return{
            id: category.id,
            name: category.name
        }
    }
}