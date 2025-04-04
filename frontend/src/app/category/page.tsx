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
    IconButton,
    TableSortLabel
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Alert } from "@mui/material";


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
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
    const [editingName, setEditingName] = useState("");
    const [editingDescription, setEditingDescription] = useState("");

    const fetchCategories = async () => {
        try {
            const res = await api.get("/category"); // Backend GET /categories
            setCategories(res.data);
        } catch (err) {
            console.error("Failed to fetch categories", err);
        }
    };

    const handleSortByName = () => {
        setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    };

    const sortedCategories = [...categories].sort((a, b) => {
        if (a.name < b.name) return sortDirection === "asc" ? -1 : 1;
        if (a.name > b.name) return sortDirection === "asc" ? 1 : -1;
        return 0;
    });

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            if (editingCategoryId !== null) {
                handleSaveEdit();
            } else {
                handleAddCategory(e as any); // cast to any since React.FormEvent is expected
            }
        }
    };

    const handleAddCategory = async (e: React.FormEvent) => {
        setErrorMessage(null);
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
        } catch (err: any) {
            if (err.response?.data?.message === "Category already exists") {
                setErrorMessage("Category already exists");
            } else {
                setErrorMessage("Something went wrong while saving the category.");
            }
            console.error("Failed to add/edit category", err);
        }
    };

    // const handleEditCategory = (category: Category) => {
    //     setCategoryInput(category.name);
    //     setDescriptionInput(category.description || '');
    //     setSelectedCategoryId(category.id); // Add this to state to track editing
    // };

    const handleEditCategory = (category: Category) => {
        setEditingCategoryId(category.id);
        setEditingName(category.name);
        setEditingDescription(category.description || "");
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

    const handleSaveEdit = async () => {
        try {
            await api.put(`/category/${editingCategoryId}`, {
                name: editingName.trim(),
                description: editingDescription.trim(),
            });
            setEditingCategoryId(null);
            setEditingName("");
            setEditingDescription("");
            fetchCategories();
        } catch (err) {
            console.error("Failed to save edited category", err);
        }
    };

    const handleCancelEdit = () => {
        setEditingCategoryId(null);
        setEditingName("");
        setEditingDescription("");
    };

    useEffect(() => {
        fetchCategories();
    }, []);
    useEffect(() => {
        if (errorMessage) {
            const timeout = setTimeout(() => setErrorMessage(null), 3000);
            return () => clearTimeout(timeout);
        }
    }, [errorMessage]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-4xl p-6 bg-white shadow rounded-2xl">
                <h1 className="text-2xl font-bold mb-6 text-center">Categories List</h1>
                {errorMessage && (
                    <Alert severity="error" className="mb-4">
                        {errorMessage}
                    </Alert>
                )}
                {/* MUI Table for Categories */}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sortDirection={sortDirection}>
                                    <TableSortLabel
                                        active
                                        direction={sortDirection}
                                        onClick={handleSortByName}
                                    >
                                        Category
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <TextField
                                        variant="standard"
                                        value={categoryInput}
                                        onChange={(e) => setCategoryInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="New category name"
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        variant="standard"
                                        value={descriptionInput}
                                        onChange={(e) => setDescriptionInput(e.target.value)}
                                        placeholder="New description"
                                        onKeyDown={handleKeyDown}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Button
                                        onClick={handleAddCategory}
                                        size="small"
                                        disabled={!categoryInput.trim()}
                                        style={{ color: "#451b03" }}
                                    >
                                        Add
                                    </Button>
                                </TableCell>
                            </TableRow>


                            {sortedCategories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell>
                                        {editingCategoryId === category.id ? (
                                            <TextField
                                                value={editingName}
                                                onChange={(e) => setEditingName(e.target.value)}
                                                variant="standard"
                                                onKeyDown={handleKeyDown}
                                            />
                                        ) : (
                                            category.name
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editingCategoryId === category.id ? (
                                            <TextField
                                                value={editingDescription}
                                                onChange={(e) => setEditingDescription(e.target.value)}
                                                variant="standard"
                                                onKeyDown={handleKeyDown}
                                            />
                                        ) : (
                                            category.description || '—'
                                        )}
                                    </TableCell>
                                    <TableCell align="right">
                                        {editingCategoryId === category.id ? (
                                            <>
                                                <Button size="small" style={{ color: "#451b03" }} onClick={handleSaveEdit}>Save</Button>
                                                <Button size="small" style={{ color: "#451b03" }} onClick={handleCancelEdit}>Cancel</Button>
                                            </>
                                        ) : (
                                            <IconButton
                                                sx={{ color: 'var(--text-color)' }}
                                                size="small"
                                                aria-label="Edit Category"
                                                onClick={() => handleEditCategory(category)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
            </div >
        </div>
    );
}
