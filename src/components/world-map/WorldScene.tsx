import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
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
import { Connections } from "./Connections";
import { LocationLabel } from "./LocationLabel";
import { Fog } from "./Fog";

interface LocationInfo {
  name: string;
  description: string;
}

export const WorldScene = () => {
  const [hoveredLocation, setHoveredLocation] = useState<LocationInfo | null>(null);

  const handleHover = (name: string, description: string) => {
    setHoveredLocation({ name, description });
  };

  const handleUnhover = () => {
    setHoveredLocation(null);
  };

  return (
    <div className="relative w-full h-screen bg-background">
      {/* Location Info Panel */}
      {hoveredLocation && (
        <div className="absolute top-6 left-6 z-10 p-4 bg-card/90 border-2 border-border backdrop-blur-sm max-w-xs">
          <h2 className="text-xl font-serif text-primary mb-2">{hoveredLocation.name}</h2>
          <p className="text-sm text-muted-foreground">{hoveredLocation.description}</p>
        </div>
      )}

      {/* Controls Info */}
      <div className="absolute bottom-6 left-6 z-10 p-3 bg-card/80 border border-border text-xs text-muted-foreground">
        <p>左键拖动旋转 | 右键拖动平移 | 滚轮缩放</p>
      </div>

      {/* Title */}
      <div className="absolute top-6 right-6 z-10 text-right">
        <h1 className="text-3xl font-serif text-primary tracking-widest">黑暗之魂</h1>
        <p className="text-sm text-muted-foreground mt-1">罗德兰世界地图</p>
      </div>

      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[30, 25, 30]} fov={50} />
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={15}
          maxDistance={80}
          maxPolarAngle={Math.PI / 2.1}
        />

        {/* Ambient and atmospheric lighting */}
        <ambientLight intensity={0.15} color="#4a5568" />
        <directionalLight
          position={[10, 20, 5]}
          intensity={0.3}
          color="#f4a460"
          castShadow
        />
        <pointLight position={[0, 0, 0]} intensity={0.5} color="#ff6b35" distance={15} />

        {/* Stars background */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />

        {/* Fog effect */}
        <fog attach="fog" args={["#0a0f14", 30, 100]} />
        <Fog />

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

        {/* Connections between areas */}
        <Connections />

        {/* Location labels */}
        <LocationLabel position={[0, 2, 0]} text="传火祭祀场" />
        <LocationLabel position={[6, 6, -3]} text="不死城" />
        <LocationLabel position={[10, 10, -6]} text="不死教区" />
        <LocationLabel position={[-8, 5, -5]} text="黑暗之根园" />
        <LocationLabel position={[0, -8, 8]} text="病村" />
        <LocationLabel position={[15, 12, -2]} text="森之堡垒" />
        <LocationLabel position={[20, 20, 0]} text="亚诺尔隆德" />
        <LocationLabel position={[5, -12, -8]} text="墓王领域" />
        <LocationLabel position={[-6, -4, 5]} text="新隆多废墟" />
        <LocationLabel position={[5, -15, 12]} text="恶魔遗迹" />
      </Canvas>
    </div>
  );
};
