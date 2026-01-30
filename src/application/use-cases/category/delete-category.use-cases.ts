import type { ICategoryRepository } from "../../../domain/repositories/category.repository.interface";

export class DeleteCategory {
    constructor(
        private readonly categoryRepository: ICategoryRepository
    ){}

    async execute(id: string){
        const category = await this.categoryRepository.findById(id)

        if(!category){
            throw new Error("Categoria não encontrada")
        }

        await this.categoryRepository.delete(category.id)
    }
}