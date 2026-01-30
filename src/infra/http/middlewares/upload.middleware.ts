import type { Request, Response } from 'express'
import multer from 'multer'

const storage = multer.memoryStorage()

const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    callback: multer.FileFilterCallback
 ) => {
    const allowedTypes = ["image/jpg", "image/jpeg", "image/png"]
    if(allowedTypes.includes(file.mimetype)){
        callback(null, true)
    } else{
        throw new Error("Tipo de arquivo incompativel")
    }
 }

export const uploadAvatar = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
}).single('avatar')