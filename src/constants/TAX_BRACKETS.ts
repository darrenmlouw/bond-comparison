const TAX_BRACKETS: Record<number, Array<{ lower: number; upper: number; base: number; rate: number }>> = {
  2024: [
    { lower: 1, upper: 237100, base: 0, rate: 0.18 },
    { lower: 237101, upper: 370500, base: 42678, rate: 0.26 },
    { lower: 370501, upper: 512800, base: 77362, rate: 0.31 },
    { lower: 512801, upper: 673000, base: 121475, rate: 0.36 },
    { lower: 673001, upper: 857900, base: 179147, rate: 0.39 },
    { lower: 857901, upper: 1817000, base: 251258, rate: 0.41 },
    { lower: 1817001, upper: Infinity, base: 644489, rate: 0.45 },
  ],
  2023: [
    { lower: 1, upper: 226000, base: 0, rate: 0.18 },
    { lower: 226001, upper: 353100, base: 40680, rate: 0.26 },
    { lower: 353101, upper: 488700, base: 73726, rate: 0.31 },
    { lower: 488701, upper: 641400, base: 115762, rate: 0.36 },
    { lower: 641401, upper: 817600, base: 170734, rate: 0.39 },
    { lower: 817601, upper: 1731600, base: 239452, rate: 0.41 },
    { lower: 1731601, upper: Infinity, base: 614192, rate: 0.45 },
  ],
  2022: [
    { lower: 1, upper: 216200, base: 0, rate: 0.18 },
    { lower: 216201, upper: 337800, base: 38916, rate: 0.26 },
    { lower: 337801, upper: 467500, base: 70532, rate: 0.31 },
    { lower: 467501, upper: 613600, base: 110739, rate: 0.36 },
    { lower: 613601, upper: 782200, base: 163335, rate: 0.39 },
    { lower: 782201, upper: 1656600, base: 229089, rate: 0.41 },
    { lower: 1656601, upper: Infinity, base: 587593, rate: 0.45 },
  ],
  2021: [
    { lower: 1, upper: 205900, base: 0, rate: 0.18 },
    { lower: 205901, upper: 321600, base: 37062, rate: 0.26 },
    { lower: 321601, upper: 445100, base: 67144, rate: 0.31 },
    { lower: 445101, upper: 584200, base: 105429, rate: 0.36 },
    { lower: 584201, upper: 744800, base: 155505, rate: 0.39 },
    { lower: 744801, upper: 1577300, base: 218139, rate: 0.41 },
    { lower: 1577301, upper: Infinity, base: 559464, rate: 0.45 },
  ],
  2020: [
    { lower: 1, upper: 195850, base: 0, rate: 0.18 },
    { lower: 195851, upper: 305850, base: 35253, rate: 0.26 },
    { lower: 305851, upper: 423300, base: 63853, rate: 0.31 },
    { lower: 423301, upper: 555600, base: 100263, rate: 0.36 },
    { lower: 555601, upper: 708310, base: 147891, rate: 0.39 },
    { lower: 708311, upper: 1500000, base: 207448, rate: 0.41 },
    { lower: 1500001, upper: Infinity, base: 532041, rate: 0.45 },
  ],
  2019: [
    { lower: 1, upper: 195850, base: 0, rate: 0.18 },
    { lower: 195851, upper: 305850, base: 35253, rate: 0.26 },
    { lower: 305851, upper: 423300, base: 63853, rate: 0.31 },
    { lower: 423301, upper: 555600, base: 100263, rate: 0.36 },
    { lower: 555601, upper: 708310, base: 147891, rate: 0.39 },
    { lower: 708311, upper: 1500000, base: 207448, rate: 0.41 },
    { lower: 1500001, upper: Infinity, base: 532041, rate: 0.45 },
  ],
};

export default TAX_BRACKETS;
