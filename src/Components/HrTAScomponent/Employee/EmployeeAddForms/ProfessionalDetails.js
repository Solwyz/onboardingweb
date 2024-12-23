import React, { useState, useEffect } from "react";
import tickIcon from "../../../../Assets/HrTas/check.svg";
import SalaryDetailsForm from "./SalaryDetailsForm";
import BackButton from "./BackButton";
import NewProgressive from "./NewProgressive";

function ProfessionalDetails({ setShowProfessionalForm }) {
  const [showSalaryForm, setShowSalaryForm] = useState(false);
  const [formData, setFormData] = useState({
    dateOfJoin: "",
    endOfProbation: "",
    dateEffective: "",
    jobPosition: "",
    lineManager: "",
    department: "",
    branch: "",
    level: "",
    jobType: "",
    description: "",
    leaveFlow: "",
    workday: "",
    holiday: "",
  });

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // Check if all required fields are valid and filled
  useEffect(() => {
    const isValid =
      formData.dateOfJoin &&
      formData.endOfProbation &&
      new Date(formData.endOfProbation) > new Date(formData.dateOfJoin) &&
      formData.dateEffective &&
      new Date(formData.dateEffective) >= new Date(formData.dateOfJoin) &&
      formData.lineManager !== "Select Your Line Manager" &&
      formData.branch !== "Select Your Branch" &&
      formData.level !== "Select Your Level" &&
      formData.jobType !== "Select Your Job Type" &&
      formData.description.trim() !== "" &&
      formData.holiday !== "Select Your Holiday Location";

    setIsButtonEnabled(isValid);
  }, [formData]);

  // Restrict future date selection for dateOfJoin
  const todayDate = new Date().toISOString().split("T")[0];

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "dateOfJoin") {
      setFormData((prevData) => ({
        ...prevData,
        dateOfJoin: value,
        endOfProbation: "",
        dateEffective: "",
      }));
    } else if (name === "endOfProbation") {
      const joinDate = new Date(formData.dateOfJoin);
      const selectedDate = new Date(value);
      if (selectedDate > joinDate) {
        setFormData((prevData) => ({
          ...prevData,
          endOfProbation: value,
        }));
      }
    } else if (name === "dateEffective") {
      const joinDate = new Date(formData.dateOfJoin);
      const selectedDate = new Date(value);
      if (selectedDate >= joinDate) {
        setFormData((prevData) => ({
          ...prevData,
          dateEffective: value,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle button click
  const handleNext = () => {
    console.log(formData); // Log the form data to the console
    setShowSalaryForm(true);
  };

  return (
    <div>
      {!showSalaryForm ? (
        <div className="bg-[#F8FAFB]">
          <NewProgressive stage={"Professional"} />

          <div className="flex justify-start mt-6 mx-6">
            <BackButton stateValue={setShowProfessionalForm} />
          </div>

          <div className="mx-[24px] mt-[32px] p-6 w-auto bg-white shadow-lg">
            <div className="">
              <div className="">
                <h3 className="text-[20px] font-medium">
                  Professional Details
                </h3>
              </div>
              <div className=" border-b border-[#E6E6E7] w-auto items-center justify-center mt-[16px] mx-auto"></div>

              <div className="flex mt-[16px]">
                <div>
                  <label className="block text-sm text-[#373737] font-normal">
                    Date of Joined
                  </label>
                  <input
                    type="date"
                    name="dateOfJoin"
                    value={formData.dateOfJoin}
                    onChange={handleChange}
                    max={todayDate}
                    className="w-[247px] h-[48px] px-[16px] py-[14px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] focus:outline-[#A4A4E5] font-normal"
                  />
                </div>

                <div className="ml-[16px]">
                  <label className="block text-sm font-normal text-[#373737]">
                    End of Probation
                  </label>
                  <input
                    type="date"
                    name="endOfProbation"
                    value={formData.endOfProbation}
                    onChange={handleChange}
                    min={formData.dateOfJoin}
                    className="w-[247px] h-[48px] px-[16px] py-[14px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] focus:outline-[#A4A4E5] font-normal"
                  />
                </div>
              </div>

              <div className="flex mt-[16px]">
                <div>
                  <label className="block text-sm font-normal text-[#373737]">
                    Date Effective
                  </label>
                  <input
                    type="date"
                    name="dateEffective"
                    value={formData.dateEffective}
                    onChange={handleChange}
                    min={formData.dateOfJoin}
                    className="w-[247px] h-[48px] px-[16px] py-[14px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] focus:outline-[#A4A4E5] font-normal"
                  />
                </div>

                <div className="ml-[16px]">
                  <label className="block text-sm font-normal text-[#373737]">
                    Line Manager
                  </label>
                  <select
                    name="lineManager"
                    value={formData.lineManager}
                    onChange={handleChange}
                    className="w-[247px] focus:outline-[#A4A4E5] px-[16px] py-[14px] h-[48px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] font-normal"
                  >
                    <option>Select Your Line Manager</option>

                    <option>Vijay T</option>
                  </select>
                </div>
              </div>

              <div className="flex mt-[16px]">
                <div className="">
                  <label className="block text-sm font-normal text-[#373737]">
                    Branch
                  </label>
                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    className="w-[247px] focus:outline-[#A4A4E5] px-[16px] py-[14px] h-[48px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] font-normal"
                  >
                    <option>Select Your Branch</option>

                    <option>Technical</option>
                  </select>
                </div>

                <div className="ml-[16px]">
                  <label className="block text-sm font-normal text-[#373737]">
                    Level
                  </label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className="w-[247px] focus:outline-[#A4A4E5] px-[16px] py-[14px] h-[48px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] font-normal"
                  >
                    <option>Select Your Level</option>

                    <option>1</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-[32px]">
              <div className="">
                <div className="">
                  <h3 className="text-[20px] font-medium">Employment Terms</h3>
                </div>
                <div className=" border-b border-[#E6E6E7] w-auto items-center justify-center mt-[16px] mx-auto"></div>

                <div className="flex mt-[16px]">
                  <div className="ml-[16px]">
                    <label className="block text-sm text-[#373737] font-normal">
                      Job Type
                    </label>
                    <select
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleChange}
                      className="w-[247px] focus:outline-[#A4A4E5] h-[48px] px-[16px] py-[14px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] font-normal"
                    >
                      <option>Select Your Job Type</option>

                      <option>Full Time</option>
                    </select>
                  </div>

                  <div className="ml-[16px]">
                    <label className="block text-sm text-[#373737] font-normal">
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-[247px] focus:outline-[#A4A4E5] h-[48px] mt-[8px] px-[16px] py-[14px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] font-normal"
                    />
                  </div>

                  <div className="ml-[16px]">
                    <label className="block text-sm text-[#373737] font-normal">
                      Holiday
                    </label>
                    <select
                      name="holiday"
                      value={formData.holiday}
                      onChange={handleChange}
                      className="w-[247px] focus:outline-[#A4A4E5] h-[48px] px-[16px] py-[14px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] font-normal"
                    >
                      <option>Select Your Holiday Location</option>

                      <option>India</option>
                    </select>
                  </div>
                </div>

                <div className="flex mt-[16px]"></div>
              </div>
            </div>

            <div className="flex justify-end mt-[32px]">
              <button
                className={`px-6 py-2 w-[92px] h-[48px] text-white font-normal text-sm rounded-md 
                        ${
                          isButtonEnabled
                            ? "bg-[#2B2342]"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                onClick={handleNext}
                disabled={!isButtonEnabled}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        <SalaryDetailsForm setShowSalaryForm={setShowSalaryForm} />
      )}
    </div>
  );
}

export default ProfessionalDetails;
