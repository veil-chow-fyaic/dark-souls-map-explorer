import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const GodRays = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  const rays = [
    { pos: [20, 30, 0], rot: [0.3, 0, 0.2], scale: [2, 40, 0.5] },
    { pos: [18, 28, 5], rot: [0.25, 0.1, 0.15], scale: [1.5, 35, 0.4] },
    { pos: [22, 32, -3], rot: [0.35, -0.1, 0.25], scale: [1.8, 38, 0.45] },
  ];

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {rays.map((ray, i) => (
        <mesh
          key={i}
          position={ray.pos as [number, number, number]}
          rotation={ray.rot as [number, number, number]}
        >
          <boxGeometry args={ray.scale as [number, number, number]} />
          <meshBasicMaterial
            color="#ffd700"
            transparent
            opacity={0.03 + (i * 0.01)}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
};
