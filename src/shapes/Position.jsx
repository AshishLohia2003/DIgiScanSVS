import React from 'react';
import { Box, IconButton } from '@mui/material';
import { GiGolfFlag } from 'react-icons/gi';

function Position({ x, y, detail, zoomLevel }) {
    // console.log('x',x)
    // console.log('y',y)  
    return (
        <Box>
            <Box
                style={{
                    position: 'absolute',
                    // left: "3623.26px",
                    left: x,
                    top: y,
                    width: '12px',
                    height: '12px',
                    // backgroundColor: 'blue',
                    borderRadius: '50%',
                    border: "2px solid black"
                }}
            >
            </Box>
            <Box
                style={{
                    position: 'absolute',
                    left: x - 4,
                    top: y - 15,
                }}
            >
                <GiGolfFlag color='red' fontSize={("25px")} />

            </Box>
            <Box
                style={{
                    position: 'absolute',
                    left: x + 10,
                    top: y + 15,
                }}
                width='fit-content'
                fontSize={"12px"}
                color="blue"
                bgcolor="aliceblue"
                p="2px"
                borderRadius="5px"
                border="2px solid grey"
                fontWeight="800"
            >
                {detail}
            </Box>
        </Box>
    );
}

export default Position;
