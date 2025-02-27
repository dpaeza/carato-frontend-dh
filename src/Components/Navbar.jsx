import React, { useState } from "react";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoCarato from "../assets/Logo-carato-slogan.svg";
import Register from "./Register"

const drawerWidth = 240;
const navItems = ['Crear cuenta', 'Iniciar sesión'];

export default function Navbar(props) {

    const { window } = props || {};
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
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
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton 
                        sx={{ textAlign: "center" }}
                        onClick={() => setOpenRegister(true)}
                    >
                        <ListItemText primary={"Crear cuenta"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: "center" }}>
                        <ListItemText primary={"Iniciar sesión"} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Register open={openRegister} onClose={() => setOpenRegister(false)}/>
        </Box>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                component="nav"
                position="fixed"
                sx={{ backgroundColor: "var(--darkBlue)" }}
            >
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <a href="/">
                        <img
                            src={LogoCarato}
                            alt="Logo"
                            height="70"
                        />
                    </a>
                    <Box sx={{ display: { xs: "none", sm: "block" } }}>
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
                        >
                            Iniciar sesión
                        </Button>
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
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box sx={{ width: "100%" }}>
                <Toolbar />
            </Box>
            <Register open={openRegister} onClose={() => setOpenRegister(false)}/>
        </Box>
    );
}