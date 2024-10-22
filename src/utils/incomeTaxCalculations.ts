import TAX_BRACKETS from '@/constants/TAX_BRACKETS';
import TAX_REBATES from '@/constants/TAX_REBATES';
import TAX_THRESHOLDS from '@/constants/TAX_THRESHOLDS';
import ageCategory from '@/enums/ageCategory';

export const calculateTax = (
	annualIncome: number,
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

	let tax = 0;
	const remainingIncome = annualIncome;
	let threshold = THRESHOLDS.under65;

	if (age === ageCategory.From65To74) {
		threshold = THRESHOLDS.from65to75;
	} else if (age === ageCategory.Over75) {
		threshold = THRESHOLDS.over75;
	}

	// If annual income is below the threshold, tax is 0
	if (annualIncome <= threshold) {
		return 0;
	}

	for (const bracket of BRACKETS) {
		if (remainingIncome >= bracket.lower && remainingIncome <= bracket.upper) {
			tax =
				bracket.base + bracket.rate * (remainingIncome - (bracket.lower - 1));
			break;
		}
	}

	let rebate = REBATES.under65;
	if (age === ageCategory.From65To74) {
		rebate = REBATES.from65to75;
	} else if (age === ageCategory.Over75) {
		rebate = REBATES.over75;
	}

	return Math.max(tax - rebate, 0); // Ensure that tax doesn't go negative after rebate
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

export const calculateNetIncome = (
	annualIncome: number,
	ageCategory: ageCategory,
	year: number
) => {
	const tax = calculateTax(annualIncome, ageCategory, year);
	const netIncome = annualIncome - tax;

	return netIncome;
};
