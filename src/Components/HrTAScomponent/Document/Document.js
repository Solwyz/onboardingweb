import React, { useState } from 'react';
import addIcon from '../../../Assets/HrTas/addIcon.svg';
import filterIcon from '../../../Assets/HrTas/filterIcon.svg';
import deleteIcon from '../../../Assets/HrTas/delete.svg';
import deleteIcon1 from '../../../Assets/HrTas/documentsPage/redDelete.svg';
import greenTick from '../../../Assets/HrTas/documentsPage/greenTick.svg';
import xMark from '../../../Assets/HrTas/documentsPage/xMark.svg';
import addPurple from '../../../Assets/HrTas/documentsPage/addPurple.svg';
import arrowLeft from '../../../Assets/HrTas/documentsPage/arrowLeft.svg';
import arrowRight from '../../../Assets/HrTas/documentsPage/arrowRight.svg';
import CloseBtn from "../../../Assets/HrTas/close.svg"

function Document() {
  const [documents, setDocuments] = useState([
    { name: 'Upload Passport', user: 'Arjun Das', isApproved: false, isRejected: false },
    { name: 'Upload Aadhaar', user: 'Leo Das', isApproved: false, isRejected: false },
    { name: 'Upload Pan', user: 'Vineesh Das', isApproved: false, isRejected: false },
    { name: 'Upload Bank Ac', user: 'Ruthin Das', isApproved: false, isRejected: false },
    { name: 'Upload Photo', user: 'Anu Das', isApproved: false, isRejected: false },
    { name: 'Upload Passport', user: 'Affan Das', isApproved: false, isRejected: false },
    { name: 'Upload Passport', user: 'Arjun Das', isApproved: false, isRejected: false },
    { name: 'Upload Passport', user: 'Arjun Das', isApproved: false, isRejected: false },
    { name: 'Upload Passport', user: 'Arjun Das', isApproved: false, isRejected: false },
    { name: 'Upload Passport', user: 'Arjun Das', isApproved: false, isRejected: false },
    { name: 'Upload Passport', user: 'Arjun Das', isApproved: false, isRejected: false },

    // ... other documents
  ]);

  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 10;
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for Modal

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleDocumentSelection = (index) => {
    setSelectedDocuments((prevSelected) => {
      const isAlreadySelected = prevSelected.includes(index);
      const newSelected = isAlreadySelected
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index];

      return newSelected;
    });
  };

  const deleteDocumentByIndex = (index) => {
    setDocuments((prevDocs) => prevDocs.filter((_, i) => i !== index));
  };

  const deleteSelectedDocuments = () => {
    setDocuments((prevDocs) => prevDocs.filter((_, i) => !selectedDocuments.includes(i)));
    setSelectedDocuments([]);
  };

  const approveDocument = (index) => {
    setDocuments((prevDocs) =>
      prevDocs.map((doc, i) =>
        i === index ? { ...doc, isApproved: true } : doc
      )
    );
  };

  const rejectDocument = (index) => {
    setDocuments((prevDocs) =>
      prevDocs.map((doc, i) =>
        i === index ? { ...doc, isRejected: true } : doc
      )
    );
  };

  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = documents.slice(indexOfFirstDocument, indexOfLastDocument);
  const totalPages = Math.ceil(documents.length / documentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const areAnySelected = selectedDocuments.length > 0;

  return (
    <div className="p-6">
      {/* Main Content */}
      <div className="bg-white w-full h-[930px] px-6 py-[24px] shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-[20px] text-[#232E42] font-medium mt-[40px]">Document Request</h1>
          <button
            onClick={toggleModal} // Open modal when clicked
            className="bg-[#2B2342] flex items-center w-[115px] h-[48px] font-normal text-sm mt-[24px] text-white px-4 py-2 rounded-lg"
          >
            <img src={addIcon} className="mr-[8px]" alt="Create" />
            Create
          </button>
        </div>

        <div className="flex items-center mt-[34px]">
          <input
            type="text"
            placeholder="Search Document"
            className="border border-[#E6E6E7] focus:outline-none text-[#696A70] text-sm font-normal rounded-lg p-2 w-[584px] h-[48px]"
            onFocus={() => setIsInputFocused(true)}          
            onBlur={() => setIsInputFocused(false)}
          />
          <button
            className="border border-[#E6E6E7] flex items-center font-normal text-sm text-[#2C2B2B] p-2 ml-2 rounded-lg w-[87px] h-[48px]"
          >
            <img src={filterIcon} className="mr-2" alt="Filter" />
            Filter
          </button>
        </div>

        <div className="flex justify-end mt-4">
          <button
            className={`h-[30px] w-[94px] flex items-center cursor-pointer text-[#FF0000] text-sm font-normal px-4 py-[7px] rounded-[4px] border border-[#FC4545]`}
            onClick={deleteSelectedDocuments}
            disabled={!areAnySelected}
          >
            <img src={deleteIcon} alt="" className="mr-[8px]" /> Delete
          </button>
        </div>

        <div className="overflow-x-auto mt-6">
          <table className="w-full table-auto">
            <tbody>
              {currentDocuments.map((doc, index) => {
                const globalIndex = indexOfFirstDocument + index;
                const isSelected = selectedDocuments.includes(globalIndex);
                return (
                  <tr
                    key={globalIndex}
                    className={`w-full h-[64px] ${isSelected
                      ? 'border-l-[10px] border-[#D9CDFF]'
                      : index % 2 === 0
                        ? 'bg-[#F9F9F9]'
                        : 'bg-white'
                      }`}
                  >
                    <td className="text-center align-middle">
                      <input
                        type="checkbox"
                        className="h-[16px] w-[16px] rounded-full cursor-pointer border-[#AFAFAF] focus:outline-none accent-[#373737]"
                        checked={isSelected}
                        onChange={() => toggleDocumentSelection(globalIndex)}
                      />
                    </td>
                    <td className="ml-[32px] align-middle">
                      <div className="flex items-center">
                        <img src={addPurple} alt="Icon" className="mr-4" />
                        <div>
                          <div className="text-sm font-medium text-[#373737]">{doc.name}</div>
                          <div className="text-xs font-medium text-[#9D9D9D]">{doc.user}</div>
                        </div>
                      </div>
                    </td>
                    <td className="align-middle text-right">
                      <div className="flex justify-end mr-8">
                        <button
                          className={`mr-8 ${doc.isApproved || areAnySelected ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          onClick={() => approveDocument(globalIndex)}
                          disabled={doc.isApproved || areAnySelected}
                        >
                          <img src={greenTick} alt="Approve" />
                        </button>
                        <button
                          className={`mr-8 ${doc.isRejected || areAnySelected ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          onClick={() => rejectDocument(globalIndex)}
                          disabled={doc.isRejected || areAnySelected}
                        >
                          <img src={xMark} alt="Reject" />
                        </button>
                        <button
                          className={`mr-8 ${areAnySelected ? 'opacity-50 cursor-not-allowed' : ''}`}
                          onClick={() => deleteDocumentByIndex(globalIndex)}
                          disabled={areAnySelected}
                        >
                          <img src={deleteIcon1} alt="Delete" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {documents.length > documentsPerPage && (
          <div className=" flex justify-end align-middle mb-6 ">
            <button
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
              className={`p-2 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
              disabled={currentPage === 1}
            >
              <img src={arrowLeft} alt="Previous" />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`p-2 rounded-md ${currentPage === i + 1 ? 'text-[#373737] font-normal text-sm' : 'text-[#C8C8C8] text-sm font-normal'}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
              className={`p-2 ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
              disabled={currentPage === totalPages}
            >
              <img src={arrowRight} alt="Next" />
            </button>
          </div>
        )}

      </div>

      {/* Modal Implementation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-[57%] flex justify-center items-center">
          <div className="bg-white p-8 shadow-lg w-[834px] h-[524px]">
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-medium text-[#6C55B2]">Document Request</h2>
              <button onClick={toggleModal} className="">
                <img src={CloseBtn} alt="" />
              </button>
            </div>

            {/* Form inside modal */}
            <form>
              <div className="mt-8">
                <div className='flex'>
                  <div>
                    <label htmlFor="title" className="block text-sm text-[#373737] font-normal">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      className="w-[373px] h-[48px] mt-2 border border-[#E6E6E7] rounded-lg focus:outline-none px-4 py-[14px] text-[#696A70] text-sm font-normal"
                      placeholder="Title"
                    />
                  </div>

                  <div className='ml-6'>
                    <label htmlFor="employee" className="block text-sm text-[#373737] font-normal">
                      Employee
                    </label>
                    <input
                      type="text"
                      id="employee"
                      className="w-[373px] h-[48px] mt-2 border border-[#E6E6E7] rounded-lg focus:outline-none px-4 py-[14px] text-[#696A70] text-sm font-normal"
                      placeholder="Enter"
                    />
                  </div>
                </div>

                <div className='flex mt-4'>
                  <div>
                    <label htmlFor="format" className="block text-sm text-[#373737] font-normal">
                      Format
                    </label>
                    <input
                      type="text"
                      id="format"
                      className="w-[373px] h-[48px] mt-2 border border-[#E6E6E7] rounded-lg focus:outline-none px-4 py-[14px] text-[#696A70] text-sm font-normal"
                      placeholder="Title"
                    />
                  </div>

                  <div className='ml-6'>
                    <label htmlFor="maxSize" className="block text-sm text-[#373737] font-normal">
                      Max Size (In MB)
                    </label>
                    <input
                      type="text"
                      id="maxSize"
                      className="w-[373px] h-[48px] mt-2 border border-[#E6E6E7] rounded-lg focus:outline-none px-4 py-[14px] text-[#696A70] text-sm font-normal"
                      placeholder="Max Size"
                    />
                  </div>
                </div>
              </div>

              <div className='mt-4'>
                <label htmlFor="description" className="block text-sm text-[#373737] font-normal">
                  Description
                </label>
                <textarea
                  id="description"
                  rows="3"
                  className="w-[770px] h-[120px] mt-2 border border-[#E6E6E7] rounded-lg focus:outline-none px-4 py-[14px] text-[#696A70] text-sm font-normal"
                  placeholder="Add description"
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end mt-8">
                <button
                  type="button"
                  className="w-[74px] h-[40px] rounded-lg border-[#E6E6E7] border text-center bg-white px-4 py-3 text-sm text-[#2C2B2B] font-normal  "
                  onClick={toggleModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-[74px] ml-[16px] h-[40px] rounded-lg  text-center bg-[#6C55B2] px-4 py-3 text-sm text-white font-medium"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Document;
