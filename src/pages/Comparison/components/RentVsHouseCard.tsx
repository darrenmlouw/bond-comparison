import { formatNumber } from '@/utils/formatNumber';
import RentVsHouseProfitPopover from '@/pages/Comparison/components/RentVsHouseProfitPopover';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useComparison } from '@/hooks/useComparison';

function RentVsHouseCard() {
  const {
    yearOfSale,
    setYearOfSale,
    loanTermYears,
    moneyMadeFromSellingHouse,
    rentData,
  } = useComparison();

  return (
    <div className="flex flex-col bg-card outline outline-1 outline-card-foreground/20 shadow-2xl p-4 rounded-xl w-full justify-around items-center">
      <h3 className="text-2xl sm:text3xl md:text-3xl font-light mt-4">
        {moneyMadeFromSellingHouse[yearOfSale] > rentData[yearOfSale]
          ? `Buying is Beneficial`
          : `Renting is Beneficial`}
      </h3>
      <h3 className="text-2xl sm:text3xl md:text-3xl font-light mb-4">
        after {yearOfSale} years
      </h3>

      <div className="w-full h-[1px] bg-foreground/10 my-4" />

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 w-full justify-around items-center">
        <div className="flex flex-col justify-center items-center">
          <p className="text-foreground/50">
            Rent Loss after {yearOfSale} years
          </p>
          <p className="text-3xl font-light tracking-wide">
            R {formatNumber(Number(rentData[yearOfSale]))}
          </p>
        </div>
        <p>vs</p>
        <div className="flex flex-col justify-center items-center">
          <p className="text-foreground/50">
            {moneyMadeFromSellingHouse[yearOfSale] >= 0
              ? `House Profit after ${yearOfSale} years`
              : `House Loss after ${yearOfSale} years`}
          </p>
          <p className="text-3xl font-light tracking-wide">
            R {formatNumber(Number(moneyMadeFromSellingHouse[yearOfSale]))}
          </p>
        </div>
      </div>

      <div className="w-full h-[1px] bg-foreground/10 my-4" />

      <div className="flex flex-col justify-center items-center my-4">
        <p className="text-foreground/50">
          After {yearOfSale} years, you would have saved
        </p>

        <div className="flex flex-row justify-center items-center">
          <p className="text-3xl font-light tracking-wide">
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
        <p className="text-foreground/50">
          by{' '}
          {moneyMadeFromSellingHouse[yearOfSale] > rentData[yearOfSale]
            ? 'BUYING a Property'
            : 'RENTING a Property'}
        </p>
      </div>
      <div className="w-full h-[1px] bg-foreground/10 my-4" />
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-row w-full gap-1.5 justify-between">
          <Label
            className="text-lg sm:text-xl font-light "
            htmlFor="yearOfSale"
          >
            Selling Year:
          </Label>
          <Label
            className="text-lg sm:text-xl font-light "
            htmlFor="yearOfSale"
          >
            Year {yearOfSale}
          </Label>
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
    </div>
  );
}

export default RentVsHouseCard;
