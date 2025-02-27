import React from 'react'
import { Box } from "@mui/material";
import CardCar from './CardCar';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';

export default function GridCar({ cars }) {
    return (
        <Box sx={{ width: "100%", textAlign: "center", bgcolor: "#fafafa" }}>
            <Grid container spacing={2} sx={{ mb: 3 }}>
                {cars.map((car, index) => (
                    <Grid
                        key={index}
                        size={{ xs: 12, sm: 12, md: 6, lg: 6 }}
                        sx={{ display: "flex", justifyContent: "center"}}>
                        <Link to={`/vehiculo/${car.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                            <CardCar car={car} />
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
