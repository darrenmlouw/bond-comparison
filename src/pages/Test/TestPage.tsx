import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

type Item = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode; // Assuming icon is a React component
  initialGradient: string;
};

interface Props {
  items: Item[];
}

const TestPage = (props: Props) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <section
      id="features"
      className="h-screen flex items-center justify-center p-6 sm:p-9 md:p-12"
    >
      <div className="text-center w-full h-full flex flex-col justify-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 sm:mb-8 md:mb-12">
          Our Features
        </h2>
        <div className="grid grid-cols-1 w-full md:grid-cols-3 gap-6 sm:gap-9 md:gap-12 auto-rows-fr h-3/4">
          {props.items.map((item) => (
            <motion.div
              key={item.id}
              layoutId={item.id.toString()}
              whileHover={{ scale: 1.05 }} // Scale up on hover
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 25,
              }}
              onClick={() => setSelectedId(item.id)}
              className="relative p-1 rounded-2xl cursor-pointer"
              style={{ background: item.initialGradient }}
            >
              {/* Card with Glow Effect */}
              <motion.div
                className="p-4 sm:p-6 md:p-8 bg-card h-full flex flex-col rounded-xl"
                style={{
                  boxShadow: `0 0 8px 8px rgba(255, 255, 255, 0.5)`, // Glow effect
                }}
              >
                <div className="flex flex-col items-center flex-1 justify-center">
                  {/* Render icon as a React component */}
                  <div className="text-4xl sm:text-5xl md:text-6xl text-[#cc66ff] mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-base text-neutral-600 dark:text-neutral-400">
                    {item.subtitle}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedId !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm z-40"
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedId !== null && (
            <motion.div className="fixed inset-0 flex justify-center items-center z-50 w-full">
              {/* Expanded Card Modal with Same Style */}
              <motion.div
                layoutId={selectedId.toString()}
                className="relative p-1 rounded-2xl cursor-pointer h-3/4 max-w-2xl w-full"
                style={{ background: props.items.find((item) => item.id === selectedId)?.initialGradient }}
              >
                <motion.div
                  className="bg-card p-6 rounded-xl shadow-lg h-full w-full"
                  style={{
                    boxShadow: `0 0 20px 8px rgba(255, 255, 255, 0.5)`, // Glow effect
                  }}
                >
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    onClick={() => setSelectedId(null)}
                  >
                    &#10005;
                  </motion.button>
                  
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TestPage;
