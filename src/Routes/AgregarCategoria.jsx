import React, {useState} from 'react'
import { Box, Accordion, AccordionSummary, Typography, AccordionDetails, TextField, Button } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DescriptionIcon from '@mui/icons-material/Description';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Grid from "@mui/material/Grid2";

export default function AgregarCategoria() {

    const [categoria, setCategoria] = useState({
        nombre: "",
        imagen: "",
        descripcion: ""
    })

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
                    <Typography component="span" ml={2}>Dato de categoría</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box component="form"
                        noValidate
                        autoComplete="off"
                        mb={2}
                    >
                        <TextField 
                            id="titulo"
                            label="Título"
                            variant='standard'
                            value={categoria.nombre}
                            onChange={(e) => setCategoria({...categoria, nombre: e.target.value})}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />
                    </Box>
                    <Button
                        component="label"
                        variant='contained'
                        fullWidth
                        startIcon={<CloudUploadIcon />}
                    >
                        Agrega una imagen para la categoría
                        <input 
                            type="file" 
                            hidden 
                            accept='.svg'
                            onChange={(e) => setCategoria({...categoria, imagen: e.target.files[0]})}
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
                    <Box
                        component="form"
                        sx={{ '& > :not(style)': { width: '100%' } }}
                        noValidate
                        autoComplete="off"
                        mt={2}
                    >
                        <TextField 
                            id="descripcion"
                            label="Descripción"
                            multiline
                            minRows={6}
                            value={categoria.descripcion}
                            onChange={(e) => setCategoria({...categoria, descripcion: e.target.value})}
                        />
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
                    Agregar categoría
                </Button>
            </Grid>
        </Box>
    )
}