import React from 'react'
import { Box, Skeleton } from '@mui/material';
import Grid from "@mui/material/Grid2";

export default function GridImageSkeleton() {
    return (
        <Grid container spacing={1} sx={{ height: "100%", width: "100%" }}>
            <Grid size={{ xs: 12, sm: 12, md: 6 }} sx={{ height: { xs: "25%", sx: "50%", md: "100%" } }}>
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "var(--lightGray)",
                        borderRadius: "13px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Skeleton variant="rectangular" animation="wave" width="100%" height="100%" sx={{ borderRadius: "13px" }}
                    />
                </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }} container spacing={1} sx={{ height: { xs: "75%", sx: "50%", md: "100%" }}}>
                <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                    <Grid spacing={1} direction="column" container sx={{ height: "100%" }}>
                        <Grid item flex={1}>
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "var(--lightGray)",
                                    borderRadius: "13px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <Skeleton variant="rectangular" animation="wave" width="100%" height="100%" sx={{ borderRadius: "13px" }}/>
                            </Box>
                        </Grid>
                        <Grid item flex={1}>
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "var(--lightGray)",
                                    borderRadius: "13px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <Skeleton variant="rectangular" animation="wave" width="100%" height="100%" sx={{ borderRadius: "13px" }}/>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                    <Grid spacing={1} direction="column" container sx={{ height: "100%" }}>
                        <Grid item flex={1}>
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "var(--lightGray)",
                                    borderRadius: "13px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <Skeleton variant="rectangular" animation="wave" width="100%" height="100%" sx={{ borderRadius: "13px" }}/>
                            </Box>
                        </Grid>
                        <Grid item flex={1}>
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "var(--lightGray)",
                                    borderRadius: "13px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <Skeleton variant="rectangular" animation="wave" width="100%" height="100%" sx={{ borderRadius: "13px" }}/>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
