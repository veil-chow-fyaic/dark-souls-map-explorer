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
        <meshStandardMaterial color="#3a6a7a" flatShading transparent opacity={0.85} roughness={0.3} />
      </mesh>

      {/* Ruined buildings */}
      {[
        { pos: [-2, 0, -1.5], size: [2, 3, 2], color: "#5a7a8a" },
        { pos: [2, -0.5, -1], size: [1.8, 2.5, 1.8], color: "#6a8898" },
        { pos: [0, 0.5, 1.5], size: [2.5, 3.5, 2], color: "#5a7a8a" },
        { pos: [-2.5, -1, 2], size: [1.5, 2, 1.5], color: "#6a8898" },
      ].map((building, i) => (
        <mesh key={i} position={building.pos as [number, number, number]} castShadow>
          <boxGeometry args={building.size as [number, number, number]} />
          <meshStandardMaterial color={building.color} flatShading roughness={0.75} />
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
          <meshStandardMaterial color="#7a8a9a" flatShading roughness={0.75} />
        </mesh>
      ))}

      {/* Ghost (Darkwraith hint) */}
      <mesh ref={ghostRef} position={[0, -1, 0]}>
        <coneGeometry args={[0.5, 1.5, 4]} />
        <meshBasicMaterial color="#7a9aba" transparent opacity={0.5} />
      </mesh>

      {/* Four Kings abyss entrance */}
      <mesh position={[0, -4.5, 0]}>
        <cylinderGeometry args={[1.5, 2, 2, 6]} />
        <meshStandardMaterial color="#2a2a3a" flatShading roughness={0.9} />
      </mesh>
      <pointLight position={[0, -5, 0]} color="#5a5a8a" intensity={0.6} distance={6} />

      {/* Stairs up to Firelink */}
      <mesh position={[3, 0.5, 2.5]} rotation={[-0.4, -0.5, 0]}>
        <boxGeometry args={[1.5, 0.3, 3]} />
        <meshStandardMaterial color="#6a7a8a" flatShading roughness={0.75} />
      </mesh>

      {/* Ingward's position */}
      <mesh position={[0, 2.5, 1.5]}>
        <boxGeometry args={[1, 0.3, 1]} />
        <meshStandardMaterial color="#5a6a7a" flatShading roughness={0.75} />
      </mesh>

      {/* Eerie blue lighting - enhanced */}
      <pointLight position={[0, 2, 0]} color="#6a8aba" intensity={0.8} distance={12} />
    </group>
  );
};
