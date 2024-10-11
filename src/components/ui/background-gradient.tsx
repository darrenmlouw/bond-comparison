// src/components/ui/background-gradient.tsx

import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  initialGradient = "",
  borderColor = "border-white",
  layoutId,
  onClick,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  initialGradient?: string;
  borderColor?: string;
  layoutId?: string;
  onClick?: () => void;
}) => {
  return (
    <motion.div
      className={cn("relative group", containerClassName)}
      whileHover={{ scale: 1.05 }} // Scale up on hover
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 15,
      }}
      layoutId={layoutId}
      onClick={onClick}
    >
      {/* Glowing Background */}
      <div
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] opacity-70 blur-md"
        )}
        style={{
          background: initialGradient,
        }}
      />

      {/* Gradient Border */}
      <div
        className={cn(
          `absolute inset-0 rounded-[20px] z-[2] p-[3px] border`,
          borderColor,
          initialGradient
        )}
        style={{
          background: initialGradient,
        }}
      >
        {/* Content */}
        <div className={cn("relative z-10 rounded-[17px]", className)}>
          {children}
        </div>
      </div>
    </motion.div>
  );
};
