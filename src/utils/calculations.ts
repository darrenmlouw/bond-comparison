import exclusionOption from '@/enums/exclusionOption';
import inclusionOption from '@/enums/inclusionOption';
import CapitalGainsTaxCalculator from '@/utils/capitalGainsCalculations';

export const calculateRentCost = (
  duration: number,
  monthlyRent: number,
  annualRentIncreaseRate: number
): number[] => {
  const rentCosts: number[] = [0]; // Initialize with year 0 having a rent cost of 0
  let cumulativeRent = 0;
  let currentMonthlyRent = monthlyRent;

  for (let year = 1; year <= duration; year++) {
    const annualRent = currentMonthlyRent * 12;
    cumulativeRent -= annualRent;
    rentCosts.push(cumulativeRent);
    currentMonthlyRent *= 1 + annualRentIncreaseRate / 100;
  }

  return rentCosts;
};

export const calculateHouseValueAfterAppreciation = (
  years: number,
  housePrice: number,
  appreciationRate: number
): number[] => {
  const houseValues = [];
  for (let i = 0; i <= years; i++) {
    houseValues.push(housePrice * Math.pow(1 + appreciationRate / 100, i));
  }
  return houseValues;
};

export const calculateMonthlyFees = (
  years: number,
  monthlyFees: number
): number[] => {
  const fees = [];
  for (let i = 0; i <= years; i++) {
    fees.push(-monthlyFees * 12 * i); // Negative value to indicate a cost
  }
  return fees;
};

export const calculateRemainingPrincipal = (
  years: number,
  housePrice: number,
  deposit: number,
  annualInterestRate: number
): number[] => {
  const remainingPrincipal = [];
  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const numberOfPayments = years * 12;
  const bondAmount = housePrice - deposit;

  for (let i = 0; i <= years; i++) {
    const paymentsMade = i * 12;
    const remainingBalance =
      (bondAmount *
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) -
          Math.pow(1 + monthlyInterestRate, paymentsMade))) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    remainingPrincipal.push(-remainingBalance); // Negative value to indicate a liability
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
  deposit: number,
  appreciationRate: number,
  totalBuyingFee: number,
  totalSellingFee: number,
  totalMonthlyFees: number,
  interestRate: number,
  capitalGainsTaxes: number[]
): number[] => {
  console.log('y/ears', years);
  const moneyMade = [];
  const houseValues = calculateHouseValueAfterAppreciation(
    years,
    housePrice,
    appreciationRate
  );
  console.log('houseValues', houseValues);

  const monthlyFees = calculateMonthlyFees(years, totalMonthlyFees);

  console.log('monthlyFees', monthlyFees);
  const remainingPrincipal = calculateRemainingPrincipal(
    years,
    housePrice,
    deposit,
    interestRate
  );

  console.log('remainingPrincipal', remainingPrincipal);
  for (let i = 0; i <= years; i++) {
    const moneyMadeFromSelling =
      houseValues[i] +
      remainingPrincipal[i] +
      monthlyFees[i] -
      totalBuyingFee -
      totalSellingFee -
      capitalGainsTaxes[i];
    moneyMade.push(moneyMadeFromSelling);
  }
  // console.log('moneyMade', moneyMade);
  return moneyMade;
};

export const calculateBondCost = (
  years: number,
  housePrice: number,
  deposit: number,
  annualInterestRate: number
): { bondCosts: number[]; monthlyPayment: number } => {
  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const numberOfPayments = years * 12;
  const bondAmount = housePrice - deposit;
  const monthlyPayment =
    (bondAmount * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
  const bondCosts = [];

  for (let i = 0; i <= years; i++) {
    const totalPaymentsForYear = monthlyPayment * 12 * i;
    bondCosts.push(totalPaymentsForYear);
  }

  return { bondCosts, monthlyPayment };
};
