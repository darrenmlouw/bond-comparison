import { EasingDefinition, motion } from 'framer-motion';

interface Props {
  label: string; // The label to display inside the header
  animationDelay?: number; // The delay for the animation
  animationDuration?: number; // The duration for the animation
  animationEase?: EasingDefinition; // The easing for the animation
  animationXDistance?: number;
  animationYDistance?: number;
}

export const SectionHeader = ({
  label,
  animationDelay,
  animationDuration,
  animationEase = 'easeOut',
  animationXDistance = 0,
  animationYDistance = 0,
}: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: animationXDistance, y: animationYDistance }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: animationDuration,
        delay: animationDelay,
        ease: animationEase,
      }}
      className="relative flex items-center pt-1 sm:pt-2 "
    >
      <div className="flex-shrink mr-2 border border-primary bg-primary/60 bg-opacity-100 rounded-full p-0.5 px-2 text-xs font-semibold text-background">
        {label}
      </div>
      <div className="flex-grow border-t border-primary/30"></div>
    </motion.div>
  );
};
