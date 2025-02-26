import React from 'react'
import { Typography, Button } from "@mui/material";
import Grid from '@mui/material/Grid2';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from 'react-router-dom';

export default function DetailHeader({ model, category}) {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate("/");
    };

    return (
        <Grid container alignItems="center" justifyContent="space-between" sx={{ marginBottom: 2 }}>
            <Grid>
                <Typography variant="h2" component="span" textTransform={"uppercase"} fontFamily={"var(--openSans)"} fontWeight={700} sx={{ fontSize: 25, color: "var(--darkBlue)" }}>{model}</Typography>
                <Typography variant="subtitle1" component="span" fontFamily={"var(--openSans)"} fontWeight={500} sx={{ marginLeft: 1, fontSize: 14, color: "var(--lightGrey)" }}>{category}</Typography>
            </Grid>
            <Grid >
                <Button
                    variant="contained"
                    sx={{
                        borderRadius: "50%",
                        padding: "0",
                        height: "40px",
                        minWidth: "40px",
                        width: "40px",
                        border: "1px solid #D9D9D9",
                        backgroundColor: "#FFFFFF",
                    }}
                    onClick={handleBackClick}
                >
                    <ArrowBackIcon sx={{ color: "#0A0A25", fontSize: 25 }} />
                </Button>
            </Grid>
        </Grid>
    )
}
