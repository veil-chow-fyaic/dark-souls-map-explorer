import { 
  EffectComposer, 
  Bloom, 
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export const PostProcessing = () => {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.6}
        luminanceThreshold={0.3}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <Vignette
        offset={0.3}
        darkness={0.6}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
};
