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
import NoCrashIcon from '@mui/icons-material/NoCrash';
import LogoCarato from "../assets/Logo-carato-slogan.svg";
import Register from "./Register";
import Login from "./Login";

const drawerWidth = 240;

export default function Navbar(props) {
    const { window } = props || {};
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [menuAnchor, setMenuAnchor] = useState(null);

    useEffect(() => {
        // Obtener usuario desde localStorage al cargar el componente
        const auth = localStorage.getItem("auth");
        if (auth) {
            setUser(JSON.parse(auth));
        }
    }, []);

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
        localStorage.removeItem("auth");
        setUser(null);
        handleMenuClose();
        window.location.reload(); // Recargar la página
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
                        <a href="/">
                            <img
                                src={LogoCarato}
                                alt="Logo"
                                width="140"
                                height="70"
                                style={{ marginRight: "1rem" }}
                            />
                        </a>
                    </Box>
                )
            }
            <Divider />
            <List>
                {user ? (
                    <>
                        <MenuItem>
                            <ListItemIcon>
                                <PersonOutlineIcon fontSize="small" />
                            </ListItemIcon>
                            Mi cuenta
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <NoCrashIcon fontSize="small" />
                            </ListItemIcon>
                            Mis reservas
                        </MenuItem>
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
                    <a href="/">
                        <img src={LogoCarato} alt="Logo" height="70" />
                    </a>
                    <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}>
                        {user ? (
                            <Box sx={{ display: "flex", alignItems: "center", borderRadius: "30px", border: "1px solid #fff", p: 1 }}>
                                <Typography color="white" sx={{ marginRight: 1, textTransform: "capitalize" }}>
                                    Hola {user.name}
                                </Typography>
                                <Avatar
                                    src={user.avatar}
                                    alt={user.name}
                                    onClick={handleMenuOpen}
                                    sx={{ cursor: "pointer" }}
                                />
                                <Menu
                                    anchorEl={menuAnchor}
                                    open={Boolean(menuAnchor)}
                                    onClose={handleMenuClose}
                                    sx={{ mt: '15px' }}
                                >
                                    <MenuItem>
                                        <ListItemIcon>
                                            <PersonOutlineIcon fontSize="small" />
                                        </ListItemIcon>
                                        Mi cuenta
                                    </MenuItem>
                                    <MenuItem>
                                        <ListItemIcon>
                                            <NoCrashIcon fontSize="small" />
                                        </ListItemIcon>
                                        Mis reservas
                                    </MenuItem>
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
            <Register open={openRegister} onClose={() => setOpenRegister(false)} />
            <Login open={openLogin} onClose={() => setOpenLogin(false)} />
        </Box>
    );
}
