import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const routes = [
    { label: "Lista de productos", to: "/administracion/vehiculos" },
    { label: "Agregar producto", to: "/administracion/agregarvehiculo" },
    { label: "Categorías", to: "/administracion/agregarcategoria" },
    { label: "Usuarios", to: "/administracion/usuarios" }
];

export default function NavbarAdmin() {
    const navigate = useNavigate();
    const location = useLocation();

    const currentIndex = routes.findIndex(route => route.to === location.pathname);
    const [value, setValue] = useState(currentIndex !== -1 ? currentIndex : 0);

    useEffect(() => {
        setValue(currentIndex !== -1 ? currentIndex : 0);
    }, [location.pathname, currentIndex]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        navigate(routes[newValue].to);
    };

    return (
        <Tabs 
            value={value} 
            onChange={handleChange} 
            aria-label="nav tabs example"
            sx={{
                '& .MuiTabs-indicator': { backgroundColor: 'var(--lightBlue)' },
                '& .MuiTab-root': { 
                    color: 'gray', 
                    fontSize: '15px',
                    padding: '8px 15px',
                    textTransform: 'none',
                    marginRight: '5px',
                    // backgroundColor: 'var(--lightGrey)',
                    // color: 'var(--pureWhite)',
                    // boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                },
                '& .Mui-selected': { 
                    backgroundColor: 'var(--lightBlue)',
                    color: 'white !important',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                    fontSize: '15px',
                    padding: '8px 15px',
                }
            }}
        >
            {routes.map((route, index) => (
                <Tab key={index} label={route.label} />
            ))}
        </Tabs>
    );
}