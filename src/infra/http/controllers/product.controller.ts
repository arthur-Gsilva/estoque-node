import type { Request, Response } from "express";
import type { CreateProduct } from "../../../application/use-cases/product/create-product.use-cases";
import type { GetProductById } from "../../../application/use-cases/product/get-product-by-id.use-cases";
import type { ListProducts } from "../../../application/use-cases/product/list-products.use-cases";
import type { DeleteProduct } from "../../../application/use-cases/product/delete-product.use-cases";

export class ProductController {
    constructor(
        private createProduct: CreateProduct,
        private getProductById: GetProductById,
        private listProducts: ListProducts,
        private deleteProduct: DeleteProduct
    ){}

    async create(req: Request, res: Response){
        try{
            const { name, categoryId, unitType, unitPrice, stock, minStock, maxStock } = req.body

            if(minStock > maxStock){
                return res.status(400).json({ error: "O estoque mínimo não pode ser maior que o máximo" })
            }


            const product = await this.createProduct.execute({
                id: "",
                name,
                categoryId,
                unitType,
                unitPrice,
                stock,
                minStock,
                maxStock
            })

            return res.status(201).json({ error: null, data: product })
        } catch(error: any){
            return res.status(400).json({ 
                error: error.message 
            })
        }
    }

    async find(req: Request, res: Response){
        try{
            const { id } = req.params

            const product = await this.getProductById.execute(id as string)
            if(!product){
               return res.status(404).json({ error: "Produto não encontrado" })
            }

           return res.status(201).json({ error: null, data: product })
        } catch(error: any){
            return res.status(400).json({ 
                error: error.message 
            })
        }
    }

    async list(req: Request, res: Response){
        try{ 
            const { offset, limit, name } = req.query

            const offsetNumber = Number(offset) || 0
            const limitNumber = Number(limit) || 10

            const products = 
                await this.listProducts.execute(
                    offsetNumber,
                    limitNumber,
                    name as string
                )

            return res.json({ error: null, data: products })
        }catch (error: any) {
            return res.status(400).json({ 
                error: error.message 
            })
        }
    }

    delete = async (req: Request, res: Response) => {
        try{
            const { id } = req.params

            await this.deleteProduct.execute(id as string)

            return res.json({ error: null, data: "Produto excluída com sucesso" })
        } catch(error: any){
            return res.status(400).json({
                error: error.message
            })
        }
    }
}