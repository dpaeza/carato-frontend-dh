import React, {useState} from 'react'
import { Box, Alert, Snackbar, Button } from "@mui/material";
import CardCar from './CardCar';
import Login from './Login';
import Grid from '@mui/material/Grid2';
import { addFavorite, removeFavorite } from '../Services/favorites';
import { useAuth } from '../Context/auth.context';

export default function GridCar({ cars }) {
    const { user } = useAuth();

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [openLogin, setOpenLogin] = useState(false);
    const [lastRemoved, setLastRemoved] = useState(null);

    const updateCars = (id, isFavorite) => {
        cars.map((car) => {
            if (car.id === id) {
                car.isFavorite = isFavorite;
            }
            return car;
        });
    }

    const handleFavorite = async (isFavorite, id, name) => {

        if (!user) {
            setOpenLogin(true);
            return;
        }

        if (isFavorite) {
            await removeFavorite(id);
            updateCars(id, false);
            setSnackbarMessage(`${name} eliminado de tus favoritos.`);
            setSnackbarSeverity("info");
            setSnackbarOpen(true);
            setLastRemoved({ id, name });
        } else {
            await addFavorite(id);
            updateCars(id, true);
            setSnackbarMessage(`${name} agregado a tus favoritos.`);
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
            setLastRemoved(null);
        }
    }

    const handleUndo = async () => {
        if (lastRemoved) {
            try {
                await addFavorite(lastRemoved.id);
                updateCars(lastRemoved.id, true);
                setSnackbarMessage(`${lastRemoved.name} agregado nuevamente a tus favoritos.`);
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
                setLastRemoved(null);
            } catch (error) {
                console.error("Error al deshacer la acción de favorito:", error);
                setSnackbarMessage("Error al deshacer la acción de favorito. Por favor, intenta de nuevo más tarde.");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        }
    };

    return (
        <Box sx={{ width: "100%", textAlign: "center", bgcolor: "#fafafa" }}>
            <Grid container spacing={2} sx={{ mb: 3 }}>
                {cars.map((car, index) => (
                    <Grid
                        key={index}
                        size={{ xs: 12, sm: 12, md: 6, lg: 6 }}
                        sx={{ display: "flex", justifyContent: "center"}}
                    >
                        <CardCar
                            car={car}
                            onFavoriteChange={() => handleFavorite(car.isFavorite, car.id, car.name)}
                        />
                    </Grid>
                ))}
            </Grid>
            <Login 
                open={openLogin} 
                onClose={() => 
                setOpenLogin(false)} 
            />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarSeverity}
                    sx={{ width: "100%" }}
                    action={
                        <>
                            {snackbarSeverity === "info" && (
                                <Button
                                    color="inherit"
                                    size="small"
                                    onClick={handleUndo}
                                    sx={{ textTransform: "none", fontWeight: 600, minWidth: 20 }}
                                >
                                    Deshacer
                                </Button>
                            )}
                            <Button color="inherit" size="small" sx={{minWidth:20}} onClick={() => setSnackbarOpen(false)}>
                                ✖
                            </Button>
                        </>
                    }
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    )
}
