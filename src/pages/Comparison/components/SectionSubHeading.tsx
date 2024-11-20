type Props = {
  label: string;
};

function SectionSubHeading({ label }: Props) {
  return <h2 className="text-xl font-bold text-primary ">{label}</h2>;
}

export default SectionSubHeading;
