import React, { useState, useEffect } from "react";
import {
    AppBar,
    Box,
    Button,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    Menu,
    MenuItem,
    Avatar,
    Typography,
    ListItemIcon
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import NoCrashIcon from '@mui/icons-material/NoCrash';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoCarato from "../assets/Logo-carato-slogan.svg";
import Register from "./Register";
import Login from "./Login";
import { useAuth } from "../Context/auth.context";
import { useNavigate, Link } from 'react-router-dom';

const drawerWidth = 240;

export default function Navbar(props) {
    const { window } = props || {};
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [menuAnchor, setMenuAnchor] = useState(null);

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenuOpen = (event) => {
        setMenuAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
    };

    const handleLogout = () => {
        logout();
        handleMenuClose();
    };

    const handleClick = () => {
        handleMenuClose();
        navigate('/cuenta');
    };

    const handleClickFav = () => {
        handleMenuClose();
        navigate('/favoritos');
    }

    const handleClickAdmin = () => {
        handleMenuClose();
        navigate('/administracion');
    }

    const handleRegister = () => {
        setOpenLogin(false);
        setOpenRegister(true);
    };

    const handleLogin = () => {
        setOpenRegister(false);
        setOpenLogin(true);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>

            {
                user ? (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            padding: "10px",
                            alignContent: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Avatar
                            src={user.avatar}
                            alt={user.name}
                            sx={{ width: 50, height: 50, margin: "auto" }}
                        />
                        <Typography color="var(--darkBle)" sx={{ m: 1, textTransform: "capitalize" }}>
                            Hola {user.name}
                        </Typography>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            padding: "10px",
                            alignContent: "center",
                            justifyContent: "center",
                            backgroundColor: "var(--darkBlue)",
                        }}
                    >
                        <Link to="/">
                            <img
                                src={LogoCarato}
                                alt="Logo"
                                width="140"
                                height="70"
                                style={{ marginRight: "1rem" }}
                            />
                        </Link>
                    </Box>
                )
            }
            <Divider />
            <List>
                {user ? (
                    <>
                        <MenuItem onClick={handleClick}>
                            <ListItemIcon>
                                <PersonOutlineIcon fontSize="small" />
                            </ListItemIcon>
                            Mi cuenta
                        </MenuItem>
                        <MenuItem onClick={handleClickFav}>
                            <ListItemIcon>
                                <FavoriteIcon fontSize="small" />
                            </ListItemIcon>
                            Mis favoritos
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <NoCrashIcon fontSize="small" />
                            </ListItemIcon>
                            Mis reservas
                        </MenuItem>
                        {user.role === "ADMIN" && (
                            <MenuItem onClick={handleClickAdmin}>
                                <ListItemIcon>
                                    <SettingsIcon fontSize="small" />
                                </ListItemIcon>
                                Admin
                            </MenuItem>
                        )}
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <LogoutIcon fontSize="small" />
                            </ListItemIcon>
                            Cerrar sesión
                        </MenuItem>
                    </>
                ) : (
                    <>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => setOpenRegister(true)}>
                                <ListItemText primary="Crear cuenta" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => setOpenLogin(true)}>
                                <ListItemText primary="Iniciar sesión" />
                            </ListItemButton>
                        </ListItem>
                    </>
                )}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar component="nav" position="fixed" sx={{ backgroundColor: "var(--darkBlue)" }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Link to="/">
                        <img src={LogoCarato} alt="Logo" height="70" />
                    </Link>
                    <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}>
                        {user ? (
                            <Box sx={{ display: "flex", alignItems: "center", borderRadius: "25px", border: "1px solid #fff", py: 0.8, px:1 }}>
                                <Typography color="white" sx={{ marginRight: 1.5, textTransform: "capitalize", fontSize:"14px" }}>
                                    Hola {user.name}
                                </Typography>
                                <Avatar
                                    src={user.avatar}
                                    alt={user.name}
                                    onClick={handleMenuOpen}
                                    sx={{ cursor: "pointer", height:"30px", width:"30px" }}
                                    
                                />
                                <Menu
                                    anchorEl={menuAnchor}
                                    open={Boolean(menuAnchor)}
                                    onClose={handleMenuClose}
                                    MenuListProps={{ autoFocusItem: false }}
                                    sx={{ mt: '22px' }}
                                >
                                    <MenuItem onClick={handleClick}> 
                                        <ListItemIcon>
                                            <PersonOutlineIcon fontSize="small" />
                                        </ListItemIcon>
                                        Mi cuenta
                                    </MenuItem>
                                    <MenuItem onClick={handleClickFav}>
                                        <ListItemIcon>
                                            <FavoriteIcon fontSize="small" />
                                        </ListItemIcon>
                                        Mis favoritos
                                    </MenuItem>
                                    <MenuItem>
                                        <ListItemIcon>
                                            <NoCrashIcon fontSize="small" />
                                        </ListItemIcon>
                                        Mis reservas
                                    </MenuItem>
                                    {user.role === "ADMIN" && (
                                        <MenuItem onClick={handleClickAdmin}>
                                            <ListItemIcon>
                                                <SettingsIcon fontSize="small" />
                                            </ListItemIcon>
                                            Admin
                                        </MenuItem>
                                    )}
                                    <MenuItem onClick={handleLogout}>
                                        <ListItemIcon>
                                            <LogoutIcon fontSize="small" />
                                        </ListItemIcon>
                                        Cerrar sesión
                                    </MenuItem>
                                </Menu>
                            </Box>
                        ) : (
                            <>
                                <Button
                                    sx={{
                                        color: "#fff",
                                        border: "1px solid #fff",
                                        textTransform: "none",
                                        marginLeft: 1,
                                        borderRadius: "20px",
                                    }}
                                    onClick={() => setOpenRegister(true)}
                                >
                                    Crear cuenta
                                </Button>
                                <Button
                                    sx={{
                                        color: "#fff",
                                        border: "1px solid #fff",
                                        textTransform: "none",
                                        marginLeft: 1,
                                        borderRadius: "20px",
                                    }}
                                    onClick={() => setOpenLogin(true)}
                                >
                                    Iniciar sesión
                                </Button>
                            </>
                        )}
                    </Box>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerToggle}
                        sx={{ display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor="right"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box sx={{ width: "100%" }}>
                <Toolbar />
            </Box>
            <Register 
                open={openRegister} 
                onClose={() => setOpenRegister(false)}
                onLogin={() => handleLogin()} 
            />
            <Login 
                open={openLogin} 
                onClose={() => setOpenLogin(false)} 
                onRegister={() => handleRegister()}
            />
        </Box>
    );
}
