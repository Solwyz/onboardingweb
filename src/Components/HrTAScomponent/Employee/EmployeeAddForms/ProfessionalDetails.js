import React, { useState, useEffect } from "react";
import Api from "../../../../Services/Api";
import tickIcon from "../../../../Assets/HrTas/check.svg";
import SalaryDetailsForm from "./SalaryDetailsForm";
import BackButton from "./BackButton";
import NewProgressive from "./NewProgressive";

const token = localStorage.getItem("token");
console.log("token:", token);

function ProfessionalDetails({ setShowProfessionalForm, editingEmployee, ids, setIds }) {


  const [showSalaryForm, setShowSalaryForm] = useState(false);
  const [formData, setFormData] = useState({
    dateOfJoining: "",
    endOfProbation: "",
    dateEffective: "",
    jobPosition: "",
    lineManager: "",
    department: "",
    branch: "",
    level: "",
    jobType: "",
    leaveFlow: "",
    workday: "",
    holiday: "",
  });

  const [lineManagers, setLineManagers] = useState([]);
  const [branches, setBranches] = useState([]);

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [levels, setLevels] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [responseProffID, setResponseProffID] = useState(null)



  const holidays = [{ id: 1, name: "INDIAN" }];

  // const jobTypes = [
  //   { id: 1, name: "Full Time", value: "FULL_TIME" },
  //   { id: 2, name: "Part Time", value: "PART_TIME" },
  //   { id: 3, name: "Contract", value: "CONTRACT" },
  //   { id: 4, name: "Intren", value: "INTERN" },
  // ];
  const [maxDate, setMaxDate] = useState(() => {
    const today = new Date();
    const year = today.getFullYear() - 18;
    const month = `0${today.getMonth() + 1}`.slice(-2);
    const day = `0${today.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  });

  useEffect(() => {
    console.log('profEditEmployee', editingEmployee);
    console.log('FormDataiszz', formData);

    const joinDateArray = editingEmployee?.professionalDetails?.dateOfJoining || ['0000', '00', '00'];
    const joinDate = new Date(joinDateArray[0], joinDateArray[1] - 1, joinDateArray[2])
      .toISOString()
      .split('T')[0];

    const today = new Date();
    const year = today.getFullYear() - 18;
    const month = `0${today.getMonth() + 1}`.slice(-2);
    const day = `0${today.getDate()}`.slice(-2);
    setMaxDate(`${year}-${month}-${day}`);

    console.log('oldDateeJoin', joinDateArray)
    console.log('new joinDateeee', joinDate);



    const probationDateArray = editingEmployee?.professionalDetails?.endOfProbation || ['0000', '00', '00'];
    const probationDate = new Date(probationDateArray[0], probationDateArray[1] - 1, probationDateArray[2])
      .toISOString()
      .split('T')[0];
    console.log('oldDateeprobation', probationDateArray)
    console.log('new probationDateeee', probationDate);
    const dateEffectiveArray = editingEmployee?.professionalDetails?.dateEffective || ['0000', '00', '00'];
    const dateEfective = new Date(dateEffectiveArray[0], dateEffectiveArray[1] - 1, dateEffectiveArray[2])
      .toISOString()
      .split('T')[0];

    {
      editingEmployee.professionalDetails &&
        setFormData({
          dateOfJoining: editingEmployee ? joinDate : '',
          endOfProbation: editingEmployee ? probationDate : '',
          dateEffective: editingEmployee? dateEfective:'',
          jobPosition: "",
          lineManager: "",
          department: "",
          branch: editingEmployee?.professionalDetails?.branch.id || '',
          level: editingEmployee?.professionalDetails?.level?.id || '',
          jobType: editingEmployee?.professionalDetails?.jobType || '',
          leaveFlow: "",
          workday: "",
          holiday: editingEmployee?.professionalDetails?.holidayCycle || '',
        })
    }

  }, [])


  // Fetch line managers from /api/employee
  useEffect(() => {
    Api.get("api/employee/api/employees/active", {
      Authorization: `Bearer ${token}`,
    }) // Fetch line managers from this endpoint
      .then((response) => {
        setLineManagers(response.data); // Assuming response.data is an array of line managers
      })
      .catch((error) => {
        console.error("Error fetching line managers:", error);
        setError("Failed to load line managers");
      });
  }, []);

  useEffect(() => {
    Api.get("api/level", {
      Authorization: `Bearer ${token}`,
    }) // Fetch line managers from this endpoint
      .then((response) => {
        setLevels(response.data.content); // Assuming response.data is an array of line managers
      })
      .catch((error) => {
        console.error("Error fetching holiday:", error);
        setError("Failed to load holiday");
      });
  }, []);

  useEffect(() => {
    Api.get("api/branch", {
      Authorization: `Bearer ${token}`,
    })
      .then((response) => {
        // setFormData(response.data.formData || {});
        setBranches(response.data.content || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load other data");
        setLoading(false);
      });
  }, []);
  // Check if all required fields are valid and filled
  useEffect(() => {
    // console.log('klklll', formData)
    const isValid =
      formData.dateOfJoining &&
      formData.endOfProbation &&
      new Date(formData.endOfProbation) > new Date(formData.dateOfJoining) &&
      formData.dateEffective &&
      new Date(formData.dateEffective) >= new Date(formData.dateOfJoining) &&
      formData.lineManager !== "Select Your Line Manager" &&
      formData.branch !== "Select Your Branch" &&
      formData.level !== "Select Your Level" &&
      formData.jobType !== "Select Your Job Type" &&
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
        dateOfJoining: value,
        endOfProbation: "",
        dateEffective: "",
      }));
    } else if (name === "endOfProbation") {
      const joinDate = new Date(formData.dateOfJoining);
      const selectedDate = new Date(value);
      if (selectedDate > joinDate) {
        setFormData((prevData) => ({
          ...prevData,
          endOfProbation: value,
        }));
      }
    } else if (name === "dateEffective") {
      const joinDate = new Date(formData.dateOfJoining);
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
  const handleNext = (e) => {
    e.preventDefault();
    console.log("llll", formData); // Log the form data to the console
    // setShowSalaryForm(true);
    Api.post(
      "api/professionalDetails",
      {
        dateOfJoining: formData.dateOfJoining,
        endOfProbation: formData.endOfProbation,
        effectiveDate: formData.dateEffective,
        dateOfBirth: formData.dateOfBirth,
        jobType: formData.jobType,
        branch: {
          id: formData.branch,
        },
        level: {
          id: formData.level,
        },
        holidayCycle: formData.holiday,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    ).then((response) => {
      if(response && response.data) {
        setShowSalaryForm(true);
        console.log("Professional Details added successfully:", response.data);
        setResponseProffID(response.data.id)
        setIds((prevIds) => ({ ...prevIds, ["profId"]: response.data.id }));
      } else {
        console.error("Failed to add Professional Details:", response);
        alert("Failed to add Professional Details");
      }
      
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>; // Show error message if there's an error
  }

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
                    Date of Joining
                  </label>
                  <input
                    type="date"
                    name="dateOfJoin"
                    value={formData?.dateOfJoining || ""}
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
                    min={formData.dateOfJoining}
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
                    min={formData.dateOfJoining}
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
                    <option >Select Your Line Manager</option>
                    {lineManagers.map((manager) => (
                      <option key={manager.id} value={manager.name}>
                        {manager.name}
                      </option>
                    ))}
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
                    <option >Select Your Branch</option>
                    {branches.map((branch) => (
                      <option key={branch.id} value={branch.id}>
                        {branch.name}
                      </option>
                    ))}
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
                    <option >Select Your Level</option>
                    {levels.map((level) => (
                      <option key={level.id} value={level.id}>
                        {level.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex mt-[16px]">
                <div className="">
                  <label className="block text-sm font-normal text-[#373737]">
                    Job Type
                  </label>
                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    className="w-[247px] focus:outline-[#A4A4E5] px-[16px] py-[14px] h-[48px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] font-normal"
                  >
                    <option value="" >Select Your Job Type</option>
                    <option value="FULL_TIME">Full Time</option>
                    <option value="PART_TIME">Part Time</option>
                    <option value="CONTRACT">Contract</option>
                    <option value="INTERN">Intern</option>
                  </select>
                </div>

                {/* { id: 1, name: "Full Time", value: "FULL_TIME" },
                     { id: 2, name: "Part Time", value: "PART_TIME" },
                     { id: 3, name: "Contract", value: "CONTRACT" },
                     { id: 4, name: "Intren", value: "INTERN" }, */}

                <div className="ml-[16px]">
                  <label className="block text-sm font-normal text-[#373737]">
                    Holiday Location
                  </label>
                  <select
                    name="holiday"
                    value={formData.holiday}
                    onChange={handleChange}
                    className="w-[247px] focus:outline-[#A4A4E5] px-[16px] py-[14px] h-[48px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] font-normal"
                  >
                    <option >Select Your Holiday Location</option>
                    {holidays.map((holiday) => (
                      <option key={holiday.id} value={holiday.name}>
                        {holiday.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex mt-[32px]">
                <div className="flex justify-end w-full">
                  <button
                    onClick={handleNext}
                    disabled={!isButtonEnabled}
                    className={`text-[14px] text-white bg-[#2B2342] text-center rounded-lg px-8 h-[48px]  ${!isButtonEnabled ? "cursor-not-allowed opacity-50" : ""
                      }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SalaryDetailsForm setShowSalaryForm={setShowSalaryForm}
          editingEmployee={editingEmployee}
          ids={ids}
          setIds={setIds}
        />
      )}
    </div>
  );
}

export default ProfessionalDetails;
