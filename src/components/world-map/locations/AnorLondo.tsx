import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  onHover: () => void;
  onUnhover: () => void;
}

export const AnorLondo = ({ onHover, onUnhover }: Props) => {
  const sunlightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (sunlightRef.current) {
      sunlightRef.current.intensity = 1.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <group position={[20, 18, 0]} onPointerOver={onHover} onPointerOut={onUnhover}>
      {/* City platform */}
      <mesh position={[0, -2, 0]} receiveShadow>
        <boxGeometry args={[10, 2, 8]} />
        <meshStandardMaterial color="#c9b896" flatShading />
      </mesh>

      {/* Main cathedral */}
      <mesh position={[0, 3, 0]} castShadow>
        <boxGeometry args={[5, 6, 4]} />
        <meshStandardMaterial color="#d4c5a9" flatShading />
      </mesh>

      {/* Cathedral spires */}
      {[-1.5, 1.5].map((x, i) => (
        <group key={i} position={[x, 6, 0]}>
          <mesh position={[0, 2, 0]} castShadow>
            <boxGeometry args={[1, 4, 1]} />
            <meshStandardMaterial color="#c9b896" flatShading />
          </mesh>
          <mesh position={[0, 5, 0]}>
            <coneGeometry args={[0.8, 2, 4]} />
            <meshStandardMaterial color="#b8a882" flatShading />
          </mesh>
        </group>
      ))}

      {/* Central dome */}
      <mesh position={[0, 7, 0]}>
        <sphereGeometry args={[2, 6, 4, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#e8dcc8" flatShading />
      </mesh>

      {/* Flying buttresses (simplified) */}
      {[-2.5, 2.5].map((x, i) => (
        <mesh key={i} position={[x, 2, -2.5]} rotation={[0.5, i === 0 ? 0.3 : -0.3, 0]}>
          <boxGeometry args={[0.3, 3, 0.3]} />
          <meshStandardMaterial color="#c9b896" flatShading />
        </mesh>
      ))}

      {/* Ornstein & Smough's chamber */}
      <mesh position={[0, 1, 2.5]} castShadow>
        <boxGeometry args={[3, 2, 2]} />
        <meshStandardMaterial color="#b8a882" flatShading />
      </mesh>

      {/* Side buildings */}
      {[
        { pos: [-4, 0.5, -2], size: [2, 2, 2] },
        { pos: [4, 0.5, -2], size: [2, 2, 2] },
        { pos: [-3.5, 0.5, 2], size: [1.5, 2, 1.5] },
        { pos: [3.5, 0.5, 2], size: [1.5, 2, 1.5] },
      ].map((building, i) => (
        <mesh key={i} position={building.pos as [number, number, number]} castShadow>
          <boxGeometry args={building.size as [number, number, number]} />
          <meshStandardMaterial color="#c9b896" flatShading />
        </mesh>
      ))}

      {/* Golden sunlight effect */}
      <pointLight
        ref={sunlightRef}
        position={[0, 10, 0]}
        color="#ffd700"
        intensity={2}
        distance={20}
      />

      {/* Gwyndolin's tomb entrance (down) */}
      <mesh position={[0, -1.5, -3]}>
        <boxGeometry args={[1.5, 1, 1.5]} />
        <meshStandardMaterial color="#4a4a6a" flatShading />
      </mesh>

      {/* Painted World portal hint */}
      <mesh position={[-4.5, 1.5, 0]} rotation={[0, 0.3, 0]}>
        <planeGeometry args={[1, 1.5]} />
        <meshBasicMaterial color="#6a4a8a" transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};
