import TAX_BRACKETS from '@/constants/TAX_BRACKETS';
import TAX_REBATES from '@/constants/TAX_REBATES';
import TAX_THRESHOLDS from '@/constants/TAX_THRESHOLDS';
import ageCategory from '@/enums/ageCategory';

export const calculateTax = (
  grossAnnualIncome: number,
  annualDeductions: number,
  age: ageCategory,
  year: number
) => {
  const BRACKETS = TAX_BRACKETS[year];
  const REBATES = TAX_REBATES[year];
  const THRESHOLDS = TAX_THRESHOLDS[year];

  if (!BRACKETS || !REBATES || !THRESHOLDS) {
    throw new Error(
      `Tax BRACKETS, REBATES, or THRESHOLDS for the year ${year} are not defined.`
    );
  }

  if( grossAnnualIncome < 0 || annualDeductions < 0) {
    return NaN;
  }

  if( isNaN (grossAnnualIncome) || isNaN(annualDeductions)) {
    return NaN;
  }

  let tax: number = 0;
  let rebate: number = 0;
  let threshold: number = 0;
  const remainingIncome: number = grossAnnualIncome - annualDeductions;

  if (age === ageCategory.None) {
    rebate = 0;
    threshold = 0;
  } 
  else if (age === ageCategory.Under65) {
    rebate = REBATES.under65;
    threshold = THRESHOLDS.under65;
  } else if (age === ageCategory.From65To74) {
    rebate = REBATES.from65to75;
    threshold = THRESHOLDS.from65to75;
  } else if (age === ageCategory.Over75) {
    rebate = REBATES.over75;
    threshold = THRESHOLDS.over75;
  }

  if (remainingIncome <= threshold) {
    return 0;
  }

  for (const bracket of BRACKETS) {
    if (remainingIncome >= bracket.lower && remainingIncome <= bracket.upper) {
      tax =
        bracket.base + bracket.rate * (remainingIncome - (bracket.lower - 1));
      break;
    }
  }

  return Math.max(tax - rebate, 0);
};

export const getTaxBracket = (annualIncome: number, year: number) => {
  const BRACKETS = TAX_BRACKETS[year];

  if (!BRACKETS) {
    throw new Error(`Tax BRACKETS for the year ${year} are not defined.`);
  }

  for (const bracket of BRACKETS) {
    if (annualIncome <= bracket.upper) {
      return bracket;
    }
  }

  return BRACKETS[BRACKETS.length - 1];
};

export const getTaxRebate = (age: ageCategory, year: number) => {
  const REBATES = TAX_REBATES[year];

  if (!REBATES) {
    throw new Error(`Tax REBATES for the year ${year} are not defined.`);
  }

  if (age === ageCategory.Under65) {
    return REBATES.under65;
  } else if (age === ageCategory.From65To74) {
    return REBATES.from65to75;
  } else {
    return REBATES.over75;
  }
};

// export const calculateNetIncome = (
//   annualIncome: number,
//   ageCategory: ageCategory,
//   year: number
// ) => {
//   const tax = calculateTax(annualIncome, ageCategory, year);
//   const netIncome = annualIncome - tax;

//   return netIncome;
// };
