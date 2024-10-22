const TAX_PERIODS: Record<number, { start: { day: number, month: number, year: number }, end: { day: number, month: number, year: number } }> = {
  2025: {
    start: { day: 1, month: 3, year: 2024 },
    end: { day: 28, month: 2, year: 2025 }
  },
  2024: {
    start: { day: 1, month: 3, year: 2023 },
    end: { day: 29, month: 2, year: 2024 }
  },
  2023: {
    start: { day: 1, month: 3, year: 2022 },
    end: { day: 28, month: 2, year: 2023 }
  },
  2022: {
    start: { day: 1, month: 3, year: 2021 },
    end: { day: 28, month: 2, year: 2022 }
  },
  2021: {
    start: { day: 1, month: 3, year: 2020 },
    end: { day: 28, month: 2, year: 2021 }
  },
  2020: {
    start: { day: 1, month: 3, year: 2019 },
    end: { day: 29, month: 2, year: 2020 }
  },
  2019: {
    start: { day: 1, month: 3, year: 2018 },
    end: { day: 28, month: 2, year: 2019 }
  },
  2018: {
    start: { day: 1, month: 3, year: 2017 },
    end: { day: 28, month: 2, year: 2018 }
  },
  2017: {
    start: { day: 1, month: 3, year: 2016 },
    end: { day: 28, month: 2, year: 2017 }
  },
  2016: {
    start: { day: 1, month: 3, year: 2015 },
    end: { day: 29, month: 2, year: 2016 }
  },
  2015: {
    start: { day: 1, month: 3, year: 2014 },
    end: { day: 28, month: 2, year: 2015 }
  },
  2014: {
    start: { day: 1, month: 3, year: 2013 },
    end: { day: 28, month: 2, year: 2014 }
  },
  2013: {
    start: { day: 1, month: 3, year: 2012 },
    end: { day: 28, month: 2, year: 2013 }
  },
  2012: {
    start: { day: 1, month: 3, year: 2011 },
    end: { day: 29, month: 2, year: 2012 }
  },
  2011: {
    start: { day: 1, month: 3, year: 2010 },
    end: { day: 28, month: 2, year: 2011 }
  },
};

export default TAX_PERIODS;
