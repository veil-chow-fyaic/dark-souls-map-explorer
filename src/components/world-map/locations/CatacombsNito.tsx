import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  onHover: () => void;
  onUnhover: () => void;
}

export const CatacombsNito = ({ onHover, onUnhover }: Props) => {
  const soulLightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (soulLightRef.current) {
      soulLightRef.current.intensity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <group position={[5, -10, -8]} onPointerOver={onHover} onPointerOut={onUnhover}>
      {/* Cave entrance */}
      <mesh position={[0, 2, 0]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[3, 4, 4, 6]} />
        <meshStandardMaterial color="#2d2d2d" flatShading />
      </mesh>

      {/* Tomb of Giants area */}
      <mesh position={[0, -2, 0]} receiveShadow>
        <boxGeometry args={[8, 4, 6]} />
        <meshStandardMaterial color="#1a1a1a" flatShading />
      </mesh>

      {/* Giant skeleton remains */}
      {[
        [-2, 0, -1],
        [2, 0.5, 1],
        [0, -0.5, 2],
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          {/* Skull */}
          <mesh position={[0, 0.5, 0]}>
            <sphereGeometry args={[0.4, 5, 4]} />
            <meshStandardMaterial color="#e8e8dc" flatShading />
          </mesh>
          {/* Ribcage */}
          <mesh position={[0, 0, 0.3]} rotation={[0.5, 0, 0]}>
            <boxGeometry args={[0.6, 0.8, 0.3]} />
            <meshStandardMaterial color="#d8d8cc" flatShading />
          </mesh>
        </group>
      ))}

      {/* Nito's chamber */}
      <mesh position={[0, -4, -2]}>
        <boxGeometry args={[5, 3, 4]} />
        <meshStandardMaterial color="#0f0f0f" flatShading />
      </mesh>

      {/* Nito representation (mass of bones) */}
      <group position={[0, -3.5, -2]}>
        <mesh>
          <icosahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial color="#1a1a1a" flatShading />
        </mesh>
        {/* Soul glow */}
        <pointLight ref={soulLightRef} color="#4a90a4" intensity={0.5} distance={5} />
      </group>

      {/* Coffins */}
      {[-3, 3].map((x, i) => (
        <mesh key={i} position={[x, -1, -2]} rotation={[0, Math.random() * 0.5, 0]}>
          <boxGeometry args={[0.8, 0.4, 1.8]} />
          <meshStandardMaterial color="#3d3d3d" flatShading />
        </mesh>
      ))}

      {/* Wheel skeleton path indicator */}
      <mesh position={[3, 1, 2]}>
        <ringGeometry args={[0.5, 0.7, 8]} />
        <meshStandardMaterial color="#4a4a4a" side={THREE.DoubleSide} />
      </mesh>

      {/* Dark atmosphere */}
      <pointLight position={[0, 0, 0]} color="#2a2a4a" intensity={0.2} distance={10} />
    </group>
  );
};
