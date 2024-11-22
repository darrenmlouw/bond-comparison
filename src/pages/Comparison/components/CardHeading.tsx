type Props = {
  label: string;
  // Allows React components or any renderable nodes
  explanationPopover?: React.ReactNode;
};

function CardHeading({ label, explanationPopover }: Props) {
  return (
    <div className="flex flex-row items-center">
      <p className="text-sm sm:text-base md:text-lg font-light tracking-wide text-card-foreground/80">{label}</p>
      {explanationPopover && <div className="">{explanationPopover}</div>}
    </div>
  );
}

export default CardHeading;
