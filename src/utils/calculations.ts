export const calculateRentCost = (
	years: number,
	monthlyRent: number
): number[] => {
	const rentCost = [];
	for (let i = 0; i <= years; i++) {
		rentCost.push(-monthlyRent * 12 * i); // Negative value to indicate a cost
	}
	return rentCost;
};

export const calculateHouseValueAfterAppreciation = (
	years: number,
	housePrice: number,
	appreciationRate: number
): number[] => {
	const houseValues = [];
	for (let i = 0; i <= years; i++) {
		houseValues.push(housePrice * (1 + appreciationRate / 100) ** i);
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
				((1 + monthlyInterestRate) ** numberOfPayments -
					(1 + monthlyInterestRate) ** paymentsMade)) /
			((1 + monthlyInterestRate) ** numberOfPayments - 1);
		remainingPrincipal.push(-remainingBalance); // Negative value to indicate a liability
	}

	return remainingPrincipal;
};

export const calculateMoneyMadeFromSellingHouse = (
	years: number,
	housePrice: number,
	deposit: number,
	appreciationRate: number,
	totalBuyingFee: number,
	totalSellingFee: number,
	totalMonthlyFees: number,
	interestRate: number
): number[] => {
	const moneyMade = [];
	const houseValues = calculateHouseValueAfterAppreciation(
		years,
		housePrice,
		appreciationRate
	);
	const monthlyFees = calculateMonthlyFees(years, totalMonthlyFees);
	const remainingPrincipal = calculateRemainingPrincipal(
		years,
		housePrice,
		deposit,
		interestRate
	);
	for (let i = 0; i <= years; i++) {
		const houseValueAtYear = houseValues[i];
		const monthlyFeeAtYear = monthlyFees[i];
		const remPrincipalAtYear = remainingPrincipal[i];
		const moneyMadeFromSelling =
			houseValueAtYear +
			remPrincipalAtYear +
			monthlyFeeAtYear -
			totalBuyingFee -
			totalSellingFee;
		moneyMade.push(moneyMadeFromSelling);
	}
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

export const calculateCapitalGainsTax = (
	sellingPrice: number,
	baseCost: number,
	primaryResidence: boolean,
	// marginalTaxRate: number,
	secondProperty: boolean,
	jointBond: boolean,
	isDeceased: boolean,
	isSmallBusinessOwner: boolean,
	smallBusinessMarketValue: number,
	isTrust: boolean,
	isCompany: boolean
): number => {
	// Calculate capital gain
	const capitalGain = sellingPrice - baseCost;

	// Apply exclusions
	let exclusion = 0;
	if (primaryResidence) {
		exclusion = jointBond ? 1000000 : 2000000;
	} else if (secondProperty) {
		exclusion = 40000;
	} else if (isDeceased) {
		exclusion = 300000;
	} else if (isSmallBusinessOwner && smallBusinessMarketValue <= 10000000) {
		exclusion = 1800000;
	}

	const netCapitalGain = Math.max(0, capitalGain - exclusion);

	// Determine inclusion rate
	let inclusionRate = 0.4; // Default for individuals
	if (isTrust) {
		inclusionRate = 0.8;
	} else if (isCompany) {
		inclusionRate = 0.8;
	}

	let marginalTaxRate: number = 0.18;
	// if individual 18%, if business 21.6% and if trust 36%
	if (isCompany) {
		marginalTaxRate = 0.216;
	} else if (isTrust) {
		marginalTaxRate = 0.36;
	} else {
		marginalTaxRate = 0.18;
	}

	// if(isCompany){

	// }
	// else if(isTrust){
		
	// }
	// else{
	// 	if (primaryResidence){
	// 		if(jointBond){
	// 			if(capitalGain <= 2000000){

	// 			}
	// 			else{

	// 			}
	// 		}
	// 		else{
	// 			if(capitalGain <= 1000000){

	// 			}
	// 			else{

	// 			}
	// 		}
		
	// 	}
	// 	else if(secondProperty){
	// 		if(capitalGain <= 40000){

	// 		}
	// 		else{

	// 		}
	// 	}
	// 	else if(isDeceased){
	// 		if(capitalGain <= 300000){

	// 		}
	// 		else{

	// 		}
	// 	}
	// 	else if(isSmallBusinessOwner){
	// 		if(smallBusinessMarketValue <= 10000000){
	// 			if(capitalGain <= 1800000){

	// 			}
	// 			else{

	// 			}
	// 		}
	// 		else{

	// 		}
	// 	}
	// 	else{

	// 	}
	// }


	// Calculate taxable gain
	const taxableGain = netCapitalGain * inclusionRate;

	// Calculate capital gains tax
	const capitalGainsTax = taxableGain * marginalTaxRate;

	return capitalGainsTax;
};

// export const calculateCapitalGainsTax = (
//   housePrice: number,
//   appreciationRate: number,
//   sellingYear: number,
//   buyingFee: number,
//   sellingFee: number,
//   deposit: number,
//   interestRate: number,
//   complianceCertificates: number
// ): number => {
//   const houseValues = calculateHouseValueAfterAppreciation(housePrice, appreciationRate, sellingYear);
//   const houseValueAtSale = houseValues[sellingYear];
//   const initialInvestment = housePrice - deposit;
//   const gain = houseValueAtSale - initialInvestment - buyingFee - sellingFee - complianceCertificates;
//   const primaryResidenceExclusion = 2000000;
//   const taxableGain = Math.max(0, gain - primaryResidenceExclusion);
//   const inclusionAmount = taxableGain * 0.4;
//   const marginalTaxRate = 0.45; // Example highest marginal rate
//   return inclusionAmount * marginalTaxRate;
// };

// export const calculateTotalOwnershipCost = (
//   buyingCosts: number,
//   otherBuyingCosts: number,
//   transferDuty: number,
//   bondRegistrationFees: number,
//   initiationFees: number,
//   valuationFees: number,
//   complianceCertificates: number,
//   bondCancellationFees: number,
//   years: number,
//   monthlyAdditionalFees: number
// ): number => {
//   const totalMonthlyFees = monthlyAdditionalFees * 12 * years;
//   const totalOneOffFees =
//     buyingCosts +
//     otherBuyingCosts +
//     transferDuty +
//     bondRegistrationFees +
//     initiationFees +
//     valuationFees +
//     complianceCertificates +
//     bondCancellationFees;
//   return totalMonthlyFees + totalOneOffFees;
// };
