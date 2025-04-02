import React from 'react'
import { Box, Typography, Divider, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SpeedIcon from "@mui/icons-material/Speed";
import DoorFrontIcon from "../assets/icons/door.svg?react";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import StarIcon from "@mui/icons-material/Star";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Grid from "@mui/material/Grid2";
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import People from "../assets/icons/people.svg?react";
import AcUnit from "../assets/icons/acUnit.svg?react";
import Settings from "../assets/icons/manual.svg?react";
import DateRangeIcon from '@mui/icons-material/DateRange';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');

function obtenerProximoViernes() {
    const today = dayjs();
    const dayOfWeek = today.day();
    const daysUntilFriday = dayOfWeek === 5 ? 7 : (5 - dayOfWeek + (dayOfWeek > 5 ? 7 : 0));
    return today.add(daysUntilFriday, 'day').format('D [de] MMMM');
}

export default function Specifications({ vehicle }) {
    return (
        <Box>
            <Typography variant="h5" gutterBottom fontSize={20} fontFamily={"var(--openSans)"} fontWeight={500} color="var(--darkBlue)">
                Caracteristicas técnicas
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
                <Grid size={{ xs: 6, sm: 4 }} display="flex" alignItems="center" gap="5px"><People />{vehicle.capacity}</Grid>
                {vehicle.transmission === "Manual" ? (
                    <Grid size={{ xs: 6, sm: 4 }} display="flex" alignItems="center" gap="5px"><Settings /> Manual</Grid>
                ) : (
                    <Grid size={{ xs: 6, sm: 4 }} display="flex" alignItems="center" gap="5px"><SettingsSuggestIcon /> Automático</Grid>
                )}
                {vehicle.hasAirCondition && (
                    <Grid size={{ xs: 6, sm: 4 }} display="flex" alignItems="center" gap="5px"><AcUnit /> Aire acondicionado</Grid>
                )}
                <Grid size={{ xs: 6, sm: 4 }} display="flex" alignItems="center" gap="5px"><DoorFrontIcon />{vehicle.doors} Puertas</Grid>
                <Grid size={{ xs: 6, sm: 4 }} display="flex" alignItems="center" gap="5px"><LocalGasStationIcon />{vehicle.gasoline}</Grid>
                <Grid size={{ xs: 6, sm: 4 }} display="flex" alignItems="center" gap="5px"><SpeedIcon />{vehicle.horsePower} HP</Grid>
                <Grid size={{ xs: 6, sm: 4 }} display="flex" alignItems="center" gap="5px"><DirectionsCarIcon />{vehicle.brakeSystem}</Grid>
                <Grid size={{ xs: 6, sm: 4 }} display="flex" alignItems="center" gap="5px"><AddRoadIcon />{vehicle.mileage} km</Grid>
                <Grid size={{ xs: 6, sm: 4 }} display="flex" alignItems="center" gap="5px"><DateRangeIcon />Modelo {vehicle.year}</Grid>
            </Grid>
            <Typography variant="h5" sx={{ mt: 4 }} fontSize={20} fontFamily={"var(--openSans)"} fontWeight={600} color="var(--darkBlue)">
                Descripción
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" fontFamily={"var(--lato)"} fontWeight={300} fontSize={16} color="var(--darkBlue)">
                {vehicle.description}
            </Typography>

            <List sx={{ mt: 2 }}>
                <ListItem sx={{ py: 1 }}>
                    <ListItemIcon><EmojiEventsIcon fontSize='large' /></ListItemIcon>
                    <ListItemText
                        primary="En los top 10 autos más económicos"
                        secondary="Este auto triunfa en Carato por su rendimiento en ciudad."
                        primaryTypographyProps={{ fontSize: 16, fontWeight: 600, fontFamily: "var(--openSans)" }}
                        secondaryTypographyProps={{ fontSize: 14, fontFamily: "var(--lato)" }}
                    />
                </ListItem>
                <ListItem sx={{ py: 1 }}>
                    <ListItemIcon><StarIcon fontSize='large' /></ListItemIcon>
                    <ListItemText
                        primary="Experiencia de retiro y devolución excepcional"
                        secondary="Nuestros clientes valoraron con 5 estrellas la experiencia."
                        primaryTypographyProps={{ fontSize: 16, fontWeight: 600, fontFamily: "var(--openSans)" }}
                        secondaryTypographyProps={{ fontSize: 14, fontFamily: "var(--lato)" }}
                    />
                </ListItem>
                <ListItem sx={{ py: 1 }}>
                    <ListItemIcon><LockOpenIcon fontSize='large' /></ListItemIcon>
                    <ListItemText
                        primary={`Cancelación gratuita antes del ${obtenerProximoViernes()}`}
                        secondary="Si cambias de opinión, recibirás un reembolso total."
                        primaryTypographyProps={{ fontSize: 16, fontWeight: 600, fontFamily: "var(--openSans)" }}
                        secondaryTypographyProps={{ fontSize: 14, fontFamily: "var(--lato)" }}
                    />
                </ListItem>
            </List>
        </Box>

    );
}
