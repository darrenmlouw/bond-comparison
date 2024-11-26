import exclusionOption from '@/enums/exclusionOption';
import inclusionOption from '@/enums/inclusionOption';
import CapitalGainsTaxCalculator from '@/utils/capitalGainsCalculations';

export const calculateRentCost = (
  rentDurationYears: number,
  monthlyRent: number,
  annualRentIncreaseRate: number
): number[] => {
  const rentCosts: number[] = [0]; // Initialize with year 0 having a rent cost of 0
  let cumulativeRent = 0;
  let currentMonthlyRent = monthlyRent;

  for (let year = 1; year <= rentDurationYears; year++) {
    const annualRent = currentMonthlyRent * 12;
    cumulativeRent -= annualRent;
    rentCosts.push(cumulativeRent);
    currentMonthlyRent *= 1 + annualRentIncreaseRate / 100;
  }

  return rentCosts;
};

export const calculateHouseValueAfterAppreciation = (
  years: number,
  initialPropertyPrice: number,
  annualAppreciationRate: number
): number[] => {
  const houseValues = [];
  for (let i = 0; i <= years; i++) {
    houseValues.push(initialPropertyPrice * Math.pow(1 + annualAppreciationRate / 100, i));
  }
  return houseValues;
};

export const calculateMonthlyFees = (
  years: number,
  monthlyFees: number
): number[] => {
  const fees = [];
  for (let i = 0; i <= years; i++) {
    fees.push(monthlyFees * 12 * i);
  }
  return fees;
};

export const calculateRemainingPrincipal = (
  years: number,
  principal: number,
  annualInterestRate: number
): number[] => {
  const remainingPrincipal = [];
  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const numberOfPayments = years * 12;

  // Handle edge case where interest rate is 0
  if (annualInterestRate === 0) {
    const equalMonthlyPayments = principal / numberOfPayments;
    for (let i = 0; i <= years; i++) {
      const paymentsMade = i * 12;
      const remainingBalance = Math.max(principal  - paymentsMade * equalMonthlyPayments, 0);
      remainingPrincipal.push(remainingBalance);
    }
    return remainingPrincipal;
  }

  // Regular calculation when interest rate > 0
  for (let i = 0; i <= years; i++) {
    const paymentsMade = i * 12;
    const remainingBalance =
      (principal *
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) -
          Math.pow(1 + monthlyInterestRate, paymentsMade))) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    remainingPrincipal.push(remainingBalance); // Positive value for principal
  }

  return remainingPrincipal;
};


// use the capoitl gains tax calculator class here, return capital gains for each year
export const calculateCapitalGainsTax = (
  years: number,
  sellingPrice: number[],
  baseCost: number,
  inclusionType: inclusionOption,
  exclusionType: exclusionOption,
  numberOfOwners: number = 1,
  smallBusinessMarketValue?: number
): {
  capitalGainsTax: number[];
  marginalTaxRate: number;
  inclusionRate: number;
  exclusion: number;
} => {
  const capitalGainsTax: number[] = [];
  let marginalTaxRate = 0;
  let inclusionRate = 0;
  let exclusion = 0;

  for (let i = 0; i <= years; i++) {
    const calculator = new CapitalGainsTaxCalculator(
      sellingPrice[i],
      baseCost,
      inclusionType as inclusionOption,
      exclusionType as exclusionOption,
      numberOfOwners,
      smallBusinessMarketValue
    );
    const caps = calculator.calculate();
    capitalGainsTax.push(caps.capitalGainsTax);
    marginalTaxRate = caps.marginalTaxRate;
    inclusionRate = caps.inclusionRate;
    exclusion = caps.exclusion;
  }

  return {
    capitalGainsTax: capitalGainsTax,
    marginalTaxRate: marginalTaxRate,
    inclusionRate: inclusionRate,
    exclusion: exclusion,
  };
};

export const calculateMoneyMadeFromSellingHouse = (
  years: number,
  housePrice: number,
  principal: number,
  appreciationRate: number,
  totalBuyingFee: number,
  totalSellingFee: number,
  totalMonthlyFees: number,
  annualInterestRate: number,
  capitalGainsTaxes: number[]
): number[] => {
  const moneyMade: number[] = [];

  // Calculate house value after appreciation for each year
  const houseValues = calculateHouseValueAfterAppreciation(
    years,
    housePrice,
    appreciationRate
  );

  // Calculate remaining loan principal for each year
  const remainingPrincipal = calculateRemainingPrincipal(
    years,
    principal,
    annualInterestRate
  );

  // Calculate total bond repayments for each year
  const totalBondRepayments = calculateBondCost(
    years,
    principal,
    annualInterestRate
  );

  // Calculate cumulative monthly fees for each year
  const monthlyFees = calculateMonthlyFees(years, totalMonthlyFees);

  // Loop through each year to calculate net money made
  for (let i = 0; i <= years; i++) {
    const sellingPrice = houseValues[i]; // House value after appreciation in year i
    const debt = remainingPrincipal[i]; // Remaining loan principal at year i
    const taxes = capitalGainsTaxes[i] || 0; // Capital gains tax for year i
    const cumulativeFees = monthlyFees[i]; // Total monthly fees paid until year i
    const cumulativeBondRepayments = totalBondRepayments.bondCosts[i]; // Total bond repayments made until year i

    // Calculate net selling proceeds
    const netSellingProceeds =
      sellingPrice - debt - totalSellingFee - taxes; // Selling price minus debt, fees, and taxes

    // Total ownership costs (once-off buying fees + cumulative bond repayments + monthly fees)
    const totalOwnershipCosts =
      totalBuyingFee + cumulativeBondRepayments + cumulativeFees;

    // Calculate net money made
    const moneyMadeFromSelling = netSellingProceeds - totalOwnershipCosts;

    moneyMade.push(moneyMadeFromSelling);
  }


  return moneyMade;
};


export const calculateTotalBondRepayments = (
  years: number,
  bondAmount: number,
  annualInterestRate: number
): number[] => {
  const totalRepayments = [];
  const monthlyInterestRate = annualInterestRate / 12 / 100; // Convert annual rate to monthly
  const numberOfPayments = years * 12;

  // Handle 0% interest edge case
  if (annualInterestRate === 0) {
    const equalAnnualRepayment = bondAmount / years;
    for (let i = 0; i <= years; i++) {
      totalRepayments.push(equalAnnualRepayment * i);
    }
    return totalRepayments;
  }

  // Calculate fixed monthly repayment using the bond formula
  const monthlyPayment =
    (bondAmount * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

  // Calculate cumulative total bond repayments for each year
  for (let i = 0; i <= years; i++) {
    const totalPaymentsForYear = monthlyPayment * 12 * i; // Payments made up to year i
    totalRepayments.push(totalPaymentsForYear);
  }

  return totalRepayments;
};



export const calculateBondCost = (
  years: number,
  principal: number,
  annualInterestRate: number
): { bondCosts: number[]; monthlyPayment: number } => {
  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const numberOfPayments = years * 12;

  // Handle 0% interest edge case
  if (annualInterestRate === 0) {
    const equalMonthlyRepayment = principal / numberOfPayments;
    const bondCosts = [];
    for (let i = 0; i <= years; i++) {
      bondCosts.push(equalMonthlyRepayment * 12 * i);
    }
    return { bondCosts, monthlyPayment: equalMonthlyRepayment };
  }

  // Calculate fixed monthly repayment using the bond formula
  const monthlyPayment =
    (principal * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

  const bondCosts = [];
  for (let i = 0; i <= years; i++) {
    const totalPaymentsForYear = monthlyPayment * 12 * i;
    bondCosts.push(totalPaymentsForYear);
  }

  return { bondCosts, monthlyPayment };
};
