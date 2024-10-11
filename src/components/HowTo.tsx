// src/components/HowTo.tsx

import { FaClipboardList, FaInfoCircle, FaEdit, FaChartPie } from 'react-icons/fa';
import HowToStep from '@/components/HowToStep';

const HowTo = () => {
  return (
    <section
      id="howto"
      className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-9 md:p-12"
    >
      <div className="w-full max-w-5xl">
        <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center">
          How to Use
        </h2>
        <div className="space-y-8">
          {/* Step 1 */}
          <HowToStep
            icon={
              <FaClipboardList className="text-4xl sm:text-5xl md:text-6xl text-primary" />
            }
            stepNumber={1}
            title="Calculate Capital Gains"
            description="Use our Capital Gains Tax Estimator to calculate potential capital gains tax when selling your property."
          />

          {/* Step 2 */}
          <HowToStep
            icon={
              <FaInfoCircle className="text-4xl sm:text-5xl md:text-6xl text-primary" />
            }
            stepNumber={2}
            title="Enter House/Bond Information"
            description="Provide details about the house price, deposit, interest rate, and loan term."
          />

          {/* Step 3 */}
          <HowToStep
            icon={
              <FaEdit className="text-4xl sm:text-5xl md:text-6xl text-primary" />
            }
            stepNumber={3}
            title="Enter Rent Information"
            description="Input the monthly rent you would pay if you were renting."
          />

          {/* Step 4 */}
          <HowToStep
            icon={
              <FaChartPie className="text-4xl sm:text-5xl md:text-6xl text-primary" />
            }
            stepNumber={4}
            title="View Analytics"
            description="Analyze and compare the costs of renting versus buying over time. Adjust the selling year and appreciation rate to see different scenarios."
          />
        </div>
      </div>
    </section>
  );
};

export default HowTo;
