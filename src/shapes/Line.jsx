import React from 'react';
import { Box } from '@mui/material';

function Line({ x1, y1, x2, y2, detail }) {
    return (
        <Box
            style={{
                position: 'absolute',
                left: x1,
                top: y1,
                width: Math.abs(x2 - x1),
                height: Math.abs(y2 - y1),
                border: '2px solid purple'
            }}
        >
            {/* Add line detail if needed */}
        </Box>
    );
}

export default Line;
