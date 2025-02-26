import React from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Button,
} from "@mui/material";
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import Grid from "@mui/material/Grid2";
import PeopleIcon from "../assets/icons/people.svg?react";
import AcUnit from "../assets/icons/acUnit.svg?react";
import Manual from "../assets/icons/manual.svg?react";
import Door from "../assets/icons/door.svg?react";

export default function CardCar({ car }) {
    const {
        name,
        images,
        capacity,
        hasAirCondition,
        transmission,
        doors,
        price,
    } = car;

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
            <CardMedia
                component="img"
                height="180"
                image={images[0]}
                alt={name}
                sx={{
                    objectFit: "cover",
                    backgroundColor: "var(--mediumWhite)",
                }}
            />
            <CardContent>
                <Typography
                    variant="h6"
                    fontFamily="var(--loto)"
                    fontWeight={700}
                    color="var(--darkBlue)"
                    textAlign={"initial"}
                    sx={{ textDecoration: "none" }}
                >
                    {name}
                </Typography>
                <Grid container spacing={2} my={1}>
                    <Grid
                        size={6}
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                        <PeopleIcon />
                        <Typography variant="body2">
                            {capacity} personas
                        </Typography>
                    </Grid>

                    {hasAirCondition && (
                        <Grid
                            size={6}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <AcUnit />
                            <Typography
                                variant="body2"
                                sx={{ textAlign: "initial" }}
                            >
                                Aire acondicionado
                            </Typography>
                        </Grid>
                    )}

                    <Grid
                        size={6}
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                        {transmission === "Manual" ? (
                            <>
                                <Manual />
                                <Typography variant="body2">
                                    {transmission}
                                </Typography>
                            </>
                        ) : (
                            <>
                                <SettingsSuggestIcon fontSize="small" />
                                <Typography variant="body2">
                                    {transmission}
                                </Typography>
                            </>
                        )}
                    </Grid>

                    <Grid
                        size={6}
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                        <Door />
                        <Typography variant="body2">{doors}</Typography>
                    </Grid>
                </Grid>

                <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mt: 2 }}
                >
                    <Grid size={6}>
                        <Typography
                            variant="h5"
                            fontWeight={700}
                            color="var(--darkBlue)"
                            textAlign={"initial"}
                        >
                            ${price}
                            <span
                                style={{ fontSize: "0.8rem", fontWeight: 400 }}
                            >
                                /día
                            </span>
                        </Typography>
                    </Grid>
                    <Grid size={6}>
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: "var(--lightBlue)",
                                color: "white",
                                textTransform: "none",
                                fontWeight: 600,
                                borderRadius: 2,
                                width: "100%",
                            }}
                        >
                            Alquilar
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
