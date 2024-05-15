import React from 'react';
import { Box } from '@mui/material';

function Polygon({ points, detail }) {
    const path = points.map(point => `${point.x},${point.y}`).join(' ');

    return (
        <Box
            as="svg"
            style={{
                position: 'absolute'
            }}
            viewBox={`0 0 100 100`}
            xmlns="http://www.w3.org/2000/svg"
        >
            <polygon points={path} fill="none" stroke="black" strokeWidth="2" />
            {/* Add polygon detail if needed */}
        </Box>
    );
}

export default Polygon;
