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
import DeatilModal from '../Components/DeatilModal';

const headers = [
    "ID",
    "Nombre",
    "Acciones"
];

export default function Vehiculos() {
    const [vehiculos, setVehiculos] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [openDetail, setOpenDetail] = useState({
        isOpen: false,
        mode: "view",
        vehicleData: null
    });

    const MySwal = withReactContent(Swal);

    const handleOpenModal = (mode, vehicleData) => {
        setOpenDetail({
            isOpen: true,
            mode: mode,
            vehicleData: vehicleData
        });
    };

    const handleCloseModal = () => {
        setOpenDetail({
            isOpen: false,
            mode: "view",
            vehicleData: null
        });
    };

    const handleDelete = (id, name) => {
        MySwal.fire({
            text: `¿Estás seguro de eliminar el vehículo ${name}?`,
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Eliminar",
            confirmButtonText: "Cancelar",
            cancelButtonColor: "#FF4F4F",
            confirmButtonColor: "#B3B3BB",
        }).then((result) => {
            if (result.isDismissed) {
                deleteVehiculo(id);
            }
        });
    };

    const getVehiculos = async () => {
        try {
            const response = await getCars({page});
            setVehiculos(response.data);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error("Error al obtener los vehículos:", error);
        }
    };

    const deleteVehiculo = async (id) => {
        try {
            await deleteCar(id);
            MySwal.fire({
                text: "Vehículo eliminado correctamente.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
            });
            getVehiculos();
        } catch (error) {
            console.error("Error al eliminar el vehículo:", error);
            MySwal.fire({
                text: "Error al eliminar el vehículo.",
                icon: "error",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#3083FF",
            });
        }
    };

    useEffect(() => {
        getVehiculos();
    }, [page]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <div>
            <Typography variant='h1' color='var(--darkBlue)' fontFamily="var(--openSans)" fontWeight={700} fontSize={25}>
                Vehículos
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
                        {vehiculos.map((vehiculo) => (
                            <TableRow key={vehiculo.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="center">{vehiculo.id}</TableCell>
                                <TableCell align="center">{vehiculo.name}</TableCell>
                                <TableCell align="center" sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                                    <Button
                                        sx={{ color: "var(--darkBlue)", p: 0, minWidth: "auto" }}
                                        onClick={() => handleOpenModal("view", vehiculo)}
                                    >
                                        <VisibilityIcon />
                                    </Button>
                                    <Button
                                        sx={{ color: "var(--darkBlue)", p: 0, minWidth: "auto" }}
                                        onClick={() => handleOpenModal("edit", vehiculo)}
                                    >
                                        <ModeEditIcon />
                                    </Button>
                                    <Button sx={{ color: "var(--red)", p: 0, minWidth: "auto" }}
                                        onClick={() => handleDelete(vehiculo.id, vehiculo.name)}
                                    >
                                        <DeleteIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                showFirstButton
                showLastButton
                sx={{ display: "flex", justifyContent: "center" }}
            />
            <DeatilModal
                open={openDetail.isOpen}
                onClose={handleCloseModal}
                mode={openDetail.mode}
                vehicleData={openDetail.vehicleData}
                onUpdate={getVehiculos}
            />
        </div>
    );
}