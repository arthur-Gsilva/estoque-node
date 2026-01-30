import { Category } from "../../../domain/entities/category.entity";
import type { ICategoryRepository } from "../../../domain/repositories/category.repository.interface";
import type { CategoryRepository } from "../../../infra/database/repositories/category.repository";



export class UpdateCategory {
    constructor(
        private readonly categoryRepository: ICategoryRepository
    ){}

    async execute(id: string, name: string){
        const category = await this.categoryRepository.findById(id)

        if(!category){
            throw new Error("Categoria não encontrada")
        }

        if(name){
            category.updateName(name)
        }

        await this.categoryRepository.update(category)

        return{
            id: category.id,
            name: category.name
        }
    }
}