import React, { useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers'
import { Box, Typography, IconButton, Divider } from '@mui/material'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Grid from '@mui/material/Grid2';
import useMediaQuery from '@mui/material/useMediaQuery'

dayjs.locale('es')

export default function DoubleCalendar({ reservations }) {

    const initialLeftDate = dayjs();
    const initialRightDate = initialLeftDate.add(1, 'month');

    const [leftDate, setLeftDate] = useState(initialLeftDate)
    const [rightDate, setRightDate] = useState(initialRightDate)

    const isMobile = useMediaQuery('(max-width:720px)');

    const handlePrevMonth = () => {
        setLeftDate(prev => prev.subtract(1, 'month'));
        setRightDate(prev => prev.subtract(1, 'month'));
    };

    const handleNextMonth = () => {
        setLeftDate(prev => prev.add(1, 'month'));
        setRightDate(prev => prev.add(1, 'month'));
    };

    const handlePrevMonthMobile = () => {
        setLeftDate(prev => prev.subtract(1, 'month'))
    }
    
    const handleNextMonthMobile = () => {
        setLeftDate(prev => prev.add(1, 'month'))
    }

    const isDateDisabled = (date) => {
        const today = dayjs().startOf('day');

        // Deshabilitar fechas pasadas
        if (date.isBefore(today)) return true;

        // Deshabilitar fechas dentro de las reservas
        return reservations.some(reservation => {
            const startDate = dayjs(reservation.startDate);
            const endDate = dayjs(reservation.endDate);
            return date.isSame(startDate, 'day') || date.isSame(endDate, 'day') || (date.isAfter(startDate, 'day') && date.isBefore(endDate, 'day'));
        });
    };

    return (
        <Box sx={{ maxWidth: "1100px", margin: "auto", px: 2, mb: 3 }}>
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
            <Box
                sx={{
                    border: '1px solid #ccc',
                    borderRadius: 3,
                    display: 'inline-block',
                }}
            >
                <Box
                    pt={2}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                        {isMobile ? (
                            // Vista Mobile: Solo un calendario
                            <Box>
                                <Grid container >
                                    <Grid item size={2} sx={{pl:2}}>
                                        <IconButton onClick={handlePrevMonthMobile}>
                                            <KeyboardArrowLeftIcon fontSize='medium' sx={{ color: 'var(--lightGrey)' }} />
                                        </IconButton>
                                    </Grid>
                                    <Grid item size={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Typography
                                            variant="h6"
                                            gutterBottom
                                            fontFamily={'var(--lato)'}
                                            fontSize={16}
                                            color='var(--darkBlue)'
                                            textTransform={'capitalize'}
                                        >
                                            {leftDate.format('MMMM YYYY')}
                                        </Typography>
                                    </Grid>
                                    <Grid item size={2}>
                                        <IconButton onClick={handleNextMonthMobile}>
                                            <KeyboardArrowRightIcon fontSize='medium' sx={{ color: 'var(--lightGrey)' }} />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                <DateCalendar
                                    readOnly
                                    value={leftDate}
                                    shouldDisableDate={isDateDisabled}
                                />
                            </Box>
                        ) : (
                            <Box
                                display="flex"
                                // flexDirection={{ xs: 'column', md: 'row' }}
                                justifyContent="center"
                            >
                                <Box>
                                    <Grid container
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Grid size={1}>
                                            <IconButton onClick={handlePrevMonth}>
                                                <KeyboardArrowLeftIcon fontSize='medium' sx={{ color: 'var(--lightGrey)' }} />
                                            </IconButton>
                                        </Grid>
                                        <Grid size={10}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                gutterBottom
                                                fontFamily={'var(--lato)'}
                                                fontSize={16}
                                                color='var(--darkBlue)'
                                                textTransform={'capitalize'}
                                            >
                                                {leftDate.format('MMMM YYYY')}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <DateCalendar
                                        readOnly={true}
                                        value={leftDate}
                                        shouldDisableDate={isDateDisabled}
                                    />
                                </Box>
                                <Divider orientation="vertical" flexItem />
                                <Box>
                                    <Grid container >
                                        <Grid size={1}>
                                        </Grid>
                                        <Grid size={9}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                gutterBottom
                                                fontFamily={'var(--lato)'}
                                                fontSize={16}
                                                color='var(--darkBlue)'
                                                textTransform={'capitalize'}
                                            >
                                                {rightDate.format('MMMM YYYY')}
                                            </Typography>
                                        </Grid>
                                        <Grid size={2}>
                                            <IconButton onClick={handleNextMonth}>
                                                <KeyboardArrowRightIcon fontSize='medium' sx={{ color: 'var(--lightGrey)' }} />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    <DateCalendar
                                        readOnly={true}
                                        value={rightDate}
                                        shouldDisableDate={isDateDisabled}
                                    />
                                </Box>
                            </Box>
                        
                        )}
                        
                    </LocalizationProvider>
                </Box>
            </Box>
        </Box>
    )
}
