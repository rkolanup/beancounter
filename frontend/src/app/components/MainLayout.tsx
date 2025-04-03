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
        <div className="flex">
            <CssBaseline />
            <Header open={open} handleDrawerOpen={handleDrawerOpen} />
            <SideNav open={open} handleDrawerClose={handleDrawerClose} />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
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
            >
                <Toolbar />
                <div>{children}</div>
            </Box>
        </div>
    );
}
