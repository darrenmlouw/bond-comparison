// src/components/HowTo.tsx

const HowTo = () => {
  return (
    <section
      id="howto"
      className="h-screen flex items-center justify-center "
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          How to Use This App
        </h2>
        <ol className="list-decimal list-inside space-y-4 text-lg">
          <li>
            <strong>Calculate Capital Gains:</strong> Use our Capital Gains Tax
            Estimator to calculate potential capital gains tax when selling your
            property.
          </li>
          <li>
            <strong>Enter House/Bond Information:</strong> Provide details about the
            house price, deposit, interest rate, and loan term.
          </li>
          <li>
            <strong>Enter Rent Information:</strong> Input the monthly rent you would
            pay if you were renting.
          </li>
          <li>
            <strong>View Analytics:</strong> Analyze and compare the costs of renting
            versus buying over time. Adjust the selling year and appreciation rate to
            see different scenarios.
          </li>
        </ol>
      </div>
    </section>
  );
};

export default HowTo;
