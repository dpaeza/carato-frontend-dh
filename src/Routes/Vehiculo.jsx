import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import DetailHeader from '../Components/DetailHeader';
import DetailHeaderSkeleton from '../Components/DetailHeaderSkeleton';
import GridImage from '../Components/GridImage';
import GridImageSkeleton from '../Components/GridImageSkeleton';
import Specifications from '../Components/Specifications';
import SpecificationsSkeleton from '../Components/SpecificationsSkeleton';
import Politics from '../Components/Politics';
import { Box, Snackbar, Alert, Typography, Divider, CircularProgress } from "@mui/material";
import { getCarByIdOrName } from '../Services/cars';
import { useQuery } from '@tanstack/react-query';
import { addFavorite, removeFavorite } from "../Services/favorites";
import ShareModel from '../Components/ShareModel';
import DoubleCalendar from '../Components/DoubleCalendar';
import { getVehicleReservations } from '../Services/reservations';

export default function Vehiculo() {
    const { id } = useParams();
    const [favorite, setFavorite] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [openShare, setOpenShare] = useState(false);

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

    const { data: reservations, isLoading: loadingReservations } = useQuery({
        queryKey: ["reservations", id],
        queryFn: () => getVehicleReservations(id),
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (vehicle) {
            setFavorite(vehicle.isFavorite);
        }
    }, [vehicle]);

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
                    <Specifications vehicle={vehicle} />
                    <Box sx={{ maxWidth: "1100px", margin: "auto", px: 2 }}>
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
                    </Box>
                    {loadingReservations ? (
                        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                            <CircularProgress />
                        </Box>
                    ) : (
                        <DoubleCalendar reservations={reservations} />
                    )}
                    {/* <DoubleCalendar reservations={dates}/> */}
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
        </Box>
    )
}
