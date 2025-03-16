import React, { useState, useEffect } from 'react'
import { Dialog, DialogTitle, IconButton, DialogContent, Box, Button, Typography, TextField, InputAdornment, Snackbar, Alert } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import Grid from "@mui/material/Grid2";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SpeedIcon from "@mui/icons-material/Speed";
import DoorFrontIcon from "../assets/icons/door.svg?react";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import People from "../assets/icons/people.svg?react";
import AcUnit from "../assets/icons/acUnit.svg?react";
import Settings from "../assets/icons/manual.svg?react";
import DateRangeIcon from '@mui/icons-material/DateRange';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import XIcon from '@mui/icons-material/X';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';

export default function ShareModel({ open, onClose, vehicle }) {

    const [shareMessage, setShareMessage] = useState("🚗 ¡Mirá este auto en Carato! 🔥 Ideal para tu próximo viaje. #Carato #AlquilerDeAutos");
    const [isEditing, setIsEditing] = useState(false);
    const [url, setUrl] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const socialLinks = [
        {
            name: 'Correo electrónico',
            icon: <EmailIcon />,
            url: `mailto:?subject=Asunto&body=${encodeURIComponent(shareMessage + " " + url)}`,
        },
        {
            name: 'Facebook',
            icon: <FacebookIcon />,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            action: () => {
                if (navigator.share) {
                    navigator.share({
                        title: "Mira esto",
                        text: shareMessage,
                        url: url
                    }).catch(console.error);
                } else {
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                }
            }
        },
        {
            name: 'WhatsApp',
            icon: <WhatsAppIcon />,
            url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage + " " + url)}`,
        },
        {
            name: 'X (Twitter)',
            icon: <XIcon />,
            url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(url)}`,
        }
    ];

    const handleCopyClick = () => {
        navigator.clipboard.writeText(`${shareMessage} ${url}`)
            .then(() => {
                setSnackbarMessage("¡Enlace copiado!");
                setSnackbarSeverity("success");
            })
            .catch(() => {
                setSnackbarMessage("Error al copiar el enlace");
                setSnackbarSeverity("error");
            })
            .finally(() => {
                setSnackbarOpen(true);
            });
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            setUrl(window.location.href);
        }
    }, []);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Typography
                    variant="h5"
                    fontFamily={"var(--openSans)"}
                    fontWeight={700}
                    color="var(--darkBlue)"
                >
                    Comparte este vehículo con tus amigos
                </Typography>
                <IconButton
                    onClick={onClose}
                    aria-label="close"
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                width: "100%",
                                height: "180px",
                                backgroundImage: `url(${vehicle?.images[0]?.url})`, // Usamos image.url
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
                                borderRadius: "10px",
                            }}
                        >
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            gap: "10px"
                        }}
                    >
                        <Typography
                            variant="h5"
                            gutterBottom
                            fontSize={20}
                            fontFamily={"var(--openSans)"}
                            fontWeight={700}
                            color="var(--darkBlue)"
                        >
                            {vehicle.name}
                        </Typography>
                        <Grid container spacing={2}
                            sx={{
                                fontSize: { xs: 13, sm: 14 },
                                fontFamily: "var(--latto)",
                            }}
                        >
                            <Grid size={{ xs: 6, sm: 4 }} display="flex" alignItems="center" gap="5px"><People />{vehicle.capacity}</Grid>
                            {vehicle.transmission === "Manual" ? (
                                <Grid size={{ xs: 6, sm: 4 }} display="flex" alignItems="center" gap="5px"><Settings /> Manual</Grid>
                            ) : (
                                <Grid size={{ xs: 6, sm: 4 }} display="flex" alignItems="center" gap="5px"><SettingsSuggestIcon /> Automático</Grid>
                            )}
                            {vehicle.hasAirCondition && (
                                <Grid size={{ xs: 6, sm: 4 }} display="flex" alignItems="center" gap="5px"><AcUnit /> AC</Grid>
                            )}
                            <Grid size={{ xs: 6, sm: 4 }} display="flex" alignItems="center" gap="5px"><DoorFrontIcon />{vehicle.doors} Puertas</Grid>
                            <Grid size={{ xs: 6, sm: 4 }} display="flex" alignItems="center" gap="5px"><LocalGasStationIcon />{vehicle.gasoline}</Grid>
                            <Grid size={{ xs: 6, sm: 4 }} display="flex" alignItems="center" gap="5px"><SpeedIcon />{vehicle.horsePower} HP</Grid>
                            <Grid size={{ xs: 6, sm: 4 }} display="flex" alignItems="center" gap="5px"><DirectionsCarIcon />{vehicle.brakeSystem}</Grid>
                            <Grid size={{ xs: 6, sm: 4 }} display="flex" alignItems="center" gap="5px"><AddRoadIcon />{vehicle.mileage} km</Grid>
                            <Grid size={{ xs: 6, sm: 4 }} display="flex" alignItems="center" gap="5px"><DateRangeIcon />Modelo {vehicle.year}</Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    my={2}
                    width="100%"
                >
                    <Typography
                        variant="h6"
                        fontFamily={"var(--openSans)"}
                        fontWeight={700}
                        color="var(--darkBlue)"
                        fontSize={16}
                        mb={1}
                    >
                        Descripción
                    </Typography>
                    <Box>
                        <TextField
                            id="mensaje"
                            size="small"
                            disabled={!isEditing}
                            value={shareMessage}
                            onChange={(e) => setShareMessage(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setIsEditing(true)}>
                                            <EditIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            fullWidth
                        />
                    </Box>


                </Box>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    my={2}
                    width="100%"
                >
                    <TextField
                        id="mensaje"
                        size="small"
                        disabled
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                    style={{
                                        backgroundColor: '#3083FF',
                                        color: 'white',
                                        borderRadius: '5px',
                                        padding: '5px',
                                    }}

                                >
                                    <IconButton
                                        onClick={handleCopyClick}
                                        style={{ padding: 0 }}
                                    >
                                        <ContentCopyIcon
                                            fontSize='small'
                                            style={{ color: 'white', padding: 0 }}
                                        />
                                    </IconButton>
                                    <Typography
                                        variant="body2"
                                        onClick={handleCopyClick}
                                        style={{ cursor: 'pointer', marginLeft: 1 }}
                                    >
                                        Copiar enlace
                                    </Typography>
                                </InputAdornment>
                            ),
                        }}
                        fullWidth
                    />
                </Box>
                <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                >
                    <Grid
                        size={{ xs: 12, md: 8 }}
                        display="flex" justifyContent="center"
                    >

                        <Grid container spacing={2} justifyContent="center">
                            {socialLinks.map((link, index) => (
                                <Grid size={{ xs: 12, md: 6 }} key={index}>
                                    <Button
                                        variant="outlined"
                                        startIcon={link.icon}
                                        fullWidth
                                        onClick={() => link.action ? link.action() : window.open(link.url, '_blank')}
                                        sx={{
                                            textTransform: "none",
                                            color: "#0A0A25",
                                            backgroundColor: "transparent",
                                            boxShadow: "none",
                                            padding: "5px",
                                            minHeight: "30px",
                                            minWidth: "auto",
                                            margin: "0px",
                                            border: "1px solid #0A0A25",
                                            gap: "5px",
                                            transition: "all 0.4s",
                                            fontSize: 15,
                                            fontFamily: "var(--latto)",
                                            fontWeight: 800,
                                            '&:hover': { backgroundColor: "#F5F5F5" }
                                        }}
                                    >
                                        {link.name}
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>

                    </Grid>
                </Grid>
            </DialogContent>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarSeverity}
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Dialog>
    )
}
