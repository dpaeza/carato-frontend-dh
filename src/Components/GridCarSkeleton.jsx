import React from 'react'
import { Box } from "@mui/material";
import CardCarSkeleton from './CardCarSkeleton';
import Grid from '@mui/material/Grid2';

export default function GridCarSkeleton() {
    return (
        <Box sx={{ width: "100%", textAlign: "center", bgcolor: "#fafafa" }}>
            <Grid container spacing={2} sx={{ mb: 3 }}>
                {Array.from({ length: 6 }).map((_, index) => (
                    <Grid
                        key={index}
                        size={{ xs: 12, sm: 12, md: 6, lg: 6 }}
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        <CardCarSkeleton />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
