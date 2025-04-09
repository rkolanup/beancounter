import { AppDataSource } from '../db/data-source';
import { Category } from '../db/entities/categorie.entity';

export class CategoryService {
    private categoryRepo = AppDataSource.getRepository(Category);

    async createCategory(name: string, description?: string) {
        const existing = await this.categoryRepo.findOne({ where: { name } });

        if (existing) {
            throw new Error('Category already exists');
        }

        const category = this.categoryRepo.create({
            name,
            description: description || null,
        });

        return await this.categoryRepo.save(category);
    }

    async getAllCategories() {
        return await this.categoryRepo.find({
            order: { name: "DESC" },
        });
    }

    async updateCategory(id: number, updates: { name?: string; description?: string }) {
        const category = await this.categoryRepo.findOne({ where: { id } });

        if (!category) {
            throw new Error('Category not found');
        }

        if (updates.name !== undefined) category.name = updates.name;
        if (updates.description !== undefined) category.description = updates.description;

        return await this.categoryRepo.save(category);
    }


    async deleteCategory(id: number) {
        const category = await this.categoryRepo.findOne({ where: { id } });

        if (!category)
            throw new Error('Category not found');
        await this.categoryRepo.remove(category);

        return { message: 'Category deleted' };
    }
}
