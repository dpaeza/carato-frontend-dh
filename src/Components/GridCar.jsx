import React, {useState} from 'react'
import { Box, Alert, Snackbar, Button } from "@mui/material";
import CardCar from './CardCar';
import Login from './Login';
import Register from './Register';
import Grid from '@mui/material/Grid2';
import { addFavorite, removeFavorite } from '../Services/favorites';
import { useAuth } from '../Context/auth.context';
import { useNavigate  } from 'react-router-dom';

export default function GridCar({ cars }) {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [loginMessage, setLoginMessage] = useState("");
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
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
            setLoginMessage("Inicia sesión para agregar a favoritos.");
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

    const handleBook = (id) => {
        if (!user) {
            console.log("No user");
            setLoginMessage("Inicia sesión para reservar un vehículo.");
            setOpenLogin(true);
        } else {
            navigate(`/reserva/${id}`);
        }
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
                            onBook={() => handleBook(car.id)}
                        />
                    </Grid>
                ))}
            </Grid>
            <Register 
                open={openRegister} 
                onClose={() => setOpenRegister(false)}
                onLogin={() => handleLogin()} 
            />
            <Login 
                open={openLogin} 
                onClose={() => setOpenLogin(false)}
                onRegister={() => handleRegister()}
                message={loginMessage}
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
