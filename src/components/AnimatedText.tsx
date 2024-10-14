import { motion } from 'framer-motion';

const AnimatedText = ({ text, className }: { text: string; className: string }) => {
  const textAnimation = {
    hidden: { opacity: 0, y: -100 }, // Start above and hidden
    visible: (i: number) => ({
      opacity: 1,
      y: 0, // Bring the letter to its normal position
      transition: {
        delay: Math.random() * (1.0 - 0.1) + 0.1, // Random delay between 0.1s and 1.0s
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    }),
  };

  return (
    <motion.div className={className}>
      {text.split('').map((letter, i) => (
        <motion.span
          key={i}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={textAnimation}
          className="inline-block"
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText;
