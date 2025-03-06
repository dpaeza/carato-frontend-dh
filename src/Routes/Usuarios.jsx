import React, { useState, useEffect } from 'react'
import { Typography, TableContainer, TableHead, TableRow, TableBody, TableCell, Button, Switch, Pagination, Paper, Table } from '@mui/material';
import { getUsers, updateRole } from "../Services/users";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const headers = [
    "ID",
    "Nombre",
    "Correo",
    "Rol",
    "Acciones"
];

export default function Usuarios() {

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    const MySwal = withReactContent(Swal);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const getUser = async () =>{
        try {
            setLoading(true);
            const users = await getUsers(page);
            setUsers(users.data);
            setTotalPages(users.totalPages);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleRoleChange = async (id, currentRole, name, lastname) => {
        const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";
        try {
            await updateRole(id, newRole);
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === id ? { ...user, role: newRole } : user
                )
            );
            MySwal.fire({
                text: `${name} ${lastname} ${newRole === "ADMIN" ? "es administrador" : "ya no es administrador"}.`,
                icon: "success",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.error("Error al actualizar el rol:", error);
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response.data.message
            });
        }
    };

    const handleSwitch = (id, currentRole, name, lastname) => {
        MySwal.fire({
            text: `¿Estás seguro de querer realizar esta acción ?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Cancelar",
            confirmButtonColor: "#B3B3BB",
            cancelButtonText: "Aceptar",
            cancelButtonColor: "#3083FF",
        }).then((result) => {
            if (result.isDismissed) {
                handleRoleChange(id, currentRole, name, lastname);
            }
        });
    }

    useEffect(() => {
        getUser()
    }, [page]);

    return (
        <div>
            <Typography
                variant='h1' color='var(--darkBlue)' fontFamily="var(--openSans)" fontWeight={700} fontSize={25}
            >
                Usuarios
            </Typography>
            <TableContainer component={Paper} sx={{ bgcolor: "(--pureWhite)", my: 3, maxWidth: 750, mx: "auto" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headers.map((header, index) => (
                                <TableCell key={index} align="center">{header}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={headers.length} align="center">
                                    Cargando usuarios...
                                </TableCell>
                            </TableRow>
                        ) : users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={headers.length} align="center">
                                    No hay usuarios disponibles.
                                </TableCell>
                            </TableRow>
                        ) : (
                            users.map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">{user.id}</TableCell>
                                    <TableCell align="center">{user.name} {user.lastname}</TableCell>
                                    <TableCell align="center">{user.email}</TableCell>
                                    <TableCell align="center">{user.role}</TableCell>
                                    <TableCell align="center">
                                        <Switch
                                            checked={user.role === "ADMIN"}
                                            onChange={() => handleSwitch(user.id, user.role, user.name, user.lastname)}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
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
        </div>
    );
}
