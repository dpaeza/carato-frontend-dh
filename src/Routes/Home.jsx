import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import Search from '../Components/Search';
import Categories from '../Components/Categories';
import GridCar from '../Components/GridCar';
import { getCars } from '../Services/cars';
import Pagination from '@mui/material/Pagination';

export default function Home() {
	const [cars, setCars] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const getVehiculos = async () => {
		try {
			const response = await getCars(page);
			console.log("Respuesta de la API:", response);
			// Mezclar el array de autos de forma aleatoria
            const shuffledCars = response.data.sort(() => Math.random() - 0.5);
			setCars(shuffledCars);
			setTotalPages(response.totalPages);
		} catch (error) {
			console.error("Error al obtener los autos:", error);
			setError("Error al cargar los autos. Por favor, intenta de nuevo más tarde.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getVehiculos();
	}, [page]);

	const handlePageChange = (event, value) => {
        setPage(value);
    };

	return (
		<Box>
			<Box sx={{ backgroundColor:"var(--pureWhite)" }}>
				<Box sx={{ pt: 6, px: { xs: 2, sm: 8, md: 16, lg: 16 }, maxWidth: "1200px", mx: "auto"}}>
					<Search />
				</Box>
				<Box sx={{ py: 3, px: { xs: 2, sm: 8, md: 16, lg: 16 }, maxWidth: "1200px", mx: "auto" }}>
					<Categories />
				</Box>
			</Box>
			<Box sx={{ bgcolor: "#fafafa", pt: 6 }}>
				<Box sx={{ px: { xs: 2, sm: 8, md: 16, lg: 16 }, maxWidth: "1200px", mx: "auto" }}>
					<Typography
						variant='h2'
						fontFamily="var(--openSans)"
						fontSize={24}
						marginBottom={6}
						fontWeight={700}
						textAlign={"center"}
						textTransform={"uppercase"}
					>
						Recomendaciones
					</Typography>
					{loading ? (
						<Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
							<CircularProgress />
						</Box>
					) : error ? (
						<Alert severity="error">{error}</Alert>
					) : (cars || []).length > 0 ? (
						<GridCar cars={cars} />
					) : (
						<Typography textAlign="center">No se encontraron autos.</Typography>
					)}
				</Box>
				<Pagination
					count={totalPages}
					page={page}
					onChange={handlePageChange}
					showFirstButton
					showLastButton
					sx={{ display: "flex", justifyContent: "center", pb: 4 }}
				/>
			</Box>
		</Box>
	);
}