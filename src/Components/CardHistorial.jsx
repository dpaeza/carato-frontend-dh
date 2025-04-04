import React from 'react'
import { Card, CardContent, Typography, Chip, Box, Divider, Button} from '@mui/material';
import Grid from '@mui/material/Grid2';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';

dayjs.extend(isBetween);

export default function CardHistorial({car, onReview= () => {}}) {
    const today = dayjs().startOf('day');
    const startDate = dayjs(car.reservation.startDate);
    const endDate = dayjs(car.reservation.endDate);

    let status = { label: "Pendiente", bgColor: "#fff4e5", textColor: "#b26a00" };

    if (today.isAfter(endDate)) {
        status = { label: "Completada", bgColor: "#e6f4ea", textColor: "#1b5e20" };
    } else if (today.isBetween(startDate, endDate, null, "[]")) {
        status = { label: "En curso", bgColor: "#e3f2fd", textColor: "#0d47a1" };
    }

    return (
        <Card>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid size={{xs:12, md:4}}>
                        <Box>
                            <img 
                                src={car.car.image.url}  
                                alt={car.car.name} 
                                style={{ 
                                    width: '100%', 
                                    height: '120px',
                                    borderRadius: '8px',
                                    objectFit: 'cover', 
                                }} 
                            />
                        </Box>
                    </Grid>
                    <Grid 
                        size={{xs:12, md:8}}
                        display={"flex"}
                        flexDirection={"column"}
                        justifyContent={"space-between"}
                    >
                        <Typography 
                            variant="h5" 
                            fontFamily={"var(--openSans)"}
                            fontSize={16}
                            fontWeight={600}
                            color={"var(--darkBlue)"}
                        >
                            {car.car.name}
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        <Box
                            display={"flex"}
                            gap={1}
                            alignItems={"center"}
                        >
                            <CalendarMonthIcon sx={{ color: "var(--darkGrey)" }} fontSize='small' />
                            <Typography 
                                variant="h6" 
                                fontFamily={"var(--openSans)"}
                                fontSize={13}
                                fontWeight={400}
                                color={"var(--darkGrey)"}
                            >
                                Fecha de reserva: {car.reservation.startDate} - {car.reservation.endDate}
                            </Typography>
                        </Box>
                        <Box 
                            display={"flex"}
                            gap={1}
                            alignItems={"center"}
                        >
                            <PaidOutlinedIcon sx={{ color: "var(--darkGrey)" }} fontSize='small' />
                            <Typography 
                                variant="h6" 
                                fontFamily={"var(--openSans)"}
                                fontSize={13}
                                fontWeight={400}
                                color={"var(--darkGrey)"}
                            >
                                Precio total: ${car.reservation.totalPrice.toLocaleString("es-AR")} ARS
                            </Typography>
                        </Box>
                        <Box 
                            mt={2}
                            display={"flex"}
                            gap={1}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                        >
                            <Chip 
                                label={status.label}
                                sx={{
                                    backgroundColor: status.bgColor,
                                    color: status.textColor,
                                    fontWeight: "bold",
                                    fontSize: 13,
                                }}
                                size="small"
                            />
                            {status.label === "Completada" && (
                                <Button
                                    variant="outlined"
                                    sx={{
                                        backgroundColor: "var(--lightBlue)",
                                        color: "white",
                                        fontWeight: 600,
                                        fontSize: 13,
                                        padding: "5px 10px",
                                        borderRadius: "8px",
                                        textTransform: "none",
                                        "&:hover": {
                                            backgroundColor: "var(--lightBlue)",
                                            opacity: 0.8,
                                        },
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        onReview()
                                    } }
                                >
                                    Califica
                                </Button>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
