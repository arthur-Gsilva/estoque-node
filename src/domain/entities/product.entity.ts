import type { UnitType } from "../../generated/prisma/enums"

export type ProductProps = {
    id: string
    name: string,
    price: number,
    stock: number,
    categoryId: string,
    unitPrice: number,
    unitType: "kg" | "g" | "l" | "ml" | "un",
    minStock: number,
    maxStock: number,
    createdAt: Date,
    updatedAt: Date,
}


export class Product {
    private props: ProductProps

    constructor(props: ProductProps){
        this.props = props
    }

    get id(){
        return this.props.id
    }
    get name(){
        return this.props.name
    }
    get stock(){
        return this.props.stock
    }
    get price(){
        return this.props.unitPrice
    }
    get type(){
        return this.props.unitType
    }
    get min(){
        return this.props.minStock
    }
    get max(){
        return this.props.maxStock
    }

    updateName(name: string): void {
        if (name.length < 2) {
            throw new Error('Nome do produto deve ter no mínimo 2 caracteres')
        }
        this.props.name = name
        this.touch()
    }

    updateStock(stock: number): void {
        this.props.stock = stock
        this.touch()
    }

    updatePrice(price: number): void {
        this.props.unitPrice = price
        this.touch()
    }
    updateType(type: "kg" | "g" | "l" | "ml" | "un"): void {
        this.props.unitType = type
        this.touch()
    }

    updateMin(minimun: number): void{
        this.props.minStock = minimun
        this.touch()
    }
    updateMax(maximum: number): void{
        this.props.maxStock = maximum
        this.touch()
    }

    private touch(): void {
        this.props.updatedAt = new Date()
    }


    static create(props: Omit<ProductProps, 'createdAt' | 'updatedAt'>): Product{
        return new Product({
            ...props,
            createdAt: new Date(),
            updatedAt: new Date
        })
    }

    toObject(){
        return{
            id: this.props.id,
            name: this.props.name,
            price: this.props.unitPrice,
            unitPrice: this.props.unitPrice,
            stock: this.props.stock,
            categoryId: this.props.categoryId,
            unitType: this.props.unitType,
            minStock: this.props.minStock,
            maxStock: this.props.maxStock,
            createdAt: this.props.createdAt,
            updatedAt: this.props.updatedAt
        }
    }
}