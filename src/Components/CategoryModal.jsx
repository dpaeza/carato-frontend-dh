import React, { useState, useEffect } from 'react';
import { Box, Accordion, AccordionSummary, Typography, AccordionDetails, TextField, Button, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DescriptionIcon from '@mui/icons-material/Description';
import Grid from "@mui/material/Grid2";
import CloseIcon from '@mui/icons-material/Close';

export default function CategoryModal({ open, onClose, categoria = {} }) {

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>
                Detalles de la categoría
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
                            <Box component="form"
                                noValidate
                                autoComplete="off"
                                mb={2}
                                width="100%"
                            >
                                <TextField
                                    id="titulo"
                                    label="Nombre"
                                    variant='standard'
                                    value={categoria?.name || ''}
                                    disabled= {true}
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
                                    sx={{ width: "100%"}}
                                />
                            </Box>
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
                                    variant="standard"
                                    multiline
                                    minRows={6}
                                    value={categoria?.description || ''}
                                    disabled= {true}
                                />
                            </Box>
                            <Box>
                                <img src={categoria?.image.url} alt="imagen de la categoría" style={{ width: "100%", height: "auto" }} />
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
                                backgroundColor: "#3083FF",
                                color: "#FFFFFF",
                                width: "200px",
                                textTransform: "capitalize",
                                borderRadius: 2,
                            }}
                            onClick={onClose}
                        >
                            Cerrar
                        </Button>
                    </Grid>
                </Box>

            </DialogContent>

        </Dialog>

        // <Box sx={{ display: "flex", flexDirection: "column", mx: "auto", maxWidth: 700, gap: 2 }}>
        //     <Accordion defaultExpanded>
        //         <AccordionSummary
        //             expandIcon={<ExpandMoreIcon />}
        //             aria-controls="panel1-content"
        //             id="panel1-header"
        //             sx={{ backgroundColor: "var(--blue-purple)" }}
        //         >
        //             <DescriptionIcon />
        //             <Typography component="span" ml={2}>Dato de categoría</Typography>
        //         </AccordionSummary>
        //         <AccordionDetails>
        //             <Box component="form"
        //                 noValidate
        //                 autoComplete="off"
        //                 mb={2}
        //             >
        //                 <TextField 
        //                     id="titulo"
        //                     label="Título"
        //                     variant='standard'
        //                     value={categoria.nombre}
        //                     onChange={(e) => setCategoria({...categoria, nombre: e.target.value})}
        //                     slotProps={{
        //                         inputLabel: {
        //                             shrink: true,
        //                         },
        //                     }}
        //                 />
        //             </Box>
        //             <Button
        //                 component="label"
        //                 variant='contained'
        //                 fullWidth
        //                 startIcon={<CloudUploadIcon />}
        //             >
        //                 Agrega una imagen para la categoría
        //                 <input 
        //                     type="file" 
        //                     hidden 
        //                     accept='.svg'
        //                     onChange={(e) => setCategoria({...categoria, imagen: e.target.files[0]})}
        //                     style={{
        //                         position: "absolute",
        //                         top: 0,
        //                         left: 0,
        //                         width: "100%",
        //                         height: "100%",
        //                         opacity: 0,
        //                         cursor: "pointer",
        //                     }}
        //                 />
        //             </Button>
        //             <Box
        //                 component="form"
        //                 sx={{ '& > :not(style)': { width: '100%' } }}
        //                 noValidate
        //                 autoComplete="off"
        //                 mt={2}
        //             >
        //                 <TextField 
        //                     id="descripcion"
        //                     label="Descripción"
        //                     multiline
        //                     minRows={6}
        //                     value={categoria.descripcion}
        //                     onChange={(e) => setCategoria({...categoria, descripcion: e.target.value})}
        //                 />
        //             </Box>
        //         </AccordionDetails>
        //     </Accordion>
        //     <Grid
        //         sx={{
        //             display: "flex",
        //             gap: 2,
        //             justifyContent: "flex-end",
        //             width: "100%",
        //         }}
        //     >
        //         <Button
        //             variant="contained"
        //             sx={{
        //                 backgroundColor: "#B3B3BB",
        //                 color: "var(--pureWhite)",
        //                 width: "200px",
        //                 textTransform: "capitalize",
        //                 borderRadius: 2,
        //             }}
        //         >
        //             Cancelar
        //         </Button>
        //         <Button
        //             variant="contained"
        //             sx={{
        //                 backgroundColor: "var(--lightBlue)",
        //                 color: "var(--pureWhite)",
        //                 width: "200px",
        //                 textTransform: "capitalize",
        //                 borderRadius: 2,
        //             }}
        //         >
        //             Agregar categoría
        //         </Button>
        //     </Grid>
        // </Box>
    )
}
