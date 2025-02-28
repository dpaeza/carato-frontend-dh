import React, { useState } from 'react'
import { Typography, TableContainer, TableHead, TableRow, TableBody, TableCell, Button, Switch, Pagination, Paper, Table } from '@mui/material';

const headers = [
    "ID",
    "Nombre",
    "Rol",
    "Acciones"
];

export default function Usuarios() {

    const [users, setUsers] = useState([
        {
            id: 1,
            name: "Juan",
            role: "Admin"
        },
        {
            id: 2,
            name: "Pedro",
            role: "User"
        },
        {
            id: 3,
            name: "María",
            role: "Admin"
        }
    ]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

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
                        {users.map(({ id, name, role }) => (
                            <TableRow key={id}>
                                <TableCell align="center">{id}</TableCell>
                                <TableCell align="center">{name}</TableCell>
                                <TableCell align="center">{role}</TableCell>
                                <TableCell align="center">
                                    <Switch
                                        checked={role === "Admin"}
                                        onChange={() => {
                                            // updateRole(id);
                                        }}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
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
        </div>
    )
}
