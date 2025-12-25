import { useMemo } from "react";
import * as THREE from "three";

// Define connection points between areas
const connections = [
  // Firelink to connected areas
  { from: [0, 0, 0], to: [6, 3, -3], color: "#ff6b35" }, // Firelink -> Undead Burg
  { from: [0, 0, 0], to: [-6, -3, 5], color: "#4a6a9a" }, // Firelink -> New Londo
  { from: [0, 0, 0], to: [5, -10, -8], color: "#4a4a6a" }, // Firelink -> Catacombs

  // Undead Burg to Undead Parish
  { from: [6, 3, -3], to: [10, 7, -6], color: "#636e72" },

  // Undead Parish connections
  { from: [10, 7, -6], to: [-8, 2, -5], color: "#2f4f2f" }, // Parish -> Darkroot
  { from: [10, 7, -6], to: [15, 10, -2], color: "#636e72" }, // Parish -> Sen's Fortress

  // Sen's Fortress to Anor Londo
  { from: [15, 10, -2], to: [20, 18, 0], color: "#ffd700" },

  // Darkroot to Blighttown (via Valley of Drakes)
  { from: [-8, 2, -5], to: [0, -6, 8], color: "#3a5a40" },

  // Blighttown to Demon Ruins
  { from: [0, -6, 8], to: [5, -13, 12], color: "#ff4500" },

  // Catacombs to Tomb of Giants (already in same component)

  // New Londo to Abyss (implied vertical)
];

export const Connections = () => {
  const curves = useMemo(() => {
    return connections.map((conn) => {
      const start = new THREE.Vector3(...(conn.from as [number, number, number]));
      const end = new THREE.Vector3(...(conn.to as [number, number, number]));
      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      // Add some curve to the connection
      mid.y += Math.abs(end.y - start.y) * 0.3 + 1;
      
      return {
        curve: new THREE.QuadraticBezierCurve3(start, mid, end),
        color: conn.color,
      };
    });
  }, []);

  return (
    <group>
      {curves.map((curveData, i) => {
        const points = curveData.curve.getPoints(20);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        return (
          <line key={i}>
            <bufferGeometry attach="geometry" {...geometry} />
            <lineBasicMaterial
              attach="material"
              color={curveData.color}
              transparent
              opacity={0.4}
              linewidth={1}
            />
          </line>
        );
      })}
    </group>
  );
};
