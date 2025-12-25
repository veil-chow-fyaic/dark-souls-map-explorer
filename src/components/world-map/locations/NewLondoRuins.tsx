import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  onHover: () => void;
  onUnhover: () => void;
}

export const NewLondoRuins = ({ onHover, onUnhover }: Props) => {
  const ghostRef = useRef<THREE.Mesh>(null);
  const waterRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ghostRef.current) {
      ghostRef.current.position.y = -1 + Math.sin(state.clock.elapsedTime) * 0.3;
      ghostRef.current.rotation.y += 0.02;
    }
    if (waterRef.current) {
      waterRef.current.position.y = -3 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group position={[-6, -3, 5]} onPointerOver={onHover} onPointerOut={onUnhover}>
      {/* Flooded area */}
      <mesh ref={waterRef} position={[0, -3, 0]} receiveShadow>
        <boxGeometry args={[8, 2, 6]} />
        <meshStandardMaterial color="#1a3a4a" flatShading transparent opacity={0.8} />
      </mesh>

      {/* Ruined buildings */}
      {[
        { pos: [-2, 0, -1.5], size: [2, 3, 2] },
        { pos: [2, -0.5, -1], size: [1.8, 2.5, 1.8] },
        { pos: [0, 0.5, 1.5], size: [2.5, 3.5, 2] },
        { pos: [-2.5, -1, 2], size: [1.5, 2, 1.5] },
      ].map((building, i) => (
        <mesh key={i} position={building.pos as [number, number, number]} castShadow>
          <boxGeometry args={building.size as [number, number, number]} />
          <meshStandardMaterial color="#3a4a5a" flatShading />
        </mesh>
      ))}

      {/* Broken walls */}
      {[
        { pos: [3.5, 0, 0], rot: [0, 0.2, 0.1] },
        { pos: [-3.5, -0.5, 0.5], rot: [0, -0.3, -0.1] },
      ].map((wall, i) => (
        <mesh
          key={i}
          position={wall.pos as [number, number, number]}
          rotation={wall.rot as [number, number, number]}
          castShadow
        >
          <boxGeometry args={[0.4, 3, 2]} />
          <meshStandardMaterial color="#4a5a6a" flatShading />
        </mesh>
      ))}

      {/* Ghost (Darkwraith hint) */}
      <mesh ref={ghostRef} position={[0, -1, 0]}>
        <coneGeometry args={[0.5, 1.5, 4]} />
        <meshBasicMaterial color="#4a6a8a" transparent opacity={0.4} />
      </mesh>

      {/* Four Kings abyss entrance */}
      <mesh position={[0, -4.5, 0]}>
        <cylinderGeometry args={[1.5, 2, 2, 6]} />
        <meshStandardMaterial color="#0a0a1a" flatShading />
      </mesh>
      <pointLight position={[0, -5, 0]} color="#2a2a4a" intensity={0.3} distance={4} />

      {/* Stairs up to Firelink */}
      <mesh position={[3, 0.5, 2.5]} rotation={[-0.4, -0.5, 0]}>
        <boxGeometry args={[1.5, 0.3, 3]} />
        <meshStandardMaterial color="#4a5a6a" flatShading />
      </mesh>

      {/* Ingward's position */}
      <mesh position={[0, 2.5, 1.5]}>
        <boxGeometry args={[1, 0.3, 1]} />
        <meshStandardMaterial color="#3a4a5a" flatShading />
      </mesh>

      {/* Eerie blue lighting */}
      <pointLight position={[0, 1, 0]} color="#4a6a9a" intensity={0.4} distance={8} />
    </group>
  );
};
