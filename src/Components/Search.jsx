import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DateTimePicker } from '@mui/x-date-pickers';
import { DateRangePicker } from 'rsuite';
import dayjs from 'dayjs';
import '../Styles/search.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import 'rsuite/DateRangePicker/styles/index.css';

const cities = [
    'Buenos Aires',
];

export default function Search() {
    // Definir las fechas iniciales: hoy y 4 días después
    const today = dayjs().startOf('day');
    const defaultEndDate = today.add(4, 'day');

    // Estado con valores iniciales
    const [startDate, setStartDate] = useState(today.toDate());
    const [endDate, setEndDate] = useState(defaultEndDate.toDate());

    return (
        <section className='search-component'>
            <h2>Alquila tu vehiculo</h2>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
            }}>

                <DateRangePicker appearance="default" placeholder="Fecha de retiro - Fecha de devolución"  size="lg" style={{ width: 230 }} />
                <DateRangePicker 
                    appearance="default" 
                    placeholder="Fecha de retiro - Fecha de devolución"
                    size="lg" 
                    style={{ width: 330 }} 
                    value={[startDate, endDate]}
                    onChange={(range) => {
                        // Verifica que range contenga las fechas seleccionadas
                        if (range) {
                            setStartDate(range[0]);
                            setEndDate(range[1]);
                        }
                    }}
                    // Deshabilita las fechas anteriores al día actual
                    disabledDate={(date) => dayjs(date).isBefore(dayjs().startOf('day'))}
                />


                <Button 
                    className='searchButton'
                    sx={{ 
                        width: { xs: '100%', sm: 'auto' },
                        backgroundColor: 'var(--lightBlue)',
                        color: 'white',
                        px: 2
                    }}
                >
                    Buscar
                </Button>
            </Box>
        </section>
    );
}
