import React from 'react';
import { Box } from '@mui/material';

function Arrow({ x1, y1, x2, y2, detail }) {
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

    return (
        <Box
            style={{
                position: 'absolute',
                left: x1,
                top: y1,
                width: length,
                height: '2px',
                backgroundColor: 'red',
                transform: `rotate(${angle}deg)`
            }}
        >
            {/* Add arrow detail if needed */}
        </Box>
    );
}

export default Arrow;
