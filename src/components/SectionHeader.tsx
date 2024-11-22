interface SectionHeaderProps {
  label: string; // The label to display inside the header
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ label }) => {
  return (
    <div className="relative flex items-center pt-2 sm:pt-4 ">
      <div className="flex-shrink mr-2 border border-primary bg-primary/60 bg-opacity-100 rounded-full p-0.5 px-2 text-xs font-semibold text-background">
        {label}
      </div>
      <div className="flex-grow border-t border-primary/30"></div>
    </div>
  );
};
