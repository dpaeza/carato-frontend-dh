import React, { useState } from 'react'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers'
import { Box, Typography, IconButton, Divider } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Grid from '@mui/material/Grid2';

export default function DoubleCalendar({ reservations }) {
    // Inicializamos leftDate con la fecha actual
    const initialLeftDate = dayjs();
    // Inicializamos rightDate con el mes siguiente
    const initialRightDate = initialLeftDate.add(1, 'month');

    const [leftDate, setLeftDate] = useState(initialLeftDate)
    const [rightDate, setRightDate] = useState(initialRightDate)

    const handlePrevMonth = () => {
        setLeftDate(prev => prev.subtract(1, 'month'));
        setRightDate(prev => prev.subtract(1, 'month'));
    };

    const handleNextMonth = () => {
        setLeftDate(prev => prev.add(1, 'month'));
        setRightDate(prev => prev.add(1, 'month'));
    };

    const handleLeftDateChange = (newDate) => {
        setLeftDate(newDate);
        setRightDate(newDate.add(1, 'month'));
    };

    const handleRightDateChange = (newDate) => {
        setRightDate(newDate);
        setLeftDate(newDate.subtract(1, 'month'));
    };

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
        <Box sx={{maxWidth: "1100px", margin: "auto", px: 2, mb:3}}>
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
                    borderRadius: 1,
                    display:'inline-block',
                    padding: 2,
                }}
            >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box 
                        display="flex" 
                        flexDirection={{xs:'column', md:'row'}}
                        justifyContent="center"
                    >
                        <Box>
                            <Grid container>
                                <Grid size={1}>
                                    <IconButton onClick={handlePrevMonth}>
                                        <ArrowBackIosIcon fontSize='small' sx={{color:'var(--lightGrey)'}}/>
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
                                    >
                                        {leftDate.format('MMMM YYYY')}
                                    </Typography>
                                </Grid>
                                <Grid size={1}>
                                </Grid>
                            </Grid>
                            <DateCalendar
                                readOnly={true}
                                value={leftDate}
                                onChange={handleLeftDateChange}
                                shouldDisableDate={isDateDisabled}
                            />
                        </Box>
                        <Divider orientation="vertical" flexItem />
                        <Box>
                            <Grid container>
                                <Grid size={1}>
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
                                    >
                                    {rightDate.format('MMMM YYYY')}
                                    </Typography>
                                </Grid>
                                <Grid size={1}>
                                    <IconButton onClick={handleNextMonth}>
                                        <ArrowForwardIosIcon fontSize='small' sx={{color:'var(--lightGrey)'}} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <DateCalendar
                                value={rightDate}
                                onChange={handleRightDateChange}
                                shouldDisableDate={isDateDisabled}
                                readOnly={true}
                            />
                        </Box>
                    </Box>
                </LocalizationProvider>
            </Box>
        </Box>
    )
}
