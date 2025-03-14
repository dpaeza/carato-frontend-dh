import React, {useState} from 'react'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Grid from '@mui/material/Grid2';
import CardCar from '../Components/CardCar';
import { useQuery } from '@tanstack/react-query';
import queryString from 'query-string';
import { getFavorites } from '../Services/favorites'
import { Box, Typography, CircularProgress, Alert, Pagination } from '@mui/material';

export default function Favoritos() {

    const [ page, setPage ] = useState(1);
    const [error, setError] = useState(null);

    const { data, isLoading } = useQuery({
        queryKey: ["cars", page],
        queryFn: () => getFavorites({page}),
        select: (data) => ({ ...data, data: data.data }),
        refetchOnWindowFocus: false,
        staleTime: 60000,
        trowOnError: (error) => {
            console.error("Error al obtener favoritos:", error)
            setError("Error al cargar lso favoritos. Por favor, intenta de nuevo más tarde.")
        }
    })

    return (
        <Box 
            sx={{ 
                backgroundColor:"#FAFAF", 
                minHeight: '100vh',
                maxWidth: 1200, 
                p: 6 
            }}
            display={{ xs: 'block', md: 'flex' }}
            flexDirection="column"
        >
            <Typography
                variant="h2"
                fontFamily="var(--openSans)"
                fontSize={24}
                fontWeight={700}
                color='var(--darkBlue)'
            >
                Favoritos
            </Typography>
            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : (data.data && data.data.length > 0) ? (
                <Box>
                    <Grid
                        container
                        spacing={2}
                        sx={{ mt: 4 }}
                    >
                        {data.data.map((car) => (
                            <Grid 
                                key={car.id}
                                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                                sx={{ display: "flex", justifyContent: "center" }}
                            >
                                <CardCar car={car} />
                            </Grid>
                        ))}
                    </Grid>
                    <Pagination 
                        count={data.totalPages}
                        page={data.currentPage}
                        onChange={(event, value) => setPage(value)}
                        showFirstButton
                        showLastButton
                        sx={{ display: "flex", justifyContent: "center", pt: 4 }}
                    />
                </Box>
            ) : (
                <Alert 
                    severity="info"
                    sx={{ 
                        maxWidth: 400,
                        margin: 'auto',
                        mt: 4
                    }}
                >
                    No tienes autos favoritos
                </Alert>
            )}
        </Box>
    )
}
