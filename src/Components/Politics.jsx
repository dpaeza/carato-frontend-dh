import React from 'react'
import { Box, Typography, Divider } from "@mui/material";
import Grid from '@mui/material/Grid2';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import CachedIcon from '@mui/icons-material/Cached';
import TaxiAlertIcon from '@mui/icons-material/TaxiAlert';

export default function Politics() {
    return (
        <Box>
            <Typography variant="h5" gutterBottom fontSize={20} fontFamily={"var(--openSans)"} fontWeight={600} color= "var(--darkBlue)">
                Políticas y condiciones de uso
            </Typography>
            <Divider sx={{my:2}}/>
            <Grid container spacing={2}>
                <Grid
                    spacing={2}
                    size={{ xs: 12, sm: 6, md: 3, lg: 3 }}
                    sx={{ display: "flex", justifyContent: "center"}}
                >
                    <Grid size={2}>
                        <ContactEmergencyIcon fontSize='medium'/>
                    </Grid>
                    <Grid size={10}>
                        <Typography variant="h5" fontSize={16} fontWeight={600} fontFamily={"var(--lato)"}>
                            Requisitos del conductor
                        </Typography>
                        <Typography variant="body1" fontSize={14} fontFamily={"var(--lato)"}>
                            El arrendatario debe ser mayor de 21 años y poseer licencia de conducir válida.
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    size={{ xs: 12, sm: 6, md: 3, lg: 3 }}
                    sx={{ display: "flex", justifyContent: "center"}}
                >
                    <Grid size={2}>
                        <LocalGasStationIcon fontSize='medium'/>
                    </Grid>
                    <Grid size={10}>
                        <Typography variant="h5" fontSize={16} fontWeight={600} fontFamily={"var(--lato)"}>
                            Combustible y carga
                        </Typography>
                        <Typography variant="body1" fontSize={14} fontFamily={"var(--lato)"}>
                            El vehículo debe devolverse con el mismo nivel de combustible o carga con el que fue entregado.
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    size={{ xs: 12, sm: 6, md: 3, lg: 3 }}
                    sx={{ display: "flex", justifyContent: "center"}}
                >
                    <Grid size={2}>
                        <CachedIcon fontSize='medium'/>
                    </Grid>
                    <Grid size={10}>
                        <Typography variant="h5" fontSize={16} fontWeight={600} fontFamily={"var(--lato)"}>
                            Devolución y penalidades
                        </Typography>
                        <Typography variant="body1" fontSize={14} fontFamily={"var(--lato)"}>
                            Retrasos en la devolución pueden generar costos adicionales.
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    size={{ xs: 12, sm: 6, md: 3, lg: 3 }}
                    sx={{ display: "flex", justifyContent: "center"}}
                >
                    <Grid size={2}>
                        <TaxiAlertIcon fontSize='medium'/>
                    </Grid>
                    <Grid size={10}>
                        <Typography variant="h5" fontSize={16} fontWeight={600} fontFamily={"var(--lato)"}>
                            Devolución y penalidades
                        </Typography>
                        <Typography variant="body1" fontSize={14} fontFamily={"var(--lato)"}>
                            Retrasos en la devolución pueden generar costos adicionales.
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}
