import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Box, CircularProgress, Typography, Alert, Button } from '@mui/material';
import CardHistorial from '../Components/CardHistorial';
import { getUserReservations } from '../Services/reservations';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import EmptyStateBooking from '../assets/EmptyStateBooking.svg?react';
import ReviewModal from '../Components/ReviewModal';

export default function Reservas() {
    const navigate = useNavigate();

    const [openReviewModal, setOpenReviewModal] = useState(false);
    const [id, setId] = useState(null);

    const MySwal = withReactContent(Swal);

    const { data: reservations, isLoading, error } = useQuery({
        queryKey: ["userReservations"],
        queryFn: () => getUserReservations(),
        refetchOnWindowFocus: false,
        throwOnError: true,
    });

    const handleReview = () => {
        console.log("Reseña enviada");
        MySwal.fire({
            icon: 'success',
            title: 'Reseña enviada',
            text: 'Gracias por tu opinión',
            timer: 2000,
            showConfirmButton: false,
        });
        setOpenReviewModal(false);
    }

    return (
        <Box
            sx={{
                backgroundColor: "#FAFAF",
                maxWidth: 1200,
                margin: 'auto',
                p: 6
            }}
        >
            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Alert severity="error">
                    Ocurrió un error al traer tus reservas. Inténtalo de nuevo más tarde.
                </Alert>
            ) : (reservations?.data?.length > 0) ? (
                <Box>
                    <Typography
                        variant="h2"
                        fontFamily="var(--openSans)"
                        fontSize={24}
                        fontWeight={700}
                        color='var(--darkBlue)'
                        textAlign={'center'}
                    >
                        Mis Reservas
                    </Typography>
                    <Box
                        display="grid"
                        gridTemplateColumns={{ xs: "1fr", md: "repeat(2, 1fr)" }}
                        gap={2}
                        padding={2}
                        sx={{
                            backgroundColor: "#FAFAF",
                            maxWidth: 1200,
                            margin: 'auto',
                        }}
                    >
                        {reservations?.data?.map((car) => (
                            <Link key={car.reservation.id} to={`/vehiculo/${car.car.id}`} style={{ textDecoration: "none" }}>
                                <CardHistorial
                                    car={car}
                                    onReview={() => {
                                        setOpenReviewModal(true);
                                        setId(car.car.id);
                                        console.log(car.car.id);
                                    }}
                                />
                            </Link>
                        ))}
                    </Box>
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
                    <EmptyStateBooking
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
                        Aún no tienes reservas
                    </Typography>
                    <Typography
                        variant="body1"
                        fontFamily="var( --lato)"
                        fontWeight={500}
                        color='var(--lightGrey)'
                        textAlign={'center'}
                    >
                        Encuentra el auto ideal para tu próximo viaje y resérvalo en minutos.
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
            <ReviewModal
                open={openReviewModal}
                onClose={() => setOpenReviewModal(false)}
                id={id}
                onSuccess={handleReview}
            />
        </Box>
    )
}
