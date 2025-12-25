import { motion, AnimatePresence } from "framer-motion";

interface LocationInfo {
  name: string;
  description: string;
}

interface LocationPanelProps {
  location: LocationInfo | null;
}

export const LocationPanel = ({ location }: LocationPanelProps) => {
  return (
    <AnimatePresence>
      {location && (
        <motion.div
          initial={{ opacity: 0, x: -20, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute top-6 left-6 z-10 max-w-xs overflow-hidden"
        >
          {/* Decorative corner */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary/60" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary/60" />
          
          {/* Main panel */}
          <div className="relative bg-gradient-to-br from-card/95 via-card/90 to-card/80 backdrop-blur-md border border-border/50 p-5">
            {/* Glowing accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
              style={{ transformOrigin: "left" }}
            />
            
            {/* Title with icon */}
            <div className="flex items-center gap-3 mb-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2, type: "spring" }}
                className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(255,107,53,0.6)]"
              />
              <h2 className="text-xl font-serif text-primary tracking-wide">
                {location.name}
              </h2>
            </div>
            
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="text-sm text-muted-foreground leading-relaxed pl-5"
            >
              {location.description}
            </motion.p>
            
            {/* Subtle scan line effect */}
            <motion.div
              initial={{ top: "0%" }}
              animate={{ top: "100%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent pointer-events-none"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
