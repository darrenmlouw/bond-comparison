import { formatNumber } from '@/utils/formatNumber';
import { Slider } from '@/components/ui/slider';
import { useComparison } from '@/hooks/useComparison';
import RentVsHouseProfitPopover from '@/pages/Comparison/components/RentVsHouseProfitPopover';
import { Home, Building, GitCompare } from 'lucide-react';
import { EasingDefinition, motion } from 'framer-motion';
import CardValue from '@/components/card/CardValue';
import PropertyReturnExplanation from '@/pages/Comparison/components/PropertyReturnExplanation';
import RentLossExplanation from '@/pages/Comparison/components/RentLossExplanation';

interface Props {
  animationDelay: number;
  animationDuration: number;
  animationEase?: EasingDefinition;
  animationXDistance?: number;
  animationYDistance?: number;
}

function RentVsHouseCard({
  animationDelay,
  animationDuration,
  animationEase = 'easeOut',
  animationXDistance = 0,
  animationYDistance = 0,
}: Props) {
  const {
    yearOfSale,
    setYearOfSale,
    loanTermYears,
    moneyMadeFromSellingHouse,
    rentData,
  } = useComparison();

  const isBuyingBeneficial =
    moneyMadeFromSellingHouse[yearOfSale] > rentData[yearOfSale];

  return (
    <motion.div
      initial={{ opacity: 0, x: animationXDistance, y: animationYDistance }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: animationDuration,
        delay: animationDelay,
        ease: animationEase,
      }}
      className="flex flex-col bg-transparent shadow-lg rounded-xl  w-full border border-1 border-card-foreground/20 overflow-hidden"
    >
      {/* <div className="flex flex-col bg-card outline outline-1 outline-card-foreground/20 shadow-2xl p-4 rounded-xl w-full justify-around items-center "> */}
      {/* Title */}
      <div className="flex flex-row border-b border-card-foreground/20 px-4 py-3 justify-between bg-card  items-center">
        <div className="flex flex-row justify-center items-center">
          <GitCompare className="w-6 h-6 mr-2 text-secondary" />
          <div className="flex flex-col">
            <h2 className="text-xl sm:text-2xl tracking-wide font-light">
              Rent vs Buy
            </h2>
            <p className="text-xs sm:text-sm text-foreground/60">
              Compare Your Savings after {yearOfSale} Years
            </p>
          </div>
        </div>
        <motion.div
          key={isBuyingBeneficial ? 'home' : 'building'} // Key ensures proper animation between icons
          initial={{ opacity: 0, scale: 0.8 }} // Start small and invisible
          animate={{ opacity: 1, scale: 1 }} // Animate to full visibility and size
          exit={{ opacity: 0, scale: 0.8 }} // Animate out with reverse effect
          transition={{ duration: 0.3 }} // Duration for the transition
          className="flex items-center justify-center"
        >
          {isBuyingBeneficial ? (
            <Home size={24} className="text-green-600" />
          ) : (
            <Building size={24} className="text-blue-600" />
          )}
        </motion.div>
      </div>

      {/* Comparison Section */}
      <div className="relative flex flex-row justify-between sm:justify-around items-center py-4 border-b border-card-foreground/20 bg-card/80 ">
        <div className="flex flex-col items-center w-full  border-r border-card-foreground/20">
          <div className="flex flex-row items-center w-full justify-center">
            <p className="text-sm sm:text-base md:text-lg font-light tracking-wide text-card-foreground/80 text-center">
              Rent Paid:
            </p>

            <RentLossExplanation />
          </div>
          <CardValue
            value={Number(rentData[yearOfSale])}
            color="text-red-600"
          />
        </div>
        <div className="flex flex-col items-center w-full  ">
          <div className="flex flex-row items-center w-full justify-center">
            <p className="text-sm sm:text-base md:text-lg font-light tracking-wide text-card-foreground/80 text-center">
              Property Return:
            </p>

            <PropertyReturnExplanation />
          </div>
          <CardValue
            value={Number(moneyMadeFromSellingHouse[yearOfSale])}
            color={
              moneyMadeFromSellingHouse[yearOfSale] >= 0
                ? 'text-green-600'
                : 'text-red-600'
            }
          />
        </div>
      </div>

      {/* Savings Summary */}
      <div className="flex flex-col items-center text-center space-y-2 p-4 pb-2 bg-card/60">
        <p className="text-foreground/60">
          After {yearOfSale} years, you would have saved
        </p>
        <div className="flex items-center space-x-2">
          <p
            className={`text-3xl font-semibold ${
              isBuyingBeneficial ? 'text-green-600' : 'text-blue-600'
            }`}
          >
            R{' '}
            {formatNumber(
              Math.abs(
                Number(
                  moneyMadeFromSellingHouse[yearOfSale] - rentData[yearOfSale]
                )
              )
            )}
          </p>
          <RentVsHouseProfitPopover
            moneyMadeFromSellingHouse={moneyMadeFromSellingHouse}
            rentData={rentData}
            yearOfSale={yearOfSale}
          />
        </div>
        <p className="text-foreground/60">
          by{' '}
          <span className="font-medium">
            {isBuyingBeneficial ? 'BUYING a Property' : 'RENTING a Property'}
          </span>
        </p>
      </div>

      {/* Interactive Slider */}
      <div className="flex flex-col w-full p-4 pt-0 bg-card/60">
        <div className="flex justify-between text-sm text-foreground/60 mb-2">
          <p>Selling Year:</p>
          <p>Year {yearOfSale}</p>
        </div>
        <Slider
          defaultValue={[yearOfSale]}
          min={0}
          max={loanTermYears}
          step={1}
          onValueChange={(value) => setYearOfSale(value[0])}
          className="flex mt-1"
        />
      </div>
    </motion.div>
  );
}

export default RentVsHouseCard;
