const TAX_REBATES: Record<number, { under65: number; from65to75: number; over75: number }> = {
	2024: {
			under65: 17235,
			from65to75: 26679, // 17235 + 9444
			over75: 29824, // 17235 + 9444 + 3145
	},
	// Add more years as needed
};

export default TAX_REBATES;