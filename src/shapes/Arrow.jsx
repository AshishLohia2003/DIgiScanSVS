import React from 'react';
import { Box } from '@mui/material';

function Arrow({ x1, y1, x2, y2, detail }) {
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

    return (
        <>
            <Box
                style={{
                    position: 'absolute',
                    left: x1,
                    top: y1,
                    width: length,
                    height: '3px',
                    backgroundColor: 'red',
                    transformOrigin: '0 0',
                    transform: `rotate(${angle}deg)`
                }}
            />
            <Box
                style={{
                    position: 'absolute',
                    left: x1,
                    top: y1,
                    width: 0,
                    height: 0,
                    borderLeft: '10px solid transparent',
                    borderRight: '10px solid transparent',
                    borderTop: '20px solid red',
                    transform: `rotate(${angle - 30}deg) translateX(-50%) translateY(-50%)`,
                    transformOrigin: '0 0',
                }}
            />
        </>
    );
}

export default Arrow;
