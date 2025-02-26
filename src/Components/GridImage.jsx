import React from 'react';
import { Box } from "@mui/material";
import { useParams, Link } from 'react-router-dom';
import Grid from "@mui/material/Grid2";

const ImageBox = ({image}) => (
    <Box
        sx={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "13px",
        }}
    />
);

const ColumnGrid = ({images}) => (
    <Grid spacing={1} direction="column" container sx={{ height: "400px" }}>
        {images.map((image, index) => (
            <Grid key={index} flex={1}>
                <ImageBox image={image} />
            </Grid>
        ))}
    </Grid>
);



export default function GridImage({ images }) {
    const { id } = useParams();

    return (
        <Grid container spacing={1} sx={{ height: "400px", position:"relative" }}>
            <Grid size={6}>
                <ImageBox image={images[0]} />
            </Grid>
            <Grid size={3}>
                <ColumnGrid images={images.slice(1, 3)} />
            </Grid>
            <Grid size={3}>
                <ColumnGrid images={images.slice(3, 5)} />
            </Grid>
            <Link 
                to={`/vehiculo/${id}/galeria`}
                style={{ 
                    position: "absolute", 
                    right: 16, 
                    bottom: 16,
                    borderRadius: 5,
                    backgroundColor: "var(--lightBlue)",
                    color: "var(--pureWhite)",
                    border: "1px solid var(--pureWhite)",
                    padding: "6px 22px",
                    textDecoration: "none",
                }}>
                Ver más
            </Link>
        </Grid>
    );
}
