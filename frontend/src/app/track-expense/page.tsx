"use client";

import { useState, useEffect } from "react";
import {
    Box,
    TextField,
    Button,
    MenuItem,
    Typography,
    Autocomplete,
    Paper,
} from "@mui/material";
import api from "../lib/axios";

export default function TrackExpensePage() {
    const currentYear = new Date().getFullYear();
    const lastMonth = new Date().getMonth();

    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);

    const [formData, setFormData] = useState({
        month: lastMonth === 0 ? 12 : lastMonth,
        year: currentYear,
        expenseType: "variable",
        transactionType: "expense",
        amount: "",
        notes: "",
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get("/category");
                setCategories(res.data); // Expects [{ id: 1, name: "Food" }, ...]
            } catch (err) {
                console.error("Failed to fetch categories", err);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const payload = {
            ...formData,
            categoryId: selectedCategory?.id || null,
        };
        console.log("Submitting:", payload);
        // api.post("/transactions", payload);
    };

    const months = Array.from({ length: 12 }, (_, i) => ({
        value: i + 1,
        label: new Date(0, i).toLocaleString("default", { month: "long" }),
    }));

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded-2xl">
            <h1 className="text-2xl font-bold mb-6 text-center">Add Expenses</h1>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                    <TextField select name="month" label="Month" value={formData.month} onChange={handleChange} sx={{ flex: 1 }}>
                        {months.map((m) => (<MenuItem key={m.value} value={m.value}>{m.label}</MenuItem>))}
                    </TextField>

                    <TextField name="year" label="Year" type="number" value={formData.year} onChange={handleChange} sx={{ flex: 1 }} />

                    <TextField select name="expenseType" label="Expense Type" value={formData.expenseType} onChange={handleChange} sx={{ flex: 1 }}>
                        <MenuItem value="fixed">Fixed</MenuItem>
                        <MenuItem value="variable">Variable</MenuItem>
                    </TextField>

                    <TextField select name="transactionType" label="Transaction Type" value={formData.transactionType} onChange={handleChange} sx={{ flex: 1 }}>
                        <MenuItem value="expense">Expense</MenuItem>
                        <MenuItem value="income">Income</MenuItem>
                    </TextField>
                </Box>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                    <Autocomplete
                        options={categories}
                        getOptionLabel={(option) => option.name}
                        value={selectedCategory}
                        onChange={(event, newValue) => setSelectedCategory(newValue)}
                        renderInput={(params) => (
                            <TextField {...params} label="Category" />
                        )}
                        sx={{ flex: 1 }}
                    />

                    <TextField
                        name="amount"
                        label="Amount"
                        type="number"
                        value={formData.amount}
                        onChange={handleChange}
                        sx={{ flex: 1 }}
                    />
                </Box>

                <TextField name="notes" label="Notes" multiline minRows={3} value={formData.notes} onChange={handleChange} fullWidth />
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="w-32 h-12 bg-amber-950 text-white rounded-lg hover:bg-amber-900 transition"
                    >
                        Submit
                    </button>
                </div>

            </Box>
        </div>
    );
}
