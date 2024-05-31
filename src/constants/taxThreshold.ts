const TAX_THRESHOLD: Record<number, { under65: number; from65to75: number; over75: number }> = {
	2024: {
		under65: 95950,
		from65to75: 148217,
		over75: 165689,
	},
	// Add more years as needed
};

export default TAX_THRESHOLD;