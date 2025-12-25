interface Props {
  onHover: () => void;
  onUnhover: () => void;
}

export const UndeadParish = ({ onHover, onUnhover }: Props) => {
  return (
    <group position={[10, 7, -6]} onPointerOver={onHover} onPointerOut={onUnhover}>
      {/* Main church platform */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <boxGeometry args={[5, 1, 4]} />
        <meshStandardMaterial color="#4a5568" flatShading />
      </mesh>

      {/* Church main building */}
      <mesh position={[0, 2, 0]} castShadow>
        <boxGeometry args={[3, 4, 3]} />
        <meshStandardMaterial color="#5a6268" flatShading />
      </mesh>

      {/* Church roof */}
      <mesh position={[0, 4.5, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[2.5, 2, 4]} />
        <meshStandardMaterial color="#3d3d3d" flatShading />
      </mesh>

      {/* Bell tower */}
      <mesh position={[1.5, 4, 0]} castShadow>
        <boxGeometry args={[1.2, 6, 1.2]} />
        <meshStandardMaterial color="#636e72" flatShading />
      </mesh>

      {/* Bell tower top */}
      <mesh position={[1.5, 7.5, 0]}>
        <coneGeometry args={[0.8, 1.5, 4]} />
        <meshStandardMaterial color="#4a5568" flatShading />
      </mesh>

      {/* Blacksmith building */}
      <mesh position={[-2, 0.8, 1]} castShadow>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="#5a6268" flatShading />
      </mesh>

      {/* Andre's forge glow */}
      <pointLight position={[-2, 1, 1]} color="#ff8c00" intensity={0.5} distance={3} />

      {/* Elevator to Sen's Fortress indicator */}
      <mesh position={[2.5, 0.5, -1.5]}>
        <cylinderGeometry args={[0.5, 0.5, 1, 6]} />
        <meshStandardMaterial color="#4a5568" flatShading />
      </mesh>
    </group>
  );
};
