import React from 'react'
import { Skeleton, Box } from "@mui/material";

export default function SearchSkeleton() {
    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            gap={'15px'}
            bgcolor={'var(--white)'}
            p={'20px'}
            borderRadius={'10px'}
            boxShadow={"0px 0px 10px 0px rgba(0,0,0,0.1)"}
        >
            <Skeleton variant='text' animation='wave' width={230} height={40} />
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
            }}>
                <Skeleton variant='rectangular' animation='wave' width={230} height={40} />
                <Skeleton variant='rectangular' animation='wave' width={500} height={40} />
                <Skeleton variant='rectangular' animation='wave' width={94} height={40} />
            </Box>
        </Box>
    )
}
