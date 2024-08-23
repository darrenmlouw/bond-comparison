import TAX_BRACKETS from '@/constants/taxBrackets';
import TAX_REBATES from '@/constants/taxRebates';
import TAX_THRESHOLD from '@/constants/taxThreshold';

export const calculateTax = (
	annualIncome: number,
	age: number,
	year: number
) => {
	const brackets = TAX_BRACKETS[year];
	const rebates = TAX_REBATES[year];
	const thresholds = TAX_THRESHOLD[year];

	if (!brackets || !rebates || !thresholds) {
		throw new Error(
			`Tax brackets, rebates, or thresholds for the year ${year} are not defined.`
		);
	}

	let tax = 0;
	const remainingIncome = annualIncome;
	let threshold = thresholds.under65;

	if (age >= 65 && age < 75) {
		threshold = thresholds.from65to75;
	} else if (age >= 75) {
		threshold = thresholds.over75;
	}

	// If annual income is below the threshold, tax is 0
	if (annualIncome <= threshold) {
		return 0;
	}

	for (const bracket of brackets) {
		if (remainingIncome >= bracket.lower && remainingIncome <= bracket.upper) {
			tax =
				bracket.base + bracket.rate * (remainingIncome - (bracket.lower - 1));
			break;
		}
	}

	let rebate = rebates.under65;
	if (age >= 65 && age < 75) {
		rebate = rebates.from65to75;
	} else if (age >= 75) {
		rebate = rebates.over75;
	}

	return Math.max(tax - rebate, 0); // Ensure that tax doesn't go negative after rebate
};

export const getTaxBracket = (annualIncome: number, year: number) => {
	const brackets = TAX_BRACKETS[year];

	if (!brackets) {
		throw new Error(`Tax brackets for the year ${year} are not defined.`);
	}

	for (const bracket of brackets) {
		if (annualIncome <= bracket.upper) {
			return bracket;
		}
	}

	return brackets[brackets.length - 1];
};

export const getTaxRebate = (age: number, year: number) => {
	const rebates = TAX_REBATES[year];

	if (!rebates) {
		throw new Error(`Tax rebates for the year ${year} are not defined.`);
	}

	if (age < 65) {
		return rebates.under65;
	} else if (age >= 65 && age < 75) {
		return rebates.from65to75;
	} else {
		return rebates.over75;
	}
};

export const calculateNetIncome = (
	annualIncome: number,
	age: number,
	year: number
) => {
	const tax = calculateTax(annualIncome, age, year);
	const netIncome = annualIncome - tax;

	return netIncome;
};
