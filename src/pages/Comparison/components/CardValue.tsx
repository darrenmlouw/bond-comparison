import { formatNumber } from '@/utils/formatNumber';

type Props = {
  value: number;
  prefix: string;
  suffix: string;
};

function CardValue({ value, prefix, suffix }: Props) {
  return (
    <div className="flex flex-row flex-wrap justify-start items-end ">
      <div className="flex flex-row justify-start items-end flex-nowrap">
        <p className="text-xl sm:text-2xl font-light tracking-wide mr-2 text-nowrap ">
          {prefix}
        </p>
        <p className="text-2xl sm:text-3xl font-light tracking-wide text-nowrap ">
          {formatNumber(value)}
        </p>
      </div>

      <p className="text-sm sm:text-base font-light tracking-wide text-card-foreground/40 ml-2">
        {suffix}
      </p>
    </div>
  );
}

export default CardValue;
