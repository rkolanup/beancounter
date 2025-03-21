import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';

const categoryService = new CategoryService();

export class CategoryController {
    async create(req: Request, res: Response) {
        try {
            const category = await categoryService.createCategory(req.body.name);
            res.status(201).json(category);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }

    async getAll(req: Request, res: Response) {
        const categories = await categoryService.getAllCategories();
        res.json(categories);
    }

    async update(req: Request, res: Response) {
        try {
            const { name, description } = req.body;
            const updated = await categoryService.updateCategory(
                Number(req.params.id),
                {
                    name,
                    description
                }
            );
            res.json(updated);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }


    async delete(req: Request, res: Response) {
        try {
            const result = await categoryService.deleteCategory(Number(req.params.id));
            res.json(result);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }
}