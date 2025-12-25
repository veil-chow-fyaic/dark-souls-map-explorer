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
        <meshStandardMaterial color="#5d5d5d" flatShading roughness={0.85} />
      </mesh>

      {/* Tomb of Giants area */}
      <mesh position={[0, -2, 0]} receiveShadow>
        <boxGeometry args={[8, 4, 6]} />
        <meshStandardMaterial color="#3a3a3a" flatShading roughness={0.9} />
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
            <meshStandardMaterial color="#f0f0e4" flatShading roughness={0.6} />
          </mesh>
          {/* Ribcage */}
          <mesh position={[0, 0, 0.3]} rotation={[0.5, 0, 0]}>
            <boxGeometry args={[0.6, 0.8, 0.3]} />
            <meshStandardMaterial color="#e8e8dc" flatShading roughness={0.6} />
          </mesh>
        </group>
      ))}

      {/* Nito's chamber */}
      <mesh position={[0, -4, -2]}>
        <boxGeometry args={[5, 3, 4]} />
        <meshStandardMaterial color="#2f2f2f" flatShading roughness={0.9} />
      </mesh>

      {/* Nito representation (mass of bones) */}
      <group position={[0, -3.5, -2]}>
        <mesh>
          <icosahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial color="#3a3a3a" flatShading roughness={0.85} />
        </mesh>
        {/* Soul glow */}
        <pointLight ref={soulLightRef} color="#6ab0c4" intensity={1} distance={8} />
      </group>

      {/* Coffins */}
      {[-3, 3].map((x, i) => (
        <mesh key={i} position={[x, -1, -2]} rotation={[0, i * 0.3, 0]}>
          <boxGeometry args={[0.8, 0.4, 1.8]} />
          <meshStandardMaterial color="#5d5d5d" flatShading roughness={0.8} />
        </mesh>
      ))}

      {/* Wheel skeleton path indicator */}
      <mesh position={[3, 1, 2]}>
        <ringGeometry args={[0.5, 0.7, 8]} />
        <meshStandardMaterial color="#7a7a7a" side={THREE.DoubleSide} roughness={0.7} />
      </mesh>

      {/* Dark atmosphere - enhanced */}
      <pointLight position={[0, 1, 0]} color="#5a6a8a" intensity={0.6} distance={15} />
    </group>
  );
};
