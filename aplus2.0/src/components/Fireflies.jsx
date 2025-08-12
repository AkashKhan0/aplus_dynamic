import React, { useEffect, useState } from "react";
import "./fireflies.css";

const Fireflies = ({ count = 30 }) => {
  const [fireflies, setFireflies] = useState([]);

  const random = (min, max) => Math.random() * (max - min) + min;

  useEffect(() => {
    // Initial fireflies
    const initialFlies = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: random(0, window.innerWidth),
      y: random(0, window.innerHeight),
      size: random(3, 5),
      duration: random(6, 10),
      glowDelay: random(0, 2)
    }));
    setFireflies(initialFlies);

    // Continuous subtle movement for each fly
    initialFlies.forEach((fly) => {
      const moveFly = () => {
        setFireflies((prev) =>
          prev.map((f) =>
            f.id === fly.id
              ? {
                  ...f,
                  x: Math.min(
                    Math.max(f.x + random(-200, 200), 0),
                    window.innerWidth
                  ),
                  y: Math.min(
                    Math.max(f.y + random(-200, 200), 0),
                    window.innerHeight
                  ),
                  duration: random(6, 10)
                }
              : f
          )
        );
      };

      // Always moving — just with slow intervals
      const intervalTime = random(4000, 7000);
      setTimeout(() => {
        moveFly();
        setInterval(moveFly, intervalTime);
      }, random(0, 3000));
    });
  }, [count]);

  return (
    <div className="fireflies-container">
      {fireflies.map((fly) => (
        <div
          key={fly.id}
          className="firefly"
          style={{
            left: `${fly.x}px`,
            top: `${fly.y}px`,
            width: `${fly.size}px`,
            height: `${fly.size}px`,
            transition: `left ${fly.duration}s ease-in-out, top ${fly.duration}s ease-in-out`,
            animationDelay: `${fly.glowDelay}s`
          }}
        />
      ))}
    </div>
  );
};

export default Fireflies;
