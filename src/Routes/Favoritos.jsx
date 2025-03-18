import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import CardCar from '../Components/CardCar';
import { useQuery } from '@tanstack/react-query';
import { getFavorites, addFavorite, removeFavorite } from '../Services/favorites';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Alert, Pagination, Button, Checkbox, Snackbar } from '@mui/material';
import EmpyState from '../assets/EmptyState.svg?react';

export default function Favoritos() {

    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    //Snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    // Estado para almacenar el último favorito eliminado (para deshacer)
    const [lastRemoved, setLastRemoved] = useState(null);

    const handleFavorite = async (isFavorite, id, name) => {
        if (isFavorite) {
            await removeFavorite(id);
            refetch();
            setSnackbarMessage(`${name} eliminado de tus favoritos.`);
            setSnackbarSeverity("info");
            setSnackbarOpen(true);
            setLastRemoved({ id, name });
        } else {
            await addFavorite(id);
            refetch();
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
                refetch();
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

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["cars", page],
        queryFn: () => getFavorites({ page }),
        select: (data) => ({ ...data, data: data.data }),
        refetchOnWindowFocus: false,
        staleTime: 60000,
        trowOnError: (error) => {
            console.error("Error al obtener favoritos:", error)
            setError("Error al cargar los favoritos. Por favor, intenta de nuevo más tarde.")
        }
    })

    return (
        <Box
            sx={{
                backgroundColor: "#FAFAF",
                minHeight: '100vh',
                maxWidth: 1200,
                margin: 'auto',
                p: 6
            }}
            display={{ xs: 'block', md: 'flex' }}
            flexDirection="column"
        >
            <Typography
                variant="h2"
                fontFamily="var(--openSans)"
                fontSize={24}
                fontWeight={700}
                color='var(--darkBlue)'
                textAlign={'center'}
            >
                Favoritos
            </Typography>
            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : (data.data && data.data.length > 0) ? (
                <Box>
                    <Grid
                        container
                        spacing={2}
                        sx={{ mt: 4 }}
                    >
                        {data.data.map((car) => (
                            <Grid
                                key={car.id}
                                size={{ xs: 12, sm: 6, md: 4, lg: 4 }}
                                sx={{ display: "flex", justifyContent: "center" }}
                            >
                                <CardCar
                                    car={car}
                                    onFavoriteChange={() => handleFavorite(car.isFavorite, car.id, car.name)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <Pagination
                        count={data.totalPages}
                        page={data.currentPage}
                        onChange={(event, value) => setPage(value)}
                        showFirstButton
                        showLastButton
                        sx={{ display: "flex", justifyContent: "center", pt: 4 }}
                    />
                </Box>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        mt: 4
                    }}
                >
                    <EmpyState
                        sx={{
                            display: 'block',
                            margin: 'auto',
                            minHeight: 200,
                        }}
                    />
                    <Typography
                        variant="h5"
                        fontFamily="var( --lato)"
                        fontWeight={700}
                        color='var(--lightGrey)'
                        textAlign={'center'}
                    >
                        Aún no tienes autos favoritos
                    </Typography>
                    <Typography
                        variant="body1"
                        fontFamily="var( --lato)"
                        fontWeight={500}
                        color='var(--lightGrey)'
                        textAlign={'center'}
                    >
                        Explora nuestra selección y guarda tus modelos preferidos para encontrarlos más rápido
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            mt: 4,
                            textTransform: 'none',
                            backgroundColor: 'var(--lightBlue)',
                            color: 'var(--pureWhite)',
                            '&:hover': {
                                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
                            }
                        }}
                        onClick={() => navigate('/')}
                    >
                        Explorar autos
                    </Button>
                </Box>
            )}
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
