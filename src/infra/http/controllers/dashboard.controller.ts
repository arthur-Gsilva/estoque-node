import type { Request, Response } from "express";
import type { CalculateInventory } from "../../../application/use-cases/dashboards/calculate-inventory.use-cases";
import type { ListLowStockProducts } from "../../../application/use-cases/dashboards/list-low-stock-products.use-cases";

export class DashboardController {
    constructor(
        private calculateInventory: CalculateInventory,
        private listLowStockProducts: ListLowStockProducts
    ){}

    async getInventoryValue(req: Request, res: Response){
        try {
            const result = await this.calculateInventory.execute()

            return res.status(200).json({ 
                error: null, 
                data: result 
            })
        } catch (error: any) {
            return res.status(400).json({ 
                error: error.message 
            })
        }
    }

    async lowStock(req: Request, res: Response){
        try {
            const result = await this.listLowStockProducts.execute()

            return res.status(200).json({ 
                error: null, 
                data: result 
            })
        } catch (error: any) {
            return res.status(400).json({ 
                error: error.message 
            })
        }
    }
}