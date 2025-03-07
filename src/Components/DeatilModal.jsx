import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BuildIcon from '@mui/icons-material/Build';
import DescriptionIcon from '@mui/icons-material/Description';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
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
import { Category } from '@mui/icons-material';
import { updateCar } from '../Services/cars';
import { useDropzone } from 'react-dropzone';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import DeleteIcon from '@mui/icons-material/Delete';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function DeatilModal({ open, onClose, mode = "view", vehicleData, onUpdate }) {
    const [brands, setBrands] = useState([]);
    const [gasolines, setGasolines] = useState([]);
    const [transmissions, setTransmissions] = useState([]);
    const [brakeSystems, setBrakeSystems] = useState([]);
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

    const categories = [
        { name: "Hibridos", icon: IconHibrido, id: 1 },
        { name: "Electricos", icon: IconElectrico, id: 2 },
        { name: "Lujo", icon: IconLujo, id: 3 },
        { name: "Compactos", icon: IconCompacto, id: 4 },
        { name: "Deportivos", icon: IconDeportivo, id: 5 },
        { name: "Familiares", icon: IconFamiliar, id: 6 }
    ];

    const hasAirCondition = [
        { name: "Sí", value: true },
        { name: "No", value: false }
    ];

    const MySwal = withReactContent(Swal);

    // Inicializar el estado con los datos del vehículo
    useEffect(() => {
        if (vehicleData) {
            const brandId = brands.find((brand) => brand.name === vehicleData.brand)?.id || "";
            const categoryId = categories.find((category) => category.name === vehicleData.category)?.id || "";
            const gasolineId = gasolines.find((gasoline) => gasoline.name === vehicleData.gasoline)?.id || "";
            const transmissionId = transmissions.find((transmission) => transmission.name === vehicleData.transmission)?.id || "";
            const brakeSystemId = brakeSystems.find((brake) => brake.name === vehicleData.brakeSystem)?.id || "";

            const loadExistingImages = async () => {
                const existingFiles = await Promise.all(
                    vehicleData.images.map(async (image) => {
                        const file = await urlToFile(image.url, image.name);
                        return {
                            file,
                            preview: image.url,
                            id: image.id.toString(),
                            isExisting: true
                        };
                    })
                );

                setNewProduct({
                    brandId: brandId,
                    name: vehicleData.name || "",
                    categoryId: categoryId,
                    images: existingFiles.map((img) => img.file),
                    description: vehicleData.description || "",
                    transmissionId: transmissionId,
                    capacity: vehicleData.capacity || "",
                    hasAirCondition: vehicleData.hasAirCondition ?? true,
                    doors: vehicleData.doors || "",
                    gasolineId: gasolineId,
                    brakeSystemId: brakeSystemId,
                    horsePower: vehicleData.horsePower || "",
                    year: vehicleData.year || "",
                    mileage: vehicleData.mileage || "",
                    price: vehicleData.price || "",
                });
                setPreviews(existingFiles);
            };
            loadExistingImages();
        }
    }, [vehicleData]);

    const fetchBrands = async () => {
        try {
            const brands = await getBrands();
            setBrands(brands);
        } catch (error) {
            console.error("Error al obtener las marcas:", error);
        }
    };

    const fetchGasolines = async () => {
        try {
            const gasolines = await getFuelTypes();
            setGasolines(gasolines);
        } catch (error) {
            console.error("Error al obtener los tipos de combustible:", error);
        }
    };

    const fetchTransmissions = async () => {
        try {
            const transmissions = await getTransmissions();
            setTransmissions(transmissions);
        } catch (error) {
            console.error("Error al obtener los tipos de transmisión:", error);
        }
    };

    const fetchBrakeSystems = async () => {
        try {
            const brakeSystems = await getBrakeTypes();
            setBrakeSystems(brakeSystems);
        } catch (error) {
            console.error("Error al obtener los tipos de frenos:", error);
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
        setErrors({});
    };

    const validateForm = () => {
        const newErrors = {};

        // Validar cada campo obligatorio
        if (!newProduct.brandId) newErrors.brandId = "Marca es obligatoria";
        if (!newProduct.name) newErrors.name = "Nombre es obligatorio";
        if (!newProduct.categoryId) newErrors.categoryId = "Categoría es obligatoria";
        if (!newProduct.description) newErrors.description = "Descripción es obligatoria";
        if (newProduct.images.length === 0) newErrors.images = "Imágenes es obligatoria";
        if (!newProduct.transmissionId) newErrors.transmissionId = "Transmisión es obligatoria";
        if (!newProduct.capacity) newErrors.capacity = "Capacidad es obligatoria";
        if (!newProduct.doors) newErrors.doors = "Puertas es obligatorio";
        if (!newProduct.gasolineId) newErrors.gasolineId = "Combustible es obligatorio";
        if (!newProduct.brakeSystemId) newErrors.brakeSystemId = "Frenos es obligatorio";
        if (!newProduct.horsePower) newErrors.horsePower = "Caballo de fuerza es obligatorio";
        if (!newProduct.year) newErrors.year = "Año es obligatorio";
        if (!newProduct.mileage) newErrors.mileage = "Kilometraje es obligatorio";
        if (!newProduct.price) newErrors.price = "Precio es obligatorio";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
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

            const formData = new FormData();

            Object.keys(newProduct).forEach((key) => {
                if (key !== "images") {
                    formData.append(key, newProduct[key]);
                }
            });

            newProduct.images.forEach((file) => {
                formData.append("images", file);
            });

            await updateCar(vehicleData.id, newProduct);
            resetForm();
            onUpdate();
            onClose();
            MySwal.fire({
                icon: 'success',
                title: 'Vehículo editado exitosamente.',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.error(error)
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

    const urlToFile = async (url, filename) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new File([blob], filename, { type: blob.type });
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (acceptedFiles) => {
            const newPreviews = acceptedFiles.map((file) => ({
                file,
                preview: URL.createObjectURL(file),
                id: `new-${Date.now()}-${file.name}`,
                isExisting: false
            }));
            setPreviews((prev) => [...prev, ...newPreviews]);
            setNewProduct((prev) => ({
                ...prev,
                images: [...prev.images, ...acceptedFiles]
            }));
        },
        disabled: mode === "view"
    });

    const handleRemoveImage = (id) => {
        const updatedPreviews = previews.filter((preview) => preview.id !== id);
        const updatedFiles = newProduct.images.filter((_, index) => previews[index].id !== id);

        setPreviews(updatedPreviews);
        setNewProduct((prev) => ({
            ...prev,
            images: updatedFiles
        }));
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;

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

    useEffect(() => {
        fetchBrands();
        fetchGasolines();
        fetchTransmissions();
        fetchBrakeSystems();
    }, []);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md">
            <DialogTitle>
                {mode === "view" ? "Detalles del vehículo" : "Editar vehículo"}
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
                                                disabled={mode === "view"}
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
                                                value={newProduct.name}
                                                error={!!errors.name}
                                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                                disabled={mode === "view"}
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
                                                disabled={mode === "view"}
                                            >
                                                {categories.map((category, index) => (
                                                    <MenuItem key={index} value={category.id}>
                                                        <category.icon style={{ marginRight: 8, height: 15, width: 15 }} />
                                                        {category.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {errors.categoryId && <Typography color="error" fontSize={12}>{errors.categoryId}</Typography>}
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid size={12} sx={{ maxWidth: 600, display: "flex", justifyContent: "center" }}>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
                                        {mode === "edit" ? (
                                            <>
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

                                                <DragDropContext onDragEnd={handleDragEnd}>
                                                    <Droppable droppableId="images" direction="horizontal">
                                                        {(provided) => (
                                                            <Box
                                                                {...provided.droppableProps}
                                                                ref={provided.innerRef}
                                                                sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}
                                                            >
                                                                {previews.map((preview, index) => (
                                                                    <Draggable
                                                                        key={preview.id}
                                                                        draggableId={preview.id.toString()} // Asegurar que sea string
                                                                        index={index}
                                                                    >
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
                                            </>
                                        ) : (
                                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                                                {previews.map((preview, index) => (
                                                    <img
                                                        key={index}
                                                        src={preview.preview}
                                                        alt={`Imagen ${index}`}
                                                        style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 2 }}
                                                    />
                                                ))}
                                            </Box>
                                        )}
                                    </Box>
                                </Grid>
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
                                            error={!!errors.description}
                                            multiline
                                            minRows={6}
                                            value={newProduct.description}
                                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                            disabled={mode === "view"}
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
                            sx={{ backgroundColor: "#E9EBF8" }}
                        >
                            <BuildIcon />
                            <Typography component="span" ml={2}>Características técnicas</Typography>
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
                                                disabled={mode === "view"}
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
                                                disabled={mode === "view"}
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
                                                disabled={mode === "view"}
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
                                                disabled={mode === "view"}
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
                                                disabled={mode === "view"}
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
                                                disabled={mode === "view"}
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
                                                error={!!errors.horsePower}
                                                type="number"
                                                value={newProduct.horsePower}
                                                onChange={(e) => setNewProduct({ ...newProduct, horsePower: e.target.value })}
                                                onKeyDown={(e) => {
                                                    if (['-', '+', 'e', 'E'].includes(e.key)) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                                disabled={mode === "view"}
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
                                                error={!!errors.year}
                                                value={newProduct.year}
                                                onChange={(e) => setNewProduct({ ...newProduct, year: e.target.value })}
                                                disabled={mode === "view"}
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
                                                error={!!errors.mileage}
                                                value={newProduct.mileage}
                                                onChange={(e) => setNewProduct({ ...newProduct, mileage: e.target.value })}
                                                disabled={mode === "view"}
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
                            sx={{ backgroundColor: "#E9EBF8" }}
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
                                            error={!!errors.price}
                                            value={newProduct.price}
                                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                            disabled={mode === "view"}
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
                                backgroundColor: mode === "view" ? "#3083FF" : "#B3B3BB",
                                color: "white",
                                width: "200px",
                                textTransform: "capitalize",
                                borderRadius: 2,
                            }}
                            onClick={onClose}
                        >
                            {mode === "view" ? "Cerrar" : "Cancelar"}
                        </Button>
                        {mode === "edit" && (
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#3083FF",
                                    color: "white",
                                    width: "200px",
                                    textTransform: "capitalize",
                                    borderRadius: 2,
                                }}
                                onClick={onSubmit}
                            >
                                Guardar cambios
                            </Button>
                        )}
                    </Grid>
                </Box>
            </DialogContent>
            <Backdrop
                sx={(theme) => ({
                    color: '#fff',
                    zIndex: theme.zIndex.drawer + 1,
                })}
                open={loading} // Mostrar el Backdrop solo cuando loading sea true
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Dialog>
    );
}
