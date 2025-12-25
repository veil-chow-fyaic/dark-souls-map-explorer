import { motion } from "framer-motion";
import { MousePointer2, Move3D, ZoomIn } from "lucide-react";

export const ControlsHint = () => {
  const controls = [
    { icon: MousePointer2, text: "左键旋转" },
    { icon: Move3D, text: "右键平移" },
    { icon: ZoomIn, text: "滚轮缩放" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="absolute bottom-6 left-6 z-10"
    >
      <div className="flex items-center gap-4 px-4 py-2.5 bg-card/70 backdrop-blur-sm border border-border/40 rounded-sm">
        {controls.map((control, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
            className="flex items-center gap-2 text-xs text-muted-foreground"
          >
            <control.icon size={14} className="text-primary/70" />
            <span>{control.text}</span>
            {i < controls.length - 1 && (
              <span className="ml-2 text-border">|</span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
