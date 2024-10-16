import React, { useState } from 'react';

const ResourcePool = () => {
  const [activeTab, setActiveTab] = useState('Departments');  // Tracks tab in Resource Pool section
  const [activeSidebar, setActiveSidebar] = useState('Resource Pool');  // Tracks sidebar item
  const [searchQuery, setSearchQuery] = useState('');
  const [departments, setDepartments] = useState(['HR', 'Engineering', 'Marketing']);
  const [newDepartment, setNewDepartment] = useState('');
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Handle tab switching inside Resource Pool
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Handle sidebar switching
  const handleSidebarClick = (section) => {
    setActiveSidebar(section);
    if (section !== 'Resource Pool') {
      // Reset tabs when leaving Resource Pool section
      setActiveTab('');
    }
  };

  // Handle search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Add a new department
  const handleAddDepartment = () => {
    if (newDepartment.trim()) {
      setDepartments([...departments, newDepartment]);
      setNewDepartment('');
      setShowModal(false);
    }
  };

  // Apply filters
  const applyFilter = (items) => {
    return items.filter((item) => item.toLowerCase().includes(filter.toLowerCase()));
  };

  // Filter departments by search and applied filters
  const filteredDepartments = applyFilter(
    departments.filter((dep) => dep.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-900 text-white p-4">
        <ul className="space-y-4">
          {['Team Planner', 'Portfolio', 'My Schedule', 'Resource Pool', 'Project List', 'Goal', 'Roadmap', 'Reports', 'Integration', 'Manage', 'Help'].map(
            (section) => (
              <li
                key={section}
                onClick={() => handleSidebarClick(section)}
                className={`p-2 rounded-lg cursor-pointer ${
                  activeSidebar === section ? 'bg-purple-700' : ''
                }`}
              >
                {section}
              </li>
            )
          )}
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4">
        {activeSidebar === 'Resource Pool' && (
          <>
            {/* Tab Navigation for Resource Pool */}
            <div className="flex space-x-4 mb-4">
              {['Departments', 'Resource', 'Roles'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`px-4 py-2 border-b-2 ${
                    activeTab === tab ? 'border-blue-500' : 'border-transparent hover:border-blue-500'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search and filter bar */}
            <div className="flex space-x-4 mb-4">
              <button
                onClick={() => setShowModal(true)}
                className="bg-gray-100 text-blue-500 px-4 py-2 rounded"
              >
                + Add department
              </button>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search"
                className="bg-gray-100 text-blue-500 px-4 py-2 rounded"
              />
              <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Filter"
                className="bg-gray-100 text-blue-500 px-4 py-2 rounded"
              />
            </div>

            {/* Main content based on active tab */}
            <div className="bg-white h-full rounded-lg border border-gray-200 p-4">
              {activeTab === 'Departments' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Departments</h2>
                  <ul className="list-disc pl-6">
                    {filteredDepartments.length ? (
                      filteredDepartments.map((dep, idx) => <li key={idx}>{dep}</li>)
                    ) : (
                      <li>No departments found.</li>
                    )}
                  </ul>
                </div>
              )}
              {activeTab === 'Resource' && (
                <div>
                  <h2 className="text-xl font-bold">Resource Tab</h2>
                  {/* Content for Resource Tab */}
                </div>
              )}
              {activeTab === 'Roles' && (
                <div>
                  <h2 className="text-xl font-bold">Roles Tab</h2>
                  {/* Content for Roles Tab */}
                </div>
              )}
            </div>
          </>
        )}

        {activeSidebar === 'Team Planner' && (
          <div>
            <h2 className="text-xl font-bold">Team Planner Section</h2>
            {/* Add Team Planner specific content here */}
          </div>
        )}

        {activeSidebar === 'Portfolio' && (
          <div>
            <h2 className="text-xl font-bold">Portfolio Section</h2>
            {/* Add Portfolio specific content here */}
          </div>
        )}

        {activeSidebar === 'My Schedule' && (
          <div>
            <h2 className="text-xl font-bold">My Schedule Section</h2>
            {/* Add My Schedule specific content here */}
          </div>
        )}

        {/* Add similar content blocks for other sidebar items (Project List, Goal, etc.) */}

        {/* Modal for adding department */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-lg font-bold mb-4">Add Department</h2>
              <input
                type="text"
                value={newDepartment}
                onChange={(e) => setNewDepartment(e.target.value)}
                placeholder="Department Name"
                className="border p-2 mb-4 w-full"
              />
              <div className="flex space-x-4">
                <button
                  onClick={handleAddDepartment}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-200 px-4 py-2 rounded"
                >
                  Canc
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ResourcePool;
