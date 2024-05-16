import React from 'react';
import { Box } from '@mui/material';

function Ellipse({ x, y, width, height, detail, scale }) {
    const offsetX = 0.02 * scale;
    const offsetY = 0.02 * scale;

    return (
        <Box
            border="5px solid green"
            zIndex="900"
            style={{
                position: 'absolute',
                left: x + offsetX,
                top: y + offsetY,
                width: width,
                height: height,
                borderRadius: '50%',
                // backgroundColor: 'green'
                fill: 'none',

            }}
        >
            {/* Add ellipse detail if needed */}
        </Box>
    );
}

export default Ellipse;
