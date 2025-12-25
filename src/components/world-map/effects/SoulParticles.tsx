import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SoulParticlesProps {
  count?: number;
}

export const SoulParticles = ({ count = 50 }: SoulParticlesProps) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 60,
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 60
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          Math.random() * 0.01 + 0.005,
          (Math.random() - 0.5) * 0.02
        ),
        scale: 0.05 + Math.random() * 0.1,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    particles.forEach((particle, i) => {
      // Drifting motion
      particle.position.add(particle.velocity);
      
      // Reset if too far
      if (particle.position.y > 20) {
        particle.position.y = -20;
        particle.position.x = (Math.random() - 0.5) * 60;
        particle.position.z = (Math.random() - 0.5) * 60;
      }
      
      dummy.position.copy(particle.position);
      
      // Ethereal pulsing
      const pulse = 0.7 + Math.sin(time * 2 + particle.phase) * 0.3;
      dummy.scale.setScalar(particle.scale * pulse);
      
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial 
        color="#88ccff" 
        transparent 
        opacity={0.4}
      />
    </instancedMesh>
  );
};
