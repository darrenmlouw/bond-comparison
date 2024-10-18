import Feature from "@/types/Feature";
import { FaCalculator, FaChartLine, FaHome } from 'react-icons/fa';

const FEATURES: Feature[] = [
  {
    id: 1,
    title: 'Salary Calculator',
    subtitle: 'Calculate your net salary after taxes and deductions.',
    description: 'The Salary Calculator helps you estimate your net income after taxes, retirement contributions, medical aid, and other deductions. This tool provides a detailed breakdown of your gross salary, including bonuses and allowances, helping you understand the impact of deductions on your take-home pay. It is essential for financial planning, giving you the clarity to manage your finances effectively.',
    icon: FaCalculator,
    borderGradient: "linear-gradient(135deg, #3b82f6, #7f00ff)", // Blue to violet
    boxShadowDark: "0 4px 15px 3px rgba(59, 130, 246, 0.6), 0 0 20px 5px rgba(127, 0, 255, 0.5)", // Blue and violet glow
    boxShadowLight: "0 4px 15px 3px rgba(59, 130, 246, 0.4), 0 0 20px 5px rgba(127, 0, 255, 0.3)", // Violet and blue glow
  },
  {
    id: 2,
    title: 'Capital Gains Tax',
    subtitle: 'Calculate potential capital gains tax when selling your property.',
    description: 'The Capital Gains Tax Calculator provides insights into the tax implications when selling property or investments. It accounts for the purchase price, selling price, and relevant deductions, giving you a precise understanding of how much tax you’ll owe. This tool is invaluable for maximizing profits when disposing of assets by providing tax-efficient strategies.',
    icon: FaChartLine,
    borderGradient: "linear-gradient(135deg, #7f00ff, #e100ff)", // Violet to pink
    boxShadowDark: "0 4px 15px 3px rgba(127, 0, 255, 0.6), 0 0 20px 5px rgba(225, 0, 255, 0.5)", // Violet and pink glow
    boxShadowLight: "0 4px 15px 3px rgba(127, 0, 255, 0.4), 0 0 20px 5px rgba(225, 0, 255, 0.3)", // Pink and violet glow
  },
  {
    id: 3,
    title: 'Rent vs Buy Statistics',
    subtitle: 'Analyze and compare the long-term costs of renting versus buying a home.',
    description: 'The Rent vs Buy Calculator helps you compare the financial aspects of renting versus owning a home. It factors in mortgage payments, rent costs, property appreciation, taxes, and maintenance to show how each option impacts your finances in the long term. This tool is designed to help you make informed decisions about homeownership based on your financial situation and goals.',
    icon: FaHome,
    borderGradient: "linear-gradient(135deg, #e100ff, #ff6a00)", // Pink to red-orange
    boxShadowDark: "0 4px 15px 3px rgba(225, 0, 255, 0.6), 0 0 20px 5px rgba(255, 106, 0, 0.5)", // Pink and red-orange glow
    boxShadowLight: "0 4px 15px 3px rgba(225, 0, 255, 0.4), 0 0 20px 5px rgba(255, 106, 0, 0.3)", // Red-orange and pink glow
  },
];

export default FEATURES;
