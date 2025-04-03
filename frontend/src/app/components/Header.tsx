"use client";

import React from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface AppHeaderProps {
    open: boolean;
    handleDrawerOpen: () => void;
}

export default function Header({ open, handleDrawerOpen }: AppHeaderProps) {
    return (
        <AppBar
            position="fixed"
            sx={{
                background: '#451b03',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                transition: (theme) =>
                    theme.transitions.create(["width", "margin"], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                ...(open && {
                    marginLeft: 240,
                    width: `calc(100% - 240px)`,
                    transition: (theme) =>
                        theme.transitions.create(["width", "margin"], {
                            easing: theme.transitions.easing.easeOut,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                }),
            }}
        >
            <Toolbar className="flex justify-between">
                {!open && (
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                <Typography variant="h5" noWrap>
                    Bean Counter
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
