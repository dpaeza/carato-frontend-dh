import React from 'react'
import NavbarAdmin from '../Components/NavbarAdmin'
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/system';

export default function Administracion() {
    return (
        <Box sx={{p:3, bgcolor:"#fafafa", minHeight:"80vh"}}>
            <Box sx={{py:4}}>
                <NavbarAdmin />
            </Box>
            <Outlet />
        </Box>
    )
}
