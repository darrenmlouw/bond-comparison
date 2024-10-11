// src/components/Features.tsx

import { FaCalculator, FaChartLine, FaHome } from 'react-icons/fa';
import { BackgroundGradient } from '@/components/ui/background-gradient';

const Features = () => {
  return (
    <section
      id="features"
      className="h-screen flex items-center justify-center p-6 sm:p-9 md:p-12"
    >
      <div className="text-center w-full h-full flex flex-col justify-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 sm:mb-8 md:mb-12">
          Our Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-9 md:gap-12 auto-rows-fr h-3/4">
          {/* Feature 1 */}
          <BackgroundGradient
            initialGradient="radial-gradient(circle at top left, #ff99cc, #cc66ff, #9966cc)"
            borderColor="border-[#cc66ff]"
            className="p-4 sm:p-6 md:p-8 bg-card h-full flex flex-col rounded-[17px]" // Set bg-card and matching rounded corners
          >
            <div className="flex flex-col items-center flex-1 justify-center">
              <FaCalculator className="text-4xl sm:text-5xl md:text-6xl text-[#cc66ff] mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Salary Calculator</h3>
              <p className="text-base text-neutral-600 dark:text-neutral-400">
                Calculate your net salary after taxes and deductions.
              </p>
            </div>
          </BackgroundGradient>

          {/* Feature 2 */}
          <BackgroundGradient
            initialGradient="radial-gradient(circle at top left, #6699ff, #6666ff, #9933ff)"
            borderColor="border-[#6666ff]"
            className="p-4 sm:p-6 md:p-8 bg-card h-full flex flex-col rounded-[17px]"
          >
            <div className="flex flex-col items-center flex-1 justify-center">
              <FaChartLine className="text-4xl sm:text-5xl md:text-6xl text-[#6666ff] mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Capital Gains Tax</h3>
              <p className="text-base text-neutral-600 dark:text-neutral-400">
                Calculate potential capital gains tax when selling your property.
              </p>
            </div>
          </BackgroundGradient>

          {/* Feature 3 */}
          <BackgroundGradient
            initialGradient="radial-gradient(circle at top left, #ff6699, #ff3366, #cc0066)"
            borderColor="border-[#ff3366]"
            className="p-4 sm:p-6 md:p-8 bg-card h-full flex flex-col rounded-[17px]"
          >
            <div className="flex flex-col items-center flex-1 justify-center">
              <FaHome className="text-4xl sm:text-5xl md:text-6xl text-[#ff3366] mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Rent vs Buy Calculator</h3>
              <p className="text-base text-neutral-600 dark:text-neutral-400">
                Analyze and compare the long-term costs of renting versus buying a home.
              </p>
            </div>
          </BackgroundGradient>
        </div>
      </div>
    </section>
  );
};

export default Features;
