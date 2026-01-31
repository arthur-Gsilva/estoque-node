export interface ITransaction {
    execute<T>(callback: () => Promise<T>): Promise<T>
}