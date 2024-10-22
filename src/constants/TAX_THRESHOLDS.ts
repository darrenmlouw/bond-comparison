const TAX_THRESHOLDS: Record<number, { under65: number; from65to75: number; over75: number }> = {
  2025: {
    under65: 95950,
    from65to75: 148217,
    over75: 165689,
  },
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
  2018: {
    under65: 75000,
    from65to75: 116150,
    over75: 129850,
  },
  2017: {
    under65: 75750,
    from65to75: 117300,
    over75: 131150,
  },
  2016: {
    under65: 73750,
    from65to75: 114800,
    over75: 128500,
  },
  2015: {
    under65: 70700,
    from65to75: 110200,
    over75: 123350,
  },
  2014: {
    under65: 67111,
    from65to75: 104611,
    over75: 118111,
  },
  2013: {
    under65: 63856,
    from65to75: 99956,
    over75: 112626,
  },
  2012: {
    under65: 60000,
    from65to75: 93000,
    over75: 105000,
  },
  2011: {
    under65: 57000,
    from65to75: 88000,
    over75: 99000,
  },
};

export default TAX_THRESHOLDS;
