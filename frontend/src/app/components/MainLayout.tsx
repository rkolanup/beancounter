"use client";

import * as React from "react";
import { Box, CssBaseline, Toolbar, Typography } from "@mui/material";
import Header from "./Header";
import SideNav from "./SideNav";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    return (
        <div className="flex justify-center">
            <CssBaseline />
            <Header open={open} handleDrawerOpen={handleDrawerOpen} />
            <SideNav open={open} handleDrawerClose={handleDrawerClose} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    mt: 12, // Top margin
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start", // Changed from "center" to start aligning below header
                    minHeight: "100vh",
                    transition: (theme) =>
                        theme.transitions.create("margin", {
                            easing: open
                                ? theme.transitions.easing.easeOut
                                : theme.transitions.easing.sharp,
                            duration: open
                                ? theme.transitions.duration.enteringScreen
                                : theme.transitions.duration.leavingScreen,
                        }),
                    marginLeft: open ? "0px" : `-${240}px`,
                }}
                className="MuiBox-root" // Optional: force override if needed
            >
                <Toolbar />
                <Box sx={{ width: "100%", maxWidth: "1200px" }}>
                    {children}
                </Box>
            </Box>
        </div>
    );
}
