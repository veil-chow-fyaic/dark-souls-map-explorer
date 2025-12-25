import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface EmbersProps {
  count?: number;
  radius?: number;
  color?: string;
}

export const Embers = ({ count = 200, radius = 40, color = "#ff6b35" }: EmbersProps) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * radius;
      temp.push({
        position: new THREE.Vector3(
          Math.cos(angle) * r,
          Math.random() * 30 - 15,
          Math.sin(angle) * r
        ),
        speed: 0.2 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
        scale: 0.02 + Math.random() * 0.04,
      });
    }
    return temp;
  }, [count, radius]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    particles.forEach((particle, i) => {
      // Floating upward with swirl
      const y = particle.position.y + time * particle.speed;
      const normalizedY = ((y + 15) % 45) - 15;
      
      dummy.position.set(
        particle.position.x + Math.sin(time * 0.5 + particle.offset) * 0.5,
        normalizedY,
        particle.position.z + Math.cos(time * 0.5 + particle.offset) * 0.5
      );
      
      // Pulsing scale
      const pulse = 1 + Math.sin(time * 3 + particle.offset) * 0.3;
      dummy.scale.setScalar(particle.scale * pulse);
      
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </instancedMesh>
  );
};
