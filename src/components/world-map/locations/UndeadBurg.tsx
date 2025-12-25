import * as THREE from "three";

interface Props {
  onHover: () => void;
  onUnhover: () => void;
}

export const UndeadBurg = ({ onHover, onUnhover }: Props) => {
  return (
    <group position={[6, 3, -3]} onPointerOver={onHover} onPointerOut={onUnhover}>
      {/* Main platform/cliff */}
      <mesh position={[0, -1, 0]} receiveShadow>
        <boxGeometry args={[6, 2, 5]} />
        <meshStandardMaterial color="#4a5568" flatShading />
      </mesh>

      {/* Buildings cluster */}
      {[
        { pos: [-1.5, 1, -1], size: [1.5, 2.5, 1.5] },
        { pos: [1, 0.8, 0.5], size: [1.2, 2, 1.2] },
        { pos: [0, 1.5, -1.5], size: [1, 3, 1] },
        { pos: [-0.5, 0.6, 1], size: [1.8, 1.5, 1] },
        { pos: [1.8, 1.2, -1], size: [1, 2.5, 1.3] },
      ].map((building, i) => (
        <mesh key={i} position={building.pos as [number, number, number]} castShadow>
          <boxGeometry args={building.size as [number, number, number]} />
          <meshStandardMaterial color="#636e72" flatShading />
        </mesh>
      ))}

      {/* Tower */}
      <mesh position={[2, 2.5, -1.5]} castShadow>
        <boxGeometry args={[1.2, 4, 1.2]} />
        <meshStandardMaterial color="#4a5568" flatShading />
      </mesh>

      {/* Tower roof */}
      <mesh position={[2, 5, -1.5]}>
        <coneGeometry args={[1, 1.5, 4]} />
        <meshStandardMaterial color="#2d3436" flatShading />
      </mesh>

      {/* Bridge to Undead Parish */}
      <mesh position={[2, 1, -3.5]} rotation={[0.15, 0, 0]}>
        <boxGeometry args={[1.5, 0.3, 3]} />
        <meshStandardMaterial color="#5a6268" flatShading />
      </mesh>

      {/* Hellkite Dragon bridge hint */}
      <mesh position={[-1, 0.5, 2]}>
        <boxGeometry args={[2, 0.2, 4]} />
        <meshStandardMaterial color="#5a6268" flatShading />
      </mesh>

      {/* Taurus Demon tower */}
      <mesh position={[-2, 2, 1.5]} castShadow>
        <boxGeometry args={[1.5, 3.5, 1.5]} />
        <meshStandardMaterial color="#4a5568" flatShading />
      </mesh>
    </group>
  );
};
