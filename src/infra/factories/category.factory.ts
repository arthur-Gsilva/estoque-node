import { CreateCategory } from '../../application/use-cases/category/create-category.use-cases'
import { CategoryRepository } from '../database/repositories/category.repository'
import { ListCategories } from '../../application/use-cases/category/list-categories.use-cases'
import { GetCategoryById } from '../../application/use-cases/category/get-category-by-id.use-cases'
import { UpdateCategory } from '../../application/use-cases/category/update-category.use-cases'
import { DeleteCategory } from '../../application/use-cases/category/delete-category.use-cases'
import { CategoryController } from '../http/controllers/category.controller'

let categoryRepository: CategoryRepository

const getCategoryRepository = () => {
    if (!categoryRepository) {
        categoryRepository = new CategoryRepository()
    }
    return categoryRepository
}

export const makeCategoryController = () => {
    const repository = getCategoryRepository()
    
    return new CategoryController(
        new CreateCategory(repository),
        
        new GetCategoryById(repository),
        new ListCategories(repository),
        new UpdateCategory(repository),
        new DeleteCategory(repository)
    )
}