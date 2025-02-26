import React from 'react'
import { Card, CardMedia, CardContent, Typography, Box, Button } from "@mui/material";
import Grid from '@mui/material/Grid2';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Galery() {
    const { id } = useParams();
    const [images, setImages] = useState([
        {
            src: "https://http2.mlstatic.com/D_NQ_NP_865812-MCO81366613733_122024-O.webp",
            title: "Imagen 1"
        },
        {
            src: "https://http2.mlstatic.com/D_NQ_NP_865812-MCO81366613733_122024-O.webp",
            title: "Imagen 2"
        },
        {
            src: "https://http2.mlstatic.com/D_NQ_NP_865812-MCO81366613733_122024-O.webp",
            title: "Imagen 3"
        },
        {
            src: "https://http2.mlstatic.com/D_NQ_NP_865812-MCO81366613733_122024-O.webp",
            title: "Imagen 4"
        },
        {
            src: "https://http2.mlstatic.com/D_NQ_NP_865812-MCO81366613733_122024-O.webp",
            title: "Imagen 5"
        }
    ]);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("useEffect");
        console.log(id);
    }, [id]);

    const handleNavigate = () => {
        navigate(`/vehiculo/${id}`);
    }

    return (
        <Box padding={3}>
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
            <Grid container spacing={3} px={3}>
                {images.map((image, index) => (
                    <Grid size={6} key={index}>
                        <Card sx={{border:"none", boxShadow:"none"}}>
                            <CardMedia component="img" height="360" image={image.src} alt={image.title} sx={{borderRadius:2}}/>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
        
    );
}
