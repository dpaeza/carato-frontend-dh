import React from 'react'
import { Skeleton, Card, CardContent } from "@mui/material";
import Grid from '@mui/material/Grid2';

export default function CardCarSkeleton() {
    return (
        <Card
            sx={{
                maxWidth: { xs: "100%", md: "100%", lg: 350 },
                width: "100%",
                borderRadius: 4,
                boxShadow: 3,
                overflow: "hidden",
            }}
        >
            <Skeleton variant="rectangular" animation="wave" width={'100%'} height={180} />
            <CardContent>
                <Grid container spacing={2} my={1}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Grid
                            size={6}
                            sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                            <Skeleton variant="circular" animation="wave" width={20} height={20} />
                            <Skeleton variant="text" animation="wave" width={100} height={20} />
                        </Grid>
                    ))}
                </Grid>
                <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mt: 2 }}
                >
                    <Grid size={6}>
                        <Skeleton variant="rectangular" animation="wave" width={'100%'} height={20} />
                    </Grid>
                    <Grid size={6}>
                        <Skeleton variant="rectangular" animation="wave" width={'100%'} height={20} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
