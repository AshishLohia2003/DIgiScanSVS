import React from 'react';

function Polygon({ points, mifwidth, mifheight, width, height }) {
    const adjustCoordinates = (x, y) => {
        let adjustedX, adjustedY;
        if ((mifwidth / mifheight) > 1) {
            adjustedX = (width / mifwidth) * parseFloat(x);
            adjustedY = (width / mifwidth) * parseFloat(y);
        } else {
            adjustedX = (height / mifheight) * parseFloat(x);
            adjustedY = (height / mifheight) * parseFloat(y);
        }
        return { adjustedX, adjustedY };
    };

    // Adjust coordinates and create a string representing the points for the polygon
    const adjustedPoints = points.map(point => {
        const { adjustedX, adjustedY } = adjustCoordinates(point.x, point.y);
        return `${adjustedX},${adjustedY}`;
    }).join(' ');

    // Add the first point again at the end to close the polygon
    const closedPoints = adjustedPoints + ` ${adjustedPoints.split(' ')[0]}`;

    // Calculate the min and max for x and y coordinates to adjust the viewBox
    const xCoords = points.map(point => adjustCoordinates(point.x, point.y).adjustedX);
    const yCoords = points.map(point => adjustCoordinates(point.x, point.y).adjustedY);
    const minX = Math.min(...xCoords);
    const maxX = Math.max(...xCoords);
    const minY = Math.min(...yCoords);
    const maxY = Math.max(...yCoords);

    const viewBoxWidth = maxX - minX;
    const viewBoxHeight = maxY - minY;
    const offsetX = 0.02 * width;
    const offsetY = 0.02 * width;

    return (
        <svg
            style={{ position: 'absolute', left: minX + offsetX, top: minY + offsetY }}
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
