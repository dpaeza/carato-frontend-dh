import React from 'react'
import {Box, Fab, Tooltip} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function FloatButtonWpp() {
    const phoneNumber = "573022393397"; 
    const message = encodeURIComponent("¡Hola! Estoy interesado en rentar un vehículo con Carato. ¿Me podrían brindar más información?"); 
    const url = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
            }}
        >
            <Tooltip title="Comunícate con Carato." placement="left">
                <Fab 
                    aria-label="whatsapp" 
                    color='secondary'
                    onClick={() => window.open(url, '_blank')}
                >
                    <WhatsAppIcon fontSize='large' sx={{color:'var(--pureWhite)'}}/>
                </Fab>
            </Tooltip>
        </Box>
    )
}
