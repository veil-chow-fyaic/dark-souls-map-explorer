import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  onHover: () => void;
  onUnhover: () => void;
}

export const DemonRuins = ({ onHover, onUnhover }: Props) => {
  const lavaRef = useRef<THREE.Mesh>(null);
  const fireRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (lavaRef.current) {
      (lavaRef.current.material as THREE.MeshBasicMaterial).opacity = 
        0.7 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
    if (fireRef.current) {
      fireRef.current.intensity = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.3;
    }
  });

  return (
    <group position={[5, -13, 12]} onPointerOver={onHover} onPointerOut={onUnhover}>
      {/* Lava lake */}
      <mesh ref={lavaRef} position={[0, -2, 0]} receiveShadow>
        <cylinderGeometry args={[6, 7, 1, 8]} />
        <meshBasicMaterial color="#ff4500" transparent opacity={0.8} />
      </mesh>

      {/* Rock formations */}
      {[
        { pos: [-3, 0, -2], scale: [2, 3, 2] },
        { pos: [3, -0.5, -1], scale: [1.8, 2.5, 1.8] },
        { pos: [0, 0.5, 3], scale: [2.5, 3.5, 2] },
        { pos: [-2, -1, 3], scale: [1.5, 2, 1.5] },
        { pos: [4, 0, 2], scale: [2, 2.8, 1.8] },
      ].map((rock, i) => (
        <mesh key={i} position={rock.pos as [number, number, number]} castShadow>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#2d1f1f" flatShading />
        </mesh>
      ))}

      {/* Demon Firesage arena */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[2.5, 3, 1, 6]} />
        <meshStandardMaterial color="#3d2d2d" flatShading />
      </mesh>

      {/* Centipede Demon bridge */}
      <mesh position={[-3, -1, -4]} rotation={[0, 0.5, 0]}>
        <boxGeometry args={[3, 0.3, 1.5]} />
        <meshStandardMaterial color="#4d3d3d" flatShading />
      </mesh>

      {/* Lost Izalith entrance */}
      <mesh position={[0, -1.5, 5]}>
        <boxGeometry args={[2, 2, 1]} />
        <meshStandardMaterial color="#1d1d1d" flatShading />
      </mesh>

      {/* Bed of Chaos hint (roots) */}
      <group position={[0, 0, 6]}>
        {[0, 1, 2].map((i) => (
          <mesh
            key={i}
            position={[(i - 1) * 1.5, 0.5, 0]}
            rotation={[0.3, i * 0.5, 0]}
          >
            <cylinderGeometry args={[0.15, 0.25, 2, 4]} />
            <meshStandardMaterial color="#4a3a2a" flatShading />
          </mesh>
        ))}
      </group>

      {/* Fire effects */}
      <pointLight ref={fireRef} position={[0, 2, 0]} color="#ff6b35" intensity={1.5} distance={12} />
      <pointLight position={[-3, 0, 0]} color="#ff4500" intensity={0.5} distance={6} />
      <pointLight position={[3, 0, 0]} color="#ff4500" intensity={0.5} distance={6} />

      {/* Capra Demon statues */}
      {[[-4, 1, 0], [4, 1, 0]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <boxGeometry args={[0.8, 2, 0.8]} />
          <meshStandardMaterial color="#5d4d4d" flatShading />
        </mesh>
      ))}
    </group>
  );
};
