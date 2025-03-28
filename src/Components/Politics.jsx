import React from 'react';
import { Box, Typography, Divider } from "@mui/material";
import Grid from '@mui/material/Grid2';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import TaxiAlertIcon from '@mui/icons-material/TaxiAlert';
import GppGoodIcon from '@mui/icons-material/GppGood';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LockIcon from '@mui/icons-material/Lock';

const policies = [
    {
        icon: <ContactEmergencyIcon fontSize='medium' />,
        title: "Requisitos del conductor",
        description: "El arrendatario debe ser mayor de 21 años y poseer licencia de conducir válida.",
    },
    {
        icon: <LocalGasStationIcon fontSize='medium' />,
        title: "Combustible y carga",
        description: "El vehículo debe devolverse con el mismo nivel de combustible o carga con el que fue entregado.",
    },
    {
        icon: <TaxiAlertIcon fontSize='medium' />,
        title: "Devolución y penalidades",
        description: "Retrasos en la devolución pueden generar costos adicionales.",
    },
    {
        icon: <GppGoodIcon fontSize='medium' />,
        title: "Seguro y cobertura",
        description: "Todos los vehículos incluyen seguro básico, con opciones de cobertura ampliada.",
    },
    {
        icon: <CalendarMonthIcon fontSize='medium' />,
        title: "Modificaciones y cancelaciones",
        description: "Los cambios o cancelaciones están sujetos a disponibilidad y pueden generar costos adicionales.",
    },
    {
        icon: <LockIcon fontSize='medium' />,
        title: "Privacidad y seguridad",
        description: "Garantizamos la privacidad y seguridad de tu información al utilizar WhatsApp como canal de comunicación.",
    },
];

export default function Politics() {
    return (
        <Box sx={{maxWidth: "1100px", margin: "auto", px: 2}}>
            <Typography
                variant="h5"
                gutterBottom
                fontSize={20}
                fontFamily="var(--openSans)"
                fontWeight={600}
                color="var(--darkBlue)"
            >
                Políticas y condiciones de uso
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
                {policies.map((policy, index) => (
                    <Grid
                        key={index}
                        size={{ xs: 12, sm: 6, md: 4, lg: 4 }}
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        <Grid size={1.7}>
                            {policy.icon}
                        </Grid>
                        <Grid size={10}>
                            <Typography
                                variant="h5"
                                fontSize={16}
                                fontWeight={600}
                                fontFamily="var(--lato)"
                            >
                                {policy.title}
                            </Typography>
                            <Typography
                                variant="body1"
                                fontSize={14}
                                fontFamily="var(--lato)"
                                textAlign={"justify"}
                            >
                                {policy.description}
                            </Typography>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
