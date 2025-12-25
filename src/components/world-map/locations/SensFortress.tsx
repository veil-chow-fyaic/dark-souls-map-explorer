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
        <meshStandardMaterial color="#4a5568" flatShading />
      </mesh>

      {/* Main fortress structure */}
      <mesh position={[0, 2, 0]} castShadow>
        <boxGeometry args={[4, 4, 4]} />
        <meshStandardMaterial color="#5a6268" flatShading />
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
            <meshStandardMaterial color="#636e72" flatShading />
          </mesh>
          <mesh position={[0, 6.5, 0]}>
            <coneGeometry args={[0.7, 1, 4]} />
            <meshStandardMaterial color="#3d3d3d" flatShading />
          </mesh>
        </group>
      ))}

      {/* Pendulum blades (simplified as bars) */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[-0.5 + i, 4, 0]} rotation={[0, 0, Math.PI / 6]}>
          <boxGeometry args={[0.1, 2, 0.3]} />
          <meshStandardMaterial color="#808080" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}

      {/* Iron Golem platform at top */}
      <mesh position={[0, 5, 0]}>
        <boxGeometry args={[3, 0.3, 3]} />
        <meshStandardMaterial color="#4a4a4a" flatShading />
      </mesh>

      {/* Cages */}
      {[-1.5, 1.5].map((x, i) => (
        <mesh key={i} position={[x, 6, 0]}>
          <sphereGeometry args={[0.5, 6, 4]} />
          <meshStandardMaterial color="#5a5a5a" wireframe />
        </mesh>
      ))}
    </group>
  );
};
