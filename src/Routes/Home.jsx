import React, { useState, useMemo } from 'react';
import { Box, Typography, Alert } from "@mui/material";
import Search from '../Components/Search';
import Categories from '../Components/Categories';
import GridCar from '../Components/GridCar';
import GridCarSkeleton from '../Components/GridCarSkeleton';
import { getCars, getAllCarsCount } from '../Services/cars';
import Pagination from '@mui/material/Pagination';
import { useQuery } from '@tanstack/react-query';
import { shuffleArray, sortNumbers } from '../Utils/numbers';
import { useSearchParams } from 'react-router-dom';
import queryString from 'query-string';

export default function Home() {
	const [searchParams, setSearchParams] = useSearchParams();
	const params = queryString.parse(searchParams.toString(), {
		types: {
			page: "number",
			categoriesId: "string"
		}
	});

	const validCategoriesId = /^\d*(,\d+)*$/.test(params.categoriesId);
	const randomSeed = useMemo(() => Math.random(), []);

	const page = params.page ?? 1;
	const categoriesId = validCategoriesId ? params.categoriesId : "";

	const categoriesIdArray = (categoriesId !== "")
		? categoriesId.split(",").map(id => isNaN(id) ? null : parseInt(id)).filter(id => id !== null)
		: [];

	const [error, setError] = useState(null);
	const { data, isLoading } = useQuery({
		queryKey: ["cars", page, categoriesId],
		queryFn: () => getCars({ page, categoriesId }),
		select: (data) => ({ ...data, data: shuffleArray(data.data, randomSeed) }),
		refetchOnWindowFocus: false,
		staleTime: 60000,
		throwOnError: (error) => {
			console.error("Error al obtener los autos:", error);
			setError("Error al cargar los autos. Por favor, intenta de nuevo más tarde.");
		}
	});

	const { data: totalCars, isLoading: isTotalLoading } = useQuery({
		queryKey: ["count"],
		queryFn: () => getAllCarsCount(),
		select: (data) => data.count
	});

	const handleToggleCategoryById = (id) => {
		const updatedCategories = categoriesIdArray.includes(id)
			? categoriesIdArray.filter(categoryId => categoryId !== id)
			: sortNumbers([...categoriesIdArray, id]);

		setSearchParams(queryString.stringify({
			...params,
			page: undefined,
			categoriesId: updatedCategories.length > 0 ? updatedCategories.join(",") : undefined,
		}));
	}

	const handlePageChange = (event, value) => {
		setSearchParams(queryString.stringify({
			...params,
			page: (value !== 1) ? value : undefined,
		}));
	};

	return (
		<Box>
			<Box sx={{ backgroundColor: "var(--pureWhite)" }}>
				<Box sx={{ pt: 6, px: { xs: 2, sm: 8, md: 16, lg: 16 }, maxWidth: "1200px", mx: "auto" }}>
					<Search />
				</Box>
				<Box sx={{ py: 3, px: { xs: 2, sm: 8, md: 16, lg: 16 }, maxWidth: "1200px", mx: "auto" }}>
					<Categories 
						selectedCategoriesId={categoriesIdArray} 
						toggleCategoryById={handleToggleCategoryById}
						filteredProducts={data?.data?.length || 0}
						totalProducts={totalCars || 0} 
					/>
				</Box>
			</Box>
			<Box sx={{ bgcolor: "#fafafa", pt: 6 }}>
				<Box sx={{ px: { xs: 2, sm: 8, md: 16, lg: 16 }, maxWidth: "1200px", mx: "auto" }}>
					<Typography
						variant='h2'
						fontFamily="var(--openSans)"
						fontSize={22}
						marginBottom={6}
						fontWeight={700}
						textAlign={"center"}
						textTransform={"uppercase"}
					>
						Recomendaciones
					</Typography>
					{isLoading ? (
						<GridCarSkeleton />
					) : error ? (
						<Alert severity="error">{error}</Alert>
					) : (data.data.length > 0) ? (
						<GridCar cars={data.data} />
					) : (
						<Typography textAlign="center">No se encontraron autos.</Typography>
					)}
				</Box>
				{
					!isLoading && data?.data?.length>0 && (
						<Pagination
							count={data.totalPages}
							page={data.currentPage}
							onChange={handlePageChange}
							showFirstButton
							showLastButton
							sx={{ display: "flex", justifyContent: "center", pb: 4 }}
						/>
					)
				}
			</Box>
		</Box>
	);
}