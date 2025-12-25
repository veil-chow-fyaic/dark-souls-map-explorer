import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  onHover: () => void;
  onUnhover: () => void;
}

export const Blighttown = ({ onHover, onUnhover }: Props) => {
  const swampRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (swampRef.current) {
      swampRef.current.position.y = -10 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group position={[0, -6, 8]} onPointerOver={onHover} onPointerOut={onUnhover}>
      {/* Toxic swamp */}
      <mesh ref={swampRef} position={[0, -4, 0]} receiveShadow>
        <cylinderGeometry args={[6, 7, 1, 8]} />
        <meshStandardMaterial color="#3a5a40" flatShading transparent opacity={0.8} />
      </mesh>

      {/* Wooden scaffolding */}
      {[
        { pos: [-3, 0, -2], height: 6 },
        { pos: [2, -1, -1], height: 5 },
        { pos: [-1, -2, 2], height: 4 },
        { pos: [3, 0, 2], height: 5 },
      ].map((scaffold, i) => (
        <group key={i} position={scaffold.pos as [number, number, number]}>
          {/* Vertical beams */}
          <mesh position={[0, scaffold.height / 2, 0]}>
            <boxGeometry args={[0.2, scaffold.height, 0.2]} />
            <meshStandardMaterial color="#5c4033" flatShading />
          </mesh>
          <mesh position={[0.8, scaffold.height / 2, 0]}>
            <boxGeometry args={[0.2, scaffold.height, 0.2]} />
            <meshStandardMaterial color="#5c4033" flatShading />
          </mesh>
          {/* Horizontal platforms */}
          <mesh position={[0.4, scaffold.height * 0.3, 0]}>
            <boxGeometry args={[1.5, 0.15, 0.8]} />
            <meshStandardMaterial color="#654321" flatShading />
          </mesh>
          <mesh position={[0.4, scaffold.height * 0.7, 0]}>
            <boxGeometry args={[1.5, 0.15, 0.8]} />
            <meshStandardMaterial color="#654321" flatShading />
          </mesh>
        </group>
      ))}

      {/* Quelaag's Domain entrance */}
      <mesh position={[0, -3.5, 4]} rotation={[-0.3, 0, 0]}>
        <cylinderGeometry args={[1.5, 2, 2, 6]} />
        <meshStandardMaterial color="#2d2d2d" flatShading />
      </mesh>

      {/* Spider web hints */}
      <mesh position={[0, -2.5, 4.5]} rotation={[-0.5, 0, 0]}>
        <ringGeometry args={[0.5, 1.2, 6]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>

      {/* Poison fog effect */}
      <pointLight position={[0, -3, 0]} color="#7cfc00" intensity={0.3} distance={8} />

      {/* Great Hollow entrance hint */}
      <mesh position={[-4, -3, -2]} rotation={[0, 0.5, 0]}>
        <cylinderGeometry args={[1, 1.5, 3, 5]} />
        <meshStandardMaterial color="#3d3d1d" flatShading />
      </mesh>
    </group>
  );
};
