import { formatNumber } from '@/utils/formatNumber';

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  color?: string;
};

function CardValue({
  value,
  prefix,
  suffix,
  color = 'text-card-foregroud',
}: Props) {
  return (
    <div className="flex flex-row flex-wrap justify-start items-end pb-1">
      <div className="flex flex-row justify-start items-end flex-nowrap">
        {prefix && (
          <p
            className={`text-xl sm:text-2xl font-light tracking-wide mr-2 text-nowrap ${color}`}
          >
            {prefix}
          </p>
        )}

        <p
          className={`text-2xl sm:text-3xl font-light tracking-wide text-nowrap ${color}`}
        >
          {formatNumber(value)}
        </p>
      </div>

      {suffix && (
        <p className="text-sm sm:text-base font-light tracking-wide text-card-foreground/40 ml-2">
          {suffix || ''}
        </p>
      )}
    </div>
  );
}

export default CardValue;
