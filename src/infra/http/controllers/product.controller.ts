import type { Request, Response } from "express";
import type { CreateProduct } from "../../../application/use-cases/product/create-Product.use-cases";
import type { GetProductById } from "../../../application/use-cases/product/get-product-by-id.use-cases";
import type { listProducts } from "../../../application/use-cases/product/list-products.use-cases";

export class ProductController {
    constructor(
        private createProduct: CreateProduct,
        private getProductById: GetProductById,
        private listProducts: listProducts
    ){}

    async create(req: Request, res: Response){
        try{
            const { data } = req.body

            if(data.minStock > data.maxStock){
                res.status(400).json({ error: "O estoque mínimo não pode ser maior que o máximo" })
            }


            const product = await this.createProduct.execute(data)

            res.status(201).json({ error: null, data: product })
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
                res.status(404).json({ error: "Produto não encontrado" })
            }

            res.status(201).json({ error: null, data: product })
        } catch(error: any){
            return res.status(400).json({ 
                error: error.message 
            })
        }
    }

    async list(req: Request, res: Response){
        try{ 
            const products = await this.listProducts.execute()

            return res.json({ error: null, data: products })
        }catch (error: any) {
            return res.status(400).json({ 
                error: error.message 
            })
        }
    }
}