import type { Request, Response } from "express";
import { CreateCategory } from "../../../application/use-cases/category/create-category.use-cases";
import type { GetCategoryById } from "../../../application/use-cases/category/get-category-by-id.use-cases";
import type { ListCategories } from "../../../application/use-cases/category/list-categories.use-cases";
import type { UpdateCategory } from "../../../application/use-cases/category/update-category.use-cases";
import type { DeleteCategory } from "../../../application/use-cases/category/delete-category.use-cases";

export class CategoryController {
    constructor(
        private createCategoryUseCase: CreateCategory,
        private getCategoryById: GetCategoryById,
        private getAllCategories: ListCategories,
        private updateCategory: UpdateCategory,
        private deleteCategory: DeleteCategory
    ){}

    create = async (req: Request, res: Response) => {
        try {
            const { name } = req.body

            const category = await this.createCategoryUseCase.execute(name)

            return res.status(201).json({ 
                error: null, 
                data: category 
            })
        } catch (error: any) {
            return res.status(400).json({ 
                error: error.message 
            })
        }
    }

    list = async (req: Request, res: Response) => {
        try{
            const { includeProductCount } = req.query
            const isIncluded = includeProductCount ? true : false
            
            const categories = await this.getAllCategories.execute(isIncluded)

            return res.json({ error: null, data: categories })
        }catch (error: any) {
            return res.status(400).json({ 
                error: error.message 
            })
        }
    }

    find = async (req: Request, res: Response) => {
        try{
            const { id } = req.params

            const category = await this.getCategoryById.execute(id as string)

            return res.json({ error: null, data: category })
        } catch (error: any) {
            return res.status(400).json({ 
                error: error.message 
            })
        }
    }

    update = async (req: Request, res: Response) => {
        try{
            const { id } = req.params
            const { name } = req.body

            const category = await this.updateCategory.execute(id as string, name)
            if(!category){
                res.status(404).json({ error: "Categoria não encontrada" })
            }

            return res.json({ error: null, data: category })
        } catch (error: any) {
            return res.status(400).json({ 
                error: error.message 
            })
        }
    }

    delete = async (req: Request, res: Response) => {
        try{
            const { id } = req.params

            await this.deleteCategory.execute(id as string)

            return res.json({ error: null, data: "Categoria excluída com sucesso" })
        } catch(error: any){
            return res.status(400).json({
                error: error.message
            })
        }
    }
}