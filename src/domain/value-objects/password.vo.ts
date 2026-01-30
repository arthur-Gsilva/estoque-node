export class Password {
    private readonly value: string

    private constructor(password: string) {
        this.value = password
        this.validate()
    }

    static create(password: string): Password {
        return new Password(password)
    }

    private validate(): void {
        if (this.value.length < 8) {
            throw new Error('Senha deve ter no mínimo 8 caracteres')
        }
    }

    getValue(): string {
        return this.value
    }
}