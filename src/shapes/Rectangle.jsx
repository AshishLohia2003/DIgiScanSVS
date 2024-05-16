import React from 'react';
import { Box } from '@mui/material';

function Rectangle({ x, y, width, height, detail, scale }) {
    const offsetX = 0.02 * scale;
    const offsetY = 0.02 * scale;

    return (
        <Box
            style={{
                position: 'absolute',
                left: x + offsetX,
                top: y + offsetY,
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
