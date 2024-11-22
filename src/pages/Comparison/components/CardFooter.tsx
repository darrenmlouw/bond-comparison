type Props = {
  label?: string;
};

function CardFooter({ label }: Props) {
  return (
    <p className="text-sm sm:text-base font-light tracking-wide text-card-foreground/40">
      {label || ''}
    </p>
  );
}

export default CardFooter;
