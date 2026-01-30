import { Email } from '../value-objects/email.vo'

export type UserProps = {
    id: string
    name: string
    email: Email
    password: string 
    admin: boolean
    avatar?: string
    token?: string | undefined
    createdAt: Date
    updatedAt: Date
}

export class User {
    private props: UserProps

    constructor(props: UserProps) {
        this.props = props
    }

    get id(): string {
        return this.props.id
    }

    get name(): string {
        return this.props.name
    }

    get email(): Email {
        return this.props.email
    }

    get password(): string {
        return this.props.password
    }

    get admin(): boolean {
        return this.props.admin
    }

    get avatar(): string | undefined {
        return this.props.avatar
    }

    get token(): string | undefined {
        return this.props.token
    }

    updateName(name: string): void {
        if (name.length < 3) {
            throw new Error('Nome do usuário deve ter no mínimo 3 caracteres')
        }
        this.props.name = name
        this.touch()
    }

    updateEmail(email: Email): void {
        this.props.email = email
        this.touch()
    }

    updatePassword(hashedPassword: string): void {
        this.props.password = hashedPassword
        this.touch()
    }

    updateAvatar(avatar: string): void {
        this.props.avatar = avatar
        this.touch()
    }

    setToken(token: string): void {
        this.props.token = token
        this.touch()
    }

    clearToken(): void {
        this.props.token = undefined
        this.touch()
    }

    private touch(): void {
        this.props.updatedAt = new Date()
    }

    static create(props: Omit<UserProps, 'createdAt' | 'updatedAt'>): User {
        return new User({
            ...props,
            createdAt: new Date(),
            updatedAt: new Date()
        })
    }

    toObject() {
        return {
            id: this.props.id,
            name: this.props.name,
            email: this.props.email.getValue(),
            password: this.props.password,
            admin: this.props.admin,
            avatar: this.props.avatar,
            token: this.props.token,
            createdAt: this.props.createdAt,
            updatedAt: this.props.updatedAt
        }
    }
}