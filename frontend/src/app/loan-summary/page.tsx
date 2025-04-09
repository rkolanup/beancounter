"use client";

import { useEffect, useState } from "react";
import {
    Paper,
    TextField,
    Button,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
} from "@mui/material";
import api from "../lib/axios";

type LoanFormData = {
    lender: string;
    originalAmount: string;
    balance: string;
    interestRate: string;
    startDate: string;
    monthlyPayment: string;
    notes?: string;
};

export default function LoanForm() {
    const [formData, setFormData] = useState<LoanFormData>({
        lender: "",
        originalAmount: "",
        balance: "",
        interestRate: "",
        startDate: "",
        monthlyPayment: "",
        notes: "",
    });

    const [loans, setLoans] = useState<LoanFormData[]>([]);
    const [formTouched, setFormTouched] = useState(false);

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const res = await api.get("/loans");
                setLoans(res.data);
            } catch (err) {
                console.error("Failed to fetch transaction summary", err);
            }
        };
        fetchLoans();
    }, [formTouched]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setFormTouched(true);

        try {
            await api.post("/loans", formData);
            const summaryRes = await api.get("/loans");
            setLoans(summaryRes.data);

            setFormData({
                lender: "",
                originalAmount: "",
                balance: "",
                interestRate: "",
                startDate: "",
                monthlyPayment: "",
                notes: "",
            });
            setFormTouched(false);
        } catch (err) {
            console.error("Failed to save Loan", err);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen py-10" style={{ marginLeft: '15%' }}>
            <Paper elevation={3} className="p-8 w-full max-w-6xl">
                <Typography variant="h5" gutterBottom align="center" style={{ fontWeight: 'bold', color: '#451b03' }}>
                    Add Loan
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Box
                        display="flex"
                        flexWrap="wrap"
                        gap={3}
                        justifyContent="space-between"
                    >
                        <TextField
                            label="Lender"
                            name="lender"
                            value={formData.lender}
                            onChange={handleChange}
                            fullWidth
                            required
                            sx={{ flexBasis: { xs: "100%", sm: "48%", md: "30%" } }}
                        />
                        <TextField
                            label="Original Amount"
                            name="originalAmount"
                            type="number"
                            value={formData.originalAmount}
                            onChange={handleChange}
                            fullWidth
                            required
                            sx={{ flexBasis: { xs: "100%", sm: "48%", md: "30%" } }}
                        />
                        <TextField
                            label="Balance"
                            name="balance"
                            type="number"
                            value={formData.balance}
                            onChange={handleChange}
                            fullWidth
                            required
                            sx={{ flexBasis: { xs: "100%", sm: "48%", md: "30%" } }}
                        />
                        <TextField
                            label="Interest Rate (%)"
                            name="interestRate"
                            type="number"
                            value={formData.interestRate}
                            onChange={handleChange}
                            fullWidth
                            required
                            sx={{ flexBasis: { xs: "100%", sm: "48%", md: "30%" } }}
                        />
                        <TextField
                            label="Monthly Payment"
                            name="monthlyPayment"
                            type="number"
                            value={formData.monthlyPayment}
                            onChange={handleChange}
                            fullWidth
                            required
                            sx={{ flexBasis: { xs: "100%", sm: "48%", md: "30%" } }}
                        />
                        <TextField
                            label="Start Date"
                            name="startDate"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={formData.startDate}
                            onChange={handleChange}
                            fullWidth
                            required
                            sx={{ flexBasis: { xs: "100%", sm: "48%", md: "30%" } }}
                        />
                        <TextField
                            label="Notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            multiline
                            minRows={2}
                            fullWidth
                            sx={{ flexBasis: "100%" }}
                        />
                        <Box width="100%" textAlign="center" mt={2}>
                            <button type="submit" className="w-32 h-12 bg-amber-950 text-white rounded-lg hover:bg-amber-900 transition">
                                Save
                            </button>
                        </Box>
                    </Box>
                </form>
                {loans.length > 0 && (
                    <TableContainer component={Paper} className="mt-8 w-full max-w-6xl">
                        <Typography variant="h6" className="p-4">
                            Saved Loans
                        </Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Lender</TableCell>
                                    <TableCell>Original Amount</TableCell>
                                    <TableCell>Balance</TableCell>
                                    <TableCell>Interest Rate</TableCell>
                                    <TableCell>Start Date</TableCell>
                                    <TableCell>Monthly Payment</TableCell>
                                    <TableCell>Notes</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loans.map((loan, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{loan.lender}</TableCell>
                                        <TableCell>${Number(loan.originalAmount).toFixed(2)}</TableCell>
                                        <TableCell>${Number(loan.balance).toFixed(2)}</TableCell>
                                        <TableCell>{Number(loan.interestRate).toFixed(2)}%</TableCell>
                                        <TableCell>{loan.startDate}</TableCell>
                                        <TableCell>${Number(loan.monthlyPayment).toFixed(2)}</TableCell>
                                        <TableCell>{loan.notes || "—"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Paper>
        </div>
    );
}
