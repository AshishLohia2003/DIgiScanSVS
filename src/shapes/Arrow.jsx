import React from 'react';
import { Box } from '@mui/material';

function Arrow({ x1, y1, x2, y2, scale, scale_image, width }) {
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const arrowHeadSize = 8;    

    return (
        <Box >
            <Box
                position="absolute" left={x1} top={y1}
                style={{
                    width: length,
                    height: '2px',
                    backgroundColor: 'red',
                    transformOrigin: '0 0',
                    transform: `rotate(${angle}deg)`,
                }}
            />
            <Box
                position="absolute" left={x1} top={y1}
                style={{
                    width: 0,
                    height: 0,
                    borderLeft: `${arrowHeadSize / 2}px solid transparent`,
                    borderRight: `${arrowHeadSize / 2}px solid transparent`,
                    borderTop: `${arrowHeadSize}px solid red`,
                    transform: `rotate(${angle - 30}deg) translateX(-25%) translateY(-2%)`,
                    transformOrigin: '0 0'
                }}
            />
        </Box>
    );
}

export default Arrow;
