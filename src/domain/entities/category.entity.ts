export type CategoryProps = {
    id: string,
    name: string,
    createdAt: Date,
    updatedAt: Date,
    productCount: number
}

export class Category {
    private props: CategoryProps

    constructor(props: CategoryProps){
        this.props = props
    }

    get id(){
        return this.props.id
    }
    get name(){
        return this.props.name
    }
    get productCount(){
        return this.props.productCount
    }

    updateName(name: string): void {
        if (name.length < 3) {
            throw new Error('Nome da categoria deve ter no mínimo 3 caracteres')
        }
        this.props.name = name
        this.touch()
    }

    static create(props: Omit<CategoryProps, 'createdAt' | 'updatedAt'| 'productCount'>): Category {
        return new Category({
            ...props,
            createdAt: new Date(),
            updatedAt: new Date(),
            productCount: 0
        })
    }

    private touch(): void {
        this.props.updatedAt = new Date()
    }

    toObject() {
        return {
            id: this.props.id,
            name: this.props.name,
            createdAt: this.props.createdAt,
            updatedAt: this.props.updatedAt
        }
    }
}