import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { useAuth } from '../Context/authContext';

export default function Cuenta() {
    const { user } = useAuth();

    // Si no hay usuario, mostrar un mensaje o redirigir
    if (!user) {
        return (
            <Box>
                <Typography variant="h3">No estás autenticado</Typography>
                <Typography>Por favor, inicia sesión para ver esta página.</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ backgroundColor:"#FAFAF", minHeight: '100vh', p: 6 }}>
            <Box sx={{ p: 2, maxWidth: 800, margin: 'auto', backgroundColor: 'white', boxShadow: 1, borderRadius: 1 }}>
                <Typography variant="h3" fontFamily="var(--openSans)" fontSize={24} fontWeight={700} color='var(--darkBlue)'>Perfil de usuario</Typography>
                <Typography fontFamily="var(--lato)" fontSize={16} fontWeight={500} color='var(--darkBlue)'>Consulta tus datos personales y tu seguridad</Typography>
                <Box sx={{ display: 'flex', gap: 6, mt: 4 }}>
                    <Box>
                        <Avatar
                            src={user.avatar}
                            alt={user.name}
                            sx={{ width: 100, height: 100 }}
                        />
                    </Box>
                    <Box>
                        <Typography variant='h4' fontFamily="var(--openSans:)" fontSize={22} fontWeight={500} color='var(--darkBlue)'>Información general</Typography>
                        <Typography fontFamily="var(--lato)" fontSize={16} fontWeight={500} color='var(--darkBlue)'>Nombre: {user.name}</Typography>
                        <Typography fontFamily="var(--lato)" fontSize={16} fontWeight={500} color='var(--darkBlue)'>Apellido: {user.lastname}</Typography>
                        <Typography fontFamily="var(--lato)" fontSize={16} fontWeight={500} color='var(--darkBlue)'>Email: {user.email}</Typography>
                    </Box>
                </Box>
            </Box>
            
        </Box>
    );
}