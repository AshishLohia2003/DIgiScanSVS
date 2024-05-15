import React from 'react';
import { Box } from '@mui/material';

function Rectangle({ x, y, width, height, detail }) {
    return (
        <Box
            style={{
                position: 'absolute',
                left: x,
                top: y,
                width: width,
                height: height,
                border: '2px solid orange'
            }}
        >
            {/* Add rectangle detail if needed */}
        </Box>
    );
}

export default Rectangle;
