import React, { useState, useRef, useEffect } from 'react';
import "./TeamPlanner.css";
import DropDownArrow from "../../../Assets/Superadmin/Team Planner/dropDownArrow-downFace.svg";
import DropUpArrow from "../../../Assets/Superadmin/Team Planner/dropDownArrow-UpFace.svg";
import DummyImg from "../../../Assets/HrTas/employeeDetails/5856.jpg";
import ScaleUp from "../../../Assets/Superadmin/Team Planner/scale-up.svg";
import Edit from "../../../Assets/Superadmin/Team Planner/Edit-pencil.svg";
import Api from '../../../Services/Api';

const token = localStorage.getItem('token');
console.log('Token:', token);

const TeamMembers = () => {
  const [expanded, setExpanded] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const [selectedSectionData, setSelectedSectionData] = useState([]);
  const [count, setCount] = useState(0);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setExpanded(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {

    Api.get('api/teams', {

      'Authorization': `Bearer ${token}`

    })
      .then((response) => {
        console.log("Initial API Response:", response.data);
        setTeamData(response.data.content); // Set initial API response to state
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);

  const handleToggle = (sectionName, teamID) => {
    const isExpanding = expanded !== sectionName;
    setExpanded(isExpanding ? sectionName : null);

    if (isExpanding) {
      // Make API call when expanding a section
      console.log('expp', teamID)
      Api.get(`api/employee/team/${teamID}`, {

        'Authorization': `Bearer ${token}`

      })
        .then((response) => {
          console.log("exapnd", response.data);
          setSelectedSectionData(response.data.employees); // Store API response for the section
          setCount(response.data.count)
        })
        .catch((error) => {
          console.error("API Error:", error);
        });
    } else {
      setSelectedSectionData(null); // Clear data when collapsing
    }
  };


  // const handleToggle = (sectionName) => {
  //   const isExpanding = expanded !== sectionName;
  //   setExpanded(isExpanding ? sectionName : null);

  //   if (isExpanding) {
  //     // Dummy Data for Testing
  //     const dummyData = [
  //       {
  //         image: DummyImg,
  //         employees: { email: "john.doe@example.com" },
  //         experience: "5 years"
  //       },
  //       {
  //         image: DummyImg,
  //         employees: { email: "jane.smith@example.com" },
  //         experience: "3 years"
  //       },
  //       {
  //         image: DummyImg,
  //         employees: { email: "bob.jones@example.com" },
  //         experience: "2 years"
  //       }
  //     ];

  //     console.log("Expand Section:", sectionName);
  //     setSelectedSectionData(dummyData); // Using Dummy Data for Testing
  //   } else {
  //     setSelectedSectionData(null); // Clear data when collapsing
  //   }
  // };


  return (
    <div className="p-6 bg-gray-50 min-h-screen" ref={dropdownRef}>
      <h1 className="text-[16px] font-normal mb-4">Team Members</h1>

      <div className="space-y-4">
        {teamData.map((section) => (
          <div key={section.name}>
            <div
              className="flex justify-between items-center cursor-pointer p-4 bg-white shadow-md"
              onClick={() => handleToggle(section.name, section.id)}
            >
              <div className="flex gap-[14px]">
                <img
                  src={expanded === section.name ? DropUpArrow : DropDownArrow}
                  alt="Toggle Arrow"
                />
                <span className="font-medium text-[14px]">{section.name}</span>
              </div>

            </div>
           
            {expanded === section.name && selectedSectionData && (
              
              <div className=''>
              <span className="text-[#442995] text-[14px] font-light  mt-2">
              {count} Employees
            </span>
                <div className="pl-6 mt-2 space-y-3 flex justify-between ">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  
                    {selectedSectionData.map((member, index) => (
                      <div className=''>
  
                        <div key={index} className="p-4 bg-white rounded-lg shadow-md flex flex-col mt-2">
                          <div className='flex items-center'>
                            <img
                              src={member?.image || DummyImg}
                              alt="Profile"
                              className="rounded-lg w-16 h-16 mr-2"
                            />
                            <div>
                              <h3 className="font-light text-[14px] text-[#626DAF]">{member?.name}</h3>
                              <p className="text-[12px] text-[#696A70]">{member?.email}</p>
                            </div>
                            {/* <div className='w-fit ml-auto cursor-pointer'>
                              <img className='w-6 h-6 translate-y-[-22px]' src={Edit} alt="Edit" /> 
                            </div> */}
                          </div>
                          <div className='flex mt-2'>
                            <img className='mr-2' src={ScaleUp} alt="Experience" />
                            <p className="text-sm text-[#626DAF]">{member?.professionalDetails?.jobType}</p>
                          </div>
  
                        </div>
  
                      </div>
  
                    ))}
                  </div>
  
  
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;
