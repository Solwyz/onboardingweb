import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AdminPayrollForm = () => {
  // State for form inputs
  const [payroll, setPayroll] = useState({
    EmployeeName: '',
    BasicSalary: '',
    PayPeriod: '',
    BankAccount: '',
    TaxId: '',
    NetPay: '',
  });

  // State for selected allowances and deductions with amounts
  const [selectedAllowances, setSelectedAllowances] = useState({});
  const [selectedDeductions, setSelectedDeductions] = useState({});
  const [allowanceAmounts, setAllowanceAmounts] = useState({});
  const [deductionAmounts, setDeductionAmounts] = useState({});



  // State for the bonus
  const [bonus, setBonus] = useState(0);

  // State to track if payroll is created
  const [isPayrollCreated, setIsPayrollCreated] = useState(false);

  // State to track payslip history
  const [payslipHistory, setPayslipHistory] = useState([]);

  // Allowances and Deductions options
  const allowancesOptions = ['Housing', 'Transport'];
  const deductionsOptions = ['Tax', 'Insurance'];

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayroll((prevPayroll) => ({
      ...prevPayroll,
      [name]: value,
    }));
  };

  // Handle allowance checkbox changes
  const handleAllowanceChange = (e) => {
    const { name, checked } = e.target;
    setSelectedAllowances((prev) => ({
      ...prev,
      [name]: checked,
    }));
    if (!checked) {
      setAllowanceAmounts((prev) => ({
        ...prev,
        [name]: undefined, // Remove the amount if unchecked
      }));
    }
  };

  // Handle allowance amount changes
  const handleAllowanceAmountChange = (e) => {
    const { name, value } = e.target;
    setAllowanceAmounts((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  // Handle deduction checkbox changes
  const handleDeductionChange = (e) => {
    const { name, checked } = e.target;
    setSelectedDeductions((prev) => ({
      ...prev,
      [name]: checked,
    }));
    if (!checked) {
      setDeductionAmounts((prev) => ({
        ...prev,
        [name]: undefined, // Remove the amount if unchecked
      }));
    }
  };

  // Handle deduction amount changes
  const handleDeductionAmountChange = (e) => {
    const { name, value } = e.target;
    setDeductionAmounts((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  // Handle bonus changes
  const handleBonusChange = (e) => {
    const { value } = e.target;
    setBonus(value ? Number(value) : "");
  };

  // Validate inputs
  const validateForm = () => {
    if (!payroll.EmployeeName || !payroll.BasicSalary || !payroll.PayPeriod || !payroll.BankAccount || !payroll.TaxId) {
      alert('Please fill in all required fields');
      return false;
    }
    return true;
  };

  // Handle form submission to "create" payroll and add it to history
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Calculate total allowances and deductions based on the provided amounts
    const totalAllowances = Object.keys(selectedAllowances)
      .filter((allowance) => selectedAllowances[allowance])
      .reduce((acc, curr) => acc + (allowanceAmounts[curr] || 0), 0);

    const totalDeductions = Object.keys(selectedDeductions)
      .filter((deduction) => selectedDeductions[deduction])
      .reduce((acc, curr) => acc + (deductionAmounts[curr] || 0), 0);

    const calculatedNetPay = Number(payroll.BasicSalary) + totalAllowances + bonus - totalDeductions;

    // Set the net pay
    const newPayroll = {
      ...payroll,
      NetPay: calculatedNetPay,
      allowances: allowanceAmounts,
      deductions: deductionAmounts,
      bonus: bonus || 0, // Ensure bonus is saved correctly
    };

    // Add the created payroll to the payslip history
    setPayslipHistory((prevHistory) => [...prevHistory, newPayroll]);

    // Clear the form and enable payroll created status
    setIsPayrollCreated(true);
    setPayroll({
      EmployeeName: '',
      BasicSalary: '',
      PayPeriod: '',
      BankAccount: '',
      TaxId: '',
      NetPay: '',
    });
    setBonus(0);
    setSelectedAllowances({});
    setSelectedDeductions({});
    setAllowanceAmounts({});
    setDeductionAmounts({});
  };

  // Generate PDF for downloading the payslip in a table format
  const generatePDF = (payrollData) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Payslip', 90, 10);

    doc.setFontSize(12);
    const tableYPosition = 30;

    doc.text(`Employee Name: ${payrollData.EmployeeName}`, 20, tableYPosition);
    doc.text(`Pay Period: ${payrollData.PayPeriod}`, 20, tableYPosition + 10);

    doc.text('Salary Breakdown', 20, tableYPosition + 20);
    doc.autoTable({
      startY: tableYPosition + 30,
      head: [['Description', 'Amount']],
      body: [
        ['Basic Salary', payrollData.BasicSalary],
        ...Object.entries(payrollData.allowances).map(([allowance, amount]) => [allowance, amount]),
        ['Bonus', payrollData.bonus],
        ...Object.entries(payrollData.deductions).map(([deduction, amount]) => [deduction, amount]),
        ['Net Pay', payrollData.NetPay],
      ],
    });

    doc.text(`Bank Account: ${payrollData.BankAccount}`, 20, doc.previousAutoTable.finalY + 20);
    doc.text(`Tax ID: ${payrollData.TaxId}`, 20, doc.previousAutoTable.finalY + 30);

    doc.save(`Payslip_${payrollData.EmployeeName}.pdf`);
  };

  return (
    <div className="p-6 w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6">Payroll</h1>

      {/* Payroll Form */}
      <form onSubmit={handleSubmit} className="space-y-7">
        <div className='flex justify-center items-center'>
          <div>
            <label className="block font-medium">Employee Name:</label>
            <input
              type="text"
              name="EmployeeName"
              value={payroll.EmployeeName}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-[500px] rounded input-no-spinner"
              required
            />
          </div>

          <div className='ml-5'>
            <label className="block font-medium">Basic Salary:</label>
            <input
              type="number"
              name="BasicSalary"
              value={payroll.BasicSalary}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-[500px] rounded input-no-spinner"
              required
            />
          </div>
        </div>
        <div className='flex justify-center items-center'>
          <div>
            <label className="block font-medium">Bonus:</label>
            <input
              type="number"
              value={bonus}
              onChange={handleBonusChange}
              className="border border-gray-300 p-2 w-[500px] rounded input-no-spinner"
              required
            />
          </div>
          <div className='ml-5'>
            <label className="block font-medium">Pay Period:</label>
            <select
              name="PayPeriod"
              value={payroll.PayPeriod}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-[500px] rounded input-no-spinner"
              required
            >
              <option value="">Select Pay Period</option>
              <option value="Monthly">Monthly</option>
              <option value="Weekly">Weekly</option>
            </select>
          </div>

        </div>
        <div className='flex justify-center items-center'>
          <div>
            <label className="block font-medium">Allowances:</label>
            {allowancesOptions.map((allowance) => (
              <div key={allowance} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  name={allowance}
                  checked={selectedAllowances[allowance] || false}
                  onChange={handleAllowanceChange}
                />
                <label className="flex-1 ml-2">{allowance}:</label>
                {selectedAllowances[allowance] && (
                  <input
                    type="number"
                    name={allowance}
                    value={allowanceAmounts[allowance] || ''}
                    onChange={handleAllowanceAmountChange}
                    className="border border-gray-300 p-2 w-20 rounded input-no-spinner text-center ml-12"
                  />
                )}
              </div>
            ))}
          </div>

          <div className='ml-[450px]'>
            <label className="block font-medium ">Deductions:</label>
            {deductionsOptions.map((deduction) => (
              <div key={deduction} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  name={deduction}
                  checked={selectedDeductions[deduction] || false}
                  onChange={handleDeductionChange}
                />
                <label className="flex-1 ml-2">{deduction}:</label>
                {selectedDeductions[deduction] && (
                  <input
                    type="number"
                    name={deduction}
                    value={deductionAmounts[deduction] || ''}
                    onChange={handleDeductionAmountChange}
                    className="border border-gray-300 p-2 w-20 rounded input-no-spinner text-center ml-12"
                  />
                )}
              </div>
            ))}
          </div>
        </div>


        <div className='flex justify-center items-center'>
          <div>
            <label className="block font-medium">Bank Account:</label>
            <input
              type="number"
              name="BankAccount"
              value={payroll.BankAccount}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-[500px] rounded appearance-none"
              required
            />
          </div>

          <div className='ml-5'>
            <label className="block font-medium">Tax ID:</label>
            <input
              type="text"
              name="TaxId"
              value={payroll.TaxId}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-[500px]  rounded input-no-spinner"
              required
            />
          </div>
        </div>
        <div className='flex justify-center items-center'>
          <button type="submit" className="bg-[#141454] text-white px-4 py-2 rounded   font-semibold">
            Save
          </button>
        </div>
      </form>

      {isPayrollCreated && payslipHistory.length > 0 && (
        <div className="mt-6 p-4 border border-[#141454] rounded bg-blue-50">
          <h2 className="text-xl font-semibold mb-4">Payroll Created</h2>

          {/* Payroll table */}
          <table className="min-w-full bg-white border border-gray-200">
            <tbody>
              <tr>
                <td className="py-2 px-4 border">Employee Name:</td>
                <td className="py-2 px-4 border">{payslipHistory[payslipHistory.length - 1].EmployeeName}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border">Basic Salary:</td>
                <td className="py-2 px-4 border">{payslipHistory[payslipHistory.length - 1].BasicSalary}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border">Bonus:</td>
                <td className="py-2 px-4 border">{payslipHistory[payslipHistory.length - 1].bonus || 0}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border">Allowances:</td>
                <td className="py-2 px-4 border">
                  {Object.entries(payslipHistory[payslipHistory.length - 1].allowances)
                    .map(([allowance, amount]) => `${allowance}: ${amount}`)
                    .join(', ') || 'None'}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border">Deductions:</td>
                <td className="py-2 px-4 border">
                  {Object.entries(payslipHistory[payslipHistory.length - 1].deductions)
                    .map(([deduction, amount]) => `${deduction}: ${amount}`)
                    .join(', ') || 'None'}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border">Net Pay:</td>
                <td className="py-2 px-4 border">{payslipHistory[payslipHistory.length - 1].NetPay}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border">Pay Period:</td>
                <td className="py-2 px-4 border">{payslipHistory[payslipHistory.length - 1].PayPeriod}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border">Bank Account:</td>
                <td className="py-2 px-4 border">{payslipHistory[payslipHistory.length - 1].BankAccount}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border">Tax ID:</td>
                <td className="py-2 px-4 border">{payslipHistory[payslipHistory.length - 1].TaxId}</td>
              </tr>
            </tbody>
          </table>
          <button
            onClick={() => generatePDF(payslipHistory[payslipHistory.length - 1])}
            className="mt-4 bg-[#141454] text-white px-4 py-2 rounded"
          >
            Download Payslip
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPayrollForm;