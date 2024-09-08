import React, { useEffect, useState } from 'react';
import '../Background.css';

function Background() {
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    const shapeTypes = ['hexagon', 'circle', 'triangle', 'square'];
    const newShapes = [];

    for (let i = 0; i < 20; i++) {
      const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      const size = Math.random() * 50 + 50; // Random size between 50 and 100
      const left = Math.random() * 100; // Random position
      const top = Math.random() * 100;
      const animationDuration = Math.random() * 20 + 10; // Random duration between 10 and 30 seconds

      newShapes.push({
        type,
        style: {
          left: `${left}%`,
          top: `${top}%`,
          width: `${size}px`,
          height: `${size}px`,
          animation: `float ${animationDuration}s infinite alternate`
        }
      });
    }

    setShapes(newShapes);
  }, []);

  return (
    <div className="background">
      {shapes.map((shape, index) => (
        <div
          key={index}
          className={`shape ${shape.type}`}
          style={shape.style}
        />
      ))}
    </div>
  );
}

export default Background;