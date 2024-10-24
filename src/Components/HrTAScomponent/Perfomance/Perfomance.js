import React, { useState } from 'react';
import DropDown from "../../../Assets/HrTas/drop-down-arrow.svg";
import Star from "../../../Assets/HrTas/stars-white.svg";

function Perfomance() {
    const [showTable, setShowTable] = useState(false);
    const [showSecondTable, setShowSecondTable] = useState(false);
    const [ratingsData, setRatingsData] = useState([]);
    const [rating, setRating] = useState('8'); // Default rating
    const [feedback, setFeedback] = useState('');

    const [branch, setBranch] = useState('HR');
    const [shift, setShift] = useState('Day');
    const [year, setYear] = useState(new Date().getFullYear());
    
    const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);
    const [shiftDropdownOpen, setShiftDropdownOpen] = useState(false);
    const [yearDropdownOpen, setYearDropdownOpen] = useState(false);

    const branches = ['HR', 'Development'];
    const shifts = ['Day', 'Night'];
    const years = Array.from({ length: new Date().getFullYear() - 1999 }, (_, i) => 2020 + i);

    const handleAddRatingClick = () => {
        setShowTable(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Store the submitted rating and feedback for a single month
        const newEntry = {
            id: 'AT62862', // Replace with dynamic ID as needed
            name: 'Arjun Aloshi', // Replace with dynamic name as needed
            email: 'Arjun@gmail.com', // Replace with dynamic email as needed
            manager: 'Rohan Jose', // Replace with dynamic manager as needed
            ratings: Array(8).fill(Number(rating)), // Example to fill all 8 months with the same rating value
            feedback: feedback,
        };

        setRatingsData([...ratingsData, newEntry]);
        setRating('8'); // Reset rating
        setFeedback(''); // Reset feedback
        setShowTable(false);
        setShowSecondTable(true);
    };

    const calculateTotalRating = (ratings) => {
        return ratings.reduce((total, rating) => total + rating, 0);
    };

    const toggleBranchDropdown = () => {
        setBranchDropdownOpen(!branchDropdownOpen);
    };

    const toggleShiftDropdown = () => {
        setShiftDropdownOpen(!shiftDropdownOpen);
    };

    const toggleYearDropdown = () => {
        setYearDropdownOpen(!yearDropdownOpen);
    };

    const handleBranchSelect = (branch) => {
        setBranch(branch);
        setBranchDropdownOpen(false);
    };

    const handleShiftSelect = (shift) => {
        setShift(shift);
        setShiftDropdownOpen(false);
    };

    const handleYearSelect = (year) => {
        setYear(year);
        setYearDropdownOpen(false);
    };

    return (
        <div className='bg-[#F8FAFB] pl-4 pt-4 pr-[34px] pb-[73px]'>
            <div className='bg-[#FFFFFF] w-full px-6 pb-[93px] h-screen'>
                <div className='flex justify-between items-center'>
                    <div>
                        <h2 className='text-[20px] text-[#232E42] font-medium mt-[40px]'>
                            {!showTable ? 'Performance Rating' : 'Add Rating'}
                        </h2>
                    </div>
                    <div className='flex'>
                        {!showTable ? 
                            <button
                                onClick={handleAddRatingClick}
                                className='bg-[#2B2342] flex items-center ml-6 font-normal text-sm mt-[24px] text-white px-6 py-4 rounded-lg'
                            >
                                <img src={Star} className='mr-[8px]' alt='Add icon' />
                                Add Rating
                            </button> : null }
                    </div>
                </div>

                <div className='flex text-[14px] gap-4 mt-[34px]'>
                    <div className='text-[#696A70]'>
                        Branch
                        <div className='mt-2'>
                            <button 
                                onClick={toggleBranchDropdown} 
                                className='flex border items-center px-4 py-[14px] rounded-lg text-[#696A70]'
                            >
                                {branch} <img className='ml-[39px]' src={DropDown} alt="" />
                            </button>
                            {branchDropdownOpen && (
                                <div className='absolute bg-white border rounded-lg mt-1'>
                                    {branches.map((branchItem) => (
                                        <div 
                                            key={branchItem} 
                                            onClick={() => handleBranchSelect(branchItem)} 
                                            className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
                                        >
                                            {branchItem}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='text-[#696A70]'>
                        Shift
                        <div className='mt-2'>
                            <button 
                                onClick={toggleShiftDropdown} 
                                className='flex border items-center px-4 py-[14px] rounded-lg text-[#696A70]'
                            >
                                {shift} <img className='ml-[39px]' src={DropDown} alt="" />
                            </button>
                            {shiftDropdownOpen && (
                                <div className='absolute bg-white border rounded-lg mt-1'>
                                    {shifts.map((shiftItem) => (
                                        <div 
                                            key={shiftItem} 
                                            onClick={() => handleShiftSelect(shiftItem)} 
                                            className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
                                        >
                                            {shiftItem}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='text-[#696A70]'>
                        Year
                        <div className='mt-2'>
                            <button 
                                onClick={toggleYearDropdown} 
                                className='flex border items-center px-4 py-[14px] rounded-lg text-[#696A70]'
                            >
                                {year} <img className='ml-[39px]' src={DropDown} alt="" />
                            </button>
                            {yearDropdownOpen && (
                                <div className='absolute bg-white border rounded-lg mt-1'>
                                    {years.map((yearItem) => (
                                        <div 
                                            key={yearItem} 
                                            onClick={() => handleYearSelect(yearItem)} 
                                            className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
                                        >
                                            {yearItem}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    {showTable&&
                    <div className='text-[#696A70]'>
                        Month
                        <div className='mt-2'>
                            <button 
                                onClick={toggleYearDropdown} 
                                className='flex border items-center px-4 py-[14px] rounded-lg text-[#696A70]'
                            >
                                New <img className='ml-[39px]' src={DropDown} alt="" />
                            </button>
                            
                        </div>
                    </div>}
                    <div className='text-white'>
                <div>"</div>
                        <div className='mt-2'>
                            <button className='flex border items-center px-4 py-[14px] rounded-lg text-white bg-[#2B2342]'>
                                Get Employee List
                            </button>
                        </div>
                    </div>
                    
                </div>

                {showTable ? (
                    <div className='mt-6'>
                        <form onSubmit={handleSubmit}>
                            <table className="w-full">
                                <thead className='bg-[#4A5061] text-white'>
                                    <tr>
                                        <th className='p-2'>ID</th>
                                        <th className='p-2'>Name</th>
                                        <th className='p-2'>Email</th>
                                        <th className='p-2'>Manager</th>
                                        <th className='p-2'>Rating</th>
                                        <th className='p-2'>Remarks</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white text-[#232E42]'>
                                    <tr className='border-b'>
                                        <td className='p-2'>AT62862</td>
                                        <td className='p-2'>Arjun Aloshi</td>
                                        <td className='p-2'>Arjun@gmail.com</td>
                                        <td className='p-2'>Rohan Jose</td>
                                        <td className='p-2'>
                                            <select
                                                value={rating}
                                                onChange={(e) => setRating(e.target.value)}
                                                className='border rounded-lg p-1'
                                            >
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                            </select>
                                        </td>
                                        <td className='p-2'>
                                            <input
                                                type="text"
                                                placeholder="Add feedback here"
                                                value={feedback}
                                                onChange={(e) => setFeedback(e.target.value)}
                                                className='border rounded-lg p-1'
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='flex justify-end mt-4'>
                                <button className='bg-green-600 text-white px-4 py-2 rounded-lg' type='submit'>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="mt-6">
                        <table className="w-full mt-4 border-separate border-spacing-0">
                            <thead className="bg-[#4A5061] text-white">
                                <tr>
                                    <th className="p-2">ID</th>
                                    <th className="p-2">Name</th>
                                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'].map((month, index) => (
                                        <th key={index} className="p-2">{month}</th>
                                    ))}
                                    <th className="p-2">Total Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ratingsData.map((entry, index) => (
                                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-[#F8F8F8]"}>
                                        <td className="p-2">{entry.id}</td>
                                        <td className="p-2">{entry.name}</td>
                                        {(entry.ratings || []).map((rating, i) => (
                                            <td
                                                key={i}
                                                className={`p-2 ${rating >= 8 ? "bg-[#B8E986]" : rating >= 6 ? "bg-[#F2C94C]" : ""}`}
                                            >
                                                {rating}
                                            </td>
                                        ))}
                                        <td className="p-2 font-bold">{calculateTotalRating(entry.ratings || [])}/40</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Perfomance;
