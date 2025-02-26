import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Button, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';

const headers = [
    "ID",
    "Nombre",
    "Acciones"
];

export default function Vehiculos() {

    const [vehiculos, setVehiculos] = useState([
        { id: 1, name: "Vehiculo 1" },
        { id: 2, name: "Vehiculo 2" },
        { id: 3, name: "Vehiculo 3" },
        { id: 4, name: "Vehiculo 4" },
        { id: 5, name: "Vehiculo 5" },
        { id: 6, name: "Vehiculo 6" },
        { id: 7, name: "Vehiculo 7" },
        { id: 8, name: "Vehiculo 8" },
        { id: 9, name: "Vehiculo 9" },
        { id: 10, name: "Vehiculo 10" }
    ]);


    const MySwal = withReactContent(Swal);

    const handleModal = (text, icon, confirmButtonText, denyButtonText) => {
        MySwal.fire({
            text,
            icon,
            showDenyButton: true,
            confirmButtonText,
            denyButtonText,
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("El usuario no quiere eliminar.");
            } else if (result.isDenied) {
                console.log("El usuario quiere eliminar.");
            }
        });
    }

    useEffect(() => {
        console.log("Hola desde useEffect");
    }, [])

    return (
        <div>
            <Typography variant='h1' color='var(--darkBlue)' fontFamily="var(--openSans)" fontWeight={700} fontSize={25}>
                Vehículos
            </Typography>
            <TableContainer component={Paper} sx={{ bgcolor: "(--pureWhite)", my: 3 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {headers.map((header, index) => (
                                <TableCell key={index} align="center">{header}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vehiculos.map(({ id, name }) => (
                            <TableRow key={id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="center">{id}</TableCell>
                                <TableCell align="center">{name}</TableCell>
                                <TableCell align="center" sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                                    <Button sx={{ color: "var(--darkBlue)", p: 0, minWidth: "auto" }}>
                                        <ModeEditIcon />
                                    </Button>
                                    <Button
                                        sx={{ color: "var(--red)", p: 0, minWidth: "auto" }}
                                        const onClick={() => handleModal(`¿Estás seguro de eliminar el vehículo ${name} ?`, "warning", "Cancelar", "Eliminar")}
                                    >
                                        <DeleteIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination count={10} showFirstButton showLastButton sx={{ display: "flex", justifyContent: "center" }} />
        </div>

    );
}