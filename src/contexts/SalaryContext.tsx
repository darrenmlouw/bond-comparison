import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SalaryContextType {
    annualIncome: number;
    setAnnualIncome: (income: number) => void;
    taxRate: number;
    setTaxRate: (rate: number) => void;
    medicalAid: number;
    setMedicalAid: (aid: number) => void;
    pensionFund: number;
    setPensionFund: (fund: number) => void;
    uif: number;
    setUif: (uif: number) => void;
    otherDeductions: number;
    setOtherDeductions: (deductions: number) => void;
    monthlyTax: number;
    annualTax: number;
    monthlyIncome: number;
}

const SalaryContext = createContext<SalaryContextType | undefined>(undefined);

export const SalaryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [annualIncome, setAnnualIncome] = useState<number>(0);
    const [taxRate, setTaxRate] = useState<number>(0);
    const [medicalAid, setMedicalAid] = useState<number>(0);
    const [pensionFund, setPensionFund] = useState<number>(0);
    const [uif, setUif] = useState<number>(0);
    const [otherDeductions, setOtherDeductions] = useState<number>(0);

    const monthlyIncome = annualIncome / 12;
    const monthlyTax = (annualIncome * (taxRate / 100)) / 12;
    const annualTax = annualIncome * (taxRate / 100);

    return (
        <SalaryContext.Provider
            value={{
                annualIncome,
                setAnnualIncome,
                taxRate,
                setTaxRate,
                medicalAid,
                setMedicalAid,
                pensionFund,
                setPensionFund,
                uif,
                setUif,
                otherDeductions,
                setOtherDeductions,
                monthlyTax,
                annualTax,
                monthlyIncome,
            }}
        >
            {children}
        </SalaryContext.Provider>
    );
};

export const useSalary = (): SalaryContextType => {
    const context = useContext(SalaryContext);
    if (!context) {
        throw new Error('useSalary must be used within a SalaryProvider');
    }
    return context;
};
