import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DetailHeader from '../Components/DetailHeader';
import GridImage from '../Components/GridImage';
import Specifications from '../Components/Specifications';
import { Card, CardMedia, Typography, Button, Box, Divider, FormControl, InputLabel } from "@mui/material";
import { getCarByIdOrName } from '../Services/cars';
import { useQuery } from '@tanstack/react-query';

export default function Vehiculo() {
    const { id } = useParams();

    const {data: vehicle} = useQuery({
        queryKey: ["car", id],
        queryFn: () => getCarByIdOrName(id),
        throwOnError: (error) => {
            console.error("Error al obtener el auto:", error);
        },
        initialData: {
            name: "",
            category: "",
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
        },
    });

    return (
        <Box sx={{ backgroundColor: "var(--lightWhite)", px: 3, pt:5, pb:2 }}>
            <DetailHeader model={vehicle.name} category={vehicle.category} />
            <Box sx={{ height: {xs:"70vh", sx:"50vh"}}}>
                <GridImage images={vehicle.images} />
            </Box>
            <Specifications vehicle={vehicle} />
        </Box>
    )
}
