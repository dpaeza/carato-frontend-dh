import React from 'react'
import { Box, Skeleton } from "@mui/material";

export default function SpecificationsSkeleton() {
    return (
        <Box sx={{ margin: "auto", padding: 2,  maxWidth: "1100px" }}>
            <Skeleton variant="text" width="50%" height={40} />
            <Skeleton variant="text" width="100%" height={20} />
            <Skeleton variant="text" width="100%" height={20} />
        </Box>
    )
}
