import exclusionOption from '@/enums/exclusionOption';
import inclusionOption from '@/enums/inclusionOption';
import { useStorage } from '@/hooks/useStorage';
import { createContext, ReactNode } from 'react';

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

interface ComparisonContextType {
  propertyPrice: number;
  setPropertyPrice: (income: number) => void;
  depositAmount: number;
  setDepositAmount: (deductions: number) => void;
  loanTermYears: number;
  setLoanTermYearsYears: (age: number) => void;
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
  storageAvailable: boolean;
}

export const ComparisonContext = createContext<ComparisonContextType | undefined>(
  undefined
);

export const ComparisonProvider = ({ children }: { children: ReactNode }) => {
  // State Variables
  const [propertyPrice, setPropertyPrice, , storageAvailable] = useStorage('propertyPrice', '1000000', 'localStorage');
  const [annualInterestRate, setAnnualInterestRate] = useStorage('annualInterestRate', '11.5', 'localStorage');
  const [depositAmount, setDepositAmount] = useStorage('depositAmount', '0', 'localStorage');
  const [loanTermYears, setLoanTermYearsYears] = useStorage('loanTermYears', '20', 'localStorage');
  const [annualAppreciationRate, setAnnualAppreciationRate] = useStorage('annualAppreciationRate', '4', 'localStorage');
  const [buyingCosts, setBuyingCosts] = useStorage('buyingCosts', '100000', 'localStorage');
  const [otherBuyingCosts, setOtherBuyingCosts] = useStorage('otherBuyingCosts', '0', 'localStorage');
  const [addBuyingCostsToBond, setAddBuyingCostsToBond] = useStorage('addBuyingCostsToBond', 'false', 'localStorage');
  const [monthlyLevies, setMonthlyLevies] = useStorage('monthlyLevies', '1000', 'localStorage');
  const [monthlyRates, setMonthlyRates] = useStorage('monthlyRates', '1000', 'localStorage');
  const [monthlyInsurance, setMonthlyInsurance] = useStorage('monthlyInsurance', '1000', 'localStorage');
  const [additionalMonthlyFees, setAdditionalMonthlyFees] = useStorage('additionalMonthlyFees', '500', 'localStorage');
  const [yearOfSale, setYearOfSale] = useStorage('yearOfSale', '4', 'localStorage');
  const [sellingCosts, setSellingCosts] = useStorage('sellingCosts', '50000', 'localStorage');
  const [otherSellingCosts, setOtherSellingCosts] = useStorage('otherSellingCosts', '50000', 'localStorage');
  const [monthlyRent, setMonthlyRent] = useStorage('monthlyRent', '10000', 'localStorage');
  const [annualRentIncrease, setAnnualRentIncrease] = useStorage('annualRentIncrease', '8', 'localStorage');

  const [storedExclusionType, setExclusionType] = useStorage('exclusionType', exclusionOption.PrimaryResidence, 'localStorage');
  const [storedInclusionType, setInclusionType] = useStorage('inclusionType', inclusionOption.Individual, 'localStorage');
  const parsedExclusionType = validateExclusionType(storedExclusionType);
  const parsedInclusionType = validateInclusionType(storedInclusionType);

  const [smallBusinessMarketValue, setSmallBusinessMarketValue] = useStorage('smallBusinessMarketValue', '0', 'localStorage');
  const [numberOfPeopleInJointBond, setNumberOfPeopleInJointBond] = useStorage('numberOfPeopleInJointBond', '2', 'localStorage');

  const handleSetHousePrice = (income: number) => setPropertyPrice(income.toString());
  const handleSetDeposit = (deductions: number) => setDepositAmount(deductions.toString());
  const handlesetLoanTermYearsYears = (years: number) => setLoanTermYearsYears(years.toString());
  const handlesetAnnualInterestRate = (annualInterestRate: number) => setAnnualInterestRate(annualInterestRate.toString());
  const handleSetAppreciationRate = (annualAppreciationRate: number) => setAnnualAppreciationRate(annualAppreciationRate.toString());
  const handleSetBuyingCosts = (cost: number) => setBuyingCosts(cost.toString());
  const handleSetOtherBuyingCosts = (cost: number) => setOtherBuyingCosts(cost.toString());
  const handleSetAddBuyingCostsToBond = (add: boolean) => setAddBuyingCostsToBond(add.toString());
  const handleSetLevies = (levy: number) => setMonthlyLevies(levy.toString());
  const handleSetRates = (rate: number) => setMonthlyRates(rate.toString());
  const handleSetInsurance = (monthlyInsurance: number) => setMonthlyInsurance(monthlyInsurance.toString());
  const handleSetOtherMonthlyFees = (fees: number) => setAdditionalMonthlyFees(fees.toString());
  const handleSetSellingYear = (year: number) => setYearOfSale(year.toString());
  const handleSetSellingCosts = (cost: number) => setSellingCosts(cost.toString());
  const handleSetOtherSellingCosts = (cost: number) => setOtherSellingCosts(cost.toString());
  const handleSetMonthlyRent = (rent: number) => setMonthlyRent(rent.toString());
  const handleSetAnnualRentIncrease = (increase: number) => setAnnualRentIncrease(increase.toString());
  const handleSetExclusionType = (type: exclusionOption) => setExclusionType(type);
  const handleSetInclusionType = (type: inclusionOption) => setInclusionType(type);
  const handleSetSmallBusinessMarketValue = (value: number) => setSmallBusinessMarketValue(value.toString());
  const handleSetNumberOfPeopleInJointBond = (count: number) => setNumberOfPeopleInJointBond(count.toString());

  return (
    <ComparisonContext.Provider
      value={{
        propertyPrice: Number(propertyPrice),
        setPropertyPrice: handleSetHousePrice,
        depositAmount: Number(depositAmount),
        setDepositAmount: handleSetDeposit,
        loanTermYears: Number(loanTermYears),
        setLoanTermYearsYears: handlesetLoanTermYearsYears,
        annualInterestRate: Number(annualInterestRate),
        setAnnualInterestRate: handlesetAnnualInterestRate,
        annualAppreciationRate: Number(annualAppreciationRate),
        setAnnualAppreciationRate: handleSetAppreciationRate,
        buyingCosts: Number(buyingCosts),
        setBuyingCosts: handleSetBuyingCosts,
        otherBuyingCosts: Number(otherBuyingCosts),
        setOtherBuyingCosts: handleSetOtherBuyingCosts,
        addBuyingCostsToBond: addBuyingCostsToBond === 'true',
        setAddBuyingCostsToBond: handleSetAddBuyingCostsToBond,
        monthlyLevies: Number(monthlyLevies),
        setMonthlyLevies: handleSetLevies,
        monthlyRates: Number(monthlyRates),
        setMonthlyRates: handleSetRates,
        monthlyInsurance: Number(monthlyInsurance),
        setMonthlyInsurance: handleSetInsurance,
        additionalMonthlyFees: Number(additionalMonthlyFees),
        setAdditionalMonthlyFees: handleSetOtherMonthlyFees,
        yearOfSale: Number(yearOfSale),
        setYearOfSale: handleSetSellingYear,
        sellingCosts: Number(sellingCosts),
        setSellingCosts: handleSetSellingCosts,
        otherSellingCosts: Number(otherSellingCosts),
        setOtherSellingCosts: handleSetOtherSellingCosts,
        monthlyRent: Number(monthlyRent),
        setMonthlyRent: handleSetMonthlyRent,
        annualRentIncrease: Number(annualRentIncrease),
        setAnnualRentIncrease: handleSetAnnualRentIncrease,
        exclusionType: parsedExclusionType,
        setExclusionType: handleSetExclusionType,
        inclusionType: parsedInclusionType,
        setInclusionType: handleSetInclusionType,
        smallBusinessMarketValue: Number(smallBusinessMarketValue),
        setSmallBusinessMarketValue: handleSetSmallBusinessMarketValue,
        numberOfPeopleInJointBond: Number(numberOfPeopleInJointBond),
        setNumberOfPeopleInJointBond: handleSetNumberOfPeopleInJointBond,
        storageAvailable,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};
