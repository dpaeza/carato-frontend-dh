import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import Search from '../Components/Search';
import Categories from '../Components/Categories';
import GridCar from '../Components/GridCar';
import { getRandomCars } from '../Services/cars';

export default function Home() {
	const [cars, setCars] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchCars = async () => {
		try {
			const response = await getRandomCars();
			console.log("Respuesta de la API:", response); // Depuración
			setCars(response.data || response); // Ajusta según la estructura de la API
		} catch (error) {
			console.error("Error al obtener los autos:", error);
			setError("Error al cargar los autos. Por favor, intenta de nuevo más tarde.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCars();
	}, []);

	return (
		<Box>
			<Box sx={{ px: { xs: 2, sm: 8, md: 16, lg: 16 }, maxWidth: "1200px", mx: "auto" }}>
				<Box sx={{ pt: 6 }}>
					<Search />
				</Box>
				<Box sx={{ py: 3 }}>
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
			</Box>
		</Box>
	);
}

