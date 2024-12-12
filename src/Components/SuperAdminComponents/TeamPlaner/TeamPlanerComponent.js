// Import necessary libraries and components
import React, { useState } from 'react';

const TeamMembers = () => {
  const [expanded, setExpanded] = useState(null);
  const [nestedExpanded, setNestedExpanded] = useState(null);

  const handleToggle = (section) => {
    setExpanded(expanded === section ? null : section);
  };

  const handleNestedToggle = (subsection) => {
    setNestedExpanded(nestedExpanded === subsection ? null : subsection);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-[16px] font-normal mb-4">Team Members</h1>

      <div className="space-y-4">
        {/* Human Resource Management Section */}
        <div>
          <div
            className="flex justify-between items-center cursor-pointer p-4 bg-white rounded-lg shadow-md"
            onClick={() => handleToggle('HR')}
          >
            <span className="font-medium">Human Resource Management</span>
            <span className="text-purple-600">12 Employees</span>
          </div>

          {expanded === 'HR' && (
            <div className="pl-6 mt-2">
              {/* Recruiters Subsection */}
              <div>
                <div
                  className="flex justify-between items-center cursor-pointer p-3 bg-gray-100 rounded-lg"
                  onClick={() => handleNestedToggle('Recruiters')}
                >
                  <span className="font-medium">Recruiters</span>
                  <span className="text-purple-600">6 Employees</span>
                </div>

                {nestedExpanded === 'Recruiters' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
                    {[...Array(6)].map((_, index) => (
                      <div
                        key={index}
                        className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center"
                      >
                        <img
                          src="https://via.placeholder.com/100"
                          alt="Profile"
                          className="rounded-full w-16 h-16 mb-2"
                        />
                        <h3 className="font-semibold">Amal Davis</h3>
                        <p className="text-sm text-gray-600">amaldavis@gmail.com</p>
                        <p className="text-sm text-blue-600 mt-1">4 Years of Experience</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Other Sections */}
        {['Payroll Management', 'Technical team', 'Finance', 'Design'].map((section) => (
          <div key={section}>
            <div
              className="flex justify-between items-center cursor-pointer p-4 bg-white rounded-lg shadow-md"
              onClick={() => handleToggle(section)}
            >
              <span className="font-medium">{section}</span>
              <span className="text-purple-600">{section === 'Technical team' ? '24 Employees' : '12 Employees'}</span>
            </div>

            {expanded === section && section === 'Technical team' && (
              <div className="pl-6 mt-2">
                {['UI UX', 'Front end', 'Backend'].map((subsection) => (
                  <div key={subsection}>
                    <div
                      className="flex justify-between items-center cursor-pointer p-3 bg-gray-100 rounded-lg"
                      onClick={() => handleNestedToggle(subsection)}
                    >
                      <span className="font-medium">{subsection}</span>
                      <span className="text-purple-600">12 Employees</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;
