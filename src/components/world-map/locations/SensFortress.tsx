interface Props {
  onHover: () => void;
  onUnhover: () => void;
}

export const SensFortress = ({ onHover, onUnhover }: Props) => {
  return (
    <group position={[15, 10, -2]} onPointerOver={onHover} onPointerOut={onUnhover}>
      {/* Fortress base */}
      <mesh position={[0, -1, 0]} receiveShadow>
        <boxGeometry args={[5, 2, 5]} />
        <meshStandardMaterial color="#6a7580" flatShading roughness={0.8} />
      </mesh>

      {/* Main fortress structure */}
      <mesh position={[0, 2, 0]} castShadow>
        <boxGeometry args={[4, 4, 4]} />
        <meshStandardMaterial color="#8a9098" flatShading roughness={0.7} />
      </mesh>

      {/* Corner towers */}
      {[
        [-1.8, 0, -1.8],
        [1.8, 0, -1.8],
        [-1.8, 0, 1.8],
        [1.8, 0, 1.8],
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh position={[0, 3.5, 0]} castShadow>
            <boxGeometry args={[1, 5, 1]} />
            <meshStandardMaterial color="#909aa2" flatShading roughness={0.7} />
          </mesh>
          <mesh position={[0, 6.5, 0]}>
            <coneGeometry args={[0.7, 1, 4]} />
            <meshStandardMaterial color="#6d6060" flatShading roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Pendulum blades (simplified as bars) */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[-0.5 + i, 4, 0]} rotation={[0, 0, Math.PI / 6]}>
          <boxGeometry args={[0.1, 2, 0.3]} />
          <meshStandardMaterial color="#b0b0b0" metalness={0.9} roughness={0.15} />
        </mesh>
      ))}

      {/* Iron Golem platform at top */}
      <mesh position={[0, 5, 0]}>
        <boxGeometry args={[3, 0.3, 3]} />
        <meshStandardMaterial color="#7a7a7a" flatShading roughness={0.6} />
      </mesh>

      {/* Cages */}
      {[-1.5, 1.5].map((x, i) => (
        <mesh key={i} position={[x, 6, 0]}>
          <sphereGeometry args={[0.5, 6, 4]} />
          <meshStandardMaterial color="#8a8a8a" wireframe />
        </mesh>
      ))}
      
      {/* Local lighting */}
      <pointLight position={[0, 4, 0]} color="#ddccaa" intensity={0.6} distance={12} />
    </group>
  );
};
