import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import StarIcon from "@mui/icons-material/Star";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');

function obtenerProximoViernes() {
    const today = dayjs();
    const dayOfWeek = today.day();
    const daysUntilFriday = dayOfWeek === 5 ? 7 : (5 - dayOfWeek + (dayOfWeek > 5 ? 7 : 0));
    return today.add(daysUntilFriday, 'day').format('D [de] MMMM');
}

export default function ListDescription() {
    return (
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
    )
}
