import React from 'react';
import { Box, Typography, Rating, Divider } from "@mui/material";
import Hoja from "../assets/Hoja.svg?react";
import HojaRight from "../assets/HojaRight.svg?react";

export default function CarRating({ rating, noReviews }) {
    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap={"wrap"}
            sx={{
                borderRadius: 2,
                border: "1px solid rgba(0, 0, 0, 0.12)",
                padding: 2,
                mb: 2,
            }}
            gap={2}
        >   
            <Box
                display="flex"
                alignItems="center"
                gap={1}
            >
                <Box>
                    <Hoja />
                </Box>
                <Typography
                    variant="body2"
                    fontFamily="var(--loto)"
                    fontWeight={600}
                    color="var(--darkBlue)"
                    fontSize={15}
                    textAlign="center"
                    sx={{ flex: 1 }} // Permite que el texto se centre bien
                >
                    Opiniones verificadas de nuestros usuarios
                </Typography>
                <Box>
                    <HojaRight />
                </Box>
            </Box>
            <Box
            >
                <Typography
                    variant="body2"
                    fontFamily="var(--loto)"
                    fontWeight={600}
                    color="var(--darkBlue)"
                    fontSize={20}
                    textAlign={"center"}
                    sx={{ ml: 1 }}
                >
                    {rating.toFixed(1)}
                </Typography>
                <Rating
                    value={rating}
                    precision={0.5}
                    readOnly
                    size='small'
                />
            </Box>
            <Box>
                <Typography
                    variant="body2"
                    fontFamily="var(--loto)"
                    fontWeight={600}
                    color="var(--darkBlue)"
                    fontSize={20}
                    textAlign={"center"}
                >
                    {noReviews}
                </Typography>
                <Typography
                    variant="body2"
                    fontFamily="var(--loto)"
                    fontWeight={500}
                    color="var(--darkBlue)"
                    fontSize={14}
                    sx={{ textDecoration: "underline" }}
                >
                    {noReviews === 1 ? " Reseña" : " Reseñas"}
                </Typography>
            </Box>

        </Box>

    )
}
