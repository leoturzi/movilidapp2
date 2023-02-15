import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Loading() {
    return (
        <Box
            width={'100%'}
            height={{
                xs: 'calc(100vh - 100px)',
                lg: 'calc(100vh - 200px)',
            }}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
            }}
        >
            <CircularProgress
                sx={{
                    alignSelf: 'center',
                }}
            />
        </Box>
    );
}

export default Loading;
