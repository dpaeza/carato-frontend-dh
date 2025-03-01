import React, { useState, useEffect } from 'react'
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

export default function AgregarVehiculo() {
    const [age, setAge] = useState('');
    const [brands, setBrands] = useState([]);
    const [gasolines, setGasolines] = useState([]);
    const [transmissions, setTransmissions] = useState([]);
    const [brakeSystems, setBrakeSystems] = useState([]);

    const placeholder = "Seleccione";

    const [newProduct, setNewProduct] = useState({
        // brandId: "",
        brand: "",
        // name:  "",
        model: "",
        // categoryId: "",
        category: "",
        images: [],
        description: "",
        // transmissionId: "",
        transmission: "",
        capacity: "",
        hasAirCondition: true,
        doors: "",
        // gasolineId: "",
        gasoline: "",
        // brakeSystemId: "",
        brakeSystem: "",
        horsePower: "",
        year: "",
        mileage: "",
        price: "",
    });

    const categories = [
        { name: "Híbridos", icon: IconHibrido },
        { name: "Eléctricos", icon: IconElectrico },
        { name: "Lujo", icon: IconLujo },
        { name: "Compactos", icon: IconCompacto },
        { name: "Deportivos", icon: IconDeportivo },
        { name: "Familiares", icon: IconFamiliar }
    ];

    const hasAirCondition = [
        "Sí",
        "No"
    ];

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

    useEffect(() => {
        fetchBrands();
        fetchGasolines();
        fetchTransmissions();
        fetchBrakeSystems();
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
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel
                                        id="marca"
                                        shrink
                                    >
                                        Marca*
                                    </InputLabel>
                                    <Select
                                        labelId="marca"
                                        id="marca"
                                        value={newProduct.brand}
                                        label="Marca"
                                        onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                                    >
                                        {brands.map((brand, index) => (
                                            <MenuItem key={index} value={brand.name}>{brand.name}</MenuItem>
                                        ))}
                                    </Select>
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
                                        label="Modelo*"
                                        variant="standard"
                                        value={newProduct.model}
                                        onChange={(e) => setNewProduct({ ...newProduct, model: e.target.value })}
                                        slotProps={{
                                            inputLabel: {
                                                shrink: true,
                                            },
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid size={4}>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel
                                        id="categoria"
                                        shrink
                                    >
                                        Categoría*
                                    </InputLabel>
                                    <Select
                                        labelId="categoria"
                                        id="categoria"
                                        value={newProduct.category}
                                        label="Categoría"
                                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                    >
                                        {categories.map((category, index) => (
                                            <MenuItem key={index} value={category.name}>
                                                <img src={category.icon} alt={category.name} />
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid size={12} sx={{ maxWidth: 600, display: "flex", justifyContent: "center" }}>
                            <Button
                                component="label"
                                variant="contained"
                                fullWidth
                                startIcon={<CloudUploadIcon />}
                                sx={{ width: "100%" }}
                            >
                                Subir imágenes
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={(e) => setNewProduct({ ...newProduct, images: e.target.files })}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        opacity: 0,
                                        cursor: "pointer",
                                    }}
                                />
                            </Button>
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
                                    multiline
                                    minRows={6}
                                    value={newProduct.description}
                                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                />
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
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel
                                        id="transmision"
                                        shrink
                                    >
                                        Transmisión*
                                    </InputLabel>
                                    <Select
                                        labelId="transmision"
                                        id="transmision"
                                        value={newProduct.transmission}
                                        label="Transmisión"
                                        onChange={(e) => setNewProduct({ ...newProduct, transmission: e.target.value })}
                                    >
                                        {transmissions.map((transmission, index) => (
                                            <MenuItem key={index} value={transmission.name}>{transmission.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid size={4}>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel
                                        id="capacidad"
                                        shrink
                                    >
                                        Capacidad de persona*
                                    </InputLabel>
                                    <Select
                                        labelId="capacidad"
                                        id="capacidad"
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
                                </FormControl>
                            </Grid>
                            <Grid size={4}>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
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
                                            <MenuItem key={index} value={air}>{air}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={6}>
                            <Grid size={4}>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
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
                                </FormControl>
                            </Grid>
                            <Grid size={4}>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel
                                        id="gasolina"
                                        shrink
                                    >
                                        Combustible*
                                    </InputLabel>
                                    <Select
                                        labelId="gasolina"
                                        id="gasolina"
                                        value={newProduct.gasoline}
                                        label="Tipo de gasolina"
                                        onChange={(e) => setNewProduct({ ...newProduct, gasoline: e.target.value })}
                                    >
                                        {gasolines.map((gasoline, index) => (
                                            <MenuItem key={index} value={gasoline.name}>{gasoline.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid size={4}>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel
                                        id="frenos"
                                        shrink
                                    >
                                        Frenos*
                                    </InputLabel>
                                    <Select
                                        labelId="frenos"
                                        id="frenos"
                                        value={newProduct.brakeSystem}
                                        label="Sistema de frenos"
                                        onChange={(e) => setNewProduct({ ...newProduct, brakeSystem: e.target.value })}
                                    >
                                        {brakeSystems.map((brake, index) => (
                                            <MenuItem key={index} value={brake.name}>{brake.name}</MenuItem>
                                        ))}
                                    </Select>
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
                                        type="number"
                                        value={newProduct.horsePower}
                                        onChange={(e) => setNewProduct({ ...newProduct, horsePower: e.target.value })}
                                        slotProps={{
                                            inputLabel: {
                                                shrink: true,
                                            },
                                        }}
                                    />
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
                                        value={newProduct.year}
                                        onChange={(e) => setNewProduct({ ...newProduct, year: e.target.value })}
                                        slotProps={{
                                            inputLabel: {
                                                shrink: true,
                                            },
                                        }}
                                    />
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
                                        value={newProduct.mileage}
                                        onChange={(e) => setNewProduct({ ...newProduct, mileage: e.target.value })}
                                        slotProps={{
                                            inputLabel: {
                                                shrink: true,
                                            },
                                        }}
                                    />
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
                                    value={newProduct.price}
                                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
                                />
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
                        backgroundColor: "#B3B3BB",
                        color: "var(--pureWhite)",
                        width: "200px",
                        textTransform: "capitalize",
                        borderRadius: 2,
                    }}
                >
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "var(--lightBlue)",
                        color: "var(--pureWhite)",
                        width: "200px",
                        textTransform: "capitalize",
                        borderRadius: 2,
                    }}
                >
                    Agregar vehículo
                </Button>
            </Grid>

        </Box>
    )
}