import React, { useState, useMemo } from 'react';
import { Box, Typography, Alert, Skeleton } from "@mui/material";
import Search from '../Components/Search';
import SearchSkeleton from '../Components/SearchSkeleton';
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
			categoriesId: "string",
			brandId: "number",
			startDate: "string",
			endDate: "string",
		}
	});

	const validCategoriesId = /^\d*(,\d+)*$/.test(params.categoriesId);
	const randomSeed = useMemo(() => Math.random(), []);

	const page = params.page ?? 1;
	const categoriesId = validCategoriesId ? params.categoriesId : "";
	const brandId = params.brandId ?? "";
	const startDate = params.startDate ?? "";
	const endDate = params.endDate ?? "";

	const categoriesIdArray = (categoriesId !== "")
		? categoriesId.split(",").map(id => isNaN(id) ? null : parseInt(id)).filter(id => id !== null)
		: [];

	const [error, setError] = useState(null);
	const { data, isLoading } = useQuery({
		queryKey: ["cars", page, categoriesId, brandId, startDate, endDate],
		queryFn: () => getCars({ page, categoriesId, brandId, startDate, endDate }),
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

	const handleSearch = ({ brand, startDate, endDate }) => {
		setSearchParams(queryString.stringify({
			...params,
			page: undefined,
			brandId: brand ? brand : undefined,
			startDate: startDate ? startDate : undefined,
			endDate: endDate ? endDate : undefined,
		}));
	}

	return (
		<Box>
			<Box sx={{ backgroundColor: "var(--pureWhite)" }}>
				<Box sx={{ pt: 6, px: { xs: 2, sm: 8, md: 16, lg: 16 }, maxWidth: "1200px", mx: "auto" }}>
					{isTotalLoading 
						? <SearchSkeleton />
						:  <Search onSearch={handleSearch}/>
					}
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
					{isLoading ? (
						<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
							<Skeleton variant="text" animation="wave" width={240} height={60} />
							<GridCarSkeleton />
						</Box>
					) : error ? (
						<Alert severity="error">{error}</Alert>
					) : (data.data.length > 0) ? (
						<Box>
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
							<GridCar cars={data.data} />
						</Box>
					) : (
						<Typography textAlign="center">No se encontraron autos.</Typography>
					)}
				</Box>
				{
					!isLoading && data?.data?.length > 0 && (
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