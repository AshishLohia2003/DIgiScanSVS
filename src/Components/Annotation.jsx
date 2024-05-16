import React from 'react';
import { Box, IconButton } from '@mui/material';
import { GiGolfFlag } from "react-icons/gi";
import Arrow from '../shapes/Arrow';
import Position from '../shapes/Position';
import Ellipse from '../shapes/Ellipse';
import Rectangle from '../shapes/Rectangle';
import Line from '../shapes/Line';
import Polygon from '../shapes/Polygon';

function Annotations({ annotations, width, height, mifwidth, mifheight, zoomLevel, scale_image }) {
    return (
        <React.Fragment>
            {annotations.map((annotation, index) => {
                const x = parseFloat(annotation.x);
                const y = parseFloat(annotation.y);
                const w = parseFloat(annotation.w);
                const h = parseFloat(annotation.h);
                const detail = annotation.description;
                const type = annotation.type;
                const subtype = annotation.subtype;
                const points = annotation.positions;
                // console.log(points)
                const scale = annotation.scale;
                let adjustedX, adjustedY, adjustedW, adjustedH;
                if ((mifwidth / mifheight) > 1) {
                    adjustedX = (width / mifwidth) * parseFloat(x);
                    adjustedW = (width / mifwidth) * parseFloat(w);
                    adjustedH = (width / mifwidth) * parseFloat(h);
                    adjustedY = (width / mifwidth) * parseFloat(y);
                }
                else {
                    adjustedX = (height / mifheight) * parseFloat(x);
                    adjustedW = (height / mifheight) * parseFloat(w);
                    adjustedY = (height / mifheight) * parseFloat(y);
                    adjustedH = (height / mifheight) * parseFloat(h);
                }

                switch (type) {
                    case 'Point2':
                        switch (subtype) {
                            case '1':
                                return (
                                    <Arrow
                                        key={index}
                                        x1={adjustedX}
                                        y1={adjustedY}
                                        x2={adjustedX + adjustedW}
                                        y2={adjustedY + adjustedH}
                                        detail={detail}
                                        scale={scale}
                                        scale_image={scale_image}
                                        width={width}
                                    />
                                );
                            case '5': // Position
                                return (
                                    // <Box key={index} style={{ position: 'absolute', left: adjustedX, top: adjustedY }}>
                                    //     <IconButton>
                                    //         <GiGolfFlag color='red' fontSize={("12px" * zoomLevel)} />
                                    //     </IconButton>
                                    //     <Box fontSize={"12px"} bgcolor="#fff" p="2px" borderRadius="5px" border="2px solid grey">
                                    //         {detail}
                                    //     </Box>
                                    // </Box>
                                    <Position x={adjustedX} y={adjustedY} detail={detail} zoomLevel={zoomLevel} scale={scale} width={width} />
                                );
                            case '3': // Ellipse
                                // Rendering logic for ellipse
                                return (
                                    <Ellipse x={adjustedX} y={adjustedY} detail={detail} width={adjustedW} height={adjustedH} scale={width} />
                                );
                            case '2': // Rectangle
                                // Rendering logic for rectangle
                                return (
                                    <Rectangle x={adjustedX} y={adjustedY} detail={detail} width={adjustedW} height={adjustedH} scale={width} />
                                );
                            case '0': // Line
                                // Rendering logic for line
                                return (
                                    <Line
                                        x1={adjustedX}
                                        y1={adjustedY}
                                        x2={adjustedX + adjustedW}
                                        y2={adjustedY + adjustedH}
                                        detail={detail}
                                        width={width}
                                    />
                                );
                            default:
                                return null;
                        }
                    case 'Pointn':
                        switch (subtype) {
                            case '2': // Polygon
                                // Rendering logic for polygon
                                return (
                                    <Box>
                                        <Polygon points={points} mifheight={mifheight} mifwidth={mifwidth} width={width} height={height} /> 
                                        {/* Hello */}
                                    </Box>
                                );
                            default:
                                return null;
                        }
                    default:
                        return null;
                }
            })}
        </React.Fragment>
    );
}

export default Annotations;


