import type { IProductRepository } from "../../../domain/repositories/product.repository.interface";

export class listProducts{
    constructor(
        private readonly productRepository: IProductRepository
    ){}


    async execute(){
        return await this.productRepository.findAll()
    }
}