import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Fog = () => {
  const fogRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (fogRef.current) {
      fogRef.current.rotation.y += 0.001;
      fogRef.current.position.y = -5 + Math.sin(state.clock.elapsedTime * 0.2) * 0.5;
    }
  });

  return (
    <mesh ref={fogRef} position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[200, 200]} />
      <meshBasicMaterial
        color="#1a1f2e"
        transparent
        opacity={0.6}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};
