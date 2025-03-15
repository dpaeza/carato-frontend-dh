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

export default function DetailHeader({ model, category, isFavorite, onFavorite = () => {} }) {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [openLogin, setOpenLogin] = useState(false);

    const handleBackClick = () => {
        navigate("/");
    };

    const handleFavorite = async () => {
        if (!user) {
            setOpenLogin(true);
            return;
        }

        onFavorite();
    }

    return (
        <Grid container alignItems="center" justifyContent="space-between" sx={{ marginBottom: 2,  maxWidth: "1200px", margin: "auto" }}>
            <Grid>
                <Typography variant="h2" component="span" textTransform={"uppercase"} fontFamily={"var(--openSans)"} fontWeight={700} sx={{ fontSize: 25, color: "var(--darkBlue)" }}>{model}</Typography>
                <Typography variant="subtitle1" component="span" fontFamily={"var(--openSans)"} fontWeight={500} sx={{ marginLeft: 1, fontSize: 14, color: "var(--lightGrey)" }}>{category}</Typography>
            </Grid>
            <Grid spacing={2} display={'flex'} gap={2}>
                <Button
                    sx={{
                        textTransform: "none",
                        backgroundColor: "#F5F5F5",
                        color: "#0A0A25",
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                        padding: "0px 5px",
                        minHeight: "30px",
                        margin: "0px",
                        gap: "5px",
                        '&:hover': { boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.3)" }
                    }}
                >
                    <ShareOutlinedIcon sx={{ color: "#0A0A25", fontSize: 18 }} />
                    Compartir
                </Button>
                <Button
                    sx={{
                        textTransform: "none",
                        backgroundColor: "#F5F5F5",
                        color: "#0A0A25",
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                        padding: "0px 5px",
                        minHeight: "30px",
                        margin: "0px",
                        gap: "5px",
                        '&:hover': { boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.3)" }
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
                    Guardar
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        borderRadius: "50%",
                        padding: "0",
                        height: "35px",
                        minWidth: "35px",
                        width: "35px",
                        border: "1px solid #D9D9D9",
                        backgroundColor: "#FFFFFF",
                    }}
                    onClick={handleBackClick}
                >
                    <ArrowBackIcon sx={{ color: "#0A0A25", fontSize: 25 }} />
                </Button>
                
            </Grid>
            <Login 
                open={openLogin}
                onClose={(e) => {
                    if (e) e.stopPropagation();
                    setOpenLogin(false);
                }}
            />
        </Grid>
    )
}
