import React, { useCallback, useRef } from 'react';
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

const Register = React.memo(({ open, onClose }) => {
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

    // Referencias para los inputs
    const nameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleClickShowPassword = useCallback(() => setShowPassword((show) => !show), []);

    const validateField = useCallback((field, value) => {
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
    }, []);

    const isFormValid = useCallback(() => {
        return (
            Object.values(registerData).every(value => value.trim()) &&
            Object.values(errors).every(err => err === "")
        );
    }, [registerData, errors]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setRegisterData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }, [validateField]);

    const handleBlur = useCallback((e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    }, []);

    // Enfocar el primer input cuando el modal se abre
    React.useEffect(() => {
        if (open && nameRef.current) {
            nameRef.current.focus();
        }
    }, [open]);

    return (
        <Dialog onClose={onClose} open={open} maxWidth="sm" fullWidth>
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
                <TextField
                    label="Nombre"
                    fullWidth
                    name="name"
                    type="text"
                    value={registerData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                    inputRef={nameRef} // Referencia para el input
                />
                <TextField
                    label="Apellido"
                    fullWidth
                    name="lastName"
                    type="text"
                    value={registerData.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName}
                    inputRef={lastNameRef} // Referencia para el input
                />
                <TextField
                    label="Correo electrónico"
                    fullWidth
                    name="email"
                    type="text"
                    value={registerData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    inputRef={emailRef} // Referencia para el input
                />
                <TextField
                    label="Contraseña"
                    fullWidth
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={registerData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.password)}
                    helperText="Debe tener 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleClickShowPassword}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    inputRef={passwordRef} // Referencia para el input
                />
                <Button
                    variant="contained"
                    fullWidth
                    onClick={() => console.log(registerData)}
                    disabled={!isFormValid()}
                    sx={{ backgroundColor: isFormValid() ? '#1976d2' : 'grey' }}
                >
                    Registrarse
                </Button>
            </DialogContent>
        </Dialog>
    );
});

export default Register;