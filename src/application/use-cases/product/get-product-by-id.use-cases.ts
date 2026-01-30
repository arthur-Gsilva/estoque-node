import type { IProductRepository } from "../../../domain/repositories/product.repository.interface";

export class GetProductById {
    constructor(
        private readonly productRepository: IProductRepository
    ){}

    async execute(id: string){
        const product = await this.productRepository.findById(id)

        if(!product){
            throw new Error("Product não encontrado")
        }

        return product
    }  
}