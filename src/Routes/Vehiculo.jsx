import React from 'react'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DetailHeader from '../Components/DetailHeader';
import GridImage from '../Components/GridImage';
import Specifications from '../Components/Specifications';
import { Card, CardMedia, Typography, Button, Box, Divider, FormControl, InputLabel } from "@mui/material";

export default function Vehiculo() {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState({
        model: "Toyota de prueba",
        category: "Hibrida",
        images : [
            "https://http2.mlstatic.com/D_NQ_NP_865812-MCO81366613733_122024-O.webp",
            "https://http2.mlstatic.com/D_NQ_NP_865812-MCO81366613733_122024-O.webp",
            "https://http2.mlstatic.com/D_NQ_NP_865812-MCO81366613733_122024-O.webp",
            "https://http2.mlstatic.com/D_NQ_NP_865812-MCO81366613733_122024-O.webp",
            "https://http2.mlstatic.com/D_NQ_NP_865812-MCO81366613733_122024-O.webp",
        ],
        description: "Compacto versátil de 5 puertas, ideal para ciudad y viajes. Perfecto para conductores que buscan un vehículo confortable, económico y fácil de manejar tanto en ciudad como en carretera.",
        mileage: 30000,
        year: 2024,
        hasAirCondition: true,
        horsePower: 150,
        capacity: 5,
        doors: 4,
        brakeSystem: "ABS",
        gasoline: "Gasolina",
        transmission: "Manual"
    });

    useEffect(() => {
        console.log("useEffect");
        console.log(id);
    }, [id]);


    return (
        <Box sx={{ backgroundColor: "var(--lightWhite)", px: 3, pt:5, pb:2 }}>
            <DetailHeader model={vehicle.model} category={vehicle.category} />
            <GridImage images={vehicle.images} />
            <Specifications vehicle={vehicle} />
        </Box>
    )
}
