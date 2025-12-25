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
        <meshStandardMaterial color="#6a7580" flatShading roughness={0.8} />
      </mesh>

      {/* Church main building */}
      <mesh position={[0, 2, 0]} castShadow>
        <boxGeometry args={[3, 4, 3]} />
        <meshStandardMaterial color="#8a9098" flatShading roughness={0.7} />
      </mesh>

      {/* Church roof */}
      <mesh position={[0, 4.5, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[2.5, 2, 4]} />
        <meshStandardMaterial color="#5d5050" flatShading roughness={0.8} />
      </mesh>

      {/* Bell tower */}
      <mesh position={[1.5, 4, 0]} castShadow>
        <boxGeometry args={[1.2, 6, 1.2]} />
        <meshStandardMaterial color="#909aa2" flatShading roughness={0.7} />
      </mesh>

      {/* Bell tower top */}
      <mesh position={[1.5, 7.5, 0]}>
        <coneGeometry args={[0.8, 1.5, 4]} />
        <meshStandardMaterial color="#7a8590" flatShading roughness={0.7} />
      </mesh>

      {/* Blacksmith building */}
      <mesh position={[-2, 0.8, 1]} castShadow>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="#8a8878" flatShading roughness={0.7} />
      </mesh>

      {/* Andre's forge glow */}
      <pointLight position={[-2, 1, 1]} color="#ff8c00" intensity={1} distance={5} />

      {/* Elevator to Sen's Fortress indicator */}
      <mesh position={[2.5, 0.5, -1.5]}>
        <cylinderGeometry args={[0.5, 0.5, 1, 6]} />
        <meshStandardMaterial color="#7a8590" flatShading roughness={0.7} />
      </mesh>
      
      {/* Local lighting */}
      <pointLight position={[0, 5, 0]} color="#ffffcc" intensity={0.6} distance={10} />
    </group>
  );
};
