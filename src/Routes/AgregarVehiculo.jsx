import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BuildIcon from '@mui/icons-material/Build';
import DescriptionIcon from '@mui/icons-material/Description';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import IconHibrido from '../assets/icons/Icon-hibrido.svg?react';
import IconElectrico from '../assets/icons/Icon-electrico.svg?react';
import IconLujo from '../assets/icons/Icon-lujo.svg?react';
import IconCompacto from '../assets/icons/Icon-compacto.svg?react';
import IconDeportivo from '../assets/icons/Icon-deportivo.svg?react';
import IconFamiliar from '../assets/icons/Icon-familiar.svg?react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Grid from "@mui/material/Grid2";
import { getBrands, getFuelTypes, getTransmissions, getBrakeTypes } from '../Services/extras';
import { getCategories } from '../Services/categories';
import { Category } from '@mui/icons-material';
import { createCar } from '../Services/cars';
import { ErrorCode, useDropzone } from 'react-dropzone';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import DeleteIcon from '@mui/icons-material/Delete';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function AgregarVehiculo() {
    const [brands, setBrands] = useState([]);
    const [gasolines, setGasolines] = useState([]);
    const [transmissions, setTransmissions] = useState([]);
    const [brakeSystems, setBrakeSystems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const [newProduct, setNewProduct] = useState({
        brandId: "",
        name: "",
        categoryId: "",
        images: [],
        description: "",
        transmissionId: "",
        capacity: "",
        hasAirCondition: true,
        doors: "",
        gasolineId: "",
        brakeSystemId: "",
        horsePower: "",
        year: "",
        mileage: "",
        price: "",
    });

    const [previews, setPreviews] = useState([]);

    const [errors, setErrors] = useState({});

    const hasAirCondition = [
        { name: "Sí", value: true },
        { name: "No", value: false }
    ];

    const MySwal = withReactContent(Swal);

    const fetchBrands = async () => {
        try {
            const brands = await getBrands();
            setBrands(brands);
        } catch (error) {
            console.error("Error al obtener las marcas:", error);
        }
    }

    const fetchGasolines = async () => {
        try {
            const gasolines = await getFuelTypes();
            setGasolines(gasolines);
        } catch (error) {
            console.error("Error al obtener los tipos de combustible:", error);
        }
    }

    const fetchTransmissions = async () => {
        try {
            const transmissions = await getTransmissions();
            setTransmissions(transmissions);
        } catch (error) {
            console.error("Error al obtener los tipos de transmisión:", error);
        }
    }

    const fetchBrakeSystems = async () => {
        try {
            const brakeSystems = await getBrakeTypes();
            setBrakeSystems(brakeSystems);
        } catch (error) {
            console.error("Error al obtener los tipos de frenos:", error);
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            setCategories(response);
        } catch (error) {
            console.error("Error al obtener las categorías:", error);
        }
    };

    const resetForm = () => {
        setNewProduct({
            brandId: "",
            name: "",
            categoryId: "",
            images: [],
            description: "",
            transmissionId: "",
            capacity: "",
            hasAirCondition: true,
            doors: "",
            gasolineId: "",
            brakeSystemId: "",
            horsePower: "",
            year: "",
            mileage: "",
            price: "",
        });
        setPreviews([]);
        setErrors({});
    };

    const validateForm = () => {
        const newErrors = {};

        // Validar cada campo obligatorio
        if (!newProduct.brandId) newErrors.brandId = "Marca es obligatoria";
        if (!newProduct.name) newErrors.name = "Nombre es obligatorio";
        if (!newProduct.categoryId) newErrors.categoryId = "Categoría es obligatoria";
        if (!newProduct.description) newErrors.description = "Descripción es obligatoria";
        if (newProduct.images.length == []) newErrors.images = "Imagenes es obligatoria";
        if (!newProduct.transmissionId) newErrors.transmissionId = "Transmisión es obligatoria";
        if (!newProduct.capacity) newErrors.capacity = "Capacidad es obligatoria";
        if (!newProduct.doors) newErrors.doors = "Puertas es obligatorio";
        if (!newProduct.gasolineId) newErrors.gasolineId = "Combustible es obligatorio";
        if (!newProduct.brakeSystemId) newErrors.brakeSystemId = "Frenos es obligatorio";
        if (!newProduct.horsePower) newErrors.horsePower = "Caballo de fuerza es obligatorio";
        if (!newProduct.year) newErrors.year = "Año es obligatorio";
        if (!newProduct.mileage) newErrors.mileage = "Kilometraje es obligatorio";
        if (!newProduct.price) newErrors.price = "Precio es obligatorio";

        setErrors(newErrors); // Actualizar el estado de errores
        return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
    };

    const onSubmit = async () => {
        if (!validateForm()) {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, completa todos los campos obligatorios.',
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#3083FF",
            });
            return;
        }

        setLoading(true);

        try {
            console.log(newProduct)
            await createCar(newProduct)
            resetForm();
            MySwal.fire({
                icon: 'success',
                title: 'Producto creado exitosamente.',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            const message = error.status === 409
                        ? "El nombre del vehiculo ya está registrado en nuestra base de datos. Por favor, utilice otro nombre."
                        : error.response.data.message;

            console.error(error)
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: message,
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#3083FF",
            });
        } finally {
            setLoading(false);
        }
    }

    // Función para manejar la subida de archivos
    const onDrop = (acceptedFiles) => {
        // Guardar los archivos en newProduct.images
        setNewProduct((prev) => ({
            ...prev,
            images: [...prev.images, ...acceptedFiles]
        }));

        // Generar vistas previas y guardarlas en el estado `previews`
        const newPreviews = acceptedFiles.map((file, index) => ({
            file,
            preview: URL.createObjectURL(file),
            id: `preview-${previews.length + index + 1}` // ID único para cada vista previa
        }));
        setPreviews((prev) => [...prev, ...newPreviews]);
    };

    // Función para eliminar una imagen
    const handleRemoveImage = (id) => {
        // Filtrar las vistas previas y los archivos
        const updatedPreviews = previews.filter((preview) => preview.id !== id);
        const updatedFiles = newProduct.images.filter((_, index) => previews[index].id !== id);

        setPreviews(updatedPreviews);
        setNewProduct((prev) => ({
            ...prev,
            images: updatedFiles
        }));
    };

    // Función para reordenar imágenes
    const handleDragEnd = (result) => {
        if (!result.destination) return;

        // Reordenar las vistas previas y los archivos
        const reorderedPreviews = Array.from(previews);
        const [movedPreview] = reorderedPreviews.splice(result.source.index, 1);
        reorderedPreviews.splice(result.destination.index, 0, movedPreview);

        const reorderedFiles = Array.from(newProduct.images);
        const [movedFile] = reorderedFiles.splice(result.source.index, 1);
        reorderedFiles.splice(result.destination.index, 0, movedFile);

        setPreviews(reorderedPreviews);
        setNewProduct((prev) => ({
            ...prev,
            images: reorderedFiles
        }));
    };

    const handleDropzoneError = (fileRejections) => {
        const errorCodes = new Set(fileRejections.map(fileRejection => fileRejection.errors.map(error => error.code)).flatMap(codes => codes));
        const errorMessages = [];
        
        if(errorCodes.has(ErrorCode.FileTooLarge)) {
            errorMessages.push("Solo se permiten imágenes de hasta 1 MB.");
        }

        if(errorCodes.has(ErrorCode.TooManyFiles)) {
            errorMessages.push("Solo se permiten 10 imágenes.");
        }

        if (errorMessages.length === 0) {
            errorMessages.push("Se ha generado un error al recibir su imagen.")
        }

        MySwal.fire({
            icon: 'error',
            title: 'Error',
            html: errorMessages.join("<br/>"),
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#3083FF",
        });
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxSize: 1048576, onDropRejected: handleDropzoneError, maxFiles: 10 });

    useEffect(() => {
        fetchBrands();
        fetchGasolines();
        fetchTransmissions();
        fetchBrakeSystems();
        fetchCategories();
    }, []);


    return (
        <Box sx={{ display: "flex", flexDirection: "column", mx: "auto", maxWidth: 700, gap: 2 }}>
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{ backgroundColor: "var(--blue-purple)" }}
                >
                    <DescriptionIcon />
                    <Typography component="span" ml={2}>Datos de vehículo</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ display: "flex", flexDirection: "column", mx: "auto", maxWidth: 500, gap: 2 }}>
                        <Grid container spacing={6}>
                            <Grid size={4}>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} error={!!errors.brandId}>
                                    <InputLabel
                                        id="marca"
                                        shrink
                                    >
                                        Marca*
                                    </InputLabel>
                                    <Select
                                        labelId="marca"
                                        id="marca"
                                        value={newProduct.brandId}
                                        label="Marca"
                                        onChange={(e) => setNewProduct({ ...newProduct, brandId: e.target.value })}
                                    >
                                        {brands.map((brand, index) => (
                                            <MenuItem key={index} value={brand.id}>{brand.name}</MenuItem>
                                        ))}
                                    </Select>
                                    {errors.brandId && <Typography color="error" fontSize={12}>{errors.brandId}</Typography>}
                                </FormControl>
                            </Grid>
                            <Grid size={4}>
                                <Box
                                    component="form"
                                    sx={{ '& > :not(style)': { width: '100%' } }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        id="modelo"
                                        label="Nombre*"
                                        variant="standard"
                                        margin="dense"
                                        value={newProduct.name}
                                        error={!!errors.name}
                                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                        slotProps={{
                                            inputLabel: {
                                                shrink: true,
                                            },
                                        }}
                                    />
                                    {errors.name && <Typography color="error" fontSize={12}>{errors.name}</Typography>}
                                </Box>
                            </Grid>
                            <Grid size={4}>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} error={!!errors.categoryId}>
                                    <InputLabel
                                        id="categoria"
                                        shrink
                                    >
                                        Categoría*
                                    </InputLabel>
                                    <Select
                                        labelId="categoria"
                                        id="categoria"
                                        value={newProduct.categoryId}
                                        label="Categoría"
                                        onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
                                    >
                                        {categories.map((category, index) => (
                                            <MenuItem key={index} value={category.id}>
                                                <Box display={'flex'} alignItems={'center'}>
                                                    <img src={category.image.url} alt={category.name} style={{ height: 15, width: 15, marginRight: 8 }} />
                                                    {category.name}
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.categoryId && <Typography color="error" fontSize={12}>{errors.categoryId}</Typography>}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid size={12} sx={{ maxWidth: 600, display: "flex", justifyContent: "center" }}>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
                                {/* Área de arrastrar y soltar */}
                                <Box
                                    {...getRootProps()}
                                    sx={{
                                        border: `2px dashed ${isDragActive ? "#1976d2" : "#ccc"}`,
                                        backgroundColor: isDragActive ? "rgba(25, 118, 210, 0.1)" : "transparent",
                                        borderRadius: 2,
                                        padding: 4,
                                        textAlign: "center",
                                        cursor: "pointer",
                                        transition: "background-color 0.3s, border-color 0.3s",
                                        width: '100%'
                                    }}
                                >
                                    <input {...getInputProps()} />
                                    <CloudUploadIcon fontSize="large" />
                                    <Typography fontSize={12}>
                                        {isDragActive
                                            ? "Suelta las imágenes aquí"
                                            : "Arrastra y suelta las imágenes aquí, o haz clic para seleccionarlas"}
                                    </Typography>
                                </Box>

                                {/* Mostrar imágenes cargadas */}
                                <DragDropContext onDragEnd={handleDragEnd}>
                                    <Droppable droppableId="images" direction="horizontal">
                                        {(provided) => (
                                            <Box
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}
                                            >
                                                {previews.map((preview, index) => (
                                                    <Draggable key={preview.id} draggableId={preview.id} index={index}>
                                                        {(provided) => (
                                                            <Box
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                sx={{ position: "relative" }}
                                                            >
                                                                <img
                                                                    src={preview.preview}
                                                                    alt={`Imagen ${index}`}
                                                                    style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 2 }}
                                                                />
                                                                <Button
                                                                    onClick={() => handleRemoveImage(preview.id)}
                                                                    sx={{
                                                                        position: "absolute",
                                                                        top: 0,
                                                                        right: 0,
                                                                        minWidth: "auto",
                                                                        padding: 0.5,
                                                                        color: "white",
                                                                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                                                                        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" }
                                                                    }}
                                                                >
                                                                    <DeleteIcon fontSize="small" />
                                                                </Button>
                                                            </Box>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </Box>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            </Box>
                        </Grid>
                        {errors.images && <Typography color="error" fontSize={12}>{errors.images}</Typography>}
                        <Grid size={12} sx={{ maxWidth: 600 }}>
                            <Box
                                component="form"
                                sx={{ '& > :not(style)': { width: '100%' } }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField
                                    id="descripcion"
                                    label="Descripción"
                                    margin="dense"
                                    error={!!errors.description}
                                    multiline
                                    minRows={6}
                                    value={newProduct.description}
                                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                />
                                {errors.description && <Typography color="error" fontSize={12}>{errors.description}</Typography>}
                            </Box>
                        </Grid>
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    sx={{ backgroundColor: "var(--blue-purple)" }}
                >
                    <BuildIcon />
                    <Typography component="span" ml={2}>Caracteristicas técnicas</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ display: "flex", flexDirection: "column", mx: "auto", maxWidth: 500, gap: 3 }}>
                        <Grid container spacing={6}>
                            <Grid size={4}>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} error={!!errors.transmissionId}>
                                    <InputLabel
                                        id="transmision"
                                        shrink
                                    >
                                        Transmisión*
                                    </InputLabel>
                                    <Select
                                        labelId="transmision"
                                        id="transmision"
                                        value={newProduct.transmissionId}
                                        label="Transmisión"
                                        onChange={(e) => setNewProduct({ ...newProduct, transmissionId: e.target.value })}
                                    >
                                        {transmissions.map((transmission, index) => (
                                            <MenuItem key={index} value={transmission.id}>{transmission.name}</MenuItem>
                                        ))}
                                    </Select>
                                    {errors.transmissionId && <Typography color="error" fontSize={12}>{errors.transmissionId}</Typography>}
                                </FormControl>
                            </Grid>
                            <Grid size={4}>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} id="capacidad" error={!!errors.capacity}>
                                    <InputLabel
                                        id="capacidad"
                                        shrink
                                    >
                                        Capacidad de persona*
                                    </InputLabel>
                                    <Select
                                        labelId="capacidad"
                                        value={newProduct.capacity}
                                        label="Capacidad"
                                        onChange={(e) => setNewProduct({ ...newProduct, capacity: e.target.value })}
                                    >
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={6}>6</MenuItem>
                                        <MenuItem value={7}>7</MenuItem>
                                        <MenuItem value={8}>8</MenuItem>
                                        <MenuItem value={9}>9</MenuItem>
                                        <MenuItem value={10}>10</MenuItem>
                                    </Select>
                                    {errors.capacity && <Typography color="error" fontSize={12}>{errors.capacity}</Typography>}
                                </FormControl>
                            </Grid>
                            <Grid size={4}>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} error={!!errors.hasAirCondition}>
                                    <InputLabel
                                        id="aire"
                                        shrink
                                    >
                                        Aire acondicionado*
                                    </InputLabel>
                                    <Select
                                        labelId="aire"
                                        id="aire"
                                        value={newProduct.hasAirCondition}
                                        label="Aire acondicionado"
                                        onChange={(e) => setNewProduct({ ...newProduct, hasAirCondition: e.target.value })}
                                    >
                                        {hasAirCondition.map((air, index) => (
                                            <MenuItem key={index} value={air.value}>{air.name}</MenuItem>
                                        ))}
                                    </Select>
                                    {errors.hasAirCondition && <Typography color="error" fontSize={12}>{errors.hasAirCondition}</Typography>}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={6}>
                            <Grid size={4}>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} error={!!errors.doors}>
                                    <InputLabel
                                        id="puertas"
                                        shrink
                                    >
                                        Puertas*
                                    </InputLabel>
                                    <Select
                                        labelId="puertas"
                                        id="puertas"
                                        value={newProduct.doors}
                                        label="Puertas"
                                        onChange={(e) => setNewProduct({ ...newProduct, doors: e.target.value })}
                                    >
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                    </Select>
                                    {errors.doors && <Typography color="error" fontSize={12}>{errors.doors}</Typography>}
                                </FormControl>
                            </Grid>
                            <Grid size={4}>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} error={!!errors.gasolineId}>
                                    <InputLabel
                                        id="gasolina"
                                        shrink
                                    >
                                        Combustible*
                                    </InputLabel>
                                    <Select
                                        labelId="gasolina"
                                        id="gasolina"
                                        value={newProduct.gasolineId}
                                        label="Tipo de gasolina"
                                        onChange={(e) => setNewProduct({ ...newProduct, gasolineId: e.target.value })}
                                    >
                                        {gasolines.map((gasoline, index) => (
                                            <MenuItem key={index} value={gasoline.id}>{gasoline.name}</MenuItem>
                                        ))}
                                    </Select>
                                    {errors.gasolineId && <Typography color="error" fontSize={12}>{errors.gasolineId}</Typography>}
                                </FormControl>
                            </Grid>
                            <Grid size={4}>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} error={!!errors.brakeSystemId}>
                                    <InputLabel
                                        id="frenos"
                                        shrink
                                    >
                                        Frenos*
                                    </InputLabel>
                                    <Select
                                        labelId="frenos"
                                        id="frenos"
                                        value={newProduct.brakeSystemId}
                                        label="Sistema de frenos"
                                        onChange={(e) => setNewProduct({ ...newProduct, brakeSystemId: e.target.value })}
                                    >
                                        {brakeSystems.map((brake, index) => (
                                            <MenuItem key={index} value={brake.id}>{brake.name}</MenuItem>
                                        ))}
                                    </Select>
                                    {errors.brakeSystemId && <Typography color="error" fontSize={12}>{errors.brakeSystemId}</Typography>}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={6}>
                            <Grid size={4}>
                                <Box
                                    component="form"
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        id="potencia"
                                        label="Caballo de fuerza (HP)*"
                                        variant="standard"
                                        margin="dense"
                                        error={!!errors.horsePower}
                                        type="number"
                                        value={newProduct.horsePower}
                                        onChange={(e) => setNewProduct({ ...newProduct, horsePower: e.target.value })}
                                        onKeyDown={(e) => {
                                            if (['-', '+', 'e', 'E'].includes(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        slotProps={{
                                            inputLabel: {
                                                shrink: true,
                                            },
                                        }}
                                    />
                                    {errors.horsePower && <Typography color="error" fontSize={12}>{errors.horsePower}</Typography>}
                                </Box>
                            </Grid>
                            <Grid size={4}>
                                <Box
                                    component="form"
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        id="año"
                                        label="Año del modelo*"
                                        variant="standard"
                                        type="number"
                                        margin="dense"
                                        error={!!errors.year}
                                        value={newProduct.year}
                                        onChange={(e) => setNewProduct({ ...newProduct, year: e.target.value })}
                                        onKeyDown={(e) => {
                                            if (['-', '+', 'e', 'E'].includes(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        slotProps={{
                                            inputLabel: {
                                                shrink: true,
                                            },
                                        }}
                                    />
                                    {errors.year && <Typography color="error" fontSize={12}>{errors.year}</Typography>}
                                </Box>
                            </Grid>
                            <Grid size={4}>
                                <Box
                                    component="form"
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        id="kilometraje"
                                        label="Kilometraje (Km)*"
                                        variant="standard"
                                        type="number"
                                        margin="dense"
                                        error={!!errors.mileage}
                                        value={newProduct.mileage}
                                        onChange={(e) => setNewProduct({ ...newProduct, mileage: e.target.value })}
                                        onKeyDown={(e) => {
                                            if (['-', '+', 'e', 'E'].includes(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        slotProps={{
                                            inputLabel: {
                                                shrink: true,
                                            },
                                        }}
                                    />
                                    {errors.mileage && <Typography color="error" fontSize={12}>{errors.mileage}</Typography>}
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    sx={{ backgroundColor: "var(--blue-purple)" }}
                >
                    <AttachMoneyIcon />
                    <Typography component="span" ml={2}>Precio</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ display: "flex", flexDirection: "column", mx: "auto", maxWidth: 200, gap: 3 }}>
                        <Grid size={12}>
                            <Box
                                component="form"
                                noValidate
                                autoComplete="off"
                            >
                                <TextField
                                    id="precio"
                                    label="Valor x día*"
                                    variant="standard"
                                    type="number"
                                    margin="dense"
                                    error={!!errors.price}
                                    value={newProduct.price}
                                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                    onKeyDown={(e) => {
                                        if (['-', '+', 'e', 'E'].includes(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
                                />
                                {errors.price && <Typography color="error" fontSize={12}>{errors.price}</Typography>}
                            </Box>
                        </Grid>
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
                        backgroundColor: "var(--lightBlue)",
                        color: "var(--pureWhite)",
                        width: "200px",
                        textTransform: "capitalize",
                        borderRadius: 2,
                    }}
                    onClick={onSubmit}
                >
                    Agregar vehículo
                </Button>
            </Grid>
            <Backdrop
                sx={(theme) => ({
                    color: '#fff',
                    zIndex: theme.zIndex.drawer + 1,
                })}
                open={loading} // Mostrar el Backdrop solo cuando loading sea true
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    )
}