"use client";

import { useState, useEffect, KeyboardEvent } from "react";
import api from "../lib/axios";
import {
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
    TableSortLabel,
    Alert,
    Autocomplete,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

interface Budget {
    id: number;
    category: CategoryOption;
    limit: number;
}

interface CategoryOption {
    id: number;
    name: string;
}

export default function BudgetPage() {
    const [budget, setBudget] = useState<Budget[]>([]);
    const [categories, setCategories] = useState<CategoryOption[]>([]);
    const [categoryInput, setCategoryInput] = useState<CategoryOption | null>(null);
    const [limitInput, setLimitInput] = useState("");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingCategory, setEditingCategory] = useState<CategoryOption | null>(null);
    const [editingLimit, setEditingLimit] = useState("");

    const fetchBudgets = async () => {
        try {
            const res = await api.get("/budgets");
            setBudget(res.data);
        } catch (err) {
            console.error("Failed to fetch budgets", err);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await api.get("/category");
            setCategories(res.data);
        } catch (err) {
            console.error("Failed to fetch categories", err);
        }
    };

    useEffect(() => {
        fetchBudgets();
        fetchCategories();
    }, []);

    const handleSort = () => {
        setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    };

    const sortedBudgets = [...budget].sort((a, b) => {
        if (a.category.name < b.category.name) return sortDirection === "asc" ? -1 : 1;
        if (a.category.name > b.category.name) return sortDirection === "asc" ? 1 : -1;
        return 0;
    });

    const handleAddBudget = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (!categoryInput || !limitInput || isNaN(parseFloat(limitInput))) {
            setErrorMessage("Please select a category and enter a valid limit amount.");
            return;
        }

        setErrorMessage(null);
        try {
            await api.post("/budgets", {
                category: { id: categoryInput?.id },
                limit: parseFloat(limitInput)
            });
            setCategoryInput(null);
            setLimitInput("");
            fetchBudgets();
        } catch (err) {
            setErrorMessage("Failed to add budget");
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            const syntheticEvent = { preventDefault: () => { } } as React.FormEvent;
            handleAddBudget(syntheticEvent);
        }
    };

    const handleEdit = (budget: Budget) => {
        setEditingId(budget.id);
        const matchedCategory = categories.find(cat => cat.name === budget.category.name) || null;
        setEditingCategory(matchedCategory);
        setEditingLimit(budget.limit.toString());
    };

    const handleSaveEdit = async () => {
        try {
            await api.put(`/budgets/${editingId}`, {
                category: { id: editingCategory?.id },
                limit: parseFloat(editingLimit)
            });
            setEditingId(null);
            setEditingCategory(null);
            setEditingLimit("");
            fetchBudgets();
        } catch (err) {
            setErrorMessage("Failed to update budget");
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditingCategory(null);
        setEditingLimit("");
    };

    return (
        <div className="flex justify-center min-h-screen items-center">
            <div className="w-full px-6 max-w-7xl bg-white shadow rounded-2xl pb-6">
                <h1 className="text-2xl font-bold mb-6 text-center pt-6">Budgets</h1>
                {errorMessage && (
                    <Alert severity="error" className="mb-4">{errorMessage}</Alert>
                )}

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sortDirection={sortDirection}>
                                    <TableSortLabel
                                        active
                                        direction={sortDirection}
                                        onClick={handleSort}
                                    >
                                        Category
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>Limit</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Autocomplete
                                        options={categories}
                                        getOptionLabel={(option) => option.name}
                                        value={categoryInput}
                                        onChange={(e, value) => setCategoryInput(value)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="standard"
                                                placeholder="Category"
                                                onKeyDown={handleKeyDown}
                                            />
                                        )}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        variant="standard"
                                        value={limitInput}
                                        type="number"
                                        onChange={(e) => setLimitInput(e.target.value)}
                                        placeholder="Limit"
                                        onKeyDown={handleKeyDown}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Button onClick={handleAddBudget} disabled={!categoryInput || !limitInput}>
                                        Add
                                    </Button>
                                </TableCell>
                            </TableRow>

                            {sortedBudgets.map((budget) => (
                                <TableRow key={budget.id}>
                                    <TableCell>
                                        {editingId === budget.id ? (
                                            <Autocomplete
                                                options={categories}
                                                getOptionLabel={(option) => option.name}
                                                value={editingCategory}
                                                onChange={(e, value) => setEditingCategory(value)}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="standard"
                                                    />
                                                )}
                                            />
                                        ) : (
                                            budget.category.name
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editingId === budget.id ? (
                                            <TextField
                                                value={editingLimit}
                                                onChange={(e) => setEditingLimit(e.target.value)}
                                                variant="standard"
                                                type="number"
                                            />
                                        ) : (
                                            `$${budget.limit}`
                                        )}
                                    </TableCell>
                                    <TableCell align="right">
                                        {editingId === budget.id ? (
                                            <>
                                                <Button onClick={handleSaveEdit}>Save</Button>
                                                <Button onClick={handleCancelEdit}>Cancel</Button>
                                            </>
                                        ) : (
                                            <IconButton onClick={() => handleEdit(budget)}>
                                                <EditIcon />
                                            </IconButton>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}