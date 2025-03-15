import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DetailHeader from '../Components/DetailHeader';
import GridImage from '../Components/GridImage';
import Specifications from '../Components/Specifications';
import Politics from '../Components/Politics';
import { Card, CardMedia, Typography, Button, Box, Divider, FormControl, InputLabel, Snackbar, Alert } from "@mui/material";
import { getCarByIdOrName } from '../Services/cars';
import { useQuery } from '@tanstack/react-query';
import { addFavorite, removeFavorite } from "../Services/favorites";

export default function Vehiculo() {
    const { id } = useParams();
    const [ favorite, setFavorite ] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const handleFavorite = async () => {
        try {
            if (favorite) {
                await removeFavorite(id)
                setFavorite(false)
                setSnackbarMessage(`${vehicle.name} eliminado de tus favoritos.`);
                setSnackbarSeverity("info");
            } else {
                await addFavorite(id)
                setFavorite(true)
                setSnackbarMessage(`${vehicle.name} agregado a tus favoritos.`);
                setSnackbarSeverity("success");
            }
        } catch (error) {
            const message = favorite ? "eliminar." : "agregar.";
            setSnackbarMessage(`Error al ${message} favorito.`);
            setSnackbarSeverity("error");
        }
        setSnackbarOpen(true);
    }

    const {data: vehicle} = useQuery({
        queryKey: ["car", id],
        queryFn: () => getCarByIdOrName(id),
        refetchOnWindowFocus: false,
        throwOnError: (error) => {
            console.error("Error al obtener el auto:", error);
        },
        initialData: {
            name: "",
            category: "",
            isFavorite: false,
            images : [],
            description: "",
            mileage: 30000,
            year: 2024,
            hasAirCondition: true,
            horsePower: 150,
            capacity: 5,
            doors: 4,
            brakeSystem: "",
            gasoline: "",
            transmission: ""
        }
    });

    useEffect(() => {
        console.log(vehicle);
        if (vehicle) {
            setFavorite(vehicle.isFavorite);
            console.log(vehicle.isFavorite);
        }
    }, [vehicle]);

    return (
        <Box sx={{ backgroundColor: "var(--lightWhite)", px: 3, pt:5, pb:2 }}>
            <DetailHeader 
                model={vehicle.name} 
                category={vehicle.category} 
                isFavorite={favorite}
                onFavorite={handleFavorite}
            />
            <Box sx={{ height: {xs:"70vh", sx:"50vh"},  maxWidth: "1200px", margin: "auto", mt:3}}>
                <GridImage images={vehicle.images} />
            </Box>
            <Specifications vehicle={vehicle} />
            <Politics />
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
        </Box>
    )
}
