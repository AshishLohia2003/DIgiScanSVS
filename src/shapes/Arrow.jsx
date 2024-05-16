import React from 'react';
import { Box } from '@mui/material';

function Arrow({ x1, y1, x2, y2, scale, scale_image, width }) {
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const offsetX = 0.02 * width;
    const offsetY = 0.02 * width;
    const arrowoffsetX = 0.00001 * (width);
    // const offsetY = 0.03 * (y1);
    const arrowoffsetY = 0.00007 * (width);

    return (
        <Box >
            <Box
                position="absolute" left={x1 + offsetX} top={y1 + offsetY}
                style={{
                    width: length,
                    height: '2px',
                    backgroundColor: 'red',
                    transformOrigin: '0 0',
                    transform: `rotate(${angle}deg)`,
                }}
            />
            <Box
                position="absolute" left={x1 + offsetX} top={y1 + offsetY}
                ml={-arrowoffsetX} // Position the arrowhead at the end of the line
                mt={-arrowoffsetY} // Center vertically
                style={{
                    width: 0,
                    height: 0,
                    borderLeft: '10px solid transparent',
                    borderRight: '10px solid transparent',
                    borderTop: '20px solid red',
                    transform: `rotate(${angle - 30}deg)`,
                    transformOrigin: '0 0'
                }}
            />
        </Box>
    );
}

export default Arrow;
