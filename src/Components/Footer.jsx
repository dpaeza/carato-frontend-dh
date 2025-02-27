import React from 'react'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import Logo from '../assets/Logo-carato.svg'

export default function Footer() {
    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <AppBar component='footer' position="static" sx={{ backgroundColor: 'var(--darkBlue)' }}>
                    <Toolbar>
                        <img src={Logo} alt="Logo" width={70} height={60} />
                        <Typography variant="body1" color="inherit" sx={{ fontSize: '12px' }}>
                            © 2025 Carato
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}
