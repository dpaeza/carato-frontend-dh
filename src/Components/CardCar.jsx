import React, {useState} from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Button,
    Checkbox,
} from "@mui/material";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import Grid from "@mui/material/Grid2";
import PeopleIcon from "../assets/icons/people.svg?react";
import AcUnit from "../assets/icons/acUnit.svg?react";
import Manual from "../assets/icons/manual.svg?react";
import Door from "../assets/icons/door.svg?react";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { addFavorite, removeFavorite } from "../Services/favorites";
import { useAuth } from "../Context/auth.context";
import Login from "./Login";

export default function CardCar({ car }) {
    const {
        id,
        name,
        images,
        capacity,
        hasAirCondition,
        transmission,
        doors,
        price,
        isFavorite,
    } = car;

    const [ favorite, setFavorite ] = useState(isFavorite);
    const [openLogin, setOpenLogin] = useState(false);
    const { user } = useAuth();
    const MySwal = withReactContent(Swal);

    const handleFavorite = async (e) => {
        e.stopPropagation();

        if (!user) {
            setOpenLogin(true);
            return;
        }

        try {
            if (favorite) {
                await removeFavorite(id).then(() => setFavorite(false));
            } else {
                await addFavorite(id).then(() => setFavorite(true));
            }
        } catch (error) {
            console.error("Error al agregar/quitar favorito:", error);
            const message = favorite ? "eliminar" : "agregar";
            MySwal.fire({
                icon: 'error',
                confirmButtonColor : '#3083FF',
                text: `Error al ${message} favorito.`
            });
        }
    }
    
    return (
        <Card
            sx={{
                maxWidth: { xs: "100%", md: "100%", lg: 350 },
                width: "100%",
                borderRadius: 4,
                boxShadow: 3,
                overflow: "hidden",
                position: "relative",
            }}
        >
            <CardMedia
                component="img"
                height="180"
                image={images[0].url}
                alt={name}
                sx={{
                    objectFit: "cover",
                    backgroundColor: "var(--mediumWhite)",
                }}
            />
            <CardContent>
                <Typography
                    variant="h6"
                    fontFamily="var(--loto)"
                    fontWeight={700}
                    color="var(--darkBlue)"
                    textAlign={"initial"}
                    sx={{ textDecoration: "none" }}
                >
                    {name}
                </Typography>
                <Grid container spacing={2} my={1}>
                    <Grid
                        size={6}
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                        <PeopleIcon />
                        <Typography variant="body2">
                            {capacity} personas
                        </Typography>
                    </Grid>

                    {hasAirCondition && (
                        <Grid
                            size={6}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <AcUnit />
                            <Typography
                                variant="body2"
                                sx={{ textAlign: "initial" }}
                            >
                                Aire acondicionado
                            </Typography>
                        </Grid>
                    )}

                    <Grid
                        size={6}
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                        {transmission === "Manual" ? (
                            <>
                                <Manual />
                                <Typography variant="body2">
                                    {transmission}
                                </Typography>
                            </>
                        ) : (
                            <>
                                <SettingsSuggestIcon fontSize="small" />
                                <Typography variant="body2">
                                    {transmission}
                                </Typography>
                            </>
                        )}
                    </Grid>

                    <Grid
                        size={6}
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                        <Door />
                        <Typography variant="body2">{doors}</Typography>
                    </Grid>
                </Grid>

                <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mt: 2 }}
                >
                    <Grid size={6}>
                        <Typography
                            variant="h5"
                            fontWeight={700}
                            color="var(--darkBlue)"
                            textAlign={"initial"}
                        >
                            ${price}
                            <span
                                style={{ fontSize: "0.8rem", fontWeight: 400 }}
                            >
                                /día
                            </span>
                        </Typography>
                    </Grid>
                    <Grid size={6}>
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: "var(--lightBlue)",
                                color: "white",
                                textTransform: "none",
                                fontWeight: 600,
                                borderRadius: 2,
                                width: "100%",
                            }}
                        >
                            Alquilar
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    p: 1,
                    zIndex: 2,
                }}
            >
                <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    checked={favorite}
                    sx={{ color: "var(--lightBlue)" }}
                    onChange={handleFavorite}
                    onClick={(e) => e.stopPropagation()}
                />
            </Box>
            <Login 
                open={openLogin}
                onClose={(e) => {
                    if (e) e.stopPropagation();
                    setOpenLogin(false);
                }}
            />
        </Card>
    );
}
