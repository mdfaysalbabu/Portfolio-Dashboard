"use client";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Badge, Stack, Tooltip } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SideBar from '../Sidebar/Sidebar';
import AccountMenuItem from '../AccountMenuItem/AccountMenuItem';
import Link from 'next/link';
import { getUserInfo } from '@/services/auth.service';
import Loader from '@/components/shared/Loader/Loader';
import { TUser } from '@/types';

const drawerWidth = 240;

export default function DashboardDrawer({ children }: { children: React.ReactNode }) {
    const userData = getUserInfo() as TUser;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    background: "#F4F7FE",
                    boxShadow: 0,
                    borderBottom: "1px solid lightgray",
                    py: 1
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' }, color: "primary.main" }}
                    >
                        <MenuIcon sx={{ color: "primary.main" }} />
                    </IconButton>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                        <Box>
                            <Typography variant="body1" noWrap component="div" color="gray">
                                Hi, {userData?.name}
                            </Typography>
                            <Typography variant="body1" noWrap component="div" color="primary.main">
                                Welcome To, Dashboard
                            </Typography>
                        </Box>
                        <Stack direction="row" gap={3}>
                            <Badge badgeContent={1} color="error">
                                <IconButton sx={{ background: "#ffffff" }}>
                                    <NotificationsIcon color='action' />
                                </IconButton>
                            </Badge>
                            <Tooltip title={'l'}>
                                <Link href='/dashboard/user/user-profile'>
                                   {/* {
                                    isLoading || localLoading ?
                                    <Avatar/>
                                    :
                                    <Avatar alt='profile' src={user?.profilePhoto} />
                                   } */}
                                </Link>
                            </Tooltip>
                            <AccountMenuItem />
                        </Stack>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    <SideBar />
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    <SideBar />
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, backgroundColor: "#FEFCE8", height: '100vh' }}
            >
                <Toolbar />
                <Box sx={{ backgroundColor: "#FFFFFF", padding: 4, borderRadius: "10px" }}>
                    { children}
                </Box>
            </Box>
        </Box>
    );
}
