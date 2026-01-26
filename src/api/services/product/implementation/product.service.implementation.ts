import { Product } from "../../../entities/products.js";
import type { ProductRepository } from "../../../../repositories/product/product.repository.js";
import type { BuyOutputDto, ListOutputDto, ProductService, SellOutputDto } from "../product.service.js";

export class ProductServiceImplementation implements ProductService {

    private constructor(readonly repository: ProductRepository){}

    public static build(repository: ProductRepository){
        return new ProductServiceImplementation(repository)
    }

    public async sell(id: string, amount: number): Promise<SellOutputDto> {
        const aProduct = await this.repository.find(id)

        if(!aProduct){
            throw new Error("Produto não encontrado.");
        }

        aProduct.sell(amount)

        await this.repository.update(aProduct)

        const output: SellOutputDto = {
            id: aProduct.id,
            balance: aProduct.stock
        }

        return output
    }
    public async buy(id: string, amount: number): Promise<BuyOutputDto> {
        const aProduct = await this.repository.find(id)

        if(!aProduct){
            throw new Error("Produto não encontrado.");
        }

        aProduct.sell(amount)

        await this.repository.update(aProduct)

        const output: BuyOutputDto = {
            id: aProduct.id,
            balance: aProduct.stock
        }

        return output
    }
    public async list(): Promise<ListOutputDto> {
        const aProducts = await this.repository.list()

        const products = aProducts.map(item => {
            return{
                id: item.id,
                name: item.name,
                price: item.price,
                balance: item.stock
            }
            
        })

        const output: ListOutputDto = {
            products
        }

        return output
    }

}