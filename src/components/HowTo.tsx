// src/components/HowTo.tsx

import {
  FaClipboardList,
  FaInfoCircle,
  FaEdit,
  FaChartPie,
} from 'react-icons/fa';

const HowTo = () => {
  return (
    <section
      id="howto"
      className="min-h-screen flex items-center justify-center p-6 sm:p-9 md:p-12"
    >
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center">
          How to Use This App
        </h2>
        <div className="space-y-8">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/4 flex justify-center mb-4 md:mb-0">
              <FaClipboardList className="text-6xl text-violet-500" />
            </div>
            <div className="md:w-3/4 text-center md:text-left">
              <h3 className="text-2xl font-semibold mb-2">
                1. Calculate Capital Gains
              </h3>
              <p className="text-base">
                Use our Capital Gains Tax Estimator to calculate potential capital gains tax when selling your property.
              </p>
            </div>
          </div>
          {/* Step 2 */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/4 flex justify-center mb-4 md:mb-0">
              <FaInfoCircle className="text-6xl text-pink-500" />
            </div>
            <div className="md:w-3/4 text-center md:text-left">
              <h3 className="text-2xl font-semibold mb-2">
                2. Enter House/Bond Information
              </h3>
              <p className="text-base">
                Provide details about the house price, deposit, interest rate, and loan term.
              </p>
            </div>
          </div>
          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/4 flex justify-center mb-4 md:mb-0">
              <FaEdit className="text-6xl text-green-500" />
            </div>
            <div className="md:w-3/4 text-center md:text-left">
              <h3 className="text-2xl font-semibold mb-2">
                3. Enter Rent Information
              </h3>
              <p className="text-base">
                Input the monthly rent you would pay if you were renting.
              </p>
            </div>
          </div>
          {/* Step 4 */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/4 flex justify-center mb-4 md:mb-0">
              <FaChartPie className="text-6xl text-yellow-500" />
            </div>
            <div className="md:w-3/4 text-center md:text-left">
              <h3 className="text-2xl font-semibold mb-2">4. View Analytics</h3>
              <p className="text-base">
                Analyze and compare the costs of renting versus buying over time. Adjust the selling year and appreciation rate to see different scenarios.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowTo;
