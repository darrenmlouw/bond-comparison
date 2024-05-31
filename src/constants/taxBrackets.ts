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
	// Add more years as needed
};

export default TAX_BRACKETS;

