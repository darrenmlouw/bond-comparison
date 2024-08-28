import numeral from 'numeral';

// Register a custom locale for South Africa
numeral.register('locale', 'en-za', {
  delimiters: {
    thousands: ' ', // Space separator for thousands
    decimal: '.'
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'b',
    trillion: 't'
  },
  currency: {
    symbol: 'R'
  }
});

// Set the default locale to 'en-za'
numeral.locale('en-za');

export function formatNumber(number: number): string {
  return numeral(number).format('0,0'); // '0,0' -> formats with a space as thousands separator and no decimal places
}
