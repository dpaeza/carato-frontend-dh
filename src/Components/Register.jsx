import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function Register({ open, onClose }) {

    const [registerData, setRegisterData] = React.useState({
        name: '',
        lastName: '',
        email: '',
        password: ''
    });

    return (
        <Dialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <DialogTitle sx={{ m: 0, p: '16px' }} id="customized-dialog-title">
                Cree su cuenta
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: '#9e9e9e'
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers sx={{ padding: '16px' }}>
                <TextField
                    id="outlined-basic" label="Nombre" variant="outlined"
                    fullWidth
                    margin="normal"
                    name="name"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                />
                <TextField
                    id="outlined-basic" label="Apellido" variant="outlined"
                    fullWidth
                    margin="normal"
                    name="lastName"
                    value={registerData.lastName}
                    onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                />

                <TextField
                    id="outlined-basic" label="Correo electrónico" variant="outlined"
                    fullWidth
                    margin="normal"
                    name="email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                />

                <TextField
                    id="outlined-basic" label="Contraseña" variant="outlined"
                    fullWidth
                    margin="normal"
                    name="password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                />
                <Button
                    variant="contained"
                    fullWidth
                    onClick={() => console.log(registerData)}
                    sx={{
                        mt: 4,
                        backgroundColor: "var(--lightBlue)",
                        color: "var(--pureWhite)",
                        '&:hover': {
                            backgroundColor: 'var(--lightBlue)',
                            color: "var(--pureWhite)",
                            opacity: 0.9
                        }
                    }}
                >
                    Registrarse
                </Button>

            </DialogContent>
        </Dialog>
    )
}
