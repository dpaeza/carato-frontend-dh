import React, { useCallback, useRef, useState, useEffect } from 'react';
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
import { registerUser } from '../Services/auth';

const Register = React.memo(({ open, onClose }) => {
    const [registerData, setRegisterData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const MySwal = withReactContent(Swal);

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
                return "Solo se permiten letras y sin espacios";
            }
        }
        if (field === "email") {
            const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            if (!regex.test(value)) {
                return "Formato de correo no válido";
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
        setRegisterData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }, [validateField]);

    const handleBlur = useCallback((e) => {
        const { name } = e.target;
        if (!registerData[name]) {
            setErrors(prev => ({ ...prev, [name]: validateField(name, registerData[name]) }));
        }
    }, [registerData, validateField]);

    const resetForm = useCallback(() => {
        setRegisterData({
            name: '',
            lastName: '',
            email: '',
            password: ''
        });
        setErrors({
            name: '',
            lastName: '',
            email: '',
            password: ''
        });
    }, []);

    const handleSubmit = useCallback(async () => {
        try {
            await registerUser(registerData);
            resetForm();
            onClose();
            MySwal.fire({
                title: "¡Registro exitoso!",
                text: "Te hemos enviado un correo de confirmación. Por favor, verifica tu bandeja de entrada.",
                icon: "success",
                confirmButtonText: "Aceptar",
            });
        } catch (error) {
            console.error("Error al registrar el usuario:", error);
            resetForm();
            onClose();
            MySwal.fire({
                title: "Error al registrarse",
                text: error.response?.data?.message || "Ocurrió un error al intentar registrarte. Por favor, intenta de nuevo.",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        }
    }, [registerData, onClose, resetForm]);

    // Enfocar el primer input cuando el modal se abre
    useEffect(() => {
        if (open && nameRef.current) {
            nameRef.current.focus();
        }
    }, [open]);

    useEffect(() => {
        if (!open) {
            resetForm();
        }
    }, [open, resetForm]);

    // Función para obtener el color del borde
    const getBorderColor = (field) => {
        if (errors[field]) return 'red';
        if (registerData[field] && !errors[field]) return 'green';
        return '';
    };

    return (
        <Dialog onClose={onClose} open={open} maxWidth="xs">
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
                    size="small"
                    value={registerData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.name)}
                    success={registerData.name && !errors.name}
                    helperText={errors.name}
                    inputRef={nameRef}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: getBorderColor('name'),
                            },
                            '&:hover fieldset': {
                                borderColor: getBorderColor('name'),
                            },
                            '& fieldset': {
                                borderColor: getBorderColor('name'),
                            },
                        },
                    }}
                />
                <TextField
                    label="Apellido"
                    fullWidth
                    name="lastName"
                    type="text"
                    size="small"
                    value={registerData.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.lastName)}
                    success={registerData.lastName && !errors.lastName}
                    helperText={errors.lastName}
                    inputRef={lastNameRef}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: getBorderColor('lastName'),
                            },
                            '&:hover fieldset': {
                                borderColor: getBorderColor('lastName'),
                            },
                            '& fieldset': {
                                borderColor: getBorderColor('lastName'),
                            },
                        },
                    }}
                />
                <TextField
                    label="Correo electrónico"
                    fullWidth
                    name="email"
                    type="text"
                    size="small"
                    value={registerData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.email)}
                    success={registerData.email && !errors.email}
                    helperText={errors.email}
                    inputRef={emailRef}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: getBorderColor('email'),
                            },
                            '&:hover fieldset': {
                                borderColor: getBorderColor('email'),
                            },
                            '& fieldset': {
                                borderColor: getBorderColor('email'),
                            },
                        },
                    }}
                />
                <TextField
                    label="Contraseña"
                    fullWidth
                    name="password"
                    size="small"
                    type={showPassword ? 'text' : 'password'}
                    value={registerData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.password)}
                    success={registerData.password && !errors.password}
                    helperText="Debe contener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleClickShowPassword}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    inputRef={passwordRef}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: getBorderColor('password'),
                            },
                            '&:hover fieldset': {
                                borderColor: getBorderColor('password'),
                            },
                            '& fieldset': {
                                borderColor: getBorderColor('password'),
                            },
                        },
                    }}
                />
                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleSubmit}
                    disabled={Object.values(errors).some(err => err !== "") || Object.values(registerData).some(value => !value.trim())}
                    sx={{ backgroundColor: Object.values(errors).every(err => err === "") && Object.values(registerData).every(value => value.trim()) ? '#3083FF' : 'grey', mt: 4 }}
                >
                    Registrarse
                </Button>
            </DialogContent>
        </Dialog>
    );
});

export default Register;