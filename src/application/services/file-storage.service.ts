// src/application/services/file-storage.service.ts

import path from 'path'
import fs from 'fs/promises'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { type IFileStorage } from './file-storage.interface'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export class LocalFileStorage implements IFileStorage {
    private readonly AVATAR_SIZE = 50
    private readonly AVATAR_DIR = path.join(__dirname, '../../../public/avatars')

    async saveAvatar(buffer: Buffer, originalName: string): Promise<string> {
        await fs.mkdir(this.AVATAR_DIR, { recursive: true })

        const ext = path.extname(originalName)
        const filename = `avatar-${Date.now()}${ext}`
        const filepath = path.join(this.AVATAR_DIR, filename)

        await sharp(buffer)
            .resize(this.AVATAR_SIZE, this.AVATAR_SIZE, {
                fit: 'cover',
                position: 'center'
            })
            .toFile(filepath)

        return filename
    }

    async deleteAvatar(filename: string): Promise<void> {
        if (!filename) return

        const filepath = path.join(this.AVATAR_DIR, filename)
        
        try {
            await fs.unlink(filepath)
        } catch (error) {
            // Arquivo não existe, ignora
        }
    }
}