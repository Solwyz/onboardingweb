import React, { useEffect, useState } from "react";
import tickIcon from "../../../../Assets/HrTas/check.svg";
import PersonalDetailForm from "./PersonalDetailForm";
import BackButton from "./BackButton";
import NewProgressive from "./NewProgressive";
import Api from "../../../../Services/Api";

const token = localStorage.getItem("token");
console.log("Token:", token);

function SalaryDetailsForm({ setShowSalaryForm }) {
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPersonalForm, setShowPersonalForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({}); // New state to track touched fields

  const [formData, setFormData] = useState({
    basicSalary: "",
    currentSalary: "",
    nextReviewDate: "",
    earning: "",
    deduction: "",
    bonus: "",
    epf: "",
    bankName: "",
    bankAccount: "",
    payPeriod: "",
    method: "",
  });

  useEffect(() => {
    const {
      basicSalary,
      currentSalary,
      nextReviewDate,
      earning,
      deduction,
      bonus,
      epf,
      bankName,
      bankAccount,
      payPeriod,
      method,
    } = formData;

    const isValid =
      basicSalary &&
      currentSalary &&
      nextReviewDate &&
      earning &&
      deduction &&
      bonus &&
      epf &&
      bankName &&
      bankAccount &&
      payPeriod &&
      method;

    setIsFormValid(isValid);
  }, [formData]);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "This field is required";
      }
    });

    // Validate numeric fields
    const numericFields = [
      "basicSalary",
      "currentSalary",
      "earning",
      "deduction",
      "bonus",
      "epf",
    ];

    numericFields.forEach((field) => {
      if (formData[field] && isNaN(formData[field])) {
        newErrors[field] = `${field.replace(/([A-Z])/g, ' $1')} must be a number`;
      }
    });

    if (formData.bankAccount && !/^[0-9]{9,18}$/.test(formData.bankAccount)) {
      newErrors.bankAccount = "Bank account must be 9-18 digits";
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleKeyDown = (e) => {
    // Allow only numbers, Backspace, Delete, and Tab
    if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete" && e.key !== "Tab") {
      e.preventDefault();
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData({ ...formData, [name]: value });

    // Validate numeric fields on change
    if (["basicSalary", "currentSalary", "earning", "deduction", "bonus", "epf"].includes(name)) {
      if (value && isNaN(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: `${name.replace(/([A-Z])/g, ' $1')} must be a number`,
        }));
      } else {
        setErrors((prevErrors) => {
          const { [name]: removedError, ...rest } = prevErrors; // Remove error if valid
          return rest;
        });
      }
    }

    setTouched({ ...touched, [name]: true }); // Mark field as touched
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({}); // Reset touched state on submit

    if (isFormValid) {
      console.log(formData);
      setShowPersonalForm(true);
      Api.post(
        "api/salaryDetails",
        {
          basicSalary: formData.basicSalary,
          currentSalary: formData.currentSalary,
          earnings: formData.earning,
          deductions: formData.deduction,
          bonus: formData.bonus,
          epf: formData.epf,
          bankName: formData.bankName,
          bankAccount: formData.bankAccount,
          month: "string",
          payPeriod: "MONTHLY",
          paymentMethod: "CASH",
        },
        {
          Authorization: `Bearer ${token}`,
        }
      ).then((response) => {
        console.log(response);
      });
    } else {
      // If the form is invalid, validate again to show errors
      validateForm();
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div>
      {!showPersonalForm ? (
        <div className="mt-8">
          <NewProgressive stage={"Salary"} />

          <div className="flex justify-start mt-6 mx-6">
            <BackButton stateValue={setShowSalaryForm} />
          </div>

          <div className="p-6">
            <form
              className="border rounded shadow p-6 bg-white pb-32"
              onSubmit={handleSubmit}
            >
              <div className="text-[20px] font-medium border-b pb-4">
                Salary Details
              </div>

              <div className="flex gap-4 text-[#373737]">
                <div className="mt-6">
                  <div className="text-[14px]">Basic Salary</div>
                  <input
                    type="text"
                    name="basicSalary"
                    onKeyDown={handleKeyDown}
                    value={formData.basicSalary}
                    onChange={handleFormChange}
                    className="text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] text-[#696A70] focus:outline-[#A4A4E5]"
                  />
                  {touched.basicSalary && errors.basicSalary && (
                    <div className="text-red-500 text-sm">{errors.basicSalary}</div>
                  )}
                </div>
                
                <div className="mt-6">
                  <div className="text-[14px]">Current Salary</div>
                  <input
                    type="text"
                    name="currentSalary"
                    onKeyDown={handleKeyDown}
                    value={formData.currentSalary}
                    onChange={handleFormChange}
                    className="text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] text-[#696A70] focus:outline-[#A4A4E5]"
                  />
                  {touched.currentSalary && errors.currentSalary && (
                    <div className="text-red-500 text-sm">{errors.currentSalary}</div>
                  )}
                </div>
              </div>

              <div className="flex gap-4 text-[#373737]">
                <div className="mt-6">
                  <div className="text-[14px]">Next review date</div>
                  <input
                    type="date"
                    name="nextReviewDate"
                    min={today}
                    value={formData.nextReviewDate}
                    onChange={handleFormChange}
                    className="text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] text-[#696A70] focus:outline-[#A4A4E5]"
                  />
                  {touched.nextReviewDate && errors.nextReviewDate && (
                    <div className="text-red-500 text-sm">{errors.nextReviewDate}</div>
                  )}
                </div>
              </div>

              <div className="flex gap-4 text-[#373737]">
                <div className="mt-6">
                  <div className="text-[14px]">Earning</div>
                  <input
                    type="text"
                    name="earning"
                    onKeyDown={handleKeyDown}
                    value={formData.earning}
                    onChange={handleFormChange}
                    className="text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] text-[#696A70] focus:outline-[#A4A4E5]"
                  />
                  {touched.earning && errors.earning && (
                    <div className="text-red-500 text-sm">{errors.earning}</div>
                  )}
                </div>
                <div className="mt-6">
                  <div className="text-[14px]">Deduction</div>
                  <input
                    type="text"
                    name="deduction"
                    onKeyDown={handleKeyDown}
                    value={formData.deduction}
                    onChange={handleFormChange}
                    className="text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] text-[#696A70] focus:outline-[#A4A4E5]"
                  />
                  {touched.deduction && errors.deduction && (
                    <div className="text-red-500 text-sm">{errors.deduction}</div>
                  )}
                </div>
              </div>

              <div className="flex gap-4 text-[#373737] ">
                <div className="mt-6">
                  <div className="text-[14px]">Bonus</div>
                  <input
                    type="text"
                    name="bonus"
                    onKeyDown={handleKeyDown}
                    value={formData.bonus}
                    onChange={handleFormChange}
                    className="text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] text-[#696A70] focus:outline-[#A4A4E5]"
                  />
                  {touched.bonus && errors.bonus && (
                    <div className="text-red-500 text-sm">{errors.bonus}</div>
                  )}
                </div>
                <div className="mt-6">
                  <div className="text-[14px]">EPF</div>
                  <input
                    type="text"
                    name="epf"
                    onKeyDown={handleKeyDown}
                    value={formData.epf}
                    onChange={handleFormChange}
                    className="text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] text-[#696A70] focus:outline-[#A4A4E5]"
                  />
                  {touched.epf && errors.epf && (
                    <div className="text-red-500 text-sm">{errors.epf}</div>
                  )}
                </div>
              </div>

              <div className="text-[20px] font-medium border-b pb-4 mt-8">
                Payment
              </div>

              <div className="flex gap-4 text-[#373737]">
                <div className="mt-6">
                  <div className="text-[14px]">Bank Name</div>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleFormChange}
                    className="text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] text-[#696A70] focus:outline-[#A4A4E5]"
                  />
                  {touched.bankName && errors.bankName && (
                    <div className="text-red-500 text-sm">{errors.bankName}</div>
                  )}
                </div>
                <div className="mt-6">
                  <div className="text-[14px]">Bank Account</div>
                  <input
                    type="text"
                    name="bankAccount"
                    onKeyDown={handleKeyDown}
                    value={formData.bankAccount}
                    onChange={handleFormChange}
                    className="text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] text-[#696A70] focus:outline-[#A4A4E5]"
                  />
                  {touched.bankAccount && errors.bankAccount && (
                    <div className="text-red-500 text-sm">{errors.bankAccount}</div>
                  )}
                </div>
              </div>

              <div className="flex gap-4 text-[#373737]">
                <div className="mt-6">
                  <div className="text-[14px]">Pay Period</div>
                  <select
                    name="payPeriod"
                    value={formData.payPeriod}
                    onChange={handleFormChange}
                    className="text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] text-[#696A70] focus:outline-[#A4A4E5]"
                  >
                    <option>Select Your Pay Period</option>
                    <option value="MONTHLY">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                  {touched.payPeriod && errors.payPeriod && (
                    <div className="text-red-500 text-sm">{errors.payPeriod}</div>
                  )}
                </div>
                <div className="mt-6">
                  <div className="text-[14px]">Method</div>
                  <select
                    name="method"
                    value={formData.method}
                    onChange={handleFormChange}
                    className="text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] text-[#696A70] focus:outline-[#A4A4E5]"
                  >
                    <option>Select Your Payment Method</option>
                    <option value="Net Banking">Net Banking</option>
                    <option value="Cheque">Cheque</option>
                    <option value="cash">Cash</option>
                  </select>
                  {touched.method && errors.method && (
                    <div className="text-red-500 text-sm">{errors.method}</div>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`text-[14px] text-white bg-[#2B2342] text-center rounded-lg px-8 h-[48px] mt-8 ${
                    !isFormValid ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={!isFormValid}
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <PersonalDetailForm setShowPersonalForm={setShowPersonalForm} />
      )}
    </div>
  );
}

export default SalaryDetailsForm;