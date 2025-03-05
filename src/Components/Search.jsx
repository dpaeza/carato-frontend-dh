import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import '../Styles/search.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const cities = [
    'Buenos Aires',
];

export default function Search() {
    const [location, setLocation] = useState(cities[0]);
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs().add(4, 'day'));

    const handleChange = (event) => {
        setLocation(event.target.value);
    }

    useEffect(() => {
        console.log(location);
    }, [location]);

    useEffect(() => {
        console.log(startDate);
    }, [startDate]);

    useEffect(() => {
        console.log(endDate);
    }, [endDate]);

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
                <FormControl sx={{ width: { xs: '100%', sm: '200px' } }}>
                    <Select
                        displayEmpty
                        value={location}
                        onChange={handleChange}
                        sx={{ 
                            fontFamily: 'var(--lato)',
                            width: '100%',
                        }}
                        size='small'
                    >
                        {cities.map((name) => (
                            <MenuItem key={name} value={name}>
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label="Fecha de retiro"
                        value={startDate}
                        onChange={(newValue) => setStartDate(newValue)}
                        sx={{ 
                            fontFamily: 'var(--lato)',
                            width: { xs: '100%', sm: 'auto' },
                        }}
                        slotProps={{ textField: { size: 'small' } }}
                    />
                    <DateTimePicker
                        label="Fecha de devolución"
                        value={endDate}
                        onChange={(newValue) => setEndDate(newValue)}
                        sx={{ 
                            fontFamily: 'var(--lato)',
                            width: { xs: '100%', sm: 'auto' },
                        }}
                        slotProps={{ textField: { size: 'small' } }}
                    />
                </LocalizationProvider>
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
