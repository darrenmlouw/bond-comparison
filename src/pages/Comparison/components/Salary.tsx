import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSalary } from '@/contexts/SalaryContext';

const Salary: React.FC = () => {
    const {
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
    } = useSalary();

    return (
        <div>
            <h2 className="text-xl font-bold text-primary">Annual Income and Tax</h2>

            <form className="flex flex-col space-y-4">
                <div className="flex flex-col md:flex-row md:space-x-4">
                    <div className="flex flex-col w-full">
                        <Label htmlFor="income" className="text-sm text-gray-600">
                            Annual Income
                        </Label>
                        <Input
                            type="number"
                            id="income"
                            name="income"
                            placeholder="Enter your annual income"
                            value={annualIncome}
                            onChange={(e) => setAnnualIncome(parseFloat(e.target.value))}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <Label htmlFor="tax" className="text-sm text-gray-600">
                            Tax Rate (%)
                        </Label>
                        <Input
                            type="number"
                            id="tax"
                            name="tax"
                            placeholder="Enter your tax rate"
                            value={taxRate}
                            onChange={(e) => setTaxRate(parseFloat(e.target.value))}
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:space-x-4">
                    <div className="flex flex-col w-full">
                        <Label htmlFor="medicalAid" className="text-sm text-gray-600">
                            Medical Aid
                        </Label>
                        <Input
                            type="number"
                            id="medicalAid"
                            name="medicalAid"
                            placeholder="Enter your medical aid deduction"
                            value={medicalAid}
                            onChange={(e) => setMedicalAid(parseFloat(e.target.value))}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <Label htmlFor="pensionFund" className="text-sm text-gray-600">
                            Pension Fund
                        </Label>
                        <Input
                            type="number"
                            id="pensionFund"
                            name="pensionFund"
                            placeholder="Enter your pension fund deduction"
                            value={pensionFund}
                            onChange={(e) => setPensionFund(parseFloat(e.target.value))}
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:space-x-4">
                    <div className="flex flex-col w-full">
                        <Label htmlFor="uif" className="text-sm text-gray-600">
                            UIF
                        </Label>
                        <Input
                            type="number"
                            id="uif"
                            name="uif"
                            placeholder="Enter your UIF deduction"
                            value={uif}
                            onChange={(e) => setUif(parseFloat(e.target.value))}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <Label htmlFor="otherDeductions" className="text-sm text-gray-600">
                            Other Deductions
                        </Label>
                        <Input
                            type="number"
                            id="otherDeductions"
                            name="otherDeductions"
                            placeholder="Enter other deductions"
                            value={otherDeductions}
                            onChange={(e) => setOtherDeductions(parseFloat(e.target.value))}
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:space-x-4">
                    <div className="flex flex-col w-full">
                        <Label className="text-sm text-gray-600">Monthly Income</Label>
                        <p className="text-lg font-medium">{`R ${monthlyIncome.toFixed(2)}`}</p>
                    </div>
                    <div className="flex flex-col w-full">
                        <Label className="text-sm text-gray-600">Monthly Tax</Label>
                        <p className="text-lg font-medium">{`R ${monthlyTax.toFixed(2)}`}</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:space-x-4">
                    <div className="flex flex-col w-full">
                        <Label className="text-sm text-gray-600">Annual Tax</Label>
                        <p className="text-lg font-medium">{`R ${annualTax.toFixed(2)}`}</p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Salary;
