import React from 'react'
import { Card, CardMedia, CardContent, Typography, Box, Button } from "@mui/material";
import Grid from '@mui/material/Grid2';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCarByIdOrName } from '../Services/cars';
import { useQuery } from '@tanstack/react-query';

export default function Galery() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {data, isLoading} = useQuery({
        queryKey: ["car", id],
        queryFn: () => getCarByIdOrName(id),
        refetchOnWindowFocus: false,
		staleTime: Infinity,
        throwOnError: (error) => {
            console.error("Error al obtener el auto:", error);
        }
    });

    const handleNavigate = () => {
        navigate(`/vehiculo/${id}`);
    }

    return (
        <Box padding={3} sx={{maxWidth: "1200px", margin: "auto"}}>
            <Grid>
                <Button
                    startIcon={<KeyboardArrowLeftIcon />}
                    sx={{
                    color: "var(--lightGrey)",
                    fontSize: 18,
                    textTransform: "none",
                    marginBottom: 4,
                    backgroundColor: "transparent",
                    "&:hover": {
                        color: "var(--mediumGrey)"
                    },
                    fontFamily:"var(--openSans)",
                    fontWeight:500
                    }}
                    onClick={handleNavigate}
                >
                    Volver
                </Button>
            </Grid>
            <Grid container spacing={2} px={{xs:0, sm:2}}>
                {!isLoading && data.images.map((image, index) => (
                    <Grid size={{xs:12, sm:6}} key={index}>
                        <Card sx={{border:"none", boxShadow:"none"}}>
                            <CardMedia component="img" height="360" image={image.url} alt={image.title} sx={{borderRadius:2}}/>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
        
    );
}
