type Props = {
  label: string;
  icon?: React.ReactNode;
};

function CardHeading({ label, icon }: Props) {
  return (
    <div className="flex flex-row items-start justify-between">
      <p className="text-sm sm:text-base md:text-lg font-light tracking-wide text-card-foreground/80">
        {label}
      </p>
      {icon && <div className="ml-1">{icon}</div>}
    </div>
  );
}

export default CardHeading;
