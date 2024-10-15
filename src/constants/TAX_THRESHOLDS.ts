const TAX_THRESHOLDS: Record<number, { under65: number; from65to75: number; over75: number }> = {
  2024: {
    under65: 95950,
    from65to75: 148217,
    over75: 165689,
  },
  2023: {
    under65: 91250,
    from65to75: 141250,
    over75: 157900,
  },
  2022: {
    under65: 87300,
    from65to75: 135150,
    over75: 151100,
  },
  2021: {
    under65: 83400,
    from65to75: 128650,
    over75: 143850,
  },
  2020: {
    under65: 79000,
    from65to75: 122300,
    over75: 136750,
  },
  2019: {
    under65: 79000,
    from65to75: 122300,
    over75: 136750,
  },
};

export default TAX_THRESHOLDS;
