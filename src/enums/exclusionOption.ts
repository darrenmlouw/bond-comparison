enum exclusionOption {
  PrimaryResidence = 'primaryResidence',
  SecondProperty = 'secondProperty', // Matches the option in ExclusionCombobox
  JointBond = 'jointBond',           // Matches the option in ExclusionCombobox
  Deceased = 'deceased',
  SmallBusinessOwner = 'smallBusinessOwner', // Matches both SmallBusiness and SmallBusinessOwner
  Annual = 'annual',                 // Keeps the annual exclusion for individuals
  None = 'none',                     // Default option for no specific exclusion
}
export default exclusionOption;
