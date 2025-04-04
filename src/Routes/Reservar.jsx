import React, { useState, useEffect, use } from 'react'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import CardCarReserva from '../Components/CardCarReserva';
import AsideReserva from '../Components/AsideReserva';
import { getVehicleReservations, createReservation } from '../Services/reservations';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../Context/auth.context';
import { CircularProgress, Box, Typography, Backdrop } from '@mui/material';
import { getCarByIdOrName } from '../Services/cars';
import Grid from "@mui/material/Grid2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { set } from 'rsuite/esm/internals/utils/date';
import dayjs from 'dayjs';

export default function Reservar() {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const today = dayjs().startOf('day');
    const defaultEndDate = today.add(4, 'day');

    const [reservations, setReservations] = useState([]);
    const [startDate, setStartDate] = useState(today.toDate());
    const [endDate, setEndDate] = useState(defaultEndDate.toDate());
    const [total, setTotal] = useState(0);
    const [loadingBooking, setLoadingBooking] = useState(false);

    const MySwal = withReactContent(Swal);

    const { data: vehicle, isLoading } = useQuery({
        queryKey: ["car", id],
        queryFn: () => getCarByIdOrName(id),
        refetchOnWindowFocus: false,
    });

    const fetchReservations = async () => {
        try {
            const response = await getVehicleReservations(id);
            setReservations(response);
        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    }

    const handleBook = async () => {
        setLoadingBooking(true);
        const data = {
            carId: id,
            startDate: dayjs(startDate).format('YYYY-MM-DD'),
            endDate: dayjs(endDate).format('YYYY-MM-DD'),
        };

        try {
            await createReservation(data);
            MySwal.fire({
                title: 'Reserva confirmada.',
                icon: 'success',
                showCloseButton: false,
                timer: 2000,
            }).then(() => {
                navigate("/reservas");
            });
        } catch (error) {
            MySwal.fire({
                title: 'Error al realizar la reserva.',
                icon: 'error',
                showCloseButton: false,
                timer: 2000,
            });
        }

        setLoadingBooking(false);
    }

    useEffect(() => {
        const daysSelected = startDate && endDate ? dayjs(endDate).diff(dayjs(startDate), 'day') + 1 : 0;
        const totalUpdated = vehicle?.price * daysSelected;
        setTotal(totalUpdated);
    }, [startDate, endDate, vehicle]);

    useEffect(() => {
        fetchReservations();
        if (location.state) {
            setStartDate(location.state.startDate);
            setEndDate(location.state.endDate);
        }
    }, []);

    return (
        <Box
            sx={{
                backgroundColor: "#FAFAF",
                maxWidth: 1100,
                margin: 'auto',
                px: 3,
                pt: 5,
                pb:4,
            }}
        >
            {isLoading ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh'
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Grid container spacing={3}>
                        <Grid
                            size={12}
                            display={"flex"}
                            gap={1}
                            alignItems={"center"}
                            sx={{order:0}}
                        >
                            <ArrowBackIcon
                                onClick={() => navigate(-1)}
                                sx={{ cursor: "pointer", color: "var(--darkBlue)" }}
                                fontSize='large'
                            />
                            <Typography
                                variant="h2"
                                component="span"
                                textTransform={"uppercase"}
                                fontFamily={"var(--openSans)"}
                                fontSize={18}
                                fontWeight={600}
                                color="var(--darkBlue)"
                                sx={{
                                    fontSize: { xs: 18, sm: 25 },
                                    color: "var(--darkBlue)"
                                }}
                            >
                                Detalle de reserva
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, md: 7 }} sx={{order:{xs: 2, md:1}}}>
                            <AsideReserva
                                user={user}
                                reservations={reservations}
                                start={startDate}
                                end={endDate}
                                onBook={() => handleBook()}
                                onStartDateChange={(date) => setStartDate(date)}
                                onEndDateChange={(date) => setEndDate(date)}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 5 }} sx={{ order: { xs: 1, md: 2 } }}>
                            <CardCarReserva
                                car={vehicle}
                                total={total}
                            />
                        </Grid>
                    </Grid>
                </>
            )}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loadingBooking}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    )
}
