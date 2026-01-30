export class Email {
    private readonly value: string

    private constructor(email: string) {
        this.value = email
        this.validate()
    }

    static create(email: string): Email {
        return new Email(email)
    }

    private validate(): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        
        if (!emailRegex.test(this.value)) {
            throw new Error('Email inválido')
        }
    }

    getValue(): string {
        return this.value
    }

    equals(other: Email): boolean {
        return this.value === other.value
    }
}