import React from 'react';
import { Box } from '@mui/material';

function Ellipse({ x, y, width, height, detail }) {
    return (
        <Box
            style={{
                position: 'absolute',
                left: x,
                top: y,
                width: width,
                height: height,
                borderRadius: '50%',
                backgroundColor: 'green'
            }}
        >
            {/* Add ellipse detail if needed */}
        </Box>
    );
}

export default Ellipse;
