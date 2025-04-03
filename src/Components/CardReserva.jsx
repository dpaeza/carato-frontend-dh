import React, {useState} from 'react'
import { Card, Typography, CardHeader, CardContent, Divider, Box } from '@mui/material';
import { DateRangePicker, Button, CustomProvider } from 'rsuite';
import esAR from 'rsuite/locales/es_AR';
import dayjs from 'dayjs';

export default function CardReserva({price, reservations, onBook = () => {}}) {
    const today = dayjs().startOf('day');
    const defaultEndDate = today.add(4, 'day');

    // Estados para las fechas
    const [startDate, setStartDate] = useState(today.toDate());
    const [endDate, setEndDate] = useState(defaultEndDate.toDate());

    const isDateDisabled = (date) => {
        // Deshabilitar fechas pasadas
        if (date.isBefore(today)) return true;

        // Deshabilitar fechas dentro de las reservas
        if (!reservations || reservations.length === 0) {
            return false;
        } else {
            return reservations.some(reservation => {
                const startDate = dayjs(reservation.startDate);
                const endDate = dayjs(reservation.endDate);
                return date.isSame(startDate, 'day') || date.isSame(endDate, 'day') || (date.isAfter(startDate, 'day') && date.isBefore(endDate, 'day'));
            });
        }
    };

    const daysSelected = startDate && endDate ? dayjs(endDate).diff(dayjs(startDate), 'day') + 1 : 0;
    const total = price * daysSelected;

    return (
        <CustomProvider locale={esAR}>
            <Card>
                <CardHeader
                    title={
                        <Typography 
                            variant="h5"
                            fontSize={25} 
                            fontFamily={"var(--openSans)"} 
                            fontWeight={600} 
                            color="var(--darkBlue)"
                            textAlign={"center"}
                        >
                        $<span>{price}</span> ARG <span style={{color: "#747A91", fontSize: "13px"}}>día</span> 
                    </Typography>}
                />
                        
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2
                    }}
                >
                    <Typography 
                        variant="h5" 
                        fontSize={14} 
                        fontFamily={"var(--openSans)"} 
                        fontWeight={500} 
                        color="var(--darkBlue)"
                    >
                        Fecha de reserva
                    </Typography>
                    <DateRangePicker
                        id="date-range"
                        size="lg"
                        appearance="default"
                        className="date-range-picker"
                        placeholder="Selecciona fechas"
                        style={{ width: '100%' }}
                        cleanable
                        ranges={[]}
                        value={[startDate, endDate]}
                        onChange={(range) => {
                            if (range) {
                                setStartDate(range[0]);
                                setEndDate(range[1]);
                            } else {
                                setStartDate(null);
                                setEndDate(null);
                                setIsDateTouched(false);
                            }
                        }}
                        shouldDisableDate={(date) => isDateDisabled(dayjs(date))}
                        placement="bottomEnd"
                    />
                    <Button 
                        appearance="primary"
                        variant="contained" 
                        block
                        sx={{
                            bgcolor: "var(--lightBlue)",
                            color: "white",
                            textTransform: "none",
                            fontWeight: 600,
                            borderRadius: 2,
                        }}
                        disabled={daysSelected === 0}
                        onClick={() => onBook(startDate, endDate)}
                    >
                        ALQUILAR
                    </Button>
                    <Typography 
                        variant="body2"
                        fontSize={13}
                        fontFamily={"var(--lato)"}
                        fontWeight={300}
                        color="var(--mediumGrey)"
                    >
                        No se hará ningún cargo por el momento
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography 
                            variant="h5"
                            fontSize={18}
                            fontWeight={600}
                        >
                            Total
                        </Typography>
                        <Typography 
                            variant="h5"
                            fontSize={18}
                            fontWeight={600}
                        >
                            $<span>{total}</span> ARG
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </CustomProvider>
    )
}
