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
        <meshBasicMaterial color="#ff6520" transparent opacity={0.9} />
      </mesh>

      {/* Rock formations */}
      {[
        { pos: [-3, 0, -2], color: "#5d3f3f" },
        { pos: [3, -0.5, -1], color: "#6d4a4a" },
        { pos: [0, 0.5, 3], color: "#5d3f3f" },
        { pos: [-2, -1, 3], color: "#6d4a4a" },
        { pos: [4, 0, 2], color: "#5d3f3f" },
      ].map((rock, i) => (
        <mesh key={i} position={rock.pos as [number, number, number]} castShadow>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={rock.color} flatShading roughness={0.85} />
        </mesh>
      ))}

      {/* Demon Firesage arena */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[2.5, 3, 1, 6]} />
        <meshStandardMaterial color="#6d5d5d" flatShading roughness={0.8} />
      </mesh>

      {/* Centipede Demon bridge */}
      <mesh position={[-3, -1, -4]} rotation={[0, 0.5, 0]}>
        <boxGeometry args={[3, 0.3, 1.5]} />
        <meshStandardMaterial color="#7d6d6d" flatShading roughness={0.75} />
      </mesh>

      {/* Lost Izalith entrance */}
      <mesh position={[0, -1.5, 5]}>
        <boxGeometry args={[2, 2, 1]} />
        <meshStandardMaterial color="#4d4d4d" flatShading roughness={0.85} />
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
            <meshStandardMaterial color="#7a6a5a" flatShading roughness={0.85} />
          </mesh>
        ))}
      </group>

      {/* Fire effects - enhanced */}
      <pointLight ref={fireRef} position={[0, 3, 0]} color="#ff8855" intensity={2} distance={18} />
      <pointLight position={[-3, 1, 0]} color="#ff6530" intensity={1} distance={10} />
      <pointLight position={[3, 1, 0]} color="#ff6530" intensity={1} distance={10} />

      {/* Capra Demon statues */}
      {[[-4, 1, 0], [4, 1, 0]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <boxGeometry args={[0.8, 2, 0.8]} />
          <meshStandardMaterial color="#8d7d7d" flatShading roughness={0.75} />
        </mesh>
      ))}
    </group>
  );
};
