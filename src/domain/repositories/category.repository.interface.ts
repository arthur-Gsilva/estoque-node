import type { Category } from "../entities/category.entity";

export interface ICategoryRepository{
    findById(id: string): Promise<Category | null>
    findAll(includeProductCount: boolean): Promise<Category[]>

    save(category: Category): Promise<void>
    update(category: Category): Promise<void>
    delete(id: string): Promise<void>
}