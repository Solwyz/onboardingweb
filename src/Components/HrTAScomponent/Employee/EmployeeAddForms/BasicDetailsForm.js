import React, { useEffect, useState } from "react";
import Api from "../../../../Services/Api";
import bar1 from "../../../../Assets/HrTas/employeeForms/form1.png";
import tickIcon from "../../../../Assets/HrTas/check.svg";
import ProfessionalDetails from "./ProfessionalDetails";
import NewProgressive from "./NewProgressive";
import image from '../../../../Assets/hrm/account_circle.svg';
import PhotoUpload from '../../../../Assets/hrm/photo_upload.svg';

import { ref, uploadBytes, getDownloadURL, listAll, list } from "firebase/storage";

import { storage } from "../../../../firebase";

import { v4 } from "uuid";


const token = localStorage.getItem("token");
console.log("Token:", token);

function BasicDetailsForm({ editingEmployee }) {
  const [maxDate, setMaxDate] = useState("");
  const [designations, setDesignations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [projects, setProjects] = useState([]);
  const [photoPreview, setPhotoPreview] = useState(null);

  const [ids, setIds] = useState({})
  const [responseBasicID, setResponseBasicID] = useState(null)

  useEffect(() => {
    console.log("bbemppppp,", editingEmployee);
    console.log('datttttee', editingEmployee?.basicDetails?.dateOfBirth);
    const dateArray = editingEmployee?.basicDetails?.dateOfBirth || ['0000', '00', '00'];
    const formattedDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]) // Month is 0-based
      .toISOString()
      .split('T')[0]; // Convert to YYYY-MM-DD

    console.log('old datee array', dateArray)
    console.log('new dateeee', formattedDate); // Output: "2024-02-21"

    const today = new Date();
    const year = today.getFullYear() - 18;
    const month = `0${today.getMonth() + 1}`.slice(-2);
    const day = `0${today.getDate()}`.slice(-2);
    setMaxDate(`${year}-${month}-${day}`);

    {
      editingEmployee.basicDetails &&
        setFormData({
          firstName: editingEmployee?.basicDetails?.firstName || "",
          lastName: editingEmployee?.basicDetails?.lastName || "",
          gender: editingEmployee?.basicDetails?.gender || "",
          nationality: editingEmployee?.basicDetails?.nationality || "",
          dateOfBirth: formattedDate || "",
          panNumber: editingEmployee?.basicDetails?.panNumber || "",
          passport: editingEmployee?.basicDetails?.passport || "",
          designation: editingEmployee?.basicDetails?.designation?.name || "",
          department:
            editingEmployee?.basicDetails?.department?.departmentName || "",
          email: editingEmployee?.email || "",
        });
    }
  }, []);

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("file:", file)
      const imageRef = ref(storage, `images/${file.name + v4()}`);
      uploadBytes(imageRef, file).then((snapshot) => {
        if (snapshot && snapshot.metadata) {
          console.log("Uploaded a blob or file!", snapshot);
          getDownloadURL(snapshot.ref).then((url) => {
            console.log("new URL:", url);
            setFormData((prev) => ({
              ...prev,
              image: url,
            }))
          })
        } else {
          console.error("Error uploading file:", snapshot);
        }
      })
      // setFormData((prev) => ({
      //   ...prev,
      //   image: file,
      // }))
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // Fetch designations
    Api.get("api/designation", {
      Authorization: `Bearer ${token}`,
    })
      .then((response) => {
        setDesignations(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching designations:", error);
      });

    // Fetch departments
    Api.get("api/department", {
      Authorization: `Bearer ${token}`,
    })
      .then((response) => {
        setDepartments(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });

    // Fetch projects
    Api.get("api/project", {
      Authorization: `Bearer ${token}`,
    })
      .then((response) => {
        setProjects(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });

  }, []);

  const [isFormValid, setIsFormValid] = useState(false);
  const [showProfessionalForm, setShowProfessionalForm] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    nationality: "",
    dateOfBirth: "",
    panNumber: "",
    passport: "",
    designation: "",
    department: "",
    project: "",
    email: "",
    image: "",
  });

  useEffect(() => {
    const {
      firstName,
      lastName,
      gender,
      nationality,
      dateOfBirth,
      panNumber,
      designation,
      department,
      project,
      email,
      image,
    } = formData;

    const isValid =
      firstName &&
      lastName &&
      gender &&
      nationality &&
      dateOfBirth &&
      panNumber &&
      designation &&
      department &&
      email &&
      !errors.email &&
      !errors.firstName &&
      !errors.panNumber &&
      !errors.passport;

    setIsFormValid(isValid);
  }, [formData, errors]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateFirstName = (firstName) => {
    const firstNameRegex = /^[A-Za-z].*$/;
    return firstNameRegex.test(firstName);
  };

  const validatePanNumber = (panNumber) => {
    const alphanumericRegex = /^[a-zA-Z0-9]*$/;
    return alphanumericRegex.test(panNumber);
  };

  const validatePassport = (passport) => {
    const alphanumericRegex = /^[a-zA-Z0-9]*$/;
    return alphanumericRegex.test(passport);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      if (!validateEmail(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Invalid email address",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "",
        }));
      }
    }

    if (name === "firstName") {
      if (!validateFirstName(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          firstName: "First Name cannot start with a number",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          firstName: "",
        }));
      }
    }

    if (name === "panNumber") {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/; // Standard PAN format: 5 letters, 4 digits, 1 letter

      if (!value.match(panRegex)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          panNumber: "PAN number Uper case and 10 characters",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          panNumber: "",
        }));
      }
    }

    if (name === "passport") {
      if (!validatePassport(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          passport: "Aadhaar number does not contain special characters",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          passport: "",
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid) {
      console.log("checkBasic", formData);
      Api.post(
        "api/basicDetails",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          gender: formData.gender,
          dateOfBirth: formData.dateOfBirth,
          nationality: formData.nationality,
          department: {
            id: formData.department,
          },
          designation: {
            id: formData.designation,
          },
          project: {
            id: formData.project,
          },
          panNumber: formData.panNumber,
          passport: formData.passport,
          image: formData.image,
        },
        { Authorization: `Bearer ${token}` }
      ).then((response) => {
        if (response && response.data) {
          setShowProfessionalForm(true);
          console.log("basicSub:", response);
          setResponseBasicID(response.data.id)
          setIds((prevIds) => ({ ...prevIds, ["basicId"]: response.data.id, ["employeeName"]: formData.firstName, ["employeeEmail"]: formData.email }));
          console.log("Stored ID:", response.data.id);
        } else {
          console.error("Invalid response data:", response);
          alert("Can not add Basic details. Please try again");
        }
      });
    }
  };

  return (
    <div>
      {!showProfessionalForm ? (
        <div className="mt-8">
          <NewProgressive stage="Basic" />
          <form
            className="shadow mt-8 p-6 bg-[#FFFFFF]"
            onSubmit={handleSubmit}
          >
            <div className="text-[20px] font-medium border-b pb-4">
              Basic Details
            </div>
            <div className="flex justify-between">

              <div>
                <div className="flex gap-4 text-[#373737]">
                  <div className="mt-6">
                    <div className="text-[14px]">First Name</div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleFormChange}
                      className="text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] focus:outline-[#A4A4E5]"
                    />
                    {errors.firstName && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.firstName}
                      </div>
                    )}
                  </div>
                  <div className="mt-6">
                    <div className="text-[14px]">Last Name</div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleFormChange}
                      className="text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] focus:outline-[#A4A4E5]"
                    />
                  </div>
                </div>

                <div className="flex gap-4 text-[#373737]">
                  <div className="mt-6">
                    <div className="text-[14px]">Gender</div>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleFormChange}
                      className="text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] focus:outline-[#A4A4E5]"
                    >
                      <option value="">Select Gender</option>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHERS">Others</option>
                    </select>
                  </div>
                  <div className="mt-6">
                    <div className="text-[14px]">Nationality</div>
                    <select
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleFormChange}
                      className="text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] focus:outline-[#A4A4E5]"
                    >
                      <option disabled value="">Select Nationality</option>
                      <option value="INDIAN">Indian</option>
                      <option value="UAE">UAE</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className='h-fit mt-6'>
                <div className="flex flex-col items-center w-fit">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Profile Preview"
                      className="mb-2 w-[184px] h-[184px] object-cover"
                    />
                  ) : (
                    <div className="mb-2 w-[184px] h-[184px] border border-dashed flex items-center justify-center bg-[#F5F5F5] text-gray-400">
                      <span><img src={image} alt="" /></span>
                    </div>
                  )}

                  <label htmlFor="photo-upload" className="mt-2 text-[#7386C3] text-[12px] font-normal flex cursor-pointer">
                    <img className='mr-1' src={PhotoUpload} alt="" />
                    Upload photo
                  </label>

                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                </div>
              </div>
            </div>

            <div className="text-[20px] font-medium border-b pb-4 mt-8">
              ID Proof
            </div>

            <div className="flex gap-4 text-[#373737]">
              <div className="mt-6">
                <div className="text-[14px]">PAN Number</div>
                <input
                  type="text"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleFormChange}
                  className="text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] focus:outline-[#A4A4E5]"
                />
                {errors.panNumber && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.panNumber}
                  </div>
                )}
              </div>
              <div className="mt-6">
                <div className="text-[14px]">Aadhaar No. (Optional)</div>
                <input
                  type="text"
                  name="passport"
                  value={formData.passport}
                  onChange={handleFormChange}
                  className="text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] focus:outline-[#A4A4E5]"
                />
                {errors.passport && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.passport}
                  </div>
                )}
              </div>
            </div>

            {/* Designation and Department Fields */}
            <div className="text-[20px] font-medium border-b pb-4 mt-8">
              Job
            </div>

            <div className="flex gap-4 text-[#373737]">
              <div className="mt-6">
                <div className="text-[14px]">Designation</div>
                <select
                  name="designation"
                  value={formData.designation}
                  onChange={handleFormChange}
                  className="text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] focus:outline-[#A4A4E5]"
                >
                  <option disabled value="">Select Designation</option>
                  {designations.map((designation) => (
                    <option key={designation.id} value={designation.id}>
                      {designation.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-6">
                <div className="text-[14px]">Department</div>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleFormChange}
                  className="text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] focus:outline-[#A4A4E5]"
                >
                  <option disabled value="">Select Department</option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.departmentName}
                    </option>
                  ))}
                </select>
              </div><div className="mt-6">
                <div className="text-[14px]">Project</div>
                <select
                  name="project"
                  value={formData.project}
                  onChange={handleFormChange}
                  className="text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] focus:outline-[#A4A4E5]"
                >
                  <option disabled value="">Select Project</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.projectName}
                    </option>
                  ))}
                </select>
              </div>

            </div>
            <div className="flex gap-4 text-[#373737]">
              <div className="mt-6">
                <div className="text-[14px]">Email</div>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] focus:outline-[#A4A4E5]"
                />
                {errors.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </div>
                )}
              </div>
              <div className="mt-6">
                <div className="text-[14px]">Date of Birth</div>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleFormChange}
                  max={maxDate}
                  className="text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] focus:outline-[#A4A4E5]"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className={`text-[14px] text-white bg-[#2B2342] text-center rounded-lg px-8 h-[48px] mt-8 ${!isFormValid ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                disabled={!isFormValid}
              >
                Activate my account
              </button>
            </div>
          </form>
        </div>
      ) : (
        <ProfessionalDetails
          setShowProfessionalForm={setShowProfessionalForm}
          editingEmployee={editingEmployee}
          ids={ids}
          setIds={setIds}
        />
      )}
    </div>
  );
}

export default BasicDetailsForm;
