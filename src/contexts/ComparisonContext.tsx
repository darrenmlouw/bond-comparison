import exclusionOption from '@/enums/exclusionOption';
import inclusionOption from '@/enums/inclusionOption';
import { useStorage } from '@/hooks/useStorage';
import {
  calculateBondCost,
  calculateCapitalGainsTax,
  calculateHouseValueAfterAppreciation,
  calculateMoneyMadeFromSellingHouse,
  calculateRemainingPrincipal,
  calculateRentCost,
} from '@/utils/calculations';
import { createContext, ReactNode, useMemo } from 'react';

const validateExclusionType = (value: string): exclusionOption => {
  return Object.values(exclusionOption).includes(value as exclusionOption)
    ? (value as exclusionOption)
    : exclusionOption.None;
};

const validateInclusionType = (value: string): inclusionOption => {
  return Object.values(inclusionOption).includes(value as inclusionOption)
    ? (value as inclusionOption)
    : inclusionOption.Individual;
};

const checkIfNumber = (value: number, defaultValue: number | undefined = 0) => {
  return isNaN(value) ? defaultValue : value;
};

interface ComparisonContextType {
  propertyPrice: number ;
  setPropertyPrice: (income: number) => void;
  depositAmount: number;
  setDepositAmount: (deductions: number) => void;
  loanTermYears: number;
  setLoanTermYears: (age: number) => void;
  annualInterestRate: number;
  setAnnualInterestRate: (year: number) => void;
  annualAppreciationRate: number;
  setAnnualAppreciationRate: (rate: number) => void;
  buyingCosts: number;
  setBuyingCosts: (cost: number) => void;
  otherBuyingCosts: number;
  setOtherBuyingCosts: (cost: number) => void;
  addBuyingCostsToBond: boolean;
  setAddBuyingCostsToBond: (add: boolean) => void;
  monthlyLevies: number;
  setMonthlyLevies: (levy: number) => void;
  monthlyRates: number;
  setMonthlyRates: (rate: number) => void;
  monthlyInsurance: number;
  setMonthlyInsurance: (monthlyInsurance: number) => void;
  additionalMonthlyFees: number;
  setAdditionalMonthlyFees: (fees: number) => void;
  yearOfSale: number;
  setYearOfSale: (year: number) => void;
  sellingCosts: number;
  setSellingCosts: (cost: number) => void;
  otherSellingCosts: number;
  setOtherSellingCosts: (cost: number) => void;
  monthlyRent: number;
  setMonthlyRent: (rent: number) => void;
  annualRentIncrease: number;
  setAnnualRentIncrease: (increase: number) => void;
  exclusionType: exclusionOption;
  setExclusionType: (type: exclusionOption) => void;
  inclusionType: inclusionOption;
  setInclusionType: (type: inclusionOption) => void;
  smallBusinessMarketValue: number;
  setSmallBusinessMarketValue: (value: number) => void;
  numberOfPeopleInJointBond: number;
  setNumberOfPeopleInJointBond: (count: number) => void;
  principleAmount: number;
  totalBuyingCosts: number;
  monthlyFees: number;
  rentData: number[];
  houseValueAfterAppreciationData: number[];
  totalSellingCosts: number;
  capitalGainsTax: number[];
  marginalTaxRate: number;
  inclusionRate: number;
  exclusion: number;
  moneyMadeFromSellingHouse: number[];
  bondCosts: number[];
  monthlyPayment: number;
  remainingPrincipal: number[];
  storageAvailable: boolean;
}

export const ComparisonContext = createContext<
  ComparisonContextType | undefined
>(undefined);

export const ComparisonProvider = ({ children }: { children: ReactNode }) => {
  // State Variables
  const [propertyPrice, setPropertyPrice, , storageAvailable] = useStorage<number>(
    'propertyPrice',
    0,
    'localStorage',
    undefined,
    { parse: parseFloat, serialize: String }
  );

  const [depositAmount, setDepositAmount] = useStorage<number>(
    'depositAmount',
    0,
    'localStorage',
    undefined,
    { parse: parseFloat, serialize: String }
  );
  const [loanTermYears, setLoanTermYears] = useStorage<number>(
    'loanTermYears',
    20,
    'localStorage',
    undefined,
    { parse: parseFloat, serialize: String }
  );
  const [annualInterestRate, setAnnualInterestRate] = useStorage<number>(
    'annualInterestRate',
    11.5,
    'localStorage',
    undefined,
    { parse: parseFloat, serialize: String }
  );
  const [annualAppreciationRate, setAnnualAppreciationRate] = useStorage<number>(
    'annualAppreciationRate',
    4,
    'localStorage',
    undefined,
    { parse: parseFloat, serialize: String }
  );
  const [buyingCosts, setBuyingCosts] = useStorage<number>(
    'buyingCosts',
    0,
    'localStorage',
    undefined,
    { parse: parseFloat, serialize: String }
  );
  const [otherBuyingCosts, setOtherBuyingCosts] = useStorage<number>(
    'otherBuyingCosts',
    0,
    'localStorage',
    undefined,
    { parse: parseFloat, serialize: String }
  );
  const [addBuyingCostsToBond, setAddBuyingCostsToBond] = useStorage<boolean>(
    'addBuyingCostsToBond',
    false,
    'localStorage',
    undefined,
    { parse: (value) => value === 'true', serialize: String }
  );
  const [monthlyLevies, setMonthlyLevies] = useStorage<number>(
    'monthlyLevies',
    0,
    'localStorage',
    undefined,
    { parse: parseFloat, serialize: String }
  );
  const [monthlyRates, setMonthlyRates] = useStorage<number>(
    'monthlyRates',
    0,
    'localStorage',
    undefined,
    { parse: parseFloat, serialize: String }
  );
  const [monthlyInsurance, setMonthlyInsurance] = useStorage<number>(
    'monthlyInsurance',
    0,
    'localStorage',
    undefined,
    { parse: parseFloat, serialize: String }
  );
  const [additionalMonthlyFees, setAdditionalMonthlyFees] = useStorage<number>(
    'additionalMonthlyFees',
    0,
    'localStorage',
    undefined,
    { parse: parseFloat, serialize: String }
  );
  const [yearOfSale, setYearOfSale] = useStorage<number>(
    'yearOfSale',
    4,
    'localStorage',
    undefined,
    { parse: parseFloat, serialize: String }
  );
  const [sellingCosts, setSellingCosts] = useStorage<number>(
    'sellingCosts',
    0,
    'localStorage',
    undefined,
    { parse: parseFloat, serialize: String }
  );
  const [otherSellingCosts, setOtherSellingCosts] = useStorage<number>(
    'otherSellingCosts',
    0,
    'localStorage',
    undefined,
    { parse: parseFloat, serialize: String }
  );
  const [monthlyRent, setMonthlyRent] = useStorage<number>(
    'monthlyRent',
    0,
    'localStorage',
    undefined,
    { parse: parseFloat, serialize: String }
  );
  const [annualRentIncrease, setAnnualRentIncrease] = useStorage<number>(
    'annualRentIncrease',
    10,
    'localStorage',
    undefined,
    { parse: parseFloat, serialize: String }
  );
  const [storedExclusionType, setExclusionType] = useStorage<string>(
    'exclusionType',
    exclusionOption.PrimaryResidence,
    'localStorage',
    undefined,
    { parse: String, serialize: String }
  );
  const [storedInclusionType, setInclusionType] = useStorage<string>(
    'inclusionType',
    inclusionOption.Individual,
    'localStorage',
    undefined,
    { parse: String, serialize: String }
  );
  const [smallBusinessMarketValue, setSmallBusinessMarketValue] = useStorage<number>(
    'smallBusinessMarketValue',
    0,
    'localStorage',
    undefined,
    { parse: parseFloat, serialize: String }
  );
  const [numberOfPeopleInJointBond, setNumberOfPeopleInJointBond] = useStorage<number>(
    'numberOfPeopleInJointBond',
    2,
    'localStorage',
    undefined,
    { parse: parseFloat, serialize: String }
  );

  const parsedExclusionType = validateExclusionType(storedExclusionType);
  const parsedInclusionType = validateInclusionType(storedInclusionType);

  // Derived Calculations
  const principleAmount = useMemo(() => {
    return addBuyingCostsToBond
      ? checkIfNumber(buyingCosts) + checkIfNumber(propertyPrice) - checkIfNumber(depositAmount)
      : checkIfNumber(propertyPrice) - checkIfNumber(depositAmount);
  }, [addBuyingCostsToBond, buyingCosts, propertyPrice, depositAmount]);

  const totalBuyingCosts = useMemo(() => {
    return addBuyingCostsToBond ? checkIfNumber(otherBuyingCosts) : checkIfNumber(buyingCosts) + checkIfNumber(otherBuyingCosts);
  }, [addBuyingCostsToBond, buyingCosts, otherBuyingCosts]);

  const monthlyFees = useMemo(() => {
    return checkIfNumber(monthlyLevies) + checkIfNumber(monthlyRates) + checkIfNumber(monthlyInsurance) + checkIfNumber(additionalMonthlyFees);
  }, [monthlyLevies, monthlyRates, monthlyInsurance, additionalMonthlyFees]);

  const rentData = useMemo(() => {
    return calculateRentCost(loanTermYears, monthlyRent, annualRentIncrease);
  }, [loanTermYears, monthlyRent, annualRentIncrease]);

  const houseValueAfterAppreciationData = useMemo(() => {
    return calculateHouseValueAfterAppreciation(loanTermYears, propertyPrice, annualAppreciationRate);
  }, [loanTermYears, propertyPrice, annualAppreciationRate]);

  const totalSellingCosts = useMemo(() => {
    return checkIfNumber(sellingCosts) + checkIfNumber(otherSellingCosts);
  }, [sellingCosts, otherSellingCosts]);

  const { capitalGainsTax, marginalTaxRate, inclusionRate, exclusion } = useMemo(() => {
    return calculateCapitalGainsTax(
      loanTermYears,
      houseValueAfterAppreciationData,
      propertyPrice,
      parsedInclusionType,
      parsedExclusionType,
      numberOfPeopleInJointBond,
      smallBusinessMarketValue
    );
  }, [
    loanTermYears,
    houseValueAfterAppreciationData,
    propertyPrice,
    parsedInclusionType,
    parsedExclusionType,
    numberOfPeopleInJointBond,
    smallBusinessMarketValue,
  ]);

  const moneyMadeFromSellingHouse = useMemo(() => {
    return calculateMoneyMadeFromSellingHouse(
      loanTermYears,
      propertyPrice,
      principleAmount,
      annualAppreciationRate,
      totalBuyingCosts,
      totalSellingCosts,
      monthlyFees,
      annualInterestRate,
      capitalGainsTax
    );
  }, [
    loanTermYears,
    propertyPrice,
    principleAmount,
    annualAppreciationRate,
    totalBuyingCosts,
    totalSellingCosts,
    monthlyFees,
    annualInterestRate,
    capitalGainsTax,
  ]);

  const { bondCosts, monthlyPayment } = useMemo(() => {
    return calculateBondCost(loanTermYears, principleAmount, annualInterestRate);
  }, [loanTermYears, principleAmount, annualInterestRate]);

  const remainingPrincipal = useMemo(() => {
    return calculateRemainingPrincipal(loanTermYears, principleAmount, annualInterestRate);
  }, [loanTermYears, principleAmount, annualInterestRate]);

  return (
    <ComparisonContext.Provider
      value={{
        propertyPrice: propertyPrice ?? 0,
        setPropertyPrice,
        depositAmount: depositAmount ?? 0,
        setDepositAmount,
        loanTermYears: loanTermYears ?? 0,
        setLoanTermYears,
        annualInterestRate: annualInterestRate ?? 0,
        setAnnualInterestRate,
        annualAppreciationRate: annualAppreciationRate ?? 0,
        setAnnualAppreciationRate,
        buyingCosts: buyingCosts ?? 0,
        setBuyingCosts,
        otherBuyingCosts: otherBuyingCosts ?? 0,
        setOtherBuyingCosts,
        addBuyingCostsToBond: addBuyingCostsToBond ?? false,
        setAddBuyingCostsToBond,
        monthlyLevies: monthlyLevies ?? 0,
        setMonthlyLevies,
        monthlyRates: monthlyRates ?? 0,
        setMonthlyRates,
        monthlyInsurance: monthlyInsurance ?? 0,
        setMonthlyInsurance,
        additionalMonthlyFees: additionalMonthlyFees ?? 0,
        setAdditionalMonthlyFees,
        yearOfSale: yearOfSale ?? 0,
        setYearOfSale,
        sellingCosts: sellingCosts ?? 0,
        setSellingCosts,
        otherSellingCosts: otherSellingCosts ?? 0,
        setOtherSellingCosts,
        monthlyRent: monthlyRent ?? 0,
        setMonthlyRent,
        annualRentIncrease: annualRentIncrease ?? 0,
        setAnnualRentIncrease,
        exclusionType: parsedExclusionType ?? exclusionOption.None,
        setExclusionType,
        inclusionType: parsedInclusionType ?? inclusionOption.Individual,
        setInclusionType,
        smallBusinessMarketValue: smallBusinessMarketValue ?? 0,
        setSmallBusinessMarketValue,
        numberOfPeopleInJointBond: numberOfPeopleInJointBond ?? 0,
        setNumberOfPeopleInJointBond,
        principleAmount: principleAmount ?? 0,
        totalBuyingCosts: totalBuyingCosts ?? 0,
        monthlyFees: monthlyFees ?? 0,
        rentData: rentData,
        houseValueAfterAppreciationData: houseValueAfterAppreciationData ?? [],
        totalSellingCosts: totalSellingCosts ?? 0,
        capitalGainsTax: capitalGainsTax ?? [],
        marginalTaxRate: marginalTaxRate ?? 0,
        inclusionRate: inclusionRate ?? 0,
        exclusion: exclusion ?? 0,
        moneyMadeFromSellingHouse: moneyMadeFromSellingHouse ?? [],
        bondCosts: bondCosts ?? [],
        monthlyPayment: monthlyPayment ?? 0,
        remainingPrincipal : remainingPrincipal ?? [],
        storageAvailable : storageAvailable ?? false,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};
