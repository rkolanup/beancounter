"use client";

import React from "react";
import {
    Drawer,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Tooltip,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTheme } from "@mui/material/styles";
import Dashboard from "../dashboard/page";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Link from "next/link";

interface SideNavProps {
    open: boolean;
    handleDrawerClose: () => void;
}

const openWidth = 240;
const closedWidth = 60;

export default function SideNav({ open, handleDrawerClose }: SideNavProps) {
    const theme = useTheme();

    const drawerWidth = open ? openWidth : closedWidth;

    const navItems = [
        { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
        { text: "Categories", icon: <CategoryIcon />, path: "/category" },
        { text: "Expense Tracker", icon: <AttachMoneyIcon />, path: "/track-expense" },
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                whiteSpace: "nowrap",
                boxSizing: "border-box",
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    transition: theme.transitions.create("width", {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.standard,
                    }),
                    overflowX: "hidden",
                },
            }}
            open={open}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: open ? "flex-end" : "center",
                }}
            >
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </Toolbar>

            <Divider />

            <List>
                {navItems.map(({ text, icon, path }) => (
                    <ListItem key={text} disablePadding sx={{ display: "block" }}>
                        <Tooltip title={!open ? text : ""} placement="right">
                            <ListItemButton
                                component={Link}
                                href={path}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? "initial" : "center",
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : "auto",
                                        justifyContent: "center",
                                    }}
                                >
                                    {icon}
                                </ListItemIcon>
                                {open && <ListItemText primary={text} />}
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                ))}

            </List>

            {/* <Divider />

            <List>
                {["All mail", "Trash", "Spam"].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{ display: "block" }}>
                        <Tooltip title={!open ? text : ""} placement="right">
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? "initial" : "center",
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : "auto",
                                        justifyContent: "center",
                                    }}
                                >
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                {open && <ListItemText primary={text} />}
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                ))}
            </List> */}
        </Drawer>
    );
}
