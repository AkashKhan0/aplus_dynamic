import React, { useEffect, useState } from "react";
import "./fireflies.css";

const LampLights = ({ count = 5 }) => {
  const [lamps, setLamps] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: count }, () => ({
      top: Math.random() * 100,  // % of screen height
      left: Math.random() * 100, // % of screen width
      size: 200 + Math.random() * 100 // px
    }));
    setLamps(generated);
  }, [count]);

  return (
    <div className="lamp-container">
      {lamps.map((lamp, index) => (
        <div
          key={index}
          className="lamp-light"
          style={{
            top: `${lamp.top}%`,
            left: `${lamp.left}%`,
            width: `${lamp.size}px`,
            height: `${lamp.size}px`
          }}
        ></div>
      ))}
    </div>
  );
};

export default LampLights;