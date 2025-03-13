import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavbarAdmin from '../Components/NavbarAdmin';
import { Outlet } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import NoAvailable from '../assets/NoAvailable.svg?react';

export default function Administracion() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 700);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Redirige si la URL es exactamente "/administracion"
    useEffect(() => {
        if (location.pathname === "/administracion") {
            navigate("/administracion/vehiculos", { replace: true });
        }
    }, [location.pathname, navigate]);

    return (
        <Box sx={{ px: 3, py:2, bgcolor: "#fafafa", minHeight: "80vh" }}>
            {isMobile ? (
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <NoAvailable style={{ width: "50%", height: "auto" }} />
                    <Typography variant="h5" align="center" sx={{ mt: 4 }} fontSize={20}>
                        El acceso al panel no está disponible en dispositivos móviles
                    </Typography>
                </Box>
            ) : (
                <>
                    <Box sx={{ py: 3 }}>
                        <NavbarAdmin />
                    </Box>
                    <Outlet />
                </>
            )}
        </Box>
    );
}