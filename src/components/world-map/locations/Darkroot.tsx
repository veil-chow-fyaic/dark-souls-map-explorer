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
        <meshStandardMaterial color="#3a5a3a" flatShading roughness={0.9} />
      </mesh>

      {/* Giant trees */}
      {[
        { pos: [-2, 0, -2], h: 5 },
        { pos: [2, 0, -1], h: 6 },
        { pos: [-1, 0, 2], h: 4.5 },
        { pos: [1.5, 0, 2.5], h: 5.5 },
        { pos: [-3, 0, 0], h: 4 },
      ].map((tree, i) => (
        <group key={i} position={tree.pos as [number, number, number]}>
          {/* Trunk */}
          <mesh position={[0, 2, 0]} castShadow>
            <cylinderGeometry args={[0.3, 0.5, tree.h, 5]} />
            <meshStandardMaterial color="#6d4827" flatShading roughness={0.9} />
          </mesh>
          {/* Foliage */}
          <mesh position={[0, tree.h, 0]}>
            <icosahedronGeometry args={[1.5 + (i % 2) * 0.3, 0]} />
            <meshStandardMaterial color="#3e7138" flatShading roughness={0.8} />
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
