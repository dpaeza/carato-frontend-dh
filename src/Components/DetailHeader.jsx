import React, {useState} from 'react'
import { Typography, Button, Checkbox } from "@mui/material";
import Grid from '@mui/material/Grid2';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from 'react-router-dom';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { useAuth } from "../Context/auth.context";
import Login from "./Login";
import Register from './Register';

export default function DetailHeader({ 
    model, 
    category, 
    isFavorite, 
    onFavorite = () => {}, 
    onShare = () => {}
}) {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loginMessage, setLoginMessage] = useState("");
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);

    const handleBackClick = () => {
        navigate("/");
    };

    const handleFavorite = async () => {
        if (!user) {
            setLoginMessage("Inicia sesión para agregar a favoritos.");
            setOpenLogin(true);
            return;
        }

        onFavorite();
    }

    const handleRegister = () => {
        setOpenLogin(false);
        setOpenRegister(true);
    };

    const handleLogin = () => {
        setOpenRegister(false);
        setOpenLogin(true);
    };

    return (
        <Grid container alignItems={{xs:'flex-start', sm:'center'}} justifyContent="space-between" sx={{ marginBottom: 2,  maxWidth: "1100px", margin: "auto" }}>
            <Grid
                display={{ xs: "flex", sm: "block" }}
                flexDirection={{ xs: "column", sm: "row" }}
            >
                <Typography 
                    variant="h2" 
                    component="span" 
                    textTransform={"uppercase"} 
                    fontFamily={"var(--openSans)"} 
                    fontWeight={700} 
                    sx={{ 
                        fontSize: { xs: 18, sm: 25 }, 
                        color: "var(--darkBlue)" 
                    }}
                >
                    {model}
                </Typography>
                <Typography 
                    variant="subtitle1" 
                    component="span" 
                    fontFamily={"var(--openSans)"} 
                    fontWeight={500} 
                    sx={{ 
                        marginLeft: { xs: 0, sm: 1 }, 
                        fontSize: { xs: 13, sm: 14 }, 
                        color: "var(--lightGrey)" 
                    }}
                >
                    {category}
                </Typography>
            </Grid>
            <Grid display={'flex'} gap={{xs:0.5, sm:2}}>
                <Button
                    sx={{
                        textTransform: "none",
                        // backgroundColor: { xs: 'transparent', sm: "#F5F5F5" },
                        backgroundColor: "transparent",
                        color: "#0A0A25",
                        // boxShadow: { xs:"none" , sm: "0px 4px 4px rgba(0, 0, 0, 0.25)" },
                        boxShadow: "none",
                        padding: { xs: "0px", sm: "0px 5px"},
                        minHeight: "30px",
                        minWidth: { xs: "0px", sm: "auto" },
                        margin: "0px",
                        border: "1px solid #fafafa",
                        gap: "5px",
                        transition: "all 0.4s",
                        '&:hover': { border: "1px solid #0A0A25" }
                    }}
                    onClick={onShare}
                >
                    <ShareOutlinedIcon sx={{ color: "#0A0A25", fontSize: 18 }} />
                    <Typography
                        sx={{
                            display: { xs: "none", sm: "block" },
                        }}
                    >
                        Compartir
                    </Typography>
                </Button>
                <Button
                    sx={{
                        textTransform: "none",
                        // backgroundColor: { xs: 'transparent', sm: "#F5F5F5" },
                        backgroundColor: "transparent",
                        color: "#0A0A25",
                        // boxShadow: { xs:"none" , sm: "0px 4px 4px rgba(0, 0, 0, 0.25)" },
                        boxShadow: "none",
                        padding: { xs: "0px", sm: "0px 5px"},
                        minHeight: "30px",
                        minWidth: { xs: "0px", sm: "auto" },
                        margin: "0px",
                        border: "1px solid #fafafa",
                        gap: "5px",
                        transition: "all 0.4s",
                        '&:hover': { border: "1px solid #0A0A25" }
                    }}
                    onClick={handleFavorite}
                >
                    <Checkbox
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                        checked={isFavorite}
                        sx={{ 
                            color: "#0A0A25", 
                            padding: 0,

                            '&.Mui-checked': { color: "#0A0A25" },
                            '& .MuiSvgIcon-root': { fontSize: 18 }
                        }}
                    />
                    <Typography
                        sx={{
                            display: { xs: "none", sm: "block" },
                        }}
                    >
                        Guardar
                    </Typography>
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        borderRadius: "50%",
                        padding: "0",
                        height: "35px",
                        minWidth: { xs: "0px", sm: "35px" },
                        width: "35px",
                        // border: { xs:"none" , sm: "1px solid #F5F5F5" },
                        border: "1px solid #fafafa",
                        // boxShadow: { xs:"none" , sm: "0px 4px 4px rgba(0, 0, 0, 0.25)" },
                        boxShadow: "none",
                        // backgroundColor: { xs: 'transparent', sm: "#FFFFFF" }
                        backgroundColor: "transparent",
                        transition: "all 0.4s",
                        '&:hover': { border: "1px solid #0A0A25", boxShadow: "none" }
                    }}
                    onClick={handleBackClick}
                >
                    <ArrowBackIcon sx={{ color: "#0A0A25", fontSize: 25 }} />
                </Button>
                
            </Grid>
            <Register 
                open={openRegister} 
                onClose={(e) => {
                    if (e) e.stopPropagation();
                    setOpenRegister(false);
                }}
                onLogin={() => handleLogin()} 
            />
            <Login 
                open={openLogin}
                onClose={(e) => {
                    if (e) e.stopPropagation();
                    setOpenLogin(false);
                }}
                onRegister={() => handleRegister()}
                message={loginMessage}
            />
        </Grid>
    )
}
