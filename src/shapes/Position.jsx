import React from 'react';
import { Box } from '@mui/material';
import { GiGolfFlag } from 'react-icons/gi';

function Position({ x, y, detail, zoomLevel, scale, width }) {
    const offsetX = 0.02 * width;
    const offsetY = 0.02 * width;

    return (
        <Box>
            {/* Position marker */}
            <Box
                style={{
                    position: 'absolute',
                    left: `${x + offsetX}px`,
                    top: `${y + offsetY}px`,
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: "2px solid black"
                }}
            />
            {/* Flag icon */}
            <Box
                style={{
                    position: 'absolute',
                    left: `${(x + offsetX) - 4}px`,
                    top: `${(y + offsetY) - 15}px`,
                }}
            >
                <GiGolfFlag color='red' fontSize="25px" />
            </Box>
            {/* Detail box */}
            <Box
                style={{
                    position: 'absolute',
                    left: `${(x + offsetX) + 10}px`,
                    top: `${(y + offsetY) + 15}px`,
                }}
                width='fit-content'
                fontSize="12px"
                color="blue"
                bgcolor="aliceblue"
                p="2px"
                borderRadius="5px"
                border="2px solid grey"
                fontWeight="800"
                zIndex="1000"
            >
                {detail}
            </Box>
        </Box>
    );
}

export default Position;
