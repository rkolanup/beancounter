"use client";

import { useState, useEffect, useMemo } from "react";
import {
    Box,
    TextField,
    Button,
    MenuItem,
    Typography,
    Autocomplete,
    Paper,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TableSortLabel,
} from "@mui/material";
import api from "../lib/axios";
import DownloadExcelButton from "../components/DownloadExcelButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function TrackExpensePage() {
    const currentYear = new Date().getFullYear();
    const lastMonth = new Date().getMonth();

    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [transactionSummary, setTransactionSummary] = useState<any[]>([]);
    const [formTouched, setFormTouched] = useState(false);

    const [sortBy, setSortBy] = useState("category");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const [formData, setFormData] = useState({
        month: lastMonth === 0 ? 12 : lastMonth,
        year: currentYear,
        expenseType: "variable",
        transactionType: "expense",
        amount: "",
        notes: "",
    });

    const handleSort = (field: string) => {
        if (sortBy === field) {
            // Toggle direction
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortBy(field);
            setSortDirection("asc");
        }
    };

    const sortedTransactions = useMemo(() => {
        return [...transactionSummary].sort((a, b) => {
            let aValue = sortBy === "totalAmount" ? parseFloat(a[sortBy]) : a[sortBy];
            let bValue = sortBy === "totalAmount" ? parseFloat(b[sortBy]) : b[sortBy];

            if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
            if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });
    }, [transactionSummary, sortBy, sortDirection]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get("/category");
                setCategories(res.data);
            } catch (err) {
                console.error("Failed to fetch categories", err);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchTransactionSummary = async () => {
            console.log("Fetching transaction summary for month:", formData.month, "year:", formData.year);
            try {
                const res = await api.get("/transactions/summary", {
                    params: {
                        month: formData.month,
                        year: formData.year,
                    },
                });
                setTransactionSummary(res.data);
            } catch (err) {
                console.error("Failed to fetch transaction summary", err);
            }
        };

        fetchTransactionSummary();
    }, [formData.month, formData.year]);


    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: any) => {
        if (!selectedCategory || !formData.amount || parseFloat(formData.amount) <= 0) {
            alert("Please select a category.");
            return;
        }

        if (!formData.amount || parseFloat(formData.amount) <= 0) {
            alert("Please enter a valid amount.");
            return;
        }
        e.preventDefault();
        setFormTouched(true);

        const today = new Date().toISOString().split('T')[0]
        const payload = {
            amount: parseFloat(formData.amount), // Convert string to number if needed
            expenseType: formData.expenseType,
            type: formData.transactionType,
            description: formData.notes,
            month: formData.month,
            year: formData.year,
            date: today,
            category: {
                id: selectedCategory?.id || null,
            },
        };

        try {
            const res = await api.post("/transactions", payload);

            const summaryRes = await api.get("/transactions/summary", {
                params: {
                    month: formData.month,
                    year: formData.year
                }
            });

            setTransactionSummary(summaryRes.data);

            setFormData({
                month: lastMonth === 0 ? 12 : lastMonth,
                year: currentYear,
                expenseType: "variable",
                transactionType: "expense",
                amount: "",
                notes: "",
            });
            setFormTouched(false);
        } catch (err) {
            console.error("Failed to save transaction", err);
        }
    };

    const months = Array.from({ length: 12 }, (_, i) => ({
        value: i + 1,
        label: new Date(0, i).toLocaleString("default", { month: "long" }),
    }));

    return (
        <div className="flex justify-center min-h-screen">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Form Card */}
                <div className="p-6 bg-white shadow rounded-2xl">
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
                                    <TextField
                                        {...params}
                                        label="Category"
                                        error={formTouched && !selectedCategory}
                                    />
                                )}
                                sx={{ flex: 1 }}
                            />

                            <TextField
                                name="amount"
                                label="Amount"
                                type="number"
                                value={formData.amount}
                                onChange={handleChange}
                                error={formTouched && (!formData.amount || parseFloat(formData.amount) <= 0)}
                            />

                            <TextField name="notes" label="Notes" value={formData.notes} onChange={handleChange} sx={{ flex: 1 }} />


                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    width: 128,
                                    height: 48,
                                    backgroundColor: '#451a03',
                                    '&:hover': { backgroundColor: '#78350f' },
                                    textTransform: "none",
                                    borderRadius: 2,
                                }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </div>

                {/* Summary Table Card */}
                {transactionSummary.length > 0 && (
                    <div className="p-6 bg-white shadow rounded-2xl">
                        <div className="flex justify-between items-center mb-4 px-4">
                            <Typography variant="h5" className="mb-4">Transaction Summary</Typography>
                            <DownloadExcelButton data={transactionSummary.map((item) => ({
                                Category: item.category,
                                "Total Amount": parseFloat(item.totalAmount).toFixed(2),
                                Description: item.description,
                            }))}
                                filename={`Transaction_Summary_${formData.month}_${formData.year}.xlsx`} />
                        </div>

                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sortDirection={sortBy === "category" ? sortDirection : false}>
                                            <TableSortLabel
                                                active={sortBy === "category"}
                                                direction={sortDirection}
                                                onClick={() => handleSort("category")}
                                                className="table-heading"
                                            >
                                                Category
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell sortDirection={sortBy === "totalAmount" ? sortDirection : false}>
                                            <TableSortLabel
                                                active={sortBy === "totalAmount"}
                                                direction={sortDirection}
                                                onClick={() => handleSort("totalAmount")}
                                                className="table-heading"
                                            >
                                                Total Amount
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell className="table-heading">Description</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {sortedTransactions.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.category}</TableCell>
                                            <TableCell>${parseFloat(item.totalAmount).toFixed(2)}</TableCell>
                                            <TableCell>{item.description}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell className="table-heading">Total</TableCell>
                                        <TableCell className="table-heading">
                                            $
                                            {transactionSummary
                                                .reduce((sum, item) => sum + parseFloat(item.totalAmount), 0)
                                                .toFixed(2)}
                                        </TableCell>
                                        <TableCell />
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                )}
            </div>
        </div>
    );
}
