import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Button, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { getCars, deleteCar } from '../Services/cars';
import DeatilModal from '../Components/CategoryModal';
import { getCategories, deleteCategory } from '../Services/categories';

const headers = [
    "ID",
    "Nombre",
    "Acciones"
];

export default function AgregarCategoria() {
    const [categorias, setCategorias] = useState([]);
    const [openDetail, setOpenDetail] = useState({
        isOpen: false,
        categoryData: null
    });
    
    const MySwal = withReactContent(Swal);

    const handleOpenModal = (categoria) => {
        setOpenDetail({
            isOpen: true,
            categoryData: categoria
        });
    };

    const handleCloseModal = () => {
        setOpenDetail({
            isOpen: false,
            categoryData: null
        });
    };

    const handleDelete = (id, name) => {
        MySwal.fire({
            text: `¿Estás seguro de eliminar la categoría ${name}?`,
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Eliminar",
            confirmButtonText: "Cancelar",
            cancelButtonColor: "#FF4F4F",
            confirmButtonColor: "#B3B3BB",
        }).then((result) => {
            if (result.isDismissed) {
                deleteCategoria(id);
            }
        });
    };

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            setCategorias(response);
        } catch (error) {
            console.error("Error al obtener las categorías:", error);
        }
    };

    const deleteCategoria = async (id) => {
        try {
            await deleteCategory(id);
            MySwal.fire({
                text: "Categoría eliminada correctamente",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
            });
            fetchCategories();
        } catch (error) {
            console.error("Error al eliminar la categoría:", error);
            MySwal.fire({
                text: "Error al eliminar la categoría",
                icon: "error",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#3083FF",
            });
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div>
            <Typography variant='h1' color='var(--darkBlue)' fontFamily="var(--openSans)" fontWeight={700} fontSize={25}>
                Categorías
            </Typography>
            <TableContainer component={Paper} sx={{ bgcolor: "(--pureWhite)", my: 3, maxWidth: 750, mx: "auto" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {headers.map((header, index) => (
                                <TableCell key={index} align="center">{header}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categorias.map((categoria) => (
                            <TableRow key={categoria.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="center">{categoria.id}</TableCell>
                                <TableCell align="center">{categoria.name}</TableCell>
                                <TableCell align="center" sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                                    <Button
                                        sx={{ color: "var(--darkBlue)", p: 0, minWidth: "auto" }}
                                        onClick={() => handleOpenModal(categoria)}
                                    >
                                        <VisibilityIcon />
                                    </Button>
                                    <Button
                                        sx={{ color: "var(--darkBlue)", p: 0, minWidth: "auto" }}
                                        onClick={() => handleOpenModal(categoria)}
                                    >
                                        <ModeEditIcon />
                                    </Button>
                                    <Button sx={{ color: "var(--red)", p: 0, minWidth: "auto" }}
                                        onClick={() => handleDelete(categoria.id, categoria.name)}
                                    >
                                        <DeleteIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <DeatilModal 
                open={openDetail.isOpen}
                onClose={handleCloseModal}
                categoria={openDetail.categoryData}
            />
        </div>
    )
}