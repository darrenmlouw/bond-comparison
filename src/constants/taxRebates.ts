const TAX_REBATES: Record<number, { under65: number; from65to75: number; over75: number }> = {
  2024: {
    under65: 17235,
    from65to75: 26679,
    over75: 29824,
  },
  2023: {
    under65: 16875,
    from65to75: 26100,
    over75: 29235,
  },
  2022: {
    under65: 16425,
    from65to75: 25700,
    over75: 29000,
  },
  2021: {
    under65: 15714,
    from65to75: 24057,
    over75: 27090,
  },
  2020: {
    under65: 14958,
    from65to75: 24057,
    over75: 27090,
  },
  2019: {
    under65: 14958,
    from65to75: 24057,
    over75: 27090,
  },
};

export default TAX_REBATES;
