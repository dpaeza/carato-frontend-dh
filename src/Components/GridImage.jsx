import React from 'react';
import { Box } from "@mui/material";
import { useParams, Link } from 'react-router-dom';
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import '../Styles/gridImage.css';

// Componente para mostrar una imagen
const ImageBox = ({ image }) => (
    <Box
        sx={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${image.url})`, // Usamos image.url
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "13px",
        }}
    />
);

// Componente para una columna de imágenes
const ColumnGrid = ({ images }) => (
    <Grid spacing={1} direction="column" container sx={{ height: "100%" }}>
        {images.map((image) => (
            <Grid key={image.id} item flex={1}> {/* Usamos image.id como clave */}
                <ImageBox image={image} />
            </Grid>
        ))}
    </Grid>
);

// Componente principal de la grilla de imágenes
export default function GridImage({ images }) {
    const { id } = useParams();

    // Verificamos si images está vacío o no está definido
    if (!images || images.length === 0) {
        return (
            <Box sx={{ height: { xs: "200px", sm: "300px", md: "400px" }, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography>Cargando imágenes...</Typography>
            </Box>
        );
    }

    return (
        <Grid container spacing={1} sx={{ height: "100%", width: "100%" }}>
            <Grid size={{ xs: 12, sm: 12, md: 6 }} sx={{ height: { xs: "25%", sx: "50%", md: "100%" } }}>
                <ImageBox image={images[0]} />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 6 }} container spacing={1} sx={{ height: { xs: "75%", sx: "50%", md: "100%" }, position: "relative" }}>
                <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                    <ColumnGrid images={images.slice(1, 3)} />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                    <ColumnGrid images={images.slice(3, 5)} />
                </Grid>

                <Link
                    to={`/vehiculo/${id}/galeria`}
                    className='seeMoreButton'
                >
                    Ver más
                </Link>
            </Grid>


        </Grid>
    );
}