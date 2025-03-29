import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import checkedBox from "../../../Assets/HrTas/checkBox.svg";
import UncheckedBox from "../../../Assets/HrTas/uncheckBox.svg";
import Api from "../../../Services/Api";
import editIcon from '../../../Assets/Superadmin/edit-svgrepo-com.svg'
import deleteIcon from '../../../Assets/Superadmin/delete.svg'
import Swal from "sweetalert2";

const AdminPayrollForm = () => {
  const [payroll, setPayroll] = useState({
    EmployeeName: "",
    BasicSalary: "",
    Bonus: "",
    PayPeriod: "",
    BankAccount: "",
    IFSCCode: "",
    Month: "",
    PaymentMethod: ""
  });


  const [selectedAllowances, setSelectedAllowances] = useState({});
  const [allowanceAmounts, setAllowanceAmounts] = useState({});
  const [selectedDeductions, setSelectedDeductions] = useState({});
  const [deductionAmounts, setDeductionAmounts] = useState({});
  const [bonus, setBonus] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const [file, setFile] = useState(null); // For file upload
  const [employees, setEmployees] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [showPayrollForm, setShowPayrollForm] = useState(false);
  const [employeeID, setEmployeeID] = useState("")

  const token = localStorage.getItem('token')

  const allowancesOptions = ["Housing", "Transport", "Medical"];
  const deductionsOptions = ["Tax", "Insurance", "Provident Fund"];


  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayroll((prevPayroll) => ({
      ...prevPayroll,
      [name]: value,
    }));
  };

  const validateField = (fieldName, value) => {
    setIsFormValid(

      payroll.BasicSalary &&
      payroll.BankAccount &&
      payroll.IFSCCode &&
      payroll.Month &&
      payroll.PayPeriod &&
      payroll.PaymentMethod
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

    console.log('paydata:', payroll)
    e.preventDefault();
 
  };

  const handleDownload = () => {

    const doc = new jsPDF();

    doc.text("Payroll Data", 14, 16);
    doc.autoTable({
      head: [["Employee Name", "Basic Salary", "Bonus", "Pay Period", "Bank Account", "IFSC Code"]],
      body: [[
        payroll.EmployeeName,
        payroll.BasicSalary,
        payroll.Bonus,
        payroll.PayPeriod,
        payroll.BankAccount,
        payroll.IFSCCode,
      ]],
    });

    doc.save("payroll.pdf");

    Api.post('api/salaryDetails', {
      "employee": {
        "id": payroll.EmployeeId
      },
      "basicSalary": payroll.BasicSalary,
      "bankAccount": payroll.BankAccount,
      "month": payroll.Month,
      "payPeriod": payroll.PayPeriod,
      "paymentMethod": payroll.PaymentMethod
    }, { 'Authorization': `Bearer ${token}` })
      .then(response => {
        if (response && response.data) {
          setPayroll({
            EmployeeName: "",
            BasicSalary: "",
            Bonus: "",
            PayPeriod: "",
            BankAccount: "",
            IFSCCode: "",
            Month: "",
            PaymentMethod: ""
          })
          setShowPayrollForm(false);
          console.log('payroll created', response.data)
          Swal.fire({
            icon: 'success',
            title: 'Payroll Created',
            text: 'The new payroll has been successfully created!',
            confirmButtonColor: '#2B2342'
          });
        } else {
          console.error('Invalid response data:', response)
          alert('Can not create Payroll. Please try again')
        }
      })

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

  const handleEmployeeClick = (id) => {
    console.log('empID', id)
    setSelectedEmployee(employees.find((emp => emp.id === id)));
    setShowPayrollForm(true);
    setPayroll((prevPayroll) => ({
      ...prevPayroll,
      EmployeeName: employees.find((emp => emp.id === id)).name,
      EmployeeId: id
    }));
  }


  useEffect(() => {
    const isValid =
      payroll.BasicSalary &&
      payroll.Bonus &&
      payroll.BankAccount &&
      payroll.IFSCCode &&
      payroll.Month &&
      payroll.PayPeriod &&
      payroll.PaymentMethod;

    setIsFormValid(isValid);
  }, [payroll, bonus])

  useEffect(() => {
    Api.get('api/employee/api/employees/active', {
      'Authorization': `Bearer ${token}`
    })
      .then(response => {
        if (response && response.data) {
          setEmployees(response.data)
          console.log('payroll employeeeeee', response.data)
        } else {
          console.error('Invalid response data:', response)
          alert('Can not fetch Employees data. Please try again')
        }
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  return (
    <div className="p-6 w-full mx-auto  h-screen  shadow-lg rounded-lg">

      {!showPayrollForm ?
        <div className="h-screen">
          <h1 className="text-[20px] font-medium mb-6">Payroll Management</h1>

          <table className='min-w-full  bg-white rounded-lg'>
            <thead className="bg-[#465062] p-4 text-center font-normal text-sm text-white">
              <tr className='w-full'>
                <th className="p-4 text-start font-normal text-sm rounded-tl-lg">S No.</th>
                <th className="p-4 text-start font-normal text-sm">Name</th>
                <th className="p-4 text-start font-normal text-sm">Employee ID</th>
                <th className="p-4 text-start font-normal text-sm">Role</th>
                <th className="p-4 text-start font-normal text-sm">Bank account</th>
                <th className="p-4 text-start font-normal text-sm">Pay period</th>
                <th className="p-4 text-start font-normal text-sm rounded-tr-lg">Edit</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((employee, index) => (
                <tr className="text-sm text-[#464545] font-normal hover:text-[#2B2342] hover:font-extrabold cursor-pointer" onClick={() => handleEmployeeClick(employee.id)}>
                  <td className='p-4 text-start font-normal '>{index + 1}</td>
                  <td className='p-4 text-start font-normal '>{employee.name + ' '+ employee.basicDetails?.lastName}</td>
                  <td className='p-4 text-start font-normal '>{employee.id}</td>
                  <td className='p-4 text-start font-normal '>{employee.salaryDetails?.updatedBy}</td>
                  <td className='p-4 text-start font-normal '>{employee.salaryDetails?.bankAccount}</td>
                  <td className='p-4 text-start font-normal '>{employee.salaryDetails?.payPeriod}</td>
                  <td className='p-4 text-left text-sm'>
                    <div className='flex items-center justify-center gap-4 w-fit'>
                      <img src={editIcon} className='h-3 w-3 hover:cursor-pointer'></img>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> :

        <div>
          <h1 className="text-[20px] font-medium mb-6">Create Payroll</h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex columns-3 gap-10">
              <div>
                <label className="block text-[14px] font-normal mb-2">Employee Name</label>
                <input
                  type="text"
                  name="DisplayName"
                  value={selectedEmployee.name}
                  readOnly
                  className="border border-gray-300 py-[15px] px-4  w-[251px] rounded-lg"
                />
                <input type="hidden" name="EmployeeName" value={selectedEmployee.id} />
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
                  name="Bonus"
                  value={payroll.Bonus}
                  onChange={handleChange}
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
            <div className="flex columns-3 gap-10">
              <div>
                <label className="block text-[14px] font-normal mb-2">Month</label>
                <input
                  type="text"
                  name="Month"
                  value={payroll.Month}
                  onChange={handleChange}
                  className="border border-gray-300 py-[12px] px-4  w-[251px] rounded-lg"
                  placeholder="Month"
                />
              </div>
              <div>
                <label className="block font-normal text-[14px] mb-2">Pay Period</label>
                <select
                  name="PayPeriod"
                  value={payroll.PayPeriod}
                  onChange={handleChange}
                  className="border border-gray-300 py-[15px] px-4  w-[251px] rounded-lg"
                >
                  <option value="">select Pay period</option>
                  <option value="MONTHLY">Monthly</option>
                  <option value="WEEKLY">Weekly</option>
                </select>
              </div>
              <div>
                <label className="block font-normal text-[14px] mb-2">Payment Method</label>
                <select
                  name="PaymentMethod"
                  value={payroll.PaymentMethod}
                  onChange={handleChange}
                  className="border border-gray-300 py-[15px] px-4  w-[251px] rounded-lg"
                >
                  <option value="">Select payment method</option>
                  <option value="CASH">CASH</option>
                  <option value="CHEQUE">CHEQUE</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`bg-[#2B2342] text-white py-4 px-6 rounded-lg ${!isFormValid ? "opacity-50 bg-gray-300 cursor-not-allowed" : ""
                }`}
              onClick={handleDownload}
            >
              Save Payroll
            </button>

          </form>


          {/* <div className="mt-10 flex w-full justify-between bg-white px-6 py-[30px] shadow-lg">
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
          </div> */}


        </div>
      }

    </div>
  );
};

export default AdminPayrollForm;
