import React, { useState, useEffect } from 'react';
import { DateRangePicker, InputPicker, Button, CustomProvider } from 'rsuite';
import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';
import '../Styles/search.css';
import { Box, Typography } from '@mui/material';
import 'rsuite/DateRangePicker/styles/index.css';
import 'rsuite/InputPicker/styles/index.css';
import SearchIcon from '@mui/icons-material/Search';
import { getBrands } from '../Services/extras';
import Grid from '@mui/material/Grid2';
import { set } from 'rsuite/esm/internals/utils/date';
import esAR from 'rsuite/locales/es_ar';

export default function Search({ onSearch = () => { } }) {
    // Definir las fechas iniciales: hoy y 4 días después
    const today = dayjs().startOf('day');
    const defaultEndDate = today.add(4, 'day');

    // Estados para las fechas
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [isDateTouched, setIsDateTouched] = useState(false);

    // Estados para las marcas
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);

    const [searchParams] = useSearchParams();

    const getPageParams = () => {
        const params = {
            brand: searchParams.get('brandId'),
            start: searchParams.get('startDate'),
            end: searchParams.get('endDate'),
        };

        const isValidDate = (date) => dayjs(date, 'YYYY-MM-DD', true).isValid();

        if (params.brand) setSelectedBrand(parseInt(params.brand));
        if (isValidDate(params.start)) setStartDate(dayjs(params.start).toDate());
        if (isValidDate(params.end)) setEndDate(dayjs(params.end).toDate());
    }

    const fetchBrands = async () => {
        try {
            const response = await getBrands(); // Se espera un array con objetos { id, name }
            const formattedBrands = response.map(brand => ({
                label: brand.name,
                value: brand.id
            }));
            setBrands(formattedBrands);
        } catch (error) {
            console.error("Error al obtener las marcas:", error);
        }
    };

    const handleSearch = () => {
        let onSearchObject = {};

        if (startDate && endDate) {
            // Se formatean las fechas a "YYYY-MM-DD"
            const formattedStartDate = dayjs(startDate).format('YYYY-MM-DD');
            const formattedEndDate = dayjs(endDate).format('YYYY-MM-DD');
            onSearchObject = {
                startDate: formattedStartDate,
                endDate: formattedEndDate
            };
        }

        if (onSearch) {
            onSearch({
                ...onSearchObject,
                brand: selectedBrand
            });
        }
    }

    useEffect(() => {
        fetchBrands();
        getPageParams();
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '100%',
                padding: '20px',
                backgroundColor: 'white',
                borderRadius: '10px',
                boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Typography
                variant="h3"
                component="h2"
                fontFamily='(var(--openSans))'
                fontSize={'22px'}
                fontWeight={700}
                textAlign={'left'}
                mb={0.5}
            >
                Alquila tu vehículo
            </Typography>
            <CustomProvider locale={esAR}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: 2,
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Grid
                        container
                        spacing={2}
                        direction={{ xs: 'column', sm: 'row' }}
                        alignItems="flex-end"
                        justifyContent={{ xs: 'center', sm: 'space-between' }}
                        width={'100%'}
                    >
                        <Grid size={{ xs: 12, sm: 12, md: 3, lg: 3 }}>
                            <label htmlFor="brand-picker" className="input-label">
                                Marca
                            </label>
                            <InputPicker
                                id="brand-picker"
                                placeholder="Selecciona una marca"
                                data={brands}
                                value={selectedBrand}
                                onChange={setSelectedBrand}
                                size="lg"
                                block
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 7, lg: 7 }}>
                            <label htmlFor="date-range" className="input-label">
                                Fecha de retiro - Fecha de devolución
                            </label>
                            <DateRangePicker
                                id="date-range"
                                appearance="default"
                                placeholder="Selecciona fechas"
                                size="lg"
                                className="date-range-picker"
                                style={{ width: '100%' }}
                                cleanable
                                ranges={[]}
                                value={startDate && endDate ? [startDate, endDate] : null}
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
                                onOpen={() => {
                                    if (!isDateTouched) {
                                        setStartDate(today.toDate());
                                        setEndDate(defaultEndDate.toDate());
                                        setIsDateTouched(true);
                                    }
                                }}
                                shouldDisableDate={(date) =>
                                    dayjs(date).isBefore(dayjs().startOf('day'))
                                }
                            // defaultCalendarValue={[startDate, endDate]}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 2 }}>
                            <Button
                                startIcon={<SearchIcon fontSize='small' />}
                                style={{
                                    width: '100%',
                                    fontFamily: '(var(--lato))',
                                    fontWeight: 500,
                                    padding: '10px',
                                    borderRadius: '8px',
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                    backgroundColor: '#3083FF',
                                    color: 'white',
                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                }}
                                onClick={handleSearch}
                            >
                                Buscar
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </CustomProvider>
        </Box>
    );
}
