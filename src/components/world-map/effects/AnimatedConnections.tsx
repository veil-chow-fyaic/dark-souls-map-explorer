import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ConnectionPath {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
}

const connectionPaths: ConnectionPath[] = [
  { start: [0, 0, 0], end: [6, 3, -3], color: "#ff9955" },
  { start: [6, 3, -3], end: [10, 7, -6], color: "#ffaa66" },
  { start: [10, 7, -6], end: [15, 10, -2], color: "#ddaa77" },
  { start: [15, 10, -2], end: [20, 18, 0], color: "#ffd700" },
  { start: [0, 0, 0], end: [-8, 2, -5], color: "#55aa55" },
  { start: [0, 0, 0], end: [0, -6, 8], color: "#88aa55" },
  { start: [0, -6, 8], end: [5, -13, 12], color: "#ff6633" },
  { start: [0, 0, 0], end: [5, -10, -8], color: "#6688aa" },
  { start: [0, 0, 0], end: [-6, -3, 5], color: "#5577aa" },
];

interface AnimatedLineProps {
  path: ConnectionPath;
  index: number;
}

const AnimatedLine = ({ path, index }: AnimatedLineProps) => {
  const lineRef = useRef<THREE.Line>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { geometry, uniforms } = useMemo(() => {
    const points = [];
    const segments = 20;
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const x = path.start[0] + (path.end[0] - path.start[0]) * t;
      const y = path.start[1] + (path.end[1] - path.start[1]) * t + Math.sin(t * Math.PI) * 1.5;
      const z = path.start[2] + (path.end[2] - path.start[2]) * t;
      points.push(new THREE.Vector3(x, y, z));
    }
    
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    
    const uniforms = {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(path.color) },
      uOffset: { value: index * 0.5 },
    };
    
    return { geometry: geo, uniforms };
  }, [path, index]);

  const vertexShader = `
    varying float vProgress;
    attribute float lineDistance;
    
    void main() {
      vProgress = position.y;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uOffset;
    varying float vProgress;
    
    void main() {
      float pulse = sin(uTime * 2.0 + uOffset + vProgress * 0.1) * 0.5 + 0.5;
      float alpha = 0.3 + pulse * 0.4;
      
      gl_FragColor = vec4(uColor, alpha);
    }
  `;

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const lineMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, [uniforms, vertexShader, fragmentShader]);

  const lineObject = useMemo(() => {
    return new THREE.Line(geometry, lineMaterial);
  }, [geometry, lineMaterial]);

  useFrame((state) => {
    lineMaterial.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return <primitive object={lineObject} />;
};

export const AnimatedConnections = () => {
  return (
    <group>
      {connectionPaths.map((path, i) => (
        <AnimatedLine key={i} path={path} index={i} />
      ))}
    </group>
  );
};
