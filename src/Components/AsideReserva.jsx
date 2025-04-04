import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, Checkbox, FormControlLabel, FormGroup, Button } from '@mui/material';
import { DateRangePicker, CustomProvider } from 'rsuite';
import esAR from 'rsuite/locales/es_AR';
import dayjs from 'dayjs';
import { useMediaQuery, useTheme } from "@mui/material";

const rules = [
    "Debes tener al menos 21 años para alquilar un vehículo.",
    "Es obligatorio presentar una licencia de conducir válida al momento de recoger el vehículo.",
    "Si devuelves el vehículo después de la fecha acordada, se aplicarán recargos adicionales por día.",
    "El vehículo debe devolverse con el mismo nivel de combustible con el que fue entregado; de lo contrario, se aplicarán cargos adicionales.",
    "Está prohibido fumar dentro del vehículo. De lo contrario, se aplicará una tarifa de limpieza.",
    "El uso del vehículo fuera del país sin autorización previa está prohibido y puede generar penalidades.",
];

export default function AsideReserva({ 
    user, 
    reservations, 
    start, 
    end, 
    onBook = () => {}, 
    onStartDateChange = () => {}, 
    onEndDateChange = () => {} 
}) {

    const today = dayjs().startOf('day');
    const defaultEndDate = today.add(4, 'day');

    const [accepted, setAccepted] = useState(false);
    const [startDate, setStartDate] = useState(today.toDate());
    const [endDate, setEndDate] = useState(defaultEndDate.toDate());

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

    useEffect(() => {
        if (start) setStartDate(start);
        if (end) setEndDate(end);
    }, [start, end]);

    return (
        <Box>
            <Box
                display={"flex"}
                flexDirection={"column"}
                gap={1}
            >
                <Typography
                    variant="h5"
                    fontSize={16}
                    fontFamily={"var(--openSans)"}
                    fontWeight={600}
                    color="var(--darkBlue)"
                >
                    Tu reserva
                </Typography>
                <Typography
                    variant="h5"
                    fontSize={14}
                    fontFamily={"var(--openSans)"}
                    fontWeight={600}
                    color="var(--mediumGrey)"
                >
                    Fechas
                </Typography>
                <CustomProvider locale={esAR}>
                    <DateRangePicker
                        id="date-range"
                        size="lg"
                        appearance="default"
                        className="date-range-picker"
                        placeholder="Selecciona fechas"
                        format="MMM dd, yyyy"
                        style={{ width: '100%', marginBottom: 15 }}
                        cleanable
                        ranges={[]}
                        showOneCalendar={isMobile}
                        value={[startDate, endDate]}
                        onChange={(range) => {
                            if (range) {
                                setStartDate(range[0]);
                                setEndDate(range[1]);
                                onStartDateChange(range[0]);
                                onEndDateChange(range[1]);
                            } else {
                                setStartDate(null);
                                setEndDate(null);
                                onStartDateChange(null);
                                onEndDateChange(null);
                            }
                        }}
                        shouldDisableDate={(date) => isDateDisabled(dayjs(date))}
                    />
                </CustomProvider>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box
                display={"flex"}
                flexDirection={"column"}
                gap={1}
            >
                <Typography
                    variant="h5"
                    fontSize={16}
                    fontFamily={"var(--openSans)"}
                    fontWeight={600}
                    color="var(--darkBlue)"
                >
                    Informacion del usuario
                </Typography>
                <Typography
                    variant="h5"
                    fontSize={13}
                    fontFamily={"var(--openSans)"}
                    fontWeight={500}
                    color="var(--mediumGrey)"
                >
                    {user.name} {user.lastname}
                </Typography>
                <Typography
                    variant="h5"
                    fontSize={13}
                    fontFamily={"var(--openSans)"}
                    fontWeight={500}
                    color="var(--mediumGrey)"
                >
                    {user.email}
                </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box
                display={"flex"}
                flexDirection={"column"}
                gap={1}
            >
                <Typography
                    variant="h5"
                    fontSize={16}
                    fontFamily={"var(--openSans)"}
                    fontWeight={600}
                    color="var(--darkBlue)"
                >
                    Políticas de cancelación
                </Typography>
                <Typography
                    variant="h5"
                    fontSize={13}
                    fontFamily={"var(--openSans)"}
                    fontWeight={500}
                    color="var(--mediumGrey)"
                >
                    Cancelación gratuita hasta 24 horas antes de la fecha de inicio del alquiler.  
                    En caso de cancelación tardía o no presentación, se aplicará una penalización equivalente a una noche de alquiler.
                </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box
                display={"flex"}
                flexDirection={"column"}
                gap={1}
                mb={3}
            >
                <Typography
                    variant="h5"
                    fontSize={16}
                    fontFamily={"var(--openSans)"}
                    fontWeight={600}
                    color="var(--darkBlue)"
                >
                    Reglas a considerar
                </Typography>
                {
                    rules.map((rule, index) => (
                        <Typography
                            key={index}
                            variant="h5"
                            fontSize={13}
                            fontFamily={"var(--openSans)"}
                            fontWeight={500}
                            color="var(--mediumGrey)"
                        >
                            - {rule}
                        </Typography>
                    ))
                }
            </Box>
            <FormGroup>
                <FormControlLabel
                    required
                    control={
                        <Checkbox
                            checked={accepted}
                            onChange={(e) => setAccepted(e.target.checked)}
                            sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: 18,
                                    color: "var(--mediumGrey)",
                                }
                            }}
                        />
                    }
                    label="He leído y acepto los términos y condiciones, así como la política de privacidad y las reglas de alquiler."
                    sx={{
                        '& .MuiFormControlLabel-label': {
                            fontSize: 11,
                            fontFamily: "var(--openSans)",
                            fontWeight: 500,
                            color: "var(--mediumGrey)",
                        },
                        color: "var(--mediumGrey)",
                    }}
                />

            </FormGroup>
            <Button
                variant="contained"
                color="primary"
                sx={{ width: "100%", fontSize: 18, fontFamily: "var(--openSans)", fontWeight: 600, marginTop: 2 }}
                disabled={!accepted || !startDate || !endDate}
                onClick={onBook}
            >
                CONFIRMAR
            </Button>
        </Box>
    )
}
