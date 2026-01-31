import type { Product } from "../entities/product.entity";

export interface IProductRepository {
    findAll(offset: number, limit: number, name?: string): Promise<Product[]>
        
    findById(id: string, tx?: any): Promise<Product | null>
    findByIdWithLock(id: string, tx: any): Promise<Product | null> 

    save(product: Product, tx?: any): Promise<void>
    update(product: Product, tx?: any): Promise<void>
    delete(id: string): Promise<void>
}