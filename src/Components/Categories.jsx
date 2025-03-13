import React, { useState, useEffect } from 'react';
import '../Styles/categories.css';
import IconHibrido from '../assets/icons/Icon-hibrido.svg?react';
import IconElectrico from '../assets/icons/Icon-electrico.svg?react';
import IconLujo from '../assets/icons/Icon-lujo.svg?react';
import IconCompacto from '../assets/icons/Icon-compacto.svg?react';
import IconDeportivo from '../assets/icons/Icon-deportivo.svg?react';
import IconFamiliar from '../assets/icons/Icon-familiar.svg?react';
import { getCategories } from '../Services/categories';
import { Box, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';

// Importaciones de Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// Mapeo de nombres de categoría a íconos
const iconMap = {
    hibridos: IconHibrido,
    electricos: IconElectrico,
    lujo: IconLujo,
    compactos: IconCompacto,
    deportivos: IconDeportivo,
    familiares: IconFamiliar,
};

export default function Categories({selectedCategoriesId, toggleCategoryById, filteredProducts, totalProducts}) {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const categories = await getCategories();
            setCategories(categories);
        } catch (error) {
            console.error("Error al obtener las categorías:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Función para normalizar el nombre de la categoría
    const normalizeCategoryName = (name) => {
        return name.toLowerCase().replace(/\s/g, ''); // Convierte a minúsculas y elimina espacios
    };

    return (
        <section className="categories-component">
            {/* Versión de escritorio (cuadrícula) */}
            <div className='categories-container'>
                <div className="desktop-categories">
                    {categories.map(({ id, name }) => {
                        const normalizedName = normalizeCategoryName(name); // Normaliza el nombre
                        const Icon = iconMap[normalizedName]; // Obtiene el ícono correspondiente
                        return (
                            <div
                                key={id}
                                className={`category ${selectedCategoriesId.includes(id) ? 'selected' : ''}`}
                                onClick={() => toggleCategoryById(id)}
                            >
                                <div className="iconContainer">
                                    {Icon ? (
                                        <Icon
                                            className="category-icon"
                                            style={{ fill: selectedCategoriesId.includes(id) ? 'var(--darkBlue)' : 'var(--lightGrey)' }}
                                        />
                                    ) : (
                                        <span>Ícono no encontrado</span> // Fallback en caso de que no haya ícono
                                    )}
                                </div>
                                <p>{name}</p>
                            </div>
                            
                        );
                    })}
                </div>
                { selectedCategoriesId.length > 0 && (
                    <Box>
                        <Box 
                            mt={3} 
                            display={'flex'} 
                            gap={2} 
                            alignItems={'center'} 
                            justifyContent={'space-between'}
                            flexDirection={{ xs: 'column', sm: 'row' }}
                        >
                            <Box 
                                display={'flex'} 
                                gap={2} 
                                alignItems={'center'}
                                flexDirection={{ xs: 'column', sm: 'row' }}
                            >
                                <Typography
                                    variant='h5'
                                    fontFamily="var(--openSans)"
                                    fontSize={{ xs: 13, sm: 15 }}
                                    fontWeight={600}
                                >
                                    Filtros seleccionados
                                </Typography>
                                <Box display="flex" gap={{ xs: 0.5, sm: 1 }} flexWrap="wrap">
                                    {selectedCategoriesId.map((id) => {
                                            const category = categories.find((category) => category.id === id);
                                            if (!category) return null;
                                            return (
                                                <Box 
                                                    key={id} 
                                                    className="selected-category"
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        padding: '5px 8px',
                                                        borderRadius: '5px',
                                                        backgroundColor: 'var(--mediumWhite)',
                                                        gap: '5px',
                                                        flexWrap: 'wrap',
                                                        maxWidth: '100%' 
                                                    }}
                                                >
                                                    <Typography
                                                        variant='body1'
                                                        fontFamily="var(--openSans)"
                                                        fontSize={{ xs: 11, sm: 13 }}
                                                        fontWeight={400}
                                                    >
                                                        {category.name}
                                                    </Typography>
                                                    <CloseIcon
                                                        onClick={() => toggleCategoryById(id)}
                                                        style={{ cursor: 'pointer' }}
                                                        sx={{ 
                                                            color: 'var(--darkBlue)', 
                                                            fontSize: '14px' ,
                                                            fontSize: { xs: '12px', sm: '14px' }
                                                        }}
                                                    />
                                                </Box>
                                            );
                                        }
                                    )}
                                </Box>
                            </Box>
                            <Button
                                onClick={() => toggleCategoryById()}
                                sx={{
                                    backgroundColor: 'transparent',
                                    border: '1px solid var(--lightGrey)',
                                    color: 'var(--darkBlue)',
                                    textTransform: 'none',
                                    fontSize: { xs: '12px', sm: '13px' },
                                    fontWeight: 400,
                                    borderRadius: '5px',
                                    padding: { xs: '3px', sm: '3px 4px' },
                                    gap: '5px',
                                    marginBttom: { xs: '10px', sm: 0 },
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: 'var(--lightBlue)',
                                        borderColor: 'var(--lightBlue)',
                                        color: 'var(--white)',
                                    },
                                }}
                            >
                                Limpiar filtros
                                <CleaningServicesOutlinedIcon 
                                    sx={{ fontSize: { xs: '14px', sm: '14px' } }}
                                />
                            </Button>
                            
                        </Box>
                        <Typography
                            variant="h6"
                            fontSize={12}
                            mt={1} 
                            fontWeight={500}
                            sx={{ color: 'var(--darkGrey)' }}
                        >
                            <span style={{fontWeight: 700}}>{filteredProducts}</span> de {totalProducts} vehículos cumplen con el filtro
                            
                        </Typography>
                    </Box>
                )}
            </div>

            {/* Versión móvil (carrusel) */}
            <div className="mobile-categories">
                <Swiper
                    slidesPerView={3} // Muestra 3 slides a la vez en móvil
                    spaceBetween={5} // Espacio reducido entre slides
                    breakpoints={{
                        640: {
                            slidesPerView: 4, // Muestra 3 slides en tablets
                        },
                        768: {
                            slidesPerView: 5, // Muestra 4 slides en pantallas más grandes
                        },
                    }}
                >
                    {categories.map(({ id, name }) => {
                        const normalizedName = normalizeCategoryName(name); // Normaliza el nombre
                        const Icon = iconMap[normalizedName]; // Obtiene el ícono correspondiente
                        return (
                            <SwiperSlide key={id}>
                                <div
                                    className={`category ${selectedCategoriesId.includes(id) ? 'selected' : ''}`}
                                    onClick={() => toggleCategoryById(id)}
                                >
                                    <div className="iconContainer">
                                        {Icon ? (
                                            <Icon
                                                className="category-icon"
                                                style={{ fill: selectedCategoriesId.includes(id) ? 'var(--darkBlue)' : 'var(--lightGrey)' }}
                                            />
                                        ) : (
                                            <span>Ícono no encontrado</span> // Fallback en caso de que no haya ícono
                                        )}
                                    </div>
                                    <p>{name}</p>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </section>
    );
}
