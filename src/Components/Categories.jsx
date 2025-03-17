import React from 'react';
import { useQuery } from '@tanstack/react-query';
import '../Styles/categories.css';
import { getCategories } from '../Services/categories';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Categories({ selectedCategoriesId, toggleCategoryById, filteredProducts, totalProducts }) {
    // Usamos useQuery para obtener las categorías y aprovechar el caché y otras optimizaciones
    const {
        data: categories = [],
        isLoading,
        error
    } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
        staleTime: 60000, // Evita refetch cada vez que el componente se renderiza
        refetchOnWindowFocus: false
    });

    // Mientras se cargan las categorías mostramos un loader
    if (isLoading) return <Box display={"flex"} justifyContent={'center'} alignItems={'center'}><CircularProgress size="30px"/></Box>;
    if (error) return <div>Error al cargar las categorías: {error.message}</div>;

    return (
        <section className="categories-component">
            {/* Versión de escritorio (cuadrícula) */}
            <div className="categories-container">
                <div className="desktop-categories">
                    {categories.map(({ id, name, image }) => (
                        <div
                            key={id}
                            className={`category ${selectedCategoriesId.includes(id) ? 'selected' : ''}`}
                            onClick={() => toggleCategoryById(id)}
                        >
                            <div className="iconContainer">
                                {image.url ? (
                                    <img
                                        src={image.url}
                                        alt={name}
                                        className="category-icon"
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            objectFit: 'contain',
                                            filter: selectedCategoriesId.includes(id)
                                                ? 'opacity(1)'
                                                : 'opacity(0.35)'
                                        }}
                                    />
                                ) : (
                                    <span>Ícono no encontrado</span>
                                )}
                            </div>
                            <p>{name}</p>
                        </div>
                    ))}
                </div>
                {selectedCategoriesId.length > 0 && (
                    <Box>
                        <Box
                            mt={3}
                            display="flex"
                            gap={2}
                            alignItems="center"
                            justifyContent="space-between"
                            flexDirection={{ xs: 'column', sm: 'row' }}
                        >
                            <Box
                                display="flex"
                                gap={2}
                                alignItems="center"
                                flexDirection={{ xs: 'column', sm: 'row' }}
                            >
                                <Typography
                                    variant="h5"
                                    fontFamily="var(--openSans)"
                                    fontSize={{ xs: 13, sm: 15 }}
                                    fontWeight={600}
                                >
                                    Filtros seleccionados
                                </Typography>
                                <Box display="flex" gap={{ xs: 0.5, sm: 1 }} flexWrap="wrap">
                                    {selectedCategoriesId.map((id) => {
                                        const category = categories.find((cat) => cat.id === id);
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
                                                    variant="body1"
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
                                                        fontSize: { xs: '12px', sm: '14px' }
                                                    }}
                                                />
                                            </Box>
                                        );
                                    })}
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
                                        color: 'var(--white)'
                                    }
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
                            <span style={{ fontWeight: 700 }}>{filteredProducts}</span> de {totalProducts} vehículos cumplen con el filtro
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
                        }
                    }}
                >
                    {categories.map(({ id, name, image }) => (
                        <SwiperSlide key={id}>
                            <div
                                className={`category ${selectedCategoriesId.includes(id) ? 'selected' : ''}`}
                                onClick={() => toggleCategoryById(id)}
                            >
                                <div className="iconContainer">
                                    {image.url ? (
                                        <img
                                            src={image.url}
                                            alt={name}
                                            className="category-icon"
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                objectFit: 'contain',
                                                filter: selectedCategoriesId.includes(id)
                                                    ? 'brightness(0) saturate(100%) invert(7%) sepia(6%) saturate(670%) hue-rotate(202deg) brightness(95%) contrast(92%)'
                                                    : 'brightness(0) saturate(100%) invert(74%) sepia(4%) saturate(95%) hue-rotate(198deg) brightness(89%) contrast(91%)'
                                            }}
                                        />
                                    ) : (
                                        <span>Ícono no encontrado</span>
                                    )}
                                </div>
                                <p>{name}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}

