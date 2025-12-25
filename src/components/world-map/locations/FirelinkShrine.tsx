import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  onHover: () => void;
  onUnhover: () => void;
}

export const FirelinkShrine = ({ onHover, onUnhover }: Props) => {
  const bonfireRef = useRef<THREE.PointLight>(null);
  const flameRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (bonfireRef.current) {
      bonfireRef.current.intensity = 1.5 + Math.sin(state.clock.elapsedTime * 3) * 0.5;
    }
    if (flameRef.current) {
      flameRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 5) * 0.2;
      flameRef.current.rotation.y += 0.02;
    }
  });

  return (
    <group position={[0, 0, 0]} onPointerOver={onHover} onPointerOut={onUnhover}>
      {/* Main platform */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <cylinderGeometry args={[4, 5, 1, 8]} />
        <meshStandardMaterial color="#2d3436" flatShading />
      </mesh>

      {/* Ruined pillars */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI * 2) / 5) * 3.5,
            0.5 + Math.random() * 1.5,
            Math.sin((i * Math.PI * 2) / 5) * 3.5,
          ]}
          castShadow
        >
          <boxGeometry args={[0.5, 1 + Math.random() * 2, 0.5]} />
          <meshStandardMaterial color="#4a5568" flatShading />
        </mesh>
      ))}

      {/* Central bonfire structure */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.3, 0.5, 0.6, 6]} />
        <meshStandardMaterial color="#1a1a2e" flatShading />
      </mesh>

      {/* Sword in bonfire */}
      <mesh position={[0, 1.2, 0]} rotation={[0.1, 0, 0.1]}>
        <boxGeometry args={[0.08, 1.5, 0.02]} />
        <meshStandardMaterial color="#636e72" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Flame effect */}
      <mesh ref={flameRef} position={[0, 0.8, 0]}>
        <coneGeometry args={[0.3, 0.8, 4]} />
        <meshBasicMaterial color="#ff6b35" transparent opacity={0.8} />
      </mesh>

      {/* Bonfire light */}
      <pointLight
        ref={bonfireRef}
        position={[0, 1, 0]}
        color="#ff6b35"
        intensity={2}
        distance={8}
        castShadow
      />

      {/* Stairs going down to New Londo */}
      <mesh position={[-2, -1, 2]} rotation={[0.3, 0.5, 0]}>
        <boxGeometry args={[1.5, 0.3, 3]} />
        <meshStandardMaterial color="#3d3d3d" flatShading />
      </mesh>

      {/* Elevator to Undead Parish area marker */}
      <mesh position={[2, 0.5, -1.5]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#4a5568" flatShading />
      </mesh>
    </group>
  );
};
