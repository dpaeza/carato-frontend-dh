import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DateTimePicker } from '@mui/x-date-pickers';
import { DateRangePicker } from 'rsuite';
import { InputPicker } from 'rsuite';
import dayjs from 'dayjs';
import '../Styles/search.css';
import { Typography, Button, Box } from '@mui/material';
import 'rsuite/DateRangePicker/styles/index.css';
import { getBrands } from '../Services/extras';

export default function Search() {
    // Definir las fechas iniciales: hoy y 4 días después
    const today = dayjs().startOf('day');
    const defaultEndDate = today.add(4, 'day');

    // Estado con valores iniciales
    const [startDate, setStartDate] = useState(today.toDate());
    const [endDate, setEndDate] = useState(defaultEndDate.toDate());

    // Estado para almacenar las marcas
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);

    // Efecto para obtener las marcas
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await getBrands(); // Asume que getBrands() devuelve un array con objetos { id, name }
                const formattedBrands = response.map(brand => ({
                    label: brand.name,
                    value: brand.id
                }));
                setBrands(formattedBrands);
            } catch (error) {
                console.error("Error al obtener las marcas:", error);
            }
        };
        fetchBrands();
    }, []);

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
                <InputPicker
                    appearance="default"
                    placeholder="Selecciona una marca"
                    data={brands}
                    value={selectedBrand}
                    onChange={setSelectedBrand}
                    size="lg"
                    style={{ width: 230 }}
                    searchable={false}
                    menuStyle={{
                        padding: '8px', // Espaciado dentro del menú
                        borderRadius: 8, // Bordes redondeados del menú
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Sombra suave
                    }}
                    renderMenuItem={(label, item) => (
                        <div
                            style={{
                                padding: '8px 12px',
                                cursor: 'pointer',
                                borderRadius: 6,
                                transition: 'background 0.2s ease-in-out',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 123, 255, 0.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                            {label}
                        </div>
                    )}
                />
                <DateRangePicker
                    appearance="default"
                    placeholder="Fecha de retiro - Fecha de devolución"
                    label="Fecha de retiro - Fecha de devolución"
                    size="lg"
                    style={{ width: 500 }}
                    value={[startDate, endDate]}
                    onChange={(range) => {
                        // Verifica que range contenga las fechas seleccionadas
                        if (range) {
                            setStartDate(range[0]);
                            setEndDate(range[1]);
                        }
                    }}
                    shouldDisableDate={(date) => dayjs(date).isBefore(dayjs().startOf('day'))}
                    defaultCalendarValue={[startDate, endDate]}
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
