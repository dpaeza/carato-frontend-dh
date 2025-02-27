import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';

export default function Register({ open, onClose }) {
    const [registerData, setRegisterData] = React.useState({
        name: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = React.useState({
        name: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [touched, setTouched] = React.useState({
        name: false,
        lastName: false,
        email: false,
        password: false
    });

    const validateField = (field, value) => {
        if (!value.trim()) {
            return "Este campo es requerido";
        }
        if (field === "name" || field === "lastName") {
            if (!/^[A-Za-z]+$/.test(value)) {
                return "Solo se permiten letras y una palabra";
            }
        }
        if (field === "email") {
            const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            if (!regex.test(value)) {
                return "Email no es válido";
            }
        }
        if (field === "password") {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!regex.test(value)) {
                return "Debe tener 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial";
            }
        }
        return "";
    };

    const isFormValid = () => {
        return (
            Object.values(registerData).every(value => value.trim()) &&
            Object.values(errors).every(err => err === "")
        );
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Cree su cuenta</DialogTitle>
            <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                <CloseIcon />
            </IconButton>
            <DialogContent 
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    padding: 2
                }}
            >
                {['name', 'lastName', 'email', 'password'].map((field) => (
                    <TextField
                        key={field}
                        label={field === 'name' ? 'Nombre' : field === 'lastName' ? 'Apellido' : field === 'email' ? 'Correo electrónico' : 'Contraseña'}
                        fullWidth
                        name={field}
                        type={field === 'password' ? 'password' : 'text'}
                        value={registerData[field]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(errors[field])}
                        helperText={errors[field] || (field === 'password' ? "Debe tener 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial" : "")}
                        sx={{
                            borderColor: errors[field] ? 'red' : (registerData[field] ? 'green' : ''),
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: errors[field] ? 'red' : (registerData[field] ? 'green' : '')
                                }
                            }
                        }}
                    />
                ))}
                <Button
                    variant="contained"
                    fullWidth
                    onClick={() => console.log(registerData)}
                    disabled={!isFormValid()}
                    sx={{ backgroundColor: isFormValid() ? 'blue' : 'grey', mt: 4 }}
                >
                    Registrarse
                </Button>
            </DialogContent>
        </Dialog>
    );
}
