import exclusionOption from "@/enums/exclusionOption";
import inclusionOption from "@/enums/inclusionOption";

class CapitalGainsTaxCalculator {
  private sellingPrice: number;
  private baseCost: number;
  private inclusion: inclusionOption;
  private exclusion: exclusionOption;
  private numberOfOwners: number;
  private smallBusinessMarketValue?: number;

  constructor(
    sellingPrice: number,
    baseCost: number,
    inclusion: inclusionOption,
    exclusion: exclusionOption,
    numberOfOwners: number = 1,
    smallBusinessMarketValue?: number
  ) {
    if (sellingPrice < 0 || baseCost < 0) {
      throw new Error("Selling price and base cost should be non-negative values");
    }
    if (numberOfOwners <= 0) {
      throw new Error("Number of owners must be at least 1");
    }

    this.sellingPrice = sellingPrice;
    this.baseCost = baseCost;
    this.inclusion = inclusion;
    this.exclusion = exclusion;
    this.numberOfOwners = numberOfOwners;
    this.smallBusinessMarketValue = smallBusinessMarketValue;
  }

  private getInclusionRate(): number {
    switch (this.inclusion) {
      case inclusionOption.Individual:
        return 0.4;
      case inclusionOption.Company:
      case inclusionOption.Trust:
        return 0.8;
      default:
        throw new Error("Invalid inclusion option");
    }
  }

  private getMarginalTaxRate(): number {
    switch (this.inclusion) {
      case inclusionOption.Individual:
        return 0.18; // Example individual tax rate
      case inclusionOption.Company:
        return 0.28; // Corporate tax rate
      case inclusionOption.Trust:
        return 0.45; // Trusts are taxed at a flat rate
      default:
        throw new Error("Invalid inclusion option");
    }
  }

  private calculateExclusion(capitalGain: number): number {
    switch (this.exclusion) {
      case exclusionOption.PrimaryResidence:
        return Math.min(2000000 / this.numberOfOwners, capitalGain); // Primary residence exclusion up to R2M
      case exclusionOption.SecondProperty:
        return Math.min(40000, capitalGain); // Standard exclusion for second properties
      case exclusionOption.JointBond:
        return Math.min(2000000 / this.numberOfOwners, capitalGain); // Primary residence joint bond split among owners
      case exclusionOption.Deceased:
        return Math.min(300000, capitalGain); // R300K exclusion if the individual is deceased
      case exclusionOption.SmallBusinessOwner:
        if (
          this.smallBusinessMarketValue !== undefined &&
          this.smallBusinessMarketValue <= 10000000
        ) {
          return Math.min(1800000, capitalGain); // Up to R1.8M exclusion for qualifying small businesses
        }
        return 0;
      case exclusionOption.Annual:
        return Math.min(40000, capitalGain); // R40K annual exclusion for individuals
      case exclusionOption.None:
      default:
        return 0;
    }
  }

  public calculate(): {
    capitalGainsTax: number;
    exclusion: number;
    capitalGain: number;
    netCapitalGain: number;
    taxableGain: number;
    inclusionRate: number;
    marginalTaxRate: number;
  } {
    const capitalGain = this.sellingPrice - this.baseCost;
    const exclusion = this.calculateExclusion(capitalGain);
    const netCapitalGain = Math.max(0, capitalGain - exclusion);
    const inclusionRate = this.getInclusionRate();
    const taxableGain = netCapitalGain * inclusionRate;
    const marginalTaxRate = this.getMarginalTaxRate();
    const capitalGainsTax = taxableGain * marginalTaxRate;

    return {
      capitalGainsTax,
      exclusion,
      capitalGain,
      netCapitalGain,
      taxableGain,
      inclusionRate,
      marginalTaxRate,
    };
  }
}

export default CapitalGainsTaxCalculator;
