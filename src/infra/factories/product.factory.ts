
import { CreateProduct } from "../../application/use-cases/product/create-product.use-cases"
import { DeleteProduct } from "../../application/use-cases/product/delete-product.use-cases"
import { GetProductById } from "../../application/use-cases/product/get-product-by-id.use-cases"
import { ListProducts } from "../../application/use-cases/product/list-products.use-cases"
import { CategoryRepository } from "../database/repositories/category.repository"
import { ProductRepository } from "../database/repositories/product.repository"
import { ProductController } from "../http/controllers/product.controller"

let productRepository: ProductRepository
let categoryRepository: CategoryRepository

const getProductRepository = () => {
    if (!productRepository) {
        productRepository = new ProductRepository()
    }
    return productRepository
}

const getCategoryRepository = () => {
    if (!categoryRepository) {
        categoryRepository = new CategoryRepository()
    }
    return categoryRepository
}

export const makeProductController = () => {
    const repository = getProductRepository()
    const categoryRepository = getCategoryRepository()
    
    return new ProductController(
        new CreateProduct(repository, categoryRepository),
        new GetProductById(repository, categoryRepository),
        new ListProducts(repository, categoryRepository), 
        new DeleteProduct(repository)
    )
}