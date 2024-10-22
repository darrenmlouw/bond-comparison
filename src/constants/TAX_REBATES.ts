const TAX_REBATES: Record<number, { under65: number; from65to75: number; over75: number }> = {
  2025: {
    under65: 17235,
    from65to75: 26679,
    over75: 29824,
  },
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
  2018: {
    under65: 13635,
    from65to75: 20634,
    over75: 22959,
  },
  2017: {
    under65: 13500,
    from65to75: 20907,
    over75: 23433,
  },
  2016: {
    under65: 13257,
    from65to75: 20525,
    over75: 23155,
  },
  2015: {
    under65: 12726,
    from65to75: 19715,
    over75: 22575,
  },
  2014: {
    under65: 12080,
    from65to75: 18930,
    over75: 21100,
  },
  2013: {
    under65: 11760,
    from65to75: 18390,
    over75: 20620,
  },
  2012: {
    under65: 10750,
    from65to75: 16300,
    over75: 19000,
  },
  2011: {
    under65: 10000,
    from65to75: 15000,
    over75: 18000,
  },
};

export default TAX_REBATES;
