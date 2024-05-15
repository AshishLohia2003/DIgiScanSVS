import React from 'react';

function Polygon({ points }) {
    const path = points.map(point => `${point.x},${point.y}`).join(' ');

    return (
        <svg
            style={{
                position: 'absolute'
            }}
            xmlns="http://www.w3.org/2000/svg"
        >
            <polygon points={path} fill="none" stroke="black" strokeWidth="2" />
        </svg>
    );
}

export default Polygon;
