export interface IFileStorage {
    saveAvatar(buffer: Buffer, filename: string): Promise<string>
    deleteAvatar(filename: string): Promise<void>
}