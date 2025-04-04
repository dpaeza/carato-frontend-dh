import React from 'react';
import { Box, Typography, Divider, Rating } from '@mui/material';
import Grid from '@mui/material/Grid2';

export default function CardReview({reviews}) {
    return (
        <Box sx={{maxWidth: "1100px", mx: "auto"}} my={2}>
            <Typography
                variant="h5"
                gutterBottom
                fontSize={20}
                fontFamily="var(--openSans)"
                fontWeight={600}
                color="var(--darkBlue)"
            >
                Opiniones de nuestros usuarios
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
                {reviews.map((review) => (
                    <Grid 
                        key={review.id} 
                        sx={{ mb: 2 }} 
                        size={{xs:12, sm:6, md:4}}>
                        <Box
                            
                            alignItems="center"
                            gap={2}
                            sx={{ mb: 0.5 }}
                        >
                            <Box
                                display="flex"
                                alignItems="center"
                                gap={2}
                                sx={{ mb: 0.5 }}
                            >
                                <Box>
                                    <img 
                                        src={review.user.avatar} 
                                        alt="profile img"
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: "50%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </Box>
                                <Box>
                                    <Box
                                        display={"flex"}
                                        alignItems={"center"}
                                        gap={2}
                                        sx={{ mb: 0.5 }}
                                    >
                                        <Typography
                                            variant="body1"
                                            fontFamily="var(--loto)"
                                            fontWeight={600}
                                            color="var(--darkBlue)"
                                            fontSize={16}
                                        >
                                            {review.user.name} {review.user.lastname}
                                        </Typography>
                                        <Rating
                                            value={review.rating}
                                            precision={0.5}
                                            readOnly
                                            size="small"
                                        />
                                    </Box>
                                    <Typography
                                        fontSize={13}
                                        variant="body1"
                                        fontFamily="var(--loto)"
                                        fontWeight={500}
                                        color="var(--mediumGrey)"
                                    >
                                        {new Date(review.createTime).toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </Typography>
                                </Box>
                            </Box>
                            <Typography
                                variant="body2"
                                fontFamily="var(--loto)"
                                color="var(--darkBlue)"
                                fontSize={14}
                                marginLeft={"55px"}
                                mt={1}
                            >
                                {review.comment}
                            </Typography>
                        </Box>
                        
                    </Grid>
                ))}
            </Grid>
            
        </Box>
    )
}
