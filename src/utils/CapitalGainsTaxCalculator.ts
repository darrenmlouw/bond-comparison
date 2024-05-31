import ExclusionOptions from '@/enums/ExclusionOptions';
import InclusionOptions from '@/enums/InclusionOptions';

export class CapitalGainsTaxCalculator {
	sellingPrice: number;
	baseCost: number;
	smallBusinessMarketValue: number;
	exclusion: ExclusionOptions;
	inclusion: InclusionOptions;
	numberOfPeopleInJointBond: number;

	constructor(
		sellingPrice: number,
		baseCost: number,
		smallBusinessMarketValue: number,
		exclusion: ExclusionOptions,
		inclusion: InclusionOptions,
		numberofPeopleInJointBond: number
	) {
		this.sellingPrice = sellingPrice;
		this.baseCost = baseCost;
		this.smallBusinessMarketValue = smallBusinessMarketValue;
		this.exclusion = exclusion;
		this.inclusion = inclusion;
		this.numberOfPeopleInJointBond = numberofPeopleInJointBond;
	}

	private calculateMarginalTaxRate(): number {
		if (this.inclusion === InclusionOptions.Trust) {
			return 0.36;
		}
		if (this.inclusion === InclusionOptions.Company) {
			return 0.216;
		}
		if (this.inclusion === InclusionOptions.Individual) {
			return 0.18;
		}

		throw new Error('Invalid inclusion option');
	}

	calculate(): {
		capitalGainsTax: number;
		exclusion: number;
		capitalGain: number;
		netCapitalGain: number;
		taxableGain: number;
		inclusionRate: number;
		marginalTaxRate: number;
	}{
		// Calculate capital gain
		const capitalGain = this.sellingPrice - this.baseCost;
		console.log('capitalGain', capitalGain);

		// Apply exclusions
		let exclusion = 0;
		switch (this.exclusion) {
			case ExclusionOptions.PrimaryResidence:
				exclusion = 2000000;
				break;
			case ExclusionOptions.SecondProperty:
				exclusion = 40000;
				break;
			case ExclusionOptions.JointBond:
				exclusion = 1000000 * this.numberOfPeopleInJointBond;
				break;
			case ExclusionOptions.Deceased:
				exclusion = 300000;
				break;
			case ExclusionOptions.SmallBusinessOwner:
				if (this.smallBusinessMarketValue <= 10000000) {
					exclusion = 1800000;
				}
				break;
			default:
				exclusion = 0;
		}

		const netCapitalGain = Math.max(0, capitalGain - exclusion);

		let inclusionRate: number = 0;
		if (this.inclusion === InclusionOptions.Individual) {
			inclusionRate = 0.4;
		} else if (this.inclusion === InclusionOptions.Company) {
			inclusionRate = 0.8;
		} else if (this.inclusion === InclusionOptions.Trust) {
			inclusionRate = 0.8;
		} else {
			throw new Error('Invalid inclusion option');
		}

		// Calculate taxable gain
		const taxableGain = netCapitalGain * inclusionRate;

		// Calculate marginal tax rate
		const marginalTaxRate = this.calculateMarginalTaxRate();

		// Calculate capital gains tax
		const capitalGainsTax = taxableGain * marginalTaxRate;

		return {capitalGainsTax, exclusion, capitalGain, netCapitalGain, taxableGain, inclusionRate, marginalTaxRate};
	}
}
