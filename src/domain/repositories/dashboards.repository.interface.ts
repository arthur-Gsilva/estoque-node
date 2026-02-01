import type { Product } from "../entities/product.entity"

export interface IDashboardRepository {
    getInventoryValue(): Promise<number | null> 
    getLowStockProducts(): Promise<Product> 
}