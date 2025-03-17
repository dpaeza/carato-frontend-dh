import React, { useState, useEffect, useRef, useCallback } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
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
import { loginUser } from '../Services/auth';
import { useAuth } from '../Context/auth.context';

const Login = React.memo(({ open, onClose }) => {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const { login } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const MySwal = withReactContent(Swal);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleClickShowPassword = useCallback(() => setShowPassword((show) => !show), []);

    const validateField = useCallback((field, value) => {
        if (!value.trim()) {
            return "Este campo es requerido";
        }
        if (field === "email") {
            const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            if (!regex.test(value)) {
                return "Formato de correo no válido. Ejemplo: usuario@dominio.com";
            }
        }
        if (field === "password") {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!regex.test(value)) {
                return "Debe contener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial.";
            }
        }
        return "";
    }, []);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: validateField(name, value)
        }));
    }, [validateField]);

    const handleBlur = useCallback((e) => {
        const { name } = e.target;
        setErrors((prev) => ({
            ...prev,
            [name]: validateField(name, userData[name])
        }));
    }, [userData, validateField]);

    const resetForm = useCallback(() => {
        setUserData({
            email: '',
            password: ''
        });
        setErrors({
            email: '',
            password: ''
        });
    }, []);

    const handleSubmit = useCallback(async () => {
        try {
            const response = await loginUser(userData);
            login(response);
            resetForm();
            onClose();
            // MySwal.fire({
            //     icon: 'success',
            //     title: '¡Bienvenido!',
            //     showConfirmButton: false,
            //     timer: 1500
            // }).then(() => window.location.reload());
        } catch (error) {
            const statusCode = error.status;
            const message = statusCode === 401
                ? "El correo electrónico o la contraseña son incorrectos. Por favor, inténtelo nuevamente."
                : error.response.data.message;

            console.error(error);
            resetForm();
            onClose();
            MySwal.fire({
                icon: 'error',
                confirmButtonColor : '#3083FF',
                text: message
            });
        }
    }, [userData, onClose, resetForm]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }, [handleSubmit]);

    useEffect(() => {
        if (open && emailRef.current) {
            emailRef.current.focus();
        }
    }, [open]);

    useEffect(() => {
        if (!open) {
            resetForm();
        }
    }, [open, resetForm]);

    const getBorderColor = (field) => {
        if (errors[field]) return "red";
        if (userData[field] && !errors[field]) return "green";
        return "";
    }

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="xs"
            PaperProps={{
                onClick: (e) => e.stopPropagation(),
            }}
        >
            <DialogTitle>
                Iniciar sesión
                <IconButton
                    onClick={onClose}
                    aria-label="close"
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <TextField
                    inputRef={emailRef}
                    name="email"
                    label="Correo electrónico"
                    type="email"
                    size='small'
                    autoComplete='off'
                    value={userData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    error={!!errors.email}
                    helperText={errors.email}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                        style: { borderColor: getBorderColor("email") }
                    }}
                />
                <TextField
                    inputRef={passwordRef}
                    name="password"
                    label="Contraseña"
                    size='small'
                    autoComplete='off'
                    type={showPassword ? "text" : "password"}
                    value={userData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    error={!!errors.password}
                    helperText={errors.password}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                        style: { borderColor: getBorderColor("password") },
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    fullWidth
                    disabled={Object.values(errors).some(err => err !== "") || Object.values(userData).some(value => !value.trim())}
                    sx={{ backgroundColor: Object.values(errors).some(err => err !== "") || Object.values(userData).some(value => !value.trim()) ? 'grey' : '#3083FF' , mt: 6 }}
                >
                    Iniciar sesión
                </Button>
            </DialogContent>
        </Dialog>
    )
});

export default Login;
