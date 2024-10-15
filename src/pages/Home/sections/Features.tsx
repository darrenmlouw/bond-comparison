import Feature from '@/types/Feature';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { X } from 'lucide-react';
import useClickOutside from '@/hooks/useClickOutside';

interface FeaturesProps {
  constantData: Feature[];
}

const Features = (props: FeaturesProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  useClickOutside(dialogRef, () => setSelectedId(null));

  const selectedFeature = props.constantData.find(
    (item) => item.id === selectedId
  );

  return (
    <section
      id="features"
      className="h-screen flex items-center justify-center p-6 sm:p-9 md:p-12"
    >
      <div className="text-center w-full h-full flex flex-col justify-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 md:mb-12">
          Our Features
        </h2>

        <div className="grid grid-cols-1 w-full lg:grid-cols-3 gap-6 sm:gap-6 md:gap-6 auto-rows-fr h-3/4">
          {props.constantData.map((item) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                layoutId={item.id.toString()}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedId(item.id)}
                className="relative p-1 rounded-2xl cursor-pointer"
                style={{
                  background: item.borderGradient,
                  boxShadow: `${item.boxShadow}`,
                }}
              >
                <div
                  // layoutId={`1.${item.id}`}
                  className="p-4 sm:p-6 md:p-8 bg-card h-full flex flex-col rounded-xl items-center flex-1 justify-center gap-1 sm:gap-2 md:gap-4 lg:gap-8 xl:gap-10"
                >
                  <motion.div
                    layoutId={`${item.id}.icon`}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-[#cc66ff]"
                  >
                    <IconComponent />
                  </motion.div>
                  <motion.h3
                    layoutId={item.title}
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-semibold mb-2"
                  >
                    {item.title}
                  </motion.h3>
                  <motion.p
                    layoutId={item.subtitle}
                    className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl text-neutral-600 dark:text-neutral-400"
                  >
                    {item.subtitle}
                  </motion.p>
                  {/* <motion.p layoutId={item.description}></motion.p> */}
                </div>
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence>
          {selectedId !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm z-40"
              onClick={() => setSelectedId(null)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedId !== null && selectedFeature && (
            <motion.div className="fixed inset-0 flex justify-center items-center z-50 my-6 sm:my-8 md:my-12">
              <motion.div
                layoutId={selectedId.toString()}
                ref={dialogRef}
                className="relative p-1 rounded-2xl cursor-pointer h-full max-w-6xl w-full mx-6 sm:mx-8 md:mx-12"
                style={{
                  background: props.constantData.find(
                    (item) => item.id === selectedId
                  )?.borderGradient,
                  boxShadow: `${selectedFeature.boxShadow}`, // Glow effect
                }}
              >
                <motion.div
                  // layoutId={`111.${selectedFeature.id}`}
                  className="bg-card p-6 rounded-xl shadow-lg h-full w-full flex flex-col text-center justify-center items-center gap-4"
                >
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-3 right-3 text-primary "
                    onClick={() => {
                      setTimeout(() => setSelectedId(null), 100);
                    }}
                  >
                    <X className="h-8 w-8" />
                  </motion.button>

                  <motion.div
                    layoutId={`${selectedFeature.id}.icon`}
                    className="text-6xl sm:text-7xl md:text-8xl  text-[#cc66ff]"
                  >
                    <selectedFeature.icon />
                  </motion.div>
                  <motion.h3
                    layoutId={selectedFeature.title}
                    className="text-4xl sm:text-5xl md:text-6xl font-bold "
                  >
                    {selectedFeature.title}
                  </motion.h3>
                  <motion.p
                    layoutId={selectedFeature.subtitle}
                    className="text-lg sm:text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 "
                  >
                    {selectedFeature.subtitle}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm sm:text-lg md:text-xl  text-neutral-600 dark:text-neutral-400"
                  >
                    {selectedFeature.description}
                  </motion.p>

                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className=" w-20 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  >
                    Try
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

export default Features;
