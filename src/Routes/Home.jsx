import React from 'react'
import { Box, Typography } from "@mui/material"
import Search from '../Components/Search'
import Categories from '../Components/Categories'
import GridCar from '../Components/GridCar'

const cars = [
	{ name: "Toyota Corolla", images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw29trq2IZx5YMWDksdCZBqLJLs3ivenEHGQ&s"], capacity: 5, hasAirCondition: true, transmission: "Manual", doors: 4, price: 100 },
	{ name: "Toyota Corolla", images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw29trq2IZx5YMWDksdCZBqLJLs3ivenEHGQ&s"], capacity: 5, hasAirCondition: true, transmission: "Manual", doors: 4, price: 100 },
	{ name: "Toyota Corolla", images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw29trq2IZx5YMWDksdCZBqLJLs3ivenEHGQ&s"], capacity: 5, hasAirCondition: true, transmission: "Manual", doors: 4, price: 100 },
	{ name: "Toyota Corolla", images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw29trq2IZx5YMWDksdCZBqLJLs3ivenEHGQ&s"], capacity: 5, hasAirCondition: true, transmission: "Manual", doors: 4, price: 100 },
	{ name: "Toyota Corolla", images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw29trq2IZx5YMWDksdCZBqLJLs3ivenEHGQ&s"], capacity: 5, hasAirCondition: true, transmission: "Manual", doors: 4, price: 100 },
	{ name: "Toyota Corolla", images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw29trq2IZx5YMWDksdCZBqLJLs3ivenEHGQ&s"], capacity: 5, hasAirCondition: true, transmission: "Manual", doors: 4, price: 100 },
	{ name: "Toyota Corolla", images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw29trq2IZx5YMWDksdCZBqLJLs3ivenEHGQ&s"], capacity: 5, hasAirCondition: true, transmission: "Manual", doors: 4, price: 100 },
	{ name: "Toyota Corolla", images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw29trq2IZx5YMWDksdCZBqLJLs3ivenEHGQ&s"], capacity: 5, hasAirCondition: true, transmission: "Manual", doors: 4, price: 100 },
	{ name: "Toyota Corolla", images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw29trq2IZx5YMWDksdCZBqLJLs3ivenEHGQ&s"], capacity: 5, hasAirCondition: true, transmission: "Manual", doors: 4, price: 100 },
	{ name: "Toyota Corolla", images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw29trq2IZx5YMWDksdCZBqLJLs3ivenEHGQ&s"], capacity: 5, hasAirCondition: true, transmission: "Manual", doors: 4, price: 100 },
]

export default function Home() {
	return (
		<Box>
			<Box sx={{ px: { xs: 2, sm: 8, md: 16, lg: 16 }, maxWidth: "1200px", mx: "auto" }}>
				<Box sx={{pt: 6}}>
					<Search />
				</Box>
				<Box sx={{py: 3}}>
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
					<GridCar cars={cars} />
				</Box>
			</Box>
		</Box>
	);
}

