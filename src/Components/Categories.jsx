import React, { useState } from 'react';
import '../Styles/categories.css';
import IconHibrido from '../assets/icons/Icon-hibrido.svg?react';
import IconElectrico from '../assets/icons/Icon-electrico.svg?react';
import IconLujo from '../assets/icons/Icon-lujo.svg?react';
import IconCompacto from '../assets/icons/Icon-compacto.svg?react';
import IconDeportivo from '../assets/icons/Icon-deportivo.svg?react';
import IconFamiliar from '../assets/icons/Icon-familiar.svg?react';

const categories = [
    { name: "Híbridos", icon: IconHibrido },
    { name: "Eléctricos", icon: IconElectrico },
    { name: "Lujo", icon: IconLujo },
    { name: "Compactos", icon: IconCompacto },
    { name: "Deportivos", icon: IconDeportivo },
    { name: "Familiares", icon: IconFamiliar }
];

export default function Categories() {
    const [selectedCategories, setSelectedCategories] = useState([]);

    const toggleCategory = (category) => {
        setSelectedCategories(prevSelected =>
            prevSelected.includes(category)
                ? prevSelected.filter(item => item !== category)
                : [...prevSelected, category]
        );
    };

    return (
        <section className="categories-component">
            {categories.map(({ name, icon: Icon }, index) => (
                <div
                    key={index}
                    className={`category ${selectedCategories.includes(name) ? 'selected' : ''}`}
                    onClick={() => toggleCategory(name)}
                >
                    <div className="iconContainer">
                        <Icon
                            className="category-icon"
                            style={{ fill: selectedCategories.includes(name) ? 'var(--darkBlue)' : 'var(--lightGrey)' }}
                        />
                    </div>
                    <p>{name}</p>
                </div>
            ))}
        </section>
    );
}

