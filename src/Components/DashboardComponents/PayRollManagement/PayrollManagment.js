import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import checkedBox from "../../../Assets/HrTas/checkBox.svg";
import UncheckedBox from "../../../Assets/HrTas/uncheckBox.svg";

const AdminPayrollForm = () => {
  const [payroll, setPayroll] = useState({
    EmployeeName: "",
    BasicSalary: "",
    Bonus: "",
    PayPeriod: "",
    BankAccount: "",
    IFSCCode: "",
  });

  const [selectedAllowances, setSelectedAllowances] = useState({});
  const [allowanceAmounts, setAllowanceAmounts] = useState({});
  const [selectedDeductions, setSelectedDeductions] = useState({});
  const [deductionAmounts, setDeductionAmounts] = useState({});
  const [bonus, setBonus] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const [file, setFile] = useState(null); // For file upload

  const allowancesOptions = ["Housing", "Transport", "Medical"];
  const deductionsOptions = ["Tax", "Insurance", "Provident Fund"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayroll((prevPayroll) => ({
      ...prevPayroll,
      [name]: value,
    }));
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    setIsFormValid(
      !!payroll.EmployeeName &&
      !!payroll.BasicSalary &&
      !!payroll.BankAccount &&
      !!payroll.IFSCCode &&
      !!payroll.PayPeriod
    );
  };

  const handleAllowanceChange = (name) => {
    setSelectedAllowances((prev) => ({ ...prev, [name]: !prev[name] }));
    if (selectedAllowances[name]) {
      setAllowanceAmounts((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleAllowanceAmountChange = (e) => {
    const { name, value } = e.target;
    setAllowanceAmounts((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleDeductionChange = (name) => {
    setSelectedDeductions((prev) => ({ ...prev, [name]: !prev[name] }));
    if (selectedDeductions[name]) {
      setDeductionAmounts((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleDeductionAmountChange = (e) => {
    const { name, value } = e.target;
    setDeductionAmounts((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleBonusChange = (e) => {
    const { value } = e.target;
    setBonus(value ? Number(value) : "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    alert("Payroll created successfully!");
  };

  const handleDownload = () => {
    const doc = new jsPDF();

    doc.text("Payroll Data", 14, 16);
    doc.autoTable({
      head: [["Employee Name", "Basic Salary", "Bonus", "Pay Period", "Bank Account", "IFSC Code"]],
      body: [[
        payroll.EmployeeName,
        payroll.BasicSalary,
        bonus,
        payroll.PayPeriod,
        payroll.BankAccount,
        payroll.IFSCCode,
      ]],
    });
    
    doc.save("payroll.pdf");
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          console.log("Parsed Results:", results.data);
          // Handle the parsed data as needed
        },
      });
    } else {
      alert("Please select a file to upload");
    }
  };

  return (
    <div className="p-6 w-full mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-[20px] font-medium mb-6">Create Payroll</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex columns-3 gap-10">
          <div>
            <label className="block text-[14px] font-normal mb-2">Employee Name</label>
            <input
              type="text"
              name="EmployeeName"
              value={payroll.EmployeeName}
              onChange={handleChange}
              className="border border-gray-300 py-[15px] px-4  w-[251px] rounded-lg"
              placeholder="Rahul Raj"
            />
          </div>
          <div>
            <label className="block font-normal text-[14px] mb-2">Basic Salary</label>
            <input
              type="number"
              name="BasicSalary"
              value={payroll.BasicSalary}
              onChange={handleChange}
              className="border border-gray-300 py-[15px] px-4  w-[251px] rounded-lg"
              placeholder="25000"
            />
          </div>
          <div>
            <label className="block font-normal text-[14px] mb-2">Bonus</label>
            <input
              type="number"
              value={bonus}
              onChange={handleBonusChange}
              className="border border-gray-300 py-[15px] px-4  w-[251px] rounded-lg"
              placeholder="10000"
            />
          </div>
        </div>
        <div>
          <label className="block font-normal text-[14px] mb-2">Allowances</label>
          <div className="flex columns-3 gap-10 font-normal text-[14px]">
            {allowancesOptions.map((allowance) => (
              <div key={allowance}>
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => handleAllowanceChange(allowance)}
                >
                  <img
                    className="mr-1"
                    src={selectedAllowances[allowance] ? checkedBox : UncheckedBox}
                    alt=""
                  />
                  {allowance}
                </div>
                <input
                  type="number"
                  placeholder="Amount"
                  className="border w-[251px] py-[15px] px-4 rounded-lg focus:outline-none mt-2"
                  name={allowance}
                  value={allowanceAmounts[allowance] || ""}
                  onChange={handleAllowanceAmountChange}
                  disabled={!selectedAllowances[allowance]}
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="block font-normal text-[14px] mb-2">Deductions</label>
          <div className="flex columns-3 gap-10 font-normal text-[14px]">
            {deductionsOptions.map((deduction) => (
              <div key={deduction}>
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => handleDeductionChange(deduction)}
                >
                  <img
                    className="mr-1"
                    src={selectedDeductions[deduction] ? checkedBox : UncheckedBox}
                    alt=""
                  />
                  {deduction}
                </div>
                <input
                  type="number"
                  placeholder="Amount"
                  className="border w-[251px] py-[15px] px-4 rounded-lg focus:outline-none mt-2"
                  name={deduction}
                  value={deductionAmounts[deduction] || ""}
                  onChange={handleDeductionAmountChange}
                  disabled={!selectedDeductions[deduction]}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="block font-normal text-[14px] mb-2">Bank Account</label>
            <input
              type="number"
              name="BankAccount"
              value={payroll.BankAccount}
              onChange={handleChange}
              className="border border-gray-300 py-[15px] px-4  w-[542px] rounded-lg"
              placeholder="9992 2563 2541 7895"
            />
          </div>
          <div>
            <label className="block font-normal text-[14px] mb-2">IFSC Code</label>
            <input
              type="text"
              name="IFSCCode"
              value={payroll.IFSCCode}
              onChange={handleChange}
              className="border border-gray-300 py-[15px] px-4  w-[251px] rounded-lg"
              placeholder="AGGB256178"
            />
          </div>
        </div>
        <div>
          <label className="block font-normal text-[14px] mb-2">Pay Period</label>
          <select
            name="PayPeriod"
            value={payroll.PayPeriod}
            onChange={handleChange}
            className="border border-gray-300 py-[15px] px-4  w-[251px] rounded-lg"
          >
            <option value="">Select Pay Period</option>
            <option value="Monthly">Monthly</option>
            <option value="Weekly">Weekly</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={!isFormValid}
          className={`bg-[#2B2342] text-white py-4 px-6 rounded-lg ${!isFormValid ? "opacity-50 bg-gray-300 cursor-not-allowed" : ""
            }`}
            onClick={handleDownload}
        >
          Create Payroll
        </button>

      </form>

      <div className="mt-10 flex w-full justify-between bg-white px-6 py-[30px] shadow-lg">
    <div>    <h2 className="text-[20px] font-medium ">Upload Payroll Data </h2>
        <p>Add the payroll here in pdf format.</p></div>
        <button className="border px-6 py-4 rounded-lg border-[#2B2342]">
        <label htmlFor="payrollUpload" style={{ cursor: 'pointer', color: '#2B2342' }}>
  Upload Payroll
 
  <input 
    type="file" 
    id="payrollUpload" 
    onChange={handleFileChange} 
    style={{ display: 'none' }} 
    className=""
  />
</label>
        </button>
     
       
      </div>
    </div>
  );
};

export default AdminPayrollForm;
