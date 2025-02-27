import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

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
        const { name } = e.target;
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
                    gap: 3,
                }}
            >
                {['name', 'lastName', 'email'].map((field) => (
                    <TextField
                        key={field}
                        label={field === 'name' ? 'Nombre' : field === 'lastName' ? 'Apellido' : 'Correo electrónico'}
                        fullWidth
                        name={field}
                        type='text'
                        value={registerData[field]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(errors[field])}
                        helperText={errors[field]}
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
                <TextField
                    label='Contraseña'
                    fullWidth
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    value={registerData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.password)}
                    helperText='Debe tener 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton onClick={handleClickShowPassword}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    sx={{
                        borderColor: errors.password ? 'red' : (registerData.password ? 'green' : ''),
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: errors.password ? 'red' : (registerData.password ? 'green' : '')
                            }
                        }
                    }}
                />
                <Button
                    variant='contained'
                    fullWidth
                    onClick={() => console.log(registerData)}
                    disabled={!isFormValid()}
                    sx={{ backgroundColor: isFormValid() ? 'blue' : 'grey' }}
                >
                    Registrarse
                </Button>
            </DialogContent>
        </Dialog>
    );
}

