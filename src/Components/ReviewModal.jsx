import React, {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Dialog, DialogTitle, DialogContent, Rating, TextField, Box, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {addReview} from '../Services/reviews';

export default function ReviewModal({ open, onClose, id, onSuccess= () => {}}) {

    const [reviewData, setReviewData] = useState({
        carId: id,
        rating: 0,
        comment: ''
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(reviewData);
            const response = await addReview(reviewData);
            onSuccess();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al enviar la reseña. Inténtalo de nuevo más tarde.',
                timer: 2000,
                showConfirmButton: false,
            });
        }
        setReviewData({
            carId: id,
            rating: 0,
            comment: ''
        });
    }

    useEffect(() => {
        setReviewData((prev) => ({
            ...prev,
            carId: id
        }));
    }, [id]);

    return (
        <Dialog
            open={open} 
            onClose={onClose} 
            maxWidth="xs"
            fullWidth
        >
            <DialogTitle
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    gap: 2,
                }}
            >
                <span style={{ fontFamily: 'var(--openSans)', fontWeight: 600, fontSize: 20 }}>¿Cómo calificas al vehículo?</span>
                <CloseIcon 
                    onClick={onClose} 
                    style={{ position: 'absolute', right: 16, top: 16, cursor: 'pointer' }} 
                />
            </DialogTitle>
            <DialogContent>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(e);
                }}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ mb: 2 }}
                    >
                        <Rating
                            name="rating"
                            value={reviewData.rating}
                            onChange={(event, newValue) => {
                                setReviewData({ ...reviewData, rating: newValue });
                            }}
                            precision={1}
                            size="large"
                            sx={{ mb: 2 }}
                        />
                    </Box>
                    <TextField
                        name="comment"
                        label="Comentario"
                        multiline
                        rows={4}
                        value={reviewData.comment}
                        onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                        fullWidth
                        variant="outlined"
                        sx={{ mb: 2 }}  
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                    >
                        Enviar Reseña
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}