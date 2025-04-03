import React from 'react'
import { Box, Typography, Divider } from '@mui/material';
import SpecificationsReserva from './SpecificationsReserva';

export default function CardCarReserva({car, total}) {
    return (
        <Box
            sx={{
                borderRadius: "10px",
                border: "1px solid var(--lightGrey)",
                padding: "20px",
            }}
        >
            <Box
                display={"flex"}
                gap={1}
                justifyContent={"space-between"}
                alignItems={"center"}
                marginBottom={1}
            >
                <Typography 
                    variant="h5"
                    fontSize={20} 
                    fontFamily={"var(--openSans)"} 
                    fontWeight={600} 
                    color="var(--darkBlue)"
                    textAlign={"center"}
                >
                    {car.name}
                </Typography>
                <Typography 
                    variant="h5"
                    fontSize={14} 
                    fontFamily={"var(--openSans)"} 
                    fontWeight={600} 
                    color="var(--mediumGrey)"
                    textAlign={"center"}
                >
                    {car.category}
                </Typography>
            </Box>
            <Box marginBottom={1}>
                <img 
                    src={car.images[0].url} 
                    alt={car.name} 
                    style={{
                        width: "100%",
                        height: "160px",
                        borderRadius: "10px",
                        marginTop: "10px",
                        objectFit: "cover",
                    }} 
                />
            </Box>
            <SpecificationsReserva vehicle={car} />
            <Divider sx={{ my: 2 }} />
            <Typography
                variant="h5" 
                fontSize={16} 
                fontFamily={"var(--openSans)"} 
                fontWeight={600} 
                color="var(--darkBlue)"
            >
                Información del precio
            </Typography>
            <Box
                display={"flex"}
                gap={1}
                justifyContent={"space-between"}
                alignItems={"center"}
                mt={1}
            >
                <Typography 
                    variant="h5" 
                    fontSize={16} 
                    fontFamily={"var(--openSans)"} 
                    fontWeight={600} 
                    color="var(--mediumGrey)"
                >
                    {`$${car.price.toLocaleString("es-AR")} ARS x día`}
                </Typography>
                <Typography 
                    variant="h5" 
                    fontSize={16} 
                    fontFamily={"var(--openSans)"} 
                    fontWeight={600} 
                    color="var(--mediumGrey)"
                >
                    {`$${total.toLocaleString("es-AR")} ARS`}
                </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box
                display={"flex"}
                gap={1}
                justifyContent={"space-between"}
                alignItems={"center"}
                marginBottom={1}
            >
                <Typography
                    variant="h5" 
                    fontSize={18} 
                    fontFamily={"var(--openSans)"} 
                    fontWeight={600} 
                    color="var(--darkBlue)"
                    textAlign={"center"}
                >
                    Total
                </Typography>
                <Typography 
                    variant="h5" 
                    fontSize={18} 
                    fontFamily={"var(--openSans)"} 
                    fontWeight={600} 
                    color="var(--darkBlue)"
                    textAlign={"center"}
                >
                    {`$${total.toLocaleString("es-AR")} ARS`}
                </Typography>
            </Box>
        </Box>
    )
}
