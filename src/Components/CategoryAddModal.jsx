import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
    Box, Accordion, AccordionSummary, Typography, AccordionDetails,
    TextField, Button, Dialog, DialogTitle, DialogContent, IconButton,
    Backdrop, CircularProgress
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DescriptionIcon from '@mui/icons-material/Description';
import Grid from "@mui/material/Grid2";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { addCategory } from '../Services/categories';
import { useDropzone } from 'react-dropzone';

export default function CategoryAddModal({ open, onClose, onUpdate }) {
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState({
        name: "",
        description: "",
        image: null,
        imagePreview: null
    });

    // Estado para controlar si el usuario ya interactuó con cada campo
    const [touched, setTouched] = useState({
        name: false,
        description: false,
        image: false,
    });

    const MySwal = withReactContent(Swal);

    // La validación: todos los campos deben tener valor
    const isValid = category.name && category.description && category.imagePreview;

    const handleSubmit = async () => {
        if (!isValid) {
            // Si no es válido, marcamos todos los campos como "touched" para que se muestren los errores
            setTouched({
                name: true,
                description: true,
                image: true,
            });
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", category.name);
            formData.append("description", category.description);
            if (category.image) {
                formData.append("image", category.image);
            }
            await addCategory(formData);
            onUpdate();
            onClose();
            MySwal.fire({
                icon: 'success',
                title: 'Categoría creada exitosamente.',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            onClose();
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response.data.message,
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#3083FF",
            });
        } finally {
            setLoading(false);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/svg+xml",
        multiple: false,
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            const previewURL = URL.createObjectURL(file);
            setCategory((prev) => ({
                ...prev,
                image: file,
                imagePreview: previewURL
            }));
        }
    });

    const handleRemoveImage = () => {
        setCategory((prev) => ({
            ...prev,
            image: null,
            imagePreview: null
        }));
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>
                Agregar categoría
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
                <Box sx={{ display: "flex", flexDirection: "column", mx: "auto", maxWidth: 700, gap: 2 }}>
                    <Accordion defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            sx={{ backgroundColor: "#E9EBF8" }}
                        >
                            <DescriptionIcon />
                            <Typography component="span" ml={2}>Data de categoría</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box
                                component="form"
                                noValidate
                                autoComplete="off"
                                mb={2}
                                width="100%"
                            >
                                <TextField
                                    id="titulo"
                                    label="Nombre"
                                    variant='standard'
                                    error={touched.name && !category.name}
                                    helperText={touched.name && !category.name ? "El nombre es requerido" : ""}
                                    value={category.name}
                                    onChange={(e) => setCategory({ ...category, name: e.target.value })}
                                    onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                                    sx={{ width: "100%" }}
                                />
                            </Box>
                            <Box
                                component="form"
                                sx={{ '& > :not(style)': { width: '100%' } }}
                                noValidate
                                autoComplete="off"
                                mt={3}
                            >
                                <TextField
                                    id="descripcion"
                                    label="Descripción"
                                    error={touched.description && !category.description}
                                    helperText={touched.description && !category.description ? "La descripción es requerida" : ""}
                                    multiline
                                    minRows={6}
                                    value={category.description}
                                    onChange={(e) => setCategory({ ...category, description: e.target.value })}
                                    onBlur={() => setTouched((prev) => ({ ...prev, description: true }))}
                                />
                            </Box>
                            <Box>
                                <Box
                                    {...getRootProps({
                                        onClick: () => setTouched((prev) => ({ ...prev, image: true }))
                                    })}
                                    sx={{
                                        border: `2px dashed ${isDragActive ? "#1976d2" : "#ccc"}`,
                                        backgroundColor: isDragActive ? "rgba(25, 118, 210, 0.1)" : "transparent",
                                        borderRadius: 2,
                                        padding: 2,
                                        textAlign: "center",
                                        cursor: "pointer",
                                        transition: "background-color 0.3s, border-color 0.3s",
                                        width: "100%",
                                        height: 140,
                                        marginTop: 2
                                    }}
                                >
                                    <input {...getInputProps()} />
                                    <CloudUploadIcon fontSize="large" />
                                    <Typography variant="body1" align="center" fontSize={14}>
                                        {isDragActive
                                            ? "Suelta la imagen aquí"
                                            : "Arrastra y suelta la imagen aquí, o haz clic para seleccionarla"
                                        }
                                    </Typography>
                                    <Typography fontSize={12} color="error">
                                        (Solo archivos SVG permitidos)
                                    </Typography>
                                </Box>
                                {/* Mostrar error solo si se ha interactuado con el dropzone */}
                                {!category.imagePreview && touched.image && (
                                    <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                                        La imagen es requerida
                                    </Typography>
                                )}
                                {/* Vista previa de la imagen */}
                                {category.imagePreview && (
                                    <Box
                                        sx={{
                                            position: "relative",
                                            display: "inline-block",
                                            width: "65px",
                                            textAlign: "center"
                                        }}
                                    >
                                        <img
                                            src={category.imagePreview}
                                            alt="Vista previa"
                                            style={{ width: "100%", height: "auto", marginTop: 2 }}
                                        />
                                        <Button
                                            onClick={handleRemoveImage}
                                            sx={{
                                                position: "absolute",
                                                top: 8,
                                                right: 0,
                                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                                padding: 0.2,
                                                minWidth: "auto",
                                                color: "white",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" }
                                            }}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Grid
                        sx={{
                            display: "flex",
                            gap: 2,
                            justifyContent: "flex-end",
                            width: "100%",
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#B3B3BB",
                                color: "#FFFFFF",
                                width: "200px",
                                textTransform: "capitalize",
                                borderRadius: 2,
                                fontSize: 14,
                            }}
                            onClick={onClose}
                        >
                            Cerrar
                        </Button>
                        <Button
                            variant="contained"
                            disabled={!isValid}
                            sx={{
                                backgroundColor: "#3083FF",
                                color: "white",
                                width: "200px",
                                textTransform: "capitalize",
                                borderRadius: 2,
                                fontSize: 14,
                            }}
                            onClick={handleSubmit}
                        >
                            Guardar cambios
                        </Button>
                    </Grid>
                </Box>
            </DialogContent>
            <Backdrop
                sx={(theme) => ({
                    color: '#fff',
                    zIndex: theme.zIndex.drawer + 1,
                })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Dialog>
    );
}

