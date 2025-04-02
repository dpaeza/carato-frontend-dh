import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useParams, useNavigate  } from 'react-router-dom';
import DetailHeader from '../Components/DetailHeader';
import DetailHeaderSkeleton from '../Components/DetailHeaderSkeleton';
import GridImage from '../Components/GridImage';
import GridImageSkeleton from '../Components/GridImageSkeleton';
import Specifications from '../Components/Specifications';
import SpecificationsSkeleton from '../Components/SpecificationsSkeleton';
import Politics from '../Components/Politics';
import { Box, Snackbar, Alert, Typography, Divider, CircularProgress, Button } from "@mui/material";
import { getCarByIdOrName } from '../Services/cars';
import { useQuery } from '@tanstack/react-query';
import { addFavorite, removeFavorite } from "../Services/favorites";
import ShareModel from '../Components/ShareModel';
import CardReserva from '../Components/CardReserva';
import { getVehicleReservations } from '../Services/reservations';
import { set } from 'rsuite/esm/internals/utils/date';
import Grid from '@mui/material/Grid2';
import Login from '../Components/Login';
import { useAuth } from '../Context/auth.context';

export default function Vehiculo() {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [favorite, setFavorite] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [openShare, setOpenShare] = useState(false);
    const [ reservations, setReservations ] = useState([]);
    const [ loadingReservations, setLoadingReservations ] = useState(false);
    const [ errorReservations, setErrorReservations ] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);

    const handleFavorite = async () => {
        try {
            if (favorite) {
                await removeFavorite(id)
                setFavorite(false)
                setSnackbarMessage(`${vehicle.name} eliminado de tus favoritos.`);
                setSnackbarSeverity("info");
            } else {
                await addFavorite(id)
                setFavorite(true)
                setSnackbarMessage(`${vehicle.name} agregado a tus favoritos.`);
                setSnackbarSeverity("success");
            }
        } catch (error) {
            const message = favorite ? "eliminar." : "agregar.";
            setSnackbarMessage(`Error al ${message} favorito.`);
            setSnackbarSeverity("error");
        }
        setSnackbarOpen(true);
    }

    const handleShare = () => {
        setOpenShare(true);
    }

    const { data: vehicle, isLoading } = useQuery({
        queryKey: ["car", id],
        queryFn: () => getCarByIdOrName(id),
        refetchOnWindowFocus: false,
    });

    const fetchReservations = async () => {
        setLoadingReservations(true);
        try {
            const response = await getVehicleReservations(id);
            setReservations(response);
            setErrorReservations(false);
        } catch (error) {
            setErrorReservations(true);
            handlePopUp();
        } finally {
            setLoadingReservations(false);
        }
    }

    const handlePopUp = () => {
        Swal.fire({
            icon: 'warning',
            text: 'No pudimos cargar las fechas disponibles en este momento. Por favor, inténtalo nuevamente más tarde.',
            confirmButtonColor: '#B3B3BB',
            confirmButtonText: 'Cancelar',
            showCancelButton: true,
            cancelButtonText: 'Reintentar',
            cancelButtonColor: "#3083FF"
        }).then((result) => {
            if (result.isDismissed) {
                fetchReservations();
            }
        });
    }

    const handleBook = () => {
        if (!user) {
            setOpenLogin(true);
        } else {
            navigate(`/reservar/${id}`);
        }
    }

    useEffect(() => {
        if (vehicle) {
            setFavorite(vehicle.isFavorite);
        }
    }, [vehicle]);

    useEffect(() => {
        fetchReservations();
    }, []);

    return (
        <Box sx={{ backgroundColor: "var(--lightWhite)", px: 3, pt: 5, pb: 2 }}>
            {isLoading
                ? <Box>
                    <DetailHeaderSkeleton />
                    <Box sx={{ height: { xs: "70vh", sx: "50vh" }, maxWidth: "1100px", margin: "auto", mt: 3 }}>
                        <GridImageSkeleton />
                    </Box>
                    <SpecificationsSkeleton />
                </Box>
                : <Box>
                    <DetailHeader model={vehicle.name} category={vehicle.category} isFavorite={favorite} onFavorite={handleFavorite} onShare={handleShare} />
                    <Box sx={{ height: { xs: "70vh", sx: "50vh" }, maxWidth: "1100px", margin: "auto", mt: 3 }}>
                        <GridImage images={vehicle?.images} />
                    </Box>
                    <Grid
                        container
                        spacing={3}
                        sx={{ maxWidth: "1100px", margin: "auto", pt: 4 }}
                    >
                        <Grid size={{xs:12, md:7, lg:8}}>
                            <Specifications vehicle={vehicle} />
                        </Grid>
                        <Grid size={{xs:12, md:5, lg:4}} mb={3}>
                            {loadingReservations ? (
                                <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                                    <CircularProgress />
                                </Box>
                            ) : errorReservations ? (
                                <Box sx={{ maxWidth: "1100px", margin: "auto", px: 2, pb:2 }}>
                                    <Alert severity="error">
                                        Ocurrió un error al cargar las reservas.
                                        <Button
                                            onClick={fetchReservations}
                                            variant="contained"
                                            color="#3083FF"
                                            sx={{ 
                                                ml: 2,
                                                minHeight: 0,
                                                minWidth: 0,
                                                padding: 0,
                                                borbder: 'none',
                                                boxShadow: 'none',
                                                textTransform: 'none',
                                                color: "#d32f2f",
                                                fontWeight: 600,
                                                "&:hover": {
                                                    backgroundColor: "transparent",
                                                    color: "red",
                                                    boxShadow: 'none',
                                                    border: 'none'
                                                }
                                            }}
                                        >
                                            Reintentar
                                        </Button>
                                    </Alert>
                                </Box>
                            ) : (
                                <CardReserva 
                                    price={vehicle.price} 
                                    reservations={reservations}
                                    onBook={handleBook}
                                />
                            )}
                        </Grid>
                    </Grid>
                    
                    {/* <Box sx={{ maxWidth: "1100px", margin: "auto", px: 2 }}>
                        <Typography
                            variant="h5"
                            gutterBottom
                            fontSize={20}
                            fontFamily="var(--openSans)"
                            fontWeight={600}
                            color="var(--darkBlue)"
                        >
                            Disponibilidad
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                    </Box> */}
                    
                    <Politics />
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
                        >
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
                    <ShareModel
                        open={openShare}
                        onClose={() => setOpenShare(false)}
                        vehicle={vehicle}
                    />
                </Box>
            }
            <Login 
                open={openLogin} 
                onClose={() => 
                setOpenLogin(false)} 
            />
        </Box>
    )
}
