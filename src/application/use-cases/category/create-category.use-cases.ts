import { Category } from "../../../domain/entities/category.entity"
import type { ICategoryRepository } from "../../../domain/repositories/category.repository.interface"
import { v4 as uuidv4 } from 'uuid'


type CreateCategoryOutput = {
    id: string
    name: string
    createdAt: Date
}

export class CreateCategory{
    constructor(
        private readonly categoryRepository: ICategoryRepository
    ){}

    async execute(name: string): Promise<CreateCategoryOutput>{
        const category = Category.create({
            id: uuidv4(),
            name: name
        })

        await this.categoryRepository.save(category)

        return{
            id: category.id,
            name: category.name,
            createdAt: category.toObject().createdAt
        }
    }
}