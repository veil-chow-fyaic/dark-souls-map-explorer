import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { FirelinkShrine } from "./locations/FirelinkShrine";
import { UndeadBurg } from "./locations/UndeadBurg";
import { UndeadParish } from "./locations/UndeadParish";
import { Darkroot } from "./locations/Darkroot";
import { Blighttown } from "./locations/Blighttown";
import { SensFortress } from "./locations/SensFortress";
import { AnorLondo } from "./locations/AnorLondo";
import { CatacombsNito } from "./locations/CatacombsNito";
import { NewLondoRuins } from "./locations/NewLondoRuins";
import { DemonRuins } from "./locations/DemonRuins";
import { AnimatedConnections } from "./effects/AnimatedConnections";
import { LocationLabel } from "./LocationLabel";
import { Embers } from "./effects/Embers";
import { SoulParticles } from "./effects/SoulParticles";
import { GodRays } from "./effects/GodRays";
import { DynamicSky } from "./effects/DynamicSky";
import { PostProcessing } from "./effects/PostProcessing";
import { LocationPanel } from "./ui/LocationPanel";
import { ControlsHint } from "./ui/ControlsHint";
import { Title } from "./ui/Title";

interface LocationInfo {
  name: string;
  description: string;
}

// Loading fallback
const Loader = () => (
  <mesh>
    <sphereGeometry args={[0.5, 16, 16]} />
    <meshBasicMaterial color="#ff6b35" wireframe />
  </mesh>
);

export const WorldScene = () => {
  const [hoveredLocation, setHoveredLocation] = useState<LocationInfo | null>(null);

  const handleHover = (name: string, description: string) => {
    setHoveredLocation({ name, description });
  };

  const handleUnhover = () => {
    setHoveredLocation(null);
  };

  return (
    <div className="relative w-full h-screen bg-background overflow-hidden">
      {/* UI Overlays */}
      <LocationPanel location={hoveredLocation} />
      <ControlsHint />
      <Title />

      {/* 3D Canvas */}
      <Canvas 
        shadows 
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={<Loader />}>
          <PerspectiveCamera makeDefault position={[35, 25, 35]} fov={45} />
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={20}
            maxDistance={100}
            maxPolarAngle={Math.PI / 2.1}
            rotateSpeed={0.5}
            zoomSpeed={0.8}
          />

          {/* Dynamic sky background */}
          <DynamicSky />

          {/* Lighting setup */}
          <ambientLight intensity={0.35} color="#9aa8bb" />
          
          {/* Main sun/moon light */}
          <directionalLight
            position={[20, 40, 15]}
            intensity={1.2}
            color="#ffeedd"
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={100}
            shadow-camera-left={-30}
            shadow-camera-right={30}
            shadow-camera-top={30}
            shadow-camera-bottom={-30}
          />
          
          {/* Fill lights */}
          <directionalLight
            position={[-15, 20, -15]}
            intensity={0.5}
            color="#aabbdd"
          />
          <directionalLight
            position={[0, 10, -25]}
            intensity={0.4}
            color="#ffaa88"
          />
          
          {/* Firelink bonfire glow */}
          <pointLight position={[0, 2, 0]} intensity={2} color="#ff6b35" distance={25} decay={2} />
          
          {/* Hemisphere light for natural bounce */}
          <hemisphereLight args={["#5577aa", "#443322", 0.6]} />

          {/* Fog */}
          <fog attach="fog" args={["#1a1f28", 60, 140]} />

          {/* Atmospheric effects */}
          <Embers count={300} radius={50} color="#ff6b35" />
          <SoulParticles count={80} />
          <GodRays />

          {/* World locations */}
          <FirelinkShrine 
            onHover={() => handleHover("传火祭祀场", "不死人的避难所，篝火与不死商人在此等候")}
            onUnhover={handleUnhover}
          />
          <UndeadBurg 
            onHover={() => handleHover("不死城", "曾经繁华的城镇，如今满是游荡的不死人")}
            onUnhover={handleUnhover}
          />
          <UndeadParish 
            onHover={() => handleHover("不死教区", "通往大教堂的道路，有钟楼守护者把守")}
            onUnhover={handleUnhover}
          />
          <Darkroot 
            onHover={() => handleHover("黑暗之根园", "古老的森林，月光蝶在此翩翩起舞")}
            onUnhover={handleUnhover}
          />
          <Blighttown 
            onHover={() => handleHover("病村", "瘟疫与毒沼的深渊，混沌女巫的故乡")}
            onUnhover={handleUnhover}
          />
          <SensFortress 
            onHover={() => handleHover("森之堡垒", "充满陷阱的试炼之地")}
            onUnhover={handleUnhover}
          />
          <AnorLondo 
            onHover={() => handleHover("亚诺尔隆德", "众神之城，太阳公主的居所")}
            onUnhover={handleUnhover}
          />
          <CatacombsNito 
            onHover={() => handleHover("墓王尼特领域", "死亡之地，骷髅在黑暗中游荡")}
            onUnhover={handleUnhover}
          />
          <NewLondoRuins 
            onHover={() => handleHover("新隆多废墟", "被水淹没的古城，四王的牢笼")}
            onUnhover={handleUnhover}
          />
          <DemonRuins 
            onHover={() => handleHover("恶魔遗迹", "炙热的熔岩之地，恶魔的栖息地")}
            onUnhover={handleUnhover}
          />

          {/* Animated connections */}
          <AnimatedConnections />

          {/* Location labels */}
          <LocationLabel position={[0, 2.5, 0]} text="传火祭祀场" />
          <LocationLabel position={[6, 7, -3]} text="不死城" />
          <LocationLabel position={[10, 11, -6]} text="不死教区" />
          <LocationLabel position={[-8, 6, -5]} text="黑暗之根园" />
          <LocationLabel position={[0, -4, 8]} text="病村" />
          <LocationLabel position={[15, 14, -2]} text="森之堡垒" />
          <LocationLabel position={[20, 22, 0]} text="亚诺尔隆德" />
          <LocationLabel position={[5, -8, -8]} text="墓王领域" />
          <LocationLabel position={[-6, -1, 5]} text="新隆多废墟" />
          <LocationLabel position={[5, -11, 12]} text="恶魔遗迹" />

          {/* Post-processing effects */}
          <PostProcessing />
        </Suspense>
      </Canvas>
    </div>
  );
};
