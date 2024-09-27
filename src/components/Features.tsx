// src/components/Features.tsx
import React from 'react';

const Features = () => {
  return (
    <section
      id="features"
      className="h-screen flex items-center justify-center "
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Features</h2>
        <div className="flex flex-col md:flex-row md:-mx-4">
          {/* Feature 1 */}
          <div className="md:w-1/3 md:px-4 mb-8 md:mb-0">
            <div className="rounded-lg p-6 shadow-2xl bg-card">
              <h3 className="text-2xl font-semibold mb-4">Salary Calculator</h3>
              <p>Calculate your net salary after taxes and deductions.</p>
            </div>
          </div>
          {/* Feature 2 */}
          <div className="md:w-1/3 md:px-4 mb-8 md:mb-0">
            <div className="rounded-lg p-6 shadow-2xl bg-card">
              <h3 className="text-2xl font-semibold mb-4">Capital Gains Tax</h3>
              <p>
                Calculate potential capital gains tax when selling your property.
              </p>
            </div>
          </div>
          {/* Feature 3 */}
          <div className="md:w-1/3 md:px-4">
            <div className="rounded-lg p-6 shadow-2xl bg-card">
              <h3 className="text-2xl font-semibold mb-4">
                Rent vs Buy Calculator
              </h3>
              <p>
                Analyze and compare the long-term costs of renting versus buying a
                home.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
