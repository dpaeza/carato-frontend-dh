import React, { useState, useEffect } from 'react';
import '../Styles/categories.css';
import IconHibrido from '../assets/icons/Icon-hibrido.svg?react';
import IconElectrico from '../assets/icons/Icon-electrico.svg?react';
import IconLujo from '../assets/icons/Icon-lujo.svg?react';
import IconCompacto from '../assets/icons/Icon-compacto.svg?react';
import IconDeportivo from '../assets/icons/Icon-deportivo.svg?react';
import IconFamiliar from '../assets/icons/Icon-familiar.svg?react';
import { getCategories } from '../Services/categories';

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

export default function Categories() {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categories, setCategories] = useState([]);

    const toggleCategory = (category) => {
        setSelectedCategories(prevSelected =>
            prevSelected.includes(category)
                ? prevSelected.filter(item => item !== category)
                : [...prevSelected, category]
        );
    };

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
            <div className="desktop-categories">
                {categories.map(({ id, name }) => {
                    const normalizedName = normalizeCategoryName(name); // Normaliza el nombre
                    const Icon = iconMap[normalizedName]; // Obtiene el ícono correspondiente
                    return (
                        <div
                            key={id}
                            className={`category ${selectedCategories.includes(name) ? 'selected' : ''}`}
                            onClick={() => toggleCategory(name)}
                        >
                            <div className="iconContainer">
                                {Icon ? (
                                    <Icon
                                        className="category-icon"
                                        style={{ fill: selectedCategories.includes(name) ? 'var(--darkBlue)' : 'var(--lightGrey)' }}
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
                                    className={`category ${selectedCategories.includes(name) ? 'selected' : ''}`}
                                    onClick={() => toggleCategory(name)}
                                >
                                    <div className="iconContainer">
                                        {Icon ? (
                                            <Icon
                                                className="category-icon"
                                                style={{ fill: selectedCategories.includes(name) ? 'var(--darkBlue)' : 'var(--lightGrey)' }}
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
