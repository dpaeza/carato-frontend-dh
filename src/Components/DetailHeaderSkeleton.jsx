import React from 'react'
import Grid from '@mui/material/Grid2';
import { Skeleton } from '@mui/material';

export default function DetailHeaderSkeleton() {
    return (
        <Grid
            container 
            alignItems={{xs:'flex-start', sm:'center'}}
            justifyContent="space-between" 
            sx={{marginBottom: 2,  maxWidth: "1100px", margin: "auto" }}
        >
            <Grid
                display={{ xs: "flex" }}
                alignItems={{ sm: "flex-end" }}
                gap={1}
                flexDirection={{ xs: "column", sm: "row" }}
            >
                <Skeleton variant="text" animation="wave" width={200} height={40} />
                <Skeleton variant="text" animation="wave" width={80} height={40} />
            </Grid>
            <Grid display={'flex'} gap={{xs:0.5, sm:2}}>
                <Skeleton variant="text" animation="wave" width={80} height={30} />
                <Skeleton variant="text" animation="wave" width={80} height={30} />
                <Skeleton variant="text" animation="wave" width={40} height={30} />
            </Grid>
        </Grid>
    )
}
