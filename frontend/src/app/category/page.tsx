"use client";

import { useState, useEffect } from "react";
import api from "../lib/axios";
import {
    Autocomplete,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

interface Category {
    id: number;
    name: string;
    description?: string | null;
}

export default function CategoryPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryInput, setCategoryInput] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<Category | string | null>(null);
    const [descriptionInput, setDescriptionInput] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    const fetchCategories = async () => {
        try {
            const res = await api.get("/category"); // Backend GET /categories
            setCategories(res.data);
        } catch (err) {
            console.error("Failed to fetch categories", err);
        }
    };

    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!categoryInput.trim()) return;

            if (selectedCategoryId) {
                // Edit existing
                console.log('descriptionInput: ', descriptionInput);
                await api.put(`/category/${selectedCategoryId}`, {
                    name: categoryInput.trim(),
                    description: descriptionInput.trim(),
                });
            } else {
                // Create new
                await api.post("/category", {
                    name: categoryInput.trim(),
                    description: descriptionInput.trim(),
                });
            }

            setCategoryInput("");
            setDescriptionInput("");
            setSelectedCategoryId(null);
            fetchCategories();
        } catch (err) {
            console.error("Failed to add/edit category", err);
        }
    };

    const handleEditCategory = (category: Category) => {
        setCategoryInput(category.name);
        setDescriptionInput(category.description || '');
        setSelectedCategoryId(category.id); // Add this to state to track editing
    };

    const handleDeleteCategory = async (categoryId: number) => {
        if (!confirm("Are you sure you want to delete this category?")) return;
        try {
            await api.delete(`/category/${categoryId}`);
            fetchCategories(); // Refresh the list
        } catch (err) {
            console.error("Failed to delete category", err);
        }
    };



    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded-2xl">
            <h1 className="text-2xl font-bold mb-6">Categories List</h1>

            <form onSubmit={handleAddCategory} className="flex gap-4 mb-6">
                <TextField
                    label="Category Name"
                    variant="outlined"
                    fullWidth
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value)}
                    required
                />

                <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    value={descriptionInput}
                    onChange={(e) => setDescriptionInput(e.target.value)}
                />

                <button
                    type="submit"
                    className="w-32 h-12 bg-amber-950 text-white rounded-lg hover:bg-amber-900 transition self-end"
                >
                    {selectedCategoryId ? "Edit" : "Add"}
                </button>
            </form>


            {/* <form onSubmit={handleAddCategory} className="flex items-center gap-4 mb-6">
                <Autocomplete
                    freeSolo
                    className="w-full"
                    options={categories}
                    getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
                    value={selectedCategory}
                    inputValue={categoryInput}
                    onInputChange={(event, newInputValue) => setCategoryInput(newInputValue)}
                    onChange={(event, newValue) => setSelectedCategory(newValue)}
                    renderInput={(params) => (
                        <TextField {...params} label="Category" variant="outlined" fullWidth />
                    )}
                />
                <button
                    type="submit"
                    className="w-12 h-12 bg-amber-950 text-white rounded-full flex items-center justify-center hover:bg-amber-900 transition"
                >
                    +
                </button>
            </form> */}

            {/* MUI Table for Categories */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell>{category.name}</TableCell>
                                <TableCell>{category.description || '—'}</TableCell>
                                <TableCell align="right">
                                    <IconButton sx={{ color: 'var(--text-color)' }} size="small" aria-label="Edit Category" onClick={() => handleEditCategory(category)}>< EditIcon /></IconButton>
                                    <IconButton sx={{ color: 'var(--danger-color)' }} size="small" aria-label="Delete Category" onClick={() => handleDeleteCategory(category.id)}>< DeleteRoundedIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
