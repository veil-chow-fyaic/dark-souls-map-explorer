import { motion } from "framer-motion";

export const Title = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="absolute top-6 right-6 z-10 text-right"
    >
      {/* Main title with glow effect */}
      <div className="relative">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-4xl font-serif text-primary tracking-[0.3em] drop-shadow-[0_0_15px_rgba(255,107,53,0.3)]"
          style={{
            textShadow: "0 0 20px rgba(255, 107, 53, 0.4), 0 0 40px rgba(255, 107, 53, 0.2)",
          }}
        >
          黑暗之魂
        </motion.h1>
        
        {/* Decorative underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-2 h-px bg-gradient-to-l from-primary via-primary/50 to-transparent"
          style={{ transformOrigin: "right" }}
        />
      </div>
      
      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-sm text-muted-foreground mt-2 tracking-widest"
      >
        罗德兰世界地图
      </motion.p>
      
      {/* Decorative element */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="mt-4 flex justify-end items-center gap-2"
      >
        <div className="w-1 h-1 rounded-full bg-primary/60" />
        <div className="w-8 h-px bg-gradient-to-l from-primary/60 to-transparent" />
        <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(255,107,53,0.5)]" />
      </motion.div>
    </motion.div>
  );
};
