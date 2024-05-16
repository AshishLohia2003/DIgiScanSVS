import React from 'react';
import { Box } from '@mui/material';

function Line({ x1, y1, x2, y2, detail, width }) {
    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
    const offsetX = 0.02 * width;
    const offsetY = 0.02 * width;

    return (
        <Box
            style={{
                position: 'absolute',
                left: x1 + offsetX,
                top: y1 + offsetY,
                width: length,
                transformOrigin: '0 0',
                transform: `rotate(${angle}deg)`,
                border: '2px solid purple'
            }}
        >
            {/* Add line detail if needed */}
        </Box>
    );
}

export default Line;
