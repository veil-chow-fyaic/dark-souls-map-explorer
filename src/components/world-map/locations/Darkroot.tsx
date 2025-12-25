import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  onHover: () => void;
  onUnhover: () => void;
}

export const Darkroot = ({ onHover, onUnhover }: Props) => {
  const butterflyRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (butterflyRef.current) {
      butterflyRef.current.position.y = 3 + Math.sin(state.clock.elapsedTime) * 0.5;
      butterflyRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={[-8, 2, -5]} onPointerOver={onHover} onPointerOut={onUnhover}>
      {/* Forest floor */}
      <mesh position={[0, -1, 0]} receiveShadow>
        <cylinderGeometry args={[5, 6, 2, 8]} />
        <meshStandardMaterial color="#1a3a1a" flatShading />
      </mesh>

      {/* Giant trees */}
      {[
        [-2, 0, -2],
        [2, 0, -1],
        [-1, 0, 2],
        [1.5, 0, 2.5],
        [-3, 0, 0],
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          {/* Trunk */}
          <mesh position={[0, 2, 0]} castShadow>
            <cylinderGeometry args={[0.3, 0.5, 4 + Math.random() * 2, 5]} />
            <meshStandardMaterial color="#3d2817" flatShading />
          </mesh>
          {/* Foliage */}
          <mesh position={[0, 5 + Math.random(), 0]}>
            <icosahedronGeometry args={[1.5 + Math.random() * 0.5, 0]} />
            <meshStandardMaterial color="#1e5128" flatShading />
          </mesh>
        </group>
      ))}

      {/* Moonlight Butterfly arena */}
      <mesh position={[0, 1, -3.5]}>
        <boxGeometry args={[3, 0.3, 2]} />
        <meshStandardMaterial color="#3d3d3d" flatShading />
      </mesh>

      {/* Moonlight Butterfly (simplified) */}
      <group ref={butterflyRef} position={[0, 3, -3.5]}>
        <mesh>
          <coneGeometry args={[0.3, 0.8, 3]} />
          <meshBasicMaterial color="#87ceeb" transparent opacity={0.7} />
        </mesh>
        <mesh position={[0.5, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
          <planeGeometry args={[1, 0.5]} />
          <meshBasicMaterial color="#add8e6" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[-0.5, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <planeGeometry args={[1, 0.5]} />
          <meshBasicMaterial color="#add8e6" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
        <pointLight color="#87ceeb" intensity={1} distance={5} />
      </group>

      {/* Sif's arena hint */}
      <mesh position={[-2, 0.5, 3]}>
        <boxGeometry args={[2, 1, 2]} />
        <meshStandardMaterial color="#2d3d2d" flatShading />
      </mesh>

      {/* Forest ambient lighting */}
      <pointLight position={[0, 3, 0]} color="#2f4f2f" intensity={0.5} distance={10} />
    </group>
  );
};
