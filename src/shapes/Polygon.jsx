import React from 'react';

function Polygon({ points, mifwidth, mifheight, width, height }) {
    const adjustCoordinates = (x, y) => {
        let adjustedX, adjustedY;
        if ((mifwidth / mifheight) > 1) {
            adjustedX = (width / mifwidth) * parseFloat(x);
            adjustedY = (height / mifheight) * parseFloat(y);
        } else {
            adjustedX = (width / mifwidth) * parseFloat(x);
            adjustedY = (height / mifheight) * parseFloat(y);
        }
        return { adjustedX, adjustedY };
    };

    const adjustedPoints = points.map(point => {
        const { adjustedX, adjustedY } = adjustCoordinates(point.x, point.y);
        return `${adjustedX},${adjustedY}`;
    }).join(' ');

    const closedPoints = adjustedPoints + ` ${adjustedPoints.split(' ')[0]}`;

    const xCoords = points.map(point => adjustCoordinates(point.x, point.y).adjustedX);
    const yCoords = points.map(point => adjustCoordinates(point.x, point.y).adjustedY);
    const minX = Math.min(...xCoords);
    const maxX = Math.max(...xCoords);
    const minY = Math.min(...yCoords);
    const maxY = Math.max(...yCoords);

    const viewBoxWidth = maxX - minX;
    const viewBoxHeight = maxY - minY;

    return (
        <svg
            style={{ position: 'absolute', left: minX, top: minY }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`${minX} ${minY} ${viewBoxWidth} ${viewBoxHeight}`}
            width={viewBoxWidth}
            height={viewBoxHeight}
        >
            <polygon points={closedPoints} fill="none" stroke="black" strokeWidth="5" />
        </svg>
    );
}



export default Polygon;
