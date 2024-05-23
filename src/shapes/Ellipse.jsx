import React from 'react';
import { Box } from '@mui/material';

function Ellipse({ x, y, width, height, detail, scale }) {

    return (
        <Box
            border="5px solid green"
            zIndex="900"
            style={{
                position: 'absolute',
                left: x,
                top: y,
                width: width,
                height: height,
                borderRadius: '50%',
                // backgroundColor: 'green'
                fill: 'none',

            }}
        >
        </Box>
    );
}

export default Ellipse;
