import { Html } from "@react-three/drei";

interface Props {
  position: [number, number, number];
  text: string;
}

export const LocationLabel = ({ position, text }: Props) => {
  return (
    <Html
      position={position}
      center
      distanceFactor={15}
      occlude
      style={{
        transition: "all 0.2s",
        opacity: 0.9,
        pointerEvents: "none",
      }}
    >
      <div className="px-2 py-1 bg-card/80 border border-border text-xs text-foreground font-sans whitespace-nowrap backdrop-blur-sm">
        {text}
      </div>
    </Html>
  );
};
