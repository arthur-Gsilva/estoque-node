export type MoveProps = {
    id: string,
    productId: string,
    userId: string,
    type: "in" | "out",
    quantity: number,
    price: number,
    createdAt: Date,
}


export class Move {
    private props: MoveProps
    
    constructor(props: MoveProps){
        this.props = props
    }

    get id(){
        return this.props.id
    }

    get product(){
        return this.props.productId
    }
    get user(){
        return this.props.userId
    }
    get type(){
        return this.props.type
    }
    get quantity(){
        return this.props.quantity
    }
    get price(){
        return this.props.price
    }

    static create(props: Omit<MoveProps, 'createdAt'>): Move{
        return new Move({
            ...props,
            createdAt: new Date()
        })
    }  


    toObject(){
        return{
            id: this.props.id,
            user: this.props.userId,
            product: this.props.productId,
            price: this.props.price,
            type: this.props.type,
            quantity: this.props.quantity,
            createdAt: this.props.createdAt
        }
    }
}